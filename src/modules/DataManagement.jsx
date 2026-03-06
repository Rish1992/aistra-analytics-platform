import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DashboardHeader } from '../components/Layout';
import { Card, Badge, SectionTitle } from '../components/UI';

// ─── SVG ICON HELPERS ───

const SvgIcon = ({ children, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

const icons = {
  database: <SvgIcon><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></SvgIcon>,
  databaseAlt: <SvgIcon><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></SvgIcon>,
  cloud: <SvgIcon><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></SvgIcon>,
  zap: <SvgIcon><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></SvgIcon>,
  file: <SvgIcon><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></SvgIcon>,
  snowflake: <SvgIcon><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><line x1="19.07" y1="4.93" x2="4.93" y2="19.07" /></SvgIcon>,
  server: <SvgIcon><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></SvgIcon>,
  leaf: <SvgIcon><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></SvgIcon>,
  barChart: <SvgIcon><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></SvgIcon>,
  folder: <SvgIcon><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></SvgIcon>,
  target: <SvgIcon><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></SvgIcon>,
  user: <SvgIcon><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></SvgIcon>,
  bookOpen: <SvgIcon><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></SvgIcon>,
  clipboard: <SvgIcon><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></SvgIcon>,
  megaphone: <SvgIcon><path d="M3 11l18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></SvgIcon>,
  checkCircle: <SvgIcon><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></SvgIcon>,
  users: <SvgIcon><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></SvgIcon>,
  ticket: <SvgIcon><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" /></SvgIcon>,
  link: <SvgIcon><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></SvgIcon>,
  upload: <SvgIcon><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></SvgIcon>,
  folderOpen: <SvgIcon><path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1" /><path d="M20 19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2" /><path d="M3 15l2.4-7.2A2 2 0 0 1 7.3 6h13.4a2 2 0 0 1 1.9 2.8L20 15" /></SvgIcon>,
  list: <SvgIcon><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></SvgIcon>,
};

// ─── MOCK DATA ───

const mockIntegrations = [
  { id: 1, name: 'PostgreSQL', type: 'Database', icon: icons.database, status: 'connected', lastSync: '2 min ago', records: '1.2M', host: 'db.aistra.io', port: '5432', database: 'analytics_prod', ssl: true },
  { id: 2, name: 'MySQL', type: 'Database', icon: icons.databaseAlt, status: 'connected', lastSync: '15 min ago', records: '845K', host: 'mysql.aistra.io', port: '3306', database: 'crm_data', ssl: true },
  { id: 3, name: 'Salesforce', type: 'CRM', icon: icons.cloud, status: 'connected', lastSync: '1 hr ago', records: '328K', host: 'aistra.salesforce.com', port: '443', database: 'production', ssl: true },
  { id: 4, name: 'REST API', type: 'API', icon: icons.zap, status: 'connected', lastSync: '5 min ago', records: '56K', host: 'api.aistra.io', port: '443', database: '/v2/events', ssl: true },
  { id: 5, name: 'CSV Upload', type: 'File', icon: icons.file, status: 'active', lastSync: 'Just now', records: '20K', host: '', port: '', database: '', ssl: false },
  { id: 6, name: 'Snowflake', type: 'Data Warehouse', icon: icons.snowflake, status: 'disconnected', lastSync: '3 days ago', records: '0', host: 'aistra.snowflakecomputing.com', port: '443', database: 'ANALYTICS', ssl: true },
];

const integrationTypes = [
  { value: 'postgresql', label: 'PostgreSQL', icon: icons.database, defaultPort: '5432' },
  { value: 'mysql', label: 'MySQL', icon: icons.databaseAlt, defaultPort: '3306' },
  { value: 'sqlserver', label: 'SQL Server', icon: icons.server, defaultPort: '1433' },
  { value: 'mongodb', label: 'MongoDB', icon: icons.leaf, defaultPort: '27017' },
  { value: 'snowflake', label: 'Snowflake', icon: icons.snowflake, defaultPort: '443' },
  { value: 'bigquery', label: 'BigQuery', icon: icons.barChart, defaultPort: '443' },
  { value: 'restapi', label: 'REST API', icon: icons.zap, defaultPort: '443' },
  { value: 'sftp', label: 'SFTP', icon: icons.folder, defaultPort: '22' },
  { value: 'salesforce', label: 'Salesforce', icon: icons.cloud, defaultPort: '443' },
  { value: 'hubspot', label: 'HubSpot', icon: icons.target, defaultPort: '443' },
];

const mockUploadedFiles = [
  { id: 1, name: 'agents_q4.csv', date: '2026-02-28', rows: 2450, size: '1.2 MB', status: 'completed' },
  { id: 2, name: 'satisfaction_survey.xlsx', date: '2026-02-25', rows: 12380, size: '4.8 MB', status: 'completed' },
  { id: 3, name: 'campaign_results.json', date: '2026-02-20', rows: 5670, size: '2.3 MB', status: 'completed' },
];

const mockManualData = [
  { id: 1, agent: 'John Smith', team: 'Alpha', calls: 145, aht: '4:32', csat: 4.5, status: 'Active' },
  { id: 2, agent: 'Jane Cooper', team: 'Beta', calls: 132, aht: '3:58', csat: 4.8, status: 'Active' },
  { id: 3, agent: 'Robert Fox', team: 'Gamma', calls: 128, aht: '5:12', csat: 4.2, status: 'Active' },
  { id: 4, agent: 'Emily Wilson', team: 'Beta', calls: 156, aht: '3:45', csat: 4.7, status: 'On Leave' },
  { id: 5, agent: 'Carlos Mendez', team: 'Alpha', calls: 141, aht: '4:15', csat: 4.6, status: 'Active' },
];

const mockEntities = [
  {
    id: 'agents', name: 'Agents', icon: icons.user, fieldCount: 14, recordCount: '2,450', color: '#2563EB',
    relationships: [
      { target: 'Queues', type: 'belongs_to', label: 'assigned to' },
      { target: 'Quality Scores', type: 'has_many', label: 'evaluated by' },
      { target: 'Tickets', type: 'has_many', label: 'handles' },
    ],
    fields: [
      { name: 'agent_id', type: 'UUID', nullable: false, description: 'Unique agent identifier' },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false, description: 'Agent first name' },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false, description: 'Agent last name' },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, description: 'Agent email address' },
      { name: 'team', type: 'VARCHAR(50)', nullable: false, description: 'Team assignment' },
      { name: 'hire_date', type: 'DATE', nullable: false, description: 'Date agent was hired' },
      { name: 'skill_level', type: 'INT', nullable: true, description: 'Skill rating 1-5' },
      { name: 'status', type: 'ENUM', nullable: false, description: 'Active, On Leave, Terminated' },
      { name: 'queue_id', type: 'UUID', nullable: true, description: 'FK to assigned queue' },
      { name: 'supervisor_id', type: 'UUID', nullable: true, description: 'FK to supervising agent' },
      { name: 'extension', type: 'VARCHAR(10)', nullable: true, description: 'Phone extension number' },
      { name: 'avg_handle_time', type: 'DECIMAL(8,2)', nullable: true, description: 'Average handle time in seconds' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Record creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, description: 'Last update timestamp' },
    ],
  },
  {
    id: 'contacts', name: 'Contacts', icon: icons.bookOpen, fieldCount: 11, recordCount: '45,200', color: '#7C3AED',
    relationships: [
      { target: 'Customers', type: 'belongs_to', label: 'associated with' },
      { target: 'Tickets', type: 'has_many', label: 'generates' },
      { target: 'Campaigns', type: 'has_many', label: 'targeted by' },
    ],
    fields: [
      { name: 'contact_id', type: 'UUID', nullable: false, description: 'Unique contact identifier' },
      { name: 'customer_id', type: 'UUID', nullable: false, description: 'FK to customer' },
      { name: 'channel', type: 'ENUM', nullable: false, description: 'Voice, Chat, Email, Bot' },
      { name: 'direction', type: 'ENUM', nullable: false, description: 'Inbound or Outbound' },
      { name: 'start_time', type: 'TIMESTAMP', nullable: false, description: 'Contact start timestamp' },
      { name: 'end_time', type: 'TIMESTAMP', nullable: true, description: 'Contact end timestamp' },
      { name: 'duration', type: 'INT', nullable: true, description: 'Duration in seconds' },
      { name: 'disposition', type: 'VARCHAR(50)', nullable: true, description: 'Call disposition code' },
      { name: 'queue_id', type: 'UUID', nullable: true, description: 'FK to queue' },
      { name: 'agent_id', type: 'UUID', nullable: true, description: 'FK to handling agent' },
      { name: 'csat_score', type: 'DECIMAL(3,1)', nullable: true, description: 'Customer satisfaction rating' },
    ],
  },
  {
    id: 'queues', name: 'Queues', icon: icons.clipboard, fieldCount: 9, recordCount: '24', color: '#0D9668',
    relationships: [
      { target: 'Agents', type: 'has_many', label: 'contains' },
      { target: 'Contacts', type: 'has_many', label: 'routes' },
    ],
    fields: [
      { name: 'queue_id', type: 'UUID', nullable: false, description: 'Unique queue identifier' },
      { name: 'queue_name', type: 'VARCHAR(100)', nullable: false, description: 'Display name' },
      { name: 'skill_group', type: 'VARCHAR(50)', nullable: false, description: 'Skill group classification' },
      { name: 'priority', type: 'INT', nullable: false, description: 'Routing priority (1=highest)' },
      { name: 'max_wait_time', type: 'INT', nullable: true, description: 'Max wait threshold in seconds' },
      { name: 'service_level_target', type: 'DECIMAL(5,2)', nullable: false, description: 'SL target percentage' },
      { name: 'active', type: 'BOOLEAN', nullable: false, description: 'Whether queue is active' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Record creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, description: 'Last update timestamp' },
    ],
  },
  {
    id: 'campaigns', name: 'Campaigns', icon: icons.megaphone, fieldCount: 12, recordCount: '156', color: '#EC4899',
    relationships: [
      { target: 'Contacts', type: 'has_many', label: 'generates' },
      { target: 'Customers', type: 'has_many', label: 'targets' },
    ],
    fields: [
      { name: 'campaign_id', type: 'UUID', nullable: false, description: 'Unique campaign identifier' },
      { name: 'campaign_name', type: 'VARCHAR(200)', nullable: false, description: 'Campaign display name' },
      { name: 'type', type: 'ENUM', nullable: false, description: 'Outbound, Inbound, Blended' },
      { name: 'status', type: 'ENUM', nullable: false, description: 'Draft, Active, Paused, Completed' },
      { name: 'start_date', type: 'DATE', nullable: true, description: 'Campaign start date' },
      { name: 'end_date', type: 'DATE', nullable: true, description: 'Campaign end date' },
      { name: 'target_count', type: 'INT', nullable: true, description: 'Number of target contacts' },
      { name: 'completed_count', type: 'INT', nullable: true, description: 'Number of completed contacts' },
      { name: 'conversion_rate', type: 'DECIMAL(5,2)', nullable: true, description: 'Campaign conversion rate' },
      { name: 'budget', type: 'DECIMAL(12,2)', nullable: true, description: 'Campaign budget' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Record creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, description: 'Last update timestamp' },
    ],
  },
  {
    id: 'quality_scores', name: 'Quality Scores', icon: icons.checkCircle, fieldCount: 10, recordCount: '18,900', color: '#F59E0B',
    relationships: [
      { target: 'Agents', type: 'belongs_to', label: 'scored for' },
      { target: 'Contacts', type: 'belongs_to', label: 'evaluated from' },
    ],
    fields: [
      { name: 'score_id', type: 'UUID', nullable: false, description: 'Unique score identifier' },
      { name: 'agent_id', type: 'UUID', nullable: false, description: 'FK to evaluated agent' },
      { name: 'contact_id', type: 'UUID', nullable: false, description: 'FK to evaluated contact' },
      { name: 'evaluator_id', type: 'UUID', nullable: false, description: 'FK to evaluator' },
      { name: 'overall_score', type: 'DECIMAL(5,2)', nullable: false, description: 'Overall QA score 0-100' },
      { name: 'greeting_score', type: 'DECIMAL(5,2)', nullable: true, description: 'Greeting criteria score' },
      { name: 'resolution_score', type: 'DECIMAL(5,2)', nullable: true, description: 'Resolution criteria score' },
      { name: 'compliance_score', type: 'DECIMAL(5,2)', nullable: true, description: 'Compliance criteria score' },
      { name: 'evaluation_date', type: 'DATE', nullable: false, description: 'Date of evaluation' },
      { name: 'comments', type: 'TEXT', nullable: true, description: 'Evaluator comments' },
    ],
  },
  {
    id: 'customers', name: 'Customers', icon: icons.users, fieldCount: 13, recordCount: '89,400', color: '#0891B2',
    relationships: [
      { target: 'Contacts', type: 'has_many', label: 'initiates' },
      { target: 'Tickets', type: 'has_many', label: 'opens' },
    ],
    fields: [
      { name: 'customer_id', type: 'UUID', nullable: false, description: 'Unique customer identifier' },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false, description: 'Customer first name' },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false, description: 'Customer last name' },
      { name: 'email', type: 'VARCHAR(255)', nullable: true, description: 'Customer email' },
      { name: 'phone', type: 'VARCHAR(20)', nullable: true, description: 'Customer phone number' },
      { name: 'company', type: 'VARCHAR(200)', nullable: true, description: 'Company name' },
      { name: 'segment', type: 'ENUM', nullable: false, description: 'Enterprise, SMB, Consumer' },
      { name: 'tier', type: 'ENUM', nullable: false, description: 'Platinum, Gold, Silver, Bronze' },
      { name: 'ltv', type: 'DECIMAL(12,2)', nullable: true, description: 'Lifetime value' },
      { name: 'churn_risk', type: 'DECIMAL(5,2)', nullable: true, description: 'Churn probability score' },
      { name: 'nps_score', type: 'INT', nullable: true, description: 'Net Promoter Score' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Record creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, description: 'Last update timestamp' },
    ],
  },
  {
    id: 'tickets', name: 'Tickets', icon: icons.ticket, fieldCount: 12, recordCount: '34,600', color: '#DC2626',
    relationships: [
      { target: 'Customers', type: 'belongs_to', label: 'opened by' },
      { target: 'Agents', type: 'belongs_to', label: 'assigned to' },
      { target: 'Contacts', type: 'has_many', label: 'linked to' },
    ],
    fields: [
      { name: 'ticket_id', type: 'UUID', nullable: false, description: 'Unique ticket identifier' },
      { name: 'customer_id', type: 'UUID', nullable: false, description: 'FK to customer' },
      { name: 'agent_id', type: 'UUID', nullable: true, description: 'FK to assigned agent' },
      { name: 'subject', type: 'VARCHAR(300)', nullable: false, description: 'Ticket subject line' },
      { name: 'category', type: 'ENUM', nullable: false, description: 'Billing, Technical, General, Complaint' },
      { name: 'priority', type: 'ENUM', nullable: false, description: 'Critical, High, Medium, Low' },
      { name: 'status', type: 'ENUM', nullable: false, description: 'Open, In Progress, Resolved, Closed' },
      { name: 'sla_due', type: 'TIMESTAMP', nullable: true, description: 'SLA deadline timestamp' },
      { name: 'resolution_time', type: 'INT', nullable: true, description: 'Resolution time in minutes' },
      { name: 'first_response_time', type: 'INT', nullable: true, description: 'First response time in seconds' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Record creation timestamp' },
      { name: 'resolved_at', type: 'TIMESTAMP', nullable: true, description: 'Resolution timestamp' },
    ],
  },
];

// ─── MODAL OVERLAY ───
const Modal = ({ open, onClose, title, width, children }) => {
  const { t } = useTheme();
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
      <div style={{
        position: 'relative', width: width || 560, maxWidth: '92vw', maxHeight: '85vh', background: t.surface,
        borderRadius: 16, border: `1px solid ${t.border}`, boxShadow: t.shadowLg, overflow: 'hidden',
        animation: 'modalIn 0.2s ease-out', display: 'flex', flexDirection: 'column',
      }}>
        <style>{`@keyframes modalIn { from { transform: scale(0.95) translateY(8px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }`}</style>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{title}</div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
            ✕
          </button>
        </div>
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── INPUT COMPONENT ───
const Input = ({ label, value, onChange, placeholder, type = 'text', style: extraStyle }) => {
  const { t } = useTheme();
  return (
    <div style={{ ...extraStyle }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: t.text, marginBottom: 6 }}>{label}</label>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
    </div>
  );
};

// ─── TOGGLE COMPONENT ───
const Toggle = ({ label, checked, onChange }) => {
  const { t } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {label && <span style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{label}</span>}
      <div onClick={onChange}
        style={{ width: 42, height: 24, borderRadius: 12, background: checked ? t.primary : t.surfaceAlt, border: `1px solid ${checked ? t.primary : t.border}`, cursor: 'pointer', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
        <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', top: 2, left: checked ? 21 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </div>
    </div>
  );
};

// ─── TAB 1: INTEGRATIONS ───
function IntegrationsTab() {
  const { t } = useTheme();
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState(null);
  const [testStatus, setTestStatus] = useState(null);

  const emptyForm = { type: 'postgresql', host: '', port: '5432', database: '', username: '', password: '', ssl: true };
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingIntegration(null);
    setTestStatus(null);
    setShowAddModal(true);
  };

  const openEdit = (integration) => {
    const typeMatch = integrationTypes.find(it => it.label.toLowerCase() === integration.name.toLowerCase());
    setForm({
      type: typeMatch?.value || 'postgresql',
      host: integration.host || '',
      port: integration.port || '',
      database: integration.database || '',
      username: 'admin',
      password: '••••••••',
      ssl: integration.ssl ?? true,
    });
    setEditingIntegration(integration);
    setTestStatus(null);
    setShowAddModal(true);
  };

  const handleTypeChange = (val) => {
    const match = integrationTypes.find(it => it.value === val);
    setForm(prev => ({ ...prev, type: val, port: match?.defaultPort || prev.port }));
  };

  const handleTestConnection = () => {
    setTestStatus('testing');
    setTimeout(() => setTestStatus('success'), 1500);
  };

  const handleSave = () => {
    if (editingIntegration) {
      setIntegrations(prev => prev.map(ig =>
        ig.id === editingIntegration.id ? { ...ig, host: form.host, port: form.port, database: form.database, ssl: form.ssl, status: 'connected', lastSync: 'Just now' } : ig
      ));
    } else {
      const typeInfo = integrationTypes.find(it => it.value === form.type);
      setIntegrations(prev => [...prev, {
        id: Date.now(), name: typeInfo?.label || form.type, type: 'Database', icon: typeInfo?.icon || icons.link,
        status: 'connected', lastSync: 'Just now', records: '0', host: form.host, port: form.port, database: form.database, ssl: form.ssl,
      }]);
    }
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setIntegrations(prev => prev.filter(ig => ig.id !== id));
  };

  const statusColor = (status) => {
    if (status === 'connected' || status === 'active') return t.success;
    return t.danger;
  };

  const statusBadge = (status) => {
    if (status === 'connected') return 'success';
    if (status === 'active') return 'success';
    return 'danger';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <SectionTitle subtitle="Manage your data source connections">Integrations</SectionTitle>
        <button onClick={openAdd}
          style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: t.primary, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          + Add Integration
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {integrations.map(ig => (
          <Card key={ig.id} style={{ padding: 0, overflow: 'hidden', transition: 'all 0.2s', cursor: 'default' }}>
            <div style={{ padding: '20px 20px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {ig.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{ig.name}</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>{ig.type}</div>
                  </div>
                </div>
                <Badge variant={statusBadge(ig.status)}>
                  {ig.status.charAt(0).toUpperCase() + ig.status.slice(1)}
                </Badge>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ padding: '10px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                  <div style={{ fontSize: 10, color: t.textTertiary, marginBottom: 2 }}>Last Sync</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{ig.lastSync}</div>
                </div>
                <div style={{ padding: '10px 12px', borderRadius: 8, background: t.surfaceAlt }}>
                  <div style={{ fontSize: 10, color: t.textTertiary, marginBottom: 2 }}>Records</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{ig.records}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '12px 20px', borderTop: `1px solid ${t.border}`, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => openEdit(ig)}
                style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 12, cursor: 'pointer' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(ig.id)}
                style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${t.dangerLight}`, background: t.dangerLight, color: t.danger, fontSize: 12, cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </Card>
        ))}

        {/* Add Integration Placeholder Card */}
        <div onClick={openAdd} style={{
          minHeight: 200, borderRadius: 12, border: `2px dashed ${t.border}`, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', gap: 8,
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = t.primary; e.currentTarget.style.background = t.primaryLight; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = 'transparent'; }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: t.textTertiary }}>+</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: t.textTertiary }}>Add New Integration</span>
        </div>
      </div>

      {/* Add/Edit Integration Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title={editingIntegration ? `Edit ${editingIntegration.name}` : 'Add Integration'} width={520}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Integration Type Selector */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: t.text, marginBottom: 10 }}>Integration Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
              {integrationTypes.map(it => (
                <button key={it.value} onClick={() => handleTypeChange(it.value)}
                  style={{
                    padding: '10px 6px', borderRadius: 10, border: `1px solid ${form.type === it.value ? t.primary : t.border}`,
                    background: form.type === it.value ? t.primaryLight : 'transparent', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all 0.15s',
                  }}>
                  <span style={{ fontSize: 20 }}>{it.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: form.type === it.value ? 600 : 400, color: form.type === it.value ? t.primary : t.textSecondary, textAlign: 'center', lineHeight: 1.2 }}>{it.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Connection Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
            <Input label="Host" value={form.host} onChange={e => setForm(prev => ({ ...prev, host: e.target.value }))} placeholder="e.g., db.example.com" />
            <Input label="Port" value={form.port} onChange={e => setForm(prev => ({ ...prev, port: e.target.value }))} placeholder="5432" />
          </div>
          <Input label="Database" value={form.database} onChange={e => setForm(prev => ({ ...prev, database: e.target.value }))} placeholder="e.g., analytics_prod" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Username" value={form.username} onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))} placeholder="Username" />
            <Input label="Password" value={form.password} onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))} placeholder="Password" type="password" />
          </div>
          <Toggle label="SSL / TLS Encryption" checked={form.ssl} onChange={() => setForm(prev => ({ ...prev, ssl: !prev.ssl }))} />

          {/* Test Status */}
          {testStatus && (
            <div style={{
              padding: '10px 14px', borderRadius: 8,
              background: testStatus === 'success' ? t.successLight : testStatus === 'testing' ? t.infoLight : t.dangerLight,
              borderLeft: `3px solid ${testStatus === 'success' ? t.success : testStatus === 'testing' ? t.info : t.danger}`,
            }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: testStatus === 'success' ? t.success : testStatus === 'testing' ? t.info : t.danger }}>
                {testStatus === 'testing' && 'Testing connection...'}
                {testStatus === 'success' && 'Connection successful! All checks passed.'}
                {testStatus === 'failed' && 'Connection failed. Please check your credentials.'}
              </span>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 8, borderTop: `1px solid ${t.border}` }}>
            <button onClick={() => setShowAddModal(false)}
              style={{ padding: '10px 20px', borderRadius: 8, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 13, cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={handleTestConnection}
              style={{ padding: '10px 20px', borderRadius: 8, border: `1px solid ${t.primary}`, background: t.primaryLight, color: t.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Test Connection
            </button>
            <button onClick={handleSave}
              style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: t.primary, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {editingIntegration ? 'Save Changes' : 'Add Integration'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── TAB 2: DATA UPLOAD & MANAGEMENT ───
function DataUploadTab() {
  const { t } = useTheme();
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState(mockUploadedFiles);
  const [manualData, setManualData] = useState(mockManualData);
  const [dragOver, setDragOver] = useState(false);
  const [editingCell, setEditingCell] = useState(null);
  const [showAddRowModal, setShowAddRowModal] = useState(false);
  const [newRow, setNewRow] = useState({ agent: '', team: '', calls: '', aht: '', csat: '', status: 'Active' });

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer?.files || e.target?.files;
    if (files?.length) {
      Array.from(files).forEach(file => {
        setUploadedFiles(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          date: new Date().toISOString().split('T')[0],
          rows: Math.floor(Math.random() * 10000) + 500,
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          status: 'processing',
        }]);
        // Simulate processing
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(f => f.name === file.name && f.status === 'processing' ? { ...f, status: 'completed' } : f));
        }, 2000);
      });
    }
  };

  const handleDeleteFile = (id) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleCellEdit = (rowId, field, value) => {
    setManualData(prev => prev.map(row => row.id === rowId ? { ...row, [field]: value } : row));
    setEditingCell(null);
  };

  const handleAddRow = () => {
    setManualData(prev => [...prev, { id: Date.now(), ...newRow, calls: parseInt(newRow.calls) || 0, csat: parseFloat(newRow.csat) || 0 }]);
    setNewRow({ agent: '', team: '', calls: '', aht: '', csat: '', status: 'Active' });
    setShowAddRowModal(false);
  };

  const handleDeleteRow = (id) => {
    setManualData(prev => prev.filter(r => r.id !== id));
  };

  const statusBadge = (status) => {
    if (status === 'completed') return 'success';
    if (status === 'processing') return 'warning';
    return 'danger';
  };

  const manualColumns = [
    { key: 'agent', label: 'Agent Name' },
    { key: 'team', label: 'Team' },
    { key: 'calls', label: 'Calls' },
    { key: 'aht', label: 'AHT' },
    { key: 'csat', label: 'CSAT' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* File Upload Zone */}
      <div>
        <SectionTitle subtitle="Upload CSV, Excel, or JSON files to import data">Upload Data</SectionTitle>
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '48px 32px', borderRadius: 12, border: `2px dashed ${dragOver ? t.primary : t.border}`,
            background: dragOver ? t.primaryLight : t.surfaceAlt, textAlign: 'center', cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}><SvgIcon size={40}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></SvgIcon></div>
          <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 4 }}>
            {dragOver ? 'Drop files here' : 'Drag & drop files here'}
          </div>
          <div style={{ fontSize: 13, color: t.textTertiary, marginBottom: 16 }}>or click to browse your computer</div>
          <div style={{ display: 'inline-flex', gap: 8 }}>
            <Badge variant="primary">CSV</Badge>
            <Badge variant="primary">Excel</Badge>
            <Badge variant="primary">JSON</Badge>
          </div>
          <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls,.json" multiple onChange={handleFileDrop} style={{ display: 'none' }} />
        </div>
      </div>

      {/* Upload History */}
      <div>
        <SectionTitle subtitle="Previously uploaded files and their processing status">Upload History</SectionTitle>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                  {['File Name', 'Upload Date', 'Rows', 'Size', 'Status', 'Actions'].map(col => (
                    <th key={col} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, background: t.surfaceAlt }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map(file => (
                  <tr key={file.id} style={{ borderBottom: `1px solid ${t.borderSubtle}` }}
                    onMouseEnter={e => e.currentTarget.style.background = t.surfaceHover}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: t.text, fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16 }}>
                          {file.name.endsWith('.csv') ? icons.file : file.name.endsWith('.json') ? icons.clipboard : icons.barChart}
                        </span>
                        {file.name}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: t.textSecondary }}>{file.date}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: t.text, fontWeight: 500 }}>{file.rows.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: t.textSecondary }}>{file.size}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge variant={statusBadge(file.status)}>
                        {file.status === 'processing' ? 'Processing...' : file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                      </Badge>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 11, cursor: 'pointer' }}>
                          Download
                        </button>
                        <button onClick={() => handleDeleteFile(file.id)}
                          style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${t.dangerLight}`, background: t.dangerLight, color: t.danger, fontSize: 11, cursor: 'pointer' }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {uploadedFiles.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: t.textTertiary, fontSize: 13 }}>
              No files uploaded yet
            </div>
          )}
        </Card>
      </div>

      {/* Manual Data Entry */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <SectionTitle subtitle="Manually add and edit data records">Manual Data Entry</SectionTitle>
          <button onClick={() => setShowAddRowModal(true)}
            style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: t.primary, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            + Add Row
          </button>
        </div>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                  {manualColumns.map(col => (
                    <th key={col.key} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, background: t.surfaceAlt }}>
                      {col.label}
                    </th>
                  ))}
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, background: t.surfaceAlt, width: 80 }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {manualData.map(row => (
                  <tr key={row.id} style={{ borderBottom: `1px solid ${t.borderSubtle}` }}
                    onMouseEnter={e => e.currentTarget.style.background = t.surfaceHover}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    {manualColumns.map(col => (
                      <td key={col.key}
                        onClick={() => setEditingCell({ rowId: row.id, field: col.key })}
                        style={{ padding: '12px 16px', fontSize: 13, color: t.text, cursor: 'pointer' }}>
                        {editingCell?.rowId === row.id && editingCell?.field === col.key ? (
                          <input autoFocus defaultValue={row[col.key]}
                            onBlur={e => handleCellEdit(row.id, col.key, e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleCellEdit(row.id, col.key, e.target.value); if (e.key === 'Escape') setEditingCell(null); }}
                            style={{ width: '100%', padding: '4px 8px', borderRadius: 4, border: `1px solid ${t.primary}`, background: t.surfaceAlt, color: t.text, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                        ) : col.key === 'status' ? (
                          <Badge variant={row[col.key] === 'Active' ? 'success' : 'warning'}>{row[col.key]}</Badge>
                        ) : (
                          row[col.key]
                        )}
                      </td>
                    ))}
                    <td style={{ padding: '12px 16px' }}>
                      <button onClick={() => handleDeleteRow(row.id)}
                        style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${t.dangerLight}`, background: t.dangerLight, color: t.danger, fontSize: 11, cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '10px 16px', borderTop: `1px solid ${t.border}`, fontSize: 11, color: t.textTertiary }}>
            Click any cell to edit. Press Enter to save, Escape to cancel.
          </div>
        </Card>
      </div>

      {/* Add Row Modal */}
      <Modal open={showAddRowModal} onClose={() => setShowAddRowModal(false)} title="Add New Row" width={480}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Agent Name" value={newRow.agent} onChange={e => setNewRow(prev => ({ ...prev, agent: e.target.value }))} placeholder="e.g., John Smith" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Team" value={newRow.team} onChange={e => setNewRow(prev => ({ ...prev, team: e.target.value }))} placeholder="e.g., Alpha" />
            <Input label="Calls" value={newRow.calls} onChange={e => setNewRow(prev => ({ ...prev, calls: e.target.value }))} placeholder="0" type="number" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="AHT" value={newRow.aht} onChange={e => setNewRow(prev => ({ ...prev, aht: e.target.value }))} placeholder="e.g., 4:30" />
            <Input label="CSAT" value={newRow.csat} onChange={e => setNewRow(prev => ({ ...prev, csat: e.target.value }))} placeholder="e.g., 4.5" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: t.text, marginBottom: 6 }}>Status</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Active', 'On Leave', 'Inactive'].map(s => (
                <button key={s} onClick={() => setNewRow(prev => ({ ...prev, status: s }))}
                  style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${newRow.status === s ? t.primary : t.border}`, background: newRow.status === s ? t.primaryLight : 'transparent', color: newRow.status === s ? t.primary : t.textSecondary, fontSize: 13, cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
            <button onClick={() => setShowAddRowModal(false)}
              style={{ padding: '10px 20px', borderRadius: 8, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 13, cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={handleAddRow}
              style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: t.primary, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Add Row
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── TAB 3: DATA MODEL ───
function DataModelTab() {
  const { t } = useTheme();
  const [expandedEntity, setExpandedEntity] = useState(null);
  const [showFieldEditor, setShowFieldEditor] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editingEntityId, setEditingEntityId] = useState(null);
  const [entities, setEntities] = useState(mockEntities);

  const openFieldEditor = (entity, field) => {
    setEditingEntityId(entity.id);
    setEditingField({ ...field });
    setShowFieldEditor(true);
  };

  const handleSaveField = () => {
    setEntities(prev => prev.map(ent => {
      if (ent.id === editingEntityId) {
        return {
          ...ent,
          fields: ent.fields.map(f => f.name === editingField.name ? editingField : f),
        };
      }
      return ent;
    }));
    setShowFieldEditor(false);
    setEditingField(null);
  };

  return (
    <div>
      <SectionTitle subtitle="View and manage your data model entities, fields, and relationships">Data Model</SectionTitle>

      {/* Entity Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 28 }}>
        {entities.map(entity => (
          <Card key={entity.id}
            onClick={() => setExpandedEntity(expandedEntity === entity.id ? null : entity.id)}
            style={{
              padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s',
              border: `1px solid ${expandedEntity === entity.id ? entity.color : t.border}`,
            }}>
            {/* Entity Header */}
            <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${entity.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {entity.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{entity.name}</div>
                <div style={{ fontSize: 12, color: t.textTertiary }}>{entity.fieldCount} fields  |  {entity.recordCount} records</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textTertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: expandedEntity === entity.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Relationships Preview */}
            <div style={{ padding: '0 20px 14px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {entity.relationships.map((rel, i) => (
                <span key={i} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 10, background: t.surfaceAlt, color: t.textSecondary }}>
                  {rel.label} {rel.target}
                </span>
              ))}
            </div>

            {/* Expanded Fields List */}
            {expandedEntity === entity.id && (
              <div style={{ borderTop: `1px solid ${t.border}` }} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '12px 20px', background: t.surfaceAlt, fontSize: 12, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Fields</span>
                  <span style={{ fontSize: 11, textTransform: 'none', fontWeight: 400 }}>{entity.fields.length} total</span>
                </div>
                <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                  {entity.fields.map((field, fi) => (
                    <div key={fi} style={{ padding: '10px 20px', borderBottom: `1px solid ${t.borderSubtle}`, display: 'flex', alignItems: 'center', gap: 10, transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = t.surfaceHover}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 13, fontWeight: 500, color: t.text, fontFamily: 'monospace' }}>{field.name}</span>
                          {!field.nullable && <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4, background: t.dangerLight, color: t.danger, fontWeight: 600 }}>REQ</span>}
                        </div>
                        <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 2 }}>{field.description}</div>
                      </div>
                      <Badge variant="info">{field.type}</Badge>
                      <button onClick={() => openFieldEditor(entity, field)}
                        style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 11, cursor: 'pointer', flexShrink: 0 }}>
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Relationships Overview */}
      <SectionTitle subtitle="Overview of all entity relationships in the data model">Relationships</SectionTitle>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                {['Source Entity', 'Relationship', 'Target Entity', 'Type'].map(col => (
                  <th key={col} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, background: t.surfaceAlt }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entities.flatMap(entity =>
                entity.relationships.map((rel, ri) => (
                  <tr key={`${entity.id}-${ri}`} style={{ borderBottom: `1px solid ${t.borderSubtle}` }}
                    onMouseEnter={e => e.currentTarget.style.background = t.surfaceHover}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: t.text, fontWeight: 500 }}>
                      <span style={{ marginRight: 8 }}>{entity.icon}</span>
                      {entity.name}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: t.textSecondary }}>{rel.label}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: t.text, fontWeight: 500 }}>{rel.target}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge variant={rel.type === 'has_many' ? 'primary' : 'warning'}>{rel.type.replace('_', ' ')}</Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Field Editor Modal */}
      <Modal open={showFieldEditor} onClose={() => { setShowFieldEditor(false); setEditingField(null); }} title="Edit Field" width={480}>
        {editingField && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Field Name" value={editingField.name} onChange={e => setEditingField(prev => ({ ...prev, name: e.target.value }))} placeholder="field_name" />
            <Input label="Data Type" value={editingField.type} onChange={e => setEditingField(prev => ({ ...prev, type: e.target.value }))} placeholder="VARCHAR(255)" />
            <Input label="Description" value={editingField.description} onChange={e => setEditingField(prev => ({ ...prev, description: e.target.value }))} placeholder="Field description" />
            <Toggle label="Nullable" checked={editingField.nullable} onChange={() => setEditingField(prev => ({ ...prev, nullable: !prev.nullable }))} />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
              <button onClick={() => { setShowFieldEditor(false); setEditingField(null); }}
                style={{ padding: '10px 20px', borderRadius: 8, border: `1px solid ${t.border}`, background: 'transparent', color: t.textSecondary, fontSize: 13, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleSaveField}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: t.primary, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── MAIN MODULE ───
export default function DataManagement() {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Integrations', icon: icons.zap, desc: 'Manage data source connections' },
    { label: 'Data Upload', icon: icons.upload, desc: 'Upload and manage data files' },
    { label: 'Data Model', icon: icons.folderOpen, desc: 'Review and edit data schema' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DashboardHeader
        title="Data Management"
        subtitle="Connect, upload, and manage your analytics data sources"
        actions={
          <button style={{ padding: '7px 16px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surface, color: t.textSecondary, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Documentation
          </button>
        }
      />

      {/* Tab Bar */}
      <div style={{ padding: '0 32px', background: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              style={{
                padding: '14px 24px', border: 'none', background: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, position: 'relative',
                color: activeTab === i ? t.primary : t.textSecondary,
                fontWeight: activeTab === i ? 600 : 400, fontSize: 13,
                transition: 'all 0.15s',
              }}>
              <span style={{ fontSize: 16 }}>{tab.icon}</span>
              <span>{tab.label}</span>
              {/* Active indicator */}
              {activeTab === i && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 12, right: 12, height: 2,
                  background: t.primary, borderRadius: '2px 2px 0 0',
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '28px 32px' }}>
        {activeTab === 0 && <IntegrationsTab />}
        {activeTab === 1 && <DataUploadTab />}
        {activeTab === 2 && <DataModelTab />}
      </div>
    </div>
  );
}
