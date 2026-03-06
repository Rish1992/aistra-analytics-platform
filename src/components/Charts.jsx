import { useTheme } from '../context/ThemeContext';

// ─── SPARKLINE ───
export const Sparkline = ({ data, color, width = 120, height = 36 }) => {
  if (!data?.length) return null;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ');
  const id = `sg-${color?.replace('#', '')}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${height} ${pts} ${width},${height}`} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ─── MINI BAR ───
export const MiniBar = ({ data, color, width = 100, height = 32 }) => {
  if (!data?.length) return null;
  const max = Math.max(...data);
  const barW = (width / data.length) * 0.7, gap = (width / data.length) * 0.3;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {data.map((v, i) => {
        const h = (v / max) * (height - 2);
        return <rect key={i} x={i * (barW + gap)} y={height - h} width={barW} rx="2" height={h} fill={color} opacity={0.3 + (v / max) * 0.7} />;
      })}
    </svg>
  );
};

// ─── DONUT CHART ───
export const DonutChart = ({ value, size = 80, strokeWidth = 8, color, bgColor }) => {
  const { t } = useTheme();
  const bg = bgColor || t.surfaceAlt;
  const r = (size - strokeWidth) / 2, circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(value, 100) / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
    </svg>
  );
};

// ─── BAR CHART ───
export const BarChart = ({ data, labels, colors, width = 400, height = 200 }) => {
  const { t } = useTheme();
  if (!data?.length) return null;
  const flatData = Array.isArray(data[0]) ? data.flat() : data;
  const max = Math.max(...flatData) * 1.1 || 1;
  const groupW = width / labels.length;
  const isMulti = Array.isArray(data[0]);
  const barW = isMulti ? groupW * 0.3 : groupW * 0.5;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height + 30}`} preserveAspectRatio="xMidYMid meet">
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <g key={i}>
          <line x1="0" y1={height - f * height} x2={width} y2={height - f * height} stroke={t.border} strokeWidth="0.5" />
          <text x="-4" y={height - f * height + 4} fill={t.textTertiary} fontSize="9" textAnchor="end">{Math.round(max * f)}</text>
        </g>
      ))}
      {labels.map((label, li) => {
        const cx = li * groupW + groupW / 2;
        return (
          <g key={li}>
            {(isMulti ? data : [data]).map((series, si) => {
              const val = isMulti ? series[li] : data[li];
              const h = (val / max) * height;
              const numSeries = isMulti ? data.length : 1;
              const x = cx - (barW * numSeries) / 2 + si * barW;
              return <rect key={si} x={x} y={height - h} width={barW - 2} height={h} rx="3" fill={colors[si % colors.length]} style={{ transition: 'height 0.5s ease, y 0.5s ease' }} />;
            })}
            <text x={cx} y={height + 16} fill={t.textTertiary} fontSize="9" textAnchor="middle">{label}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── AREA CHART ───
export const AreaChart = ({ data, width = 400, height = 160, color }) => {
  const { t } = useTheme();
  if (!data?.length) return null;
  const max = Math.max(...data) * 1.1 || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - (v / max) * height}`).join(' ');
  const id = `area-${color?.replace('#', '')}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((f, i) => (
        <line key={i} x1="0" y1={height - f * height} x2={width} y2={height - f * height} stroke={t.border} strokeWidth="0.5" strokeDasharray="4 4" />
      ))}
      <polygon points={`0,${height} ${pts} ${width},${height}`} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ─── MULTI-LINE CHART ───
export const MultiLineChart = ({ series, labels, width = 400, height = 180, benchmarkLines = [] }) => {
  const { t } = useTheme();
  if (!series?.length) return null;
  const allVals = series.flatMap(s => s.data);
  const max = Math.max(...allVals, ...benchmarkLines.map(b => b.value)) * 1.1 || 1;
  const min = Math.min(...allVals, 0);
  const range = max - min || 1;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height + 24}`} preserveAspectRatio="xMidYMid meet">
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <g key={i}>
          <line x1="30" y1={height - f * height} x2={width} y2={height - f * height} stroke={t.border} strokeWidth="0.5" />
          <text x="26" y={height - f * height + 3} fill={t.textTertiary} fontSize="8" textAnchor="end">{Math.round(min + range * f)}</text>
        </g>
      ))}
      {benchmarkLines.map((bl, i) => (
        <g key={`bl-${i}`}>
          <line x1="30" y1={height - ((bl.value - min) / range) * height} x2={width} y2={height - ((bl.value - min) / range) * height}
            stroke={bl.color || t.danger} strokeWidth="1" strokeDasharray="6 3" />
          <text x={width + 2} y={height - ((bl.value - min) / range) * height + 3} fill={bl.color || t.danger} fontSize="8">{bl.label}</text>
        </g>
      ))}
      {series.map((s, si) => {
        const pts = s.data.map((v, i) => `${30 + (i / (s.data.length - 1)) * (width - 30)},${height - ((v - min) / range) * height}`).join(' ');
        return <polyline key={si} points={pts} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={s.dashed ? 0.5 : 1} strokeDasharray={s.dashed ? '6 3' : 'none'} />;
      })}
      {labels?.map((l, i) => (
        <text key={i} x={30 + (i / (labels.length - 1)) * (width - 30)} y={height + 14} fill={t.textTertiary} fontSize="8" textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
};

// ─── HORIZONTAL BAR ───
export const HorizontalBar = ({ items, maxVal }) => {
  const { t } = useTheme();
  const max = maxVal || Math.max(...items.map(i => i.value)) || 1;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: t.textSecondary }}>{item.label}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{item.value}{item.suffix || ''}</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(item.value / max) * 100}%`, borderRadius: 3, background: item.color, transition: 'width 0.6s ease' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── GAUGE CHART ───
export const GaugeChart = ({ value, min = 0, max = 100, zones, size = 160, label }) => {
  const { t } = useTheme();
  const defaultZones = [
    { from: 0, to: 70, color: t.danger },
    { from: 70, to: 85, color: t.warning },
    { from: 85, to: 100, color: t.success },
  ];
  const zoneList = zones || defaultZones;
  const cx = size / 2, cy = size * 0.6, r = size * 0.4;
  const angleRange = Math.PI;
  const valAngle = Math.PI + ((value - min) / (max - min)) * angleRange;
  return (
    <svg width={size} height={size * 0.88} viewBox={`0 0 ${size} ${size * 0.88}`}>
      {zoneList.map((z, i) => {
        const startAngle = Math.PI + ((z.from - min) / (max - min)) * angleRange;
        const endAngle = Math.PI + ((z.to - min) / (max - min)) * angleRange;
        const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle), y2 = cy + r * Math.sin(endAngle);
        const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
        return <path key={i} d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`} fill="none" stroke={z.color} strokeWidth={size * 0.08} strokeLinecap="round" opacity="0.3" />;
      })}
      <line x1={cx} y1={cy} x2={cx + (r - 10) * Math.cos(valAngle)} y2={cy + (r - 10) * Math.sin(valAngle)}
        stroke={t.text} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill={t.text} />
      <text x={cx} y={cy + 20} fill={t.text} fontSize="20" fontWeight="700" textAnchor="middle">{value}%</text>
      {label && <text x={cx} y={cy + 34} fill={t.textTertiary} fontSize="10" textAnchor="middle">{label}</text>}
    </svg>
  );
};

// ─── HEATMAP ───
export const Heatmap = ({ data, rowLabels, colLabels, colorScale, width = 500, height }) => {
  const { t } = useTheme();
  if (!data?.length) return null;
  const allVals = data.flat();
  const minVal = Math.min(...allVals), maxVal = Math.max(...allVals);
  const range = maxVal - minVal || 1;
  const cellH = 28, cellW = Math.min(50, (width - 100) / colLabels.length);
  const totalH = height || (data.length * cellH + 30);
  const getColor = (val) => {
    const pct = (val - minVal) / range;
    if (colorScale === 'diverging') {
      if (pct > 0.5) return `rgba(13,150,104,${(pct - 0.5) * 2 * 0.8 + 0.1})`;
      return `rgba(220,38,38,${(0.5 - pct) * 2 * 0.8 + 0.1})`;
    }
    return `rgba(37,99,235,${pct * 0.8 + 0.1})`;
  };
  return (
    <svg width="100%" viewBox={`0 0 ${100 + colLabels.length * cellW} ${totalH}`} preserveAspectRatio="xMidYMid meet">
      {colLabels.map((l, i) => (
        <text key={i} x={100 + i * cellW + cellW / 2} y="12" fill={t.textTertiary} fontSize="8" textAnchor="middle">{l}</text>
      ))}
      {data.map((row, ri) => (
        <g key={ri}>
          <text x="96" y={20 + ri * cellH + cellH / 2 + 3} fill={t.textSecondary} fontSize="9" textAnchor="end">{rowLabels[ri]}</text>
          {row.map((val, ci) => (
            <g key={ci}>
              <rect x={100 + ci * cellW} y={20 + ri * cellH} width={cellW - 1} height={cellH - 1} rx="3" fill={getColor(val)} />
              <text x={100 + ci * cellW + cellW / 2} y={20 + ri * cellH + cellH / 2 + 3} fill={t.text} fontSize="8" textAnchor="middle" fontWeight="500">{val}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
};

// ─── RADAR CHART ───
export const RadarChart = ({ dimensions, entities, size = 200 }) => {
  const { t } = useTheme();
  const cx = size / 2, cy = size / 2, r = size * 0.35;
  const n = dimensions.length;
  const angleStep = (2 * Math.PI) / n;
  const getPoint = (i, val) => ({
    x: cx + r * (val / 100) * Math.cos(angleStep * i - Math.PI / 2),
    y: cy + r * (val / 100) * Math.sin(angleStep * i - Math.PI / 2),
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.25, 0.5, 0.75, 1].map((f, fi) => (
        <polygon key={fi} points={dimensions.map((_, i) => { const p = getPoint(i, f * 100); return `${p.x},${p.y}`; }).join(' ')}
          fill="none" stroke={t.border} strokeWidth="0.5" />
      ))}
      {dimensions.map((d, i) => {
        const p = getPoint(i, 110);
        return <text key={i} x={p.x} y={p.y} fill={t.textSecondary} fontSize="9" textAnchor="middle" dominantBaseline="central">{d}</text>;
      })}
      {entities.map((ent, ei) => {
        const points = ent.values.map((v, i) => { const p = getPoint(i, v); return `${p.x},${p.y}`; }).join(' ');
        return (
          <g key={ei}>
            <polygon points={points} fill={ent.color} fillOpacity="0.15" stroke={ent.color} strokeWidth="2" strokeLinejoin="round" />
            {ent.values.map((v, i) => { const p = getPoint(i, v); return <circle key={i} cx={p.x} cy={p.y} r="3" fill={ent.color} />; })}
          </g>
        );
      })}
    </svg>
  );
};

// ─── FUNNEL CHART ───
export const FunnelChart = ({ stages, width = 360, height }) => {
  const { t } = useTheme();
  if (!stages?.length) return null;
  const maxVal = stages[0]?.value || 1;
  const stageH = 40, gap = 4;
  const totalH = height || stages.length * (stageH + gap);
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${totalH}`} preserveAspectRatio="xMidYMid meet">
      {stages.map((s, i) => {
        const pct = s.value / maxVal;
        const nextPct = stages[i + 1] ? stages[i + 1].value / maxVal : pct * 0.8;
        const w1 = pct * (width - 120), w2 = nextPct * (width - 120);
        const x1 = (width - 120 - w1) / 2 + 120, x2 = (width - 120 - w2) / 2 + 120;
        const y = i * (stageH + gap);
        const color = t.chart[i % t.chart.length];
        return (
          <g key={i}>
            <polygon points={`${x1},${y} ${x1 + w1},${y} ${x2 + w2},${y + stageH} ${x2},${y + stageH}`} fill={color} opacity="0.8" rx="4" />
            <text x="4" y={y + stageH / 2 + 4} fill={t.textSecondary} fontSize="10" fontWeight="500">{s.name}</text>
            <text x={width / 2 + 60} y={y + stageH / 2 + 4} fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle">{s.value.toLocaleString()}</text>
            {i > 0 && <text x={width - 4} y={y + stageH / 2 + 4} fill={t.textTertiary} fontSize="9" textAnchor="end">{Math.round((s.value / stages[i - 1].value) * 100)}%</text>}
          </g>
        );
      })}
    </svg>
  );
};

// ─── WATERFALL CHART ───
export const WaterfallChart = ({ items, width = 400, height = 200 }) => {
  const { t } = useTheme();
  if (!items?.length) return null;
  let running = 0;
  const processed = items.map(item => {
    const start = running;
    running += item.value;
    return { ...item, start, end: running };
  });
  const maxVal = Math.max(...processed.map(p => Math.max(p.start, p.end)));
  const minVal = Math.min(0, ...processed.map(p => Math.min(p.start, p.end)));
  const range = maxVal - minVal || 1;
  const barW = (width - 40) / items.length * 0.7;
  const gapW = (width - 40) / items.length * 0.3;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height + 30}`} preserveAspectRatio="xMidYMid meet">
      {processed.map((p, i) => {
        const x = 40 + i * (barW + gapW);
        const yTop = height - ((Math.max(p.start, p.end) - minVal) / range) * height;
        const yBot = height - ((Math.min(p.start, p.end) - minVal) / range) * height;
        const barH = yBot - yTop;
        const isTotal = p.isTotal;
        const color = isTotal ? t.primary : p.value >= 0 ? t.success : t.danger;
        return (
          <g key={i}>
            <rect x={x} y={yTop} width={barW} height={barH || 2} rx="3" fill={color} opacity="0.85" />
            <text x={x + barW / 2} y={yTop - 4} fill={t.text} fontSize="9" fontWeight="600" textAnchor="middle">{p.value >= 0 ? '+' : ''}{p.value}</text>
            <text x={x + barW / 2} y={height + 14} fill={t.textTertiary} fontSize="8" textAnchor="middle">{p.name}</text>
            {i < processed.length - 1 && !isTotal && (
              <line x1={x + barW} y1={height - ((p.end - minVal) / range) * height} x2={x + barW + gapW} y2={height - ((p.end - minVal) / range) * height} stroke={t.border} strokeWidth="1" strokeDasharray="3 2" />
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ─── TREEMAP ───
export const Treemap = ({ items, width = 400, height = 250 }) => {
  const { t } = useTheme();
  if (!items?.length) return null;
  const total = items.reduce((s, it) => s + it.value, 0);
  let x = 0;
  const rects = items.map(item => {
    const w = (item.value / total) * width;
    const rect = { ...item, x, y: 0, w, h: height };
    x += w;
    return rect;
  });
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      {rects.map((r, i) => (
        <g key={i}>
          <rect x={r.x + 1} y={1} width={r.w - 2} height={r.h - 2} rx="6" fill={r.color || t.chart[i % t.chart.length]} opacity="0.8" />
          {r.w > 50 && (
            <>
              <text x={r.x + r.w / 2} y={r.h / 2 - 6} fill="#fff" fontSize="11" fontWeight="600" textAnchor="middle">{r.label}</text>
              <text x={r.x + r.w / 2} y={r.h / 2 + 10} fill="rgba(255,255,255,0.8)" fontSize="10" textAnchor="middle">{r.value}{r.suffix || ''}</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
};

// ─── SCATTER PLOT ───
export const ScatterPlot = ({ points, xLabel, yLabel, width = 400, height = 250, showTrendLine }) => {
  const { t } = useTheme();
  if (!points?.length) return null;
  const xMax = Math.max(...points.map(p => p.x)) * 1.1;
  const yMax = Math.max(...points.map(p => p.y)) * 1.1;
  const pad = 40;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <line key={i} x1={pad} y1={height - pad - f * (height - 2 * pad)} x2={width - 10} y2={height - pad - f * (height - 2 * pad)} stroke={t.border} strokeWidth="0.5" />
      ))}
      {showTrendLine && points.length > 2 && (() => {
        const n = points.length;
        const sx = points.reduce((s, p) => s + p.x, 0), sy = points.reduce((s, p) => s + p.y, 0);
        const sxy = points.reduce((s, p) => s + p.x * p.y, 0), sxx = points.reduce((s, p) => s + p.x * p.x, 0);
        const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
        const intercept = (sy - slope * sx) / n;
        const x1 = 0, x2 = xMax;
        const y1v = intercept, y2v = slope * x2 + intercept;
        const px1 = pad + (x1 / xMax) * (width - pad - 10), py1 = height - pad - (y1v / yMax) * (height - 2 * pad);
        const px2 = pad + (x2 / xMax) * (width - pad - 10), py2 = height - pad - (y2v / yMax) * (height - 2 * pad);
        return <line x1={px1} y1={py1} x2={px2} y2={py2} stroke={t.textTertiary} strokeWidth="1" strokeDasharray="5 3" />;
      })()}
      {points.map((p, i) => {
        const px = pad + (p.x / xMax) * (width - pad - 10);
        const py = height - pad - (p.y / yMax) * (height - 2 * pad);
        return <circle key={i} cx={px} cy={py} r={p.size || 5} fill={p.color || t.chart[0]} opacity="0.7" />;
      })}
      {xLabel && <text x={width / 2} y={height - 4} fill={t.textTertiary} fontSize="9" textAnchor="middle">{xLabel}</text>}
      {yLabel && <text x="10" y={height / 2} fill={t.textTertiary} fontSize="9" textAnchor="middle" transform={`rotate(-90, 10, ${height / 2})`}>{yLabel}</text>}
    </svg>
  );
};

// ─── BULLET CHART ───
export const BulletChart = ({ items, width = 400 }) => {
  const { t } = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((item, i) => {
        const max = item.max || Math.max(item.actual, item.target) * 1.3;
        return (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: t.text }}>{item.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{item.actual}{item.unit || ''}</span>
            </div>
            <div style={{ position: 'relative', height: 20, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
                {(item.ranges || [{ pct: 60, color: t.dangerLight }, { pct: 80, color: t.warningLight }, { pct: 100, color: t.successLight }]).map((r, ri) => (
                  <div key={ri} style={{ width: `${r.pct - (ri > 0 ? item.ranges?.[ri - 1]?.pct || [60, 80][ri - 1] : 0)}%`, background: r.color }} />
                ))}
              </div>
              <div style={{ position: 'absolute', left: 0, top: 4, height: 12, width: `${(item.actual / max) * 100}%`, background: t.primary, borderRadius: 2, opacity: 0.9 }} />
              <div style={{ position: 'absolute', left: `${(item.target / max) * 100}%`, top: 0, width: 2, height: 20, background: t.text }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── COMBO / DUAL-AXIS CHART ───
export const ComboChart = ({ barData, lineData, labels, barColor, lineColor, barLabel, lineLabel, width = 400, height = 200 }) => {
  const { t } = useTheme();
  if (!barData?.length) return null;
  const barMax = Math.max(...barData) * 1.1 || 1;
  const lineMax = Math.max(...lineData) * 1.1 || 1;
  const groupW = width / labels.length;
  const barW = groupW * 0.5;
  return (
    <svg width="100%" viewBox={`0 0 ${width + 40} ${height + 30}`} preserveAspectRatio="xMidYMid meet">
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <line key={i} x1="0" y1={height - f * height} x2={width} y2={height - f * height} stroke={t.border} strokeWidth="0.5" />
      ))}
      {labels.map((label, li) => {
        const cx = li * groupW + groupW / 2;
        const h = (barData[li] / barMax) * height;
        return (
          <g key={li}>
            <rect x={cx - barW / 2} y={height - h} width={barW} height={h} rx="3" fill={barColor || t.chart[0]} opacity="0.7" />
            <text x={cx} y={height + 16} fill={t.textTertiary} fontSize="9" textAnchor="middle">{label}</text>
          </g>
        );
      })}
      {lineData && (() => {
        const pts = lineData.map((v, i) => {
          const cx = i * groupW + groupW / 2;
          return `${cx},${height - (v / lineMax) * height}`;
        }).join(' ');
        return (
          <>
            <polyline points={pts} fill="none" stroke={lineColor || t.chart[1]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {lineData.map((v, i) => {
              const cx = i * groupW + groupW / 2;
              return <circle key={i} cx={cx} cy={height - (v / lineMax) * height} r="3" fill={lineColor || t.chart[1]} />;
            })}
          </>
        );
      })()}
      {barLabel && <text x="0" y="-4" fill={barColor || t.chart[0]} fontSize="8">{barLabel}</text>}
      {lineLabel && <text x={width} y="-4" fill={lineColor || t.chart[1]} fontSize="8" textAnchor="end">{lineLabel}</text>}
    </svg>
  );
};

// ─── BOX PLOT ───
export const BoxPlot = ({ groups, width = 400, height = 200 }) => {
  const { t } = useTheme();
  if (!groups?.length) return null;
  const allVals = groups.flatMap(g => [g.min, g.max, g.q1, g.q3, g.median]);
  const maxVal = Math.max(...allVals) * 1.1, minVal = Math.min(...allVals) * 0.9;
  const range = maxVal - minVal || 1;
  const groupW = width / groups.length;
  const boxW = groupW * 0.5;
  const scaleY = (v) => height - ((v - minVal) / range) * height;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height + 24}`} preserveAspectRatio="xMidYMid meet">
      {groups.map((g, i) => {
        const cx = i * groupW + groupW / 2;
        return (
          <g key={i}>
            <line x1={cx} y1={scaleY(g.max)} x2={cx} y2={scaleY(g.q3)} stroke={t.textTertiary} strokeWidth="1" />
            <line x1={cx} y1={scaleY(g.q1)} x2={cx} y2={scaleY(g.min)} stroke={t.textTertiary} strokeWidth="1" />
            <line x1={cx - boxW * 0.3} y1={scaleY(g.max)} x2={cx + boxW * 0.3} y2={scaleY(g.max)} stroke={t.textTertiary} strokeWidth="1" />
            <line x1={cx - boxW * 0.3} y1={scaleY(g.min)} x2={cx + boxW * 0.3} y2={scaleY(g.min)} stroke={t.textTertiary} strokeWidth="1" />
            <rect x={cx - boxW / 2} y={scaleY(g.q3)} width={boxW} height={scaleY(g.q1) - scaleY(g.q3)} rx="3" fill={g.color || t.chart[0]} opacity="0.3" stroke={g.color || t.chart[0]} strokeWidth="1.5" />
            <line x1={cx - boxW / 2} y1={scaleY(g.median)} x2={cx + boxW / 2} y2={scaleY(g.median)} stroke={g.color || t.chart[0]} strokeWidth="2" />
            <text x={cx} y={height + 14} fill={t.textTertiary} fontSize="8" textAnchor="middle">{g.name}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── STACKED AREA CHART ───
export const StackedAreaChart = ({ series, labels, width = 400, height = 180 }) => {
  const { t } = useTheme();
  if (!series?.length) return null;
  const n = series[0].data.length;
  const totals = Array(n).fill(0);
  series.forEach(s => s.data.forEach((v, i) => totals[i] += v));
  const maxTotal = Math.max(...totals) * 1.1;
  const cumulative = series.map((_, si) =>
    Array(n).fill(0).map((_, di) => series.slice(0, si + 1).reduce((s, ser) => s + ser.data[di], 0))
  );
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height + 20}`} preserveAspectRatio="xMidYMid meet">
      {series.map((s, si) => {
        const upper = cumulative[si].map((v, i) => `${(i / (n - 1)) * width},${height - (v / maxTotal) * height}`);
        const lower = (si > 0 ? cumulative[si - 1] : Array(n).fill(0)).map((v, i) => `${(i / (n - 1)) * width},${height - (v / maxTotal) * height}`);
        const points = [...upper, ...lower.reverse()].join(' ');
        return <polygon key={si} points={points} fill={s.color} opacity="0.6" />;
      })}
      {labels?.map((l, i) => (
        <text key={i} x={(i / (n - 1)) * width} y={height + 14} fill={t.textTertiary} fontSize="8" textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
};

// ─── CALENDAR HEATMAP ───
export const CalendarHeatmap = ({ data, width = 700, height = 140, color }) => {
  const { t } = useTheme();
  const maxVal = Math.max(...data.map(d => d.value));
  const cellSize = 14, gap = 2;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
        <text key={i} x="0" y={20 + i * (cellSize + gap) + cellSize / 2} fill={t.textTertiary} fontSize="9" dominantBaseline="central">{d}</text>
      ))}
      {data.map((d, i) => {
        const week = Math.floor(i / 7), day = i % 7;
        const opacity = 0.1 + (d.value / maxVal) * 0.9;
        return (
          <rect key={i} x={20 + week * (cellSize + gap)} y={20 + day * (cellSize + gap)}
            width={cellSize} height={cellSize} rx="2" fill={color || t.chart[0]} opacity={opacity} />
        );
      })}
    </svg>
  );
};

// ─── SANKEY (Simplified) ───
export const SankeyDiagram = ({ nodes, links, width = 500, height = 300 }) => {
  const { t } = useTheme();
  if (!nodes?.length) return null;
  const columns = {};
  nodes.forEach(n => { if (!columns[n.col]) columns[n.col] = []; columns[n.col].push(n); });
  const colKeys = Object.keys(columns).sort((a, b) => a - b);
  const colWidth = (width - 100) / (colKeys.length - 1 || 1);
  const nodeWidth = 16;
  const nodePositions = {};
  colKeys.forEach(col => {
    const colNodes = columns[col];
    const totalVal = colNodes.reduce((s, n) => s + n.value, 0);
    let y = 20;
    colNodes.forEach(n => {
      const h = Math.max(20, (n.value / totalVal) * (height - 40));
      nodePositions[n.id] = { x: colKeys.indexOf(col) * colWidth + 40, y, h, color: n.color || t.chart[colKeys.indexOf(col) % t.chart.length] };
      y += h + 8;
    });
  });
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      {links.map((link, i) => {
        const src = nodePositions[link.source], tgt = nodePositions[link.target];
        if (!src || !tgt) return null;
        const thickness = Math.max(2, link.value / 20);
        return (
          <path key={i} d={`M${src.x + nodeWidth},${src.y + src.h / 2} C${(src.x + nodeWidth + tgt.x) / 2},${src.y + src.h / 2} ${(src.x + nodeWidth + tgt.x) / 2},${tgt.y + tgt.h / 2} ${tgt.x},${tgt.y + tgt.h / 2}`}
            fill="none" stroke={src.color} strokeWidth={thickness} opacity="0.25" />
        );
      })}
      {Object.entries(nodePositions).map(([id, pos]) => {
        const node = nodes.find(n => n.id === id);
        return (
          <g key={id}>
            <rect x={pos.x} y={pos.y} width={nodeWidth} height={pos.h} rx="3" fill={pos.color} />
            <text x={pos.x + nodeWidth + 4} y={pos.y + pos.h / 2 + 3} fill={t.textSecondary} fontSize="9">{node?.name}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── HISTOGRAM ───
export const HistogramChart = ({ bins, width = 400, height = 160 }) => {
  const { t } = useTheme();
  if (!bins?.length) return null;
  const max = Math.max(...bins.map(b => b.count));
  const barW = (width - 20) / bins.length;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height + 24}`} preserveAspectRatio="xMidYMid meet">
      {bins.map((bin, i) => {
        const h = (bin.count / max) * height;
        return (
          <g key={i}>
            <rect x={10 + i * barW} y={height - h} width={barW - 2} height={h} rx="2" fill={t.chart[0]} opacity="0.7" />
            <text x={10 + i * barW + barW / 2} y={height + 12} fill={t.textTertiary} fontSize="8" textAnchor="middle">{bin.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── STACKED BAR CHART ───
export const StackedBarChart = ({ categories, segments, data, width = 400, height = 200, horizontal = false }) => {
  const { t } = useTheme();
  if (!data?.length || !categories?.length) return null;

  if (horizontal) {
    const maxVal = Math.max(...data.map(row => row.reduce((s, v) => s + v, 0)));
    const barH = Math.min(28, (height - 20) / categories.length);
    return (
      <svg width="100%" viewBox={`0 0 ${width} ${categories.length * (barH + 6) + 10}`} preserveAspectRatio="xMidYMid meet">
        {categories.map((cat, ci) => {
          let x = 100;
          return (
            <g key={ci}>
              <text x="96" y={ci * (barH + 6) + barH / 2 + 4} fill={t.textSecondary} fontSize="9" textAnchor="end">{cat}</text>
              {data[ci]?.map((val, si) => {
                const w = (val / maxVal) * (width - 110);
                const rect = <rect key={si} x={x} y={ci * (barH + 6)} width={w} height={barH} fill={segments[si]?.color || t.chart[si]} rx="2" />;
                x += w;
                return rect;
              })}
            </g>
          );
        })}
      </svg>
    );
  }

  const maxVal = Math.max(...data.map(row => row.reduce((s, v) => s + v, 0)));
  const groupW = (width - 40) / categories.length;
  const barW = groupW * 0.6;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height + 24}`} preserveAspectRatio="xMidYMid meet">
      {categories.map((cat, ci) => {
        let y = height;
        const cx = 40 + ci * groupW + groupW / 2;
        return (
          <g key={ci}>
            {data[ci]?.map((val, si) => {
              const h = (val / maxVal) * height;
              y -= h;
              return <rect key={si} x={cx - barW / 2} y={y} width={barW} height={h} fill={segments[si]?.color || t.chart[si]} rx="2" />;
            })}
            <text x={cx} y={height + 14} fill={t.textTertiary} fontSize="8" textAnchor="middle">{cat}</text>
          </g>
        );
      })}
    </svg>
  );
};
