import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, KPICard, Widget, FilterBar, Badge } from '../components/UI';
import { MultiLineChart, AreaChart, HorizontalBar, WaterfallChart, StackedBarChart, Heatmap, CalendarHeatmap, BarChart } from '../components/Charts';

// ─── INLINE MOCK DATA ───
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const forecastActualData = {
  forecast: [2800, 3100, 3400, 3200, 3000, 2900, 3100, 3300, 3500, 3200, 2950, 3050],
  actual: [2750, 3050, 3320, 3280, 3080, 2820, 3020, 3380, 3420, 3150, 2980, 2980],
};

const forecastAccuracyTrend = [91.2, 92.4, 93.1, 93.8, 94.2, 93.5, 94.0, 94.5, 93.8, 94.1, 94.6, 93.8];

const adherenceTeams = [
  { label: 'Team Alpha', value: 94.2, color: '' },
  { label: 'Team Beta', value: 92.8, color: '' },
  { label: 'Team Gamma', value: 91.5, color: '' },
  { label: 'Team Delta', value: 89.2, color: '' },
  { label: 'Team Echo', value: 88.1, color: '' },
  { label: 'Team Foxtrot', value: 93.5, color: '' },
];

const shrinkageItems = [
  { name: 'Planned Leave', value: 8.5 },
  { name: 'Sick Leave', value: 4.2 },
  { name: 'Training', value: 3.8 },
  { name: 'Meetings', value: 2.5 },
  { name: 'Breaks', value: 1.8 },
  { name: 'System Down', value: 0.7 },
  { name: 'Other', value: 0.5 },
  { name: 'Total', value: 22, isTotal: true },
];

const staffingGapTrend = [-5, -8, -12, -10, -6, -4, -8, -14, -12, -10, -8, -12];

const overtimeWeeks = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'];
const overtimeTeams = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const overtimeData = [
  [45, 52, 38, 42],
  [38, 48, 35, 40],
  [42, 55, 40, 45],
  [35, 42, 32, 38],
];
const overtimeSegments = overtimeTeams.map((name, i) => ({ name, color: '' }));

const skills = ['Voice-General', 'Voice-Tech', 'Voice-Billing', 'Chat', 'Email', 'Premium', 'Retention', 'Outbound'];
const shifts = ['Morning', 'Mid-Day', 'Afternoon', 'Evening', 'Night', 'Weekend'];
const skillCoverageData = [
  [95, 92, 88, 85, 78, 72],
  [88, 85, 82, 80, 75, 68],
  [92, 90, 86, 84, 80, 74],
  [85, 82, 78, 76, 72, 65],
  [90, 88, 84, 82, 78, 70],
  [96, 94, 90, 88, 84, 78],
  [82, 78, 75, 72, 68, 62],
  [78, 75, 72, 70, 65, 58],
];

// Calendar data: 90 days of absenteeism counts
const calendarData = Array.from({ length: 91 }, (_, i) => {
  const dayOfWeek = i % 7;
  const base = dayOfWeek === 5 || dayOfWeek === 6 ? 2 : 5;
  return { date: `Day ${i + 1}`, value: Math.max(0, base + Math.floor(Math.random() * 6) - 2) };
});

const ptoTeams = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Echo', 'Foxtrot'];
const ptoBalance = [12.5, 8.2, 15.1, 6.8, 10.4, 11.9]; // days remaining
const ptoUsed = [7.5, 11.8, 4.9, 13.2, 9.6, 8.1]; // days used

const intradayHours = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const originalForecast = [45, 85, 165, 245, 220, 195, 155, 160, 180, 175, 140, 90];
const reforecast = [42, 92, 178, 260, 235, 188, 148, 172, 195, 168, 135, 85];

const filters = [
  { key: 'period', label: 'Period', default: 'March 2026', type: 'dropdown', icon: 'cal' },
  { key: 'site', label: 'Site', default: 'All Sites', type: 'dropdown' },
  { key: 'skill', label: 'Skill Group', default: 'All Skills', type: 'dropdown' },
];

// ─── COMPONENT ───
export default function WFM() {
  const { t } = useTheme();

  const adherenceColored = adherenceTeams.map((item, i) => {
    const color = item.value >= 92 ? t.success : item.value >= 90 ? t.warning : t.danger;
    return { ...item, color, suffix: '%' };
  });

  const overtimeSegColored = overtimeSegments.map((s, i) => ({ ...s, color: t.chart[i] }));

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="Workforce Management Dashboard"
        subtitle="Forecasting accuracy, staffing optimization, and schedule adherence"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <FilterBar filters={filters} />

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="MAPE" value="6.2%" change="-0.8pp" up={false} isGood={false} sparkData={[8.5, 8.0, 7.5, 7.2, 6.8, 6.5, 6.4, 6.3, 6.2, 6.3, 6.2, 6.2]} sparkColor={t.success} subtitle="Mean Absolute % Error" />
          <KPICard title="Adherence" value="91.3%" change="+0.6pp" up isGood sparkData={[88, 88.5, 89, 89.5, 90, 90.2, 90.5, 90.8, 91, 91, 91.2, 91.3]} sparkColor={t.success} />
          <KPICard title="Conformance" value="94.1%" change="+0.3pp" up isGood sparkData={[92, 92.5, 93, 93, 93.5, 93.5, 93.8, 94, 94, 94, 94, 94.1]} sparkColor={t.primary} />
          <KPICard title="Shrinkage" value="22%" change="+0.5pp" up isGood={false} sparkData={[20, 20.5, 21, 21, 21.5, 21.5, 22, 22, 22, 22, 22, 22]} sparkColor={t.warning} />
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>Overtime Hours</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: t.warning, letterSpacing: -1 }}>342h</div>
            <Badge variant="warning">+12% vs plan</Badge>
          </Card>
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>Staffing Gap</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: t.danger, letterSpacing: -1 }}>-12 FTE</div>
            <Badge variant="danger">Critical</Badge>
          </Card>
        </div>

        {/* Row 2: Forecast vs Actual + Forecast Accuracy */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Forecast vs Actual Volume" subtitle="Monthly contact volumes"
            insight={{
              description: "Dual-line chart comparing WFM forecast volumes (dashed) against actual contact volumes (solid) on a monthly basis. The gap reveals forecast accuracy.",
              dataSource: "WFM forecast engine (NICE IEX/Verint) using historical patterns, known events, and trend algorithms. Actuals from ACD offered calls. Updated daily with month-end reconciliation.",
              meaning: "Forecast variance of -0.6% overall is excellent (industry benchmark: +/-5%). Largest miss was July (forecast 2900, actual 2820 = -2.8%), likely due to unexpected volume drop. The model performs well for stable months but struggles with anomalies.",
              actions: [
                "Maintain current forecasting methodology - it's outperforming benchmarks",
                "Add event-based adjustments for marketing campaigns and product launches",
                "Build separate forecast models for each channel to improve granularity",
                "Track accuracy at interval level (not just monthly) for intraday management"
              ]
            }}
            legend={[
              <span key="f" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0] }} />Forecast</span>,
              <span key="a" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[2] }} />Actual</span>,
            ]}>
            <MultiLineChart
              series={[
                { data: forecastActualData.forecast, color: t.chart[0], dashed: true },
                { data: forecastActualData.actual, color: t.chart[2] },
              ]}
              labels={months}
            />
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Forecast Total</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>37,450</div>
              </div>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Actual Total</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>37,230</div>
              </div>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: t.successLight, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Variance</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.success }}>-0.6%</div>
              </div>
            </div>
          </Widget>

          <Widget title="Forecast Accuracy Trend" subtitle="Monthly MAPE inverse (100% - MAPE)"
            insight={{
              description: "Line chart showing monthly forecast accuracy (100% - MAPE) with a target threshold at 93%. Measures how close WFM predictions match reality.",
              dataSource: "MAPE (Mean Absolute Percentage Error) calculated from 30-minute interval-level forecast vs actual comparisons. Monthly figure is the average of all interval-level MAPE values.",
              meaning: "12-month average accuracy of 93.8% exceeds the 93% target. Performance has been consistently above target since April, indicating model stability. Brief dip in June coincides with a system migration event.",
              actions: [
                "Document the forecasting improvements that drove accuracy above target",
                "Raise the accuracy target to 95% for the next fiscal year",
                "Investigate the June accuracy drop to build resilience against system events",
                "Share methodology with other departments for cross-functional planning"
              ]
            }}>
            <MultiLineChart
              series={[{ data: forecastAccuracyTrend, color: t.success }]}
              labels={months}
              benchmarkLines={[{ value: 93, label: 'Target 93%', color: t.warning }]}
            />
            <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: t.surfaceAlt }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: t.textSecondary }}>12-month Avg Accuracy</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.success }}>93.8%</span>
              </div>
            </div>
          </Widget>
        </div>

        {/* Row 3: Adherence + Shrinkage Waterfall */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Adherence by Team" subtitle="Schedule adherence % | Target: 90%"
            insight={{
              description: "Horizontal bar chart showing schedule adherence percentage by team with color coding (green >=92%, yellow >=90%, red <90%). Target: 90%.",
              dataSource: "WFM schedule adherence reports comparing planned schedule (start/end, breaks, lunches) with actual agent state timestamps. Measured in minutes of conformance.",
              meaning: "Overall adherence of 91.3% meets the 90% target. Two teams (Delta at 89.2% and Echo at 88.1%) are below target. Alpha leads at 94.2%, demonstrating that 90%+ is achievable. Each 1% adherence improvement recovers ~12 productive minutes per agent per day.",
              actions: [
                "Address Delta and Echo adherence gaps through team lead conversations",
                "Implement automated break reminders to reduce late returns",
                "Recognize Alpha and Foxtrot teams for consistently exceeding adherence targets",
                "Calculate the financial impact of adherence improvement to motivate teams"
              ]
            }}>
            <HorizontalBar items={adherenceColored} maxVal={100} />
            <div style={{ marginTop: 12, borderTop: `1px solid ${t.borderSubtle}`, paddingTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: t.textSecondary }}>Overall Adherence</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.success }}>91.3%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: t.surfaceAlt, marginTop: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '91.3%', borderRadius: 3, background: t.success }} />
              </div>
            </div>
          </Widget>

          <Widget title="Shrinkage Waterfall" subtitle="Components of total shrinkage (22%)"
            insight={{
              description: "Waterfall chart decomposing total shrinkage (22%) into its components: Planned Leave, Sick Leave, Training, Meetings, Breaks, System Down, and Other.",
              dataSource: "WFM time-tracking categories mapped to shrinkage types. Each component tracked via agent state codes in the ACD and HR leave management systems.",
              meaning: "22% total shrinkage is within the 20-25% industry norm. Planned Leave (8.5%) and Sick Leave (4.2%) are the largest components. Training (3.8%) is an investment in quality. System Down (0.7%) represents avoidable shrinkage.",
              actions: [
                "Target reducing total shrinkage by 1% through better absence management",
                "Investigate sick leave patterns for potential abuse or team-level issues",
                "Schedule training during historically low-volume periods to reduce impact",
                "Work with IT to eliminate the 0.7% system downtime shrinkage"
              ]
            }}>
            <WaterfallChart items={shrinkageItems} />
          </Widget>
        </div>

        {/* Row 4: Staffing Gap + Overtime */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Staffing Gap Trend" subtitle="FTE shortfall vs requirements (negative = understaffed)"
            insight={{
              description: "Area chart showing FTE staffing shortfall vs requirements over 12 months. Negative values indicate understaffing relative to demand-based requirements.",
              dataSource: "WFM Erlang-C staffing calculator outputs vs actual logged-in agents. Gap = Required FTE - Available FTE. Accounts for volume, AHT, target SL, and shrinkage.",
              meaning: "Current gap of -12 FTE is a critical understaffing situation. Peak gap of -14 FTE in August drove the service level deterioration seen in operations data. Average gap of -9 FTE suggests chronic under-hiring rather than seasonal issues.",
              actions: [
                "Immediately initiate hiring for 15 FTE to close gap and provide buffer",
                "Deploy overtime strategically during peak intervals until positions are filled",
                "Evaluate cross-training programs to create flexible capacity across queues",
                "Review attrition replacement cycle - target reducing backfill time from 8 to 4 weeks"
              ]
            }}>
            <AreaChart data={staffingGapTrend.map(v => Math.abs(v))} color={t.danger} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              {months.map((m, i) => (
                i % 3 === 0 ? <span key={m} style={{ fontSize: 10, color: t.textTertiary }}>{m}</span> : null
              )).filter(Boolean)}
            </div>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: t.dangerLight }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Current Gap</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.danger }}>-12 FTE</div>
              </div>
              <div style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: t.warningLight }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Peak Gap</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.warning }}>-14 FTE</div>
              </div>
              <div style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: t.surfaceAlt }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Avg Gap</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>-9 FTE</div>
              </div>
            </div>
          </Widget>

          <Widget title="Overtime by Team (Weekly)" subtitle="Hours per week | March 2026"
            insight={{
              description: "Stacked bar chart showing weekly overtime hours distributed across teams for the current month. Each bar segment represents one team's overtime contribution.",
              dataSource: "Payroll and WFM schedule exception reports. Overtime = hours worked beyond scheduled shift. Tracked by team and individual agent for cost allocation.",
              meaning: "342 total overtime hours in March is 12% above plan, adding approximately $8,550 in premium labor costs. Team Beta consistently has the highest overtime (48-55 hrs/week), which may indicate systematic understaffing in their queue.",
              actions: [
                "Investigate why Team Beta requires 30% more overtime than other teams",
                "Set weekly overtime caps per agent to prevent burnout (max 8 hrs/agent/week)",
                "Convert chronic overtime positions to regular full-time headcount for cost savings",
                "Monitor overtime vs attrition correlation - excessive overtime drives turnover"
              ]
            }}
            legend={overtimeSegColored.map((s, i) => (
              <span key={i} style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 3, background: s.color }} />{s.name}
              </span>
            ))}>
            <StackedBarChart
              categories={overtimeWeeks}
              segments={overtimeSegColored}
              data={overtimeData}
            />
            <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: t.warningLight, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: t.textSecondary }}>Month Total Overtime</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.warning }}>342 hours</span>
            </div>
          </Widget>
        </div>

        {/* Row 5: PTO Balance & Utilization */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="PTO Balance & Utilization" subtitle="Days remaining vs days used by team"
            insight={{
              description: "Grouped bar chart showing PTO days remaining vs PTO days used by team. Helps identify teams at risk of end-of-year PTO rushes or potential burnout from underutilization.",
              dataSource: "HR leave management system. Balance = annual PTO allocation minus days taken. Used includes all approved PTO categories (vacation, personal, floating holidays).",
              meaning: "Delta team has used 13.2 of 20 days (66%) with only Q1 complete, suggesting potential over-use or burnout. Gamma has 15.1 days remaining (used only 25%), risking an end-of-year PTO surge that could create staffing gaps in Q4.",
              actions: [
                "Work with Delta team leads to spread remaining PTO evenly across Q2-Q4",
                "Encourage Gamma team members to schedule PTO to prevent Q4 capacity crunch",
                "Implement PTO planning conversations in monthly 1:1s",
                "Model Q4 staffing scenarios assuming 50% of unused PTO is taken in Nov-Dec"
              ]
            }}
            legend={[
              <span key="b" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0] }} />Balance (Remaining)</span>,
              <span key="u" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[2] }} />Used</span>,
            ]}>
            <BarChart
              data={[ptoBalance, ptoUsed]}
              labels={ptoTeams}
              colors={[t.chart[0], t.chart[2]]}
              width={800}
            />
          </Widget>
        </div>

        {/* Row 6: Intraday Reforecast Comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Intraday Reforecast Comparison" subtitle="Original forecast vs mid-day reforecast | Today"
            insight={{
              description: "Dual-line chart comparing original morning forecast (dashed) with mid-day reforecast (solid) for today's contact volumes by hour.",
              dataSource: "WFM intraday management system. Original forecast generated at 6:00 AM. Reforecast updated at 10:00 AM using actual volume data from first 4 hours combined with forecast model.",
              meaning: "Reforecast shows 6% higher volume than original during morning hours (09:00-10:00), suggesting an unexpected volume driver. The afternoon reforecast converges with original, indicating the spike is contained to morning. Total day volume reforecast is +3.2% above original.",
              actions: [
                "Activate 2-3 additional agents for the 09:00-11:00 window based on reforecast",
                "Investigate the morning volume spike - check for any marketing sends or system issues",
                "Adjust break schedules to maximize coverage during the reforecasted peak",
                "Use this event to improve the base forecasting model for future accuracy"
              ]
            }}
            legend={[
              <span key="o" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0], borderTop: `2px dashed ${t.chart[0]}` }} />Original Forecast</span>,
              <span key="r" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[2] }} />Reforecast</span>,
            ]}>
            <MultiLineChart
              series={[
                { data: originalForecast, color: t.chart[0], dashed: true },
                { data: reforecast, color: t.chart[2] },
              ]}
              labels={intradayHours}
              width={800}
            />
          </Widget>
        </div>

        {/* Row 7: Skill Coverage + Absenteeism Calendar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Widget title="Skill Coverage Heatmap" subtitle="% coverage by skill group and shift"
            insight={{
              description: "Color matrix showing staffing coverage percentage for each skill group across different shifts. Green = well-covered (>85%), Red = understaffed (<75%).",
              dataSource: "WFM skill group requirements vs scheduled agents with matching skills. Coverage = (Scheduled with Skill / Required with Skill) x 100. Based on demand forecasts per skill.",
              meaning: "Night and Weekend shifts show significant gaps across most skills (58-78%), with Outbound and Retention most affected. Evening coverage is also weak. This directly impacts service levels during these periods and may force unnecessary overtime.",
              actions: [
                "Implement shift differentials or bonuses for Night and Weekend shifts",
                "Cross-train 20% of day-shift agents on Retention and Outbound skills",
                "Consider offshore staffing for Night shift coverage on appropriate skill groups",
                "Prioritize hiring for Premium and Retention skills which have least coverage"
              ]
            }}>
            <Heatmap
              data={skillCoverageData}
              rowLabels={skills}
              colLabels={shifts}
              colorScale="diverging"
            />
            <div style={{ marginTop: 12, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <span style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 12, height: 8, borderRadius: 2, background: 'rgba(220,38,38,0.6)' }} />Under-staffed
              </span>
              <span style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 12, height: 8, borderRadius: 2, background: 'rgba(13,150,104,0.6)' }} />Well-covered
              </span>
            </div>
          </Widget>

          <Widget title="Absenteeism Calendar" subtitle="Daily absent count | Last 90 days"
            insight={{
              description: "Calendar heatmap showing daily absence counts over the last 90 days. Darker colors indicate higher absenteeism. Reveals patterns by day of week.",
              dataSource: "HR attendance management system. Includes unplanned absences only (sick, personal emergency, no-show). Excludes pre-approved PTO and scheduled training.",
              meaning: "Average daily absenteeism of 4.8 agents is within acceptable range (3-5% of workforce). Weekend absenteeism is notably lower (expected - fewer agents scheduled). No clear spike pattern suggests absence is distributed rather than concentrated.",
              actions: [
                "Monitor for emerging patterns around paydays or specific days of week",
                "Implement return-to-work conversations for agents with 3+ unplanned absences per quarter",
                "Consider wellness programs to proactively reduce sick leave",
                "Build absence buffer into staffing models (add 4% to required FTE calculations)"
              ]
            }}>
            <CalendarHeatmap data={calendarData} color={t.danger} />
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: t.surfaceAlt }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Avg Daily</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>4.8</div>
              </div>
              <div style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: t.dangerLight }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Peak Day</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.danger }}>11</div>
              </div>
              <div style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: t.surfaceAlt }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Trend</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.warning }}>Flat</div>
              </div>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}
