import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, DataTable } from '../components/UI';
import { HorizontalBar, BarChart } from '../components/Charts';
import { getCollections, queryDatabase } from '../api/client';

const DEFAULT_CONN = 'mongodb://admin:deeptalk@54.152.170.37:27017/?tls=false&authSource=admin';

const sampleQuestions = [
  'Which bot had the most calls?',
  'Average session length by bot',
  'Show calls per month in 2025',
  'Which TTS provider is used most?',
  'List all voice deployments',
  'What is the longest call ever recorded?',
];

function parseSSE(text) {
  const events = [];
  const blocks = text.split('\n\n');
  for (const block of blocks) {
    if (!block.trim()) continue;
    let type = 'message', data = '';
    for (const line of block.split('\n')) {
      if (line.startsWith('event: ')) type = line.slice(7).trim();
      else if (line.startsWith('data: ')) data = line.slice(6);
    }
    if (data) {
      try { events.push({ type, data: JSON.parse(data) }); }
      catch { events.push({ type, data }); }
    }
  }
  return events;
}

export default function TalkToDeeptalk() {
  const { t } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('contacts');
  const [isQuerying, setIsQuerying] = useState(false);
  const abortRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    getCollections().then(d => {
      if (d?.collections) setCollections(d.collections);
    });
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isQuerying) return;
    const question = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setInput('');
    setIsQuerying(true);

    // Add a placeholder assistant message we'll update as SSE events arrive
    const assistantIdx = messages.length + 1; // user msg was just pushed
    setMessages(prev => [...prev, { role: 'assistant', steps: [], result: null, error: null }]);

    const { promise, abort } = queryDatabase(question, DEFAULT_CONN, 'mongodb', selectedCollection);
    abortRef.current = abort;

    try {
      const res = await promise;
      if (!res.ok) {
        const errText = await res.text();
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], error: `HTTP ${res.status}: ${errText}` };
          return updated;
        });
        setIsQuerying(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Parse complete SSE blocks (ending with \n\n)
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || ''; // keep incomplete block in buffer

        for (const part of parts) {
          if (!part.trim()) continue;
          const events = parseSSE(part + '\n\n');
          for (const evt of events) {
            setMessages(prev => {
              const updated = [...prev];
              const msg = { ...updated[updated.length - 1] };
              if (evt.type === 'thinking') {
                msg.steps = [...(msg.steps || []), { type: 'thinking', text: typeof evt.data === 'string' ? evt.data : evt.data.text || evt.data.content || JSON.stringify(evt.data) }];
              } else if (evt.type === 'tool_call') {
                msg.steps = [...(msg.steps || []), { type: 'tool_call', text: typeof evt.data === 'string' ? evt.data : evt.data.tool || evt.data.name || JSON.stringify(evt.data) }];
              } else if (evt.type === 'result') {
                msg.result = evt.data;
              } else if (evt.type === 'error') {
                msg.error = typeof evt.data === 'string' ? evt.data : evt.data.message || JSON.stringify(evt.data);
              }
              updated[updated.length - 1] = msg;
              return updated;
            });
          }
        }
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], error: e.message };
          return updated;
        });
      }
    }
    setIsQuerying(false);
    abortRef.current = null;
  };

  const handleCancel = () => {
    if (abortRef.current) abortRef.current();
  };

  const autoDetectChart = (resultData) => {
    if (!Array.isArray(resultData) || resultData.length === 0) return null;
    const keys = Object.keys(resultData[0]);
    // Look for a label+value pattern (2 columns, one string, one number)
    if (keys.length >= 2) {
      const labelKey = keys.find(k => typeof resultData[0][k] === 'string');
      const valueKey = keys.find(k => typeof resultData[0][k] === 'number');
      if (labelKey && valueKey && resultData.length <= 30) {
        return { labelKey, valueKey, items: resultData };
      }
    }
    return null;
  };

  const renderResult = (result) => {
    if (!result) return null;
    const { explanation, pipeline, data: resultData } = result;
    const chartInfo = autoDetectChart(resultData);
    const tableData = Array.isArray(resultData) ? resultData : null;
    const tableColumns = tableData?.[0] ? Object.keys(tableData[0]).map(k => ({ key: k, label: k })) : [];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {explanation && (
          <div style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary }}>{explanation}</div>
        )}
        {pipeline && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.textTertiary, marginBottom: 4, textTransform: 'uppercase' }}>Pipeline</div>
            <pre style={{ padding: 16, borderRadius: 8, background: t.surfaceAlt, border: `1px solid ${t.border}`, fontSize: 12, color: t.text, overflow: 'auto', margin: 0, fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace', lineHeight: 1.5 }}>
              {typeof pipeline === 'string' ? pipeline : JSON.stringify(pipeline, null, 2)}
            </pre>
          </div>
        )}
        {chartInfo && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.textTertiary, marginBottom: 8, textTransform: 'uppercase' }}>Chart</div>
            {chartInfo.items.length <= 15 ? (
              <HorizontalBar items={chartInfo.items.map((item, i) => ({ label: String(item[chartInfo.labelKey]), value: item[chartInfo.valueKey], color: t.chart[i % t.chart.length] }))} />
            ) : (
              <BarChart
                data={chartInfo.items.map(item => item[chartInfo.valueKey])}
                labels={chartInfo.items.map(item => String(item[chartInfo.labelKey]).slice(0, 12))}
                colors={[t.chart[0]]}
              />
            )}
          </div>
        )}
        {tableData && tableColumns.length > 0 && (
          <DataTable title="Results" columns={tableColumns} rows={tableData} pageSize={10} />
        )}
      </div>
    );
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DashboardHeader title="Talk to Deeptalk" subtitle="Query live MongoDB data with natural language" />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Chat Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${t.border}`, minWidth: 0 }}>
          {/* Collection selector */}
          <div style={{ padding: '12px 32px', borderBottom: `1px solid ${t.border}`, background: t.surface, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.textTertiary }}>Collection:</span>
            <select value={selectedCollection} onChange={e => setSelectedCollection(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, outline: 'none' }}>
              {collections.length > 0 ? (
                collections.map(c => (
                  <option key={c.name} value={c.name}>{c.name} ({c.count} docs)</option>
                ))
              ) : (
                <option value="contacts">contacts</option>
              )}
            </select>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 15l.88 2.62L22.5 18.5l-2.62.88L19 22l-.88-2.62L15.5 18.5l2.62-.88L19 15z"/></svg>
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 8 }}>Query your Deeptalk database</h2>
                <p style={{ fontSize: 14, color: t.textTertiary, maxWidth: 480, margin: '0 auto 24px' }}>
                  Ask questions in natural language. I'll generate MongoDB pipelines, execute them, and show you the results.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 600, margin: '0 auto' }}>
                  {sampleQuestions.map((q, i) => (
                    <button key={i} onClick={() => setInput(q)}
                      style={{ padding: '8px 14px', borderRadius: 20, border: `1px solid ${t.border}`, background: t.surface, color: t.textSecondary, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = t.primary; e.currentTarget.style.color = t.primary; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textSecondary; }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'user' ? (
                  <div style={{ padding: '10px 16px', borderRadius: '16px 16px 4px 16px', background: t.primary, color: '#fff', fontSize: 14, maxWidth: '70%' }}>
                    {msg.text}
                  </div>
                ) : (
                  <div style={{ maxWidth: '90%', width: '100%' }}>
                    <Card style={{ padding: 20 }}>
                      {/* Steps */}
                      {msg.steps?.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                          {msg.steps.map((step, si) => (
                            <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: 12, color: t.textTertiary }}>
                              <span>{step.type === 'thinking' ? '\uD83D\uDD0D' : '\u26A1'}</span>
                              <span style={{ fontStyle: step.type === 'thinking' ? 'italic' : 'normal' }}>{step.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Result */}
                      {msg.result && renderResult(msg.result)}

                      {/* Error */}
                      {msg.error && (
                        <div style={{ padding: 12, borderRadius: 8, background: t.dangerLight, border: `1px solid ${t.danger}30`, color: t.danger, fontSize: 13 }}>
                          {msg.error}
                        </div>
                      )}

                      {/* Still loading, no result yet */}
                      {!msg.result && !msg.error && isQuerying && i === messages.length - 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                          <div style={{ display: 'flex', gap: 4 }}>
                            {[0, 1, 2].map(j => (
                              <div key={j} style={{ width: 8, height: 8, borderRadius: '50%', background: t.primary, animation: `pulse 1.4s ease-in-out ${j * 0.2}s infinite`, opacity: 0.4 }} />
                            ))}
                          </div>
                          <span style={{ fontSize: 12, color: t.textTertiary }}>Processing query...</span>
                        </div>
                      )}
                    </Card>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '16px 32px', borderTop: `1px solid ${t.border}`, background: t.surface }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question about your Deeptalk data..."
                disabled={isQuerying}
                style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 14, outline: 'none', opacity: isQuerying ? 0.6 : 1 }} />
              {isQuerying ? (
                <button onClick={handleCancel}
                  style={{ padding: '12px 24px', borderRadius: 10, border: `1px solid ${t.danger}`, background: t.dangerLight, color: t.danger, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
              ) : (
                <button onClick={handleSend}
                  style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: t.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Send
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Suggestions */}
        <div style={{ width: 280, overflow: 'auto', padding: 20, background: t.surfaceAlt }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Sample Questions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sampleQuestions.map((q, i) => (
              <button key={i} onClick={() => setInput(q)}
                style={{ padding: '10px 12px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surface, color: t.textSecondary, fontSize: 12, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.primary; e.currentTarget.style.color = t.primary; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textSecondary; }}>
                {q}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginTop: 24, marginBottom: 12 }}>How it Works</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { step: '1', label: 'Schema Introspection', desc: 'Reads collection fields & types' },
              { step: '2', label: 'Pipeline Generation', desc: 'AI creates MongoDB aggregation' },
              { step: '3', label: 'Validation & Execution', desc: 'Safety checks, then runs query' },
              { step: '4', label: 'Results & Visualization', desc: 'Data table + auto-detected charts' },
            ].map(item => (
              <div key={item.step} style={{ padding: '8px 10px', borderRadius: 6, background: t.surface, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: t.primaryLight, color: t.primary, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</span>
                <div>
                  <div style={{ fontWeight: 600, color: t.text }}>{item.label}</div>
                  <div style={{ color: t.textTertiary, fontSize: 11 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
      `}</style>
    </div>
  );
}
