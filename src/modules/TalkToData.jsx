import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, Badge, Widget, SectionTitle } from '../components/UI';
import { BarChart, AreaChart, HorizontalBar, DonutChart, MultiLineChart, ScatterPlot } from '../components/Charts';

const sampleQuestions = [
  'How has AHT changed over the last 6 months?',
  'Compare FCR across all teams',
  'What is the channel mix breakdown?',
  'Top 10 agents by CSAT',
  'Any volume spikes last week?',
  'Does tenure correlate with QA scores?',
  'Why did abandon rate increase on Tuesday?',
  'Predict next month call volume',
  'How does our SL compare to target?',
  'What if we add 5 agents to Team Alpha?',
];

const generateResponse = (question) => {
  const q = question.toLowerCase();
  if (q.includes('aht') && (q.includes('trend') || q.includes('changed') || q.includes('over'))) {
    return {
      type: 'trend', title: 'AHT Trend — Last 6 Months',
      insight: 'Average Handle Time has decreased 8.3% over the last 6 months, from 362 seconds in October to 332 seconds in March. The most significant improvement occurred in January (-4.2%), coinciding with the new knowledge base rollout. Team Delta remains an outlier at 398s average.',
      chartType: 'area',
      data: { values: [362, 355, 341, 338, 330, 332], labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] },
      table: [
        { month: 'Oct 2025', aht: '6:02', change: '—' }, { month: 'Nov 2025', aht: '5:55', change: '-1.9%' },
        { month: 'Dec 2025', aht: '5:41', change: '-3.9%' }, { month: 'Jan 2026', aht: '5:38', change: '-0.9%' },
        { month: 'Feb 2026', aht: '5:30', change: '-2.4%' }, { month: 'Mar 2026', aht: '5:32', change: '+0.6%' },
      ],
    };
  }
  if (q.includes('fcr') && q.includes('team')) {
    return {
      type: 'comparison', title: 'First Contact Resolution by Team',
      insight: 'Team Alpha leads FCR at 84.2%, followed by Beta at 81.5%. Team Delta significantly underperforms at 68.3%, which is 9.7 percentage points below the company average of 78%. Delta\'s low FCR correlates with their higher transfer rate (22%) and newer tenure mix.',
      chartType: 'bar',
      data: { values: [84.2, 81.5, 79.1, 76.8, 74.2, 68.3], labels: ['Alpha', 'Beta', 'Gamma', 'Epsilon', 'Omega', 'Delta'] },
      table: [
        { team: 'Alpha', fcr: '84.2%', rank: 1 }, { team: 'Beta', fcr: '81.5%', rank: 2 },
        { team: 'Gamma', fcr: '79.1%', rank: 3 }, { team: 'Epsilon', fcr: '76.8%', rank: 4 },
        { team: 'Omega', fcr: '74.2%', rank: 5 }, { team: 'Delta', fcr: '68.3%', rank: 6 },
      ],
    };
  }
  if (q.includes('channel') && (q.includes('mix') || q.includes('breakdown'))) {
    return {
      type: 'composition', title: 'Channel Mix Distribution',
      insight: 'Voice remains the dominant channel at 45% of total volume, but has decreased from 58% a year ago. Chat has grown to 28% (+10pp YoY), driven by the new chat widget deployment. Bot-handled interactions now represent 15% of volume, up from 8% last year. Email continues to decline at 12%.',
      chartType: 'donut',
      data: { segments: [{ label: 'Voice', value: 45, color: '#2563EB' }, { label: 'Chat', value: 28, color: '#7C3AED' }, { label: 'Bot', value: 15, color: '#0D9668' }, { label: 'Email', value: 12, color: '#EC4899' }] },
      table: [
        { channel: 'Voice', pct: '45%', volume: '12,420', trend: '↓ -13pp YoY' },
        { channel: 'Chat', pct: '28%', volume: '7,728', trend: '↑ +10pp YoY' },
        { channel: 'Bot', pct: '15%', volume: '4,140', trend: '↑ +7pp YoY' },
        { channel: 'Email', pct: '12%', volume: '3,312', trend: '↓ -4pp YoY' },
      ],
    };
  }
  if (q.includes('top') && q.includes('agent') && q.includes('csat')) {
    return {
      type: 'ranking', title: 'Top 10 Agents by CSAT Score',
      insight: 'The top 10 agents have an average CSAT of 4.72/5.0, significantly above the company average of 4.30. Notable: 7 of the top 10 have tenure > 18 months, confirming the strong tenure-quality correlation. Ahmad Fawaid (rank #1) also leads in FCR at 92%.',
      chartType: 'hbar',
      data: [
        { label: 'Ahmad Fawaid', value: 4.9, suffix: '/5', color: '#2563EB' },
        { label: 'Jane Cooper', value: 4.85, suffix: '/5', color: '#2563EB' },
        { label: 'Sarah Al-Rashid', value: 4.82, suffix: '/5', color: '#2563EB' },
        { label: 'Robert Fox', value: 4.78, suffix: '/5', color: '#2563EB' },
        { label: 'Emily Wilson', value: 4.75, suffix: '/5', color: '#7C3AED' },
        { label: 'Carlos Mendez', value: 4.71, suffix: '/5', color: '#7C3AED' },
        { label: 'Lisa Chen', value: 4.68, suffix: '/5', color: '#7C3AED' },
        { label: 'David Kim', value: 4.65, suffix: '/5', color: '#7C3AED' },
        { label: 'Maria Santos', value: 4.62, suffix: '/5', color: '#0D9668' },
        { label: 'James Taylor', value: 4.60, suffix: '/5', color: '#0D9668' },
      ],
      table: [
        { rank: 1, agent: 'Ahmad Fawaid', csat: '4.90', team: 'Alpha', tenure: '3.2yr' },
        { rank: 2, agent: 'Jane Cooper', csat: '4.85', team: 'Beta', tenure: '2.8yr' },
        { rank: 3, agent: 'Sarah Al-Rashid', csat: '4.82', team: 'Alpha', tenure: '2.1yr' },
        { rank: 4, agent: 'Robert Fox', csat: '4.78', team: 'Gamma', tenure: '1.9yr' },
        { rank: 5, agent: 'Emily Wilson', csat: '4.75', team: 'Beta', tenure: '1.5yr' },
      ],
    };
  }
  // Default response
  return {
    type: 'general', title: 'Analysis Result',
    insight: `Based on your query "${question}", I've analyzed the relevant data. The current metrics show stable performance across most KPIs with a positive trajectory. Service Level is at 86.5% (above the 85% target), CSAT is trending upward at 4.3/5, and cost per contact has decreased 5% QoQ. Key areas requiring attention include Team Delta's performance gap and the rising abandon rate during peak hours (2-4 PM).`,
    chartType: 'bar',
    data: { values: [86.5, 78, 87.4, 91.3, 42, 96.2], labels: ['SL%', 'FCR%', 'QA Score', 'Adherence%', 'Deflection%', 'Compliance%'] },
    table: [
      { metric: 'Service Level', value: '86.5%', status: 'On Target' },
      { metric: 'FCR', value: '78%', status: 'On Target' },
      { metric: 'QA Score', value: '87.4', status: 'Above Target' },
      { metric: 'Adherence', value: '91.3%', status: 'Above Target' },
    ],
  };
};

export default function TalkToData() {
  const { t } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tabStates, setTabStates] = useState({});
  const chatEndRef = useRef(null);
  const getTab = (idx) => tabStates[idx] || 'chart';
  const setTab = (idx, tab) => setTabStates(prev => ({ ...prev, [idx]: tab }));

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const question = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(question);
      setMessages(prev => [...prev, { type: 'assistant', ...response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const renderChart = (msg) => {
    if (msg.chartType === 'area') return <AreaChart data={msg.data.values} color={t.chart[0]} />;
    if (msg.chartType === 'bar') return <BarChart data={msg.data.values} labels={msg.data.labels} colors={[t.chart[0]]} />;
    if (msg.chartType === 'hbar') return <HorizontalBar items={msg.data} maxVal={5} />;
    if (msg.chartType === 'donut') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ position: 'relative' }}>
            <DonutChart value={100} size={140} strokeWidth={24} color={msg.data.segments[0].color} />
            {msg.data.segments.slice(1).map((seg, i) => (
              <div key={i} style={{ position: 'absolute', top: (i + 1) * 12, left: (i + 1) * 12 }}>
                <DonutChart value={seg.value * 2} size={140 - (i + 1) * 24} strokeWidth={24} color={seg.color} bgColor="transparent" />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {msg.data.segments.map((seg, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: seg.color }} />
                <span style={{ fontSize: 13, color: t.text }}>{seg.label}: <strong>{seg.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DashboardHeader title="Talk to Data" subtitle="Ask questions in natural language and get instant data-driven answers" />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Chat Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${t.border}`, minWidth: 0 }}>
          <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 15l.88 2.62L22.5 18.5l-2.62.88L19 22l-.88-2.62L15.5 18.5l2.62-.88L19 15z"/></svg>
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 8 }}>Ask me anything about your data</h2>
                <p style={{ fontSize: 14, color: t.textTertiary, maxWidth: 480, margin: '0 auto 24px' }}>
                  Type a question in natural language. I'll analyze the data and present insights with charts, narratives, and tables.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 600, margin: '0 auto' }}>
                  {sampleQuestions.slice(0, 6).map((q, i) => (
                    <button key={i} onClick={() => { setInput(q); }}
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
              <div key={i} style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.type === 'user' ? (
                  <div style={{ padding: '10px 16px', borderRadius: '16px 16px 4px 16px', background: t.primary, color: '#fff', fontSize: 14, maxWidth: '70%' }}>
                    {msg.text}
                  </div>
                ) : (
                  <div style={{ maxWidth: '90%', width: '100%' }}>
                    <Card style={{ padding: 20 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 12 }}>{msg.title}</div>

                      {/* Tabs */}
                      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${t.border}`, marginBottom: 16 }}>
                        {['chart', 'insight', 'data'].map(tab => (
                          <button key={tab} onClick={() => setTab(i, tab)}
                            style={{ padding: '8px 16px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, fontWeight: getTab(i) === tab ? 600 : 400, color: getTab(i) === tab ? t.primary : t.textTertiary, borderBottom: getTab(i) === tab ? `2px solid ${t.primary}` : '2px solid transparent', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 5 }}>
                            {tab === 'chart' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>}
                            {tab === 'insight' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/></svg>}
                            {tab === 'data' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="10" y1="3" x2="10" y2="21"/></svg>}
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        ))}
                      </div>

                      {getTab(i) === 'chart' && <div style={{ padding: '8px 0' }}>{renderChart(msg)}</div>}

                      {getTab(i) === 'insight' && (
                        <div style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary, padding: '8px 0' }}>
                          {msg.insight}
                        </div>
                      )}

                      {getTab(i) === 'data' && msg.table && (
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                              <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                                {Object.keys(msg.table[0]).map(key => (
                                  <th key={key} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: t.textTertiary, fontSize: 11, textTransform: 'uppercase', background: t.surfaceAlt }}>{key}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {msg.table.map((row, ri) => (
                                <tr key={ri} style={{ borderBottom: `1px solid ${t.borderSubtle}` }}>
                                  {Object.values(row).map((val, vi) => (
                                    <td key={vi} style={{ padding: '8px 12px', color: t.text }}>{val}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: 8, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.borderSubtle}` }}>
                        <button style={{ padding: '6px 12px', borderRadius: 6, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Pin to Dashboard</button>
                        <button style={{ padding: '6px 12px', borderRadius: 6, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Export</button>
                        <button style={{ padding: '6px 12px', borderRadius: 6, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Refine</button>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: t.primary, animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`, opacity: 0.4 }} />
                  ))}
                </div>
                <span style={{ fontSize: 12, color: t.textTertiary }}>Analyzing data...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '16px 32px', borderTop: `1px solid ${t.border}`, background: t.surface }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question about your data..."
                style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 14, outline: 'none' }} />
              <button onClick={handleSend}
                style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: t.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Suggestions */}
        <div style={{ width: 280, overflow: 'auto', padding: 20, background: t.surfaceAlt }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Suggested Questions</div>
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

          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginTop: 24, marginBottom: 12 }}>Question Types</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { type: 'Trend', desc: 'How has X changed?', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
              { type: 'Compare', desc: 'Compare X across Y', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="6" width="4" height="15" rx="1"/><rect x="17" y="2" width="4" height="19" rx="1"/></svg> },
              { type: 'Rank', desc: 'Top/bottom N by X', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="14" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="17" width="10" height="4" rx="1"/></svg> },
              { type: 'Anomaly', desc: 'Any unusual patterns?', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
              { type: 'Forecast', desc: 'Predict future X', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18"/><path d="M3 20V8l5 4 4-8 4 6 4-2v12" strokeDasharray="4 2"/></svg> },
              { type: 'Root Cause', desc: 'Why did X change?', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
            ].map((qt, i) => (
              <div key={i} style={{ padding: '8px 10px', borderRadius: 6, background: t.surface, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <span style={{ display: 'flex', color: t.primary }}>{qt.svg}</span>
                <div>
                  <div style={{ fontWeight: 600, color: t.text }}>{qt.type}</div>
                  <div style={{ color: t.textTertiary, fontSize: 11 }}>{qt.desc}</div>
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
