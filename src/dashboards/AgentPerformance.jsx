import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, KPICard, Widget, FilterBar, DataTable, Badge } from '../components/UI';
import { RadarChart, MultiLineChart, BoxPlot, Heatmap, Sparkline } from '../components/Charts';

// ─── INLINE MOCK DATA ───
const radarDimensions = ['AHT', 'QA Score', 'CSAT', 'FCR', 'Adherence', 'Productivity'];
const radarEntities = [
  { name: 'Top Performer', values: [92, 95, 96, 90, 94, 88], color: '' },
  { name: 'Team Average', values: [75, 82, 78, 72, 80, 76], color: '' },
  { name: 'Bottom Quartile', values: [55, 62, 60, 58, 65, 60], color: '' },
];

const agentRows = [
  { name: 'Sarah Chen', team: 'Alpha', aht: '4:12', qa: 94.2, csat: 4.6, fcr: 85, adherence: 96, calls: 48, trend: [42, 44, 45, 46, 47, 48, 48], rank: 1 },
  { name: 'David Kim', team: 'Alpha', aht: '4:28', qa: 93.1, csat: 4.5, fcr: 83, adherence: 94, calls: 46, trend: [40, 42, 43, 44, 45, 46, 46], rank: 2 },
  { name: 'Priya Patel', team: 'Beta', aht: '4:35', qa: 92.5, csat: 4.5, fcr: 82, adherence: 93, calls: 45, trend: [38, 40, 42, 43, 44, 45, 45], rank: 3 },
  { name: 'Emma Davis', team: 'Gamma', aht: '4:48', qa: 91.8, csat: 4.4, fcr: 81, adherence: 92, calls: 44, trend: [41, 42, 43, 43, 44, 44, 44], rank: 4 },
  { name: 'Tom Baker', team: 'Alpha', aht: '5:02', qa: 90.4, csat: 4.4, fcr: 80, adherence: 91, calls: 43, trend: [39, 40, 41, 42, 42, 43, 43], rank: 5 },
  { name: 'Anna Kowal', team: 'Beta', aht: '5:10', qa: 89.7, csat: 4.3, fcr: 79, adherence: 90, calls: 42, trend: [38, 39, 40, 41, 41, 42, 42], rank: 6 },
  { name: 'Chris Lee', team: 'Gamma', aht: '5:18', qa: 88.5, csat: 4.3, fcr: 78, adherence: 89, calls: 41, trend: [37, 38, 39, 40, 40, 41, 41], rank: 7 },
  { name: 'Carlos Ruiz', team: 'Delta', aht: '5:25', qa: 87.8, csat: 4.2, fcr: 77, adherence: 92, calls: 40, trend: [36, 37, 38, 39, 39, 40, 40], rank: 8 },
  { name: 'Lin Zhang', team: 'Alpha', aht: '5:32', qa: 87.2, csat: 4.2, fcr: 76, adherence: 91, calls: 39, trend: [35, 36, 37, 38, 38, 39, 39], rank: 9 },
  { name: 'Rachel Moore', team: 'Beta', aht: '5:40', qa: 86.5, csat: 4.1, fcr: 75, adherence: 88, calls: 38, trend: [34, 35, 36, 37, 37, 38, 38], rank: 10 },
  { name: 'Mike Torres', team: 'Gamma', aht: '5:48', qa: 85.8, csat: 4.1, fcr: 74, adherence: 87, calls: 37, trend: [33, 34, 35, 36, 36, 37, 37], rank: 11 },
  { name: 'Sophia Lam', team: 'Delta', aht: '5:55', qa: 84.3, csat: 4.0, fcr: 73, adherence: 86, calls: 36, trend: [32, 33, 34, 35, 35, 36, 36], rank: 12 },
  { name: 'Ryan Shah', team: 'Alpha', aht: '6:05', qa: 82.9, csat: 3.9, fcr: 71, adherence: 84, calls: 35, trend: [32, 33, 33, 34, 34, 35, 35], rank: 13 },
  { name: 'Olivia Wu', team: 'Beta', aht: '6:18', qa: 80.5, csat: 3.8, fcr: 68, adherence: 82, calls: 33, trend: [30, 31, 31, 32, 32, 33, 33], rank: 14 },
  { name: 'Derek Jones', team: 'Delta', aht: '6:42', qa: 78.2, csat: 3.7, fcr: 65, adherence: 78, calls: 30, trend: [28, 29, 29, 30, 30, 30, 30], rank: 15 },
];

const ahtBoxGroups = [
  { name: 'Alpha', min: 3.5, q1: 4.2, median: 5.0, q3: 5.5, max: 6.2, color: '' },
  { name: 'Beta', min: 4.0, q1: 4.8, median: 5.3, q3: 5.8, max: 6.5, color: '' },
  { name: 'Gamma', min: 4.2, q1: 5.0, median: 5.5, q3: 6.0, max: 6.8, color: '' },
  { name: 'Delta', min: 4.5, q1: 5.2, median: 5.8, q3: 6.4, max: 7.2, color: '' },
];

const qaMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const qaTrendByTeam = [
  { name: 'Alpha', data: [84, 85, 86, 87, 87, 88, 88, 89, 89, 90, 90, 91], color: '' },
  { name: 'Beta', data: [82, 83, 83, 84, 85, 85, 86, 86, 87, 87, 88, 88], color: '' },
  { name: 'Gamma', data: [80, 80, 81, 82, 82, 83, 84, 84, 85, 85, 86, 86], color: '' },
  { name: 'Delta', data: [78, 79, 79, 80, 81, 81, 82, 82, 83, 83, 84, 84], color: '' },
];

const adherenceAgents = ['S. Chen', 'D. Kim', 'P. Patel', 'E. Davis', 'T. Baker', 'A. Kowal', 'C. Lee', 'C. Ruiz', 'L. Zhang', 'R. Moore'];
const adherenceDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const adherenceData = [
  [98, 96, 97, 95, 96, 94, 92],
  [95, 94, 96, 93, 95, 92, 90],
  [94, 93, 95, 92, 94, 91, 89],
  [93, 92, 94, 91, 93, 90, 88],
  [92, 91, 93, 90, 92, 89, 87],
  [91, 90, 92, 89, 91, 88, 86],
  [90, 89, 91, 88, 90, 87, 85],
  [93, 91, 92, 90, 91, 89, 87],
  [92, 90, 91, 89, 90, 88, 86],
  [89, 87, 88, 86, 88, 85, 82],
];

const holdTimeBoxGroups = [
  { name: 'Alpha', min: 0.3, q1: 0.8, median: 1.2, q3: 1.8, max: 2.5, color: '' },
  { name: 'Beta', min: 0.5, q1: 1.0, median: 1.5, q3: 2.2, max: 3.0, color: '' },
  { name: 'Gamma', min: 0.4, q1: 1.1, median: 1.6, q3: 2.4, max: 3.2, color: '' },
  { name: 'Delta', min: 0.6, q1: 1.3, median: 1.8, q3: 2.6, max: 3.5, color: '' },
];

const attritionRiskRows = [
  { name: 'Derek Jones', team: 'Delta', risk: 'High', score: 82, factors: 'Low QA, High AHT, Declining CSAT', tenure: '4 mo' },
  { name: 'Olivia Wu', team: 'Beta', risk: 'High', score: 76, factors: 'Attendance issues, Low FCR', tenure: '6 mo' },
  { name: 'Ryan Shah', team: 'Alpha', risk: 'Medium', score: 65, factors: 'Declining adherence, Overtime fatigue', tenure: '11 mo' },
  { name: 'Mike Torres', team: 'Gamma', risk: 'Medium', score: 58, factors: 'Stagnant QA, Low engagement', tenure: '8 mo' },
  { name: 'Sophia Lam', team: 'Delta', risk: 'Low', score: 42, factors: 'Recent coaching concern', tenure: '14 mo' },
];

const filters = [
  { key: 'period', label: 'Period', default: 'March 2026', type: 'dropdown', icon: 'cal' },
  { key: 'team', label: 'Team', default: 'All Teams', type: 'dropdown' },
  { key: 'skill', label: 'Skill Group', default: 'All Skills', type: 'dropdown' },
];

// ─── COMPONENT ───
export default function AgentPerformance() {
  const { t } = useTheme();

  const radarColored = radarEntities.map((e, i) => ({ ...e, color: t.chart[i] }));
  const ahtBoxColored = ahtBoxGroups.map((g, i) => ({ ...g, color: t.chart[i] }));
  const holdBoxColored = holdTimeBoxGroups.map((g, i) => ({ ...g, color: t.chart[i] }));
  const qaTrendColored = qaTrendByTeam.map((s, i) => ({ ...s, color: t.chart[i] }));

  const agentColumns = [
    {
      key: 'rank', label: '#', align: 'center',
      render: (v) => <span style={{ fontSize: 12, fontWeight: 700, color: v <= 3 ? t.success : t.textSecondary }}>{v}</span>,
    },
    { key: 'name', label: 'Agent' },
    {
      key: 'team', label: 'Team',
      render: (v) => <Badge variant="info">{v}</Badge>,
    },
    { key: 'aht', label: 'AHT', align: 'center' },
    {
      key: 'qa', label: 'QA Score', align: 'center',
      render: (v) => {
        const color = v >= 90 ? t.success : v >= 85 ? t.warning : t.danger;
        return <span style={{ fontWeight: 600, color }}>{v}</span>;
      },
    },
    {
      key: 'csat', label: 'CSAT', align: 'center',
      render: (v) => {
        const color = v >= 4.3 ? t.success : v >= 4.0 ? t.warning : t.danger;
        return <span style={{ fontWeight: 600, color }}>{v}</span>;
      },
    },
    {
      key: 'fcr', label: 'FCR %', align: 'center',
      render: (v) => {
        const color = v >= 78 ? t.success : v >= 70 ? t.warning : t.danger;
        return <span style={{ fontWeight: 600, color }}>{v}%</span>;
      },
    },
    {
      key: 'adherence', label: 'Adherence', align: 'center',
      render: (v) => {
        const color = v >= 90 ? t.success : v >= 85 ? t.warning : t.danger;
        return <span style={{ fontWeight: 600, color }}>{v}%</span>;
      },
    },
    { key: 'calls', label: 'Calls/Day', align: 'center' },
    {
      key: 'trend', label: 'Trend', align: 'center',
      render: (v) => <Sparkline data={v} color={t.primary} width={80} height={24} />,
    },
  ];

  const attritionColumns = [
    { key: 'name', label: 'Agent' },
    { key: 'team', label: 'Team' },
    {
      key: 'risk', label: 'Risk Level', align: 'center',
      render: (v) => {
        const variant = v === 'High' ? 'danger' : v === 'Medium' ? 'warning' : 'success';
        return <Badge variant={variant}>{v}</Badge>;
      },
    },
    {
      key: 'score', label: 'Risk Score', align: 'center',
      render: (v) => {
        const color = v >= 70 ? t.danger : v >= 50 ? t.warning : t.success;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: t.surfaceAlt, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${v}%`, borderRadius: 2, background: color }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color }}>{v}</span>
          </div>
        );
      },
    },
    { key: 'factors', label: 'Key Factors', render: (v) => <span style={{ fontSize: 11, color: t.textSecondary }}>{v}</span> },
    { key: 'tenure', label: 'Tenure', align: 'center' },
  ];

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="Agent Performance Dashboard"
        subtitle="Individual and team-level agent analytics and benchmarking"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <FilterBar filters={filters} />

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="Avg AHT" value="5:32" change="+4s" up isGood={false} sparkData={[5.2, 5.3, 5.4, 5.5, 5.4, 5.3, 5.5, 5.6, 5.5, 5.4, 5.5, 5.5]} sparkColor={t.warning} />
          <KPICard title="Avg QA Score" value="87.4" change="+1.2" up isGood sparkData={[84, 84.5, 85, 85.5, 86, 86, 86.5, 87, 87, 87.2, 87.3, 87.4]} sparkColor={t.success} />
          <KPICard title="Avg CSAT" value="4.3/5" change="+0.1" up isGood sparkData={[4.0, 4.0, 4.1, 4.1, 4.1, 4.2, 4.2, 4.2, 4.3, 4.3, 4.3, 4.3]} sparkColor={t.success} />
          <KPICard title="FCR" value="78%" change="+2pp" up isGood sparkData={[72, 73, 74, 74, 75, 76, 76, 77, 77, 78, 78, 78]} sparkColor={t.success} />
          <KPICard title="Adherence" value="91%" change="+0.5pp" up isGood sparkData={[88, 88.5, 89, 89.5, 90, 90, 90.5, 90.5, 91, 91, 91, 91]} sparkColor={t.primary} />
          <KPICard title="Calls/Agent/Day" value="42" change="+3" up isGood sparkData={[36, 37, 38, 39, 39, 40, 40, 41, 41, 42, 42, 42]} sparkColor={t.primary} />
        </div>

        {/* Row 2: Radar + Agent Table */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Agent Scorecard" subtitle="Performance benchmarking"
            insight={{
              description: "Radar/spider chart comparing three agent performance tiers (Top Performer, Team Average, Bottom Quartile) across six dimensions: AHT, QA Score, CSAT, FCR, Adherence, and Productivity.",
              dataSource: "Composite scoring model aggregating ACD metrics (AHT), QA evaluation database, post-call surveys (CSAT), CRM disposition (FCR), WFM adherence logs, and productivity calculations. Percentile rankings calculated across the full agent population.",
              meaning: "Top performers consistently outperform across ALL dimensions (88-96), while bottom quartile lags significantly (55-65). The largest gap is in CSAT (96 vs 60 = 36 points) and FCR (90 vs 58 = 32 points), suggesting these are the most differentiating skills. Bottom quartile agents are pulling down organizational averages significantly.",
              actions: [
                "Create mentoring pairs between top and bottom quartile agents",
                "Focus coaching on CSAT and FCR where the performance gap is largest",
                "Develop a 90-day performance improvement plan for bottom quartile",
                "Use top performer profiles to refine hiring criteria"
              ]
            }}
            legend={radarColored.map((e, i) => (
              <span key={i} style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 3, borderRadius: 2, background: e.color }} />{e.name}
              </span>
            ))}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RadarChart dimensions={radarDimensions} entities={radarColored} size={260} />
            </div>
          </Widget>

          <DataTable
            title="Agent Rankings"
            columns={agentColumns}
            rows={agentRows}
            pageSize={8}
          />
        </div>

        {/* Row 3: AHT Box + QA Trend + Adherence Heatmap */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="AHT Distribution by Team" subtitle="Minutes | Box plot view"
            insight={{
              description: "Box plot showing the statistical distribution of Average Handle Time for each team. Box = interquartile range (Q1-Q3), line = median, whiskers = min/max.",
              dataSource: "ACD call detail records aggregated by team. Each data point = one agent's average AHT. Includes Talk Time + Hold Time + After-Call Work. Minimum 100 calls per agent for inclusion.",
              meaning: "Team Alpha has the tightest distribution (3.5-6.2 min, median 5.0) indicating consistent performance. Team Delta shows the widest spread (4.5-7.2 min) with highest median (5.8 min), suggesting both training gaps and inconsistent coaching. All teams have medians above the 5:00 target.",
              actions: [
                "Target Team Delta for AHT reduction coaching - widest spread and highest median",
                "Investigate Alpha's consistency - what processes or tools do they use?",
                "Set team-specific AHT targets rather than one-size-fits-all benchmarks",
                "Identify and coach agents at the max whisker endpoints in each team"
              ]
            }}>
            <BoxPlot groups={ahtBoxColored} />
          </Widget>

          <Widget title="QA Score Trend by Team" subtitle="12-month trajectory"
            insight={{
              description: "Multi-line chart showing 12-month QA score trajectories for four teams, revealing improvement velocity and relative performance positioning.",
              dataSource: "Monthly average QA evaluation scores per team. Minimum 30 evaluations per team per month. Scored against Standard QA Form v3.2 by calibrated evaluators.",
              meaning: "All four teams trending upward (positive). Alpha leads at 91 with the steepest improvement curve. Delta at 84 trails by 7 points but is improving at a similar rate. The convergence pattern suggests organizational improvements are lifting all teams, but team-specific factors maintain the gaps.",
              actions: [
                "Celebrate universal improvement trend in all-hands meeting",
                "Set differentiated targets: Alpha 93, Beta 90, Gamma 88, Delta 87",
                "Share Alpha's best practices through cross-team calibration sessions",
                "Investigate what drives Delta's persistent lag - resources, complexity, or coaching?"
              ]
            }}
            legend={qaTrendColored.map((s, i) => (
              <span key={i} style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 3, borderRadius: 2, background: s.color }} />{s.name}
              </span>
            ))}>
            <MultiLineChart series={qaTrendColored} labels={qaMonths} />
          </Widget>

          <Widget title="Agent Adherence Heatmap" subtitle="% adherence by agent and day"
            insight={{
              description: "Color-coded heatmap showing adherence percentages for each agent across days of the week. Green = high adherence, Red = low adherence.",
              dataSource: "WFM schedule adherence reports. Adherence = time in correct state / scheduled time x 100. Measured in 15-minute intervals, aggregated daily by agent.",
              meaning: "Weekend adherence drops significantly across all agents (82-92% vs weekday 89-98%). Top agent S. Chen maintains 92-98% across all days. R. Moore shows concerning low adherence on weekends (82%) which may indicate engagement issues. Saturday-Sunday drops are a systemic pattern.",
              actions: [
                "Address weekend adherence gap through adjusted break schedules and supervisor presence",
                "Have 1-on-1 with R. Moore about weekend adherence (consistently lowest)",
                "Consider weekend shift incentives to improve adherence motivation",
                "Implement real-time adherence alerts for supervisors when agents deviate >10 minutes"
              ]
            }}>
            <Heatmap
              data={adherenceData}
              rowLabels={adherenceAgents}
              colLabels={adherenceDays}
              colorScale="diverging"
            />
          </Widget>
        </div>

        {/* Row 4: Hold Time Box + Attrition Risk Table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
          <Widget title="Hold Time Distribution" subtitle="Minutes by team | Box plot"
            insight={{
              description: "Box plot showing hold time distribution by team in minutes. Hold time = periods where the customer is placed on hold during the call.",
              dataSource: "ACD hold event records aggregated by team. Each data point = individual call hold duration. Includes all hold events within a call (multiple holds summed).",
              meaning: "Team Delta has highest hold times (median 1.8 min, max 3.5 min) suggesting agents frequently need to research or consult. Team Alpha's tight distribution (median 1.2, max 2.5) suggests better tool proficiency or simpler call types. Extended holds directly impact CSAT.",
              actions: [
                "Deploy knowledge base shortcuts for Team Delta's most common hold reasons",
                "Implement 'silent hold' alternatives - messaging the customer while researching",
                "Set a 2-minute hold limit with required check-back for customer communication",
                "Track hold reason codes to identify systemic knowledge gaps"
              ]
            }}>
            <BoxPlot groups={holdBoxColored} />
          </Widget>

          <DataTable
            title="Attrition Risk Assessment"
            columns={attritionColumns}
            rows={attritionRiskRows}
            pageSize={5}
          />
        </div>
      </div>
    </div>
  );
}
