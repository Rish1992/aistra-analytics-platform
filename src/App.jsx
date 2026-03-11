import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppShell } from './components/Layout';
import DashboardIndex from './DashboardIndex';
import { lazy, Suspense } from 'react';

// Lazy-load dashboards for performance
const CXO = lazy(() => import('./dashboards/CXO'));
const Operations = lazy(() => import('./dashboards/Operations'));
const Wallboard = lazy(() => import('./dashboards/Wallboard'));
const AgentPerformance = lazy(() => import('./dashboards/AgentPerformance'));
const QA = lazy(() => import('./dashboards/QA'));
const WFM = lazy(() => import('./dashboards/WFM'));
const CX = lazy(() => import('./dashboards/CX'));
const Finance = lazy(() => import('./dashboards/Finance'));
const AIAutomation = lazy(() => import('./dashboards/AIAutomation'));
const BusinessUnit = lazy(() => import('./dashboards/BusinessUnit'));
const Training = lazy(() => import('./dashboards/Training'));
const IT = lazy(() => import('./dashboards/IT'));
const Compliance = lazy(() => import('./dashboards/Compliance'));
const Campaign = lazy(() => import('./dashboards/Campaign'));
const TalkToData = lazy(() => import('./modules/TalkToData'));
const DashboardBuilder = lazy(() => import('./modules/DashboardBuilder'));
const DataManagement = lazy(() => import('./modules/DataManagement'));
const ChartReference = lazy(() => import('./modules/ChartReference'));
const Settings = lazy(() => import('./modules/Settings'));
const DeeptalkOverview = lazy(() => import('./dashboards/DeeptalkOverview'));
const DeeptalkBots = lazy(() => import('./dashboards/DeeptalkBots'));
const TalkToDeeptalk = lazy(() => import('./modules/TalkToDeeptalk'));

function LoadingFallback() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', animation: 'spin 1s linear infinite' }} />
      <span style={{ fontSize: 14, color: '#8B91A0' }}>Loading dashboard...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<DashboardIndex />} />
              <Route path="/cxo" element={<CXO />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/wallboard" element={<Wallboard />} />
              <Route path="/agent" element={<AgentPerformance />} />
              <Route path="/qa" element={<QA />} />
              <Route path="/wfm" element={<WFM />} />
              <Route path="/cx" element={<CX />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/ai" element={<AIAutomation />} />
              <Route path="/bu" element={<BusinessUnit />} />
              <Route path="/training" element={<Training />} />
              <Route path="/it" element={<IT />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/campaign" element={<Campaign />} />
              <Route path="/talk-to-data" element={<TalkToData />} />
              <Route path="/builder" element={<DashboardBuilder />} />
              <Route path="/data" element={<DataManagement />} />
              <Route path="/chart-reference" element={<ChartReference />} />
              <Route path="/deeptalk" element={<DeeptalkOverview />} />
              <Route path="/deeptalk/bots" element={<DeeptalkBots />} />
              <Route path="/talk-to-deeptalk" element={<TalkToDeeptalk />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </AppShell>
      </BrowserRouter>
    </ThemeProvider>
  );
}
