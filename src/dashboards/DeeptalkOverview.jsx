import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { KPICard, Card, SectionTitle } from '../components/UI';
import { AreaChart, HorizontalBar, DonutChart } from '../components/Charts';
import { getOverview } from '../api/client';

const fmtSession = (secs) => {
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function DeeptalkOverview() {
  const { t } = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOverview().then(d => { setData(d); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <DashboardHeader title="Deeptalk Voice Bot Analytics" subtitle="Live MongoDB data — contacts, bots, sessions, deployments" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: t.gradient1, animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: 14, color: t.textTertiary }}>Loading analytics...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  if (data?.error) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <DashboardHeader title="Deeptalk Voice Bot Analytics" subtitle="Live MongoDB data" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card style={{ padding: 32, maxWidth: 400, textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: t.danger, marginBottom: 8 }}>Connection Error</div>
            <div style={{ fontSize: 13, color: t.textSecondary }}>{data.error}</div>
            <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 8 }}>Make sure the dashboard backend is running on port 8000.</div>
          </Card>
        </div>
      </div>
    );
  }

  const { total_contacts, total_bots, total_deployments, avg_session_length, contacts_per_month, top_bots_by_volume, top_bots_by_session, deployment_types, tts_providers } = data;

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <DashboardHeader title="Deeptalk Voice Bot Analytics" subtitle="Live MongoDB data — contacts, bots, sessions, deployments" />

      <div style={{ padding: '24px 32px 64px' }}>
        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          <KPICard title="Total Contacts" value={total_contacts?.toLocaleString()} />
          <KPICard title="Total Bots" value={total_bots} />
          <KPICard title="Total Deployments" value={total_deployments} />
          <KPICard title="Avg Session" value={fmtSession(avg_session_length || 0)} subtitle="mm:ss" />
        </div>

        {/* Charts Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Card>
            <SectionTitle subtitle="Monthly contact volume">Contacts per Month</SectionTitle>
            {contacts_per_month && (
              <>
                <AreaChart data={contacts_per_month.map(m => m.count)} color={t.chart[0]} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '0 4px' }}>
                  {contacts_per_month.map((m, i) => (
                    <span key={i} style={{ fontSize: 9, color: t.textTertiary }}>{m.month}</span>
                  ))}
                </div>
              </>
            )}
          </Card>
          <Card>
            <SectionTitle subtitle="By contact volume">Top 10 Bots by Volume</SectionTitle>
            {top_bots_by_volume && (
              <HorizontalBar items={top_bots_by_volume.map((b, i) => ({ label: b.bot_name, value: b.count, color: t.chart[i % t.chart.length] }))} />
            )}
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Card>
            <SectionTitle subtitle="VOICE vs WEB">Deployment Types</SectionTitle>
            {deployment_types && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ position: 'relative' }}>
                  <DonutChart value={Math.round((deployment_types[0]?.count / total_deployments) * 100)} size={120} strokeWidth={16} color={t.chart[0]} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {deployment_types.map((dt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: t.chart[i % t.chart.length] }} />
                      <span style={{ fontSize: 13, color: t.text }}>{dt.type}: <strong>{dt.count}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
          <Card>
            <SectionTitle subtitle="Text-to-speech provider distribution">TTS Providers</SectionTitle>
            {tts_providers && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ position: 'relative' }}>
                  <DonutChart value={Math.round((tts_providers[0]?.count / tts_providers.reduce((s, p) => s + p.count, 0)) * 100)} size={120} strokeWidth={16} color={t.chart[2]} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {tts_providers.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: t.chart[(i + 2) % t.chart.length] }} />
                      <span style={{ fontSize: 13, color: t.text }}>{p.provider}: <strong>{p.count}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Charts Row 3 */}
        <Card>
          <SectionTitle subtitle="Average session duration per bot (seconds)">Top 10 Bots by Avg Session Length</SectionTitle>
          {top_bots_by_session && (
            <HorizontalBar items={top_bots_by_session.map((b, i) => ({ label: b.bot_name, value: Math.round(b.avg_session), suffix: 's', color: t.chart[i % t.chart.length] }))} />
          )}
        </Card>
      </div>
    </div>
  );
}
