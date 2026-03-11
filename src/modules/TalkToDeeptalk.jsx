import { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card } from '../components/UI';
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
  for (const block of text.split('\n\n')) {
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

// --- Formatting helpers (matching platform DataTable.svelte) ---
const fmtCol = (s) => s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

const fmtVal = (v) => {
  if (v == null) return '—';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (typeof v === 'number') return Number.isInteger(v) ? v.toLocaleString() : v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)) {
    try {
      const d = new Date(v);
      if (!isNaN(d.getTime())) return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {}
  }
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
};

const isNumericCol = (data, col) => {
  const samples = data.slice(0, 10).map(r => r[col]).filter(v => v != null);
  return samples.length > 0 && samples.filter(v => typeof v === 'number').length / samples.length > 0.8;
};

const isCompactCol = (data, col) => {
  const vals = data.map(r => String(r[col] ?? ''));
  return vals.length > 0 && vals.filter(v => v.length <= 10).length / vals.length > 0.9;
};

// --- Copy Button ---
function CopyBtn({ text, t }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1000); }}
      style={{ padding: '3px 8px', borderRadius: 6, border: 'none', background: copied ? '#10B98120' : 'transparent', color: copied ? '#10B981' : t.textTertiary, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s' }}>
      {copied ? (
        <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied</>
      ) : (
        <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy</>
      )}
    </button>
  );
}

// --- Collapsible Pipeline (matching QueryResultCard's "Show SQL" pattern) ---
function CollapsiblePipeline({ pipeline, t }) {
  const [open, setOpen] = useState(false);
  const pipelineStr = typeof pipeline === 'string' ? pipeline : JSON.stringify(pipeline, null, 2);
  return (
    <div style={{ borderRadius: 10, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: t.surfaceAlt, border: 'none', cursor: 'pointer', color: t.textSecondary, fontSize: 12 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          {open ? 'Hide Pipeline' : 'Show Pipeline'}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {open && <CopyBtn text={pipelineStr} t={t} />}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${t.border}`, position: 'relative' }}>
          <pre style={{ padding: 14, margin: 0, background: t.surfaceAlt, fontSize: 12, color: t.text, overflow: 'auto', maxHeight: 300, fontFamily: '"JetBrains Mono", ui-monospace, "Cascadia Code", monospace', lineHeight: 1.6 }}>
            {pipelineStr}
          </pre>
        </div>
      )}
    </div>
  );
}

// --- Data Table (matching platform DataTable.svelte) ---
function ResultTable({ data, t }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const PAGE_SIZE = 10;

  if (!Array.isArray(data) || data.length === 0) return null;
  const columns = Object.keys(data[0]);

  const numericCols = useMemo(() => new Set(columns.filter(c => isNumericCol(data, c))), [data, columns]);
  const compactCols = useMemo(() => new Set(columns.filter(c => isCompactCol(data, c))), [data, columns]);

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  let rows = [...data];
  if (sortKey) rows.sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (av == null) return sortAsc ? 1 : -1;
    if (bv == null) return sortAsc ? -1 : 1;
    const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return sortAsc ? cmp : -cmp;
  });

  const displayRows = showAll ? rows : rows.slice(0, PAGE_SIZE);
  const hasMore = rows.length > PAGE_SIZE;

  const exportCsv = () => {
    const headers = columns.join(',');
    const csvRows = data.map(row => columns.map(c => {
      const v = String(row[c] ?? '').replace(/"/g, '""');
      return v.includes(',') || v.includes('"') ? `"${v}"` : v;
    }).join(','));
    const blob = new Blob([headers + '\n' + csvRows.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `query-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div style={{ borderRadius: 10, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: t.surfaceAlt }}>
              {columns.map((c, ci) => {
                const isEdge = ci === 0 || ci === columns.length - 1;
                const isNum = numericCols.has(c);
                return (
                  <th key={c} onClick={() => handleSort(c)}
                    style={{ padding: '8px 14px', fontSize: 11, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: `1px solid ${t.border}`, cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none', textAlign: isEdge ? 'center' : isNum ? 'right' : 'left', width: compactCols.has(c) ? '1%' : 'auto', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = t.border + '40'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    {fmtCol(c)} {sortKey === c ? (sortAsc ? '↑' : '↓') : ''}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, i) => (
              <tr key={i}
                style={{ transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = t.surfaceAlt + '60'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {columns.map((c, ci) => {
                  const isEdge = ci === 0 || ci === columns.length - 1;
                  const isNum = numericCols.has(c);
                  const formatted = fmtVal(row[c]);
                  const truncated = formatted.length > 100;
                  return (
                    <td key={c} title={truncated ? formatted : undefined}
                      style={{ padding: '8px 14px', borderBottom: `1px solid ${t.border}20`, color: t.text, textAlign: isEdge ? 'center' : isNum ? 'right' : 'left', fontFamily: isNum ? '"JetBrains Mono", ui-monospace, monospace' : 'inherit', whiteSpace: isNum ? 'nowrap' : 'normal', width: compactCols.has(c) ? '1%' : 'auto' }}>
                      {truncated ? formatted.slice(0, 100) + '...' : formatted}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 14px', background: t.surfaceAlt, borderTop: `1px solid ${t.border}`, fontSize: 11 }}>
        <div>
          {hasMore && (
            <button onClick={() => setShowAll(!showAll)}
              style={{ border: 'none', background: 'none', color: t.primary, cursor: 'pointer', fontSize: 11, fontWeight: 500, padding: 0 }}>
              {showAll ? 'Show less' : `Show all ${rows.length} rows`}
            </button>
          )}
          {!hasMore && <span style={{ color: t.textTertiary }}>{rows.length} row{rows.length !== 1 ? 's' : ''}</span>}
        </div>
        <button onClick={exportCsv}
          style={{ display: 'flex', alignItems: 'center', gap: 4, border: 'none', background: 'none', color: t.textTertiary, cursor: 'pointer', fontSize: 11, padding: '2px 6px', borderRadius: 4, transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = t.text}
          onMouseLeave={e => e.currentTarget.style.color = t.textTertiary}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>
    </div>
  );
}

// --- Auto-detect chartable data ---
function autoDetectChart(resultData) {
  if (!Array.isArray(resultData) || resultData.length === 0) return null;
  const keys = Object.keys(resultData[0]);
  if (keys.length >= 2) {
    const labelKey = keys.find(k => typeof resultData[0][k] === 'string');
    const valueKey = keys.find(k => typeof resultData[0][k] === 'number');
    if (labelKey && valueKey && resultData.length <= 30) return { labelKey, valueKey, items: resultData };
  }
  return null;
}

// --- Query Result Card (matching QueryResultCard.svelte layout) ---
function QueryResultCard({ result, steps, t }) {
  const [viewMode, setViewMode] = useState('table');
  if (!result) return null;
  const { explanation, pipeline, data: resultData, count } = result;
  const chartInfo = autoDetectChart(resultData);
  const hasData = Array.isArray(resultData) && resultData.length > 0;
  const rowCount = count ?? resultData?.length ?? 0;

  return (
    <div style={{ borderRadius: 12, border: `1px solid ${t.border}`, overflow: 'hidden', background: t.surface }}>
      {/* Header (emerald gradient like QueryResultCard) */}
      <div style={{ padding: '10px 16px', background: `linear-gradient(135deg, ${t.primaryLight}40, ${t.primaryLight}20)`, borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.primary} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Query Result</span>
          <span style={{ fontSize: 11, padding: '1px 8px', borderRadius: 12, background: t.primaryLight, color: t.primary, fontWeight: 500 }}>
            {rowCount} row{rowCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Thinking steps */}
      {steps?.length > 0 && (
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${t.border}`, background: t.surfaceAlt }}>
          {steps.map((step, si) => (
            <div key={si} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '2px 0', fontSize: 12, color: t.textSecondary }}>
              <span style={{ flexShrink: 0, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, marginTop: 1, background: step.type === 'tool_call' ? '#F59E0B20' : t.primaryLight, color: step.type === 'tool_call' ? '#D97706' : t.primary }}>
                {step.type === 'thinking' ? (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                ) : (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                )}
              </span>
              <span style={{ fontStyle: step.type === 'thinking' ? 'italic' : 'normal', lineHeight: '16px' }}>{step.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Explanation */}
      {explanation && (
        <div style={{ padding: '12px 16px', fontSize: 13, lineHeight: 1.7, color: t.text, borderBottom: `1px solid ${t.border}` }}>
          {explanation}
        </div>
      )}

      {/* Collapsible Pipeline */}
      {pipeline && (
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${t.border}` }}>
          <CollapsiblePipeline pipeline={pipeline} t={t} />
        </div>
      )}

      {/* Table/Chart toggle */}
      {hasData && chartInfo && (
        <div style={{ padding: '8px 16px', borderBottom: `1px solid ${t.border}`, display: 'flex', gap: 6 }}>
          {['table', 'chart'].map(v => (
            <button key={v} onClick={() => setViewMode(v)}
              style={{ padding: '4px 14px', borderRadius: 6, border: 'none', background: viewMode === v ? t.primaryLight : 'transparent', color: viewMode === v ? t.primary : t.textTertiary, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s' }}>
              {v === 'table' ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              )}
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Table view */}
      {hasData && (viewMode === 'table' || !chartInfo) && (
        <div style={{ padding: '8px 12px 12px' }}>
          <ResultTable data={resultData} t={t} />
        </div>
      )}

      {/* Chart view */}
      {hasData && viewMode === 'chart' && chartInfo && (
        <div style={{ padding: '16px' }}>
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

      {/* Empty state */}
      {hasData === false && !resultData?.error && (
        <div style={{ padding: 24, textAlign: 'center', color: t.textTertiary, fontSize: 13 }}>No results found</div>
      )}
    </div>
  );
}

// === Main Component ===
export default function TalkToDeeptalk() {
  const { t } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('contacts');
  const [isQuerying, setIsQuerying] = useState(false);
  const abortRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => { getCollections().then(d => { if (d?.collections) setCollections(d.collections); }); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isQuerying) return;
    const question = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setInput('');
    setIsQuerying(true);
    setMessages(prev => [...prev, { role: 'assistant', steps: [], result: null, error: null }]);

    const { promise, abort } = queryDatabase(question, DEFAULT_CONN, 'mongodb', selectedCollection);
    abortRef.current = abort;

    try {
      const res = await promise;
      if (!res.ok) {
        const errText = await res.text();
        setMessages(prev => { const u = [...prev]; u[u.length - 1] = { ...u[u.length - 1], error: `HTTP ${res.status}: ${errText}` }; return u; });
        setIsQuerying(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n');
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          if (!part.trim()) continue;
          for (const evt of parseSSE(part + '\n\n')) {
            setMessages(prev => {
              const u = [...prev];
              const msg = { ...u[u.length - 1] };
              if (evt.type === 'thinking') {
                msg.steps = [...(msg.steps || []), { type: 'thinking', text: typeof evt.data === 'string' ? evt.data : evt.data.text || evt.data.content || JSON.stringify(evt.data) }];
              } else if (evt.type === 'tool_call') {
                msg.steps = [...(msg.steps || []), { type: 'tool_call', text: typeof evt.data === 'string' ? evt.data : evt.data.tool || evt.data.name || JSON.stringify(evt.data) }];
              } else if (evt.type === 'result') {
                msg.result = evt.data;
              } else if (evt.type === 'error') {
                msg.error = typeof evt.data === 'string' ? evt.data : evt.data.message || JSON.stringify(evt.data);
              }
              u[u.length - 1] = msg;
              return u;
            });
          }
        }
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        setMessages(prev => { const u = [...prev]; u[u.length - 1] = { ...u[u.length - 1], error: e.message }; return u; });
      }
    }
    setIsQuerying(false);
    abortRef.current = null;
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
              {collections.length > 0 ? collections.map(c => <option key={c.name} value={c.name}>{c.name} ({c.count} docs)</option>) : <option value="contacts">contacts</option>}
            </select>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 15l.88 2.62L22.5 18.5l-2.62.88L19 22l-.88-2.62L15.5 18.5l2.62-.88L19 15z"/></svg>
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 8 }}>Query your Deeptalk database</h2>
                <p style={{ fontSize: 14, color: t.textTertiary, maxWidth: 480, margin: '0 auto 24px' }}>Ask questions in natural language. I'll generate MongoDB pipelines, execute them, and show you the results.</p>
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
                  <div style={{ padding: '10px 16px', borderRadius: '16px 16px 4px 16px', background: t.primary, color: '#fff', fontSize: 14, maxWidth: '70%' }}>{msg.text}</div>
                ) : (
                  <div style={{ maxWidth: '95%', width: '100%' }}>
                    {/* Show QueryResultCard when result is available */}
                    {msg.result ? (
                      <QueryResultCard result={msg.result} steps={msg.steps} t={t} />
                    ) : msg.error ? (
                      <Card style={{ padding: 16 }}>
                        {msg.steps?.length > 0 && (
                          <div style={{ marginBottom: 12, padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                            {msg.steps.map((step, si) => (
                              <div key={si} style={{ fontSize: 12, color: t.textSecondary, padding: '2px 0' }}>
                                {step.type === 'thinking' ? '🔍' : '⚡'} {step.text}
                              </div>
                            ))}
                          </div>
                        )}
                        <div style={{ padding: 12, borderRadius: 8, background: '#FEE2E220', border: '1px solid #EF444430', color: '#DC2626', fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                          {msg.error}
                        </div>
                      </Card>
                    ) : isQuerying && i === messages.length - 1 ? (
                      <Card style={{ padding: 16 }}>
                        {msg.steps?.length > 0 && (
                          <div style={{ marginBottom: 12, padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                            {msg.steps.map((step, si) => (
                              <div key={si} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '2px 0', fontSize: 12, color: t.textSecondary }}>
                                <span style={{ flexShrink: 0, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, background: step.type === 'tool_call' ? '#F59E0B20' : t.primaryLight, color: step.type === 'tool_call' ? '#D97706' : t.primary }}>
                                  {step.type === 'thinking' ? '🔍' : '⚡'}
                                </span>
                                <span style={{ fontStyle: step.type === 'thinking' ? 'italic' : 'normal' }}>{step.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ display: 'flex', gap: 4 }}>
                            {[0, 1, 2].map(j => (
                              <div key={j} style={{ width: 8, height: 8, borderRadius: '50%', background: t.primary, animation: `pulse 1.4s ease-in-out ${j * 0.2}s infinite`, opacity: 0.4 }} />
                            ))}
                          </div>
                          <span style={{ fontSize: 12, color: t.textTertiary }}>Processing query...</span>
                        </div>
                      </Card>
                    ) : null}
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
                placeholder="Ask a question about your Deeptalk data..." disabled={isQuerying}
                style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 14, outline: 'none', opacity: isQuerying ? 0.6 : 1 }} />
              {isQuerying ? (
                <button onClick={() => abortRef.current?.()}
                  style={{ padding: '12px 24px', borderRadius: 10, border: '1px solid #EF4444', background: '#FEE2E220', color: '#DC2626', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              ) : (
                <button onClick={handleSend}
                  style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: t.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send</button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
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

      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }`}</style>
    </div>
  );
}
