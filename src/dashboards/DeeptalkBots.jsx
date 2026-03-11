import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { KPICard, Card, SectionTitle, DataTable } from '../components/UI';
import { HorizontalBar, DonutChart, BarChart } from '../components/Charts';
import { getBots } from '../api/client';

const fmtSession = (secs) => {
  if (!secs) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function DeeptalkBots() {
  const { t } = useTheme();
  const [bots, setBots] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBots().then(d => { setBots(d); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <DashboardHeader title="Deeptalk Bots" subtitle="Bot performance, LLM usage, and session analytics" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: t.gradient1, animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: 14, color: t.textTertiary }}>Loading bot data...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  if (bots?.error) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <DashboardHeader title="Deeptalk Bots" subtitle="Bot analytics" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card style={{ padding: 32, maxWidth: 400, textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: t.danger, marginBottom: 8 }}>Connection Error</div>
            <div style={{ fontSize: 13, color: t.textSecondary }}>{bots.error}</div>
          </Card>
        </div>
      </div>
    );
  }

  const botList = Array.isArray(bots?.bots) ? bots.bots : [];
  const totalBots = botList.length;
  const botsWithContacts = botList.filter(b => (b.contact_count || 0) > 0).length;

  // LLM model counts
  const llmCounts = {};
  botList.forEach(b => {
    const llm = b.llm || 'unknown';
    llmCounts[llm] = (llmCounts[llm] || 0) + 1;
  });
  const llmEntries = Object.entries(llmCounts).sort((a, b) => b[1] - a[1]);

  // Top 20 bots by volume
  const topByVolume = [...botList].filter(b => b.contact_count > 0).sort((a, b) => b.contact_count - a.contact_count).slice(0, 20);

  // Top 15 bots by avg session
  const topBySession = [...botList].filter(b => b.avg_session_length > 0).sort((a, b) => b.avg_session_length - a.avg_session_length).slice(0, 15);

  const tableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'llm', label: 'LLM', render: v => v || 'unknown' },
    { key: 'contact_count', label: 'Contacts', align: 'right' },
    { key: 'avg_session_length', label: 'Avg Session', align: 'right', render: v => fmtSession(v) },
    { key: 'last_edited', label: 'Last Edited', render: v => v ? new Date(v).toLocaleDateString() : '-' },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <DashboardHeader title="Deeptalk Bots" subtitle="Bot performance, LLM usage, and session analytics" />

      <div style={{ padding: '24px 32px 64px' }}>
        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          <KPICard title="Total Bots" value={totalBots} />
          <KPICard title="Bots with Contacts" value={botsWithContacts} subtitle={`${Math.round((botsWithContacts / totalBots) * 100)}% active`} />
          {llmEntries.slice(0, 2).map(([model, count]) => (
            <KPICard key={model} title={`LLM: ${model}`} value={count} subtitle={`${Math.round((count / totalBots) * 100)}% of bots`} />
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Card>
            <SectionTitle subtitle="Top 20 bots by contact volume">Bot Volume Ranking</SectionTitle>
            <HorizontalBar items={topByVolume.map((b, i) => ({ label: b.name, value: b.contact_count, color: t.chart[i % t.chart.length] }))} />
          </Card>
          <Card>
            <SectionTitle subtitle="Blank LLM mapped to unknown">LLM Model Distribution</SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ position: 'relative' }}>
                <DonutChart value={Math.round((llmEntries[0]?.[1] / totalBots) * 100)} size={120} strokeWidth={16} color={t.chart[0]} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {llmEntries.map(([model, count], i) => (
                  <div key={model} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: t.chart[i % t.chart.length] }} />
                    <span style={{ fontSize: 13, color: t.text }}>{model}: <strong>{count}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Avg Session chart */}
        <Card style={{ marginBottom: 24 }}>
          <SectionTitle subtitle="Top 15 bots by average session duration">Avg Session by Bot</SectionTitle>
          <BarChart
            data={topBySession.map(b => Math.round(b.avg_session_length))}
            labels={topBySession.map(b => b.name.length > 15 ? b.name.slice(0, 14) + '...' : b.name)}
            colors={[t.chart[1]]}
          />
        </Card>

        {/* Table */}
        <DataTable
          title="All Bots"
          columns={tableColumns}
          rows={botList}
          pageSize={10}
        />
      </div>
    </div>
  );
}
