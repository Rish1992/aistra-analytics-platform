import { useTheme } from './context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, KPICard } from './components/UI';
import { Sparkline } from './components/Charts';
import { DashboardHeader, icons } from './components/Layout';

const dashboards = [
  {
    id: 'cxo', path: '/cxo', title: 'CXO Executive', desc: 'High-level business health for C-suite leaders',
    icon: 'cxo', persona: 'CEO, COO, CFO', refresh: 'Daily', kpis: '8 KPIs',
    tags: ['Revenue', 'CSAT', 'Attrition', 'AI'], status: 'live',
  },
  {
    id: 'operations', path: '/operations', title: 'Operations Manager', desc: 'Command center for day-to-day operational management',
    icon: 'operations', persona: 'VP Ops, Delivery Head', refresh: 'Real-time', kpis: '8 KPIs',
    tags: ['SL', 'AHT', 'Volume', 'Queues'], status: 'live',
  },
  {
    id: 'wallboard', path: '/wallboard', title: 'Real-Time Wallboard', desc: 'Live floor monitor for supervisors and agents',
    icon: 'wallboard', persona: 'Floor Supervisors', refresh: '5-15 sec', kpis: '6 KPIs',
    tags: ['Live', 'Agents', 'SL', 'Queue'], status: 'live',
  },
  {
    id: 'agent', path: '/agent', title: 'Agent Performance', desc: 'Individual and team-level performance evaluation',
    icon: 'agent', persona: 'Team Leads, Supervisors', refresh: 'Daily', kpis: '6 KPIs',
    tags: ['AHT', 'QA', 'CSAT', 'FCR'], status: 'live',
  },
  {
    id: 'qa', path: '/qa', title: 'Quality Assurance', desc: 'Quality evaluation outcomes and coaching effectiveness',
    icon: 'qa', persona: 'QA Managers', refresh: 'Daily', kpis: '6 KPIs',
    tags: ['QA Score', 'Fatal Errors', 'Calibration'], status: 'live',
  },
  {
    id: 'wfm', path: '/wfm', title: 'Workforce Management', desc: 'Staffing optimization, forecast accuracy, and adherence',
    icon: 'wfm', persona: 'WFM Analysts', refresh: '30 min', kpis: '6 KPIs',
    tags: ['Forecast', 'Adherence', 'Shrinkage'], status: 'live',
  },
  {
    id: 'cx', path: '/cx', title: 'Customer Experience', desc: 'Unified view of customer satisfaction and feedback signals',
    icon: 'cx', persona: 'CX Leaders, VOC Analysts', refresh: 'Daily', kpis: '6 KPIs',
    tags: ['CSAT', 'NPS', 'Sentiment', 'FCR'], status: 'live',
  },
  {
    id: 'finance', path: '/finance', title: 'Finance', desc: 'Cost efficiency, revenue, margin, and budget tracking',
    icon: 'finance', persona: 'CFO, Finance Team', refresh: 'Weekly', kpis: '7 KPIs',
    tags: ['Cost', 'Revenue', 'Margin', 'Budget'], status: 'live',
  },
  {
    id: 'ai', path: '/ai', title: 'AI & Automation', desc: 'Bot performance, model accuracy, and automation ROI',
    icon: 'ai', persona: 'AI/ML Leads, CTO', refresh: 'Daily', kpis: '7 KPIs',
    tags: ['Deflection', 'Accuracy', 'Escalation'], status: 'live',
  },
  {
    id: 'bu', path: '/bu', title: 'Business Unit', desc: 'Self-contained performance view per client account',
    icon: 'bu', persona: 'BU Heads, Account Mgrs', refresh: 'Daily', kpis: '9 KPIs',
    tags: ['SLA', 'Volume', 'CSAT', 'Billing'], status: 'live',
  },
  {
    id: 'training', path: '/training', title: 'Training & Development', desc: 'Training effectiveness, ramp speed, and skill gaps',
    icon: 'training', persona: 'L&D Team, HR', refresh: 'Weekly', kpis: '6 KPIs',
    tags: ['Ramp', 'Skills', 'Coaching', 'Cert'], status: 'live',
  },
  {
    id: 'it', path: '/it', title: 'IT & Infrastructure', desc: 'System health, latency, uptime, and incident tracking',
    icon: 'it', persona: 'IT Ops, CTO', refresh: 'Real-time', kpis: '7 KPIs',
    tags: ['Uptime', 'Latency', 'Incidents'], status: 'live',
  },
  {
    id: 'compliance', path: '/compliance', title: 'Compliance & Risk', desc: 'Regulatory adherence, violations, and audit readiness',
    icon: 'compliance', persona: 'Compliance Officers', refresh: 'Daily', kpis: '7 KPIs',
    tags: ['PCI', 'Recording', 'DNC', 'Audit'], status: 'live',
  },
  {
    id: 'campaign', path: '/campaign', title: 'Campaign & Outbound', desc: 'Outbound campaign performance and conversion tracking',
    icon: 'campaign', persona: 'Campaign Managers', refresh: 'Hourly', kpis: '7 KPIs',
    tags: ['Conversion', 'Dialer', 'Revenue'], status: 'live',
  },
];

const platformKPIs = [
  { title: 'Total Contacts (MTD)', value: '284,530', change: '+12.4%', up: true, spark: [220, 235, 228, 242, 255, 248, 262, 270, 265, 285] },
  { title: 'Service Level', value: '86.5%', change: '+1.2pp', up: true, spark: [82, 84, 83, 85, 84, 86, 85, 87, 86, 87] },
  { title: 'Customer Satisfaction', value: '4.3/5', change: '+0.2', up: true, spark: [4.0, 4.1, 4.0, 4.1, 4.2, 4.1, 4.2, 4.3, 4.2, 4.3] },
  { title: 'AI Deflection Rate', value: '42%', change: '+8pp', up: true, spark: [28, 30, 32, 34, 35, 38, 39, 40, 41, 42] },
  { title: 'Net Margin', value: '24.5%', change: '+1.2pp', up: true, spark: [20, 21, 22, 21, 23, 22, 24, 23, 24, 25] },
  { title: 'Active Agents', value: '487', change: '+3.2%', up: true, spark: [460, 465, 468, 470, 472, 475, 478, 480, 484, 487] },
];

export default function DashboardIndex() {
  const { t } = useTheme();
  const navigate = useNavigate();

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <DashboardHeader title="Aistra Analytics Platform" subtitle="Call Center Analytics — Master Dashboard Hub" />

      <div style={{ padding: '24px 32px 64px' }}>
        {/* Platform KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {platformKPIs.map((kpi, i) => (
            <KPICard key={i} {...kpi} sparkColor={t.chart[i % t.chart.length]} />
          ))}
        </div>

        {/* Quick Access */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          <button onClick={() => navigate('/talk-to-data')}
            style={{ flex: 1, padding: '16px 20px', borderRadius: 12, border: `1px solid ${t.border}`, background: `linear-gradient(135deg, ${t.primaryLight}, ${t.surface})`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = t.shadowMd}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{icons.talk}</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Talk to Data</div>
              <div style={{ fontSize: 12, color: t.textTertiary }}>Ask questions in natural language</div>
            </div>
          </button>
          <button onClick={() => navigate('/builder')}
            style={{ flex: 1, padding: '16px 20px', borderRadius: 12, border: `1px solid ${t.border}`, background: `linear-gradient(135deg, ${t.accent1Light}, ${t.surface})`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = t.shadowMd}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: t.gradient3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{icons.builder}</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Dashboard Builder</div>
              <div style={{ fontSize: 12, color: t.textTertiary }}>Create custom dashboards</div>
            </div>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 16 }}>All Dashboards ({dashboards.length})</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {dashboards.map(db => (
            <Card key={db.id} onClick={() => navigate(db.path)}
              style={{ padding: 20, cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = t.shadowMd; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = t.shadow; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: t.primary }}>
                  {icons[db.icon]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{db.title}</span>
                    <Badge variant="success">Live</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: t.textTertiary, marginBottom: 8 }}>{db.desc}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: t.textTertiary, alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> {db.persona}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> {db.refresh}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg> {db.kpis}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                    {db.tags.map(tag => (
                      <span key={tag} style={{ padding: '2px 8px', borderRadius: 10, background: t.surfaceAlt, fontSize: 10, color: t.textSecondary, fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Platform Info */}
        <div style={{ marginTop: 32, padding: '24px', borderRadius: 12, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Aistra Analytics Platform v2.0</div>
            <div style={{ fontSize: 12, color: t.textTertiary }}>14 Dashboards • 30+ Chart Types • Talk-to-Data AI • Custom Builder • White-Label Ready</div>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: t.textTertiary }}>
            <span>Data Freshness: <strong style={{ color: t.success }}>2 min ago</strong></span>
            <span>Uptime: <strong style={{ color: t.success }}>99.97%</strong></span>
            <span>Active Users: <strong style={{ color: t.text }}>142</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
