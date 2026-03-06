import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, KPICard, Widget, FilterBar, Badge } from '../components/UI';
import { ComboChart, MultiLineChart, Heatmap, AreaChart, StackedAreaChart, BarChart, DonutChart, StackedBarChart, HorizontalBar } from '../components/Charts';

// ─── INLINE MOCK DATA ───
const intervals = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
const volumeByInterval = [42, 58, 95, 128, 185, 210, 245, 230, 218, 195, 175, 168, 152, 148, 160, 172, 188, 195, 178, 155, 132, 108, 78, 52];
const slByInterval = [95, 94, 92, 88, 82, 78, 75, 80, 83, 86, 88, 89, 90, 91, 88, 85, 82, 80, 84, 88, 91, 93, 95, 96];

const queues = ['General', 'Sales', 'Tech Support', 'Billing', 'Retention', 'Premium', 'Complaints', 'Overflow'];
const heatmapIntervals = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
const queueHeatmapData = [
  [88, 82, 78, 85, 90, 89, 84, 91],
  [92, 90, 85, 82, 88, 91, 87, 93],
  [85, 78, 72, 75, 80, 83, 79, 86],
  [90, 86, 80, 78, 84, 87, 85, 92],
  [82, 76, 70, 74, 78, 82, 80, 85],
  [95, 93, 90, 92, 94, 95, 93, 96],
  [78, 72, 68, 70, 75, 78, 76, 82],
  [88, 84, 80, 82, 86, 88, 85, 90],
];

const ahtTrend = [5.2, 5.3, 5.4, 5.5, 5.4, 5.3, 5.5, 5.6, 5.5, 5.4, 5.5, 5.5];
const ahtBenchmark = 5.0;
const ahtMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const abandonTrend = [3.8, 4.0, 4.2, 4.5, 5.1, 5.8, 6.2, 5.5, 4.8, 4.2, 4.0, 4.2];

const channelMixLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const teams = ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Team Echo'];
const teamAHT = [5.1, 5.8, 5.3, 6.0, 5.5];
const teamFCR = [82, 74, 79, 71, 76];

const transferReasons = [
  { label: 'Skill mismatch', value: 35, color: '' },
  { label: 'Escalation', value: 28, color: '' },
  { label: 'System issue', value: 15, color: '' },
  { label: 'Agent request', value: 12, color: '' },
  { label: 'Other', value: 10, color: '' },
];

const agentStates = [
  { name: 'On Call', pct: 42 },
  { name: 'Wrap-up', pct: 15 },
  { name: 'Available', pct: 18 },
  { name: 'Break', pct: 10 },
  { name: 'Training', pct: 8 },
  { name: 'Meeting', pct: 5 },
  { name: 'Offline', pct: 2 },
];

// Forecast vs Actual Volume data (hourly)
const forecastHours = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const forecastVolume = [50, 110, 200, 240, 210, 175, 155, 165, 190, 180, 135, 70];
const actualVolume = [48, 105, 195, 248, 218, 172, 150, 168, 195, 175, 130, 65];

// Occupancy by Team data
const occupancyByTeam = [
  { label: 'Team Alpha', value: 85 },
  { label: 'Team Beta', value: 82 },
  { label: 'Team Gamma', value: 88 },
  { label: 'Team Delta', value: 75 },
  { label: 'Team Echo', value: 80 },
];

const filters = [
  { key: 'date', label: 'Date', default: 'Today', type: 'dropdown', icon: 'cal' },
  { key: 'site', label: 'Site', default: 'All Sites', type: 'dropdown' },
  { key: 'queue', label: 'Queue', default: 'All Queues', type: 'dropdown' },
  { key: 'channel', label: 'Channel', default: 'All', type: 'dropdown' },
];

// ─── COMPONENT ───
export default function Operations() {
  const { t } = useTheme();

  const transferItems = transferReasons.map((r, i) => ({ ...r, color: t.chart[i] }));
  const transferTotal = transferItems.reduce((s, i) => s + i.value, 0);

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="Operations Manager Dashboard"
        subtitle="Real-time operational performance and queue management"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <FilterBar filters={filters} />

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="Service Level" value="86.5%" change="+1.2pp" up isGood sparkData={slByInterval.slice(0, 12)} sparkColor={t.success} />
          <KPICard title="Abandon Rate" value="4.2%" change="-0.3pp" up={false} isGood={false} sparkData={abandonTrend} sparkColor={t.success} />
          <KPICard title="AHT" value="5:32" change="+4s" up isGood={false} sparkData={ahtTrend} sparkColor={t.warning} />
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>Calls in Queue</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: t.warning, letterSpacing: -1 }}>7</div>
            <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 4 }}>Across all queues</div>
          </Card>
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>Longest Wait</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: t.danger, letterSpacing: -1 }}>2:14</div>
            <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 4 }}>Tech Support queue</div>
          </Card>
          <KPICard title="Occupancy" value="81%" change="+2pp" up isGood sparkData={[76, 77, 78, 79, 80, 80, 81, 81, 82, 81, 81, 81]} sparkColor={t.primary} />
          <KPICard title="FCR" value="78%" change="+1pp" up isGood sparkData={[74, 74, 75, 76, 76, 77, 77, 77, 78, 78, 78, 78]} sparkColor={t.success} />
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>Calls Today</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: -1 }}>2,847</div>
            <Badge variant="info">Live</Badge>
          </Card>
        </div>

        {/* Row 1.5: Forecast vs Actual Volume */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Forecast vs Actual Volume" subtitle="Hourly call volume | Forecast (dashed) vs Actual"
            insight={{
              description: "Dual-line chart comparing forecasted call volume (dashed line) against actual incoming volume across hourly intervals. Helps assess workforce management forecast accuracy.",
              dataSource: "Forecast from WFM system (Verint/NICE IEX) based on historical patterns, seasonality, and trend analysis. Actual from real-time ACD offered call counts aggregated hourly.",
              meaning: "Forecast accuracy is strong with mean absolute error under 5%. The actual volume slightly exceeded forecast during the 09:00 peak (+8 calls) and tracked closely during off-peak hours. This indicates WFM models are well-calibrated for current demand patterns.",
              actions: [
                "Investigate the 09:00 peak variance to determine if a recurring pattern adjustment is needed",
                "Use forecast accuracy metrics to justify current WFM tooling investment",
                "Consider adding intraday reforecast triggers when actual deviates >10% from forecast",
                "Share forecast accuracy report with staffing team to build confidence in scheduling"
              ]
            }}
            legend={[
              <span key="f" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[1], opacity: 0.6 }} />Forecast</span>,
              <span key="a" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0] }} />Actual</span>,
            ]}>
            <MultiLineChart
              series={[
                { data: actualVolume, color: t.chart[0] },
                { data: forecastVolume, color: t.chart[1], dashed: true },
              ]}
              labels={forecastHours}
              width={800}
            />
          </Widget>
        </div>

        {/* Row 2: Interval Performance + Queue Heatmap */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Interval Performance" subtitle="30-minute intervals | Volume & Service Level"
            insight={{
              description: "Dual-axis combo chart showing inbound call volume (bars) and service level percentage (line) across 30-minute intervals throughout the day.",
              dataSource: "ACD real-time feed (Genesys/NICE inContact). Volume = offered calls per interval. Service Level = % answered within 20 seconds. Updated every 30 minutes.",
              meaning: "Peak volume at 09:00-09:30 (245 calls) corresponds with SL dip to 75%, indicating insufficient staffing during morning rush. SL recovers to 90%+ during mid-day as volume drops. The pattern suggests a predictable staffing gap in the 08:30-10:00 window.",
              actions: [
                "Shift 10-15% of mid-day staff to start at 08:00 to cover morning peak",
                "Implement staggered breaks to maintain coverage during high-volume periods",
                "Set up real-time SL alerts when dropping below 80% for proactive queue management",
                "Consider offering voluntary overtime during peak intervals"
              ]
            }}
            legend={[
              <span key="v" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0] }} />Volume</span>,
              <span key="s" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[2] }} />SL %</span>,
            ]}>
            <ComboChart
              barData={volumeByInterval}
              lineData={slByInterval}
              labels={intervals}
              barColor={t.chart[0]}
              lineColor={t.chart[2]}
              barLabel="Volume"
              lineLabel="SL %"
            />
          </Widget>

          <Widget title="Queue Performance Heatmap" subtitle="Service Level % by queue and hour"
            insight={{
              description: "Color-coded matrix showing Service Level % for each queue across hourly intervals. Green = above target (>85%), Red = below target, enabling rapid identification of problem areas.",
              dataSource: "ACD queue statistics aggregated hourly. Each cell = (calls answered within threshold / calls offered) × 100. Calculated from individual queue routing data.",
              meaning: "Complaints queue consistently underperforms (68-82%), suggesting either complexity-driven longer handle times or insufficient staffing. Retention queue also struggles during peak hours. Premium queue maintains highest SL (90-96%) due to priority routing and dedicated agents.",
              actions: [
                "Add 2-3 agents to Complaints queue during 10:00-12:00 peak",
                "Review Complaints queue AHT - may need specialized training or escalation paths",
                "Consider cross-training Premium agents to handle Retention overflow",
                "Implement priority callback for Complaints queue when SL < 75%"
              ]
            }}>
            <Heatmap
              data={queueHeatmapData}
              rowLabels={queues}
              colLabels={heatmapIntervals}
              colorScale="diverging"
            />
          </Widget>
        </div>

        {/* Row 3: AHT Trend + Abandon Rate + Channel Mix */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="AHT Trend" subtitle="Minutes | vs. 5:00 benchmark"
            insight={{
              description: "12-month Average Handle Time trend in minutes with a target benchmark line at 5:00. Shows the gap between actual performance and operational target.",
              dataSource: "ACD handle time data calculated as Talk Time + Hold Time + After-Call Work. Monthly averages across all queues and channels. Benchmark from workforce planning standards.",
              meaning: "AHT consistently above the 5:00 target (ranging 5.2-5.6 minutes) indicates a systemic issue rather than seasonal variation. The 30+ second gap represents ~8% excess handle time, which at 2,847 daily calls translates to ~38 hours of extra agent time per day.",
              actions: [
                "Analyze top 10 contact reasons by AHT to identify specific long-handle-time drivers",
                "Deploy agent assist tools for complex call types to reduce research time",
                "Review after-call work processes for automation opportunities",
                "Consider resetting the 5:00 target if call complexity has structurally changed"
              ]
            }}
            legend={[
              <span key="a" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0] }} />Actual</span>,
              <span key="b" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 2, borderRadius: 2, background: t.danger, opacity: 0.6 }} />Target</span>,
            ]}>
            <MultiLineChart
              series={[{ data: ahtTrend, color: t.chart[0] }]}
              labels={ahtMonths}
              benchmarkLines={[{ value: ahtBenchmark, label: 'Target 5:00', color: t.danger }]}
            />
          </Widget>

          <Widget title="Abandon Rate Trend" subtitle="Monthly % of calls abandoned"
            insight={{
              description: "Area chart showing monthly call abandon rate percentage over 12 months. Abandons = callers who hang up before reaching an agent.",
              dataSource: "ACD abandoned call reports. Excludes short abandons (<5 seconds) which are typically misdials. Monthly average of daily abandon rates.",
              meaning: "Abandon rate spiked to 6.2% in July (peak season) but has since recovered to 4.2%. The current rate is near the industry benchmark of 4-5% for contact centers. The July spike correlates with a known staffing shortage.",
              actions: [
                "Implement callback functionality to reduce abandons during peak periods",
                "Monitor real-time abandon rate with auto-escalation when exceeding 5%",
                "Ensure staffing plans account for seasonal peaks (June-August pattern)",
                "A/B test queue messaging to improve customer willingness to wait"
              ]
            }}>
            <AreaChart data={abandonTrend} color={t.danger} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              {['Jan', 'Apr', 'Jul', 'Oct', 'Dec'].map(m => (
                <span key={m} style={{ fontSize: 10, color: t.textTertiary }}>{m}</span>
              ))}
            </div>
          </Widget>

          <Widget title="Channel Mix (100%)" subtitle="Contact distribution by channel"
            insight={{
              description: "100% stacked area chart showing the evolving proportion of contacts by channel (Voice, Chat, Email, Social) over 12 months.",
              dataSource: "Multi-channel ACD routing data. Each contact counted once at its primary channel of entry. Channel transfers tracked separately.",
              meaning: "Voice share declining from 58%→42% while Chat growing from 22%→36% represents a significant digital transformation. At current trajectory, Chat will surpass Voice within 6-8 months. Email steady at ~11%, Social growing from 6%→12%.",
              actions: [
                "Accelerate chat agent hiring and training to match demand growth",
                "Develop hybrid agent model where agents handle both Voice and Chat",
                "Review IVR messaging to actively promote digital channels",
                "Plan for Voice team right-sizing as volume continues to decline"
              ]
            }}
            legend={[
              <span key="v" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: t.chart[0] }} />Voice</span>,
              <span key="c" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: t.chart[1] }} />Chat</span>,
              <span key="e" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: t.chart[2] }} />Email</span>,
              <span key="s" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: t.chart[3] }} />Social</span>,
            ]}>
            <StackedAreaChart
              series={[
                { name: 'Voice', data: [58, 56, 54, 52, 50, 48, 47, 46, 45, 44, 43, 42], color: t.chart[0] },
                { name: 'Chat', data: [22, 23, 25, 26, 28, 30, 31, 32, 33, 34, 35, 36], color: t.chart[1] },
                { name: 'Email', data: [14, 14, 13, 13, 12, 12, 12, 11, 11, 11, 11, 10], color: t.chart[2] },
                { name: 'Social', data: [6, 7, 8, 9, 10, 10, 10, 11, 11, 11, 11, 12], color: t.chart[3] },
              ]}
              labels={channelMixLabels}
            />
          </Widget>
        </div>

        {/* Row 4: Team Performance + Transfer Donut + Agent States */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Team Performance" subtitle="AHT (min) and FCR (%) by team"
            insight={{
              description: "Grouped bar chart comparing AHT (minutes) and FCR (%) across teams, revealing the correlation between speed and quality at team level.",
              dataSource: "ACD handle time data cross-referenced with CRM case disposition codes for FCR. Team assignments from HR workforce management system.",
              meaning: "Team Delta has highest AHT (6:00 min) AND lowest FCR (71%), suggesting longer calls aren't producing better outcomes. Team Alpha achieves both fastest AHT (5.1 min) and highest FCR (82%), indicating efficient problem-solving. Team Beta's high AHT (5.8 min) with moderate FCR (74%) may indicate training gaps.",
              actions: [
                "Shadow top performers on Team Alpha to identify best practices for faster resolution",
                "Provide targeted coaching to Team Delta focusing on efficient problem diagnosis",
                "Cross-pollinate agents between teams to share knowledge",
                "Review Team Beta's call types - they may handle more complex issues"
              ]
            }}
            legend={[
              <span key="a" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0] }} />AHT</span>,
              <span key="f" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[2] }} />FCR</span>,
            ]}>
            <BarChart
              data={[teamAHT, teamFCR.map(v => v / 10)]}
              labels={teams}
              colors={[t.chart[0], t.chart[2]]}
            />
          </Widget>

          <Widget title="Transfer Rate & Reasons" subtitle="12.4% overall transfer rate"
            insight={{
              description: "Donut chart showing overall transfer rate (12.4%) with breakdown bars showing the top reasons for call transfers.",
              dataSource: "ACD transfer reports with agent-selected reason codes. Transfer = call routed to a different queue or agent after initial connection. Excludes warm transfers that stay within the same team.",
              meaning: "12.4% transfer rate is above the 10% industry benchmark. 'Skill mismatch' (35%) as the top reason suggests routing logic needs improvement. 'Escalation' (28%) is expected for complex issues, but 'Agent request' (12%) may indicate agents avoiding certain call types.",
              actions: [
                "Review and optimize skills-based routing rules to reduce skill mismatch transfers",
                "Investigate 'Agent request' transfers for possible coaching or morale issues",
                "Implement warm transfer protocols to improve transferred customer experience",
                "Set target to reduce transfer rate to 10% within 2 months"
              ]
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center', marginBottom: 16 }}>
              <div style={{ position: 'relative' }}>
                <DonutChart value={12.4} size={100} strokeWidth={10} color={t.warning} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>12.4%</div>
                  <div style={{ fontSize: 9, color: t.textTertiary }}>Transfer</div>
                </div>
              </div>
            </div>
            <div>
              {transferItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: i < transferItems.length - 1 ? `1px solid ${t.borderSubtle}` : 'none' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, color: t.textSecondary }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{item.value}%</span>
                  <div style={{ width: 60, height: 4, borderRadius: 2, background: t.surfaceAlt, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(item.value / transferTotal) * 100}%`, borderRadius: 2, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </Widget>

          <Widget title="Agent State Distribution" subtitle="Current workforce allocation"
            insight={{
              description: "Horizontal percentage bars showing current distribution of agent states across the workforce (On Call, Wrap-up, Available, Break, Training, Meeting, Offline).",
              dataSource: "Real-time ACD agent state feed. Snapshot captured at current moment. Historical states available for trend analysis. Includes all logged-in agents.",
              meaning: "42% On Call + 15% Wrap-up = 57% productive time, leaving 43% in non-productive states. 18% Available is healthy (agents ready for next call). Break/Training/Meeting combined at 23% is within normal range. 2% Offline may indicate login issues.",
              actions: [
                "Monitor Available state - if consistently >25%, consider reducing scheduled agents",
                "Review wrap-up time standards (15% is slightly high - target 12-13%)",
                "Ensure Training and Meeting time is scheduled during low-volume periods",
                "Investigate Offline agents to determine if it's a system or attendance issue"
              ]
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
              {agentStates.map((state, i) => {
                const colors = [t.primary, t.warning, t.success, t.textTertiary, t.info, t.accent1, t.danger];
                const color = colors[i % colors.length];
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: t.textSecondary }}>{state.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{state.pct}%</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: t.surfaceAlt, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${state.pct}%`, borderRadius: 4, background: color, transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 16, padding: '10px 12px', borderRadius: 8, background: t.surfaceAlt }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: t.textSecondary }}>Total Agents Logged In</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>124</span>
              </div>
            </div>
          </Widget>
        </div>

        {/* Row 5: Occupancy by Team */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          <Widget title="Occupancy by Team" subtitle="Current agent occupancy percentage by team"
            insight={{
              description: "Horizontal bar chart showing current occupancy percentage for each team (Alpha through Echo). Occupancy = (Talk Time + Hold Time + Wrap-up) / (Total Logged-In Time). Higher occupancy means agents spend more time handling contacts.",
              dataSource: "Real-time ACD agent state data aggregated by team. Calculated from individual agent productive time divided by total available time since shift start.",
              meaning: "Team Gamma has the highest occupancy at 88%, which is near the burnout threshold of 90%. Team Delta at 75% is underutilized relative to peers. The 13pp spread between highest and lowest teams suggests uneven workload distribution across teams.",
              actions: [
                "Monitor Team Gamma for signs of burnout - 88% is approaching the 85-90% recommended ceiling",
                "Investigate why Team Delta is at 75% - may indicate overstaffing or routing gaps",
                "Rebalance queue assignments to narrow the occupancy spread across teams",
                "Set occupancy target range of 80-85% for all teams to optimize productivity without burnout"
              ],
              metrics: [
                { label: 'Highest', value: '88%', color: t.danger },
                { label: 'Average', value: '82%', color: t.primary },
                { label: 'Lowest', value: '75%', color: t.success },
              ]
            }}>
            <HorizontalBar items={occupancyByTeam} maxVal={100} />
          </Widget>
        </div>
      </div>
    </div>
  );
}
