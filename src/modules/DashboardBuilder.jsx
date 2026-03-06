import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, Badge, Widget, SectionTitle, KPICard } from '../components/UI';
import { BarChart, AreaChart, DonutChart, HorizontalBar, Sparkline } from '../components/Charts';

// Mini SVG icon helper for widget library
const WIcon = ({ children }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

const widgetIcons = {
  kpi: <WIcon><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></WIcon>,
  stat: <WIcon><path d="M4 15s1.5-2 4-2 4 4 8 4 4-6 4-6"/><line x1="4" y1="21" x2="4" y2="15"/><line x1="20" y1="21" x2="20" y2="11"/></WIcon>,
  progress: <WIcon><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></WIcon>,
  gauge: <WIcon><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></WIcon>,
  line: <WIcon><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></WIcon>,
  area: <WIcon><path d="M3 20h18"/><path d="M3 20V8l5 4 4-8 4 6 4-2v12"/></WIcon>,
  multiline: <WIcon><path d="M3 12h2l3-6 4 12 3-6 3 3h2"/><path d="M3 18h2l3-3 4 6 3-6 3 2h2" opacity="0.5"/></WIcon>,
  bar: <WIcon><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="6" width="4" height="15" rx="1"/><rect x="17" y="2" width="4" height="19" rx="1"/></WIcon>,
  hbar: <WIcon><rect x="3" y="3" width="14" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="17" width="10" height="4" rx="1"/></WIcon>,
  grouped: <WIcon><rect x="2" y="14" width="3" height="7"/><rect x="6" y="10" width="3" height="11"/><rect x="11" y="12" width="3" height="9"/><rect x="15" y="8" width="3" height="13"/><rect x="19" y="6" width="3" height="15"/></WIcon>,
  stacked: <WIcon><rect x="4" y="4" width="4" height="17" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="16" y="2" width="4" height="19" rx="1"/><line x1="4" y1="12" x2="8" y2="12"/><line x1="10" y1="14" x2="14" y2="14"/><line x1="16" y1="10" x2="20" y2="10"/></WIcon>,
  combo: <WIcon><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="4" width="4" height="17" rx="1"/><polyline points="2 8 8 4 14 6 22 2" fill="none"/></WIcon>,
  donut: <WIcon><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><path d="M12 2a10 10 0 0 1 8.66 5" strokeWidth="2"/></WIcon>,
  treemap: <WIcon><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="14"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="8" y1="14" x2="8" y2="21"/><line x1="16" y1="14" x2="16" y2="21"/></WIcon>,
  waterfall: <WIcon><rect x="2" y="14" width="3" height="7"/><rect x="7" y="8" width="3" height="6"/><rect x="12" y="4" width="3" height="4"/><rect x="17" y="10" width="3" height="11"/><line x1="5" y1="14" x2="7" y2="14" strokeDasharray="2"/></WIcon>,
  heatmap: <WIcon><rect x="3" y="3" width="5" height="5" rx="1" fill="currentColor" opacity="0.3"/><rect x="10" y="3" width="5" height="5" rx="1" fill="currentColor" opacity="0.7"/><rect x="17" y="3" width="4" height="5" rx="1" fill="currentColor" opacity="0.5"/><rect x="3" y="10" width="5" height="5" rx="1" fill="currentColor" opacity="0.9"/><rect x="10" y="10" width="5" height="5" rx="1" fill="currentColor" opacity="0.4"/><rect x="17" y="10" width="4" height="5" rx="1" fill="currentColor" opacity="0.8"/></WIcon>,
  calendar: <WIcon><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></WIcon>,
  scatter: <WIcon><circle cx="7" cy="15" r="2"/><circle cx="12" cy="9" r="2"/><circle cx="17" cy="13" r="2"/><circle cx="9" cy="6" r="1.5"/><circle cx="16" cy="7" r="1.5"/></WIcon>,
  radar: <WIcon><polygon points="12 2 22 8.5 19 19.5 5 19.5 2 8.5" fill="none"/><polygon points="12 6 18 10 16 17 8 17 6 10" fill="currentColor" opacity="0.15"/></WIcon>,
  funnel: <WIcon><path d="M3 4h18l-3 5H6L3 4z"/><path d="M6 9h12l-2 5H8L6 9z"/><path d="M8 14h8l-2 5h-4l-2-5z"/></WIcon>,
  sankey: <WIcon><rect x="2" y="3" width="3" height="8" rx="1"/><rect x="2" y="15" width="3" height="6" rx="1"/><rect x="19" y="5" width="3" height="5" rx="1"/><rect x="19" y="14" width="3" height="7" rx="1"/><path d="M5 7c7 0 7 5 14 3" fill="none"/><path d="M5 18c7 0 7-2 14-1" fill="none"/></WIcon>,
  boxplot: <WIcon><rect x="6" y="8" width="12" height="8" rx="1"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="12" y1="16" x2="12" y2="21"/><line x1="9" y1="3" x2="15" y2="3"/><line x1="9" y1="21" x2="15" y2="21"/><line x1="12" y1="8" x2="12" y2="16"/></WIcon>,
  histogram: <WIcon><rect x="2" y="16" width="3" height="5"/><rect x="6" y="12" width="3" height="9"/><rect x="10" y="6" width="3" height="15"/><rect x="14" y="10" width="3" height="11"/><rect x="18" y="14" width="3" height="7"/></WIcon>,
  table: <WIcon><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="10" y1="3" x2="10" y2="21"/></WIcon>,
  alert: <WIcon><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></WIcon>,
  bullet: <WIcon><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></WIcon>,
};

const widgetLibrary = [
  { id: 'kpi', name: 'KPI Card', category: 'Summary', desc: 'Single metric with trend indicator and sparkline' },
  { id: 'stat', name: 'Stat Card', category: 'Summary', desc: 'Raw counter or value display' },
  { id: 'progress', name: 'Progress Card', category: 'Summary', desc: 'Metric with progress bar toward target' },
  { id: 'gauge', name: 'Gauge Chart', category: 'Summary', desc: 'Circular gauge with RAG zones' },
  { id: 'line', name: 'Line Chart', category: 'Trend', desc: 'Time series trend analysis' },
  { id: 'area', name: 'Area Chart', category: 'Trend', desc: 'Filled trend with volume emphasis' },
  { id: 'multiline', name: 'Multi-Line Chart', category: 'Trend', desc: 'Multiple series comparison over time' },
  { id: 'bar', name: 'Bar Chart', category: 'Comparison', desc: 'Category comparison with vertical bars' },
  { id: 'hbar', name: 'Horizontal Bar', category: 'Comparison', desc: 'Ranked list or long-label comparison' },
  { id: 'grouped', name: 'Grouped Bar', category: 'Comparison', desc: 'Multi-metric category comparison' },
  { id: 'stacked', name: 'Stacked Bar', category: 'Comparison', desc: 'Composition within categories' },
  { id: 'combo', name: 'Combo Chart', category: 'Comparison', desc: 'Dual-axis bars + line' },
  { id: 'donut', name: 'Donut Chart', category: 'Composition', desc: 'Part-of-whole with center label' },
  { id: 'treemap', name: 'Treemap', category: 'Composition', desc: 'Hierarchical part-of-whole' },
  { id: 'waterfall', name: 'Waterfall', category: 'Composition', desc: 'Incremental build-up or breakdown' },
  { id: 'heatmap', name: 'Heatmap', category: 'Pattern', desc: 'Two-dimensional intensity patterns' },
  { id: 'calendar', name: 'Calendar Heatmap', category: 'Pattern', desc: 'Daily patterns across months' },
  { id: 'scatter', name: 'Scatter Plot', category: 'Correlation', desc: 'Two-variable correlation analysis' },
  { id: 'radar', name: 'Radar Chart', category: 'Profile', desc: 'Multi-dimension profile view' },
  { id: 'funnel', name: 'Funnel Chart', category: 'Flow', desc: 'Sequential stage drop-off' },
  { id: 'sankey', name: 'Sankey Diagram', category: 'Flow', desc: 'Flow distribution between nodes' },
  { id: 'boxplot', name: 'Box Plot', category: 'Distribution', desc: 'Statistical distribution comparison' },
  { id: 'histogram', name: 'Histogram', category: 'Distribution', desc: 'Frequency distribution shape' },
  { id: 'table', name: 'Data Table', category: 'Detail', desc: 'Sortable, filterable data grid' },
  { id: 'alert', name: 'Alert List', category: 'Detail', desc: 'Threshold breach notifications' },
  { id: 'bullet', name: 'Bullet Chart', category: 'Comparison', desc: 'Actual vs target with ranges' },
];

const categories = ['All', 'Summary', 'Trend', 'Comparison', 'Composition', 'Pattern', 'Correlation', 'Profile', 'Flow', 'Distribution', 'Detail'];

const layouts = [
  { id: '2col', name: '2 Column', cols: 2, preview: '\u2590\u2590' },
  { id: '3col', name: '3 Column', cols: 3, preview: '\u2590\u2590\u2590' },
  { id: '4col', name: '4 Column', cols: 4, preview: '\u2590\u2590\u2590\u2590' },
  { id: 'full', name: 'Full Width', cols: 1, preview: '\u2588\u2588\u2588\u2588' },
  { id: 'sidebar', name: '1+3 Sidebar', cols: 4, preview: '\u258C\u2590\u2590\u2590' },
];

const sampleWidgets = [
  { type: 'kpi', title: 'Total Revenue', size: '1x1' },
  { type: 'area', title: 'Volume Trend', size: '2x1' },
  { type: 'donut', title: 'Channel Mix', size: '1x1' },
  { type: 'hbar', title: 'Top Agents', size: '1x1' },
  { type: 'table', title: 'Recent Calls', size: '2x1' },
];

// ─── CONFIGURATION CONSTANTS ───

const dataSources = [
  { value: 'acd', label: 'ACD Data' },
  { value: 'crm', label: 'CRM Data' },
  { value: 'survey', label: 'Survey Data' },
  { value: 'finance', label: 'Finance Data' },
  { value: 'wfm', label: 'WFM Data' },
  { value: 'custom', label: 'Custom Upload' },
];

const dataFieldOptions = [
  'Date', 'Time', 'Agent Name', 'Agent ID', 'Team', 'Department', 'Channel',
  'Call Duration', 'Handle Time', 'Wait Time', 'Talk Time', 'Hold Time',
  'Wrap Time', 'Queue', 'Skill', 'Disposition', 'CSAT Score', 'NPS',
  'FCR', 'Revenue', 'Cost', 'Volume', 'Abandon Rate', 'Service Level',
  'Occupancy', 'Adherence', 'Conformance', 'Utilization', 'Satisfaction',
  'Quality Score', 'Sentiment', 'Transfer Rate', 'Escalation Rate',
];

const colorSchemes = [
  { id: 'default', name: 'Default', desc: 'Platform theme colors' },
  { id: 'cool', name: 'Cool Tones', desc: 'Blues and greens' },
  { id: 'warm', name: 'Warm Tones', desc: 'Oranges and reds' },
  { id: 'mono', name: 'Monochrome', desc: 'Single-hue gradient' },
  { id: 'pastel', name: 'Pastel', desc: 'Soft muted palette' },
  { id: 'vivid', name: 'Vivid', desc: 'High-contrast bright' },
];

const refreshIntervals = [
  { value: 'manual', label: 'Manual' },
  { value: '15s', label: '15 seconds' },
  { value: '30s', label: '30 seconds' },
  { value: '1min', label: '1 minute' },
  { value: '5min', label: '5 minutes' },
  { value: '15min', label: '15 minutes' },
  { value: '30min', label: '30 minutes' },
  { value: '1hr', label: '1 hour' },
];

const widgetSizeOptions = [
  { value: '1col', label: '1 Column' },
  { value: '2col', label: '2 Columns' },
  { value: 'full', label: 'Full Width' },
];

// Determine which field configuration group applies based on widget type
const getFieldGroup = (widgetType) => {
  const axisTypes = ['bar', 'line', 'area', 'multiline', 'stacked', 'grouped', 'combo', 'waterfall', 'histogram', 'scatter', 'boxplot'];
  const valueTypes = ['donut', 'gauge', 'kpi', 'stat', 'progress', 'bullet', 'funnel'];
  const heatmapTypes = ['heatmap', 'calendar'];
  const tableTypes = ['table', 'alert'];
  const hbarTypes = ['hbar'];
  const radarTypes = ['radar'];
  const treeTypes = ['treemap'];
  const sankeyTypes = ['sankey'];

  if (axisTypes.includes(widgetType)) return 'axis';
  if (valueTypes.includes(widgetType)) return 'value';
  if (heatmapTypes.includes(widgetType)) return 'heatmap';
  if (tableTypes.includes(widgetType)) return 'table';
  if (hbarTypes.includes(widgetType)) return 'hbar';
  if (radarTypes.includes(widgetType)) return 'radar';
  if (treeTypes.includes(widgetType)) return 'tree';
  if (sankeyTypes.includes(widgetType)) return 'sankey';
  return 'value';
};

// Build default config for a widget
const getDefaultConfig = (widgetType, widgetName) => {
  const fieldGroup = getFieldGroup(widgetType);
  const base = {
    widgetTitle: widgetName || 'Untitled Widget',
    widgetSubtitle: '',
    dataSource: 'acd',
    colorScheme: 'default',
    showLegend: true,
    showGridLines: true,
    widgetSize: '1col',
    refreshInterval: '5min',
  };

  if (fieldGroup === 'axis') {
    return {
      ...base,
      xAxisField: 'Date',
      yAxisField: 'Volume',
      yAxisField2: '',
      groupByField: '',
      barMode: 'grouped',
      orientation: 'vertical',
      showBenchmarkLine: false,
      benchmarkValue: '',
      benchmarkLabel: '',
    };
  }
  if (fieldGroup === 'value') {
    return {
      ...base,
      valueField: 'CSAT Score',
      maxField: '',
      gaugeMin: 0,
      gaugeMax: 100,
      gaugeTarget: 80,
      zoneThresholds: '30,70',
    };
  }
  if (fieldGroup === 'heatmap') {
    return { ...base, rowField: 'Day of Week', columnField: 'Hour', valueField: 'Volume' };
  }
  if (fieldGroup === 'table') {
    return { ...base, tableColumns: 'Agent Name,Queue,Handle Time,CSAT Score,Volume' };
  }
  if (fieldGroup === 'hbar') {
    return { ...base, labelField: 'Agent Name', valueField: 'Handle Time' };
  }
  if (fieldGroup === 'radar') {
    return { ...base, dimensions: 'Quality Score,CSAT Score,FCR,Adherence,Utilization', valueField: 'Score' };
  }
  if (fieldGroup === 'tree') {
    return { ...base, categoryField: 'Department', sizeField: 'Volume', colorField: 'CSAT Score' };
  }
  if (fieldGroup === 'sankey') {
    return { ...base, sourceField: 'Channel', targetField: 'Disposition', valueField: 'Volume' };
  }
  return base;
};


// ─── WIDGET CONFIGURATION PANEL COMPONENT ───

const WidgetConfigPanel = ({ widget, onUpdate, onClose, t }) => {
  const [config, setConfig] = useState(() => ({ ...widget.config }));
  const fieldGroup = getFieldGroup(widget.type || widget.id);

  const update = (key, val) => setConfig(prev => ({ ...prev, [key]: val }));

  const handleDone = () => {
    onUpdate({ ...widget, config, configured: true });
    onClose();
  };

  // Styled form helpers
  const formLabel = (text) => (
    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: t.textSecondary, marginBottom: 4 }}>{text}</label>
  );

  const textInput = (key, placeholder) => (
    <input
      value={config[key] || ''}
      onChange={e => update(key, e.target.value)}
      placeholder={placeholder || ''}
      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
    />
  );

  const selectInput = (key, options) => (
    <select
      value={config[key] || ''}
      onChange={e => update(key, e.target.value)}
      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, outline: 'none', appearance: 'auto', boxSizing: 'border-box' }}
    >
      {options.map(opt => (
        <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
          {typeof opt === 'string' ? opt : opt.label}
        </option>
      ))}
    </select>
  );

  const numberInput = (key, placeholder, min, max) => (
    <input
      type="number"
      value={config[key] ?? ''}
      onChange={e => update(key, e.target.value === '' ? '' : Number(e.target.value))}
      placeholder={placeholder}
      min={min}
      max={max}
      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
    />
  );

  const toggleInput = (key, label) => (
    <div
      onClick={() => update(key, !config[key])}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', cursor: 'pointer', userSelect: 'none' }}
    >
      <span style={{ fontSize: 13, color: t.text }}>{label}</span>
      <div style={{
        width: 36, height: 20, borderRadius: 10,
        background: config[key] ? t.primary : t.border,
        position: 'relative', transition: 'background 0.2s',
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 2,
          left: config[key] ? 18 : 2,
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </div>
    </div>
  );

  const sectionHeader = (title) => (
    <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12, marginTop: 4, paddingBottom: 8, borderBottom: `1px solid ${t.border}` }}>{title}</div>
  );

  const fieldSelect = (key, label) => (
    <div style={{ marginBottom: 12 }}>
      {formLabel(label)}
      {selectInput(key, dataFieldOptions)}
    </div>
  );

  const widgetType = widget.type || widget.id;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end',
    }}>
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
      />
      <div style={{
        position: 'relative', width: 460, maxWidth: '92vw', height: '100vh', background: t.surface,
        borderLeft: `1px solid ${t.border}`, boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
        overflowY: 'auto', display: 'flex', flexDirection: 'column',
        animation: 'cfgSlideIn 0.25s ease-out',
      }}>
        <style>{`@keyframes cfgSlideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        {/* Header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 2, background: t.surface, padding: '20px 24px 16px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'flex', alignItems: 'center', color: t.primary }}>{widgetIcons[widgetType] || widgetIcons.kpi}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Configure Widget</div>
                <div style={{ fontSize: 12, color: t.textTertiary }}>{widget.name || widget.title}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
              ✕
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Section: Basic Info */}
          <Card style={{ padding: 16 }}>
            {sectionHeader('Basic Info')}
            <div style={{ marginBottom: 12 }}>
              {formLabel('Widget Title')}
              {textInput('widgetTitle', 'Enter widget title')}
            </div>
            <div>
              {formLabel('Subtitle (optional)')}
              {textInput('widgetSubtitle', 'Enter subtitle or description')}
            </div>
          </Card>

          {/* Section: Data Source */}
          <Card style={{ padding: 16 }}>
            {sectionHeader('Data Source')}
            <div style={{ marginBottom: 12 }}>
              {formLabel('Source')}
              {selectInput('dataSource', dataSources)}
            </div>
            <div>
              {formLabel('Refresh Interval')}
              {selectInput('refreshInterval', refreshIntervals)}
            </div>
          </Card>

          {/* Section: Data Fields - context-aware */}
          <Card style={{ padding: 16 }}>
            {sectionHeader('Data Fields')}

            {fieldGroup === 'axis' && (
              <>
                {fieldSelect('xAxisField', 'X-Axis Field')}
                {fieldSelect('yAxisField', 'Y-Axis Field')}
                <div style={{ marginBottom: 12 }}>
                  {formLabel('Y-Axis Field 2 (optional)')}
                  {selectInput('yAxisField2', ['', ...dataFieldOptions])}
                </div>
                {fieldSelect('groupByField', 'Group By (optional)')}
              </>
            )}

            {fieldGroup === 'value' && (
              <>
                {fieldSelect('valueField', 'Value Field')}
                <div style={{ marginBottom: 12 }}>
                  {formLabel('Max / Total Field (optional)')}
                  {selectInput('maxField', ['', ...dataFieldOptions])}
                </div>
              </>
            )}

            {fieldGroup === 'heatmap' && (
              <>
                {fieldSelect('rowField', 'Row Field')}
                {fieldSelect('columnField', 'Column Field')}
                {fieldSelect('valueField', 'Value Field')}
              </>
            )}

            {fieldGroup === 'table' && (
              <div style={{ marginBottom: 12 }}>
                {formLabel('Column Definitions (comma-separated)')}
                {textInput('tableColumns', 'e.g. Agent Name,Queue,Handle Time')}
              </div>
            )}

            {fieldGroup === 'hbar' && (
              <>
                {fieldSelect('labelField', 'Label Field')}
                {fieldSelect('valueField', 'Value Field')}
              </>
            )}

            {fieldGroup === 'radar' && (
              <>
                <div style={{ marginBottom: 12 }}>
                  {formLabel('Dimensions (comma-separated)')}
                  {textInput('dimensions', 'e.g. Quality,Speed,Accuracy')}
                </div>
                {fieldSelect('valueField', 'Value Field')}
              </>
            )}

            {fieldGroup === 'tree' && (
              <>
                {fieldSelect('categoryField', 'Category Field')}
                {fieldSelect('sizeField', 'Size Field')}
                {fieldSelect('colorField', 'Color Field')}
              </>
            )}

            {fieldGroup === 'sankey' && (
              <>
                {fieldSelect('sourceField', 'Source Node Field')}
                {fieldSelect('targetField', 'Target Node Field')}
                {fieldSelect('valueField', 'Flow Value Field')}
              </>
            )}
          </Card>

          {/* Section: Chart Settings */}
          <Card style={{ padding: 16 }}>
            {sectionHeader('Chart Settings')}

            {/* Color scheme - always visible */}
            <div style={{ marginBottom: 16 }}>
              {formLabel('Color Scheme')}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {colorSchemes.map(cs => (
                  <div
                    key={cs.id}
                    onClick={() => update('colorScheme', cs.id)}
                    style={{
                      padding: '8px 10px', borderRadius: 8, cursor: 'pointer', textAlign: 'center',
                      border: `1.5px solid ${config.colorScheme === cs.id ? t.primary : t.border}`,
                      background: config.colorScheme === cs.id ? t.primaryLight : 'transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 600, color: config.colorScheme === cs.id ? t.primary : t.text }}>{cs.name}</div>
                    <div style={{ fontSize: 9, color: t.textTertiary }}>{cs.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Toggles */}
            {toggleInput('showLegend', 'Show Legend')}
            {toggleInput('showGridLines', 'Show Grid Lines')}

            {/* Line chart specific: benchmark line */}
            {(widgetType === 'line' || widgetType === 'multiline' || widgetType === 'area') && (
              <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: t.surfaceAlt }}>
                {toggleInput('showBenchmarkLine', 'Show Benchmark Line')}
                {config.showBenchmarkLine && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                    <div>
                      {formLabel('Benchmark Value')}
                      {numberInput('benchmarkValue', 'e.g. 85')}
                    </div>
                    <div>
                      {formLabel('Benchmark Label')}
                      {textInput('benchmarkLabel', 'e.g. Target SLA')}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Gauge specific */}
            {(widgetType === 'gauge' || widgetType === 'progress' || widgetType === 'bullet') && (
              <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: t.surfaceAlt }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: t.textSecondary, marginBottom: 10 }}>Gauge Settings</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div>
                    {formLabel('Min')}
                    {numberInput('gaugeMin', '0', 0)}
                  </div>
                  <div>
                    {formLabel('Max')}
                    {numberInput('gaugeMax', '100')}
                  </div>
                  <div>
                    {formLabel('Target')}
                    {numberInput('gaugeTarget', '80')}
                  </div>
                </div>
                <div style={{ marginTop: 8 }}>
                  {formLabel('Zone Thresholds (comma-separated values)')}
                  {textInput('zoneThresholds', 'e.g. 30,70')}
                </div>
              </div>
            )}

            {/* Bar chart specific */}
            {(widgetType === 'bar' || widgetType === 'grouped' || widgetType === 'stacked') && (
              <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: t.surfaceAlt }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: t.textSecondary, marginBottom: 10 }}>Bar Chart Mode</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                  {['grouped', 'stacked'].map(mode => (
                    <div
                      key={mode}
                      onClick={() => update('barMode', mode)}
                      style={{
                        padding: '8px 12px', borderRadius: 8, textAlign: 'center', cursor: 'pointer',
                        border: `1.5px solid ${config.barMode === mode ? t.primary : t.border}`,
                        background: config.barMode === mode ? t.primaryLight : 'transparent',
                        fontSize: 12, fontWeight: 500,
                        color: config.barMode === mode ? t.primary : t.textSecondary,
                      }}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, color: t.textSecondary, marginBottom: 10 }}>Orientation</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {['vertical', 'horizontal'].map(ori => (
                    <div
                      key={ori}
                      onClick={() => update('orientation', ori)}
                      style={{
                        padding: '8px 12px', borderRadius: 8, textAlign: 'center', cursor: 'pointer',
                        border: `1.5px solid ${config.orientation === ori ? t.primary : t.border}`,
                        background: config.orientation === ori ? t.primaryLight : 'transparent',
                        fontSize: 12, fontWeight: 500,
                        color: config.orientation === ori ? t.primary : t.textSecondary,
                      }}
                    >
                      {ori.charAt(0).toUpperCase() + ori.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Section: Layout */}
          <Card style={{ padding: 16 }}>
            {sectionHeader('Layout')}
            <div>
              {formLabel('Widget Size')}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {widgetSizeOptions.map(sz => (
                  <div
                    key={sz.value}
                    onClick={() => update('widgetSize', sz.value)}
                    style={{
                      padding: '10px 12px', borderRadius: 8, textAlign: 'center', cursor: 'pointer',
                      border: `1.5px solid ${config.widgetSize === sz.value ? t.primary : t.border}`,
                      background: config.widgetSize === sz.value ? t.primaryLight : 'transparent',
                      fontSize: 12, fontWeight: 500,
                      color: config.widgetSize === sz.value ? t.primary : t.textSecondary,
                      transition: 'all 0.15s',
                    }}
                  >
                    {sz.label}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div style={{ position: 'sticky', bottom: 0, background: t.surface, padding: '16px 24px', borderTop: `1px solid ${t.border}`, display: 'flex', gap: 12 }}>
          <button
            onClick={onClose}
            style={{ flex: 1, padding: '10px 16px', borderRadius: 8, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 13, cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={handleDone}
            style={{ flex: 2, padding: '10px 16px', borderRadius: 8, border: 'none', background: t.primary, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};


// ─── MAIN COMPONENT ───

export default function DashboardBuilder() {
  const { t } = useTheme();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Operational');
  const [selectedLayout, setSelectedLayout] = useState('3col');
  const [widgets, setWidgets] = useState([]);
  const [widgetFilter, setWidgetFilter] = useState('All');
  const [showLibrary, setShowLibrary] = useState(false);
  const [refreshRate, setRefreshRate] = useState('15min');
  const [access, setAccess] = useState('personal');
  const [published, setPublished] = useState(false);
  const [configuringWidgetId, setConfiguringWidgetId] = useState(null);

  const SI = ({ children }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
  const steps = [
    { label: 'Name & Purpose', icon: <SI><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></SI> },
    { label: 'Layout', icon: <SI><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></SI> },
    { label: 'Add Widgets', icon: <SI><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></SI> },
    { label: 'Configure', icon: <SI><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></SI> },
    { label: 'Preview & Publish', icon: <SI><polyline points="13 2 13 9 20 9"/><path d="M13 2L20 9 20 22 4 22 4 2z"/></SI> },
  ];

  const filteredWidgets = widgetFilter === 'All' ? widgetLibrary : widgetLibrary.filter(w => w.category === widgetFilter);

  const addWidget = (widget) => {
    const widgetType = widget.type || widget.id;
    const defaultConfig = getDefaultConfig(widgetType, widget.name);
    setWidgets(prev => [...prev, {
      ...widget,
      id: Date.now(),
      type: widgetType,
      metric: 'Select metric...',
      configured: false,
      config: defaultConfig,
    }]);
  };

  const removeWidget = (id) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
    if (configuringWidgetId === id) setConfiguringWidgetId(null);
  };

  const updateWidget = (updatedWidget) => {
    setWidgets(prev => prev.map(w => w.id === updatedWidget.id ? updatedWidget : w));
  };

  // Compute grid column span for a widget based on its config size and the layout
  const getGridSpan = (widget) => {
    const size = widget.config?.widgetSize;
    const layoutCols = layouts.find(l => l.id === selectedLayout)?.cols || 3;
    if (size === 'full') return layoutCols;
    if (size === '2col') return Math.min(2, layoutCols);
    return 1;
  };

  const renderPreviewWidget = (widget) => {
    const title = widget.config?.widgetTitle || widget.title || widget.name;
    const subtitle = widget.config?.widgetSubtitle;
    const widgetType = widget.type || widget.id;

    switch (widgetType) {
      case 'kpi': return <KPICard title={title} value="$284.5K" change="+12.4%" up sparkData={[40, 55, 48, 62, 58, 72, 68, 85]} sparkColor={t.success} />;
      case 'area': return <Widget title={title} subtitle={subtitle}><AreaChart data={[45, 52, 48, 61, 55, 72, 68, 85, 78, 92]} color={t.chart[0]} /></Widget>;
      case 'bar': return <Widget title={title} subtitle={subtitle}><BarChart data={[180, 220, 195, 250, 270]} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} colors={[t.chart[0]]} /></Widget>;
      case 'donut': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ textAlign: 'center' }}>
            <DonutChart value={72} size={100} strokeWidth={12} color={t.chart[0]} />
          </div>
        </Widget>
      );
      case 'hbar': return (
        <Widget title={title} subtitle={subtitle}>
          <HorizontalBar items={[
            { label: 'Voice', value: 45, suffix: '%', color: t.chart[0] },
            { label: 'Chat', value: 28, suffix: '%', color: t.chart[1] },
            { label: 'Email', value: 15, suffix: '%', color: t.chart[2] },
          ]} maxVal={50} />
        </Widget>
      );
      case 'line': case 'multiline': return (
        <Widget title={title} subtitle={subtitle}>
          <AreaChart data={[35, 42, 58, 51, 65, 72, 68, 80, 75, 88]} color={t.chart[0]} />
          {widget.config?.showBenchmarkLine && (
            <div style={{ position: 'relative', marginTop: -30, borderTop: `2px dashed ${t.danger}`, padding: '2px 6px' }}>
              <span style={{ fontSize: 9, color: t.danger, fontWeight: 600 }}>{widget.config.benchmarkLabel || 'Benchmark'}: {widget.config.benchmarkValue || '--'}</span>
            </div>
          )}
        </Widget>
      );
      case 'gauge': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ textAlign: 'center' }}>
            <DonutChart value={widget.config?.gaugeTarget || 75} size={100} strokeWidth={14} color={t.chart[0]} />
            <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 4 }}>
              {widget.config?.gaugeMin ?? 0} - {widget.config?.gaugeMax ?? 100} | Target: {widget.config?.gaugeTarget ?? 80}
            </div>
          </div>
        </Widget>
      );
      case 'stacked': case 'grouped': return (
        <Widget title={title} subtitle={subtitle}>
          <BarChart data={[180, 220, 195, 250, 270]} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} colors={[t.chart[0]]} />
          <div style={{ textAlign: 'center', fontSize: 10, color: t.textTertiary, marginTop: 4 }}>Mode: {widget.config?.barMode || 'grouped'}</div>
        </Widget>
      );
      case 'combo': return (
        <Widget title={title} subtitle={subtitle}>
          <BarChart data={[180, 220, 195, 250, 270]} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} colors={[t.chart[0]]} />
        </Widget>
      );
      case 'scatter': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="120" height="70" viewBox="0 0 120 70">
              <circle cx="20" cy="50" r="4" fill={t.chart[0]} opacity="0.7" />
              <circle cx="35" cy="35" r="5" fill={t.chart[0]} opacity="0.7" />
              <circle cx="55" cy="25" r="4" fill={t.chart[0]} opacity="0.7" />
              <circle cx="70" cy="40" r="6" fill={t.chart[0]} opacity="0.7" />
              <circle cx="90" cy="15" r="4" fill={t.chart[0]} opacity="0.7" />
              <circle cx="105" cy="30" r="5" fill={t.chart[0]} opacity="0.7" />
            </svg>
          </div>
        </Widget>
      );
      case 'radar': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary }}>
            {widgetIcons.radar}
            <span style={{ fontSize: 12, color: t.textTertiary, marginLeft: 8 }}>Radar Chart</span>
          </div>
        </Widget>
      );
      case 'funnel': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '4px 0' }}>
            {[{ w: '100%', label: 'Leads', val: 1200 }, { w: '75%', label: 'Qualified', val: 900 }, { w: '50%', label: 'Proposal', val: 600 }, { w: '30%', label: 'Closed', val: 360 }].map((s, i) => (
              <div key={i} style={{ width: s.w, margin: '0 auto', background: t.chart[i] || t.chart[0], borderRadius: 4, padding: '4px 8px', fontSize: 10, color: '#fff', textAlign: 'center', opacity: 0.85 }}>
                {s.label}: {s.val}
              </div>
            ))}
          </div>
        </Widget>
      );
      case 'table': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ fontSize: 11 }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${t.border}`, padding: '4px 0', fontWeight: 600, color: t.textSecondary }}>
              {(widget.config?.tableColumns || 'Name,Value,Status').split(',').slice(0, 4).map((col, i) => (
                <div key={i} style={{ flex: 1, padding: '0 4px' }}>{col.trim()}</div>
              ))}
            </div>
            {[1, 2, 3].map(row => (
              <div key={row} style={{ display: 'flex', borderBottom: `1px solid ${t.borderSubtle}`, padding: '4px 0', color: t.text }}>
                {(widget.config?.tableColumns || 'Name,Value,Status').split(',').slice(0, 4).map((_, i) => (
                  <div key={i} style={{ flex: 1, padding: '0 4px', color: t.textTertiary }}>--</div>
                ))}
              </div>
            ))}
          </div>
        </Widget>
      );
      case 'heatmap': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, padding: '4px 0' }}>
            {Array.from({ length: 35 }, (_, i) => {
              const opacity = [0.15, 0.3, 0.5, 0.7, 0.9][Math.floor(Math.random() * 5)];
              return <div key={i} style={{ height: 10, borderRadius: 2, background: t.chart[0], opacity }} />;
            })}
          </div>
        </Widget>
      );
      case 'treemap': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2, height: 70 }}>
            {t.chart.slice(0, 4).map((c, i) => (
              <div key={i} style={{ background: c, borderRadius: 4, opacity: 0.7, gridRow: i === 0 ? 'span 2' : undefined }} />
            ))}
          </div>
        </Widget>
      );
      case 'waterfall': return (
        <Widget title={title} subtitle={subtitle}>
          <BarChart data={[200, 50, -30, 80, -20, 280]} labels={['Start', '+Rev', '-Cost', '+Other', '-Tax', 'End']} colors={[t.chart[0]]} />
        </Widget>
      );
      case 'histogram': return (
        <Widget title={title} subtitle={subtitle}>
          <BarChart data={[20, 45, 80, 120, 90, 55, 25]} labels={['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60+']} colors={[t.chart[0]]} />
        </Widget>
      );
      case 'boxplot': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary }}>
            {widgetIcons.boxplot}
            <span style={{ fontSize: 12, color: t.textTertiary, marginLeft: 8 }}>Box Plot</span>
          </div>
        </Widget>
      );
      case 'sankey': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary }}>
            {widgetIcons.sankey}
            <span style={{ fontSize: 12, color: t.textTertiary, marginLeft: 8 }}>Sankey Diagram</span>
          </div>
        </Widget>
      );
      case 'calendar': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, padding: '4px 0' }}>
            {Array.from({ length: 28 }, (_, i) => {
              const opacity = [0.1, 0.25, 0.45, 0.65, 0.85][Math.floor(Math.random() * 5)];
              return <div key={i} style={{ height: 10, borderRadius: 2, background: t.success, opacity }} />;
            })}
          </div>
        </Widget>
      );
      case 'bullet': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ padding: '8px 0' }}>
            <div style={{ height: 20, borderRadius: 4, background: t.surfaceAlt, position: 'relative', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '85%', background: t.chart[0], borderRadius: 4, opacity: 0.3 }} />
              <div style={{ height: '100%', width: '65%', background: t.chart[0], borderRadius: 4, position: 'absolute', top: 0, left: 0 }} />
              <div style={{ position: 'absolute', top: 0, left: '80%', width: 2, height: '100%', background: t.text }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: t.textTertiary, marginTop: 4 }}>
              <span>Actual: 65%</span><span>Target: 80%</span>
            </div>
          </div>
        </Widget>
      );
      case 'stat': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: t.text }}>1,247</div>
            <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 2 }}>Total Count</div>
          </div>
        </Widget>
      );
      case 'progress': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
              <span style={{ fontWeight: 600, color: t.text }}>72%</span>
              <span style={{ color: t.textTertiary }}>Target: {widget.config?.gaugeTarget ?? 100}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: t.surfaceAlt }}>
              <div style={{ height: '100%', width: '72%', borderRadius: 4, background: t.primary }} />
            </div>
          </div>
        </Widget>
      );
      case 'alert': return (
        <Widget title={title} subtitle={subtitle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11 }}>
            {[{ msg: 'Handle time exceeded threshold', sev: t.danger }, { msg: 'CSAT dropped below target', sev: t.warning }, { msg: 'Queue volume spike detected', sev: t.warning }].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6, background: t.surfaceAlt }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.sev, flexShrink: 0 }} />
                <span style={{ color: t.text }}>{a.msg}</span>
              </div>
            ))}
          </div>
        </Widget>
      );
      default: return (
        <Card style={{ padding: 20, textAlign: 'center', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <span style={{ display: 'flex', alignItems: 'center', color: t.primary }}>{widgetIcons[widgetType] || widgetIcons.kpi}</span>
            <div style={{ fontSize: 13, fontWeight: 500, color: t.text, marginTop: 4 }}>{title}</div>
            <div style={{ fontSize: 11, color: t.textTertiary }}>{widget.desc || 'Widget preview'}</div>
          </div>
        </Card>
      );
    }
  };

  // Widget being configured
  const configuringWidget = configuringWidgetId ? widgets.find(w => w.id === configuringWidgetId) : null;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DashboardHeader title="Custom Dashboard Builder" subtitle="Create personalized dashboards with drag-and-drop simplicity" />

      {/* Step Indicator */}
      <div style={{ padding: '16px 32px', background: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', gap: 0, maxWidth: 700, margin: '0 auto' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <button onClick={() => setStep(i)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent', cursor: 'pointer', padding: '6px 0' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i <= step ? t.primary : t.surfaceAlt, color: i <= step ? '#fff' : t.textTertiary, fontSize: 14, fontWeight: 600,
                  transition: 'all 0.3s',
                }}>
                  {i < step ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : s.icon}
                </div>
                <span style={{ fontSize: 12, fontWeight: i === step ? 600 : 400, color: i === step ? t.primary : t.textTertiary, whiteSpace: 'nowrap' }}>{s.label}</span>
              </button>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? t.primary : t.border, margin: '0 8px', transition: 'background 0.3s' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
        {/* Step 0: Name & Purpose */}
        {step === 0 && (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <SectionTitle subtitle="Give your dashboard a name and select its purpose">Name & Purpose</SectionTitle>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: t.text, marginBottom: 6 }}>Dashboard Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., My Weekly Review"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 14, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: t.text, marginBottom: 6 }}>Description (optional)</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What is this dashboard for?" rows={3}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: t.text, marginBottom: 10 }}>Category</label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {['Operational', 'Financial', 'Customer Experience', 'AI & Automation', 'HR & Training', 'Custom'].map(cat => (
                      <button key={cat} onClick={() => setCategory(cat)}
                        style={{ padding: '10px 18px', borderRadius: 10, border: `1px solid ${category === cat ? t.primary : t.border}`, background: category === cat ? t.primaryLight : 'transparent', color: category === cat ? t.primary : t.textSecondary, fontSize: 13, fontWeight: category === cat ? 600 : 400, cursor: 'pointer' }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 1: Layout */}
        {step === 1 && (
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <SectionTitle subtitle="Choose a grid layout for your dashboard">Select Layout</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
              {layouts.map(layout => (
                <Card key={layout.id} onClick={() => setSelectedLayout(layout.id)}
                  style={{ padding: 20, textAlign: 'center', cursor: 'pointer', border: `2px solid ${selectedLayout === layout.id ? t.primary : t.border}`, transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 28, letterSpacing: 4, color: selectedLayout === layout.id ? t.primary : t.textTertiary, marginBottom: 8 }}>{layout.preview}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{layout.name}</div>
                </Card>
              ))}
            </div>
            <Card style={{ marginTop: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 12 }}>Preview</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${layouts.find(l => l.id === selectedLayout)?.cols || 3}, 1fr)`, gap: 12, minHeight: 200 }}>
                {Array.from({ length: layouts.find(l => l.id === selectedLayout)?.cols === 1 ? 2 : layouts.find(l => l.id === selectedLayout)?.cols * 2 || 6 }, (_, i) => (
                  <div key={i} style={{ height: 80, borderRadius: 10, border: `2px dashed ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textTertiary, fontSize: 12 }}>
                    Slot {i + 1}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Add Widgets */}
        {step === 2 && (
          <div style={{ display: 'flex', gap: 24 }}>
            {/* Canvas */}
            <div style={{ flex: 1 }}>
              <SectionTitle subtitle="Click widgets from the library to add them to your dashboard">Dashboard Canvas</SectionTitle>
              {widgets.length === 0 ? (
                <Card style={{ padding: 60, textAlign: 'center' }}>
                  <span style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, color: t.textTertiary }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg></span>
                  <div style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 4 }}>No widgets added yet</div>
                  <div style={{ fontSize: 13, color: t.textTertiary }}>Click widgets from the library panel to add them here</div>
                </Card>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${layouts.find(l => l.id === selectedLayout)?.cols || 3}, 1fr)`, gap: 16 }}>
                  {widgets.map(w => (
                    <div key={w.id} style={{ position: 'relative', gridColumn: `span ${getGridSpan(w)}` }}>
                      <div
                        onClick={() => setConfiguringWidgetId(w.id)}
                        style={{ cursor: 'pointer', borderRadius: 12, border: `2px solid ${w.configured ? t.success : t.border}`, transition: 'border-color 0.2s', overflow: 'hidden' }}
                        onMouseEnter={e => { if (!w.configured) e.currentTarget.style.borderColor = t.primary; }}
                        onMouseLeave={e => { if (!w.configured) e.currentTarget.style.borderColor = t.border; }}
                      >
                        {renderPreviewWidget(w)}
                        {/* Configuration status badge */}
                        <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
                          <Badge variant={w.configured ? 'success' : 'default'}>
                            {w.configured ? 'Configured' : 'Click to configure'}
                          </Badge>
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); removeWidget(w.id); }}
                        style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', border: 'none', background: t.danger, color: '#fff', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>✕</button>
                    </div>
                  ))}
                  <div onClick={() => setShowLibrary(true)}
                    style={{ minHeight: 120, borderRadius: 12, border: `2px dashed ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.textTertiary, fontSize: 13, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = t.primary; e.currentTarget.style.color = t.primary; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textTertiary; }}>
                    + Add Widget
                  </div>
                </div>
              )}
            </div>

            {/* Widget Library */}
            <div style={{ width: 320, flexShrink: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 12 }}>Widget Library</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setWidgetFilter(cat)}
                    style={{ padding: '4px 10px', borderRadius: 12, border: `1px solid ${widgetFilter === cat ? t.primary : t.border}`, background: widgetFilter === cat ? t.primaryLight : 'transparent', color: widgetFilter === cat ? t.primary : t.textTertiary, fontSize: 10, cursor: 'pointer' }}>
                    {cat}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 600, overflowY: 'auto' }}>
                {filteredWidgets.map(w => (
                  <div key={w.id} onClick={() => addWidget(w)}
                    style={{ padding: '10px 12px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = t.primary; e.currentTarget.style.background = t.primaryLight; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.surface; }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: t.primary }}>{widgetIcons[w.id] || widgetIcons.kpi}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{w.name}</div>
                      <div style={{ fontSize: 10, color: t.textTertiary }}>{w.desc}</div>
                    </div>
                    <Badge variant="primary">{w.category}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Configure */}
        {step === 3 && (
          <div>
            <SectionTitle subtitle="Click any widget to configure its data source, fields, and appearance">Configure Widgets</SectionTitle>

            {widgets.length === 0 ? (
              <Card style={{ padding: 60, textAlign: 'center' }}>
                <span style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, color: t.textTertiary }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </span>
                <div style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 4 }}>No widgets to configure</div>
                <div style={{ fontSize: 13, color: t.textTertiary, marginBottom: 16 }}>Go back to Step 3 to add widgets first</div>
                <button onClick={() => setStep(2)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: t.primary, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                  Go to Add Widgets
                </button>
              </Card>
            ) : (
              <>
                {/* Summary bar */}
                <Card style={{ padding: '12px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13, color: t.textSecondary }}>{widgets.length} widget{widgets.length !== 1 ? 's' : ''} added</span>
                    <span style={{ width: 1, height: 16, background: t.border }} />
                    <span style={{ fontSize: 13, color: t.success, fontWeight: 500 }}>{widgets.filter(w => w.configured).length} configured</span>
                    {widgets.filter(w => !w.configured).length > 0 && (
                      <>
                        <span style={{ width: 1, height: 16, background: t.border }} />
                        <span style={{ fontSize: 13, color: t.warning, fontWeight: 500 }}>{widgets.filter(w => !w.configured).length} pending</span>
                      </>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: t.textTertiary }}>Click a widget to configure it</div>
                </Card>

                {/* Dashboard-level settings */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <Card style={{ padding: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 12 }}>Dashboard Refresh Rate</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {[{ val: 'realtime', label: 'Real-time' }, { val: '5min', label: '5 min' }, { val: '15min', label: '15 min' }, { val: 'hourly', label: 'Hourly' }, { val: 'daily', label: 'Daily' }, { val: 'manual', label: 'Manual' }].map(opt => (
                        <button key={opt.val} onClick={() => setRefreshRate(opt.val)}
                          style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${refreshRate === opt.val ? t.primary : t.border}`, background: refreshRate === opt.val ? t.primaryLight : 'transparent', color: refreshRate === opt.val ? t.primary : t.textSecondary, fontSize: 12, fontWeight: refreshRate === opt.val ? 600 : 400, cursor: 'pointer' }}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </Card>
                  <Card style={{ padding: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 12 }}>Access Level</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {[
                        { val: 'personal', label: 'Personal' },
                        { val: 'team', label: 'My Team' },
                        { val: 'org', label: 'Organization' },
                        { val: 'specific', label: 'Specific Users' },
                      ].map(opt => (
                        <button key={opt.val} onClick={() => setAccess(opt.val)}
                          style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${access === opt.val ? t.primary : t.border}`, background: access === opt.val ? t.primaryLight : 'transparent', color: access === opt.val ? t.primary : t.textSecondary, fontSize: 12, fontWeight: access === opt.val ? 600 : 400, cursor: 'pointer' }}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Widget cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${layouts.find(l => l.id === selectedLayout)?.cols || 3}, 1fr)`, gap: 16 }}>
                  {widgets.map(w => (
                    <div
                      key={w.id}
                      onClick={() => setConfiguringWidgetId(w.id)}
                      style={{
                        position: 'relative', cursor: 'pointer', borderRadius: 12,
                        border: `2px solid ${w.configured ? t.success : t.warning}`,
                        transition: 'all 0.2s', overflow: 'hidden',
                        gridColumn: `span ${getGridSpan(w)}`,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = t.shadowMd; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                    >
                      {renderPreviewWidget(w)}

                      {/* Config overlay on hover */}
                      <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: 0, transition: 'opacity 0.2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = '0'; }}
                      >
                        <div style={{ padding: '6px 16px', borderRadius: 8, background: t.primary, color: '#fff', fontSize: 12, fontWeight: 600, boxShadow: t.shadowMd }}>
                          Configure
                        </div>
                      </div>

                      {/* Status badge */}
                      <div style={{ position: 'absolute', top: 8, right: 8 }}>
                        <Badge variant={w.configured ? 'success' : 'warning'}>
                          {w.configured ? 'Configured' : 'Pending'}
                        </Badge>
                      </div>

                      {/* Config summary */}
                      {w.configured && w.config && (
                        <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: t.surfaceAlt, color: t.textTertiary }}>
                            {dataSources.find(ds => ds.value === w.config.dataSource)?.label || 'ACD Data'}
                          </span>
                          <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: t.surfaceAlt, color: t.textTertiary }}>
                            {refreshIntervals.find(ri => ri.value === w.config.refreshInterval)?.label || '5min'}
                          </span>
                          <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: t.surfaceAlt, color: t.textTertiary }}>
                            {widgetSizeOptions.find(sz => sz.value === w.config.widgetSize)?.label || '1 Col'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 4: Preview */}
        {step === 4 && (
          <div>
            {published ? (
              <div style={{ textAlign: 'center', padding: '80px 40px' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: t.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={t.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 8 }}>Dashboard Published!</div>
                <div style={{ fontSize: 14, color: t.textTertiary, marginBottom: 32 }}>"{name || 'Untitled Dashboard'}" is now live and accessible based on your access settings.</div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <button onClick={() => { setPublished(false); setStep(0); setWidgets([]); setName(''); setDescription(''); }}
                    style={{ padding: '10px 24px', borderRadius: 8, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 14, cursor: 'pointer' }}>
                    Create Another
                  </button>
                  <button onClick={() => window.history.back()}
                    style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: t.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    Back to Home
                  </button>
                </div>
              </div>
            ) : (
              <>
                <SectionTitle subtitle="Review your dashboard and publish when ready">Preview & Publish</SectionTitle>
                <Card style={{ padding: 20, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{name || 'Untitled Dashboard'}</div>
                      <div style={{ fontSize: 12, color: t.textTertiary }}>{description || 'No description'} &bull; {category} &bull; Refresh: {refreshRate} &bull; Access: {access}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setStep(2)} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit</button>
                      <button onClick={() => setPublished(true)} style={{ padding: '8px 24px', borderRadius: 8, border: 'none', background: t.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 13 9 20 9"/><path d="M13 2L20 9 20 22 4 22 4 2z"/></svg> Publish Dashboard</button>
                    </div>
                  </div>

                  {/* Widget configuration summary */}
                  {widgets.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, padding: '10px 14px', borderRadius: 8, background: t.surfaceAlt }}>
                      <span style={{ fontSize: 12, color: t.textSecondary }}>{widgets.length} widget{widgets.length !== 1 ? 's' : ''}</span>
                      <span style={{ color: t.border }}>|</span>
                      <span style={{ fontSize: 12, color: t.success }}>{widgets.filter(w => w.configured).length} configured</span>
                      {widgets.filter(w => !w.configured).length > 0 && (
                        <>
                          <span style={{ color: t.border }}>|</span>
                          <span style={{ fontSize: 12, color: t.warning }}>{widgets.filter(w => !w.configured).length} using defaults</span>
                        </>
                      )}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${layouts.find(l => l.id === selectedLayout)?.cols || 3}, 1fr)`, gap: 16 }}>
                    {widgets.length > 0 ? widgets.map(w => (
                      <div key={w.id} style={{ gridColumn: `span ${getGridSpan(w)}` }}>
                        {renderPreviewWidget(w)}
                        {/* Config detail strip */}
                        {w.config && (
                          <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: t.primaryLight, color: t.primary }}>
                              {dataSources.find(ds => ds.value === w.config.dataSource)?.label || 'ACD'}
                            </span>
                            <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: t.surfaceAlt, color: t.textTertiary }}>
                              {colorSchemes.find(cs => cs.id === w.config.colorScheme)?.name || 'Default'} palette
                            </span>
                            <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: t.surfaceAlt, color: t.textTertiary }}>
                              Refresh: {refreshIntervals.find(ri => ri.value === w.config.refreshInterval)?.label || 'Manual'}
                            </span>
                          </div>
                        )}
                      </div>
                    )) : sampleWidgets.map((w, i) => (
                      <div key={i}>{renderPreviewWidget(w)}</div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ padding: '12px 32px', borderTop: `1px solid ${t.border}`, background: t.surface, display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          style={{ padding: '8px 20px', borderRadius: 8, border: `1px solid ${t.border}`, background: 'transparent', color: step === 0 ? t.textTertiary : t.textSecondary, fontSize: 13, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.5 : 1 }}>
          &larr; Back
        </button>
        <div style={{ display: 'flex', gap: 4 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= step ? t.primary : t.border, transition: 'background 0.3s' }} />
          ))}
        </div>
        <button onClick={() => {
          if (step === steps.length - 1) { setPublished(true); }
          else { setStep(Math.min(steps.length - 1, step + 1)); }
        }}
          disabled={published}
          style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: published ? t.textTertiary : t.primary, color: '#fff', fontSize: 13, fontWeight: 500, cursor: published ? 'default' : 'pointer', opacity: published ? 0.5 : 1 }}>
          {step === steps.length - 1 ? 'Publish Dashboard' : 'Next \u2192'}
        </button>
      </div>

      {/* Widget Configuration Panel (rendered as overlay when configuring) */}
      {configuringWidget && (
        <WidgetConfigPanel
          widget={configuringWidget}
          onUpdate={updateWidget}
          onClose={() => setConfiguringWidgetId(null)}
          t={t}
        />
      )}
    </div>
  );
}
