import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import {
  Card, KPICard, Widget, DataTable, Badge, SectionTitle, TimeRangeSelector, ProgressCard
} from '../components/UI';
import {
  FunnelChart, Heatmap, HorizontalBar, BarChart, ComboChart, StackedBarChart, Sparkline
} from '../components/Charts';

// ─── MOCK DATA ───
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const conversionFunnel = [
  { name: 'Dials', value: 45000 },
  { name: 'Contacts', value: 17100 },
  { name: 'RPC', value: 8900 },
  { name: 'Pitches', value: 5340 },
  { name: 'Conversions', value: 2120 },
];

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hourLabels = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const bestTimeData = [
  [12, 18, 25, 32, 22, 28, 35, 30, 24, 18, 14, 10],
  [14, 20, 28, 35, 24, 30, 38, 32, 26, 20, 16, 12],
  [10, 16, 22, 28, 20, 26, 32, 28, 22, 16, 12, 8],
  [15, 22, 30, 38, 26, 32, 40, 35, 28, 22, 18, 14],
  [13, 19, 26, 34, 23, 29, 36, 31, 25, 19, 15, 11],
  [8, 12, 18, 22, 15, 20, 25, 22, 18, 14, 10, 6],
  [5, 8, 12, 16, 10, 14, 18, 15, 12, 8, 6, 4],
];

const agentConversion = [
  { label: 'Jessica Rivera', value: 18.2, suffix: '%' },
  { label: 'Mark Thompson', value: 16.8, suffix: '%' },
  { label: 'Angela Foster', value: 15.4, suffix: '%' },
  { label: 'Kevin Park', value: 14.1, suffix: '%' },
  { label: 'Diana Hughes', value: 12.8, suffix: '%' },
  { label: 'Brian Lee', value: 11.5, suffix: '%' },
  { label: 'Stephanie Cruz', value: 10.2, suffix: '%' },
  { label: 'Tyler Adams', value: 8.9, suffix: '%' },
];

const campaignNames = ['Summer Promo', 'Win-Back Q1', 'Upsell Premium', 'New Product'];
const campaignRevenue = [320, 280, 410, 190];
const campaignTarget = [350, 250, 400, 220];

const listPenetration = [
  { label: 'Summer Promo List', current: 78, target: 100 },
  { label: 'Win-Back Segment', current: 64, target: 100 },
  { label: 'Premium Upsell', current: 82, target: 100 },
  { label: 'New Product Early', current: 45, target: 100 },
  { label: 'Re-Engagement', current: 71, target: 100 },
];

const talkListenRatio = [
  { label: 'Jessica Rivera', value: 42, suffix: '%' },
  { label: 'Mark Thompson', value: 48, suffix: '%' },
  { label: 'Angela Foster', value: 44, suffix: '%' },
  { label: 'Kevin Park', value: 55, suffix: '%' },
  { label: 'Diana Hughes', value: 52, suffix: '%' },
  { label: 'Brian Lee', value: 60, suffix: '%' },
  { label: 'Stephanie Cruz', value: 46, suffix: '%' },
];

const abTestLabels = ['Script A', 'Script B', 'Script C', 'Script D'];
const abConversion = [12.4, 14.8, 11.2, 13.6];
const abCSAT = [3.8, 4.1, 3.6, 3.9];

const dialerMonthly = [38000, 40000, 42000, 44000, 41000, 43000, 45000, 44000, 42000, 43000, 44500, 45000];
const connectRateMonthly = [48, 49, 50, 51, 50, 51, 52, 51, 52, 51, 52, 52];

const callbackDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const callbackScheduled = [85, 92, 78, 88, 72];
const callbackCompleted = [68, 76, 61, 72, 58];
const callbackMissed = [17, 16, 17, 16, 14];
const callbackSegments = [
  { name: 'Completed' },
  { name: 'Missed' },
];
const callbackData = callbackDays.map((_, i) => [callbackCompleted[i], callbackMissed[i]]);

export default function Campaign() {
  const { t } = useTheme();
  const [range, setRange] = useState('30d');

  const themedAgentConversion = agentConversion.map((r, i) => ({ ...r, color: t.chart[i % t.chart.length] }));
  const themedListPenetration = listPenetration.map((r, i) => ({ ...r, color: t.chart[i % t.chart.length] }));
  const themedTalkListenRatio = talkListenRatio.map(r => ({
    ...r,
    color: r.value <= 50 ? t.success : r.value <= 55 ? t.warning : t.danger,
  }));
  const themedCallbackSegments = [
    { ...callbackSegments[0], color: t.success },
    { ...callbackSegments[1], color: t.danger },
  ];

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="Campaign & Outbound Dashboard"
        subtitle="Outbound campaign performance, conversion tracking, and dialer analytics"
        actions={<TimeRangeSelector selected={range} onChange={setRange} />}
      />

      <div style={{ padding: 32 }}>
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="Contact Rate" value="38%" change="+3%" up={true} isGood={true} sparkData={[32, 34, 35, 36, 37, 38]} sparkColor={t.success} />
          <KPICard title="Connect Rate" value="52%" change="+2%" up={true} isGood={true} sparkData={[46, 48, 49, 50, 51, 52]} sparkColor={t.primary} />
          <KPICard title="Conversion Rate" value="12.4%" change="+1.8pp" up={true} isGood={true} sparkData={[9.2, 10.1, 10.8, 11.4, 11.9, 12.4]} sparkColor={t.success} />
          <KPICard title="Revenue" value="$1.2M" change="+18%" up={true} isGood={true} sparkData={[820, 900, 980, 1050, 1120, 1200]} sparkColor={t.success} />
          <KPICard title="List Penetration" value="68%" sparkData={[52, 56, 60, 63, 65, 68]} sparkColor={t.accent1} />
          <KPICard title="DNC Rate" value="0.2%" sparkData={[0.5, 0.4, 0.3, 0.3, 0.2, 0.2]} sparkColor={t.success} />
          <KPICard title="Callback Comp." value="76%" sparkData={[68, 70, 72, 73, 75, 76]} sparkColor={t.info} />
        </div>

        {/* Row 2: Conversion Funnel + Best Time Heatmap */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Campaign Conversion Funnel"
            subtitle="End-to-end outbound journey"
            insight={{
              description: "Funnel visualization showing the end-to-end outbound campaign journey from initial dials through to final conversions, with stage-to-stage conversion rates.",
              dataSource: "Outbound dialer platform (Genesys/Five9) for dial and contact metrics. CRM opportunity tracking for RPC, pitch, and conversion stages. Real-time data with 15-minute refresh.",
              meaning: "Overall conversion from dials to sales: 4.7% (2,120/45,000). Contact rate of 38% (17,100/45,000) suggests list quality is decent. The biggest drop-off is Contacts\u2192RPC (52%), indicating right-party contact is the main challenge.",
              actions: [
                "Improve list quality and data hygiene to increase contact rate above 40%",
                "Train agents on gatekeeper navigation to improve RPC rate",
                "A/B test pitch scripts to improve the 60% pitch\u2192conversion rate",
                "Consider predictive dialing optimization to improve connect rates"
              ]
            }}
          >
            <FunnelChart stages={conversionFunnel} />
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12, padding: '8px 0', borderTop: `1px solid ${t.border}` }}>
              {conversionFunnel.map((s, i) => i > 0 ? (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: t.textTertiary }}>{conversionFunnel[i - 1].name} to {s.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{Math.round(s.value / conversionFunnel[i - 1].value * 100)}%</div>
                </div>
              ) : null)}
            </div>
          </Widget>

          <Widget
            title="Best Time to Call"
            subtitle="Connect rate (%) by day of week and hour"
            insight={{
              description: "Heatmap showing connect rate percentages by day of week (rows) and hour (columns), identifying optimal calling windows for campaign scheduling.",
              dataSource: "Dialer connect reports aggregated by hour and day of week over the past 90 days. Connect = live answer by a person. Excludes voicemail, busy, and no-answer dispositions.",
              meaning: "Thursday 2PM (40%) is the absolute peak connect time. Mid-afternoon (1-3 PM) on weekdays consistently outperforms mornings. Saturday shows lower but still viable rates. Sunday is significantly lower and may not justify the agent cost.",
              actions: [
                "Concentrate calling resources on Thursday and Tuesday (highest connect days)",
                "Shift calling schedules to emphasize 1-3 PM time slot across all days",
                "Consider eliminating Sunday calling given consistently low 4-18% connect rates",
                "Build time-zone-aware dialing to hit each prospect at their local optimal time"
              ]
            }}
          >
            <Heatmap
              data={bestTimeData}
              rowLabels={dayLabels}
              colLabels={hourLabels}
            />
          </Widget>
        </div>

        {/* Row 3: Agent Conversion + Campaign Revenue */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Agent Conversion Ranking"
            subtitle="Top performers by conversion rate"
            insight={{
              description: "Horizontal bar chart ranking agents by their individual conversion rates, from highest to lowest performing.",
              dataSource: "CRM opportunity tracking linked to agent ID from dialer. Conversion = closed-won deals / total pitched contacts. Minimum 100 contacts required for valid ranking.",
              meaning: "Top performer Jessica Rivera (18.2%) converts nearly 2x the bottom performer Tyler Adams (8.9%). The 9.3 percentage point spread represents significant revenue opportunity if bottom performers can be coached to median level (13.5%).",
              actions: [
                "Shadow and record Jessica Rivera's calls to build training materials",
                "Implement peer coaching between top and bottom quartile agents",
                "Set minimum conversion targets with performance improvement plans below 10%",
                "Analyze whether conversion differences are driven by skill or list assignment"
              ]
            }}
          >
            <HorizontalBar items={themedAgentConversion} maxVal={25} />
          </Widget>

          <Widget
            title="Campaign Revenue"
            subtitle="Revenue vs target by campaign ($K)"
            insight={{
              description: "Grouped bar chart comparing actual campaign revenue against targets, with summary statistics for total performance.",
              dataSource: "CRM revenue tracking by campaign code. Target set during campaign planning phase. Revenue recognized at time of sale confirmation. Excludes pending/provisional orders.",
              meaning: "Upsell Premium ($410K) significantly exceeded target ($400K) while Summer Promo ($320K) underperformed target ($350K). Overall revenue of $1.2M is $20K above aggregate target. New Product campaign at $190K vs $220K target needs attention.",
              actions: [
                "Analyze why Summer Promo underperformed - was it list quality or offer attractiveness?",
                "Double down on Upsell Premium approach which is exceeding targets",
                "Review New Product campaign messaging and offer to improve conversion",
                "Plan Q2 campaigns based on learnings from Q1 performance"
              ]
            }}
            legend={[
              <span key="actual" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[0] }} /> Actual
              </span>,
              <span key="target" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[3] }} /> Target
              </span>,
            ]}
          >
            <BarChart data={[campaignRevenue, campaignTarget]} labels={campaignNames} colors={[t.chart[0], t.chart[3]]} height={200} />
            <div style={{ display: 'flex', gap: 12, marginTop: 12, padding: '8px 12px', background: t.surfaceAlt, borderRadius: 8 }}>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Total Revenue</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>$1.2M</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>vs Target</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.success }}>+$20K</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Best Campaign</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.primary }}>Upsell Premium</div>
              </div>
            </div>
          </Widget>
        </div>

        {/* Row 4: List Penetration + Talk-to-Listen */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Card style={{ padding: 24 }}>
            <SectionTitle subtitle="Progress through each dialing list">List Penetration</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {themedListPenetration.map(list => (
                <div key={list.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: t.textSecondary }}>{list.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{list.current}%</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, background: t.surfaceAlt, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${list.current}%`, borderRadius: 5,
                      background: list.color, transition: 'width 0.6s ease',
                    }} />
                  </div>
                  <div style={{ fontSize: 10, color: t.textTertiary, marginTop: 2 }}>
                    {Math.round(list.current / 100 * 5000).toLocaleString()} / 5,000 records
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Widget
            title="Talk-to-Listen Ratio"
            subtitle="Agent talk percentage (ideal: 40-50%)"
            insight={{
              description: "Horizontal bar chart showing each agent's talk percentage (ideal: 40-50%). Lower = more listening; higher = more talking. Color coded by zone.",
              dataSource: "Speech analytics platform analyzing talk/silence segments in call recordings. Talk% = agent speaking time / (agent speaking + customer speaking). Excludes hold and silence.",
              meaning: "3 agents in the ideal 40-50% range, 2 agents in the 'Monitor' zone (50-55%), and 1 agent (Brian Lee at 60%) in the 'Coach' zone. Higher talk ratio correlates with lower conversion - agents who listen more tend to close more deals.",
              actions: [
                "Coach Brian Lee on active listening techniques to reduce talk ratio below 55%",
                "Share correlation data between listen ratio and conversion with all agents",
                "Implement real-time talk/listen ratio feedback during calls via agent assist",
                "Set a team target of 45% average talk ratio for next month"
              ]
            }}
          >
            <HorizontalBar items={themedTalkListenRatio} maxVal={100} />
            <div style={{ display: 'flex', gap: 16, marginTop: 12, padding: '10px 14px', background: t.surfaceAlt, borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.success }} />
                <span style={{ fontSize: 11, color: t.textSecondary }}>40-50% (Ideal)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.warning }} />
                <span style={{ fontSize: 11, color: t.textSecondary }}>50-55% (Monitor)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.danger }} />
                <span style={{ fontSize: 11, color: t.textSecondary }}>&gt;55% (Coach)</span>
              </div>
            </div>
          </Widget>
        </div>

        {/* Row 5: A/B Test Results */}
        <div style={{ marginBottom: 24 }}>
          <Widget
            title="A/B Test Results"
            subtitle="Script variant performance comparison"
            insight={{
              description: "Grouped bar chart comparing conversion rate and CSAT score across four script variants, with winner callout and statistical significance data.",
              dataSource: "Controlled A/B test with random assignment of script variants to outbound contacts. Equal sample sizes per variant. 14-day test duration for statistical validity.",
              meaning: "Script B wins with 14.8% conversion (+19% vs control Script A) and highest CSAT (4.1). Statistical significance (p<0.01) confirms this is not random variation. Script C performed worst on both metrics and should be retired.",
              actions: [
                "Roll out Script B as the new default script for all agents immediately",
                "Retire Script C which underperforms on both conversion and CSAT",
                "Design next A/B test with Script B as control and two new variations",
                "Analyze Script B's specific language elements that drive higher conversion"
              ]
            }}
            legend={[
              <span key="conv" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[0] }} /> Conversion %
              </span>,
              <span key="csat" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[2] }} /> CSAT (x100)
              </span>,
            ]}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
              <BarChart data={[abConversion, abCSAT.map(v => v * 100 / 5)]} labels={abTestLabels} colors={[t.chart[0], t.chart[2]]} height={180} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ padding: '12px 16px', background: t.successLight, borderRadius: 8, borderLeft: `3px solid ${t.success}` }}>
                  <div style={{ fontSize: 11, color: t.textTertiary }}>Winner</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Script B</div>
                  <div style={{ fontSize: 11, color: t.success }}>+19% vs control (Script A)</div>
                </div>
                <div style={{ padding: '12px 16px', background: t.surfaceAlt, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: t.textTertiary }}>Sample Size</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>11,250 / variant</div>
                </div>
                <div style={{ padding: '12px 16px', background: t.surfaceAlt, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: t.textTertiary }}>Statistical Significance</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: t.success }}>p &lt; 0.01</div>
                </div>
                <div style={{ padding: '12px 16px', background: t.surfaceAlt, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: t.textTertiary }}>Test Duration</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>14 days</div>
                </div>
              </div>
            </div>
          </Widget>
        </div>

        {/* Row 6: Dialer Performance Combo */}
        <Widget
          title="Dialer Performance"
          subtitle="Monthly dial volume and connect rate trend"
          insight={{
            description: "Combo chart showing monthly dial volume (bars) and connect rate percentage (line) for the predictive dialer system over 12 months.",
            dataSource: "Outbound dialer platform reports. Dial Volume = total call attempts. Connect Rate = live answers / total dials \u00d7 100. Predictive Dial Ratio = simultaneous dials per available agent.",
            meaning: "Dial volume increasing from 38K to 45K/month (+18%) while connect rate improving from 48% to 52% shows the dialer is becoming more efficient. Predictive ratio of 2.4:1 is optimal - higher would risk abandoned dials. 1.8% dialer abandon is well below the 3% regulatory limit.",
            actions: [
              "Maintain current predictive ratio of 2.4:1 which balances efficiency and compliance",
              "Monitor dialer abandon rate closely - must stay below 3% for TCPA compliance",
              "Optimize dial times using best-time-to-call data to further improve connect rate",
              "Target 55% connect rate by improving list quality and DNC scrubbing"
            ]
          }}
          legend={[
            <span key="dials" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[0] }} /> Dials
            </span>,
            <span key="connect" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
              <span style={{ width: 8, height: 3, borderRadius: 1, background: t.chart[4] }} /> Connect Rate %
            </span>,
          ]}
        >
          <ComboChart
            barData={dialerMonthly}
            lineData={connectRateMonthly}
            labels={months}
            barColor={t.chart[0]}
            lineColor={t.chart[4]}
            barLabel="Dial Volume"
            lineLabel="Connect Rate %"
            height={200}
          />
          <div style={{ display: 'flex', gap: 24, marginTop: 12, padding: '10px 14px', background: t.surfaceAlt, borderRadius: 8 }}>
            <div>
              <div style={{ fontSize: 10, color: t.textTertiary }}>Total Dials (YTD)</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>506.5K</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.textTertiary }}>Avg Connect Rate</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>50.7%</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.textTertiary }}>Predictive Dial Ratio</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.primary }}>2.4:1</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.textTertiary }}>Abandon (Dialer)</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.success }}>1.8%</div>
            </div>
          </div>
        </Widget>

        {/* Row 7: Callback Scheduling */}
        <div style={{ marginTop: 24 }}>
          <Widget title="Callback Scheduling & Completion" subtitle="Daily scheduled vs completed callbacks with completion rate"
            insight={{
              description: "Stacked bar chart showing daily callback volumes broken into completed and missed callbacks, with overall completion metrics.",
              dataSource: "Dialer callback queue and CRM appointment scheduler. Scheduled = callbacks booked by agents or requested by customers. Completed = successful reconnection within the scheduled window.",
              meaning: "81% callback completion rate (335/415) is below the 90% target. Tuesday has the best completion rate (83%) while Friday is lowest (81%). The 80 missed callbacks represent lost revenue opportunities and damaged customer expectations.",
              actions: [
                "Implement automated callback reminders to agents 15 minutes before scheduled time",
                "Investigate why Friday has the lowest completion - end-of-week fatigue or scheduling?",
                "Add callback completion to agent scorecards as a KPI",
                "Target 90% callback completion rate by end of next month"
              ]
            }}
            legend={themedCallbackSegments.map(s => (
              <span key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} /> {s.name}
              </span>
            ))}
          >
            <StackedBarChart categories={callbackDays} segments={themedCallbackSegments} data={callbackData} height={200} />
            <div style={{ display: 'flex', gap: 24, marginTop: 12, padding: '10px 14px', background: t.surfaceAlt, borderRadius: 8 }}>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Total Scheduled</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>415</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Completed</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.success }}>335 (81%)</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Missed</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.danger }}>80 (19%)</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: t.textTertiary }}>Best Day</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.primary }}>Tuesday</div>
              </div>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}
