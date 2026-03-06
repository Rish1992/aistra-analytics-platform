import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, Badge } from '../components/UI';
import {
  Sparkline, MiniBar, DonutChart, BarChart, AreaChart, MultiLineChart,
  HorizontalBar, GaugeChart, Heatmap, RadarChart, FunnelChart, WaterfallChart,
  Treemap, ScatterPlot, BulletChart, ComboChart, BoxPlot, StackedAreaChart,
  CalendarHeatmap, SankeyDiagram, HistogramChart, StackedBarChart,
} from '../components/Charts';

// ─── CHART CATALOG ───
const chartCatalog = [
  {
    id: 'sparkline',
    name: 'Sparkline',
    description: 'A compact inline trend indicator that shows directional movement of a metric over time without axes or labels.',
    bestFor: 'Quick trend glance in KPI cards, dashboards with limited space, inline metric summaries',
    requiredValues: 'Data (array of numeric values), Color (stroke color)',
    insights: 'Directional trend (up/down), volatility of a metric, recent momentum shifts',
    render: (t) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
        <Sparkline data={[12, 18, 14, 22, 19, 26, 24, 30, 28, 35]} color={t.chart[0]} width={200} height={50} />
      </div>
    ),
  },
  {
    id: 'minibar',
    name: 'Mini Bar',
    description: 'A minimal bar visualization that shows relative magnitudes across a small set of values, ideal for compact dashboard widgets.',
    bestFor: 'Widget-level comparisons, small multiples, sidebar metrics',
    requiredValues: 'Data (array of numeric values), Color (fill color)',
    insights: 'Relative magnitude differences, peak identification in a small dataset',
    render: (t) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
        <MiniBar data={[8, 15, 12, 22, 18, 10, 20]} color={t.chart[1]} width={180} height={50} />
      </div>
    ),
  },
  {
    id: 'donut',
    name: 'Donut Chart',
    description: 'A circular progress indicator showing a single percentage value against a full circle. Perfect for KPI completion tracking.',
    bestFor: 'KPI goal completion, single metric progress, SLA attainment display',
    requiredValues: 'Value (0-100 percentage), Color (ring color), Size, Stroke width',
    insights: 'Progress toward a target, percentage attainment, gap to goal',
    render: (t) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
        <DonutChart value={73} size={100} strokeWidth={10} color={t.chart[2]} />
      </div>
    ),
  },
  {
    id: 'bar',
    name: 'Bar Chart',
    description: 'Vertical bars comparing values across categories. Supports both single-series and grouped multi-series data for side-by-side comparison.',
    bestFor: 'Comparing categories, team performance ranking, period-over-period comparison',
    requiredValues: 'Labels (categories), Data (numeric values or 2D array for grouped), Colors (array)',
    insights: 'Category ranking, performance gaps between groups, distribution across categories',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <BarChart
          data={[65, 82, 48, 91, 73]}
          labels={['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega']}
          colors={[t.chart[0], t.chart[1]]}
          width={380} height={140}
        />
      </div>
    ),
  },
  {
    id: 'area',
    name: 'Area Chart',
    description: 'A line chart with a gradient-filled area beneath, emphasizing the magnitude of a trend over time. Great for volume or value-based metrics.',
    bestFor: 'Showing trends with magnitude emphasis, volume over time, revenue tracking',
    requiredValues: 'Data (numeric array), Color (line and fill color)',
    insights: 'Trend direction and magnitude, growth or decline rate, volume patterns over time',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <AreaChart data={[30, 42, 38, 55, 48, 62, 58, 70]} width={380} height={130} color={t.chart[3]} />
      </div>
    ),
  },
  {
    id: 'multiline',
    name: 'Multi-Line Chart',
    description: 'Multiple line series overlaid on the same axes for direct comparison. Supports benchmark/target lines and dashed series for forecasts.',
    bestFor: 'Multi-series trend comparison, actual vs target tracking, team-by-team trends',
    requiredValues: 'Series (array of {data, color, name}), Labels (x-axis), Benchmark lines (optional)',
    insights: 'Comparative trends, convergence or divergence between metrics, benchmark achievement',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <MultiLineChart
          series={[
            { data: [40, 45, 52, 48, 60, 65], color: t.chart[0], name: 'Team A' },
            { data: [35, 40, 38, 50, 55, 58], color: t.chart[1], name: 'Team B' },
            { data: [50, 48, 46, 44, 52, 55], color: t.chart[2], name: 'Team C' },
          ]}
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          width={380} height={140}
        />
      </div>
    ),
  },
  {
    id: 'horizontalbar',
    name: 'Horizontal Bar',
    description: 'Horizontal progress-style bars for ranked comparisons. Labels appear naturally beside bars, making it ideal for lists of items with values.',
    bestFor: 'Ranked item comparisons, top-N lists, progress tracking across categories',
    requiredValues: 'Items (array of {label, value, color}), Max value (optional)',
    insights: 'Ranking order, magnitude differences, outlier identification in ranked data',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <HorizontalBar items={[
          { label: 'Email', value: 42, color: t.chart[0] },
          { label: 'Phone', value: 35, color: t.chart[1] },
          { label: 'Chat', value: 28, color: t.chart[2] },
          { label: 'Social', value: 15, color: t.chart[3] },
        ]} />
      </div>
    ),
  },
  {
    id: 'gauge',
    name: 'Gauge Chart',
    description: 'A semicircular gauge with colored zones showing where a KPI stands relative to defined ranges (e.g., poor/fair/good). Includes needle indicator.',
    bestFor: 'KPI against target ranges, health scores, SLA compliance meters',
    requiredValues: 'Value (current), Min/Max, Zones (array of {from, to, color}), Label',
    insights: 'Current performance level, zone identification (danger/warning/good), distance from target',
    render: (t) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
        <GaugeChart value={78} min={0} max={100} size={160} label="CSAT Score" />
      </div>
    ),
  },
  {
    id: 'heatmap',
    name: 'Heatmap',
    description: 'A matrix grid where cell color intensity represents value magnitude. Supports sequential and diverging color scales for different data types.',
    bestFor: 'Time-based patterns (hour x day), correlation matrices, multi-dimensional comparison',
    requiredValues: 'Data (2D array), Row labels, Column labels, Color scale type',
    insights: 'Pattern detection in matrix data, hotspot identification, time-based activity patterns',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <Heatmap
          data={[[8, 12, 15, 10], [20, 25, 18, 22], [14, 10, 28, 16]]}
          rowLabels={['Morning', 'Afternoon', 'Evening']}
          colLabels={['Mon', 'Tue', 'Wed', 'Thu']}
          width={340}
        />
      </div>
    ),
  },
  {
    id: 'radar',
    name: 'Radar Chart',
    description: 'A multi-axis polygon chart comparing entities across multiple dimensions. Each axis represents a metric, with values plotted as a filled polygon.',
    bestFor: 'Multi-dimensional skill comparison, balanced scorecard view, competitive analysis',
    requiredValues: 'Dimensions (axis labels), Entities (array of {values, color, name})',
    insights: 'Strengths and weaknesses across dimensions, comparative shape analysis, balance assessment',
    render: (t) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
        <RadarChart
          dimensions={['Quality', 'Speed', 'CSAT', 'FCR', 'Attendance']}
          entities={[
            { values: [85, 70, 90, 75, 88], color: t.chart[0], name: 'Team A' },
            { values: [72, 88, 68, 82, 76], color: t.chart[3], name: 'Team B' },
          ]}
          size={180}
        />
      </div>
    ),
  },
  {
    id: 'funnel',
    name: 'Funnel Chart',
    description: 'A tapering visualization showing sequential drop-off through stages. Each stage narrows proportionally, with conversion rates between steps.',
    bestFor: 'Sales pipeline visualization, process conversion tracking, customer journey stages',
    requiredValues: 'Stages (array of {name, value})',
    insights: 'Conversion rates between stages, biggest drop-off points, pipeline health',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <FunnelChart stages={[
          { name: 'Leads', value: 1200 },
          { name: 'Qualified', value: 800 },
          { name: 'Proposal', value: 450 },
          { name: 'Closed', value: 180 },
        ]} width={340} />
      </div>
    ),
  },
  {
    id: 'waterfall',
    name: 'Waterfall Chart',
    description: 'Shows the cumulative effect of sequential positive and negative values. Connecting lines show running total, with color indicating direction.',
    bestFor: 'Financial breakdowns, budget variance analysis, contribution analysis',
    requiredValues: 'Items (array of {name, value, isTotal?})',
    insights: 'Individual contributions to a total, positive vs negative impacts, cumulative progression',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <WaterfallChart items={[
          { name: 'Revenue', value: 120 },
          { name: 'COGS', value: -45 },
          { name: 'Opex', value: -30 },
          { name: 'Tax', value: -12 },
          { name: 'Profit', value: 33, isTotal: true },
        ]} width={380} height={150} />
      </div>
    ),
  },
  {
    id: 'treemap',
    name: 'Treemap',
    description: 'Rectangular areas sized proportionally to their values. Useful for showing part-to-whole relationships where items vary greatly in magnitude.',
    bestFor: 'Budget allocation view, portfolio composition, market share breakdown',
    requiredValues: 'Items (array of {label, value, color})',
    insights: 'Proportional size comparison, dominant categories, relative share of total',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <Treemap items={[
          { label: 'Voice', value: 45, color: t.chart[0] },
          { label: 'Chat', value: 28, color: t.chart[1] },
          { label: 'Email', value: 18, color: t.chart[2] },
          { label: 'Social', value: 9, color: t.chart[3] },
        ]} width={380} height={140} />
      </div>
    ),
  },
  {
    id: 'scatter',
    name: 'Scatter Plot',
    description: 'Points plotted on X-Y axes showing the relationship between two variables. Supports trend line computation, point sizing, and coloring.',
    bestFor: 'Correlation analysis, outlier detection, multi-variable relationship visualization',
    requiredValues: 'Points (array of {x, y, color?, size?}), X/Y labels, Show trend line (boolean)',
    insights: 'Correlation strength and direction, outlier identification, cluster patterns',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <ScatterPlot
          points={[
            { x: 20, y: 65, color: t.chart[0] }, { x: 35, y: 72, color: t.chart[0] },
            { x: 45, y: 80, color: t.chart[1] }, { x: 55, y: 78, color: t.chart[1] },
            { x: 70, y: 88, color: t.chart[2] }, { x: 80, y: 92, color: t.chart[2] },
            { x: 30, y: 58, color: t.chart[3] }, { x: 60, y: 85, color: t.chart[3] },
          ]}
          xLabel="Experience (months)" yLabel="QA Score"
          width={380} height={180} showTrendLine
        />
      </div>
    ),
  },
  {
    id: 'bullet',
    name: 'Bullet Chart',
    description: 'A compact alternative to gauges, showing actual performance as a bar overlaid on colored range bands, with a target marker line.',
    bestFor: 'Performance against target with context, KPI dashboards, multi-metric goal tracking',
    requiredValues: 'Items (array of {label, actual, target, max, ranges, unit})',
    insights: 'Performance vs target, which range (poor/fair/good) a metric falls in, multi-KPI comparison',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <BulletChart items={[
          { label: 'Revenue', actual: 275, target: 300, max: 400, unit: 'K' },
          { label: 'Profit', actual: 85, target: 100, max: 130, unit: 'K' },
          { label: 'Satisfaction', actual: 4.2, target: 4.5, max: 5, unit: '/5' },
        ]} />
      </div>
    ),
  },
  {
    id: 'combo',
    name: 'Combo Chart',
    description: 'A dual-axis chart combining bars (primary metric) with a line overlay (secondary metric), enabling comparison of related but differently scaled data.',
    bestFor: 'Dual-metric analysis (e.g., volume + rate), revenue vs margin, calls vs satisfaction',
    requiredValues: 'Bar data, Line data, Labels, Bar/Line colors, Series labels',
    insights: 'Relationship between two metrics, divergence or alignment patterns, correlated trends',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <ComboChart
          barData={[120, 150, 180, 160, 200, 175]}
          lineData={[72, 78, 82, 76, 88, 85]}
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          barColor={t.chart[0]} lineColor={t.chart[3]}
          barLabel="Volume" lineLabel="CSAT %"
          width={380} height={150}
        />
      </div>
    ),
  },
  {
    id: 'boxplot',
    name: 'Box Plot',
    description: 'Statistical distribution visualization showing median, quartiles, and whiskers (min/max). Reveals spread, skew, and outliers in data groups.',
    bestFor: 'Comparing distributions across groups, identifying outliers, statistical analysis',
    requiredValues: 'Groups (array of {name, min, q1, median, q3, max, color})',
    insights: 'Distribution shape, median comparison, spread/variability, outlier presence',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <BoxPlot groups={[
          { name: 'Mon', min: 120, q1: 180, median: 240, q3: 300, max: 380, color: t.chart[0] },
          { name: 'Tue', min: 140, q1: 200, median: 260, q3: 320, max: 400, color: t.chart[1] },
          { name: 'Wed', min: 100, q1: 160, median: 220, q3: 280, max: 360, color: t.chart[2] },
          { name: 'Thu', min: 160, q1: 220, median: 280, q3: 340, max: 420, color: t.chart[3] },
        ]} width={380} height={160} />
      </div>
    ),
  },
  {
    id: 'stackedarea',
    name: 'Stacked Area Chart',
    description: 'Multiple area series stacked on top of each other, showing both individual contributions and the total over time.',
    bestFor: 'Part-to-whole trends over time, channel mix evolution, composition changes',
    requiredValues: 'Series (array of {data, color, name}), Labels',
    insights: 'Composition changes over time, growth in individual and total, share of total shifts',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <StackedAreaChart
          series={[
            { data: [20, 25, 30, 28, 35, 40], color: t.chart[0], name: 'Voice' },
            { data: [15, 18, 22, 25, 28, 32], color: t.chart[1], name: 'Chat' },
            { data: [10, 12, 14, 16, 18, 20], color: t.chart[2], name: 'Email' },
          ]}
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          width={380} height={140}
        />
      </div>
    ),
  },
  {
    id: 'calendarheatmap',
    name: 'Calendar Heatmap',
    description: 'A grid of cells organized in a calendar-like layout (weeks x days), with color intensity representing activity or value for each day.',
    bestFor: 'Daily activity patterns, attendance tracking, seasonal pattern identification',
    requiredValues: 'Data (array of {value} per day), Color, Width',
    insights: 'Day-of-week patterns, seasonal trends, activity hotspots, consistency tracking',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <CalendarHeatmap
          data={Array.from({ length: 91 }, (_, i) => ({ value: Math.floor(Math.random() * 50) + 5 }))}
          width={380} height={130} color={t.chart[4]}
        />
      </div>
    ),
  },
  {
    id: 'sankey',
    name: 'Sankey Diagram',
    description: 'A flow diagram where link thickness represents flow magnitude between nodes arranged in columns. Shows how quantities distribute through a system.',
    bestFor: 'Flow and relationship visualization, customer journey paths, resource allocation',
    requiredValues: 'Nodes (array of {id, name, col, value, color}), Links (array of {source, target, value})',
    insights: 'Flow distribution, major pathways, leakage points, resource allocation efficiency',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <SankeyDiagram
          nodes={[
            { id: 'web', name: 'Web', col: 0, value: 100, color: t.chart[0] },
            { id: 'mobile', name: 'Mobile', col: 0, value: 60, color: t.chart[1] },
            { id: 'chat', name: 'Chat', col: 1, value: 80, color: t.chart[2] },
            { id: 'voice', name: 'Voice', col: 1, value: 50, color: t.chart[3] },
            { id: 'resolved', name: 'Resolved', col: 2, value: 110, color: t.chart[4] },
            { id: 'escalated', name: 'Escalated', col: 2, value: 20, color: t.chart[5] },
          ]}
          links={[
            { source: 'web', target: 'chat', value: 60 },
            { source: 'web', target: 'voice', value: 40 },
            { source: 'mobile', target: 'chat', value: 40 },
            { source: 'mobile', target: 'voice', value: 20 },
            { source: 'chat', target: 'resolved', value: 70 },
            { source: 'chat', target: 'escalated', value: 10 },
            { source: 'voice', target: 'resolved', value: 40 },
            { source: 'voice', target: 'escalated', value: 10 },
          ]}
          width={380} height={200}
        />
      </div>
    ),
  },
  {
    id: 'histogram',
    name: 'Histogram',
    description: 'Bars representing frequency counts within consecutive value ranges (bins). Shows how data is distributed across a continuous variable.',
    bestFor: 'Distribution analysis, frequency patterns, identifying data spread and skew',
    requiredValues: 'Bins (array of {label, count})',
    insights: 'Distribution shape (normal, skewed), most common range, spread and concentration',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <HistogramChart bins={[
          { label: '0-60', count: 5 }, { label: '60-120', count: 12 },
          { label: '120-180', count: 28 }, { label: '180-240', count: 35 },
          { label: '240-300', count: 22 }, { label: '300-360', count: 14 },
          { label: '360+', count: 8 },
        ]} width={380} height={130} />
      </div>
    ),
  },
  {
    id: 'stackedbar',
    name: 'Stacked Bar Chart',
    description: 'Bars divided into colored segments representing sub-categories. Shows both total value and composition for each category. Supports horizontal layout.',
    bestFor: 'Part-to-whole comparison across categories, budget breakdowns, segment contributions',
    requiredValues: 'Categories, Segments (array of {name, color}), Data (2D array)',
    insights: 'Composition per category, segment comparison, total vs parts relationship',
    render: (t) => (
      <div style={{ padding: '8px 0' }}>
        <StackedBarChart
          categories={['Q1', 'Q2', 'Q3', 'Q4']}
          segments={[
            { name: 'Product', color: t.chart[0] },
            { name: 'Services', color: t.chart[1] },
            { name: 'Support', color: t.chart[2] },
          ]}
          data={[
            [40, 25, 15],
            [50, 30, 20],
            [45, 35, 18],
            [60, 28, 22],
          ]}
          width={380} height={160}
        />
      </div>
    ),
  },
];

// ─── CHART CARD ───
const ChartCard = ({ chart, t, expanded, onToggle }) => {
  return (
    <Card
      style={{
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: expanded ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
      }}
      onClick={onToggle}
    >
      {/* Chart Preview */}
      <div style={{
        padding: '16px 20px 12px',
        background: t.surfaceAlt,
        borderBottom: `1px solid ${t.border}`,
        minHeight: 120,
      }}>
        {chart.render(t)}
      </div>

      {/* Chart Info */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{chart.name}</div>
          <Badge variant="primary">{chart.id}</Badge>
        </div>
        <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.6, margin: 0 }}>
          {chart.description}
        </p>

        {/* Expanded Details */}
        {expanded && (
          <div style={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            animation: 'fadeIn 0.2s ease',
          }}>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

            {/* Best Suited For */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6, background: t.successLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: t.success, fontSize: 12, fontWeight: 700,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Best Suited For</span>
              </div>
              <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.6, margin: 0, padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                {chart.bestFor}
              </p>
            </div>

            {/* Required Values */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6, background: t.infoLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: t.info, fontSize: 12, fontWeight: 700,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Required Values</span>
              </div>
              <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.6, margin: 0, padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                {chart.requiredValues}
              </p>
            </div>

            {/* Insights Derived */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6, background: t.warningLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: t.warning, fontSize: 12, fontWeight: 700,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/></svg>
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Insights Derived</span>
              </div>
              <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.6, margin: 0, padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                {chart.insights}
              </p>
            </div>
          </div>
        )}

        {/* Expand Hint */}
        <div style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          color: t.textTertiary,
          fontSize: 11,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          {expanded ? 'Click to collapse' : 'Click for details'}
        </div>
      </div>
    </Card>
  );
};

// ─── MAIN COMPONENT ───
export default function ChartReference() {
  const { t } = useTheme();
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = chartCatalog.filter(chart =>
    chart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chart.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chart.bestFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <DashboardHeader title="Chart Reference" subtitle="Complete guide to all available chart types" />

      <div style={{ padding: '24px 32px' }}>
        {/* Search & Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input
              placeholder="Search charts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 10,
                border: `1px solid ${t.border}`,
                background: t.surface,
                color: t.text,
                fontSize: 13,
                outline: 'none',
                width: 280,
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = t.primary}
              onBlur={e => e.target.style.borderColor = t.border}
            />
            <span style={{ fontSize: 12, color: t.textTertiary }}>
              {filtered.length} of {chartCatalog.length} charts
            </span>
          </div>
          <button
            onClick={() => setExpandedId(null)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              background: t.surface,
              color: t.textSecondary,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Collapse All
          </button>
        </div>

        {/* Chart Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
          gap: 20,
        }}>
          {filtered.map(chart => (
            <ChartCard
              key={chart.id}
              chart={chart}
              t={t}
              expanded={expandedId === chart.id}
              onToggle={() => setExpandedId(expandedId === chart.id ? null : chart.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={t.textTertiary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div style={{ fontSize: 14, color: t.textTertiary }}>No charts match "{searchTerm}"</div>
          </div>
        )}
      </div>
    </div>
  );
}
