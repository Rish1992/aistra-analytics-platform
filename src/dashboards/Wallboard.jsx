import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AgentTile, LiveCounter, Badge, Widget } from '../components/UI';
import { GaugeChart, DonutChart, Sparkline } from '../components/Charts';

// ─── INLINE MOCK DATA ───
const agents = [
  { name: 'Sarah Chen', state: 'On Call', duration: '4:23' },
  { name: 'Mike Torres', state: 'Available', duration: '0:12' },
  { name: 'Priya Patel', state: 'On Call', duration: '7:15' },
  { name: 'James Wilson', state: 'Wrap', duration: '1:45' },
  { name: 'Emma Davis', state: 'On Call', duration: '3:08' },
  { name: 'Carlos Ruiz', state: 'Break', duration: '8:30' },
  { name: 'Lin Zhang', state: 'On Call', duration: '11:22' },
  { name: 'Anna Kowal', state: 'Available', duration: '0:45' },
  { name: 'David Kim', state: 'On Call', duration: '2:56' },
  { name: 'Rachel Moore', state: 'Wrap', duration: '0:38' },
  { name: 'Tom Baker', state: 'On Call', duration: '6:01' },
  { name: 'Fatima Al-H', state: 'Available', duration: '1:10' },
  { name: 'Chris Lee', state: 'On Call', duration: '8:44' },
  { name: 'Sophia Lam', state: 'Break', duration: '12:15' },
  { name: 'Ryan Shah', state: 'On Call', duration: '1:33' },
  { name: 'Olivia Wu', state: 'Wrap', duration: '2:10' },
  { name: 'Derek Jones', state: 'On Call', duration: '5:47' },
  { name: 'Maria Garcia', state: 'Available', duration: '0:22' },
  { name: 'Kevin Brown', state: 'On Call', duration: '9:30' },
  { name: 'Aisha Nkomo', state: 'On Call', duration: '3:55' },
  { name: 'Paul Martin', state: 'Offline', duration: '' },
  { name: 'Jenny Tran', state: 'On Call', duration: '4:12' },
  { name: 'Alex Reed', state: 'Available', duration: '0:08' },
  { name: 'Nina Volkov', state: 'On Call', duration: '6:38' },
];

const slHistory = [84, 85, 86, 87, 85, 84, 86, 87, 88, 86, 85, 87, 86, 87, 86.5];
const abandonHistory = [5.2, 4.8, 4.5, 4.2, 4.0, 4.3, 4.5, 4.1, 3.8, 4.0, 4.2, 4.1, 4.3, 4.2, 4.2];
const ahtHistory = [5.4, 5.3, 5.5, 5.6, 5.4, 5.3, 5.5, 5.4, 5.3, 5.5, 5.6, 5.5, 5.4, 5.3, 5.5];

// ─── COMPONENT ───
export default function Wallboard() {
  const { t: themeTokens, theme } = useTheme();
  const [tick, setTick] = useState(0);

  // Dark theme override for wallboard (enhanced dark for TV display)
  const darkWallboard = {
    bg: '#0A0C10',
    surface: '#12151C',
    surfaceAlt: '#1A1E28',
    border: '#252A36',
    text: '#E8EAF0',
    textSecondary: '#9BA1B0',
    textTertiary: '#636A7C',
    primary: '#4F8BFF',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    info: '#22D3EE',
    chart: ['#4F8BFF', '#A78BFA', '#34D399', '#F472B6', '#FBBF24', '#22D3EE', '#F87171', '#818CF8'],
    primaryLight: 'rgba(79,139,255,0.12)',
    successLight: 'rgba(52,211,153,0.12)',
    warningLight: 'rgba(251,191,36,0.12)',
    dangerLight: 'rgba(248,113,113,0.12)',
    surfaceHover: '#252A36',
    borderSubtle: '#222731',
    shadow: '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
  };
  // Light wallboard with enhanced contrast for visibility
  const lightWallboard = {
    ...themeTokens,
    bg: '#F0F2F5',
    surface: '#FFFFFF',
    surfaceAlt: '#F6F7F9',
    shadow: '0 2px 8px rgba(0,0,0,0.08)',
  };
  const t = theme === 'dark' ? darkWallboard : lightWallboard;

  // Simulate auto-refresh tick
  useEffect(() => {
    const interval = setInterval(() => setTick(prev => prev + 1), 15000);
    return () => clearInterval(interval);
  }, []);

  const stateCounts = agents.reduce((acc, a) => {
    const key = a.state.toLowerCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const currentSL = 86.5;
  const slColor = currentSL >= 85 ? t.success : currentSL >= 75 ? t.warning : t.danger;

  return (
    <div style={{
      background: t.bg, minHeight: '100vh', color: t.text, fontFamily: 'DM Sans, sans-serif',
      padding: 24, display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      {/* Back to Home */}
      <button onClick={() => window.location.href = '/'}
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 100,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 10,
          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : t.border}`,
          background: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
          color: t.text, fontSize: 13, fontWeight: 500,
          cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)'; }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Dashboard
      </button>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #4F8BFF, #A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="8" width="3" height="7" rx="1" fill="white" /><rect x="6" y="4" width="3" height="11" rx="1" fill="white" /><rect x="11" y="1" width="3" height="14" rx="1" fill="white" /></svg>
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>Real-Time Wallboard</h1>
            <p style={{ fontSize: 12, color: t.textTertiary, margin: 0 }}>Contact Center Operations</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.success, boxShadow: `0 0 8px ${t.success}`, animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, color: t.success, fontWeight: 500 }}>LIVE</span>
          </div>
          <span style={{ fontSize: 12, color: t.textTertiary }}>Auto-refresh: 15s</span>
          <span style={{ fontSize: 13, color: t.textSecondary, fontWeight: 500 }}>
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Top Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 1fr 1fr 1fr 1fr', gap: 16 }}>
        {/* Large SL Gauge */}
        <Widget title="Service Level" subtitle="Real-time SLA gauge"
          insight={{
            description: "Real-time gauge showing current service level percentage (calls answered within threshold) with a 15-interval sparkline trend. Color zones: green (85-100%), yellow (70-85%), red (0-70%).",
            dataSource: "Live ACD feed calculating calls answered within 20 seconds / total calls offered. Updated every 15 seconds. Sparkline shows last 15 rolling intervals (approximately 3.75 minutes of history).",
            meaning: "Current SL at 86.5% is just above the 85% target, indicating the center is meeting SLA but with minimal buffer. The sparkline shows fluctuation between 84-88%, suggesting the center is consistently operating near the threshold with risk of dipping below during volume spikes.",
            actions: [
              "Monitor closely - only 1.5% buffer above target means any spike could breach SLA",
              "Consider moving agents from low-volume queues to support SL maintenance",
              "Alert supervisors if SL drops below 85% for two consecutive intervals",
              "Review staffing model if SL consistently hovers near threshold"
            ]
          }}
          style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gridRow: 'span 1' }}>
          <GaugeChart value={currentSL} min={0} max={100} size={200} label="Target: 85%" zones={[
            { from: 0, to: 70, color: t.danger },
            { from: 70, to: 85, color: t.warning },
            { from: 85, to: 100, color: t.success },
          ]} />
          <div style={{ marginTop: 8 }}>
            <Sparkline data={slHistory} color={slColor} width={160} height={30} />
          </div>
        </Widget>

        {/* Calls Waiting */}
        <Widget title="Calls Waiting" subtitle="Queue depth"
          insight={{
            description: "Real-time count of callers currently waiting in all queues combined. Badge shows the rate of change over the last 5 minutes.",
            dataSource: "Live ACD queue statistics feed. Count = total calls in queue across all skill groups. Rate of change calculated by comparing current count to count 5 minutes ago.",
            meaning: "7 calls waiting with +2 trend in 5 minutes indicates queue is building. This upward trend suggests either a volume spike or insufficient agent availability. At current levels, wait times will continue to increase unless agent supply is adjusted.",
            actions: [
              "Move available agents from low-volume queues to high-wait queues immediately",
              "Recall agents from extended breaks if queue exceeds 10 calls",
              "Activate overflow routing to backup team if trend continues upward",
              "Check if there is a system issue or marketing campaign driving unexpected volume"
            ]
          }}
          style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: t.warning, letterSpacing: -2, lineHeight: 1, margin: '8px 0' }}>7</div>
          <Badge variant="warning">+2 in 5 min</Badge>
        </Widget>

        {/* Longest Wait */}
        <Widget title="Longest Wait" subtitle="Max queue time"
          insight={{
            description: "Real-time display of the single longest-waiting caller currently in queue, showing elapsed wait time and the queue they are waiting in.",
            dataSource: "Live ACD queue feed tracking individual call wait times. Updates every refresh cycle (15 seconds). Shows the maximum wait time across all active queues.",
            meaning: "2:14 longest wait in Tech Support is a red alert. This caller has been waiting well beyond acceptable thresholds. Tech Support queue is the bottleneck, likely due to higher complexity calls tying up agents and fewer available agents in this skill group.",
            actions: [
              "Immediately route the longest-waiting caller to the next available agent regardless of skill",
              "Assign multi-skilled agents to Tech Support queue temporarily",
              "Have a supervisor offer a callback option to callers waiting over 2 minutes",
              "Investigate Tech Support staffing levels vs current demand"
            ]
          }}
          style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: t.danger, letterSpacing: -2, lineHeight: 1, margin: '8px 0' }}>2:14</div>
          <Badge variant="danger">Tech Support</Badge>
        </Widget>

        {/* Rolling Abandon Rate */}
        <Widget title="Abandon Rate" subtitle="Rolling 30 min"
          insight={{
            description: "Rolling 30-minute abandon rate with sparkline trend. Abandon = callers who disconnected before reaching an agent. Sparkline shows 15 data points of recent history.",
            dataSource: "Live ACD abandoned call events. Calculated as abandoned calls / total calls offered over a rolling 30-minute window. Excludes short abandons (<5 seconds) per industry standard.",
            meaning: "4.2% abandon rate is within the 5% target but the sparkline shows it peaked at 5.2% recently and has been volatile. The downward trend from the peak is positive, but sustained levels above 4% suggest customers are experiencing wait times that test their patience.",
            actions: [
              "Investigate the time periods where abandon rate spiked above 5% - correlate with staffing gaps",
              "Implement a callback-in-queue option to reduce abandons during high-volume periods",
              "Set a real-time alert at 4.5% abandon rate to trigger proactive queue management",
              "Review IVR messaging to set better wait time expectations and reduce premature abandons"
            ]
          }}
          style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: t.text, letterSpacing: -2, lineHeight: 1, margin: '8px 0' }}>4.2%</div>
          <Sparkline data={abandonHistory} color={t.danger} width={120} height={24} />
        </Widget>

        {/* Rolling AHT */}
        <Widget title="Avg Handle Time" subtitle="Target: 5:00"
          insight={{
            description: "Rolling average handle time across all agents and queues, with sparkline showing recent trend. AHT = Talk Time + Hold Time + After-Call Work.",
            dataSource: "Live ACD call completion records. Calculated as a rolling average of all completed calls in the current shift. Sparkline shows 15 intervals of AHT trend data.",
            meaning: "5:32 AHT is 32 seconds (10.7%) above the 5:00 target. The sparkline shows AHT has been consistently above target, oscillating between 5:18 and 5:36. This persistent elevation suggests a systemic issue rather than individual agent variance - possibly increased call complexity or tool/system slowness.",
            actions: [
              "Identify which queues or call types are driving AHT above target",
              "Check for system performance issues that may be slowing agent workflows",
              "Review wrap-up time component - agents may need streamlined after-call disposition tools",
              "Consider whether the 5:00 target is realistic given current call mix complexity"
            ]
          }}
          style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: t.text, letterSpacing: -2, lineHeight: 1, margin: '8px 0' }}>5:32</div>
          <Sparkline data={ahtHistory} color={t.primary} width={120} height={24} />
        </Widget>

        {/* Calls Handled Today */}
        <Widget title="Handled Today" subtitle="vs forecast"
          insight={{
            description: "Cumulative count of calls handled today with a progress bar showing attainment against the daily forecast of 3,200 calls.",
            dataSource: "Live ACD completed call count for the current business day (midnight reset). Forecast from WFM planning model based on historical patterns, day-of-week, and known events.",
            meaning: "2,847 handled = 89% of forecast. Tracking well for time of day. If the center is past the typical peak period, this pace should comfortably hit or exceed the 3,200 forecast. If still in the early/mid shift, the team is ahead of pace which may indicate higher-than-expected volume.",
            actions: [
              "Compare current pace to expected pace for this time of day (not just total forecast)",
              "If ahead of forecast, consider releasing overtime agents early to save costs",
              "If behind forecast despite volume, investigate if long AHT is reducing throughput",
              "Update WFM intraday forecast if actual volume deviates more than 10% from plan"
            ]
          }}
          style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: t.primary, letterSpacing: -2, lineHeight: 1, margin: '8px 0' }}>2,847</div>
          <div style={{ fontSize: 10, color: t.textTertiary }}>Forecast: 3,200</div>
          <div style={{ width: 100, height: 4, borderRadius: 2, background: t.surfaceAlt, marginTop: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '89%', borderRadius: 2, background: t.primary }} />
          </div>
        </Widget>
      </div>

      {/* Live Counters Row */}
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', padding: '8px 0' }}>
        <LiveCounter value={stateCounts['on call'] || 0} label="On Call" color={t.primary} />
        <LiveCounter value={stateCounts['available'] || 0} label="Available" color={t.success} />
        <LiveCounter value={stateCounts['wrap'] || 0} label="Wrap-up" color={t.warning} />
        <LiveCounter value={stateCounts['break'] || 0} label="On Break" color={t.textTertiary} />
        <LiveCounter value={stateCounts['offline'] || 0} label="Offline" color={t.danger} />
        <LiveCounter value={agents.length} label="Total Logged In" color={t.info} />
      </div>

      {/* Agent Tiles Grid */}
      <Widget title="Agent Status Board" subtitle="Real-time agent state monitoring"
        insight={{
          description: "Real-time grid of all logged-in agents showing their current state (On Call, Available, Wrap, Break, Offline) and time in current state. Color-coded tiles for instant visual recognition.",
          dataSource: "Live ACD agent state feed updated every 15 seconds. States pulled from the ACD real-time data stream. Duration = time elapsed since agent entered current state.",
          meaning: "Of 24 agents, 12 are On Call (50%), 5 Available (21%), 3 in Wrap (12.5%), 2 on Break (8.3%), 1 Offline (4.2%). The 50% on-call rate with 7 calls waiting suggests more agents need to become available. Lin Zhang (11:22 On Call) and Kevin Brown (9:30 On Call) have extended call durations that may indicate complex issues or stuck calls. Sophia Lam has been on break for 12:15 which exceeds standard break duration.",
          actions: [
            "Check on Lin Zhang and Kevin Brown - calls over 9 minutes may need supervisor assist",
            "Follow up on Sophia Lam's extended break (12:15) - may need attendance intervention",
            "With only 5 agents available and 7 calls waiting, request wrap-up agents to expedite",
            "Consider pulling Paul Martin (Offline) back online if shift has not ended"
          ]
        }}
        legend={[
          { label: 'On Call', color: t.primary },
          { label: 'Available', color: t.success },
          { label: 'Wrap', color: t.warning },
          { label: 'Break', color: t.textTertiary },
          { label: 'Offline', color: t.danger },
        ].map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: t.textTertiary }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />{item.label}
          </span>
        ))}
        style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
          {agents.map((agent, i) => (
            <AgentTile key={i} name={agent.name} state={agent.state} duration={agent.duration} />
          ))}
        </div>
      </Widget>

      {/* Bottom Row: Queue Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { queue: 'General', waiting: 2, sl: 88, aht: '4:45', agents: 32,
            insight: {
              description: "Real-time snapshot of the General queue showing calls waiting, current service level, and average handle time. Progress bar visualizes SL attainment.",
              dataSource: "Live ACD queue statistics for the General skill group. SL = calls answered within 20 seconds / total offered. AHT = rolling average for calls completed in this queue today.",
              meaning: "General queue is healthy: 88% SL exceeds 85% target, only 2 calls waiting, and 4:45 AHT is below the 5:00 target. With 32 agents staffed, this queue has the best agent-to-demand ratio. This is the model queue for current operations.",
              actions: [
                "Consider temporarily reallocating 2-3 General agents to Tech Support which is struggling",
                "Maintain current staffing levels as a baseline for this queue",
                "Monitor for volume spikes that could quickly consume the SL buffer",
                "Use this queue's performance as a benchmark for other queues"
              ]
            }
          },
          { queue: 'Tech Support', waiting: 3, sl: 78, aht: '7:12', agents: 18,
            insight: {
              description: "Real-time snapshot of Tech Support queue showing calls waiting, current service level, and average handle time. This queue has the longest wait and lowest SL.",
              dataSource: "Live ACD queue statistics for the Tech Support skill group. Higher AHT expected due to technical troubleshooting complexity.",
              meaning: "Tech Support is the most stressed queue: 78% SL is below the 85% target, 3 calls waiting (highest of all queues), and 7:12 AHT is significantly higher than other queues. With only 18 agents for complex calls, this queue is understaffed relative to demand. This is where the 2:14 longest wait is occurring.",
              actions: [
                "Immediately route overflow Tech Support calls to multi-skilled agents from General",
                "Deploy Tier 2 support or SMEs to handle complex calls reducing AHT",
                "Implement a callback option specifically for Tech Support to reduce abandon risk",
                "Review if recent product issues or outages are driving increased technical call volume"
              ]
            }
          },
          { queue: 'Billing', waiting: 1, sl: 85, aht: '5:20', agents: 24,
            insight: {
              description: "Real-time snapshot of the Billing queue showing calls waiting, service level, and average handle time. Currently at the exact SL target threshold.",
              dataSource: "Live ACD queue statistics for the Billing skill group. Includes all billing-related call types: payment, disputes, account balance, and plan changes.",
              meaning: "Billing is right at the 85% SL threshold with 1 call waiting and 5:20 AHT (slightly above 5:00 target). With 24 agents this queue is stable but has zero margin. Any agent going on break or a small volume increase could push SL below target.",
              actions: [
                "Keep a close watch - SL is at the exact target with no buffer",
                "Ensure break schedules are staggered to prevent SL dips",
                "Investigate the 5:20 AHT - billing calls should be more transactional and closer to target",
                "Consider deploying IVR self-service for common billing inquiries like balance checks"
              ]
            }
          },
          { queue: 'Premium', waiting: 1, sl: 94, aht: '6:30', agents: 12,
            insight: {
              description: "Real-time snapshot of the Premium queue serving high-value customers. Highest SL of all queues with dedicated agent pool.",
              dataSource: "Live ACD queue statistics for the Premium/VIP skill group. Higher AHT acceptable as premium customers receive extended service with no rush-off pressure.",
              meaning: "Premium queue is performing excellently: 94% SL far exceeds target with only 1 call waiting. The 6:30 AHT is the second highest but is expected and accepted for white-glove service. 12 dedicated agents provide a strong service ratio for this high-value segment.",
              actions: [
                "Maintain current staffing - premium SL should never dip below 90%",
                "Do NOT reallocate Premium agents to other queues even during general overflow",
                "Monitor for premium customer callbacks or escalations that could signal dissatisfaction",
                "Track revenue impact per premium call to justify the dedicated staffing investment"
              ]
            }
          },
        ].map((q, i) => {
          const slColor = q.sl >= 85 ? t.success : q.sl >= 75 ? t.warning : t.danger;
          return (
            <Widget key={i} title={q.queue} subtitle={`${q.agents} agents`}
              insight={q.insight}
              style={{ padding: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: t.textTertiary }}>Waiting</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: q.waiting > 2 ? t.danger : t.text }}>{q.waiting}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: t.textTertiary }}>SL %</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: slColor }}>{q.sl}%</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: t.textTertiary }}>AHT</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{q.aht}</div>
                </div>
              </div>
              <div style={{ marginTop: 10, height: 4, borderRadius: 2, background: t.surfaceAlt, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${q.sl}%`, borderRadius: 2, background: slColor, transition: 'width 0.6s ease' }} />
              </div>
            </Widget>
          );
        })}
      </div>

      {/* Pulse animation style */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
