import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, KPICard, Widget, FilterBar, DataTable, AlertList, Badge } from '../components/UI';
import { ComboChart, MultiLineChart, BarChart, StackedAreaChart, DonutChart, Sparkline } from '../components/Charts';

// ─── INLINE MOCK DATA ───
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const revenueData = [2.4, 2.5, 2.6, 2.7, 2.6, 2.8, 2.9, 3.0, 3.0, 3.1, 3.1, 3.2];
const marginData = [38, 39, 38, 40, 41, 42, 41, 43, 44, 43, 45, 46];

const csatTrend = [4.0, 4.0, 4.1, 4.1, 4.0, 4.1, 4.2, 4.2, 4.1, 4.2, 4.3, 4.3];
const npsTrend = [32, 33, 35, 34, 36, 37, 38, 39, 40, 41, 41, 42];

const costPerChannel = {
  labels: ['Voice', 'Chat', 'Email', 'Social', 'Self-Serve'],
  inbound: [8.50, 3.20, 4.10, 2.80, 0.45],
  outbound: [6.20, 2.10, 3.50, 1.90, 0.30],
};

const contactVolumeData = {
  labels: months,
  series: [
    { name: 'Voice', data: [120, 118, 115, 112, 108, 105, 102, 100, 98, 96, 95, 93], color: '' },
    { name: 'Chat', data: [45, 48, 52, 56, 60, 65, 68, 72, 75, 78, 80, 84], color: '' },
    { name: 'Email', data: [30, 29, 28, 27, 26, 25, 24, 23, 23, 22, 22, 21], color: '' },
    { name: 'Social', data: [8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28], color: '' },
  ],
};

const aiDeflectionTrend = [22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 41, 42];

const attritionTrend = [12, 11.5, 11, 10.5, 10, 9.8, 9.5, 9.2, 9.0, 8.8, 8.5, 8.2];

const buPerformance = [
  { bu: 'Retail Banking', revenue: '$1.2M', csat: 4.4, sl: '88%', cpc: '$3.90', aiDeflect: '45%', status: 'green' },
  { bu: 'Credit Cards', revenue: '$680K', csat: 4.2, sl: '85%', cpc: '$4.50', aiDeflect: '38%', status: 'amber' },
  { bu: 'Insurance', revenue: '$520K', csat: 4.3, sl: '87%', cpc: '$4.10', aiDeflect: '41%', status: 'green' },
  { bu: 'Wealth Mgmt', revenue: '$480K', csat: 4.5, sl: '91%', cpc: '$5.80', aiDeflect: '32%', status: 'amber' },
  { bu: 'Commercial', revenue: '$320K', csat: 4.1, sl: '82%', cpc: '$4.60', aiDeflect: '48%', status: 'red' },
];

const riskAlerts = [
  { severity: 'danger', title: 'Commercial BU SL below 85%', message: 'Service Level at 82% for 3 consecutive days. Staffing gap identified.', time: '12 min ago' },
  { severity: 'warning', title: 'Credit Cards CSAT declining', message: 'CSAT dropped 0.1 points week-over-week. Root cause: long hold times.', time: '35 min ago' },
  { severity: 'warning', title: 'Voice AHT trending up', message: 'Average Handle Time increased 8% this week vs benchmark.', time: '1h ago' },
  { severity: 'info', title: 'AI Deflection milestone', message: 'Chat bot deflection rate hit 52% in Retail Banking - new high.', time: '2h ago' },
  { severity: 'danger', title: 'Attrition spike in Insurance', message: '3 agents resigned this week. Team capacity at risk for next month.', time: '3h ago' },
];

const filters = [
  { key: 'period', label: 'Period', default: 'March 2026', type: 'dropdown', icon: 'cal' },
  { key: 'bu', label: 'Business Unit', default: 'All', type: 'dropdown' },
  { key: 'region', label: 'Region', default: 'All Regions', type: 'dropdown' },
];

// ─── COMPONENT ───
export default function CXO() {
  const { t } = useTheme();

  const buColumns = [
    { key: 'bu', label: 'Business Unit' },
    { key: 'revenue', label: 'Revenue', align: 'right' },
    {
      key: 'csat', label: 'CSAT', align: 'center',
      render: (v) => {
        const color = v >= 4.3 ? t.success : v >= 4.1 ? t.warning : t.danger;
        return <span style={{ fontWeight: 600, color }}>{v}</span>;
      },
    },
    {
      key: 'sl', label: 'Service Level', align: 'center',
      render: (v) => {
        const num = parseFloat(v);
        const color = num >= 86 ? t.success : num >= 80 ? t.warning : t.danger;
        return <span style={{ fontWeight: 600, color }}>{v}</span>;
      },
    },
    { key: 'cpc', label: 'Cost/Contact', align: 'right' },
    {
      key: 'aiDeflect', label: 'AI Deflection', align: 'center',
      render: (v) => {
        const num = parseFloat(v);
        const variant = num >= 40 ? 'success' : num >= 30 ? 'warning' : 'danger';
        return <Badge variant={variant}>{v}</Badge>;
      },
    },
    {
      key: 'status', label: 'Status', align: 'center',
      render: (v) => {
        const colors = { green: t.success, amber: t.warning, red: t.danger };
        return (
          <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: colors[v], boxShadow: `0 0 6px ${colors[v]}40` }} />
        );
      },
    },
  ];

  // Assign chart colors from theme
  const volumeSeries = contactVolumeData.series.map((s, i) => ({ ...s, color: t.chart[i] }));

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="CXO Executive Dashboard"
        subtitle="Enterprise-wide performance overview for senior leadership"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <FilterBar filters={filters} />

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="Revenue" value="$3.2M" change="+18% YoY" up isGood sparkData={revenueData} sparkColor={t.success} />
          <KPICard title="Cost per Contact" value="$4.20" change="-5% MoM" up={false} isGood={false} sparkData={[4.80, 4.70, 4.60, 4.55, 4.50, 4.45, 4.40, 4.35, 4.30, 4.25, 4.22, 4.20]} sparkColor={t.success} />
          <KPICard title="CSAT" value="4.3/5" change="+0.2 pts" up isGood sparkData={csatTrend} sparkColor={t.success} />
          <KPICard title="Service Level" value="86.5%" change="+1.2pp" up isGood sparkData={[82, 83, 84, 84, 85, 85, 85.5, 86, 86, 86, 86.5, 86.5]} sparkColor={t.primary} />
          <KPICard title="Attrition Rate" value="8.2%" change="-1.1pp" up={false} isGood={false} sparkData={[12, 11.5, 11, 10.5, 10, 9.8, 9.5, 9.2, 9.0, 8.8, 8.5, 8.2]} sparkColor={t.success} />
          <KPICard title="AI Deflection" value="42%" change="+8pp" up isGood sparkData={aiDeflectionTrend} sparkColor={t.accent1} />
          <KPICard title="Total Contact Volume" value="285K" change="+12% YoY" up isGood sparkData={[240, 248, 252, 258, 262, 268, 272, 275, 278, 280, 283, 285]} sparkColor={t.primary} />
          <KPICard title="Net Margin" value="24.5%" change="+1.2pp" up isGood sparkData={[21.0, 21.5, 22.0, 22.3, 22.8, 23.0, 23.2, 23.5, 23.8, 24.0, 24.2, 24.5]} sparkColor={t.success} />
        </div>

        {/* Row 2: Revenue + CSAT/NPS + Cost */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Revenue & Margin Trend" subtitle="Monthly | 12-month view"
            insight={{
              description: "Tracks monthly revenue in millions and operating margin percentage across the contact center. Revenue bars show top-line income; the margin line reveals operational efficiency after direct costs.",
              dataSource: "Finance ERP (SAP/Oracle) integrated via daily ETL. Revenue from billing systems; margin calculated from labor costs, technology spend, and facility overhead allocations.",
              meaning: "Revenue growing at 18% YoY with expanding margins (38%→46%) indicates the contact center is scaling efficiently. The upward margin trend suggests AI deflection and process improvements are reducing per-contact costs faster than volume growth.",
              actions: [
                "Continue investing in AI and automation channels that are driving margin expansion",
                "Set quarterly margin targets of 45%+ to maintain momentum",
                "Review cost allocation methodology to ensure margin calculations reflect true unit economics",
                "Present ROI case for further technology investment using this data"
              ]
            }}
            legend={[
              <span key="r" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0] }} />Revenue ($M)</span>,
              <span key="m" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[1] }} />Margin (%)</span>,
            ]}>
            <ComboChart
              barData={revenueData}
              lineData={marginData}
              labels={months}
              barColor={t.chart[0]}
              lineColor={t.chart[1]}
              barLabel="Revenue ($M)"
              lineLabel="Margin (%)"
            />
          </Widget>

          <Widget title="CSAT & NPS Trends" subtitle="12-month trajectory"
            insight={{
              description: "Dual-axis view of Customer Satisfaction (CSAT on 1-5 scale) and Net Promoter Score (NPS) trends over 12 months. CSAT measures immediate interaction quality; NPS captures long-term brand loyalty.",
              dataSource: "Post-interaction survey platform (Medallia/Qualtrics). CSAT collected via IVR/email within 24 hours of contact. NPS from quarterly relationship surveys with 35% response rate.",
              meaning: "Both metrics trending upward (CSAT 4.0→4.3, NPS 32→42) confirms sustained CX improvement. NPS of +42 places the organization in 'Excellent' territory. The parallel movement suggests operational improvements are translating to loyalty.",
              actions: [
                "Investigate NPS detractor verbatims to identify remaining pain points",
                "Set stretch target of NPS +50 for next quarter",
                "Share these results with the board to demonstrate CX investment ROI",
                "Cross-reference CSAT dips with operational events for root cause analysis"
              ]
            }}
            legend={[
              <span key="c" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[2] }} />CSAT</span>,
              <span key="n" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.accent1 }} />NPS</span>,
            ]}>
            <MultiLineChart
              series={[
                { data: csatTrend.map(v => v * 20), color: t.chart[2] },
                { data: npsTrend, color: t.accent1 },
              ]}
              labels={months}
            />
          </Widget>

          <Widget title="Cost per Contact by Channel" subtitle="Inbound vs Outbound"
            insight={{
              description: "Grouped bar chart comparing inbound vs outbound cost per contact across Voice, Chat, Email, Social, and Self-Serve channels.",
              dataSource: "Finance systems with activity-based costing model. Includes agent labor (fully loaded), technology per-minute costs, overhead allocation, and QA/training costs per channel.",
              meaning: "Voice remains the costliest channel ($8.50 inbound) while Self-Serve is cheapest ($0.45). The gap between Voice and Digital channels ($3-5 difference) represents the economic case for channel shift. Outbound is consistently cheaper than inbound across all channels due to predictive scheduling.",
              actions: [
                "Accelerate digital channel adoption to reduce blended cost per contact",
                "Target moving 5% of Voice contacts to Chat (saves ~$5 per contact)",
                "Invest in Self-Serve knowledge base to increase deflection rate",
                "Review why Social is cheaper than Email - may indicate incomplete cost allocation"
              ]
            }}
            legend={[
              <span key="i" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0] }} />Inbound</span>,
              <span key="o" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[1] }} />Outbound</span>,
            ]}>
            <BarChart
              data={[costPerChannel.inbound, costPerChannel.outbound]}
              labels={costPerChannel.labels}
              colors={[t.chart[0], t.chart[1]]}
            />
          </Widget>
        </div>

        {/* Row 2.5: Attrition Rate Trend */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Attrition Rate Trend" subtitle="12-month trend with 10% danger threshold"
            insight={{
              description: "Line chart tracking monthly attrition rate over 12 months with a threshold band at 10% marking the danger zone. Shows the trajectory from high attrition toward a healthier retention level.",
              dataSource: "HR Information System (Workday/SAP SuccessFactors). Monthly voluntary and involuntary separations divided by average headcount. Excludes internal transfers and promotions.",
              meaning: "Attrition declining steadily from 12% to 8.2% over 12 months indicates successful retention initiatives. Crossing below the 10% danger threshold in May was a key milestone. Current 8.2% is approaching the industry benchmark of 7-8% for contact centers.",
              actions: [
                "Identify which retention programs contributed most to the decline and double down",
                "Monitor Insurance BU attrition spike separately as it may reverse the overall trend",
                "Set target of 7.5% attrition by Q3 to reach best-in-class levels",
                "Conduct stay interviews with tenured agents to understand retention drivers"
              ],
              metrics: [
                { label: 'Current Rate', value: '8.2%', color: t.success },
                { label: 'Peak (Jan)', value: '12.0%', color: t.danger },
                { label: 'Threshold', value: '10.0%', color: t.warning },
              ]
            }}
            legend={[
              <span key="a" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[3] }} />Attrition Rate</span>,
              <span key="b" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 2, borderRadius: 2, background: t.danger, opacity: 0.6 }} />10% Threshold</span>,
            ]}>
            <MultiLineChart
              series={[{ data: attritionTrend, color: t.chart[3] }]}
              labels={months}
              width={800}
              benchmarkLines={[{ value: 10, label: 'Danger Zone (10%)', color: t.danger }]}
            />
          </Widget>
        </div>

        {/* Row 3: Contact Volume + AI Deflection */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Contact Volume by Channel" subtitle="Stacked area | thousands"
            insight={{
              description: "Stacked area chart showing 12-month contact volume trends broken down by Voice, Chat, Email, and Social media channels (in thousands).",
              dataSource: "ACD/IVR systems (Genesys/NICE), chat platform (LivePerson), email ticketing (Zendesk), social CRM. Data aggregated hourly, displayed as monthly totals.",
              meaning: "Clear channel shift underway: Voice declining from 120K→93K while Chat surging 45K→84K. Total volume is relatively stable (~225K/month) indicating migration rather than growth. Social growing fast from low base.",
              actions: [
                "Ensure chat staffing model accounts for continued 15-20% quarterly growth",
                "Evaluate voice agent retraining for omnichannel capabilities",
                "Monitor Email decline - may need investigation if customers are switching to Social instead",
                "Plan for Social channel capacity as it approaches Email volumes"
              ]
            }}
            legend={volumeSeries.map((s, i) => (
              <span key={i} style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />{s.name}
              </span>
            ))}>
            <StackedAreaChart series={volumeSeries} labels={months} />
          </Widget>

          <Widget title="AI Deflection Rate" subtitle="Self-service & bot resolution"
            insight={{
              description: "Donut chart showing current AI deflection rate with 12-month trend sparkline and breakdown by channel (Chat Bot, IVR Self-Serve, Knowledge Base).",
              dataSource: "Bot platform analytics (Google CCAI/Amazon Lex), IVR containment reports, knowledge base usage logs. Deflection = contacts fully resolved without human agent involvement.",
              meaning: "42% deflection rate (up from 22%) represents ~100K contacts/month handled by AI. Knowledge Base has highest individual rate (61%) suggesting self-service content is effective. Chat Bot at 52% has room to improve.",
              actions: [
                "Focus bot training on the top 10 contact reasons to push deflection to 50%",
                "Investigate IVR Self-Serve rate of 38% - identify drop-off points in IVR flow",
                "Expand Knowledge Base content for the 5 highest-volume topics",
                "Calculate cost savings: 42% deflection at $4.20/contact = ~$420K/month saved"
              ]
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center', paddingTop: 8 }}>
              <div style={{ position: 'relative' }}>
                <DonutChart value={42} size={120} strokeWidth={12} color={t.accent1} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: t.text }}>42%</div>
                  <div style={{ fontSize: 10, color: t.textTertiary }}>Deflected</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 8 }}>Trend (12mo)</div>
                <Sparkline data={aiDeflectionTrend} color={t.accent1} width={140} height={48} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: t.textTertiary }}>22%</span>
                  <span style={{ fontSize: 10, color: t.accent1, fontWeight: 600 }}>42%</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              {[
                { label: 'Chat Bot', value: '52%', color: t.chart[0] },
                { label: 'IVR Self-Serve', value: '38%', color: t.chart[1] },
                { label: 'Knowledge Base', value: '61%', color: t.chart[2] },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < 2 ? `1px solid ${t.borderSubtle}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: 12, color: t.textSecondary }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.value}</span>
                </div>
              ))}
            </div>
          </Widget>
        </div>

        {/* Row 4: BU Table + Alerts */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          <DataTable
            title="Business Unit Performance"
            columns={buColumns}
            rows={buPerformance}
            pageSize={5}
          />
          <Widget title="Top Risk Alerts" subtitle="Automated anomaly detection"
            insight={{
              description: "Real-time alert feed showing automated anomaly detection results, ranked by severity (Critical, Warning, Info). Monitors SLA breaches, metric declines, and milestone events.",
              dataSource: "Anomaly detection engine running on streaming operational data. Rules engine + ML-based threshold monitoring across 50+ KPIs. Alert triggers configured by business rules.",
              meaning: "Two critical alerts require immediate attention: Commercial BU SL below target for 3 days signals a staffing gap, and Insurance attrition spike threatens capacity. The AI Deflection milestone is a positive signal worth celebrating.",
              actions: [
                "Address Commercial BU staffing gap immediately - consider cross-training from other BUs",
                "Launch retention program for Insurance team agents",
                "Investigate Credit Cards hold time root cause and implement quick fixes",
                "Acknowledge AI deflection milestone and set next target"
              ]
            }}>
            <AlertList alerts={riskAlerts} />
          </Widget>
        </div>
      </div>
    </div>
  );
}
