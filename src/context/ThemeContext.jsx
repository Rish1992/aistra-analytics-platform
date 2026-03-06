import { createContext, useContext, useState, useMemo } from 'react';

const colorSchemes = {
  light: {
    professional: ["#2563EB","#7C3AED","#0D9668","#EC4899","#F59E0B","#0891B2","#DC2626","#6366F1"],
    vibrant: ["#3B82F6","#8B5CF6","#10B981","#F43F5E","#F59E0B","#06B6D4","#EF4444","#6366F1"],
    ocean: ["#0284C7","#0891B2","#0D9488","#2563EB","#7C3AED","#0EA5E9","#14B8A6","#6366F1"],
    sunset: ["#EA580C","#DC2626","#D97706","#E11D48","#CA8A04","#C2410C","#B91C1C","#A16207"],
    forest: ["#15803D","#166534","#65A30D","#4D7C0F","#047857","#0D9488","#059669","#14532D"],
    monochrome: ["#1E40AF","#2563EB","#3B82F6","#60A5FA","#93C5FD","#1D4ED8","#1E3A8A","#BFDBFE"],
  },
  dark: {
    professional: ["#4F8BFF","#A78BFA","#34D399","#F472B6","#FBBF24","#22D3EE","#F87171","#818CF8"],
    vibrant: ["#60A5FA","#A78BFA","#34D399","#FB7185","#FBBF24","#22D3EE","#F87171","#818CF8"],
    ocean: ["#38BDF8","#22D3EE","#2DD4BF","#60A5FA","#A78BFA","#7DD3FC","#5EEAD4","#818CF8"],
    sunset: ["#FB923C","#F87171","#FBBF24","#FB7185","#FACC15","#F97316","#FCA5A5","#FCD34D"],
    forest: ["#4ADE80","#22C55E","#A3E635","#84CC16","#34D399","#2DD4BF","#10B981","#86EFAC"],
    monochrome: ["#3B82F6","#60A5FA","#93C5FD","#BFDBFE","#DBEAFE","#2563EB","#1D4ED8","#E0F2FE"],
  },
};

const baseTokens = {
  light: {
    bg: "#F6F7F9", surface: "#FFFFFF", surfaceAlt: "#F0F2F5", surfaceHover: "#E8EBF0",
    border: "#E2E5EB", borderSubtle: "#ECEEF2",
    text: "#1A1D24", textSecondary: "#5A6170", textTertiary: "#8B91A0", textInverse: "#FFFFFF",
    primary: "#2563EB", primaryHover: "#1D4FD7", primaryLight: "#EFF4FF", primaryMuted: "#BFDBFE",
    success: "#0D9668", successLight: "#ECFDF5", successMuted: "#A7F3D0",
    warning: "#D97706", warningLight: "#FFFBEB", warningMuted: "#FDE68A",
    danger: "#DC2626", dangerLight: "#FEF2F2", dangerMuted: "#FECACA",
    info: "#0891B2", infoLight: "#ECFEFF",
    accent1: "#7C3AED", accent1Light: "#F5F3FF",
    accent2: "#EC4899", accent2Light: "#FDF2F8",
    accent3: "#F59E0B",
    shadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    shadowMd: "0 4px 12px rgba(0,0,0,0.08)",
    shadowLg: "0 10px 30px rgba(0,0,0,0.1)",
    gradient1: "linear-gradient(135deg, #2563EB, #7C3AED)",
    gradient2: "linear-gradient(135deg, #0D9668, #0891B2)",
    gradient3: "linear-gradient(135deg, #EC4899, #F59E0B)",
  },
  dark: {
    bg: "#0D0F14", surface: "#161921", surfaceAlt: "#1C2029", surfaceHover: "#252A36",
    border: "#2A2F3C", borderSubtle: "#222731",
    text: "#E8EAF0", textSecondary: "#9BA1B0", textTertiary: "#636A7C", textInverse: "#0D0F14",
    primary: "#4F8BFF", primaryHover: "#6B9FFF", primaryLight: "rgba(79,139,255,0.12)", primaryMuted: "rgba(79,139,255,0.25)",
    success: "#34D399", successLight: "rgba(52,211,153,0.12)", successMuted: "rgba(52,211,153,0.25)",
    warning: "#FBBF24", warningLight: "rgba(251,191,36,0.12)", warningMuted: "rgba(251,191,36,0.25)",
    danger: "#F87171", dangerLight: "rgba(248,113,113,0.12)", dangerMuted: "rgba(248,113,113,0.25)",
    info: "#22D3EE", infoLight: "rgba(34,211,238,0.12)",
    accent1: "#A78BFA", accent1Light: "rgba(167,139,250,0.12)",
    accent2: "#F472B6", accent2Light: "rgba(244,114,182,0.12)",
    accent3: "#FBBF24",
    shadow: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
    shadowMd: "0 4px 12px rgba(0,0,0,0.4)",
    shadowLg: "0 10px 30px rgba(0,0,0,0.5)",
    gradient1: "linear-gradient(135deg, #4F8BFF, #A78BFA)",
    gradient2: "linear-gradient(135deg, #34D399, #22D3EE)",
    gradient3: "linear-gradient(135deg, #F472B6, #FBBF24)",
  },
};

const ThemeContext = createContext();

export { colorSchemes };

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('aistra-theme') || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
    catch { return 'light'; }
  });

  const [colorScheme, setColorSchemeState] = useState(() => {
    try { return localStorage.getItem('aistra-color-scheme') || 'professional'; }
    catch { return 'professional'; }
  });

  const setColorScheme = (schemeName) => {
    if (colorSchemes.light[schemeName]) {
      setColorSchemeState(schemeName);
      try { localStorage.setItem('aistra-color-scheme', schemeName); } catch {}
    }
  };

  const t = useMemo(() => ({
    ...baseTokens[theme],
    chart: colorSchemes[theme][colorScheme] || colorSchemes[theme].professional,
  }), [theme, colorScheme]);

  const toggleTheme = () => setTheme(prev => { const next = prev === 'light' ? 'dark' : 'light'; try { localStorage.setItem('aistra-theme', next); } catch {} return next; });

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, t, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
