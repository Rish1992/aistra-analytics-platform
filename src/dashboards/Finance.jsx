import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import {
  Card, KPICard, Widget, DataTable, Badge, SectionTitle, TimeRangeSelector, StatCard
} from '../components/UI';
import {
  MultiLineChart, WaterfallChart, BarChart, ComboChart, DonutChart, AreaChart, HorizontalBar, Sparkline
} from '../components/Charts';

// ─── MOCK DATA ───
const costPerContactSeries = [
  { name: 'Voice', data: [7.8, 7.6, 7.5, 7.3, 7.2, 7.1, 7.2, 7.0, 7.2, 7.1, 7.2, 7.20] },
  { name: 'Chat', data: [4.2, 4.1, 4.0, 3.9, 3.8, 3.7, 3.8, 3.9, 3.8, 3.7, 3.8, 3.80] },
  { name: 'Email', data: [2.5, 2.4, 2.3, 2.2, 2.1, 2.2, 2.1, 2.0, 2.1, 2.1, 2.0, 2.10] },
  { name: 'Bot', data: [0.6, 0.55, 0.52, 0.50, 0.48, 0.46, 0.45, 0.44, 0.45, 0.44, 0.45, 0.45] },
];
const costLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const waterfallItems = [
  { name: 'Tech', value: 420 },
  { name: 'Retail', value: 380 },
  { name: 'Health', value: 310 },
  { name: 'Finance', value: 280 },
  { name: 'Overheads', value: -190 },
  { name: 'Discounts', value: -85 },
  { name: 'Net Total', value: 0, isTotal: true },
];
waterfallItems[waterfallItems.length - 1].value = waterfallItems.slice(0, -1).reduce((s, i) => s + i.value, 0);

const budgetLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
const budgetActual = [2400, 2600, 2500, 2700];
const budgetPlanned = [2500, 2550, 2600, 2650];

const aiSavingsMonthly = [22, 28, 32, 38, 42, 48, 55, 60, 45, 50, 52, 48];
const aiSavingsCumulative = aiSavingsMonthly.reduce((acc, v) => { acc.push((acc.length ? acc[acc.length - 1] : 0) + v); return acc; }, []);

const headcountPlan = [
  { name: 'Plan', data: [480, 485, 490, 495, 500, 510, 520, 525, 530, 535, 540, 545] },
  { name: 'Actual', data: [478, 482, 488, 491, 496, 504, 512, 518, 524, 530, 534, 538], dashed: false },
];

const costBreakdown = [
  { label: 'Labor', pct: 62 },
  { label: 'Technology', pct: 18 },
  { label: 'Facilities', pct: 12 },
  { label: 'Other', pct: 8 },
];

const penaltyData = [
  { client: 'TechConnect', sla: '87%', penalty: '$12,400', risk: 'warning', exposure: 'Medium', due: '2026-03-15' },
  { client: 'Premier Health', sla: '92%', penalty: '$0', risk: 'success', exposure: 'Low', due: '2026-03-20' },
  { client: 'FinServ Global', sla: '78%', penalty: '$34,200', risk: 'danger', exposure: 'High', due: '2026-03-10' },
  { client: 'RetailMax', sla: '91%', penalty: '$2,800', risk: 'warning', exposure: 'Medium', due: '2026-03-18' },
  { client: 'AutoDirect', sla: '95%', penalty: '$0', risk: 'success', exposure: 'Low', due: '2026-03-25' },
];

const revPerFTE = [6.8, 7.1, 7.3, 7.5, 7.8, 8.0, 7.9, 8.1, 8.2, 8.3, 8.4, 8.40];

const billingExceptions = [
  { client: 'TechConnect', type: 'Rate Override', amount: '$2,400', date: '2026-03-03', status: 'warning', resolution: 'Under Review' },
  { client: 'FinServ Global', type: 'Volume Miscount', amount: '$8,100', date: '2026-03-01', status: 'danger', resolution: 'Disputed' },
  { client: 'RetailMax', type: 'Service Credit', amount: '$1,200', date: '2026-02-28', status: 'success', resolution: 'Resolved' },
  { client: 'Premier Health', type: 'Rate Override', amount: '$3,600', date: '2026-02-25', status: 'warning', resolution: 'Under Review' },
  { client: 'AutoDirect', type: 'Billing Error', amount: '$950', date: '2026-02-20', status: 'success', resolution: 'Resolved' },
];

export default function Finance() {
  const { t } = useTheme();
  const [range, setRange] = useState('30d');

  const themedCostPerContactSeries = costPerContactSeries.map((s, i) => ({ ...s, color: t.chart[i % t.chart.length] }));
  const themedHeadcountPlan = headcountPlan.map((s, i) => ({ ...s, color: t.chart[i % t.chart.length] }));
  const themedCostBreakdown = costBreakdown.map((r, i) => ({ ...r, color: t.chart[i % t.chart.length] }));

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="Finance Dashboard"
        subtitle="Cost management, revenue tracking, and budget variance analysis"
        actions={<TimeRangeSelector selected={range} onChange={setRange} />}
      />

      <div style={{ padding: 32 }}>
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="Cost / Contact" value="$4.20" change="-5%" up={false} isGood={false} sparkData={[4.8, 4.6, 4.5, 4.4, 4.3, 4.2]} sparkColor={t.success} />
          <KPICard title="Cost / FTE" value="$6,250" sparkData={[6800, 6600, 6500, 6400, 6300, 6250]} sparkColor={t.primary} />
          <KPICard title="Revenue / Contact" value="$8.40" change="+12%" up={true} isGood={true} sparkData={[7.2, 7.5, 7.8, 8.0, 8.2, 8.4]} sparkColor={t.success} />
          <KPICard title="Net Margin" value="24.5%" change="+1.2pp" up={true} isGood={true} sparkData={[22, 22.5, 23, 23.5, 24, 24.5]} sparkColor={t.success} />
          <KPICard title="Budget Variance" value="-2.3%" sparkData={[1.2, 0.8, -0.5, -1.2, -1.8, -2.3]} sparkColor={t.warning} />
          <KPICard title="AI Savings" value="$420K" change="+38%" up={true} isGood={true} sparkData={[180, 240, 290, 340, 380, 420]} sparkColor={t.accent1} />
          <KPICard title="Overtime %" value="4.2%" sparkData={[5.1, 4.8, 4.6, 4.5, 4.3, 4.2]} sparkColor={t.info} />
        </div>

        {/* Row 2: Cost per Contact + Margin Waterfall */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Cost per Contact by Channel"
            subtitle="12-month trend across all channels"
            insight={{
              description: "Multi-line chart tracking cost per contact across Voice, Chat, Email, and Bot channels over 12 months, showing the economic efficiency of each channel.",
              dataSource: "Activity-based costing model from Finance ERP. Includes fully-loaded agent labor costs, technology costs (per-minute licensing), overhead allocation, and QA/training prorations per channel.",
              meaning: "Voice ($7.20) remains 17x more expensive than Bot ($0.45). All channels show gradual cost decline driven by improved efficiency and higher utilization. The Bot channel represents the biggest cost-avoidance opportunity - each contact shifted to Bot saves $6.75.",
              actions: [
                "Prioritize bot-eligible contact types for AI deflection (potential $420K annual savings)",
                "Investigate Chat cost reduction from $4.20 to $3.80 - what drove the improvement?",
                "Model the blended CPC impact of shifting 10% of Voice to Chat",
                "Review Email cost allocation - $2.10 seems low and may miss overhead costs"
              ]
            }}
            legend={themedCostPerContactSeries.map(s => (
              <span key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                {s.name} <strong style={{ color: t.text }}>${s.data[s.data.length - 1].toFixed(2)}</strong>
              </span>
            ))}
          >
            <MultiLineChart series={themedCostPerContactSeries} labels={costLabels} height={200} />
          </Widget>

          <Widget
            title="Margin Waterfall by BU"
            subtitle="Contribution to net margin ($K)"
            insight={{
              description: "Waterfall chart showing each business unit's contribution to net margin in thousands of dollars, with positive (revenue) and negative (cost) components.",
              dataSource: "P&L statement allocated by business unit using headcount and contact volume allocation keys. Monthly reconciliation against GL accounts.",
              meaning: "Tech ($420K) and Retail ($380K) are the strongest margin contributors. Overheads (-$190K) and Discounts (-$85K) reduce net margin by 20%. The $1,115K net total represents a healthy 24.5% margin on the contact center's operations.",
              actions: [
                "Investigate Commercial BU for margin improvement (only $280K vs $520K headcount cost)",
                "Review discount policy - $85K in discounts may indicate SLA penalty exposure",
                "Model the impact of reducing overhead allocation by optimizing shared services",
                "Set BU-level margin targets aligned with their revenue potential"
              ]
            }}
          >
            <WaterfallChart items={waterfallItems} height={200} />
          </Widget>
        </div>

        {/* Row 3: Budget vs Actual + AI Savings Combo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Budget vs Actual"
            subtitle="Quarterly comparison ($K)"
            insight={{
              description: "Grouped bar chart comparing quarterly actual spend against budget, revealing spending discipline and budget accuracy across the fiscal year.",
              dataSource: "Monthly GL actuals rolled up quarterly vs approved annual budget broken into quarterly targets. Includes all OpEx categories (labor, technology, facilities, other).",
              meaning: "Q1 and Q2 were under budget (positive variance), while Q3-Q4 show slight overruns. Full-year variance of -2.3% is within the 5% tolerance. Q4 over-budget is typical for year-end discretionary spending and true-ups.",
              actions: [
                "Investigate Q4 overrun categories for better future budgeting",
                "Carry forward Q1-Q2 underspend learnings to next year's budget process",
                "Build rolling forecast to replace static annual budgets",
                "Present the -2.3% variance as evidence of strong financial discipline"
              ]
            }}
            legend={[
              <span key="a" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[0] }} /> Actual
              </span>,
              <span key="b" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[1] }} /> Budget
              </span>,
            ]}
          >
            <BarChart data={[budgetActual, budgetPlanned]} labels={budgetLabels} colors={[t.chart[0], t.chart[1]]} height={200} />
          </Widget>

          <Widget
            title="AI Cost Savings"
            subtitle="Monthly savings + cumulative ($K)"
            insight={{
              description: "Combo chart showing monthly AI-driven cost savings (bars) and cumulative savings (line) in thousands of dollars over 12 months.",
              dataSource: "Cost avoidance model: (AI-handled contacts \u00d7 average human contact cost) - AI operating costs. Includes chatbot, IVR self-service, auto-QA, and agent assist savings.",
              meaning: "Cumulative savings of $420K YTD demonstrate strong AI ROI. Monthly savings averaging $35K with an upward trend. Peak months (May-Aug at $48-60K) align with higher contact volumes being deflected. The AI investment has already paid back 3x its implementation cost.",
              actions: [
                "Expand AI capabilities to capture additional $200K in savings next year",
                "Document savings methodology for CFO/board presentation",
                "Reinvest 20% of savings into AI model improvements and training data",
                "Track per-model savings to identify highest-ROI AI investments"
              ]
            }}
            legend={[
              <span key="bar" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[2] }} /> Monthly
              </span>,
              <span key="line" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 3, borderRadius: 1, background: t.accent1 }} /> Cumulative
              </span>,
            ]}
          >
            <ComboChart
              barData={aiSavingsMonthly}
              lineData={aiSavingsCumulative}
              labels={costLabels}
              barColor={t.chart[2]}
              lineColor={t.accent1}
              barLabel="Monthly $K"
              lineLabel="Cumulative $K"
              height={200}
            />
          </Widget>
        </div>

        {/* Row 4: Headcount + Cost Breakdown Donut */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Headcount Plan vs Actual"
            subtitle="Rolling 12-month FTE tracking"
            insight={{
              description: "Dual-line chart comparing planned headcount trajectory against actual staffing levels across 12 months, revealing hiring and retention gaps.",
              dataSource: "HR workforce management system for actual headcount. Annual headcount plan from WFM capacity planning approved by finance. Updated monthly with hires, terms, and transfers.",
              meaning: "Actual consistently trails plan by 5-7 FTE, representing an ongoing hiring gap. The gap widened slightly in Q2-Q3 (typical high-attrition period). At 538 vs 545 planned, the 1.3% shortfall translates to ~$420K in unfilled labor budget that masks true operational costs.",
              actions: [
                "Accelerate recruiting to close the 7-FTE gap before Q2 seasonal volume increase",
                "Review time-to-fill metrics and identify bottlenecks in the hiring pipeline",
                "Model the service level impact of the persistent understaffing",
                "Consider contracting or BPO options to bridge the gap while recruiting"
              ]
            }}
            legend={themedHeadcountPlan.map(s => (
              <span key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 3, borderRadius: 1, background: s.color }} /> {s.name}
              </span>
            ))}
          >
            <MultiLineChart series={themedHeadcountPlan} labels={costLabels} height={180} />
          </Widget>

          <Widget
            title="Cost Breakdown"
            subtitle="Current period distribution"
            insight={{
              description: "Donut chart showing the percentage breakdown of total contact center costs across major categories: Labor, Technology, Facilities, and Other.",
              dataSource: "Monthly P&L with cost categorization from chart of accounts. Labor includes base salary, benefits, taxes, overtime, and temporary staff. Technology includes licensing, infrastructure, and maintenance.",
              meaning: "Labor at 62% is in the typical range for contact centers (60-70%). Technology at 18% reflects investments in AI and automation. Combined Labor + Tech = 80% of costs, making these the primary levers for cost optimization.",
              actions: [
                "Focus cost reduction efforts on the 62% labor component - even 1% savings = $124K",
                "Evaluate Technology spend ROI - is the 18% investment driving sufficient automation?",
                "Review Facilities costs (12%) for remote work optimization opportunities",
                "Benchmark cost structure against industry peers for competitiveness assessment"
              ]
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <DonutChart value={100} size={140} strokeWidth={24} color={t.chart[0]} />
                {/* overlay arcs for multi-segment effect */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: t.text, textAlign: 'center', lineHeight: 1 }}>$12.4M</div>
                  <div style={{ fontSize: 10, color: t.textTertiary, textAlign: 'center' }}>Total</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
                {themedCostBreakdown.map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 11, color: t.textSecondary }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{item.pct}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Widget>
        </div>

        {/* Row 5: SLA Penalty Table */}
        <div style={{ marginBottom: 24 }}>
          <DataTable
            title="SLA Penalty Exposure"
            columns={[
              { key: 'client', label: 'Client' },
              { key: 'sla', label: 'Current SLA', align: 'center' },
              { key: 'exposure', label: 'Risk Level', align: 'center', render: (val, row) => (
                <Badge variant={row.risk}>{val}</Badge>
              )},
              { key: 'penalty', label: 'Penalty Exposure', align: 'right' },
              { key: 'due', label: 'Review Date', align: 'center' },
            ]}
            rows={penaltyData}
            pageSize={5}
          />
        </div>

        {/* Row 6: Revenue per FTE Trend */}
        <Widget
          title="Revenue per FTE Trend"
          subtitle="Monthly revenue per full-time equivalent ($K)"
          insight={{
            description: "Area chart showing the monthly revenue generated per full-time equivalent employee in thousands, measuring workforce productivity and revenue efficiency.",
            dataSource: "Total revenue divided by average FTE count per month. Revenue from billing systems; FTE from HR payroll records. Includes all revenue-generating roles.",
            meaning: "Revenue per FTE growing from $6.8K to $8.4K (+24%) indicates improving workforce productivity. This growth outpaces headcount growth, suggesting AI augmentation and process improvements are amplifying each agent's revenue contribution.",
            actions: [
              "Set revenue per FTE target of $9.0K for next fiscal year",
              "Identify top revenue-generating agents and replicate their practices",
              "Correlate revenue per FTE with AI tool adoption to quantify augmentation impact",
              "Use this metric in the business case for additional technology investments"
            ]
          }}
        >
          <AreaChart data={revPerFTE} color={t.success} height={160} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '0 4px' }}>
            {costLabels.map(l => (
              <span key={l} style={{ fontSize: 9, color: t.textTertiary }}>{l}</span>
            ))}
          </div>
        </Widget>

        {/* Row 7: Billing Accuracy */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginTop: 24 }}>
          <Card style={{ padding: 24, textAlign: 'center' }}>
            <SectionTitle subtitle="Invoice accuracy rate vs target">Billing Accuracy</SectionTitle>
            <div style={{ fontSize: 48, fontWeight: 700, color: t.success, margin: '16px 0' }}>98.7%</div>
            <div style={{ fontSize: 12, color: t.textTertiary }}>Target: 99.5%</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Exceptions</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.warning }}>12</div>
              </div>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Amount at Risk</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.danger }}>$16.2K</div>
              </div>
            </div>
          </Card>
          <DataTable
            title="Billing Exceptions"
            columns={[
              { key: 'client', label: 'Client' },
              { key: 'type', label: 'Exception Type' },
              { key: 'amount', label: 'Amount', align: 'right' },
              { key: 'date', label: 'Date', align: 'center' },
              { key: 'status', label: 'Status', align: 'center', render: (val) => (
                <Badge variant={val}>{val === 'success' ? 'Resolved' : val === 'warning' ? 'Reviewing' : 'Disputed'}</Badge>
              )},
              { key: 'resolution', label: 'Resolution', align: 'center' },
            ]}
            rows={billingExceptions}
            pageSize={5}
          />
        </div>
      </div>
    </div>
  );
}
