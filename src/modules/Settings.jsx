import { useState } from 'react';
import { useTheme, colorSchemes } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, Badge, SectionTitle } from '../components/UI';
import { BarChart, AreaChart, DonutChart, MultiLineChart } from '../components/Charts';

// ─── SCHEME METADATA ───
const schemeInfo = {
  professional: {
    name: 'Professional',
    description: 'The default balanced palette with blues, purples, and greens. Clean and corporate-friendly.',
  },
  vibrant: {
    name: 'Vibrant',
    description: 'Brighter and more saturated colors for high-contrast, attention-grabbing visualizations.',
  },
  ocean: {
    name: 'Ocean',
    description: 'Cool teals, blues, and cyans inspired by the sea. Calming and cohesive.',
  },
  sunset: {
    name: 'Sunset',
    description: 'Warm oranges, reds, and golds for an energetic, warm-toned data experience.',
  },
  forest: {
    name: 'Forest',
    description: 'Natural greens, browns, and earth tones. Organic and grounded aesthetic.',
  },
  monochrome: {
    name: 'Monochrome',
    description: 'Shades and tints of a single hue for a minimalist, unified look.',
  },
};

// ─── COLOR SWATCH STRIP ───
const ColorStrip = ({ colors, size = 28 }) => (
  <div style={{ display: 'flex', gap: 3, borderRadius: 8, overflow: 'hidden' }}>
    {colors.map((color, i) => (
      <div key={i} style={{ width: size, height: size, background: color, transition: 'transform 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
    ))}
  </div>
);

// ─── SCHEME CARD ───
const SchemeCard = ({ schemeKey, isActive, onApply, t, theme }) => {
  const info = schemeInfo[schemeKey];
  const colors = colorSchemes[theme][schemeKey];

  return (
    <Card style={{
      padding: 20,
      border: isActive ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
      position: 'relative',
      transition: 'all 0.2s ease',
    }}>
      {/* Active indicator */}
      {isActive && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          width: 24, height: 24, borderRadius: 12,
          background: t.primary, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      )}

      {/* Scheme Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{info.name}</span>
        {isActive && <Badge variant="success">Active</Badge>}
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5, margin: '0 0 14px' }}>
        {info.description}
      </p>

      {/* Color Swatches */}
      <ColorStrip colors={colors} size={32} />

      {/* Color Hex Values */}
      <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
        {colors.map((color, i) => (
          <div key={i} style={{
            width: 32, textAlign: 'center', fontSize: 8,
            color: t.textTertiary, fontFamily: 'monospace',
          }}>
            {color}
          </div>
        ))}
      </div>

      {/* Apply Button */}
      {!isActive && (
        <button
          onClick={onApply}
          style={{
            marginTop: 14, padding: '8px 20px', borderRadius: 8,
            border: `1px solid ${t.primary}`, background: t.primaryLight,
            color: t.primary, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = t.primary; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = t.primaryLight; e.currentTarget.style.color = t.primary; }}
        >
          Apply Scheme
        </button>
      )}
    </Card>
  );
};

// ─── SAMPLE CHARTS PREVIEW ───
const LivePreview = ({ t }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16,
  }}>
    {/* Bar Chart Preview */}
    <Card style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Bar Chart</div>
      <BarChart
        data={[65, 82, 48, 91, 73]}
        labels={['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega']}
        colors={t.chart}
        width={320} height={120}
      />
    </Card>

    {/* Area Chart Preview */}
    <Card style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Area Chart</div>
      <AreaChart
        data={[30, 42, 38, 55, 48, 62, 58, 70]}
        width={320} height={100}
        color={t.chart[0]}
      />
    </Card>

    {/* Multi-Line Chart Preview */}
    <Card style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Multi-Line Chart</div>
      <MultiLineChart
        series={[
          { data: [40, 45, 52, 48, 60, 65], color: t.chart[0], name: 'Series A' },
          { data: [35, 40, 38, 50, 55, 58], color: t.chart[1], name: 'Series B' },
          { data: [50, 48, 46, 44, 52, 55], color: t.chart[2], name: 'Series C' },
        ]}
        labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
        width={320} height={120}
      />
    </Card>

    {/* Donut Chart Preview */}
    <Card style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 12 }}>Donut Charts</div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {[73, 58, 91, 42].map((val, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <DonutChart value={val} size={60} strokeWidth={7} color={t.chart[i]} />
            <div style={{ fontSize: 10, color: t.textTertiary, marginTop: 4 }}>{val}%</div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── ALL COLORS DETAIL SECTION ───
const ColorDetail = ({ t }) => (
  <Card style={{ padding: 20 }}>
    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 16 }}>Active Palette Colors</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
      {t.chart.map((color, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 8, background: t.surfaceAlt,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: color,
            boxShadow: `0 2px 8px ${color}40`, flexShrink: 0,
          }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.text }}>Color {i + 1}</div>
            <div style={{ fontSize: 10, color: t.textTertiary, fontFamily: 'monospace' }}>{color}</div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

// ─── SETTINGS TABS ───
const tabs = [
  { id: 'colors', label: 'Color Scheme' },
  { id: 'general', label: 'General' },
  { id: 'about', label: 'About' },
];

// ─── MAIN COMPONENT ───
export default function Settings() {
  const { t, theme, toggleTheme, colorScheme, setColorScheme } = useTheme();
  const [activeTab, setActiveTab] = useState('colors');

  const schemeKeys = Object.keys(schemeInfo);

  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Customize your analytics experience" />

      <div style={{ padding: '24px 32px' }}>
        {/* Tab Bar */}
        <div style={{
          display: 'flex', gap: 0, marginBottom: 24,
          borderRadius: 10, border: `1px solid ${t.border}`,
          overflow: 'hidden', background: t.surfaceAlt, width: 'fit-content',
        }}>
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 24px', border: 'none',
                background: activeTab === tab.id ? t.primary : 'transparent',
                color: activeTab === tab.id ? '#fff' : t.textSecondary,
                fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.15s',
                borderRight: i < tabs.length - 1 ? `1px solid ${t.border}` : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Color Scheme Tab */}
        {activeTab === 'colors' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Scheme Selector */}
            <div>
              <SectionTitle subtitle="Choose a color palette for all charts and visualizations across the platform">
                Select Color Scheme
              </SectionTitle>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: 16,
              }}>
                {schemeKeys.map(key => (
                  <SchemeCard
                    key={key}
                    schemeKey={key}
                    isActive={colorScheme === key}
                    onApply={() => setColorScheme(key)}
                    t={t}
                    theme={theme}
                  />
                ))}
              </div>
            </div>

            {/* Color Detail */}
            <div>
              <SectionTitle subtitle="All 8 colors in the currently active palette with their hex values">
                Current Palette Detail
              </SectionTitle>
              <ColorDetail t={t} />
            </div>

            {/* Live Preview */}
            <div>
              <SectionTitle subtitle="See how the selected color scheme looks across different chart types">
                Live Chart Preview
              </SectionTitle>
              <LivePreview t={t} />
            </div>
          </div>
        )}

        {/* General Tab */}
        {activeTab === 'general' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionTitle subtitle="Configure general application preferences">
              General Settings
            </SectionTitle>

            <Card style={{ padding: 20 }}>
              {/* Theme Toggle */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 0', borderBottom: `1px solid ${t.border}`,
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Appearance</div>
                  <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>
                    Currently using {theme === 'light' ? 'Light' : 'Dark'} mode
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  style={{
                    padding: '8px 20px', borderRadius: 8,
                    border: `1px solid ${t.border}`, background: t.surfaceAlt,
                    color: t.textSecondary, fontSize: 13, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </button>
              </div>

              {/* Refresh Interval */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 0', borderBottom: `1px solid ${t.border}`,
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Auto Refresh</div>
                  <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>
                    Dashboard data refresh interval
                  </div>
                </div>
                <div style={{
                  padding: '8px 16px', borderRadius: 8,
                  border: `1px solid ${t.border}`, background: t.surfaceAlt,
                  color: t.textSecondary, fontSize: 13,
                }}>
                  Every 5 minutes
                </div>
              </div>

              {/* Date Format */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 0',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Date Format</div>
                  <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>
                    How dates are displayed throughout the app
                  </div>
                </div>
                <div style={{
                  padding: '8px 16px', borderRadius: 8,
                  border: `1px solid ${t.border}`, background: t.surfaceAlt,
                  color: t.textSecondary, fontSize: 13,
                }}>
                  DD MMM YYYY
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionTitle subtitle="Platform information and version details">
              About Aistra Analytics
            </SectionTitle>

            <Card style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: t.gradient1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="8" width="3" height="7" rx="1" fill="white"/>
                    <rect x="6" y="4" width="3" height="11" rx="1" fill="white"/>
                    <rect x="11" y="1" width="3" height="14" rx="1" fill="white"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>Aistra Analytics Platform</div>
                  <div style={{ fontSize: 13, color: t.textTertiary }}>Version 1.0.0</div>
                </div>
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12,
              }}>
                {[
                  { label: 'Charts Available', value: '22 types' },
                  { label: 'Dashboards', value: '14 modules' },
                  { label: 'Color Schemes', value: '6 palettes' },
                  { label: 'Theme Modes', value: 'Light & Dark' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '12px 16px', borderRadius: 8, background: t.surfaceAlt,
                  }}>
                    <div style={{ fontSize: 10, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8 }}>{item.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginTop: 4 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
