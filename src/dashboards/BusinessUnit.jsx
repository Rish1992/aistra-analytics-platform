import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import {
  Card, KPICard, Widget, DataTable, Badge, SectionTitle, GaugeKPICard, StatCard, ProgressCard
} from '../components/UI';
import {
  GaugeChart, ComboChart, HorizontalBar, MultiLineChart, AreaChart, BarChart, DonutChart, Sparkline
} from '../components/Charts';

// ─── BU OPTIONS ───
const buOptions = [
  'TechConnect', 'Premier Healthcare', 'FinServ Global', 'RetailMax', 'AutoDirect'
];

// ─── MOCK DATA ───
const volumeLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const volumeMonthly = [12400, 13200, 12800, 14100, 13500, 14800, 15200, 14600, 13900, 14200, 15100, 14800];
const ahtMonthly = [312, 308, 315, 305, 310, 302, 298, 305, 310, 307, 300, 312];

const topReasons = [
  { label: 'Billing Inquiry', value: 2840, suffix: '' },
  { label: 'Technical Support', value: 2310, suffix: '' },
  { label: 'Account Changes', value: 1890, suffix: '' },
  { label: 'Service Outage', value: 1420, suffix: '' },
  { label: 'New Order', value: 1180, suffix: '' },
  { label: 'Cancellation', value: 960, suffix: '' },
  { label: 'Refund Request', value: 840, suffix: '' },
  { label: 'Password Reset', value: 720, suffix: '' },
];

const agentRoster = [
  { name: 'Sarah Mitchell', aht: '4:48', csat: 4.5, qa: 92, adherence: 96, status: 'success', calls: 142, fcr: '88%' },
  { name: 'James Chen', aht: '5:02', csat: 4.3, qa: 89, adherence: 94, status: 'success', calls: 138, fcr: '85%' },
  { name: 'Maria Garcia', aht: '4:35', csat: 4.7, qa: 95, adherence: 98, status: 'success', calls: 151, fcr: '91%' },
  { name: 'David Kim', aht: '5:45', csat: 3.8, qa: 78, adherence: 88, status: 'warning', calls: 118, fcr: '72%' },
  { name: 'Emily Brown', aht: '4:52', csat: 4.4, qa: 91, adherence: 95, status: 'success', calls: 145, fcr: '87%' },
  { name: 'Michael Johnson', aht: '6:10', csat: 3.5, qa: 72, adherence: 82, status: 'danger', calls: 105, fcr: '68%' },
  { name: 'Lisa Wong', aht: '4:40', csat: 4.6, qa: 93, adherence: 97, status: 'success', calls: 148, fcr: '89%' },
  { name: 'Robert Taylor', aht: '5:18', csat: 4.0, qa: 84, adherence: 91, status: 'warning', calls: 128, fcr: '79%' },
  { name: 'Anna Petrov', aht: '4:55', csat: 4.2, qa: 88, adherence: 93, status: 'success', calls: 136, fcr: '83%' },
  { name: 'Chris Nguyen', aht: '5:30', csat: 3.9, qa: 81, adherence: 87, status: 'warning', calls: 122, fcr: '76%' },
];

const csatTrend = [4.1, 4.0, 4.2, 4.1, 4.3, 4.2, 4.4, 4.3, 4.4, 4.5, 4.4, 4.5];

const qaPassData = [82, 84, 83, 85, 86, 88, 87, 89, 88, 90, 89, 91];
const qaThresholdVal = 85;

const billingRows = [
  { month: 'Jan 2026', volume: '12,400', billable: '$186,000', adjustments: '-$4,200', net: '$181,800' },
  { month: 'Feb 2026', volume: '13,200', billable: '$198,000', adjustments: '-$3,800', net: '$194,200' },
  { month: 'Mar 2026', volume: '14,800', billable: '$222,000', adjustments: '-$5,100', net: '$216,900' },
  { month: 'Apr 2026', volume: '14,100', billable: '$211,500', adjustments: '-$4,500', net: '$207,000' },
  { month: 'May 2026', volume: '13,500', billable: '$202,500', adjustments: '-$3,200', net: '$199,300' },
];

const botStats = { containment: 42, csat: 3.8, volume: 6240, topIntent: 'Billing Inquiry' };

export default function BusinessUnit() {
  const { t } = useTheme();
  const [selectedBU, setSelectedBU] = useState('TechConnect');

  const themedTopReasons = topReasons.map((r, i) => ({ ...r, color: t.chart[i % t.chart.length] }));
  const qaPassSeries = [{ name: 'Pass Rate', color: t.success, data: qaPassData }];
  const qaThreshold = [{ value: qaThresholdVal, label: 'Target 85%', color: t.danger }];

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }}>
      <DashboardHeader
        title="Business Unit Dashboard"
        subtitle={`Performance overview for ${selectedBU}`}
        actions={
          <select
            value={selectedBU}
            onChange={e => setSelectedBU(e.target.value)}
            style={{
              padding: '8px 16px', borderRadius: 8, border: `1px solid ${t.border}`,
              background: t.surface, color: t.text, fontSize: 13, cursor: 'pointer', outline: 'none',
            }}
          >
            {buOptions.map(bu => <option key={bu} value={bu}>{bu}</option>)}
          </select>
        }
      />

      <div style={{ padding: 32 }}>
        {/* SLA Multi-Gauge Row */}
        <SectionTitle subtitle="Real-time service level indicators">SLA Performance</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
          <Card style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>Service Level</div>
            <GaugeChart value={87} min={0} max={100} label="Target: 80%" size={160} />
          </Card>
          <Card style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>ASA (seconds)</div>
            <GaugeChart value={18} min={0} max={60} label="Target: <20s" size={160}
              zones={[
                { from: 0, to: 20, color: t.success },
                { from: 20, to: 40, color: t.warning },
                { from: 40, to: 60, color: t.danger },
              ]}
            />
          </Card>
          <Card style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>Abandon Rate</div>
            <GaugeChart value={3.8} min={0} max={15} label="Target: <5%" size={160}
              zones={[
                { from: 0, to: 5, color: t.success },
                { from: 5, to: 10, color: t.warning },
                { from: 10, to: 15, color: t.danger },
              ]}
            />
          </Card>
          <Card style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>AHT</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: t.text, margin: '16px 0 4px' }}>5:12</div>
            <div style={{ fontSize: 11, color: t.textTertiary }}>Target: 5:00</div>
            <Badge variant="warning">+12s above target</Badge>
          </Card>
        </div>

        {/* Row 2: Volume & AHT Combo + Top Contact Reasons */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 24 }}>
          <Widget
            title="Volume & AHT Trend"
            subtitle="Monthly contact volume with average handle time"
            insight={{
              description: "Combo chart overlaying monthly contact volume (bars) with average handle time in seconds (line) for the selected business unit across a 12-month period.",
              dataSource: "Monthly aggregated ACD data for this BU. Volume = total inbound contacts handled. AHT = average of all completed call durations (Talk + Hold + ACW) in seconds. Data sourced from call detail records grouped by BU assignment.",
              meaning: "Volume has been trending upward from 12,400 (Jan) to 14,800 (Dec), a 19% increase over the year. AHT has remained relatively stable (298-315 seconds), suggesting the team is absorbing volume growth without sacrificing efficiency. The slight inverse relationship in mid-year (volume up, AHT down) indicates improved processes. However, December's AHT uptick to 312s alongside peak volume (14,800) may signal agent fatigue or increased complexity during end-of-year contacts.",
              actions: [
                "Plan staffing increases to accommodate the upward volume trend - forecast 16,000+ for next quarter",
                "Investigate the mid-year AHT improvement (298s in July) to identify and replicate best practices",
                "Monitor December AHT increase - determine if it is seasonal complexity or a new trend",
                "Compare this BU's volume growth rate against other BUs to assess relative demand shifts"
              ]
            }}
            legend={[
              <span key="vol" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[0] }} /> Volume
              </span>,
              <span key="aht" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: t.textSecondary }}>
                <span style={{ width: 8, height: 3, borderRadius: 1, background: t.chart[4] }} /> AHT (sec)
              </span>,
            ]}
          >
            <ComboChart
              barData={volumeMonthly}
              lineData={ahtMonthly}
              labels={volumeLabels}
              barColor={t.chart[0]}
              lineColor={t.chart[4]}
              barLabel="Volume"
              lineLabel="AHT (sec)"
              height={220}
            />
          </Widget>

          <Widget title="Top Contact Reasons" subtitle="Current month breakdown"
            insight={{
              description: "Horizontal bar chart ranking the top 8 contact reasons by volume for the current month, showing the distribution of why customers are calling this business unit.",
              dataSource: "CRM disposition codes and IVR selection data aggregated monthly. Each call is tagged with a primary contact reason at disposition. Categories standardized across all BUs for comparison.",
              meaning: "Billing Inquiry dominates at 2,840 contacts (23.4% of total), followed by Technical Support at 2,310 (19.1%). Together, the top 3 reasons (Billing, Tech Support, Account Changes) account for 58% of all contacts. Notably, Password Reset (720) and Refund Request (840) are high-volume, low-complexity call types that are prime candidates for self-service deflection. Cancellation at 960 contacts is a revenue risk requiring immediate retention focus.",
              actions: [
                "Deploy IVR self-service for Password Reset and Billing Inquiry (balance checks) to deflect 20%+ volume",
                "Create a dedicated retention queue with trained agents for Cancellation calls (960/month revenue at risk)",
                "Analyze Technical Support reasons to identify product issues driving repeat contacts",
                "Compare contact reason distribution with other BUs to identify BU-specific vs systemic patterns"
              ]
            }}>
            <HorizontalBar items={themedTopReasons} />
          </Widget>
        </div>

        {/* Row 3: Agent Roster Table */}
        <div style={{ marginBottom: 24 }}>
          <DataTable
            title="Agent Roster"
            columns={[
              { key: 'name', label: 'Agent Name' },
              { key: 'status', label: 'Status', align: 'center', render: (val) => (
                <Badge variant={val}>{val === 'success' ? 'On Track' : val === 'warning' ? 'At Risk' : 'Below'}</Badge>
              )},
              { key: 'calls', label: 'Contacts', align: 'center' },
              { key: 'aht', label: 'AHT', align: 'center' },
              { key: 'csat', label: 'CSAT', align: 'center', render: (val) => (
                <span style={{ fontWeight: 600, color: val >= 4.2 ? t.success : val >= 3.8 ? t.warning : t.danger }}>{val}</span>
              )},
              { key: 'qa', label: 'QA Score', align: 'center', render: (val) => (
                <span style={{ fontWeight: 600, color: val >= 85 ? t.success : val >= 75 ? t.warning : t.danger }}>{val}%</span>
              )},
              { key: 'adherence', label: 'Adherence', align: 'center', render: (val) => <span>{val}%</span> },
              { key: 'fcr', label: 'FCR', align: 'center' },
            ]}
            rows={agentRoster}
            pageSize={5}
          />
        </div>

        {/* Row 4: CSAT Gauge + QA Pass Rate */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 24 }}>
          <Widget title="CSAT Overview" subtitle="Customer satisfaction score"
            insight={{
              description: "Donut gauge showing current CSAT score (4.5/5.0 = 90th percentile) with a 12-month sparkline trend showing improvement trajectory.",
              dataSource: "Post-call survey responses (IVR or email) for this BU. Response rate approximately 15-20% of handled calls. Score = average of 1-5 Likert scale ratings. Minimum 500 responses per month for statistical significance.",
              meaning: "4.5/5.0 CSAT is excellent and represents a steady improvement from 4.1 at the start of the year. The upward trend has been consistent with no reversals, indicating sustained quality improvement. This BU is outperforming the typical industry benchmark of 4.0-4.2. The 90% donut fill provides a strong visual of near-ceiling performance.",
              actions: [
                "Identify the specific agent behaviors and processes driving the CSAT improvement for cross-BU sharing",
                "Analyze the 10% non-satisfied responses to find remaining improvement opportunities",
                "Implement verbatim analysis on low-scoring surveys to pinpoint specific friction points",
                "Set stretch target of 4.6 for next quarter while monitoring for response bias"
              ]
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <DonutChart value={90} size={140} strokeWidth={14} color={t.success} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: t.text, textAlign: 'center', lineHeight: 1 }}>4.5</div>
                  <div style={{ fontSize: 10, color: t.textTertiary, textAlign: 'center' }}>/5.0</div>
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <div style={{ fontSize: 11, color: t.textTertiary, marginBottom: 4 }}>12-month trend</div>
                <Sparkline data={csatTrend} color={t.success} width={220} height={40} />
              </div>
            </div>
          </Widget>

          <Widget title="QA Pass Rate" subtitle="Monthly pass rate with minimum threshold"
            insight={{
              description: "Line chart showing monthly QA evaluation pass rate over 12 months with a red benchmark line at the 85% minimum threshold target.",
              dataSource: "QA evaluation database for this BU. Pass rate = evaluations scoring 85+ / total evaluations x 100. Minimum 50 evaluations per month. Evaluated by calibrated QA analysts using Standard QA Form v3.2.",
              meaning: "QA pass rate has improved from 82% (Jan, below threshold) to 91% (Dec, well above). The BU crossed the 85% threshold in April and has stayed above since, indicating successful and sustained quality improvement. The improvement rate of approximately 0.75 points/month suggests strong coaching programs. Current 91% provides a healthy 6-point buffer above the minimum.",
              actions: [
                "Recognize the QA improvement achievement - the team went from below threshold to 91% in one year",
                "Shift focus from pass rate to score distribution - target reducing low outliers",
                "Raise the BU target to 88% pass rate given consistent performance above 85%",
                "Implement peer QA calibration sessions to maintain scoring consistency and reduce evaluator variance"
              ]
            }}>
            <MultiLineChart
              series={qaPassSeries}
              labels={volumeLabels}
              height={180}
              benchmarkLines={qaThreshold}
            />
          </Widget>
        </div>

        {/* Row 5: Billing Summary Table */}
        <div style={{ marginBottom: 24 }}>
          <DataTable
            title="Monthly Billing Summary"
            columns={[
              { key: 'month', label: 'Month' },
              { key: 'volume', label: 'Volume', align: 'center' },
              { key: 'billable', label: 'Billable Amount', align: 'right' },
              { key: 'adjustments', label: 'Adjustments', align: 'right', render: (val) => (
                <span style={{ color: t.danger }}>{val}</span>
              )},
              { key: 'net', label: 'Net Amount', align: 'right', render: (val) => (
                <span style={{ fontWeight: 700 }}>{val}</span>
              )},
            ]}
            rows={billingRows}
            pageSize={5}
          />
        </div>

        {/* Row 6: Bot Performance Mini Section */}
        <SectionTitle subtitle="AI bot metrics for this business unit">Bot Performance</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          <StatCard label="Bot Containment" value={`${botStats.containment}%`} color={t.primary} />
          <StatCard label="Bot CSAT" value={`${botStats.csat}/5`} color={t.success} />
          <StatCard label="Bot Volume" value={botStats.volume.toLocaleString()} color={t.accent1} />
          <StatCard label="Top Bot Intent" value={botStats.topIntent} color={t.info} size="sm" />
        </div>
      </div>
    </div>
  );
}
