import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, KPICard, Widget, FilterBar, DataTable, Badge } from '../components/UI';
import { HistogramChart, StackedBarChart, MultiLineChart, ScatterPlot, BoxPlot, AreaChart, BarChart, Treemap, Sparkline } from '../components/Charts';

// ─── INLINE MOCK DATA ───
const qaHistogramBins = [
  { label: '50-55', count: 2 },
  { label: '55-60', count: 5 },
  { label: '60-65', count: 8 },
  { label: '65-70', count: 14 },
  { label: '70-75', count: 22 },
  { label: '75-80', count: 38 },
  { label: '80-85', count: 52 },
  { label: '85-90', count: 68 },
  { label: '90-95', count: 45 },
  { label: '95-100', count: 28 },
];

const qaCriteria = ['Greeting', 'Identification', 'Needs Analysis', 'Resolution', 'Compliance', 'Closing'];
const qaTeams = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const qaCriteriaData = [
  [18, 17, 16, 15, 14, 16],
  [16, 15, 14, 13, 12, 14],
  [14, 13, 12, 11, 10, 12],
  [12, 11, 10, 9, 8, 10],
];
const qaCriteriaSegments = qaCriteria.map((c, i) => ({ name: c, color: '' }));

const qaMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const qaTrendSeries = [
  { name: 'Alpha', data: [84, 85, 85, 86, 87, 87, 88, 88, 89, 89, 90, 91], color: '' },
  { name: 'Beta', data: [82, 83, 83, 84, 84, 85, 85, 86, 86, 87, 87, 88], color: '' },
  { name: 'Gamma', data: [80, 80, 81, 81, 82, 82, 83, 83, 84, 84, 85, 86], color: '' },
  { name: 'Delta', data: [78, 79, 79, 80, 80, 81, 81, 82, 82, 83, 83, 84], color: '' },
];

const autoVsManualPoints = [
  { x: 72, y: 74, color: '', label: 'Agent A' },
  { x: 78, y: 80, color: '', label: 'Agent B' },
  { x: 82, y: 84, color: '', label: 'Agent C' },
  { x: 85, y: 83, color: '', label: 'Agent D' },
  { x: 88, y: 90, color: '', label: 'Agent E' },
  { x: 90, y: 88, color: '', label: 'Agent F' },
  { x: 92, y: 94, color: '', label: 'Agent G' },
  { x: 75, y: 72, color: '', label: 'Agent H' },
  { x: 80, y: 82, color: '', label: 'Agent I' },
  { x: 86, y: 85, color: '', label: 'Agent J' },
  { x: 94, y: 96, color: '', label: 'Agent K' },
  { x: 68, y: 70, color: '', label: 'Agent L' },
  { x: 76, y: 78, color: '', label: 'Agent M' },
  { x: 83, y: 86, color: '', label: 'Agent N' },
  { x: 91, y: 92, color: '', label: 'Agent O' },
];

const evaluatorBoxGroups = [
  { name: 'Eval A', min: 80, q1: 84, median: 87, q3: 90, max: 95, color: '' },
  { name: 'Eval B', min: 78, q1: 83, median: 88, q3: 92, max: 96, color: '' },
  { name: 'Eval C', min: 76, q1: 82, median: 86, q3: 91, max: 94, color: '' },
  { name: 'Eval D', min: 82, q1: 86, median: 89, q3: 93, max: 97, color: '' },
  { name: 'Eval E', min: 75, q1: 80, median: 85, q3: 89, max: 93, color: '' },
];

const fatalErrorTrend = [1.2, 1.1, 1.0, 0.9, 1.0, 0.9, 0.8, 0.9, 0.8, 0.8, 0.8, 0.8];
const fatalErrorRows = [
  { date: 'Mar 4', agent: 'Derek Jones', type: 'Compliance Breach', detail: 'Failed to read mandatory disclosure', severity: 'Critical' },
  { date: 'Mar 3', agent: 'Olivia Wu', type: 'ID Verification Skip', detail: 'Proceeded without 3-factor auth', severity: 'Critical' },
  { date: 'Mar 2', agent: 'Ryan Shah', type: 'Data Privacy', detail: 'Read full account number aloud', severity: 'Major' },
  { date: 'Mar 1', agent: 'Mike Torres', type: 'Misinformation', detail: 'Provided incorrect rate to customer', severity: 'Major' },
  { date: 'Feb 28', agent: 'Sophia Lam', type: 'Compliance Breach', detail: 'Skipped terms and conditions', severity: 'Critical' },
];

const coachingTeams = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const coachingBefore = [82, 80, 78, 76];
const coachingAfter = [89, 87, 85, 83];

const sentimentTrend = {
  positive: [52, 54, 55, 56, 58, 60, 62, 63, 64, 65, 66, 68],
  neutral: [32, 31, 30, 30, 29, 28, 27, 26, 26, 25, 24, 23],
  negative: [16, 15, 15, 14, 13, 12, 11, 11, 10, 10, 10, 9],
};

const failingTopics = [
  { label: 'Script Non-Adherence', value: 142 },
  { label: 'ID Verification Miss', value: 98 },
  { label: 'Incorrect Info Given', value: 85 },
  { label: 'Hold Time Excess', value: 72 },
  { label: 'Empathy Gap', value: 64 },
  { label: 'Closing Incomplete', value: 58 },
  { label: 'Transfer Protocol', value: 45 },
  { label: 'Data Entry Error', value: 38 },
];

const filters = [
  { key: 'period', label: 'Period', default: 'March 2026', type: 'dropdown', icon: 'cal' },
  { key: 'team', label: 'Team', default: 'All Teams', type: 'dropdown' },
  { key: 'evaluator', label: 'Evaluator', default: 'All', type: 'dropdown' },
  { key: 'form', label: 'QA Form', default: 'Standard v3.2', type: 'dropdown' },
];

// ─── COMPONENT ───
export default function QA() {
  const { t } = useTheme();

  const trendColored = qaTrendSeries.map((s, i) => ({ ...s, color: t.chart[i] }));
  const scatterColored = autoVsManualPoints.map((p, i) => ({ ...p, color: t.chart[i % t.chart.length] }));
  const evalBoxColored = evaluatorBoxGroups.map((g, i) => ({ ...g, color: t.chart[i] }));
  const criteriaSegColored = qaCriteriaSegments.map((s, i) => ({ ...s, color: t.chart[i] }));

  const fatalColumns = [
    { key: 'date', label: 'Date' },
    { key: 'agent', label: 'Agent' },
    { key: 'type', label: 'Error Type', render: (v) => <span style={{ fontWeight: 600 }}>{v}</span> },
    { key: 'detail', label: 'Detail', render: (v) => <span style={{ fontSize: 11, color: t.textSecondary }}>{v}</span> },
    {
      key: 'severity', label: 'Severity', align: 'center',
      render: (v) => <Badge variant={v === 'Critical' ? 'danger' : 'warning'}>{v}</Badge>,
    },
  ];

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="Quality Assurance Dashboard"
        subtitle="QA evaluation insights, scoring trends, and coaching impact analysis"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <FilterBar filters={filters} />

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="QA Pass Rate" value="89%" change="+2pp" up isGood sparkData={[84, 85, 86, 86, 87, 87, 88, 88, 88, 89, 89, 89]} sparkColor={t.success} />
          <KPICard title="Fatal Error Rate" value="0.8%" change="-0.2pp" up={false} isGood={false} sparkData={fatalErrorTrend} sparkColor={t.success} />
          <KPICard title="Avg QA Score" value="87.4" change="+1.2" up isGood sparkData={[84, 84.5, 85, 85.5, 86, 86, 86.5, 87, 87, 87.2, 87.3, 87.4]} sparkColor={t.primary} />
          <KPICard title="Auto-QA Coverage" value="72%" change="+8pp" up isGood sparkData={[48, 52, 55, 58, 60, 62, 64, 66, 68, 70, 71, 72]} sparkColor={t.info} />
          <KPICard title="Coaching Completion" value="84%" change="+3pp" up isGood sparkData={[72, 74, 76, 77, 78, 79, 80, 81, 82, 83, 83, 84]} sparkColor={t.success} />
          <KPICard title="Calibration Variance" value="3.2" change="-0.5" up={false} isGood={false} sparkData={[5.0, 4.8, 4.5, 4.3, 4.2, 4.0, 3.8, 3.6, 3.5, 3.4, 3.3, 3.2]} sparkColor={t.success} />
        </div>

        {/* Row 2: Histogram + QA by Criteria + QA Trend */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="QA Score Distribution" subtitle="Histogram of evaluation scores"
            insight={{
              description: "Histogram showing the distribution of all QA evaluation scores across score ranges (50-100). Bell curve shape indicates consistency; skew indicates systemic issues.",
              dataSource: "QA evaluation database. All completed evaluations for the period, scored against Standard Form v3.2. Includes both manual and auto-QA scored evaluations.",
              meaning: "Distribution peaks at 85-90 range (68 evaluations) with a healthy right skew. Very few scores below 65 (15 total) suggests consistent minimum quality. The 95-100 range (28 evals) represents the top performer population.",
              actions: [
                "Investigate agents scoring below 70 for immediate coaching intervention",
                "Analyze what differentiates 95+ scorers to build best practice guides",
                "Review if the scoring rubric is appropriately calibrated (too many high scores may indicate rubric inflation)",
                "Set goal to shift the peak from 85-90 to 90-95 range"
              ]
            }}>
            <HistogramChart bins={qaHistogramBins} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 10, color: t.textTertiary }}>Low</span>
              <span style={{ fontSize: 10, color: t.textTertiary }}>Score Range</span>
              <span style={{ fontSize: 10, color: t.textTertiary }}>High</span>
            </div>
          </Widget>

          <Widget title="QA Scores by Criteria" subtitle="Stacked by team | Max 20 per criteria"
            insight={{
              description: "Stacked bar chart breaking down QA scores by evaluation criteria (Greeting, ID, Needs Analysis, Resolution, Compliance, Closing) across teams.",
              dataSource: "QA evaluation form responses broken down by section. Each criteria scored on a standardized rubric. Aggregated across all evaluators for the period.",
              meaning: "Compliance scores highest (15-18/20) indicating strong regulatory adherence. Escalation and Needs Analysis score lowest, suggesting agents rush through discovery. Team Alpha leads across most criteria while Team Delta consistently lags.",
              actions: [
                "Develop targeted training modules for Needs Analysis and Escalation handling",
                "Have Team Alpha share best practices with other teams in knowledge-sharing sessions",
                "Consider revising QA form weights to emphasize customer outcome metrics",
                "Track criteria-level improvements monthly to measure coaching effectiveness"
              ]
            }}
            legend={qaTeams.map((team, i) => (
              <span key={i} style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 3, background: t.chart[i] }} />{team}
              </span>
            ))}>
            <StackedBarChart
              categories={qaCriteria}
              segments={criteriaSegColored.map((s, i) => ({ ...s, color: t.chart[i] }))}
              data={qaCriteriaData}
            />
          </Widget>

          <Widget title="QA Trend by Team" subtitle="12-month score trajectory"
            insight={{
              description: "Multi-line chart showing 12-month QA score trajectories for each team, revealing improvement velocity and identifying teams needing intervention.",
              dataSource: "Monthly average QA scores per team. Minimum 30 evaluations per team per month for statistical validity. Excludes new hires in first 90 days.",
              meaning: "All teams trending upward (positive signal). Alpha leads at 91, while Delta at 84 shows a 7-point gap. Delta's improvement rate (+6 pts/year) matches Alpha's, so the gap isn't widening but also not closing.",
              actions: [
                "Set differentiated targets: Alpha 93+, Beta 90+, Gamma 88+, Delta 87+",
                "Pair Delta team members with Alpha mentors for cross-team coaching",
                "Celebrate the universal upward trend in QA scores at team meetings",
                "Investigate what changed in Q3 that accelerated improvement across all teams"
              ]
            }}
            legend={trendColored.map((s, i) => (
              <span key={i} style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 3, borderRadius: 2, background: s.color }} />{s.name}
              </span>
            ))}>
            <MultiLineChart series={trendColored} labels={qaMonths} />
          </Widget>
        </div>

        {/* Row 3: Scatter + Evaluator Calibration */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Auto-QA vs Manual QA Scores" subtitle="Correlation analysis | r = 0.94"
            insight={{
              description: "Scatter plot comparing automated QA scores (x-axis) with manual evaluator scores (y-axis) for the same interactions, with trend line showing correlation.",
              dataSource: "Dual-scored interactions where both auto-QA engine and human evaluator assessed the same call. Minimum 100 paired scores for valid correlation analysis.",
              meaning: "Correlation of 0.94 indicates strong alignment between AI and human evaluation. Mean difference of only 1.8 points suggests auto-QA is reliable for screening. Outliers (agents where scores diverge significantly) may indicate subjective criteria the AI misses.",
              actions: [
                "Expand auto-QA coverage from 72% to 90%+ given high correlation",
                "Investigate cases where auto-QA and manual scores diverge by >5 points",
                "Use auto-QA as first-pass screening, reserving manual QA for flagged interactions",
                "Calibrate auto-QA model quarterly against manual evaluator consensus"
              ]
            }}>
            <ScatterPlot
              points={scatterColored}
              xLabel="Auto-QA Score"
              yLabel="Manual QA Score"
              showTrendLine
            />
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
              <span style={{ fontSize: 11, color: t.textTertiary }}>Correlation: <strong style={{ color: t.success }}>0.94</strong></span>
              <span style={{ fontSize: 11, color: t.textTertiary }}>Mean Difference: <strong style={{ color: t.text }}>1.8 pts</strong></span>
            </div>
          </Widget>

          <Widget title="Evaluator Calibration" subtitle="Score distribution per evaluator | Box plot"
            insight={{
              description: "Box plot showing score distribution ranges for each QA evaluator, revealing scoring consistency and inter-rater reliability.",
              dataSource: "All evaluations grouped by evaluator. Box shows Q1-Q3 range, whiskers show min-max. Calibration variance = standard deviation across evaluator medians.",
              meaning: "3.2-point calibration variance is above the 2.0 target, indicating evaluators are not fully aligned. Eval D scores highest (median 89) while Eval E scores lowest (median 85). This 4-point spread can unfairly impact agent scores.",
              actions: [
                "Schedule monthly calibration sessions where all evaluators score the same 5 calls",
                "Investigate Eval D for potential score inflation and Eval E for potential harshness",
                "Consider implementing evaluator-adjusted scoring to normalize for bias",
                "Target reducing calibration variance from 3.2 to below 2.0 within 2 months"
              ]
            }}>
            <BoxPlot groups={evalBoxColored} />
            <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: t.surfaceAlt, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: t.textSecondary }}>Overall Calibration Variance</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: t.warning }}>3.2 pts</span>
            </div>
          </Widget>
        </div>

        {/* Row 4: Fatal Error Trend + Table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Fatal Error Rate Trend" subtitle="Monthly % | Target < 1%"
            insight={{
              description: "Area chart tracking the monthly fatal error rate with current vs target comparison. Fatal errors are compliance breaches or critical mistakes requiring immediate intervention.",
              dataSource: "QA fatal error log. Fatal errors defined as: compliance breach, ID verification skip, data privacy violation, or providing materially incorrect information. Rate = fatal errors / total interactions x 100.",
              meaning: "Current rate of 0.8% is below the 1.0% target (positive). The declining trend from 1.2% shows improved compliance awareness. However, 0.8% still represents ~23 fatal errors per month across the organization.",
              actions: [
                "Maintain zero-tolerance policy with mandatory retraining for any fatal error",
                "Conduct root cause analysis on the 3 most recent fatal errors",
                "Consider implementing real-time compliance monitoring to catch errors in-progress",
                "Recognize teams with zero fatal errors to reinforce positive behavior"
              ]
            }}>
            <AreaChart data={fatalErrorTrend} color={t.danger} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              {['Jan', 'Apr', 'Jul', 'Oct', 'Dec'].map(m => (
                <span key={m} style={{ fontSize: 10, color: t.textTertiary }}>{m}</span>
              ))}
            </div>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: t.dangerLight }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>This Month</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.danger }}>0.8%</div>
              </div>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: t.successLight }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Target</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.success }}>&lt;1.0%</div>
              </div>
            </div>
          </Widget>

          <DataTable
            title="Recent Fatal Errors"
            columns={fatalColumns}
            rows={fatalErrorRows}
            pageSize={5}
          />
        </div>

        {/* Row 5: Coaching Impact + Sentiment */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Coaching Impact" subtitle="QA scores before vs after coaching sessions"
            insight={{
              description: "Grouped bar chart comparing QA scores before and after coaching sessions by team, measuring the effectiveness of coaching interventions.",
              dataSource: "Pre-coaching scores from last evaluation before coaching session. Post-coaching scores from first evaluation 2+ weeks after coaching. Minimum 10 coached agents per team for valid comparison.",
              meaning: "Average +6.5 point improvement demonstrates coaching ROI. All teams show improvement, with Alpha gaining most (82->89, +7 pts). Even the lowest gain (Delta: 76->83, +7 pts) is substantial. This validates the coaching program's effectiveness.",
              actions: [
                "Increase coaching frequency for bottom-quartile performers (highest ROI)",
                "Document coaching techniques that produce the largest score improvements",
                "Track coaching impact at 30/60/90 days to ensure gains are sustained",
                "Calculate cost-per-point-improvement to optimize coaching resource allocation"
              ]
            }}
            legend={[
              <span key="b" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[0] }} />Before</span>,
              <span key="a" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: t.chart[2] }} />After</span>,
            ]}>
            <BarChart
              data={[coachingBefore, coachingAfter]}
              labels={coachingTeams}
              colors={[t.chart[0], t.chart[2]]}
            />
            <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: t.successLight, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: t.textSecondary }}>Average improvement after coaching</span>
              <Badge variant="success">+6.5 pts</Badge>
            </div>
          </Widget>

          <Widget title="Sentiment Analysis Trend" subtitle="% distribution of call sentiment over time"
            insight={{
              description: "Area chart showing the percentage distribution of positive, neutral, and negative sentiment detected in customer interactions over 12 months.",
              dataSource: "NLP sentiment analysis engine processing call transcripts and chat logs. Sentiment classified using transformer-based model with 91% accuracy. Applied to 100% of interactions.",
              meaning: "Positive sentiment increasing (52%->68%) while negative declining (16%->9%) shows genuine CX improvement. The shift of 16 percentage points from negative to positive represents thousands of improved customer interactions monthly.",
              actions: [
                "Analyze negative sentiment calls to identify remaining pain points",
                "Correlate sentiment trends with specific process or policy changes",
                "Use sentiment as a leading indicator - sentiment shifts often precede CSAT changes",
                "Set up real-time negative sentiment alerts for immediate supervisor intervention"
              ]
            }}
            legend={[
              <span key="p" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: t.success }} />Positive</span>,
              <span key="n" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: t.textTertiary }} />Neutral</span>,
              <span key="ng" style={{ fontSize: 11, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: t.danger }} />Negative</span>,
            ]}>
            <div style={{ position: 'relative' }}>
              <AreaChart data={sentimentTrend.positive} color={t.success} />
            </div>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: t.successLight }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Positive</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.success }}>68%</div>
              </div>
              <div style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: t.surfaceAlt }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Neutral</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.textSecondary }}>23%</div>
              </div>
              <div style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: t.dangerLight }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Negative</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.danger }}>9%</div>
              </div>
            </div>
          </Widget>
        </div>

        {/* Row 6: Top Failing Topics */}
        <div style={{ marginTop: 24 }}>
          <Widget title="Top Failing Topics / Intents" subtitle="Most common QA failure reasons by frequency"
            insight={{
              description: "Treemap visualization showing the most common reasons for QA evaluation failures, sized by frequency of occurrence.",
              dataSource: "QA evaluation failure codes mapped to topic categories. Only includes evaluations scoring below 'Pass' threshold. Aggregated across all teams and evaluators.",
              meaning: "Script Non-Adherence (142 failures) is the leading cause of QA failures, followed by ID Verification misses (98). These top two categories account for 40% of all failures, making them high-impact improvement targets.",
              actions: [
                "Launch a script adherence refresher training program targeting the top 3 failure categories",
                "Implement real-time script prompts via agent assist to reduce non-adherence",
                "Review ID verification process for potential simplification without compromising security",
                "Create a 'failure reduction' taskforce focused on the top 5 topics"
              ]
            }}>
            <Treemap items={failingTopics.map((ft, i) => ({ ...ft, color: t.chart[i % t.chart.length] }))} height={220} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {failingTopics.slice(0, 5).map((ft, i) => (
                <span key={i} style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 3, background: t.chart[i % t.chart.length] }} />
                  {ft.label}: {ft.value}
                </span>
              ))}
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}
