import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

// ─── SVG ICON SYSTEM ───
// Crisp, modern stroke-based icons (Lucide/Feather style)
// All icons use currentColor so they inherit text color automatically
const Icon = ({ children, size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {children}
  </svg>
);

const icons = {
  // Dashboard / Grid
  home: (
    <Icon>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </Icon>
  ),
  // Briefcase
  cxo: (
    <Icon>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 13h20" />
    </Icon>
  ),
  // Gear / Settings
  operations: (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </Icon>
  ),
  // Monitor / Screen
  wallboard: (
    <Icon>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </Icon>
  ),
  // Target / Crosshair
  agent: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </Icon>
  ),
  // Shield Check
  qa: (
    <Icon>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  ),
  // Chart Bar
  wfm: (
    <Icon>
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </Icon>
  ),
  // Message Circle
  cx: (
    <Icon>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </Icon>
  ),
  // Dollar Sign
  finance: (
    <Icon>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </Icon>
  ),
  // CPU / Brain
  ai: (
    <Icon>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 1v3" /><path d="M15 1v3" />
      <path d="M9 20v3" /><path d="M15 20v3" />
      <path d="M20 9h3" /><path d="M20 14h3" />
      <path d="M1 9h3" /><path d="M1 14h3" />
    </Icon>
  ),
  // Building
  bu: (
    <Icon>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" /><path d="M16 6h.01" />
      <path d="M8 10h.01" /><path d="M16 10h.01" />
      <path d="M8 14h.01" /><path d="M16 14h.01" />
    </Icon>
  ),
  // Book Open
  training: (
    <Icon>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </Icon>
  ),
  // Server
  it: (
    <Icon>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </Icon>
  ),
  // Shield
  compliance: (
    <Icon>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Icon>
  ),
  // Phone Outgoing
  campaign: (
    <Icon>
      <polyline points="23 7 23 1 17 1" />
      <line x1="16" y1="8" x2="23" y2="1" />
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
  ),
  // Sparkles / Wand
  talk: (
    <Icon>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 15l.88 2.62L22.5 18.5l-2.62.88L19 22l-.88-2.62L15.5 18.5l2.62-.88L19 15z" />
    </Icon>
  ),
  // Layout / Wrench
  builder: (
    <Icon>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </Icon>
  ),
  // Database / Cylinder
  data: (
    <Icon>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </Icon>
  ),
  // Book / Reference Guide
  chartref: (
    <Icon>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h6" />
    </Icon>
  ),
  // Gear / Cog
  settings: (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </Icon>
  ),
  // Moon
  moon: (
    <Icon>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Icon>
  ),
  // Sun
  sun: (
    <Icon>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </Icon>
  ),
  // Refresh CW
  refresh: (
    <Icon size={14}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </Icon>
  ),
  // Download
  export: (
    <Icon size={14}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </Icon>
  ),
};

const navItems = [
  { id: 'home', label: 'Dashboard Index', icon: 'home', path: '/' },
  { type: 'divider', label: 'DASHBOARDS' },
  { id: 'cxo', label: 'CXO Executive', icon: 'cxo', path: '/cxo' },
  { id: 'operations', label: 'Operations', icon: 'operations', path: '/operations' },
  { id: 'wallboard', label: 'Real-Time Wallboard', icon: 'wallboard', path: '/wallboard' },
  { id: 'agent', label: 'Agent Performance', icon: 'agent', path: '/agent' },
  { id: 'qa', label: 'Quality Assurance', icon: 'qa', path: '/qa' },
  { id: 'wfm', label: 'Workforce Mgmt', icon: 'wfm', path: '/wfm' },
  { id: 'cx', label: 'Customer Experience', icon: 'cx', path: '/cx' },
  { id: 'finance', label: 'Finance', icon: 'finance', path: '/finance' },
  { id: 'ai', label: 'AI & Automation', icon: 'ai', path: '/ai' },
  { id: 'bu', label: 'Business Unit', icon: 'bu', path: '/bu' },
  { id: 'training', label: 'Training & Dev', icon: 'training', path: '/training' },
  { id: 'it', label: 'IT Infrastructure', icon: 'it', path: '/it' },
  { id: 'compliance', label: 'Compliance & Risk', icon: 'compliance', path: '/compliance' },
  { id: 'campaign', label: 'Campaign & Outbound', icon: 'campaign', path: '/campaign' },
  { type: 'divider', label: 'TOOLS' },
  { id: 'talk', label: 'Talk to Data', icon: 'talk', path: '/talk-to-data' },
  { id: 'builder', label: 'Dashboard Builder', icon: 'builder', path: '/builder' },
  { id: 'data', label: 'Data Management', icon: 'data', path: '/data' },
  { type: 'divider', label: 'REFERENCE' },
  { id: 'chartref', label: 'Chart Reference', icon: 'chartref', path: '/chart-reference' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
];

export { icons };

export function AppShell({ children }) {
  const { t, theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isWallboard = location.pathname === '/wallboard';
  if (isWallboard) return <>{children}</>;

  return (
    <div style={{ display: 'flex', height: '100vh', background: t.bg, color: t.text, transition: 'background 0.3s' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 60 : 240, flexShrink: 0, background: t.surface, borderRight: `1px solid ${t.border}`,
        display: 'flex', flexDirection: 'column', transition: 'width 0.2s ease', overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: collapsed ? '16px 14px' : '16px 20px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => setCollapsed(!collapsed)}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="8" width="3" height="7" rx="1" fill="white"/><rect x="6" y="4" width="3" height="11" rx="1" fill="white"/><rect x="11" y="1" width="3" height="14" rx="1" fill="white"/></svg>
          </div>
          {!collapsed && <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.5, color: t.text, whiteSpace: 'nowrap' }}>Aistra Analytics</span>}
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
          {navItems.map((item, i) => {
            if (item.type === 'divider') {
              if (collapsed) return <div key={i} style={{ height: 1, background: t.border, margin: '8px 4px' }} />;
              return <div key={i} style={{ fontSize: 10, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 1, padding: '16px 12px 6px', whiteSpace: 'nowrap' }}>{item.label}</div>;
            }
            const isActive = location.pathname === item.path;
            return (
              <button key={i} onClick={() => navigate(item.path)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '8px 0' : '8px 12px',
                  borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: isActive ? 600 : 400,
                  background: isActive ? t.primaryLight : 'transparent', color: isActive ? t.primary : t.textSecondary,
                  transition: 'all 0.15s', textAlign: 'left', whiteSpace: 'nowrap', justifyContent: collapsed ? 'center' : 'flex-start',
                  marginBottom: 2,
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = t.surfaceHover; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                <span style={{ width: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icons[item.icon]}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div style={{ padding: '12px', borderTop: `1px solid ${t.border}` }}>
          <button onClick={toggleTheme}
            style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textSecondary, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>{theme === 'light' ? icons.moon : icons.sun}</span>
            {!collapsed && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}

// ─── DASHBOARD HEADER ───
export function DashboardHeader({ title, subtitle, actions }) {
  const { t } = useTheme();
  return (
    <div style={{ padding: '20px 32px 0', borderBottom: `1px solid ${t.border}`, background: t.surface, marginBottom: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.5 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 13, color: t.textTertiary, margin: '4px 0 0' }}>{subtitle}</p>}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 11, color: t.textTertiary, whiteSpace: 'nowrap' }}>Last updated: 2 min ago</span>
          <button style={{ padding: '7px 16px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surface, color: t.textSecondary, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>{icons.refresh} Refresh</button>
          <button style={{ padding: '7px 16px', borderRadius: 8, border: 'none', background: t.primary, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>{icons.export} Export</button>
          {actions}
        </div>
      </div>
    </div>
  );
}
