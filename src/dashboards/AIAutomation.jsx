import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import {
  Card, KPICard, Widget, DataTable, Badge, SectionTitle, TimeRangeSelector
} from '../components/UI';
import {
  FunnelChart, Heatmap, BarChart, MultiLineChart, HorizontalBar, Treemap, HistogramChart, ComboChart, Sparkline
} from '../components/Charts';

// ─── MOCK DATA ───
const funnelStages = [
  { name: 'Entry', value: 10000 },
  { name: 'Intent Matched', value: 9200 },
  { name: 'Dialog Complete', value: 7800 },
  { name: 'Resolved', value: 6500 },
  { name: 'Satisfied', value: 5800 },
];

const intentLabels = ['Billing', 'Tech Sup', 'Account', 'Shipping', 'Returns', 'General'];
const intentMatrix = [
  [92, 3, 2, 1, 1, 1],
  [2, 89, 4, 2, 1, 2],
  [3, 2, 91, 1, 2, 1],
  [1, 1, 1, 94, 2, 1],
  [1, 2, 1, 2, 90, 4],
  [2, 3, 2, 1, 3, 89],
];

const csatLabels = ['Billing', 'Tech Support', 'Account', 'Shipping', 'Returns'];
const botCSAT = [3.9, 3.6, 3.8, 4.1, 3.5];
const humanCSAT = [4.2, 4.0, 4.1, 4.3, 3.9];

const modelAccuracySeries = [
  { name: 'Accuracy', data: [88.2, 89.1, 89.8, 90.2, 90.5, 91.0, 90.8, 91.2, 90.9, 91.1, 91.0, 91.2] },
];
const modelLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const controlLimits = [
  { value: 85, label: 'LCL' },
  { value: 95, label: 'UCL' },
  { value: 90, label: 'Target' },
];

const adoptionByTeam = [
  { label: 'Team Alpha', value: 82 },
  { label: 'Team Beta', value: 76 },
  { label: 'Team Gamma', value: 71 },
  { label: 'Team Delta', value: 64 },
  { label: 'Team Epsilon', value: 58 },
  { label: 'Team Zeta', value: 52 },
  { label: 'Team Eta', value: 45 },
];

const escalationTreemap = [
  { label: 'Billing Dispute', value: 320 },
  { label: 'Tech Issue', value: 280 },
  { label: 'Account Lock', value: 190 },
  { label: 'Refund Request', value: 160 },
  { label: 'Shipping Delay', value: 120 },
  { label: 'Product Info', value: 85 },
  { label: 'Password Reset', value: 60 },
  { label: 'Other', value: 45 },
];

const genAIRows = [
  { model: 'GPT-4o Summary', accuracy: 94.2, latency: '1.2s', cost: '$0.012', hallucination: '1.8%', status: 'success' },
  { model: 'Claude Intent', accuracy: 96.1, latency: '0.8s', cost: '$0.008', hallucination: '0.9%', status: 'success' },
  { model: 'Sentiment v3', accuracy: 91.8, latency: '0.3s', cost: '$0.004', hallucination: '2.1%', status: 'warning' },
  { model: 'Auto-QA Scorer', accuracy: 88.5, latency: '2.1s', cost: '$0.018', hallucination: '3.2%', status: 'warning' },
  { model: 'Knowledge Search', accuracy: 92.4, latency: '0.6s', cost: '$0.006', hallucination: '1.4%', status: 'success' },
  { model: 'Translation v2', accuracy: 97.3, latency: '1.5s', cost: '$0.014', hallucination: '0.5%', status: 'success' },
];

const confidenceBins = [
  { label: '0-10', count: 12 },
  { label: '10-20', count: 28 },
  { label: '20-30', count: 45 },
  { label: '30-40', count: 78 },
  { label: '40-50', count: 120 },
  { label: '50-60', count: 280 },
  { label: '60-70', count: 520 },
  { label: '70-80', count: 890 },
  { label: '80-90', count: 1450 },
  { label: '90-100', count: 2680 },
];

const automationSavings = [
  { label: 'Chat Bot Deflection', value: 185 },
  { label: 'IVR Self-Service', value: 120 },
  { label: 'Auto-QA Efficiency', value: 55 },
  { label: 'Agent Assist Productivity', value: 42 },
  { label: 'Email Auto-Response', value: 18 },
];

export default function AIAutomation() {
  const { t } = useTheme();
  const [range, setRange] = useState('30d');

  const themedModelAccuracySeries = modelAccuracySeries.map((s, i) => ({ ...s, color: t.chart[i % t.chart.length] }));
  const themedControlLimits = [
    { ...controlLimits[0], color: t.danger },
    { ...controlLimits[1], color: t.success },
    { ...controlLimits[2], color: t.warning },
  ];
  const themedAdoptionByTeam = adoptionByTeam.map((r, i) => ({ ...r, color: t.chart[i % t.chart.length] }));
  const themedEscalationTreemap = escalationTreemap.map((r, i) => ({ ...r, color: t.chart[i % t.chart.length] }));
  const themedAutomationSavings = automationSavings.map((r, i) => ({ ...r, color: t.chart[i % t.chart.length] }));

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="AI & Automation Dashboard"
        subtitle="Bot performance, model accuracy, and automation ROI"
        actions={<TimeRangeSelector selected={range} onChange={setRange} />}
      />

      <div style={{ padding: 32 }}>
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="Deflection Rate" value="42%" change="+8pp" up={true} isGood={true} sparkData={[30, 33, 35, 37, 39, 42]} sparkColor={t.success} />
          <KPICard title="Bot CSAT" value="3.8/5" sparkData={[3.2, 3.4, 3.5, 3.6, 3.7, 3.8]} sparkColor={t.primary} />
          <KPICard title="Intent Accuracy" value="91.2%" change="+2.1pp" up={true} isGood={true} sparkData={[87, 88, 89, 90, 90.5, 91.2]} sparkColor={t.success} />
          <KPICard title="Escalation Rate" value="18%" change="-4pp" up={false} isGood={false} sparkData={[24, 22, 21, 20, 19, 18]} sparkColor={t.success} />
          <KPICard title="Agent Assist" value="67%" change="+12pp" up={true} isGood={true} sparkData={[48, 52, 56, 60, 64, 67]} sparkColor={t.accent1} />
          <KPICard title="Auto-QA" value="72%" sparkData={[55, 58, 62, 66, 69, 72]} sparkColor={t.info} />
          <KPICard title="Cost Avoidance" value="$420K" change="+38%" up={true} isGood={true} sparkData={[180, 240, 290, 340, 380, 420]} sparkColor={t.success} />
        </div>

        {/* Row 2: Funnel + Intent Heatmap */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Bot Containment Funnel"
            subtitle="Entry to satisfaction journey"
            insight={{
              description: "Funnel chart tracking the bot interaction journey from entry to customer satisfaction, showing containment rates at each stage.",
              dataSource: "Bot platform analytics (Google CCAI/Amazon Lex). Entry = all bot interactions initiated. Each stage tracked via conversation state transitions. Satisfaction from post-bot mini-survey.",
              meaning: "58% end-to-end containment (5,800/10,000 satisfied) is strong. The biggest drop is Dialog Complete\u2192Resolved (83%), indicating some conversations that complete still don't solve the customer's issue. 92% intent matching shows the NLU model is working well.",
              actions: [
                "Focus improvement on the Dialog\u2192Resolved gap (17% drop) - review unresolved topics",
                "Analyze the 2,200 interactions that didn't complete dialog for UX improvements",
                "Target 65% end-to-end satisfaction rate for next quarter",
                "Implement fallback to human agent before customer frustration builds"
              ]
            }}
          >
            <FunnelChart stages={funnelStages} />
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12 }}>
              {funnelStages.map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: t.textTertiary }}>{s.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{(s.value / funnelStages[0].value * 100).toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </Widget>

          <Widget
            title="Intent Confusion Matrix"
            subtitle="Classification accuracy across top intents"
            insight={{
              description: "Heatmap showing classification accuracy for each intent pair. Diagonal = correct classification. Off-diagonal = misclassification rates between intents.",
              dataSource: "Intent classification model evaluation against human-labeled test set of 5,000 interactions. Refreshed monthly with new labeled data. Model: fine-tuned BERT classifier.",
              meaning: "Overall accuracy of 91.2% with most confusion between General\u2194Tech Support (3-4%) and Account\u2194Billing (3%). Shipping has the highest single-intent accuracy (94%) due to distinctive language patterns. The General intent acts as a catch-all, absorbing misclassifications.",
              actions: [
                "Add training examples for Account vs Billing distinction to reduce confusion",
                "Consider splitting General into more specific sub-intents",
                "Set up active learning pipeline to continuously improve classification",
                "Monitor for intent drift as new products/services are added"
              ]
            }}
          >
            <Heatmap
              data={intentMatrix}
              rowLabels={intentLabels}
              colLabels={intentLabels}
              colorScale="diverging"
            />
          </Widget>
        </div>

        {/* Row 3: Bot vs Human CSAT + Model Accuracy */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Bot vs Human CSAT"
            subtitle="Satisfaction comparison by category"
            insight={{
              description: "Grouped bar chart comparing CSAT scores between bot-handled and human-handled interactions across five service categories.",
              dataSource: "Post-interaction surveys segmented by handling channel (bot vs human). Minimum 200 surveys per category per channel for statistical validity.",
              meaning: "Human agents outscore bots across all categories (0.2-0.4 point gap). The gap is smallest for Shipping (4.1 vs 4.3 = 0.2) and largest for Returns (3.5 vs 3.9 = 0.4). This suggests bots handle simple, structured queries well but struggle with emotionally complex interactions like returns.",
              actions: [
                "Focus bot improvements on Returns and Tech Support (largest CSAT gaps)",
                "Implement sentiment-aware handoff to human agents when frustration is detected",
                "Consider hybrid model: bot handles data collection, human handles resolution for complex categories",
                "Target reducing the bot-human CSAT gap to 0.2 or less across all categories"
              ]
            }}
            legend={[
              <span key="bot" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[0] }} /> Bot
              </span>,
              <span key="human" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[2] }} /> Human
              </span>,
            ]}
          >
            <BarChart data={[botCSAT, humanCSAT]} labels={csatLabels} colors={[t.chart[0], t.chart[2]]} height={200} />
          </Widget>

          <Widget
            title="Model Accuracy Trend"
            subtitle="12-month accuracy with control limits"
            insight={{
              description: "Line chart tracking AI model accuracy over 12 months with upper control limit (UCL), lower control limit (LCL), and target threshold lines for SPC monitoring.",
              dataSource: "Weekly model evaluation against held-out test sets. Accuracy = correctly classified / total predictions. Control limits calculated using 3-sigma from historical accuracy distribution.",
              meaning: "Model accuracy stable at 91.2% (above 90% target) with no out-of-control signals. The tight range (90.5-91.2%) over 6 months indicates model stability. No drift detected, suggesting training data remains representative of production traffic.",
              actions: [
                "Maintain current retraining cadence - model is performing consistently",
                "Set up automated alerts if accuracy drops below LCL (85%) for any weekly batch",
                "Plan for model refresh when accuracy plateaus or new intents are added",
                "Consider ensemble models to push accuracy toward 95%"
              ]
            }}
          >
            <MultiLineChart
              series={themedModelAccuracySeries}
              labels={modelLabels}
              height={200}
              benchmarkLines={themedControlLimits}
            />
          </Widget>
        </div>

        {/* Row 4: Adoption HBar + Escalation Treemap */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Agent Assist Adoption by Team"
            subtitle="Percentage of agents actively using assist tools"
            insight={{
              description: "Horizontal bar chart showing what percentage of agents in each team actively use AI assist tools during customer interactions.",
              dataSource: "Agent assist platform usage logs. Adoption = agents who used assist at least once per shift / total agents on shift. Tracked daily, displayed as monthly average.",
              meaning: "Wide adoption gap: Alpha (82%) vs Eta (45%) suggests cultural and training differences, not tool limitations. Teams with higher adoption (Alpha, Beta) also show better QA scores and lower AHT, indicating a correlation between AI tool usage and performance.",
              actions: [
                "Mandate minimum adoption targets: 70% for all teams within 60 days",
                "Have Team Alpha champions present benefits to lagging teams",
                "Identify and remove UX barriers that prevent adoption in lower-performing teams",
                "Tie agent assist usage to performance incentives"
              ]
            }}
          >
            <HorizontalBar items={themedAdoptionByTeam} maxVal={100} />
          </Widget>

          <Widget
            title="Escalation Volume by Intent"
            subtitle="Proportion of bot-to-human escalations"
            insight={{
              description: "Treemap showing the proportional volume of bot-to-human escalations by intent category, revealing which topics the bot struggles with most.",
              dataSource: "Bot escalation logs with intent classification at time of handoff. Volume = number of conversations escalated from bot to human agent within the reporting period.",
              meaning: "Billing Dispute (320) and Tech Issue (280) drive 47% of all escalations. These are inherently complex, emotionally charged interactions. Password Reset (60) escalations are concerning since this should be fully automatable.",
              actions: [
                "Prioritize reducing Password Reset escalations to near-zero through flow improvements",
                "Build specialized bot flows for Billing Dispute with empathy-aware language",
                "Add proactive human handoff triggers for Tech Issues to prevent frustration",
                "Track escalation rate as a % of total bot interactions by intent for trending"
              ]
            }}
          >
            <Treemap items={themedEscalationTreemap} height={220} />
          </Widget>
        </div>

        {/* Row 5: GenAI Quality Table */}
        <div style={{ marginBottom: 24 }}>
          <DataTable
            title="GenAI Model Quality"
            columns={[
              { key: 'model', label: 'Model' },
              { key: 'accuracy', label: 'Accuracy %', align: 'center', render: (val) => <span style={{ fontWeight: 600 }}>{val}%</span> },
              { key: 'latency', label: 'Latency', align: 'center' },
              { key: 'cost', label: 'Cost/Call', align: 'center' },
              { key: 'hallucination', label: 'Hallucination', align: 'center' },
              { key: 'status', label: 'Status', align: 'center', render: (val) => (
                <Badge variant={val}>{val === 'success' ? 'Healthy' : 'Review'}</Badge>
              )},
            ]}
            rows={genAIRows}
            pageSize={6}
          />
        </div>

        {/* Row 6: Confidence Score Histogram */}
        <Widget
          title="Bot Confidence Score Distribution"
          subtitle="Distribution of confidence scores across all interactions"
          insight={{
            description: "Histogram showing the distribution of bot confidence scores across all interactions, indicating how certain the AI is about its responses.",
            dataSource: "Bot NLU model output confidence scores (0-100) logged for every interaction. Threshold for auto-response typically set at 70+. Below threshold triggers human review or escalation.",
            meaning: "43.8% of interactions have >90 confidence (auto-resolvable). Only 4.6% below 50 (requires human). Mean score of 78.4 and median of 82.1 indicate a right-skewed, healthy distribution. The bot is confident in most interactions.",
            actions: [
              "Lower auto-response threshold from 70 to 65 to capture more confident interactions",
              "Analyze the 4.6% below-50 interactions for new training data",
              "Track confidence score distribution monthly for model degradation signals",
              "Implement confidence-based routing: >90 auto-resolve, 70-90 bot with review, <70 human"
            ]
          }}
        >
          <HistogramChart bins={confidenceBins} height={180} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '0 10px' }}>
            <span style={{ fontSize: 10, color: t.textTertiary }}>Low Confidence</span>
            <span style={{ fontSize: 10, color: t.textTertiary }}>High Confidence</span>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, padding: '12px 16px', background: t.surfaceAlt, borderRadius: 8 }}>
            <div>
              <div style={{ fontSize: 10, color: t.textTertiary }}>Mean Score</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>78.4</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.textTertiary }}>Median</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>82.1</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.textTertiary }}>Below Threshold (&lt;50)</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.danger }}>4.6%</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.textTertiary }}>High Confidence (&gt;90)</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.success }}>43.8%</div>
            </div>
          </div>
        </Widget>

        {/* Row 7: Automation Savings Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
          <Widget title="Automation Savings Breakdown" subtitle="Cost avoidance by AI capability ($K YTD)"
            insight={{
              description: "Horizontal bar chart showing cost avoidance contributions from each AI capability, revealing which investments deliver the most financial value.",
              dataSource: "Cost avoidance model: For each AI capability, calculate (interactions handled \u00d7 cost if handled by human) - (AI operating costs). Validated quarterly against actual spend.",
              meaning: "Chat Bot Deflection ($185K) delivers 44% of total savings, making it the highest-ROI AI investment. IVR Self-Service ($120K) is second. Agent Assist ($42K) has lower direct savings but enables quality improvements not captured in this metric.",
              actions: [
                "Expand Chat Bot capabilities to target $250K annual savings",
                "Investigate IVR Self-Service optimization for additional $30-40K savings",
                "Build comprehensive ROI model for Agent Assist that includes quality improvement value",
                "Set annual AI savings target of $600K based on capability expansion plans"
              ]
            }}>
            <HorizontalBar items={themedAutomationSavings} />
            <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: t.successLight, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: t.textSecondary }}>Total YTD Savings</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: t.success }}>$420K</span>
            </div>
          </Widget>
          <Widget title="AI ROI Summary" subtitle="Return on AI investment this fiscal year"
            insight={{
              description: "Summary grid showing key AI investment metrics: total investment, cost savings, ROI multiple, payback period, contacts automated, and agent hours saved.",
              dataSource: "AI program finance tracker combining CapEx (implementation) and OpEx (licensing, compute, maintenance) against measurable savings and productivity gains.",
              meaning: "3.0x ROI with 4.2 month payback demonstrates exceptional AI investment returns. 126K automated contacts and 8,400 saved agent hours translate to approximately 4 FTE equivalent in capacity. The investment continues to generate returns beyond the payback period.",
              actions: [
                "Use this ROI data to justify next round of AI investment ($200K budget request)",
                "Present 3.0x ROI to leadership as benchmark for future technology investments",
                "Set target of 5.0x ROI by expanding to additional use cases",
                "Track ROI quarterly and report in finance dashboard for ongoing visibility"
              ]
            }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'AI Investment', value: '$140K', color: t.primary },
                { label: 'Cost Savings', value: '$420K', color: t.success },
                { label: 'ROI', value: '3.0x', color: t.success },
                { label: 'Payback Period', value: '4.2 mo', color: t.info },
                { label: 'Contacts Automated', value: '126K', color: t.accent1 },
                { label: 'Agent Hours Saved', value: '8,400', color: t.warning },
              ].map((item, i) => (
                <div key={i} style={{ padding: '14px 16px', borderRadius: 8, background: t.surfaceAlt, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: t.textTertiary }}>{item.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}
