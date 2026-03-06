import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import {
  Card, KPICard, Widget, DataTable, Badge, SectionTitle, TimeRangeSelector, StatCard
} from '../components/UI';
import {
  GaugeChart, MultiLineChart, StackedAreaChart, HorizontalBar, BarChart, DonutChart, Sparkline
} from '../components/Charts';

// ─── MOCK DATA ───
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const systems = [
  { name: 'ACD / CTI', uptime: 99.97 },
  { name: 'CRM Platform', uptime: 99.92 },
  { name: 'WFM Suite', uptime: 99.98 },
  { name: 'QA Platform', uptime: 99.95 },
  { name: 'IVR / Bot Engine', uptime: 99.88 },
  { name: 'Reporting DW', uptime: 99.91 },
];

const apiLatencySeries = [
  { name: 'CRM API p50', data: [120, 125, 118, 130, 128, 122, 135, 140, 132, 128, 135, 145] },
  { name: 'CRM API p95', data: [280, 295, 270, 310, 300, 285, 320, 340, 305, 295, 315, 340], dashed: true },
  { name: 'Bot API p50', data: [45, 48, 42, 50, 47, 44, 52, 55, 48, 46, 50, 52] },
  { name: 'Bot API p95', data: [110, 118, 105, 125, 120, 112, 130, 138, 118, 115, 125, 130], dashed: true },
];
const latencyLabels = months;
const latencyLimits = [{ value: 300, label: 'SLA Threshold (300ms)' }];

const errorStackedSeries = [
  { name: '5xx Errors', data: [12, 8, 15, 10, 6, 18, 14, 9, 11, 7, 13, 10] },
  { name: '4xx Errors', data: [45, 38, 52, 42, 35, 58, 48, 40, 44, 36, 50, 42] },
  { name: 'Timeouts', data: [8, 5, 10, 7, 4, 12, 9, 6, 8, 5, 10, 7] },
];

const incidentData = [
  { id: 'INC-1042', system: 'CRM Platform', severity: 'P2', start: '2026-03-01 08:14', resolved: '2026-03-01 10:38', duration: '2h 24m', status: 'success', impact: 'Slow page loads for 120 agents' },
  { id: 'INC-1045', system: 'ACD / CTI', severity: 'P1', start: '2026-03-02 14:22', resolved: '2026-03-02 15:05', duration: '43m', status: 'success', impact: 'Routing failures on Queue A' },
  { id: 'INC-1048', system: 'IVR / Bot Engine', severity: 'P3', start: '2026-03-03 09:30', resolved: '2026-03-03 11:15', duration: '1h 45m', status: 'success', impact: 'Delayed bot responses' },
  { id: 'INC-1051', system: 'WFM Suite', severity: 'P2', start: '2026-03-04 06:00', resolved: 'In Progress', duration: '--', status: 'danger', impact: 'Schedule sync failures' },
  { id: 'INC-1053', system: 'Reporting DW', severity: 'P3', start: '2026-03-04 11:40', resolved: 'In Progress', duration: '--', status: 'warning', impact: 'Dashboard data delay (15min)' },
];

const loginIssues = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const loginCounts = [12, 8, 15, 22, 18, 5, 3];

const connectivityTable = [
  { region: 'US East', agents: 420, connectivity: 99.2, latency: '28ms', disconnects: 3, vpn: '98.8%', status: 'success' },
  { region: 'US West', agents: 180, connectivity: 98.8, latency: '35ms', disconnects: 5, vpn: '97.5%', status: 'success' },
  { region: 'EMEA', agents: 240, connectivity: 97.6, latency: '52ms', disconnects: 8, vpn: '96.2%', status: 'warning' },
  { region: 'APAC', agents: 160, connectivity: 96.4, latency: '78ms', disconnects: 12, vpn: '94.8%', status: 'warning' },
  { region: 'LATAM', agents: 90, connectivity: 95.8, latency: '95ms', disconnects: 15, vpn: '93.2%', status: 'danger' },
];

const capacityItems = [
  { label: 'ACD CPU', value: 68, suffix: '%' },
  { label: 'CRM Memory', value: 82, suffix: '%' },
  { label: 'DB Storage', value: 74, suffix: '%' },
  { label: 'Network BW', value: 56, suffix: '%' },
  { label: 'API Gateway', value: 45, suffix: '%' },
  { label: 'Bot Compute', value: 88, suffix: '%' },
  { label: 'Recording Storage', value: 71, suffix: '%' },
];

export default function IT() {
  const { t } = useTheme();
  const [range, setRange] = useState('30d');

  const themedApiLatencySeries = apiLatencySeries.map((s, i) => ({ ...s, color: i < 2 ? t.chart[0] : t.chart[2] }));
  const themedLatencyLimits = [{ ...latencyLimits[0], color: t.danger }];
  const themedErrorStackedSeries = errorStackedSeries.map((s, i) => ({ ...s, color: [t.danger, t.warning, t.info][i] }));
  const themedCapacityItems = capacityItems.map((r, i) => ({ ...r, color: t.chart[i % t.chart.length] }));

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="IT & Infrastructure Dashboard"
        subtitle="System health, uptime monitoring, and incident management"
        actions={<TimeRangeSelector selected={range} onChange={setRange} />}
      />

      <div style={{ padding: 32 }}>
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="ACD Uptime" value="99.97%" sparkData={[99.92, 99.94, 99.95, 99.96, 99.96, 99.97]} sparkColor={t.success} />
          <KPICard title="CRM Uptime" value="99.92%" sparkData={[99.88, 99.89, 99.90, 99.91, 99.91, 99.92]} sparkColor={t.primary} />
          <KPICard title="API Latency" value="145ms" change="+8ms" up={true} isGood={false} sparkData={[130, 135, 138, 140, 142, 145]} sparkColor={t.warning} />
          <KPICard title="Error Rate" value="0.3%" change="-0.1%" up={false} isGood={false} sparkData={[0.5, 0.4, 0.4, 0.3, 0.3, 0.3]} sparkColor={t.success} />
          <KPICard title="Open Incidents" value="3" sparkData={[5, 4, 6, 3, 4, 3]} sparkColor={t.warning} />
          <KPICard title="MTTR" value="2.4h" change="-0.6h" up={false} isGood={false} sparkData={[3.5, 3.2, 3.0, 2.8, 2.6, 2.4]} sparkColor={t.success} />
          <KPICard title="Remote Conn." value="98.1%" sparkData={[96.8, 97.2, 97.5, 97.8, 98.0, 98.1]} sparkColor={t.info} />
        </div>

        {/* Row 2: System Uptime Gauges */}
        <SectionTitle subtitle="Current uptime percentages by critical system">System Uptime</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          {systems.map(sys => (
            <Card key={sys.name} style={{ padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>{sys.name}</div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <DonutChart
                  value={((sys.uptime - 99) / 1) * 100}
                  size={90}
                  strokeWidth={8}
                  color={sys.uptime >= 99.95 ? t.success : sys.uptime >= 99.90 ? t.warning : t.danger}
                />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1 }}>{sys.uptime}%</div>
                </div>
              </div>
              <div style={{ marginTop: 6 }}>
                <Badge variant={sys.uptime >= 99.95 ? 'success' : sys.uptime >= 99.90 ? 'warning' : 'danger'}>
                  {sys.uptime >= 99.95 ? 'Healthy' : sys.uptime >= 99.90 ? 'Monitor' : 'Alert'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Row 3: API Latency + Error Rate */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="API Latency Trends"
            subtitle="p50 and p95 latency by API (ms)"
            insight={{
              description: "CRM API p95 latency has breached the 300ms SLA threshold in 4 of the last 12 months, with a rising trend reaching 340ms. Bot API remains well within limits with p95 consistently under 140ms. The widening gap between CRM p50 and p95 suggests tail-end performance degradation.",
              dataSource: "Application performance monitoring (APM) traces aggregated at p50 and p95 percentiles, sampled every 60 seconds across all API endpoints",
              meaning: "The CRM API is experiencing increasing latency variance, likely due to database query bottlenecks or connection pool exhaustion during peak hours. This directly impacts agent screen load times and contributes to increased AHT.",
              actions: [
                "Investigate CRM API slow queries during peak periods and optimize the top 5 by execution time",
                "Increase connection pool size or implement connection pooling middleware to reduce p95 spikes",
                "Set up automated alerts when CRM p95 exceeds 280ms to enable proactive intervention before SLA breach",
                "Engage the CRM vendor for a performance review and discuss caching strategies for frequently accessed records"
              ]
            }}
            legend={[
              <span key="crm" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 3, borderRadius: 1, background: t.chart[0] }} /> CRM (p50/p95)
              </span>,
              <span key="bot" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 3, borderRadius: 1, background: t.chart[2] }} /> Bot (p50/p95)
              </span>,
            ]}
          >
            <MultiLineChart
              series={themedApiLatencySeries}
              labels={latencyLabels}
              height={200}
              benchmarkLines={themedLatencyLimits}
            />
          </Widget>

          <Widget
            title="Error Rate Breakdown"
            subtitle="Monthly error count by category"
            insight={{
              description: "4xx errors account for 65% of all errors, with periodic spikes correlating to deployment windows. 5xx server errors show an inconsistent pattern with peaks of 18 in June, suggesting intermittent infrastructure issues. Timeout errors remain low but track closely with 5xx spikes.",
              dataSource: "API gateway and application server error logs aggregated monthly, categorized by HTTP status code class and correlated with deployment calendars",
              meaning: "The high 4xx error rate likely reflects client-side integration issues -- misconfigured agent desktop plugins or stale API calls after version updates. The 5xx spike pattern aligning with timeouts suggests a shared root cause, potentially database failover or memory pressure.",
              actions: [
                "Correlate 5xx spikes with deployment and maintenance windows to confirm root cause",
                "Audit 4xx errors to identify the top offending endpoints and update client-side integrations",
                "Implement circuit breakers on critical API paths to prevent cascading timeout failures",
                "Add pre-deployment load testing to catch performance regressions before production rollout"
              ]
            }}
            legend={themedErrorStackedSeries.map(s => (
              <span key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} /> {s.name}
              </span>
            ))}
          >
            <StackedAreaChart series={themedErrorStackedSeries} labels={months} height={200} />
          </Widget>
        </div>

        {/* Row 4: Incident Timeline Table */}
        <div style={{ marginBottom: 24 }}>
          <DataTable
            title="Incident Timeline"
            columns={[
              { key: 'id', label: 'Incident ID', render: (val) => <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{val}</span> },
              { key: 'system', label: 'System' },
              { key: 'severity', label: 'Severity', align: 'center', render: (val) => (
                <Badge variant={val === 'P1' ? 'danger' : val === 'P2' ? 'warning' : 'info'}>{val}</Badge>
              )},
              { key: 'start', label: 'Start Time', align: 'center' },
              { key: 'resolved', label: 'Resolved', align: 'center', render: (val) => (
                <span style={{ color: val === 'In Progress' ? t.danger : t.textSecondary, fontWeight: val === 'In Progress' ? 600 : 400 }}>{val}</span>
              )},
              { key: 'duration', label: 'Duration', align: 'center' },
              { key: 'status', label: 'Status', align: 'center', render: (val) => (
                <Badge variant={val}>{val === 'success' ? 'Resolved' : val === 'danger' ? 'Active' : 'Monitoring'}</Badge>
              )},
              { key: 'impact', label: 'Impact' },
            ]}
            rows={incidentData}
            pageSize={5}
          />
        </div>

        {/* Row 5: Login Issues + Remote Connectivity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Login / Session Issues"
            subtitle="Daily count this week"
            insight={{
              description: "Thursday saw a peak of 22 login/session issues, nearly 3x the weekend average. The weekly total of 83 issues is down 14% from last week, but mid-week spikes on Wednesday-Friday suggest systemic issues during peak operating hours.",
              dataSource: "SSO authentication logs, VPN session records, and IT help desk tickets tagged as login or session-related, aggregated daily",
              meaning: "The mid-week concentration aligns with maximum agent headcount days, exposing capacity limitations in authentication infrastructure. The downward weekly trend suggests recent SSO configuration changes are helping, but peak-day issues persist.",
              actions: [
                "Investigate Thursday's spike for concurrent session limits or SSO token expiration timing",
                "Pre-scale authentication services on high-headcount days (Wed-Fri) to handle peak login volume",
                "Deploy a session keep-alive mechanism to reduce mid-shift re-authentication drops",
                "Create a self-service password reset portal to reduce help desk ticket volume for credential issues"
              ]
            }}
          >
            <BarChart data={loginCounts} labels={loginIssues} colors={[t.warning]} height={180} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, padding: '8px 12px', background: t.surfaceAlt, borderRadius: 8 }}>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Week Total</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>83</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Avg / Day</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>11.9</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>vs Last Week</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.success }}>-14%</div>
              </div>
            </div>
          </Widget>

          <DataTable
            title="Remote Connectivity by Region"
            columns={[
              { key: 'region', label: 'Region' },
              { key: 'agents', label: 'Agents', align: 'center' },
              { key: 'connectivity', label: 'Connectivity %', align: 'center', render: (val) => (
                <span style={{ fontWeight: 600, color: val >= 98 ? t.success : val >= 96 ? t.warning : t.danger }}>{val}%</span>
              )},
              { key: 'latency', label: 'Avg Latency', align: 'center' },
              { key: 'disconnects', label: 'Disconnects', align: 'center' },
              { key: 'vpn', label: 'VPN Uptime', align: 'center' },
              { key: 'status', label: 'Status', align: 'center', render: (val) => (
                <Badge variant={val}>{val === 'success' ? 'Good' : val === 'warning' ? 'Fair' : 'Poor'}</Badge>
              )},
            ]}
            rows={connectivityTable}
            pageSize={5}
          />
        </div>

        {/* Row 6: Capacity Utilization */}
        <Widget
          title="Capacity Utilization"
          subtitle="Current resource usage across infrastructure components"
          insight={{
            description: "Bot Compute is at 88% utilization -- the highest across all infrastructure components and approaching the 90% critical threshold. CRM Memory at 82% is the second concern. API Gateway and Network BW remain healthy at 45% and 56% respectively, providing comfortable headroom.",
            dataSource: "Infrastructure monitoring platform (Prometheus/Grafana) polling resource metrics every 30 seconds, displayed as current utilization percentages",
            meaning: "Bot Compute at 88% signals that growing chatbot and IVR automation volume is outpacing provisioned capacity. With 7 auto-scale events in the last 24 hours, the system is frequently hitting scaling triggers, which adds latency during scale-up windows.",
            actions: [
              "Increase Bot Compute baseline allocation by 25% to reduce auto-scale frequency and associated latency",
              "Schedule CRM Memory capacity review before it crosses 85% -- evaluate heap tuning or instance upsizing",
              "Set proactive alerts at 80% for all components to enable capacity planning before critical thresholds",
              "Include capacity projections in the upcoming Mar 8 maintenance window for DB migration planning"
            ]
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <HorizontalBar items={themedCapacityItems} maxVal={100} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ padding: '12px 16px', background: t.surfaceAlt, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: t.textTertiary, marginBottom: 4 }}>Capacity Alerts</div>
                {themedCapacityItems.filter(i => i.value >= 80).map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.value >= 90 ? t.danger : t.warning }} />
                    <span style={{ fontSize: 12, color: t.text }}>{item.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: item.value >= 90 ? t.danger : t.warning, marginLeft: 'auto' }}>{item.value}%</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px 16px', background: t.surfaceAlt, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: t.textTertiary, marginBottom: 4 }}>Auto-Scale Events (24h)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>7</div>
                <div style={{ fontSize: 11, color: t.textTertiary }}>3 scale-up, 4 scale-down</div>
              </div>
              <div style={{ padding: '12px 16px', background: t.surfaceAlt, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: t.textTertiary, marginBottom: 4 }}>Next Maintenance Window</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Mar 8, 2026 02:00 UTC</div>
                <div style={{ fontSize: 11, color: t.textTertiary }}>Planned: DB migration + patch</div>
              </div>
            </div>
          </div>
        </Widget>
      </div>
    </div>
  );
}
