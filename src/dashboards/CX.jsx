import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, KPICard, Widget, FilterBar, Badge } from '../components/UI';
import { MultiLineChart, DonutChart, GaugeChart, Treemap, BarChart, FunnelChart, SankeyDiagram, StackedAreaChart, ComboChart, Sparkline } from '../components/Charts';

// ─── INLINE MOCK DATA ───
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const csatByChannel = {
  labels: months,
  series: [
    { name: 'Voice', data: [4.1, 4.1, 4.2, 4.2, 4.2, 4.3, 4.3, 4.3, 4.3, 4.4, 4.4, 4.4], color: '' },
    { name: 'Chat', data: [4.2, 4.2, 4.3, 4.3, 4.3, 4.4, 4.4, 4.4, 4.5, 4.5, 4.5, 4.5], color: '' },
    { name: 'Email', data: [3.8, 3.8, 3.9, 3.9, 3.9, 4.0, 4.0, 4.0, 4.0, 4.1, 4.1, 4.1], color: '' },
    { name: 'Social', data: [4.0, 4.0, 4.1, 4.1, 4.2, 4.2, 4.2, 4.3, 4.3, 4.3, 4.3, 4.3], color: '' },
  ],
};

const npsData = {
  promoters: 58,
  passives: 26,
  detractors: 16,
  score: 42,
  trend: [30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
};

const contactReasons = [
  { label: 'Account Inquiry', value: 2800, suffix: '' },
  { label: 'Billing Issue', value: 2200, suffix: '' },
  { label: 'Tech Support', value: 1800, suffix: '' },
  { label: 'Card Activation', value: 1400, suffix: '' },
  { label: 'Password Reset', value: 1200, suffix: '' },
  { label: 'Transaction Dispute', value: 950, suffix: '' },
  { label: 'Rate Inquiry', value: 800, suffix: '' },
  { label: 'Account Closure', value: 650, suffix: '' },
  { label: 'Loan Info', value: 550, suffix: '' },
  { label: 'Other', value: 1100, suffix: '' },
];

const repeatContactData = {
  labels: ['1st Contact', '2nd Contact', '3rd Contact', '4th+'],
  values: [86, 10, 3, 1],
};
const repeatFunnelStages = [
  { name: 'Total Contacts', value: 28400 },
  { name: '1st Contact Resolution', value: 24424 },
  { name: 'Repeat (2nd)', value: 2840 },
  { name: 'Repeat (3rd)', value: 852 },
  { name: 'Repeat (4th+)', value: 284 },
];

const journeyNodes = [
  { id: 'ivr', name: 'IVR', col: 0, value: 100 },
  { id: 'self-serve', name: 'Self-Serve', col: 0, value: 60 },
  { id: 'web', name: 'Web Portal', col: 0, value: 40 },
  { id: 'agent-voice', name: 'Voice Agent', col: 1, value: 80 },
  { id: 'agent-chat', name: 'Chat Agent', col: 1, value: 50 },
  { id: 'bot', name: 'Chatbot', col: 1, value: 40 },
  { id: 'resolved', name: 'Resolved', col: 2, value: 120 },
  { id: 'escalated', name: 'Escalated', col: 2, value: 30 },
  { id: 'callback', name: 'Callback', col: 2, value: 20 },
];
const journeyLinks = [
  { source: 'ivr', target: 'agent-voice', value: 60 },
  { source: 'ivr', target: 'bot', value: 25 },
  { source: 'ivr', target: 'resolved', value: 15 },
  { source: 'self-serve', target: 'resolved', value: 35 },
  { source: 'self-serve', target: 'agent-chat', value: 15 },
  { source: 'self-serve', target: 'agent-voice', value: 10 },
  { source: 'web', target: 'agent-chat', value: 20 },
  { source: 'web', target: 'resolved', value: 15 },
  { source: 'web', target: 'bot', value: 5 },
  { source: 'agent-voice', target: 'resolved', value: 55 },
  { source: 'agent-voice', target: 'escalated', value: 15 },
  { source: 'agent-voice', target: 'callback', value: 10 },
  { source: 'agent-chat', target: 'resolved', value: 30 },
  { source: 'agent-chat', target: 'escalated', value: 10 },
  { source: 'agent-chat', target: 'callback', value: 10 },
  { source: 'bot', target: 'resolved', value: 20 },
  { source: 'bot', target: 'agent-voice', value: 10 },
];

const sentimentSeries = [
  { name: 'Positive', data: [52, 54, 55, 56, 58, 60, 62, 63, 64, 65, 66, 68], color: '' },
  { name: 'Neutral', data: [32, 31, 30, 30, 29, 28, 27, 26, 26, 25, 24, 23], color: '' },
  { name: 'Negative', data: [16, 15, 15, 14, 13, 12, 11, 11, 10, 10, 10, 9], color: '' },
];

const cesBarData = [3.5, 3.4, 3.3, 3.2, 3.2, 3.1, 3.1, 3.1, 3.0, 3.0, 3.1, 3.1];
const cesLineData = [72, 74, 75, 76, 77, 78, 79, 80, 81, 81, 82, 82];

const topicClusters = [
  { label: 'Account Access', value: 3200 },
  { label: 'Billing', value: 2800 },
  { label: 'Technical', value: 2200 },
  { label: 'Products', value: 1800 },
  { label: 'Complaints', value: 1400 },
  { label: 'Payments', value: 1200 },
  { label: 'Fraud', value: 900 },
  { label: 'General', value: 700 },
];

const filters = [
  { key: 'period', label: 'Period', default: 'March 2026', type: 'dropdown', icon: 'cal' },
  { key: 'channel', label: 'Channel', default: 'All Channels', type: 'dropdown' },
  { key: 'segment', label: 'Segment', default: 'All Customers', type: 'dropdown' },
  { key: 'product', label: 'Product', default: 'All Products', type: 'dropdown' },
];

// ─── COMPONENT ───
export default function CX() {
  const { t } = useTheme();

  const csatSeriesColored = csatByChannel.series.map((s, i) => ({ ...s, color: t.chart[i] }));
  const sentimentColored = sentimentSeries.map((s, i) => {
    const colors = [t.success, t.textTertiary, t.danger];
    return { ...s, color: colors[i] };
  });

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="Customer Experience Dashboard"
        subtitle="Voice of the customer, satisfaction metrics, and journey analytics"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <FilterBar filters={filters} />

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="CSAT" value="4.3/5" change="+0.2 pts" up isGood sparkData={[4.0, 4.0, 4.1, 4.1, 4.1, 4.2, 4.2, 4.2, 4.3, 4.3, 4.3, 4.3]} sparkColor={t.success} />
          <KPICard title="NPS" value="+42" change="+4 pts" up isGood sparkData={npsData.trend} sparkColor={t.success} />
          <KPICard title="CES" value="3.1/5" change="-0.2" up={false} isGood={false} sparkData={cesBarData} sparkColor={t.success} subtitle="Lower is better" />
          <KPICard title="Repeat Contact" value="14%" change="-1pp" up={false} isGood={false} sparkData={[18, 17, 17, 16, 16, 15, 15, 15, 14, 14, 14, 14]} sparkColor={t.success} />
          <KPICard title="FCR" value="78%" change="+2pp" up isGood sparkData={[72, 73, 74, 74, 75, 76, 76, 77, 77, 78, 78, 78]} sparkColor={t.success} />
          <KPICard title="Positive Sentiment" value="72%" change="+5pp" up isGood sparkData={sentimentSeries[0].data} sparkColor={t.success} />
          <KPICard title="Survey Response" value="35%" change="+4pp" up={true} isGood={true} sparkData={[28, 29, 30, 31, 32, 33, 34, 35]} sparkColor={t.info} subtitle="Post-contact surveys" />
        </div>

        {/* Row 2: CSAT Trend + NPS Donut/Gauge/Trend */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="CSAT Trend by Channel" subtitle="12-month trajectory | Scale: 1-5"
            insight={{
              description: "Multi-line chart showing 12-month CSAT score trajectories for each channel (Voice, Chat, Email, Social). Target benchmark line at 4.0.",
              dataSource: "Post-interaction survey platform (Medallia/Qualtrics). Channel-specific CSAT collected via IVR, in-chat survey, email follow-up, and social media feedback tools. Response rates vary: Voice 25%, Chat 40%, Email 15%, Social 35%.",
              meaning: "Chat leads all channels at 4.5, likely due to faster resolution and younger demographic preference. Email lags at 4.1, possibly due to slower response times. All channels are above the 4.0 target, showing universal CX improvement.",
              actions: [
                "Investigate Email's lower CSAT - likely driven by response time expectations",
                "Apply Chat best practices to Voice channel for improvement opportunities",
                "Increase Email survey response rate from 15% to improve data reliability",
                "Set channel-specific targets: Voice 4.5, Chat 4.6, Email 4.3, Social 4.4"
              ]
            }}
            legend={csatSeriesColored.map((s, i) => (
              <span key={i} style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 3, borderRadius: 2, background: s.color }} />{s.name}
              </span>
            ))}>
            <MultiLineChart
              series={csatSeriesColored.map(s => ({ ...s, data: s.data.map(v => v * 20) }))}
              labels={months}
              benchmarkLines={[{ value: 4.0 * 20, label: 'Target 4.0', color: t.warning }]}
            />
          </Widget>

          <Widget title="Net Promoter Score" subtitle="Current NPS breakdown and trend"
            insight={{
              description: "Combined NPS view: donut showing promoter/passive/detractor split, gauge showing NPS score positioning, and 12-month trend sparkline.",
              dataSource: "Quarterly relationship NPS survey with 35% response rate. Sample size: 8,400 respondents per quarter. 11-point Likert scale (0-10) classified into standard NPS categories.",
              meaning: "NPS of +42 (up from +30) is in 'Excellent' territory. 58% promoters vs 16% detractors shows strong positive advocacy. The 12-point improvement in 12 months is exceptional and outpaces the 4-6 point industry average annual improvement.",
              actions: [
                "Activate promoter advocacy program (referrals, testimonials, beta testing)",
                "Conduct deep-dive interviews with the 16% detractors to identify systemic issues",
                "Track NPS by customer segment to identify which groups drive the score",
                "Set stretch target of NPS +50 for next fiscal year"
              ]
            }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'center' }}>
              {/* Donut */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <DonutChart value={npsData.promoters} size={100} strokeWidth={10} color={t.success} />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>+{npsData.score}</div>
                    <div style={{ fontSize: 8, color: t.textTertiary }}>NPS</div>
                  </div>
                </div>
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[
                    { label: 'Promoters', value: `${npsData.promoters}%`, color: t.success },
                    { label: 'Passives', value: `${npsData.passives}%`, color: t.warning },
                    { label: 'Detractors', value: `${npsData.detractors}%`, color: t.danger },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
                      <span style={{ fontSize: 10, color: t.textTertiary }}>{item.label}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: t.text }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gauge */}
              <div style={{ textAlign: 'center' }}>
                <GaugeChart value={npsData.score} min={-100} max={100} size={160} label="NPS Score" zones={[
                  { from: -100, to: 0, color: t.danger },
                  { from: 0, to: 30, color: t.warning },
                  { from: 30, to: 70, color: t.success },
                  { from: 70, to: 100, color: t.chart[2] },
                ]} />
              </div>

              {/* Trend */}
              <div>
                <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 8, textAlign: 'center' }}>12-Month Trend</div>
                <Sparkline data={npsData.trend} color={t.success} width={160} height={60} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: t.textTertiary }}>+30</span>
                  <span style={{ fontSize: 10, color: t.success, fontWeight: 600 }}>+42</span>
                </div>
                <div style={{ marginTop: 12, padding: '6px 10px', borderRadius: 8, background: t.successLight, textAlign: 'center' }}>
                  <span style={{ fontSize: 11, color: t.success, fontWeight: 600 }}>+12 pts YoY improvement</span>
                </div>
              </div>
            </div>
          </Widget>
        </div>

        {/* Row 3: Contact Reason Treemap + Repeat Contact */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget title="Contact Reason Distribution" subtitle="Treemap by volume | Top categories"
            insight={{
              description: "Treemap showing relative volume of customer contact reasons, sized proportionally to help identify primary demand drivers.",
              dataSource: "CRM case disposition codes combined with NLP-extracted intent classification. Dual-source validation ensures accuracy. Updated daily from case closure data.",
              meaning: "Account Inquiry (2,800) and Billing Issue (2,200) together represent 37% of all contacts and are potentially self-serviceable. Tech Support (1,800) is the third largest driver. Password Reset (1,200) should be fully automated.",
              actions: [
                "Build self-service flows for Account Inquiry and Billing Issue (top 2 drivers)",
                "Fully automate Password Reset to eliminate 1,200 monthly contacts",
                "Analyze Transaction Dispute calls for process improvement (often high AHT)",
                "Track contact reason trends monthly to measure demand reduction efforts"
              ]
            }}>
            <Treemap items={contactReasons.map((r, i) => ({ ...r, color: t.chart[i % t.chart.length] }))} />
            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {contactReasons.slice(0, 5).map((r, i) => (
                <span key={i} style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 3, background: t.chart[i % t.chart.length] }} />
                  {r.label}: {r.value.toLocaleString()}
                </span>
              ))}
            </div>
          </Widget>

          <Widget title="Repeat Contact Analysis" subtitle="Contact frequency distribution & funnel"
            insight={{
              description: "Dual-panel view: percentage distribution of contacts by frequency (1st through 4th+) and resolution funnel showing where repeat contacts originate.",
              dataSource: "CRM case linking algorithm matching customer ID + topic within 7-day window. Repeat = same customer contacting about same or related issue within the window.",
              meaning: "86% First Contact Resolution is good but the remaining 14% (3,976 contacts/month) represent both customer frustration and cost inefficiency. Each repeat contact costs the same as a new one ($4.20) but provides no new revenue. Total repeat cost: ~$16,700/month.",
              actions: [
                "Root cause analysis on the 14% repeat contacts by contact reason",
                "Implement proactive follow-up calls for complex issue types to prevent repeats",
                "Track FCR by agent to identify training opportunities for repeat contact reduction",
                "Set target to reduce repeat contacts from 14% to 10% (saving ~$5,600/month)"
              ]
            }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 8 }}>Distribution</div>
                {repeatContactData.labels.map((label, i) => {
                  const colors = [t.success, t.warning, t.danger, t.danger];
                  return (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: t.textSecondary }}>{label}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: t.text }}>{repeatContactData.values[i]}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${repeatContactData.values[i]}%`, borderRadius: 3, background: colors[i] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 8 }}>Resolution Funnel</div>
                <FunnelChart stages={repeatFunnelStages} />
              </div>
            </div>
          </Widget>
        </div>

        {/* Row 4: Customer Journey Sankey */}
        <div style={{ marginBottom: 24 }}>
          <Widget title="Customer Journey Flow" subtitle="Channel entry points to resolution outcomes | Sankey diagram"
            insight={{
              description: "Sankey diagram showing how customers flow from entry points (IVR, Self-Serve, Web) through handling stages (Voice Agent, Chat Agent, Chatbot) to outcomes (Resolved, Escalated, Callback).",
              dataSource: "Cross-channel journey analytics combining ACD, CRM, bot platform, and web analytics data. Customer journeys reconstructed using session IDs and timestamps.",
              meaning: "IVR is the dominant entry point (100 units) with 60% routing to Voice Agent. Self-Serve shows good containment (35/60 = 58% resolved without agent). Escalation rate of 30/170 = 18% from agent channels indicates complexity in certain interactions. Chatbot resolves 20/30 contacts (67%) which is strong.",
              actions: [
                "Optimize IVR routing to increase Self-Serve and Bot deflection from IVR entry",
                "Investigate the 15 IVR->Resolved contacts to understand what's succeeding",
                "Reduce Escalations by improving agent tools and knowledge base access",
                "Build callback scheduling into the journey for complex issues"
              ]
            }}
            legend={[
              <span key="e" style={{ fontSize: 10, color: t.textTertiary }}>{"Entry Points (left) → Handling (center) → Outcomes (right)"}</span>,
            ]}>
            <SankeyDiagram nodes={journeyNodes} links={journeyLinks} height={280} />
          </Widget>
        </div>

        {/* Row 5: Sentiment + CES + Topics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Widget title="Sentiment Trend" subtitle="% distribution over time"
            insight={{
              description: "Stacked area chart showing the evolving distribution of positive, neutral, and negative sentiment in customer interactions over 12 months.",
              dataSource: "NLP sentiment analysis applied to 100% of call transcripts and chat logs. Model accuracy: 91% (validated quarterly against human-labeled sample).",
              meaning: "Dramatic shift from 52% positive / 16% negative to 68% positive / 9% negative represents a material improvement in customer experience. The neutral category shrinking from 32% to 23% shows customers are forming stronger opinions - mostly positive.",
              actions: [
                "Identify operational changes that drove the positive shift for continued investment",
                "Analyze the remaining 9% negative interactions for systemic patterns",
                "Use real-time sentiment detection to alert supervisors during negative interactions",
                "Correlate sentiment with CSAT to validate alignment between behavioral and survey data"
              ]
            }}
            legend={[
              <span key="p" style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: t.success }} />Positive</span>,
              <span key="n" style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: t.textTertiary }} />Neutral</span>,
              <span key="ng" style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: t.danger }} />Negative</span>,
            ]}>
            <StackedAreaChart series={sentimentColored} labels={months} />
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div style={{ textAlign: 'center', padding: '6px', borderRadius: 8, background: t.successLight }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Positive</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.success }}>68%</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px', borderRadius: 8, background: t.surfaceAlt }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Neutral</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.textSecondary }}>23%</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px', borderRadius: 8, background: t.dangerLight }}>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Negative</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.danger }}>9%</div>
              </div>
            </div>
          </Widget>

          <Widget title="Customer Effort Score" subtitle="CES score (lower = easier) & resolution rate"
            insight={{
              description: "Combo chart with CES score bars (lower = easier) and resolution rate line, showing the inverse relationship between customer effort and resolution success.",
              dataSource: "Post-interaction CES survey ('How easy was it to resolve your issue?' 1-5 scale). Resolution rate from CRM case disposition. Both metrics on same time axis for correlation analysis.",
              meaning: "CES improving from 3.5 to 3.1 (lower = better) while resolution rate climbing from 72% to 82% confirms that reducing friction improves outcomes. The 0.4-point CES improvement over 12 months translates to measurably easier customer experiences.",
              actions: [
                "Identify high-effort interaction types and simplify their processes",
                "Implement 'next best action' prompts to reduce agent guesswork",
                "Target CES below 3.0 (industry 'low effort' benchmark)",
                "Correlate CES with repeat contacts to validate effort->loyalty relationship"
              ]
            }}
            legend={[
              <span key="c" style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 3, borderRadius: 2, background: t.chart[0] }} />CES Score</span>,
              <span key="r" style={{ fontSize: 10, color: t.textTertiary, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 3, borderRadius: 2, background: t.chart[2] }} />Resolution %</span>,
            ]}>
            <ComboChart
              barData={cesBarData}
              lineData={cesLineData}
              labels={months}
              barColor={t.chart[0]}
              lineColor={t.chart[2]}
              barLabel="CES"
              lineLabel="Resolution %"
            />
            <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: t.successLight, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: t.textSecondary }}>CES improving: effort decreasing</span>
              <Badge variant="success">-0.4 pts YoY</Badge>
            </div>
          </Widget>

          <Widget title="Topic Clustering" subtitle="AI-extracted conversation topics by volume"
            insight={{
              description: "Treemap showing AI-extracted conversation topics clustered by volume, revealing what customers are actually talking about beyond structured disposition codes.",
              dataSource: "NLP topic modeling (LDA/BERTopic) applied to call transcripts and chat logs. Topics extracted unsupervised, then labeled by analysts. Updated weekly with new conversation data.",
              meaning: "Account Access (3,200) is the largest topic cluster, suggesting authentication and login issues are a major friction point. The gap between structured reasons (disposition codes) and topic clusters often reveals hidden demand drivers.",
              actions: [
                "Compare topic clusters with disposition codes to identify miscategorized contacts",
                "Build FAQ content for the top 5 topic clusters to improve self-service deflection",
                "Use topic trends as early warning signals for emerging customer issues",
                "Feed topic insights into product team for proactive issue resolution"
              ]
            }}>
            <Treemap items={topicClusters.map((tc, i) => ({ ...tc, color: t.chart[i % t.chart.length] }))} height={200} />
            <div style={{ marginTop: 12 }}>
              {topicClusters.slice(0, 4).map((tc, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: i < 3 ? `1px solid ${t.borderSubtle}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 3, background: t.chart[i % t.chart.length] }} />
                    <span style={{ fontSize: 11, color: t.textSecondary }}>{tc.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: t.text }}>{tc.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}
