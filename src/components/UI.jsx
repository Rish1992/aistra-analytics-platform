import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sparkline, MiniBar, DonutChart } from './Charts';

// ─── INSIGHT PANEL (Slide-out overlay) ───
export const InsightPanel = ({ insight, open, onClose }) => {
  const { t } = useTheme();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    const handleClick = (e) => { if (panelRef.current && !panelRef.current.contains(e.target)) onClose(); };
    document.addEventListener('keydown', handleKey);
    setTimeout(() => document.addEventListener('mousedown', handleClick), 10);
    return () => { document.removeEventListener('keydown', handleKey); document.removeEventListener('mousedown', handleClick); };
  }, [open, onClose]);

  if (!open || !insight) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }} />
      <div ref={panelRef} style={{
        position: 'relative', width: 420, maxWidth: '90vw', height: '100vh', background: t.surface,
        borderLeft: `1px solid ${t.border}`, boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
        overflowY: 'auto', animation: 'slideInRight 0.25s ease-out',
      }}>
        <style>{`@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
        <div style={{ position: 'sticky', top: 0, zIndex: 1, background: t.surface, padding: '20px 24px 16px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Insights</div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✕</button>
          </div>
          {insight.title && <div style={{ fontSize: 13, color: t.textTertiary, marginTop: 4 }}>{insight.title}</div>}
        </div>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* What is this */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg></span>
              <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>What This Shows</span>
            </div>
            <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.6, margin: 0, padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>{insight.description}</p>
          </div>

          {/* Data Source */}
          {insight.dataSource && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: t.infoLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.info }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></span>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Data Source</span>
              </div>
              <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.6, margin: 0, padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>{insight.dataSource}</p>
            </div>
          )}

          {/* What it means */}
          {insight.meaning && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: t.warningLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.warning }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/></svg></span>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>What This Means</span>
              </div>
              <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.6, margin: 0, padding: '8px 12px', borderRadius: 8, background: t.surfaceAlt }}>{insight.meaning}</p>
            </div>
          )}

          {/* Action Items */}
          {insight.actions?.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: t.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.success }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Action Items</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {insight.actions.map((action, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 8, background: t.surfaceAlt, alignItems: 'flex-start' }}>
                    <span style={{ width: 20, height: 20, borderRadius: 6, background: t.successLight, color: t.success, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.5 }}>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Metrics callout */}
          {insight.metrics?.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: t.dangerLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.danger }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Key Metrics</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {insight.metrics.map((m, i) => (
                  <div key={i} style={{ padding: '10px 12px', borderRadius: 8, background: t.surfaceAlt, textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: t.textTertiary }}>{m.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: m.color || t.text, marginTop: 2 }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── CARD ───
export const Card = ({ children, style, onClick, ...props }) => {
  const { t } = useTheme();
  return (
    <div style={{ background: t.surface, borderRadius: 12, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: 24, ...style }} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

// ─── BADGE ───
export const Badge = ({ children, variant = 'primary' }) => {
  const { t } = useTheme();
  const styles = {
    primary: { bg: t.primaryLight, color: t.primary },
    success: { bg: t.successLight, color: t.success },
    warning: { bg: t.warningLight, color: t.warning },
    danger: { bg: t.dangerLight, color: t.danger },
    info: { bg: t.infoLight, color: t.info },
  };
  const s = styles[variant] || styles.primary;
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color, letterSpacing: 0.3 }}>{children}</span>;
};

// ─── STATUS DOT ───
export const StatusDot = ({ color, label }) => {
  const { t } = useTheme();
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: t.textSecondary }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}40`, flexShrink: 0 }} />
      {label}
    </span>
  );
};

// ─── KPI CARD ───
export const KPICard = ({ title, value, change, up, isGood, sparkData, sparkColor, icon, subtitle }) => {
  const { t } = useTheme();
  const trendColor = up ? (isGood !== false ? t.success : t.danger) : (isGood !== false ? t.danger : t.success);
  const trendVariant = up ? (isGood !== false ? 'success' : 'danger') : (isGood !== false ? 'danger' : 'success');
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: -1, lineHeight: 1 }}>{value}</div>
          {change && (
            <div style={{ marginTop: 8 }}>
              <Badge variant={trendVariant}>{up ? '↑' : '↓'} {change}</Badge>
            </div>
          )}
          {subtitle && <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 4 }}>{subtitle}</div>}
        </div>
        {sparkData && <Sparkline data={sparkData} color={sparkColor || trendColor} />}
      </div>
    </Card>
  );
};

// ─── STAT CARD ───
export const StatCard = ({ label, value, subtitle, color, icon, size = 'md' }) => {
  const { t } = useTheme();
  const sizes = { sm: { val: 20, pad: 12 }, md: { val: 28, pad: 16 }, lg: { val: 48, pad: 20 } };
  const s = sizes[size];
  return (
    <Card style={{ padding: s.pad, textAlign: 'center' }}>
      {icon && <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>}
      <div style={{ fontSize: 11, color: t.textTertiary, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: s.val, fontWeight: 700, color: color || t.text, letterSpacing: -0.5, margin: '4px 0' }}>{value}</div>
      {subtitle && <div style={{ fontSize: 10, color: t.textTertiary }}>{subtitle}</div>}
    </Card>
  );
};

// ─── PROGRESS CARD ───
export const ProgressCard = ({ label, current, target, unit = '%', color }) => {
  const { t } = useTheme();
  const pct = Math.min((current / target) * 100, 100);
  const barColor = color || (pct >= 90 ? t.success : pct >= 70 ? t.warning : t.danger);
  return (
    <Card style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: t.text }}>{current}{unit}</span>
        <span style={{ fontSize: 12, color: t.textTertiary }}>/ {target}{unit}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: barColor, transition: 'width 0.6s ease' }} />
      </div>
    </Card>
  );
};

// ─── COMPARISON CARD ───
export const ComparisonCard = ({ label, primaryValue, primaryLabel, secondaryValue, secondaryLabel, delta, deltaIsPositive }) => {
  const { t } = useTheme();
  return (
    <Card style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10, color: t.textTertiary }}>{primaryLabel}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: t.text }}>{primaryValue}</div>
        </div>
        <div style={{ fontSize: 10, color: t.textTertiary, marginBottom: 4 }}>vs</div>
        <div>
          <div style={{ fontSize: 10, color: t.textTertiary }}>{secondaryLabel}</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: t.textSecondary }}>{secondaryValue}</div>
        </div>
      </div>
      {delta && <div style={{ marginTop: 6 }}><Badge variant={deltaIsPositive ? 'success' : 'danger'}>{delta}</Badge></div>}
    </Card>
  );
};

// ─── GAUGE KPI CARD ───
export const GaugeKPICard = ({ title, value, target, color }) => {
  const { t } = useTheme();
  return (
    <Card style={{ padding: 20, textAlign: 'center' }}>
      <div style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 12 }}>{title}</div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <DonutChart value={value} size={100} strokeWidth={10} color={color || t.primary} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1 }}>{value}%</div>
        </div>
      </div>
      {target && <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 8 }}>{target}</div>}
    </Card>
  );
};

// ─── DATA TABLE ───
export const DataTable = ({ columns, rows, title, actions, pageSize = 5 }) => {
  const { t } = useTheme();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  let filteredRows = rows;
  if (search) {
    filteredRows = rows.filter(row =>
      columns.some(col => String(row[col.key]).toLowerCase().includes(search.toLowerCase()))
    );
  }
  if (sortCol) {
    filteredRows = [...filteredRows].sort((a, b) => {
      const av = a[sortCol], bv = b[sortCol];
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }
  const totalPages = Math.ceil(filteredRows.length / pageSize);
  const pageRows = filteredRows.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: t.text }}>{title}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
            style={{ padding: '7px 14px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, outline: 'none', width: 180 }} />
          {actions}
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}` }}>
              {columns.map(col => (
                <th key={col.key} onClick={() => { if (col.sortable !== false) { setSortCol(col.key); setSortDir(sortCol === col.key && sortDir === 'asc' ? 'desc' : 'asc'); } }}
                  style={{ padding: '10px 16px', textAlign: col.align || 'left', fontSize: 11, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, background: t.surfaceAlt, cursor: col.sortable !== false ? 'pointer' : 'default', whiteSpace: 'nowrap', userSelect: 'none' }}>
                  {col.label} {sortCol === col.key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: `1px solid ${t.borderSubtle}`, transition: 'background 0.15s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = t.surfaceHover}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '12px 16px', fontSize: 13, color: t.text, textAlign: col.align || 'left', ...col.style?.(row) }}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '12px 20px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: t.textTertiary }}>Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, filteredRows.length)} of {filteredRows.length}</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <button key={i} onClick={() => setPage(i)}
              style={{ width: 32, height: 32, borderRadius: 6, border: page === i ? 'none' : `1px solid ${t.border}`, background: page === i ? t.primary : 'transparent', color: page === i ? '#fff' : t.textSecondary, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

// ─── ALERT LIST ───
export const AlertList = ({ alerts }) => {
  const { t } = useTheme();
  const icons = { success: '✓', warning: '⚠', danger: '✕', info: 'ℹ' };
  const colors = {
    success: { bg: t.successLight, border: t.success, text: t.success },
    warning: { bg: t.warningLight, border: t.warning, text: t.warning },
    danger: { bg: t.dangerLight, border: t.danger, text: t.danger },
    info: { bg: t.infoLight, border: t.info, text: t.info },
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {alerts.map((alert, i) => {
        const c = colors[alert.severity] || colors.info;
        return (
          <div key={i} style={{ padding: '10px 14px', borderRadius: 8, background: c.bg, borderLeft: `3px solid ${c.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: c.text, fontWeight: 700, fontSize: 14 }}>{icons[alert.severity]}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{alert.title}</span>
              <span style={{ fontSize: 10, color: t.textTertiary, marginLeft: 'auto' }}>{alert.time}</span>
            </div>
            <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 2, marginLeft: 20 }}>{alert.message}</div>
          </div>
        );
      })}
    </div>
  );
};

// ─── FILTER BAR ───
export const FilterBar = ({ filters, values, onChange }) => {
  const { t } = useTheme();
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', padding: '16px 0', marginBottom: 8 }}>
      {filters.map((filter, i) => (
        <div key={i} style={{
          padding: '8px 16px', borderRadius: 10, border: `1px solid ${t.border}`,
          background: t.surface, fontSize: 13, color: t.textSecondary, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = t.primary; e.currentTarget.style.background = t.primaryLight; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.surface; }}>
          {filter.icon && <span style={{ display: 'flex', alignItems: 'center', color: t.textTertiary }}>{filter.icon === 'cal' ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> : filter.icon}</span>}
          <span style={{ fontSize: 12, color: t.textTertiary }}>{filter.label}</span>
          <strong style={{ color: t.text, fontSize: 13 }}>{values?.[filter.key] || filter.default}</strong>
          {filter.type === 'dropdown' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.textTertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          )}
        </div>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <button style={{ padding: '8px 18px', borderRadius: 10, border: `1px solid ${t.primary}`, background: t.primaryLight, fontSize: 13, color: t.primary, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>Apply</button>
        <button style={{ padding: '8px 14px', borderRadius: 10, border: `1px solid ${t.border}`, background: 'transparent', fontSize: 13, color: t.textTertiary, cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  );
};

// ─── TIME RANGE SELECTOR ───
export const TimeRangeSelector = ({ options = ['24h', '7d', '30d', '90d', '1y', 'All'], selected = '30d', onChange }) => {
  const { t } = useTheme();
  const [active, setActive] = useState(selected);
  const labels = { '24h': '24 Hours', '7d': '7 Days', '30d': '30 Days', '90d': '90 Days', '1y': '1 Year', 'All': 'All Time' };
  return (
    <div style={{ display: 'flex', borderRadius: 10, border: `1px solid ${t.border}`, overflow: 'hidden', background: t.surfaceAlt }}>
      {options.map((opt, i) => (
        <button key={i} onClick={() => { setActive(opt); onChange?.(opt); }}
          style={{
            padding: '8px 16px', border: 'none',
            background: active === opt ? t.primary : 'transparent',
            color: active === opt ? '#fff' : t.textSecondary,
            fontSize: 12, fontWeight: active === opt ? 600 : 400,
            cursor: 'pointer',
            borderRight: i < options.length - 1 ? `1px solid ${t.border}` : 'none',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
            minWidth: 52,
          }}>
          {labels[opt] || opt}
        </button>
      ))}
    </div>
  );
};

// ─── SECTION TITLE ───
export const SectionTitle = ({ children, subtitle }) => {
  const { t } = useTheme();
  return (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: t.text, margin: 0 }}>{children}</h3>
      {subtitle && <p style={{ fontSize: 12, color: t.textTertiary, margin: '2px 0 0' }}>{subtitle}</p>}
    </div>
  );
};

// ─── WIDGET CONTAINER ───
export const Widget = ({ title, subtitle, children, legend, style, insight }) => {
  const { t } = useTheme();
  const [insightOpen, setInsightOpen] = useState(false);
  return (
    <Card style={{ ...style }}>
      {(title || subtitle || legend || insight) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            {title && <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{title}</div>}
            {subtitle && <div style={{ fontSize: 12, color: t.textTertiary }}>{subtitle}</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {legend && <div style={{ display: 'flex', gap: 12 }}>{legend}</div>}
            {insight && (
              <button onClick={(e) => { e.stopPropagation(); setInsightOpen(true); }} title="View Insights" style={{
                width: 18, height: 18, borderRadius: 9, border: 'none', background: 'transparent',
                color: t.textTertiary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s', opacity: 0.4, padding: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = t.primary; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.4'; e.currentTarget.style.color = t.textTertiary; }}
              ><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></button>
            )}
          </div>
        </div>
      )}
      <div onClick={insight ? () => setInsightOpen(true) : undefined} style={insight ? { cursor: 'pointer' } : undefined}>
        {children}
      </div>
      {insight && <InsightPanel insight={{ title, ...insight }} open={insightOpen} onClose={() => setInsightOpen(false)} />}
    </Card>
  );
};

// ─── LIVE COUNTER ───
export const LiveCounter = ({ value, label, color }) => {
  const { t } = useTheme();
  const bg = color === t.primary ? t.primaryLight : color === t.success ? t.successLight : color === t.warning ? t.warningLight : color === t.danger ? t.dangerLight : t.primaryLight;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color, boxShadow: `0 0 0 3px ${bg}` }}>{value}</div>
      <span style={{ fontSize: 13, color: t.textSecondary, fontWeight: 500 }}>{label}</span>
    </div>
  );
};

// ─── AGENT TILE (for Wallboard) ───
export const AgentTile = ({ name, state, duration }) => {
  const { t } = useTheme();
  const stateColors = { available: t.success, 'on call': t.primary, wrap: t.warning, break: t.textTertiary, offline: t.danger };
  const color = stateColors[state?.toLowerCase()] || t.textTertiary;
  return (
    <div style={{ padding: '8px 10px', borderRadius: 8, background: t.surfaceAlt, border: `2px solid ${color}40`, display: 'flex', alignItems: 'center', gap: 8, minWidth: 140 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}60`, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ fontSize: 10, color: t.textTertiary }}>{state} {duration && `• ${duration}`}</div>
      </div>
    </div>
  );
};
