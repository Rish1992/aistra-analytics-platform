// =============================================================================
// AISTRA ANALYTICS PLATFORM - COMPREHENSIVE MOCK DATA
// Company: TechConnect Solutions (BPO)
// ~500 agents | 6 teams | 5 clients | 14 dashboards
// Data period: January - December 2025
// =============================================================================

// -----------------------------------------------------------------------------
// 1. TEAMS
// -----------------------------------------------------------------------------
export const teams = [
  { id: 'T-001', name: 'Alpha', lead: 'Marcus Chen', headcount: 92, shift: 'Day', location: 'Austin, TX', specialty: 'Technical Support', color: '#4F46E5' },
  { id: 'T-002', name: 'Beta', lead: 'Sarah Okonkwo', headcount: 88, shift: 'Day', location: 'Austin, TX', specialty: 'Customer Service', color: '#0EA5E9' },
  { id: 'T-003', name: 'Gamma', lead: 'David Park', headcount: 85, shift: 'Swing', location: 'Phoenix, AZ', specialty: 'Sales & Retention', color: '#10B981' },
  { id: 'T-004', name: 'Delta', lead: 'Rachel Foster', headcount: 78, shift: 'Swing', location: 'Phoenix, AZ', specialty: 'Billing & Collections', color: '#F59E0B' },
  { id: 'T-005', name: 'Epsilon', lead: 'James Rivera', headcount: 82, shift: 'Night', location: 'Omaha, NE', specialty: 'After-Hours Support', color: '#8B5CF6' },
  { id: 'T-006', name: 'Omega', lead: 'Priya Sharma', headcount: 75, shift: 'Night', location: 'Omaha, NE', specialty: 'Escalations & Tier 2', color: '#EC4899' },
];

// -----------------------------------------------------------------------------
// 2. CLIENTS
// -----------------------------------------------------------------------------
export const clients = [
  { id: 'C-001', name: 'TechConnect Solutions', industry: 'Technology', contractStart: '2022-03-01', contractValue: 4200000, slaTarget: 80, status: 'active', primaryContact: 'Alan Whitfield', tier: 'Enterprise' },
  { id: 'C-002', name: 'Premier Healthcare', industry: 'Healthcare', contractStart: '2023-01-15', contractValue: 3100000, slaTarget: 85, status: 'active', primaryContact: 'Dr. Mina Patel', tier: 'Enterprise' },
  { id: 'C-003', name: 'Swift Logistics', industry: 'Logistics', contractStart: '2023-06-01', contractValue: 2400000, slaTarget: 75, status: 'active', primaryContact: 'Tom Brennan', tier: 'Mid-Market' },
  { id: 'C-004', name: 'National Real Estate', industry: 'Real Estate', contractStart: '2024-02-01', contractValue: 1800000, slaTarget: 78, status: 'active', primaryContact: 'Lisa Hernandez', tier: 'Mid-Market' },
  { id: 'C-005', name: 'Global Media Corp', industry: 'Media & Entertainment', contractStart: '2024-08-01', contractValue: 1500000, slaTarget: 80, status: 'active', primaryContact: 'Derek Nguyen', tier: 'Growth' },
];

// -----------------------------------------------------------------------------
// 3. AGENTS (35 representative agents with full profiles)
// -----------------------------------------------------------------------------
export const agents = [
  // --- Team Alpha (Technical Support) ---
  { id: 'A-001', name: 'Emily Zhang', team: 'Alpha', role: 'Senior Agent', hireDate: '2022-04-15', status: 'active', supervisor: 'Marcus Chen', skills: ['Tier 2', 'Networking', 'Cloud'], certifications: ['AWS Certified', 'ITIL v4'], avatar: null },
  { id: 'A-002', name: 'Jordan Williams', team: 'Alpha', role: 'Agent', hireDate: '2023-02-10', status: 'active', supervisor: 'Marcus Chen', skills: ['Tier 1', 'Desktop', 'Mobile'], certifications: ['CompTIA A+'], avatar: null },
  { id: 'A-003', name: 'Aisha Patel', team: 'Alpha', role: 'Agent', hireDate: '2023-07-22', status: 'active', supervisor: 'Marcus Chen', skills: ['Tier 1', 'Software', 'VPN'], certifications: [], avatar: null },
  { id: 'A-004', name: 'Carlos Mendoza', team: 'Alpha', role: 'Senior Agent', hireDate: '2021-11-03', status: 'active', supervisor: 'Marcus Chen', skills: ['Tier 2', 'Server', 'Security'], certifications: ['CISSP', 'ITIL v4'], avatar: null },
  { id: 'A-005', name: 'Natasha Brooks', team: 'Alpha', role: 'Agent', hireDate: '2024-01-08', status: 'active', supervisor: 'Marcus Chen', skills: ['Tier 1', 'Email', 'Chat'], certifications: [], avatar: null },
  { id: 'A-006', name: 'Ryan Kowalski', team: 'Alpha', role: 'Agent', hireDate: '2024-06-15', status: 'active', supervisor: 'Marcus Chen', skills: ['Tier 1', 'Desktop'], certifications: [], avatar: null },

  // --- Team Beta (Customer Service) ---
  { id: 'A-007', name: 'Sophia Martinez', team: 'Beta', role: 'Senior Agent', hireDate: '2022-01-20', status: 'active', supervisor: 'Sarah Okonkwo', skills: ['Retention', 'Upsell', 'Complaints'], certifications: ['CX Professional'], avatar: null },
  { id: 'A-008', name: 'Michael Thompson', team: 'Beta', role: 'Agent', hireDate: '2023-05-14', status: 'active', supervisor: 'Sarah Okonkwo', skills: ['General Inquiry', 'Account Mgmt'], certifications: [], avatar: null },
  { id: 'A-009', name: 'Olivia Jackson', team: 'Beta', role: 'Agent', hireDate: '2023-09-30', status: 'active', supervisor: 'Sarah Okonkwo', skills: ['General Inquiry', 'Billing'], certifications: [], avatar: null },
  { id: 'A-010', name: 'Ethan Davis', team: 'Beta', role: 'Agent', hireDate: '2024-03-18', status: 'active', supervisor: 'Sarah Okonkwo', skills: ['Chat', 'Email'], certifications: [], avatar: null },
  { id: 'A-011', name: 'Grace Kim', team: 'Beta', role: 'Senior Agent', hireDate: '2021-08-05', status: 'active', supervisor: 'Sarah Okonkwo', skills: ['Retention', 'Escalations', 'Training'], certifications: ['CX Professional', 'Six Sigma Green Belt'], avatar: null },
  { id: 'A-012', name: 'Liam Anderson', team: 'Beta', role: 'Agent', hireDate: '2024-07-01', status: 'active', supervisor: 'Sarah Okonkwo', skills: ['General Inquiry'], certifications: [], avatar: null },

  // --- Team Gamma (Sales & Retention) ---
  { id: 'A-013', name: 'Isabella Rodriguez', team: 'Gamma', role: 'Senior Agent', hireDate: '2022-06-12', status: 'active', supervisor: 'David Park', skills: ['Outbound Sales', 'Retention', 'Upsell'], certifications: ['Salesforce Certified'], avatar: null },
  { id: 'A-014', name: 'Noah Clark', team: 'Gamma', role: 'Agent', hireDate: '2023-04-25', status: 'active', supervisor: 'David Park', skills: ['Inbound Sales', 'Cross-sell'], certifications: [], avatar: null },
  { id: 'A-015', name: 'Ava Robinson', team: 'Gamma', role: 'Agent', hireDate: '2023-11-08', status: 'active', supervisor: 'David Park', skills: ['Retention', 'Win-back'], certifications: [], avatar: null },
  { id: 'A-016', name: 'Mason Lee', team: 'Gamma', role: 'Agent', hireDate: '2024-02-28', status: 'active', supervisor: 'David Park', skills: ['Outbound Sales', 'Lead Qualification'], certifications: [], avatar: null },
  { id: 'A-017', name: 'Chloe Nguyen', team: 'Gamma', role: 'Senior Agent', hireDate: '2021-12-15', status: 'active', supervisor: 'David Park', skills: ['Strategic Sales', 'Coaching', 'Retention'], certifications: ['Salesforce Certified', 'HubSpot Sales'], avatar: null },

  // --- Team Delta (Billing & Collections - UNDERPERFORMING) ---
  { id: 'A-018', name: 'Benjamin Taylor', team: 'Delta', role: 'Senior Agent', hireDate: '2022-09-01', status: 'active', supervisor: 'Rachel Foster', skills: ['Collections', 'Payment Plans', 'Disputes'], certifications: [], avatar: null },
  { id: 'A-019', name: 'Mia Harris', team: 'Delta', role: 'Agent', hireDate: '2023-08-19', status: 'active', supervisor: 'Rachel Foster', skills: ['Billing Inquiry', 'Refunds'], certifications: [], avatar: null },
  { id: 'A-020', name: 'Alexander White', team: 'Delta', role: 'Agent', hireDate: '2024-04-10', status: 'active', supervisor: 'Rachel Foster', skills: ['Collections', 'Basic Billing'], certifications: [], avatar: null },
  { id: 'A-021', name: 'Charlotte Adams', team: 'Delta', role: 'Agent', hireDate: '2024-08-22', status: 'on_pip', supervisor: 'Rachel Foster', skills: ['Billing Inquiry'], certifications: [], avatar: null },
  { id: 'A-022', name: 'Daniel Evans', team: 'Delta', role: 'Agent', hireDate: '2024-09-15', status: 'active', supervisor: 'Rachel Foster', skills: ['Collections'], certifications: [], avatar: null },
  { id: 'A-023', name: 'Harper Wilson', team: 'Delta', role: 'Agent', hireDate: '2025-01-06', status: 'training', supervisor: 'Rachel Foster', skills: [], certifications: [], avatar: null },

  // --- Team Epsilon (After-Hours Support) ---
  { id: 'A-024', name: 'Sebastian Moore', team: 'Epsilon', role: 'Senior Agent', hireDate: '2022-03-28', status: 'active', supervisor: 'James Rivera', skills: ['Tier 2', 'Emergency', 'Escalation'], certifications: ['ITIL v4'], avatar: null },
  { id: 'A-025', name: 'Amelia Turner', team: 'Epsilon', role: 'Agent', hireDate: '2023-06-05', status: 'active', supervisor: 'James Rivera', skills: ['Tier 1', 'After-Hours'], certifications: [], avatar: null },
  { id: 'A-026', name: 'Henry Phillips', team: 'Epsilon', role: 'Agent', hireDate: '2023-12-11', status: 'active', supervisor: 'James Rivera', skills: ['Tier 1', 'Chat'], certifications: [], avatar: null },
  { id: 'A-027', name: 'Ella Campbell', team: 'Epsilon', role: 'Agent', hireDate: '2024-05-20', status: 'active', supervisor: 'James Rivera', skills: ['Tier 1', 'Email'], certifications: [], avatar: null },
  { id: 'A-028', name: 'Jack Mitchell', team: 'Epsilon', role: 'Agent', hireDate: '2024-10-01', status: 'active', supervisor: 'James Rivera', skills: ['Tier 1'], certifications: [], avatar: null },

  // --- Team Omega (Escalations & Tier 2) ---
  { id: 'A-029', name: 'Victoria Scott', team: 'Omega', role: 'Senior Agent', hireDate: '2021-06-14', status: 'active', supervisor: 'Priya Sharma', skills: ['Tier 3', 'Root Cause', 'Executive Escalation'], certifications: ['ITIL v4', 'PMP'], avatar: null },
  { id: 'A-030', name: 'Lucas Wright', team: 'Omega', role: 'Agent', hireDate: '2023-03-17', status: 'active', supervisor: 'Priya Sharma', skills: ['Tier 2', 'Technical Escalation'], certifications: ['CompTIA Network+'], avatar: null },
  { id: 'A-031', name: 'Zoe Baker', team: 'Omega', role: 'Agent', hireDate: '2023-10-28', status: 'active', supervisor: 'Priya Sharma', skills: ['Tier 2', 'Complaint Resolution'], certifications: [], avatar: null },
  { id: 'A-032', name: 'Owen Gonzalez', team: 'Omega', role: 'Agent', hireDate: '2024-01-22', status: 'active', supervisor: 'Priya Sharma', skills: ['Tier 2', 'Billing Escalation'], certifications: [], avatar: null },
  { id: 'A-033', name: 'Lily Ramirez', team: 'Omega', role: 'Senior Agent', hireDate: '2022-02-10', status: 'active', supervisor: 'Priya Sharma', skills: ['Tier 3', 'QA Review', 'Mentoring'], certifications: ['CX Professional'], avatar: null },
  { id: 'A-034', name: 'Samuel Cooper', team: 'Omega', role: 'Agent', hireDate: '2024-06-08', status: 'active', supervisor: 'Priya Sharma', skills: ['Tier 2'], certifications: [], avatar: null },
  { id: 'A-035', name: 'Aria Hughes', team: 'Omega', role: 'Agent', hireDate: '2024-11-18', status: 'active', supervisor: 'Priya Sharma', skills: ['Tier 2', 'Chat Escalation'], certifications: [], avatar: null },
];

// -----------------------------------------------------------------------------
// 4. MONTHLY PERFORMANCE METRICS (Jan - Dec 2025)
//    Story: Steady growth, ~18% QoQ revenue increase, CSAT trending up
// -----------------------------------------------------------------------------
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const monthlyMetrics = {
  // Call volumes - gradual increase with seasonal dips in Feb and Nov
  callVolume: [42150, 39800, 44200, 45600, 47100, 48300, 49800, 51200, 52700, 54100, 50900, 53600],
  callsAnswered: [39400, 37200, 41500, 42900, 44500, 45700, 47100, 48600, 50100, 51500, 48300, 51100],
  callsAbandoned: [2750, 2600, 2700, 2700, 2600, 2600, 2700, 2600, 2600, 2600, 2600, 2500],

  // Service levels (% answered within 20s) - improving trend
  serviceLevel: [78.2, 77.5, 79.1, 79.8, 80.4, 81.0, 81.3, 81.9, 82.5, 83.1, 82.0, 83.8],

  // AHT in seconds - slight downward trend (efficiency gains)
  aht: [342, 338, 335, 331, 328, 325, 322, 319, 316, 314, 317, 312],

  // ASA (Average Speed of Answer) in seconds - improving
  asa: [28, 30, 27, 26, 25, 24, 24, 23, 22, 21, 23, 20],

  // CSAT (1-5 scale) - trending slightly positive
  csat: [4.12, 4.10, 4.15, 4.18, 4.21, 4.24, 4.26, 4.29, 4.31, 4.34, 4.30, 4.37],

  // NPS - trending positive
  nps: [32, 31, 34, 36, 38, 40, 41, 43, 45, 47, 44, 48],

  // FCR (First Contact Resolution %) - steady improvement
  fcr: [71.2, 71.0, 72.1, 72.8, 73.4, 74.0, 74.5, 75.1, 75.6, 76.2, 75.5, 76.8],

  // QA Scores (0-100) - gradual improvement
  qaScore: [82.4, 82.1, 83.0, 83.5, 84.1, 84.6, 85.0, 85.4, 85.9, 86.3, 85.8, 86.7],

  // Agent occupancy %
  occupancy: [81.5, 80.2, 82.8, 83.1, 83.5, 84.0, 84.2, 84.5, 84.8, 85.1, 83.9, 85.4],

  // Schedule adherence %
  adherence: [89.2, 88.8, 90.1, 90.5, 91.0, 91.3, 91.5, 91.8, 92.1, 92.4, 91.8, 92.7],

  // Attrition % (monthly, annualized)
  attrition: [32, 34, 30, 28, 27, 26, 25, 24, 23, 22, 24, 21],
};

// -----------------------------------------------------------------------------
// 5. FINANCIAL DATA
//    Revenue grows ~18% QoQ. Margins widen with scale.
// -----------------------------------------------------------------------------
export const financialData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  revenue: [980000, 940000, 1020000, 1085000, 1140000, 1210000, 1295000, 1360000, 1440000, 1530000, 1460000, 1580000],
  laborCost: [612000, 595000, 632000, 661000, 684000, 714000, 752000, 782000, 816000, 856000, 825000, 878000],
  techCost: [78000, 76000, 80000, 82000, 84000, 86000, 88000, 90000, 92000, 94000, 92000, 96000],
  facilityCost: [45000, 45000, 45000, 45000, 45000, 47000, 47000, 47000, 47000, 47000, 47000, 49000],
  overheadCost: [98000, 94000, 102000, 104000, 106000, 110000, 114000, 118000, 122000, 126000, 122000, 130000],

  // Derived margins
  get totalCost() {
    return this.laborCost.map((l, i) => l + this.techCost[i] + this.facilityCost[i] + this.overheadCost[i]);
  },
  get grossProfit() {
    return this.revenue.map((r, i) => r - (this.laborCost[i] + this.techCost[i]));
  },
  get netProfit() {
    return this.revenue.map((r, i) => r - (this.laborCost[i] + this.techCost[i] + this.facilityCost[i] + this.overheadCost[i]));
  },
  get margin() {
    return this.revenue.map((r, i) => {
      const total = this.laborCost[i] + this.techCost[i] + this.facilityCost[i] + this.overheadCost[i];
      return parseFloat(((r - total) / r * 100).toFixed(1));
    });
  },

  // Revenue by client
  revenueByClient: {
    'TechConnect Solutions': [310000, 298000, 324000, 345000, 362000, 385000, 412000, 434000, 460000, 490000, 466000, 506000],
    'Premier Healthcare': [245000, 234000, 256000, 271000, 285000, 302000, 323000, 340000, 360000, 382000, 365000, 395000],
    'Swift Logistics': [195000, 186000, 203000, 215000, 228000, 242000, 260000, 272000, 288000, 306000, 292000, 316000],
    'National Real Estate': [138000, 132000, 143000, 152000, 159000, 168000, 180000, 189000, 200000, 212000, 203000, 219000],
    'Global Media Corp': [92000, 90000, 94000, 102000, 106000, 113000, 120000, 125000, 132000, 140000, 134000, 144000],
  },

  // Cost per contact
  costPerContact: [19.72, 20.32, 19.45, 19.56, 19.51, 19.80, 20.10, 20.27, 20.45, 20.76, 21.34, 21.51],

  // Revenue per agent per month
  revenuePerAgent: [1960, 1880, 2040, 2170, 2280, 2420, 2590, 2720, 2880, 3060, 2920, 3160],
};

// -----------------------------------------------------------------------------
// 6. DAILY CALL VOLUME (sample week: Mon-Sun of a typical October week)
// -----------------------------------------------------------------------------
export const dailyCallVolume = [
  { day: 'Mon', date: '2025-10-06', calls: 2620, answered: 2492, abandoned: 128, serviceLevel: 83.5 },
  { day: 'Tue', date: '2025-10-07', calls: 2710, answered: 2585, abandoned: 125, serviceLevel: 84.1 },
  { day: 'Wed', date: '2025-10-08', calls: 2680, answered: 2558, abandoned: 122, serviceLevel: 83.9 },
  { day: 'Thu', date: '2025-10-09', calls: 2750, answered: 2628, abandoned: 122, serviceLevel: 84.3 },
  { day: 'Fri', date: '2025-10-10', calls: 2590, answered: 2466, abandoned: 124, serviceLevel: 82.8 },
  { day: 'Sat', date: '2025-10-11', calls: 1480, answered: 1399, abandoned: 81, serviceLevel: 80.2 },
  { day: 'Sun', date: '2025-10-12', calls: 1270, answered: 1198, abandoned: 72, serviceLevel: 79.5 },
];

// -----------------------------------------------------------------------------
// 7. INTERVAL DATA (30-min intervals for a sample day: Oct 8, 2025)
// -----------------------------------------------------------------------------
export const intervalData = [
  { time: '06:00', calls: 32, answered: 30, abandoned: 2, aht: 298, asa: 14, agentsLoggedIn: 28, serviceLevel: 91.2 },
  { time: '06:30', calls: 45, answered: 42, abandoned: 3, aht: 305, asa: 16, agentsLoggedIn: 35, serviceLevel: 89.5 },
  { time: '07:00', calls: 68, answered: 64, abandoned: 4, aht: 312, asa: 18, agentsLoggedIn: 52, serviceLevel: 87.1 },
  { time: '07:30', calls: 95, answered: 89, abandoned: 6, aht: 318, asa: 20, agentsLoggedIn: 68, serviceLevel: 85.4 },
  { time: '08:00', calls: 142, answered: 132, abandoned: 10, aht: 325, asa: 24, agentsLoggedIn: 95, serviceLevel: 82.8 },
  { time: '08:30', calls: 168, answered: 155, abandoned: 13, aht: 330, asa: 28, agentsLoggedIn: 112, serviceLevel: 80.1 },
  { time: '09:00', calls: 195, answered: 180, abandoned: 15, aht: 335, asa: 32, agentsLoggedIn: 128, serviceLevel: 78.5 },
  { time: '09:30', calls: 210, answered: 194, abandoned: 16, aht: 328, asa: 30, agentsLoggedIn: 142, serviceLevel: 79.2 },
  { time: '10:00', calls: 225, answered: 210, abandoned: 15, aht: 320, asa: 26, agentsLoggedIn: 155, serviceLevel: 81.4 },
  { time: '10:30', calls: 218, answered: 204, abandoned: 14, aht: 315, asa: 24, agentsLoggedIn: 158, serviceLevel: 82.6 },
  { time: '11:00', calls: 230, answered: 216, abandoned: 14, aht: 310, asa: 22, agentsLoggedIn: 162, serviceLevel: 83.9 },
  { time: '11:30', calls: 215, answered: 202, abandoned: 13, aht: 308, asa: 21, agentsLoggedIn: 158, serviceLevel: 84.2 },
  { time: '12:00', calls: 185, answered: 174, abandoned: 11, aht: 302, asa: 20, agentsLoggedIn: 130, serviceLevel: 84.8 },
  { time: '12:30', calls: 170, answered: 160, abandoned: 10, aht: 298, asa: 19, agentsLoggedIn: 118, serviceLevel: 85.5 },
  { time: '13:00', calls: 205, answered: 193, abandoned: 12, aht: 315, asa: 23, agentsLoggedIn: 148, serviceLevel: 83.1 },
  { time: '13:30', calls: 215, answered: 202, abandoned: 13, aht: 318, asa: 25, agentsLoggedIn: 155, serviceLevel: 82.4 },
  { time: '14:00', calls: 228, answered: 214, abandoned: 14, aht: 322, asa: 27, agentsLoggedIn: 160, serviceLevel: 81.6 },
  { time: '14:30', calls: 220, answered: 207, abandoned: 13, aht: 318, asa: 25, agentsLoggedIn: 158, serviceLevel: 82.2 },
  { time: '15:00', calls: 208, answered: 196, abandoned: 12, aht: 312, asa: 22, agentsLoggedIn: 152, serviceLevel: 83.5 },
  { time: '15:30', calls: 195, answered: 184, abandoned: 11, aht: 308, asa: 20, agentsLoggedIn: 145, serviceLevel: 84.1 },
  { time: '16:00', calls: 178, answered: 168, abandoned: 10, aht: 305, asa: 19, agentsLoggedIn: 132, serviceLevel: 84.8 },
  { time: '16:30', calls: 155, answered: 146, abandoned: 9, aht: 300, asa: 18, agentsLoggedIn: 115, serviceLevel: 85.4 },
  { time: '17:00', calls: 132, answered: 125, abandoned: 7, aht: 295, asa: 16, agentsLoggedIn: 98, serviceLevel: 86.2 },
  { time: '17:30', calls: 108, answered: 102, abandoned: 6, aht: 290, asa: 15, agentsLoggedIn: 82, serviceLevel: 87.0 },
  { time: '18:00', calls: 85, answered: 80, abandoned: 5, aht: 288, asa: 14, agentsLoggedIn: 65, serviceLevel: 87.8 },
  { time: '18:30', calls: 72, answered: 68, abandoned: 4, aht: 285, asa: 13, agentsLoggedIn: 55, serviceLevel: 88.5 },
  { time: '19:00', calls: 58, answered: 55, abandoned: 3, aht: 280, asa: 12, agentsLoggedIn: 45, serviceLevel: 89.2 },
  { time: '19:30', calls: 48, answered: 46, abandoned: 2, aht: 275, asa: 11, agentsLoggedIn: 38, serviceLevel: 90.0 },
  { time: '20:00', calls: 38, answered: 36, abandoned: 2, aht: 270, asa: 10, agentsLoggedIn: 32, serviceLevel: 90.8 },
  { time: '20:30', calls: 30, answered: 29, abandoned: 1, aht: 265, asa: 9, agentsLoggedIn: 28, serviceLevel: 91.5 },
  { time: '21:00', calls: 22, answered: 21, abandoned: 1, aht: 260, asa: 8, agentsLoggedIn: 22, serviceLevel: 92.1 },
  { time: '21:30', calls: 18, answered: 17, abandoned: 1, aht: 258, asa: 8, agentsLoggedIn: 20, serviceLevel: 92.5 },
];

// -----------------------------------------------------------------------------
// 8. QUEUE DATA (8 queues with performance metrics)
// -----------------------------------------------------------------------------
export const queues = [
  { id: 'Q-001', name: 'General Inquiry', client: 'All', callsToday: 485, waiting: 12, longestWait: 142, avgWait: 22, serviceLevel: 83.5, aht: 285, agents: 42, abandonRate: 4.2 },
  { id: 'Q-002', name: 'Technical Support', client: 'TechConnect Solutions', callsToday: 392, waiting: 8, longestWait: 98, avgWait: 18, serviceLevel: 86.1, aht: 420, agents: 38, abandonRate: 3.1 },
  { id: 'Q-003', name: 'Billing & Payments', client: 'All', callsToday: 310, waiting: 18, longestWait: 210, avgWait: 35, serviceLevel: 74.8, aht: 310, agents: 28, abandonRate: 6.8 },
  { id: 'Q-004', name: 'Healthcare Support', client: 'Premier Healthcare', callsToday: 278, waiting: 5, longestWait: 65, avgWait: 15, serviceLevel: 88.4, aht: 380, agents: 32, abandonRate: 2.5 },
  { id: 'Q-005', name: 'Sales Inbound', client: 'All', callsToday: 245, waiting: 3, longestWait: 45, avgWait: 12, serviceLevel: 91.2, aht: 350, agents: 25, abandonRate: 1.8 },
  { id: 'Q-006', name: 'Logistics Tracking', client: 'Swift Logistics', callsToday: 218, waiting: 7, longestWait: 88, avgWait: 20, serviceLevel: 82.3, aht: 265, agents: 22, abandonRate: 3.9 },
  { id: 'Q-007', name: 'Escalations', client: 'All', callsToday: 95, waiting: 2, longestWait: 52, avgWait: 14, serviceLevel: 87.6, aht: 540, agents: 18, abandonRate: 2.1 },
  { id: 'Q-008', name: 'After-Hours Emergency', client: 'All', callsToday: 62, waiting: 1, longestWait: 38, avgWait: 10, serviceLevel: 90.3, aht: 295, agents: 12, abandonRate: 1.6 },
];

// -----------------------------------------------------------------------------
// 9. AGENT PERFORMANCE (per-agent metrics - current month snapshot)
//    Delta team intentionally underperforms
// -----------------------------------------------------------------------------
export const agentPerformance = [
  // Alpha - Strong technical team
  { agentId: 'A-001', name: 'Emily Zhang', team: 'Alpha', aht: 298, qaScore: 94, csat: 4.62, fcr: 82.1, adherence: 96.2, callsPerDay: 38, occupancy: 87.5, utilization: 91.2 },
  { agentId: 'A-002', name: 'Jordan Williams', team: 'Alpha', aht: 325, qaScore: 86, csat: 4.35, fcr: 75.4, adherence: 93.1, callsPerDay: 34, occupancy: 84.2, utilization: 88.1 },
  { agentId: 'A-003', name: 'Aisha Patel', team: 'Alpha', aht: 310, qaScore: 88, csat: 4.41, fcr: 77.8, adherence: 94.5, callsPerDay: 36, occupancy: 85.8, utilization: 89.5 },
  { agentId: 'A-004', name: 'Carlos Mendoza', team: 'Alpha', aht: 290, qaScore: 96, csat: 4.71, fcr: 85.3, adherence: 97.1, callsPerDay: 40, occupancy: 88.9, utilization: 92.8 },
  { agentId: 'A-005', name: 'Natasha Brooks', team: 'Alpha', aht: 345, qaScore: 82, csat: 4.18, fcr: 70.2, adherence: 91.8, callsPerDay: 31, occupancy: 82.1, utilization: 86.4 },
  { agentId: 'A-006', name: 'Ryan Kowalski', team: 'Alpha', aht: 358, qaScore: 79, csat: 4.05, fcr: 67.5, adherence: 90.2, callsPerDay: 29, occupancy: 80.5, utilization: 84.8 },

  // Beta - Solid customer service
  { agentId: 'A-007', name: 'Sophia Martinez', team: 'Beta', aht: 275, qaScore: 92, csat: 4.58, fcr: 80.5, adherence: 95.8, callsPerDay: 42, occupancy: 89.1, utilization: 92.4 },
  { agentId: 'A-008', name: 'Michael Thompson', team: 'Beta', aht: 305, qaScore: 85, csat: 4.30, fcr: 74.1, adherence: 92.5, callsPerDay: 36, occupancy: 84.8, utilization: 88.9 },
  { agentId: 'A-009', name: 'Olivia Jackson', team: 'Beta', aht: 295, qaScore: 87, csat: 4.38, fcr: 76.9, adherence: 93.8, callsPerDay: 37, occupancy: 86.2, utilization: 89.8 },
  { agentId: 'A-010', name: 'Ethan Davis', team: 'Beta', aht: 320, qaScore: 83, csat: 4.22, fcr: 72.5, adherence: 91.2, callsPerDay: 33, occupancy: 83.5, utilization: 87.2 },
  { agentId: 'A-011', name: 'Grace Kim', team: 'Beta', aht: 268, qaScore: 95, csat: 4.68, fcr: 83.7, adherence: 96.5, callsPerDay: 43, occupancy: 90.2, utilization: 93.5 },
  { agentId: 'A-012', name: 'Liam Anderson', team: 'Beta', aht: 348, qaScore: 78, csat: 4.02, fcr: 66.8, adherence: 89.8, callsPerDay: 30, occupancy: 81.2, utilization: 85.1 },

  // Gamma - Sales-driven metrics
  { agentId: 'A-013', name: 'Isabella Rodriguez', team: 'Gamma', aht: 340, qaScore: 90, csat: 4.45, fcr: 72.8, adherence: 94.2, callsPerDay: 32, occupancy: 86.5, utilization: 90.1 },
  { agentId: 'A-014', name: 'Noah Clark', team: 'Gamma', aht: 365, qaScore: 84, csat: 4.25, fcr: 68.4, adherence: 92.1, callsPerDay: 29, occupancy: 83.1, utilization: 87.5 },
  { agentId: 'A-015', name: 'Ava Robinson', team: 'Gamma', aht: 330, qaScore: 86, csat: 4.32, fcr: 71.5, adherence: 93.5, callsPerDay: 33, occupancy: 85.2, utilization: 88.8 },
  { agentId: 'A-016', name: 'Mason Lee', team: 'Gamma', aht: 378, qaScore: 81, csat: 4.15, fcr: 65.2, adherence: 90.8, callsPerDay: 27, occupancy: 81.8, utilization: 86.2 },
  { agentId: 'A-017', name: 'Chloe Nguyen', team: 'Gamma', aht: 310, qaScore: 93, csat: 4.55, fcr: 78.9, adherence: 95.5, callsPerDay: 35, occupancy: 87.8, utilization: 91.5 },

  // Delta - UNDERPERFORMING team (higher AHT, lower QA, lower CSAT, poor adherence)
  { agentId: 'A-018', name: 'Benjamin Taylor', team: 'Delta', aht: 385, qaScore: 76, csat: 3.92, fcr: 62.1, adherence: 87.5, callsPerDay: 26, occupancy: 78.2, utilization: 82.5 },
  { agentId: 'A-019', name: 'Mia Harris', team: 'Delta', aht: 410, qaScore: 72, csat: 3.78, fcr: 58.5, adherence: 85.2, callsPerDay: 24, occupancy: 76.8, utilization: 80.1 },
  { agentId: 'A-020', name: 'Alexander White', team: 'Delta', aht: 425, qaScore: 70, csat: 3.65, fcr: 55.8, adherence: 83.8, callsPerDay: 22, occupancy: 74.5, utilization: 78.8 },
  { agentId: 'A-021', name: 'Charlotte Adams', team: 'Delta', aht: 462, qaScore: 64, csat: 3.42, fcr: 48.2, adherence: 78.5, callsPerDay: 19, occupancy: 70.2, utilization: 74.5 },
  { agentId: 'A-022', name: 'Daniel Evans', team: 'Delta', aht: 438, qaScore: 68, csat: 3.55, fcr: 52.4, adherence: 81.2, callsPerDay: 21, occupancy: 73.1, utilization: 77.2 },
  { agentId: 'A-023', name: 'Harper Wilson', team: 'Delta', aht: 480, qaScore: 58, csat: 3.28, fcr: 44.5, adherence: 75.8, callsPerDay: 17, occupancy: 68.5, utilization: 72.1 },

  // Epsilon - Solid night-shift team
  { agentId: 'A-024', name: 'Sebastian Moore', team: 'Epsilon', aht: 305, qaScore: 91, csat: 4.48, fcr: 79.2, adherence: 95.1, callsPerDay: 35, occupancy: 86.8, utilization: 90.5 },
  { agentId: 'A-025', name: 'Amelia Turner', team: 'Epsilon', aht: 318, qaScore: 85, csat: 4.28, fcr: 73.5, adherence: 92.8, callsPerDay: 33, occupancy: 84.1, utilization: 88.2 },
  { agentId: 'A-026', name: 'Henry Phillips', team: 'Epsilon', aht: 328, qaScore: 83, csat: 4.20, fcr: 71.2, adherence: 91.5, callsPerDay: 32, occupancy: 83.2, utilization: 87.1 },
  { agentId: 'A-027', name: 'Ella Campbell', team: 'Epsilon', aht: 335, qaScore: 81, csat: 4.12, fcr: 69.8, adherence: 90.5, callsPerDay: 31, occupancy: 82.5, utilization: 86.5 },
  { agentId: 'A-028', name: 'Jack Mitchell', team: 'Epsilon', aht: 350, qaScore: 77, csat: 3.98, fcr: 65.5, adherence: 88.2, callsPerDay: 28, occupancy: 80.1, utilization: 84.2 },

  // Omega - Expert escalation team (higher AHT is expected, high QA)
  { agentId: 'A-029', name: 'Victoria Scott', team: 'Omega', aht: 485, qaScore: 97, csat: 4.75, fcr: 88.5, adherence: 97.5, callsPerDay: 18, occupancy: 91.2, utilization: 94.5 },
  { agentId: 'A-030', name: 'Lucas Wright', team: 'Omega', aht: 445, qaScore: 89, csat: 4.42, fcr: 78.2, adherence: 94.5, callsPerDay: 22, occupancy: 87.5, utilization: 91.2 },
  { agentId: 'A-031', name: 'Zoe Baker', team: 'Omega', aht: 460, qaScore: 87, csat: 4.35, fcr: 75.8, adherence: 93.2, callsPerDay: 20, occupancy: 86.2, utilization: 90.1 },
  { agentId: 'A-032', name: 'Owen Gonzalez', team: 'Omega', aht: 470, qaScore: 85, csat: 4.28, fcr: 73.5, adherence: 92.1, callsPerDay: 19, occupancy: 85.5, utilization: 89.2 },
  { agentId: 'A-033', name: 'Lily Ramirez', team: 'Omega', aht: 435, qaScore: 95, csat: 4.65, fcr: 85.1, adherence: 96.8, callsPerDay: 23, occupancy: 89.8, utilization: 93.2 },
  { agentId: 'A-034', name: 'Samuel Cooper', team: 'Omega', aht: 490, qaScore: 82, csat: 4.18, fcr: 70.2, adherence: 91.5, callsPerDay: 18, occupancy: 84.2, utilization: 88.5 },
  { agentId: 'A-035', name: 'Aria Hughes', team: 'Omega', aht: 510, qaScore: 78, csat: 4.05, fcr: 66.8, adherence: 89.8, callsPerDay: 16, occupancy: 82.1, utilization: 86.8 },
];

// -----------------------------------------------------------------------------
// 10. TEAM PERFORMANCE SUMMARY (aggregated from agent data)
// -----------------------------------------------------------------------------
export const teamPerformance = [
  { team: 'Alpha', avgAht: 321, avgQa: 87.5, avgCsat: 4.39, avgFcr: 76.4, avgAdherence: 93.8, avgOccupancy: 84.8, callsPerAgent: 34.7, headcount: 92, attrition: 18 },
  { team: 'Beta', avgAht: 302, avgQa: 86.7, avgCsat: 4.36, avgFcr: 75.8, avgAdherence: 93.1, avgOccupancy: 85.8, callsPerAgent: 36.8, headcount: 88, attrition: 20 },
  { team: 'Gamma', avgAht: 345, avgQa: 86.8, avgCsat: 4.34, avgFcr: 71.4, avgAdherence: 93.2, avgOccupancy: 84.9, callsPerAgent: 31.2, headcount: 85, attrition: 22 },
  { team: 'Delta', avgAht: 433, avgQa: 68.0, avgCsat: 3.60, avgFcr: 53.6, avgAdherence: 82.0, avgOccupancy: 73.6, callsPerAgent: 21.5, headcount: 78, attrition: 38 },
  { team: 'Epsilon', avgAht: 327, avgQa: 83.4, avgCsat: 4.21, avgFcr: 71.8, avgAdherence: 91.6, avgOccupancy: 83.3, callsPerAgent: 31.8, headcount: 82, attrition: 24 },
  { team: 'Omega', avgAht: 471, avgQa: 87.6, avgCsat: 4.38, avgFcr: 76.9, avgAdherence: 93.6, avgOccupancy: 86.6, callsPerAgent: 19.4, headcount: 75, attrition: 16 },
];

// -----------------------------------------------------------------------------
// 11. QA EVALUATIONS
// -----------------------------------------------------------------------------
export const qaEvaluations = {
  // Score distribution (number of agents in each bucket)
  scoreDistribution: [
    { range: '0-50', count: 4, label: 'Critical' },
    { range: '51-60', count: 8, label: 'Below Standard' },
    { range: '61-70', count: 32, label: 'Needs Improvement' },
    { range: '71-80', count: 85, label: 'Acceptable' },
    { range: '81-90', count: 195, label: 'Good' },
    { range: '91-100', count: 176, label: 'Excellent' },
  ],

  // Criteria pass rates (% of evaluations passing each criterion)
  criteriaPassRates: [
    { criterion: 'Opening & Greeting', passRate: 96.2, trend: 'stable' },
    { criterion: 'Customer Identification', passRate: 94.8, trend: 'up' },
    { criterion: 'Active Listening', passRate: 88.5, trend: 'up' },
    { criterion: 'Issue Resolution', passRate: 82.1, trend: 'up' },
    { criterion: 'Product Knowledge', passRate: 85.7, trend: 'stable' },
    { criterion: 'Compliance Adherence', passRate: 91.3, trend: 'up' },
    { criterion: 'Empathy & Tone', passRate: 87.9, trend: 'up' },
    { criterion: 'Call Control', passRate: 80.4, trend: 'stable' },
    { criterion: 'Closing & Wrap-up', passRate: 93.6, trend: 'up' },
    { criterion: 'Documentation', passRate: 78.2, trend: 'down' },
  ],

  // Monthly QA trend by team
  monthlyByTeam: {
    Alpha: [82, 83, 84, 84, 85, 86, 86, 87, 87, 88, 87, 88],
    Beta: [81, 82, 83, 83, 84, 85, 85, 86, 86, 87, 86, 87],
    Gamma: [80, 81, 82, 83, 84, 85, 85, 86, 86, 87, 86, 87],
    Delta: [72, 71, 70, 69, 68, 67, 67, 66, 66, 68, 67, 68],
    Epsilon: [79, 80, 81, 81, 82, 83, 83, 83, 84, 84, 83, 84],
    Omega: [85, 85, 86, 86, 87, 87, 88, 88, 88, 89, 88, 89],
  },

  // Recent evaluations sample
  recentEvaluations: [
    { id: 'QA-4521', agentId: 'A-001', agent: 'Emily Zhang', evaluator: 'Karen Liu', date: '2025-12-18', score: 95, callId: 'CALL-98231', criteria: { greeting: 'Pass', identification: 'Pass', listening: 'Pass', resolution: 'Pass', knowledge: 'Pass', compliance: 'Pass', empathy: 'Pass', control: 'Pass', closing: 'Pass', documentation: 'Pass' } },
    { id: 'QA-4522', agentId: 'A-021', agent: 'Charlotte Adams', evaluator: 'Karen Liu', date: '2025-12-18', score: 58, callId: 'CALL-98245', criteria: { greeting: 'Pass', identification: 'Fail', listening: 'Fail', resolution: 'Fail', knowledge: 'Fail', compliance: 'Pass', empathy: 'Fail', control: 'Fail', closing: 'Pass', documentation: 'Fail' } },
    { id: 'QA-4523', agentId: 'A-029', agent: 'Victoria Scott', evaluator: 'Mike Chen', date: '2025-12-17', score: 98, callId: 'CALL-98198', criteria: { greeting: 'Pass', identification: 'Pass', listening: 'Pass', resolution: 'Pass', knowledge: 'Pass', compliance: 'Pass', empathy: 'Pass', control: 'Pass', closing: 'Pass', documentation: 'Pass' } },
    { id: 'QA-4524', agentId: 'A-019', agent: 'Mia Harris', evaluator: 'Mike Chen', date: '2025-12-17', score: 65, callId: 'CALL-98202', criteria: { greeting: 'Pass', identification: 'Pass', listening: 'Fail', resolution: 'Fail', knowledge: 'Fail', compliance: 'Pass', empathy: 'Fail', control: 'Fail', closing: 'Pass', documentation: 'Fail' } },
    { id: 'QA-4525', agentId: 'A-007', agent: 'Sophia Martinez', evaluator: 'Karen Liu', date: '2025-12-16', score: 92, callId: 'CALL-98178', criteria: { greeting: 'Pass', identification: 'Pass', listening: 'Pass', resolution: 'Pass', knowledge: 'Pass', compliance: 'Pass', empathy: 'Pass', control: 'Pass', closing: 'Pass', documentation: 'Fail' } },
  ],
};

// -----------------------------------------------------------------------------
// 12. WFM DATA (Workforce Management)
// -----------------------------------------------------------------------------
export const wfmData = {
  // Forecast vs Actual (by month)
  forecastAccuracy: [
    { month: 'Jan', forecastCalls: 43000, actualCalls: 42150, variance: -1.98, forecastAht: 345, actualAht: 342 },
    { month: 'Feb', forecastCalls: 41000, actualCalls: 39800, variance: -2.93, forecastAht: 340, actualAht: 338 },
    { month: 'Mar', forecastCalls: 43500, actualCalls: 44200, variance: 1.61, forecastAht: 338, actualAht: 335 },
    { month: 'Apr', forecastCalls: 45000, actualCalls: 45600, variance: 1.33, forecastAht: 334, actualAht: 331 },
    { month: 'May', forecastCalls: 46500, actualCalls: 47100, variance: 1.29, forecastAht: 330, actualAht: 328 },
    { month: 'Jun', forecastCalls: 48000, actualCalls: 48300, variance: 0.63, forecastAht: 327, actualAht: 325 },
    { month: 'Jul', forecastCalls: 49200, actualCalls: 49800, variance: 1.22, forecastAht: 324, actualAht: 322 },
    { month: 'Aug', forecastCalls: 50800, actualCalls: 51200, variance: 0.79, forecastAht: 321, actualAht: 319 },
    { month: 'Sep', forecastCalls: 52200, actualCalls: 52700, variance: 0.96, forecastAht: 318, actualAht: 316 },
    { month: 'Oct', forecastCalls: 53500, actualCalls: 54100, variance: 1.12, forecastAht: 316, actualAht: 314 },
    { month: 'Nov', forecastCalls: 51500, actualCalls: 50900, variance: -1.17, forecastAht: 319, actualAht: 317 },
    { month: 'Dec', forecastCalls: 53000, actualCalls: 53600, variance: 1.13, forecastAht: 314, actualAht: 312 },
  ],

  // Shrinkage breakdown (current month %)
  shrinkage: {
    total: 28.5,
    breakdown: [
      { category: 'PTO / Vacation', percentage: 8.2 },
      { category: 'Sick Leave', percentage: 3.8 },
      { category: 'Training', percentage: 4.5 },
      { category: 'Coaching / 1:1', percentage: 2.8 },
      { category: 'Breaks', percentage: 5.5 },
      { category: 'System Downtime', percentage: 1.2 },
      { category: 'Meetings', percentage: 1.5 },
      { category: 'Other', percentage: 1.0 },
    ],
  },

  // Adherence by team (current month)
  adherenceByTeam: [
    { team: 'Alpha', adherence: 93.8, conformance: 95.2, excusedTime: 4.1, unexcusedTime: 2.1 },
    { team: 'Beta', adherence: 93.1, conformance: 94.8, excusedTime: 4.5, unexcusedTime: 2.4 },
    { team: 'Gamma', adherence: 93.2, conformance: 95.0, excusedTime: 3.8, unexcusedTime: 3.0 },
    { team: 'Delta', adherence: 82.0, conformance: 85.5, excusedTime: 5.2, unexcusedTime: 12.8 },
    { team: 'Epsilon', adherence: 91.6, conformance: 93.5, excusedTime: 4.8, unexcusedTime: 3.6 },
    { team: 'Omega', adherence: 93.6, conformance: 95.5, excusedTime: 3.5, unexcusedTime: 2.9 },
  ],

  // Overtime hours by month
  overtimeHours: [2840, 2650, 3020, 3150, 3280, 3410, 3520, 3680, 3790, 3920, 3650, 3850],

  // Staffing requirements vs actual (sample day intervals)
  staffingByInterval: [
    { time: '06:00', required: 25, actual: 28, variance: 3 },
    { time: '08:00', required: 90, actual: 95, variance: 5 },
    { time: '10:00', required: 150, actual: 155, variance: 5 },
    { time: '12:00', required: 125, actual: 130, variance: 5 },
    { time: '14:00', required: 155, actual: 160, variance: 5 },
    { time: '16:00', required: 128, actual: 132, variance: 4 },
    { time: '18:00', required: 60, actual: 65, variance: 5 },
    { time: '20:00', required: 30, actual: 32, variance: 2 },
    { time: '22:00', required: 20, actual: 22, variance: 2 },
  ],
};

// -----------------------------------------------------------------------------
// 13. CX DATA (Customer Experience)
// -----------------------------------------------------------------------------
export const cxData = {
  // CSAT monthly trend (already in monthlyMetrics, more detail here)
  csatByChannel: {
    phone: [4.15, 4.12, 4.18, 4.21, 4.25, 4.28, 4.30, 4.33, 4.35, 4.38, 4.34, 4.41],
    chat: [4.22, 4.20, 4.25, 4.28, 4.31, 4.34, 4.36, 4.39, 4.42, 4.45, 4.40, 4.48],
    email: [3.95, 3.92, 3.98, 4.02, 4.05, 4.08, 4.10, 4.13, 4.15, 4.18, 4.14, 4.21],
    selfService: [3.88, 3.90, 3.95, 3.98, 4.02, 4.05, 4.08, 4.12, 4.15, 4.18, 4.15, 4.22],
  },

  // NPS by client
  npsByClient: {
    'TechConnect Solutions': [35, 34, 38, 40, 42, 44, 46, 48, 50, 52, 49, 54],
    'Premier Healthcare': [38, 37, 40, 42, 44, 46, 48, 50, 52, 54, 51, 56],
    'Swift Logistics': [28, 27, 30, 32, 34, 36, 37, 39, 41, 43, 40, 45],
    'National Real Estate': [30, 29, 32, 34, 36, 38, 39, 41, 43, 45, 42, 47],
    'Global Media Corp': [25, 24, 27, 29, 31, 33, 34, 36, 38, 40, 37, 42],
  },

  // Top contact reasons (current month distribution)
  contactReasons: [
    { reason: 'Account Inquiry', percentage: 22.5, volume: 12060, avgAht: 285, fcr: 82.1, trend: 'stable' },
    { reason: 'Technical Issue', percentage: 18.8, volume: 10077, avgAht: 420, fcr: 68.5, trend: 'up' },
    { reason: 'Billing Question', percentage: 15.2, volume: 8147, avgAht: 310, fcr: 75.2, trend: 'stable' },
    { reason: 'Service Change', percentage: 11.5, volume: 6164, avgAht: 295, fcr: 78.8, trend: 'down' },
    { reason: 'New Order / Signup', percentage: 9.8, volume: 5253, avgAht: 380, fcr: 85.4, trend: 'up' },
    { reason: 'Complaint', percentage: 8.2, volume: 4395, avgAht: 450, fcr: 55.2, trend: 'down' },
    { reason: 'Return / Refund', percentage: 6.5, volume: 3484, avgAht: 340, fcr: 71.5, trend: 'stable' },
    { reason: 'Shipping / Tracking', percentage: 4.8, volume: 2573, avgAht: 220, fcr: 88.2, trend: 'stable' },
    { reason: 'Cancellation', percentage: 2.0, volume: 1072, avgAht: 395, fcr: 62.8, trend: 'down' },
    { reason: 'Other', percentage: 0.7, volume: 375, avgAht: 265, fcr: 72.1, trend: 'stable' },
  ],

  // Sentiment analysis (current month)
  sentiment: {
    positive: 42.5,
    neutral: 38.2,
    negative: 19.3,
    monthlyTrend: {
      positive: [38.2, 38.5, 39.1, 39.8, 40.2, 40.8, 41.1, 41.5, 41.9, 42.2, 41.8, 42.5],
      neutral: [40.5, 40.2, 39.8, 39.5, 39.2, 38.8, 38.5, 38.4, 38.3, 38.2, 38.5, 38.2],
      negative: [21.3, 21.3, 21.1, 20.7, 20.6, 20.4, 20.4, 20.1, 19.8, 19.6, 19.7, 19.3],
    },
  },

  // Customer effort score (1-7, lower is better)
  ces: {
    current: 3.2,
    trend: [3.8, 3.7, 3.6, 3.5, 3.5, 3.4, 3.4, 3.3, 3.3, 3.2, 3.3, 3.2],
  },

  // Repeat contact rate (%)
  repeatContactRate: {
    current: 18.5,
    trend: [22.8, 22.5, 21.8, 21.2, 20.5, 20.1, 19.8, 19.4, 19.1, 18.8, 19.0, 18.5],
  },
};

// -----------------------------------------------------------------------------
// 14. AI / BOT DATA
//     Bot deflection rate improves over time
// -----------------------------------------------------------------------------
export const aiData = {
  // Bot metrics (monthly)
  botInteractions: [18500, 19200, 20800, 22100, 23500, 25200, 27100, 29000, 31200, 33500, 32100, 35800],
  botDeflectionRate: [28.5, 29.2, 31.0, 32.8, 34.5, 36.2, 38.0, 39.8, 41.5, 43.2, 42.5, 45.0],
  botResolutionRate: [22.1, 23.0, 24.5, 26.1, 27.8, 29.5, 31.2, 32.8, 34.5, 36.2, 35.5, 38.0],
  botCsat: [3.65, 3.70, 3.78, 3.85, 3.92, 3.98, 4.02, 4.08, 4.12, 4.18, 4.15, 4.22],

  // Intent classification accuracy
  intentAccuracy: {
    overall: 89.5,
    byIntent: [
      { intent: 'Account Balance', accuracy: 96.2, volume: 8520, deflectable: true },
      { intent: 'Password Reset', accuracy: 94.8, volume: 6240, deflectable: true },
      { intent: 'Order Status', accuracy: 93.5, volume: 5890, deflectable: true },
      { intent: 'Payment Processing', accuracy: 91.2, volume: 4350, deflectable: false },
      { intent: 'Technical Support', accuracy: 85.8, volume: 3920, deflectable: false },
      { intent: 'Billing Dispute', accuracy: 82.4, volume: 3180, deflectable: false },
      { intent: 'Service Cancellation', accuracy: 88.1, volume: 2150, deflectable: false },
      { intent: 'Plan Upgrade', accuracy: 90.5, volume: 1850, deflectable: true },
      { intent: 'Address Change', accuracy: 95.1, volume: 1420, deflectable: true },
      { intent: 'General Inquiry', accuracy: 78.3, volume: 1280, deflectable: false },
    ],
  },

  // Agent assist metrics
  agentAssist: {
    suggestionsPerCall: 2.8,
    suggestionAcceptRate: 62.5,
    avgTimeReduction: 18, // seconds saved per call
    knowledgeHitRate: 78.4,
    sentimentAlertAccuracy: 85.2,
  },

  // Automation funnel
  automationFunnel: [
    { stage: 'Total Contacts', count: 53600 },
    { stage: 'Bot Eligible', count: 42880 },
    { stage: 'Bot Attempted', count: 35800 },
    { stage: 'Bot Resolved', count: 13604 },
    { stage: 'Escalated to Agent', count: 22196 },
    { stage: 'Agent Resolved', count: 21084 },
  ],

  // Monthly trend for intent accuracy improvement
  intentAccuracyTrend: [82.0, 83.2, 84.5, 85.5, 86.5, 87.2, 87.8, 88.5, 89.0, 89.5, 89.2, 90.1],
};

// -----------------------------------------------------------------------------
// 15. TRAINING DATA
// -----------------------------------------------------------------------------
export const trainingData = {
  // Training cohorts with ramp curves (weeks to proficiency)
  cohorts: [
    { id: 'COH-2025-Q1', name: 'Q1 2025 Cohort', startDate: '2025-01-13', size: 42, graduated: 38, dropouts: 4, avgRampWeeks: 8, currentAvgQa: 81.5 },
    { id: 'COH-2025-Q2', name: 'Q2 2025 Cohort', startDate: '2025-04-07', size: 38, graduated: 35, dropouts: 3, avgRampWeeks: 7.5, currentAvgQa: 83.2 },
    { id: 'COH-2025-Q3', name: 'Q3 2025 Cohort', startDate: '2025-07-14', size: 45, graduated: 40, dropouts: 5, avgRampWeeks: 7, currentAvgQa: 80.8 },
    { id: 'COH-2025-Q4', name: 'Q4 2025 Cohort', startDate: '2025-10-06', size: 35, graduated: 28, dropouts: 2, avgRampWeeks: null, currentAvgQa: 72.5 },
  ],

  // Ramp curve data (QA score by week of tenure, averaged across cohorts)
  rampCurve: [
    { week: 1, qaScore: 52, aht: 580, fcr: 35.2, callsPerDay: 12 },
    { week: 2, qaScore: 58, aht: 540, fcr: 40.5, callsPerDay: 15 },
    { week: 3, qaScore: 63, aht: 500, fcr: 46.8, callsPerDay: 18 },
    { week: 4, qaScore: 68, aht: 465, fcr: 52.1, callsPerDay: 21 },
    { week: 5, qaScore: 72, aht: 430, fcr: 57.5, callsPerDay: 24 },
    { week: 6, qaScore: 76, aht: 400, fcr: 62.8, callsPerDay: 27 },
    { week: 7, qaScore: 79, aht: 375, fcr: 67.2, callsPerDay: 29 },
    { week: 8, qaScore: 82, aht: 350, fcr: 71.5, callsPerDay: 31 },
    { week: 9, qaScore: 84, aht: 335, fcr: 74.8, callsPerDay: 33 },
    { week: 10, qaScore: 85, aht: 325, fcr: 76.5, callsPerDay: 34 },
    { week: 11, qaScore: 86, aht: 318, fcr: 77.8, callsPerDay: 35 },
    { week: 12, qaScore: 87, aht: 312, fcr: 78.5, callsPerDay: 35 },
  ],

  // Course completion rates
  courseCompletion: [
    { course: 'Product Knowledge Fundamentals', required: true, completionRate: 100, avgScore: 88.5, duration: '16 hours' },
    { course: 'CRM System Training', required: true, completionRate: 100, avgScore: 91.2, duration: '12 hours' },
    { course: 'Compliance & Regulation', required: true, completionRate: 100, avgScore: 94.1, duration: '8 hours' },
    { course: 'Soft Skills & De-escalation', required: true, completionRate: 98.5, avgScore: 82.8, duration: '10 hours' },
    { course: 'Advanced Troubleshooting', required: false, completionRate: 72.4, avgScore: 79.5, duration: '20 hours' },
    { course: 'Sales Techniques', required: false, completionRate: 65.8, avgScore: 77.2, duration: '14 hours' },
    { course: 'Leadership Development', required: false, completionRate: 34.2, avgScore: 85.1, duration: '24 hours' },
    { course: 'AI Tools Proficiency', required: true, completionRate: 95.8, avgScore: 86.5, duration: '6 hours' },
  ],

  // Training hours by month
  trainingHoursByMonth: [4200, 3800, 4500, 4100, 3900, 4300, 4800, 5100, 4600, 4200, 3700, 4400],

  // Certification pipeline
  certificationPipeline: {
    inProgress: 45,
    completedThisQuarter: 28,
    expiringNext30Days: 12,
    expired: 3,
  },
};

// -----------------------------------------------------------------------------
// 16. IT / SYSTEMS DATA
// -----------------------------------------------------------------------------
export const itData = {
  // System uptimes (last 12 months, %)
  systemUptime: {
    'Telephony (Genesys)': [99.95, 99.92, 99.98, 99.96, 99.99, 99.97, 99.94, 99.98, 99.95, 99.97, 99.93, 99.96],
    'CRM (Salesforce)': [99.90, 99.88, 99.95, 99.92, 99.94, 99.96, 99.91, 99.95, 99.93, 99.96, 99.90, 99.94],
    'WFM (NICE)': [99.85, 99.82, 99.90, 99.88, 99.92, 99.94, 99.87, 99.92, 99.90, 99.93, 99.88, 99.91],
    'QA Platform': [99.80, 99.78, 99.85, 99.82, 99.88, 99.90, 99.84, 99.88, 99.86, 99.90, 99.82, 99.88],
    'AI/Bot Engine': [99.70, 99.72, 99.80, 99.82, 99.85, 99.88, 99.85, 99.90, 99.88, 99.92, 99.85, 99.90],
    'Analytics Platform': [99.92, 99.90, 99.95, 99.93, 99.96, 99.98, 99.94, 99.97, 99.95, 99.98, 99.92, 99.96],
  },

  // Current system status
  currentStatus: [
    { system: 'Telephony (Genesys)', status: 'operational', uptime: 99.96, lastIncident: '2025-11-18', latency: 42 },
    { system: 'CRM (Salesforce)', status: 'operational', uptime: 99.94, lastIncident: '2025-12-02', latency: 185 },
    { system: 'WFM (NICE)', status: 'operational', uptime: 99.91, lastIncident: '2025-11-25', latency: 120 },
    { system: 'QA Platform', status: 'degraded', uptime: 99.88, lastIncident: '2025-12-15', latency: 340 },
    { system: 'AI/Bot Engine', status: 'operational', uptime: 99.90, lastIncident: '2025-12-08', latency: 95 },
    { system: 'Analytics Platform', status: 'operational', uptime: 99.96, lastIncident: '2025-10-30', latency: 210 },
  ],

  // Recent incidents
  incidents: [
    { id: 'INC-2025-089', system: 'QA Platform', severity: 'P2', title: 'Evaluation form loading delays', startTime: '2025-12-15T14:22:00Z', endTime: null, status: 'investigating', impact: 'QA evaluators experiencing 5-8s load times', assignee: 'Platform Engineering' },
    { id: 'INC-2025-088', system: 'CRM (Salesforce)', severity: 'P3', title: 'Custom report timeout errors', startTime: '2025-12-02T09:15:00Z', endTime: '2025-12-02T11:48:00Z', status: 'resolved', impact: 'Some custom reports failed to generate', assignee: 'CRM Admin Team' },
    { id: 'INC-2025-087', system: 'WFM (NICE)', severity: 'P2', title: 'Schedule sync delay with telephony', startTime: '2025-11-25T06:30:00Z', endTime: '2025-11-25T08:15:00Z', status: 'resolved', impact: 'Agent schedules not reflecting in ACD for 105 minutes', assignee: 'WFM Engineering' },
    { id: 'INC-2025-086', system: 'Telephony (Genesys)', severity: 'P1', title: 'Partial outage - Austin site', startTime: '2025-11-18T16:42:00Z', endTime: '2025-11-18T17:28:00Z', status: 'resolved', impact: '~120 agents unable to receive calls for 46 minutes', assignee: 'Network Operations' },
    { id: 'INC-2025-085', system: 'AI/Bot Engine', severity: 'P3', title: 'Intent classification latency spike', startTime: '2025-12-08T11:05:00Z', endTime: '2025-12-08T12:30:00Z', status: 'resolved', impact: 'Bot response times increased by 2-3 seconds', assignee: 'AI Engineering' },
  ],

  // API latency trends (ms, monthly averages)
  apiLatency: {
    'Telephony API': [38, 40, 36, 35, 34, 38, 42, 40, 38, 36, 42, 42],
    'CRM API': [165, 172, 158, 155, 150, 162, 175, 168, 160, 155, 180, 185],
    'WFM API': [105, 112, 98, 95, 92, 100, 115, 108, 102, 98, 118, 120],
    'Bot API': [82, 85, 78, 75, 72, 78, 88, 82, 78, 75, 92, 95],
  },
};

// -----------------------------------------------------------------------------
// 17. COMPLIANCE DATA
// -----------------------------------------------------------------------------
export const complianceData = {
  // Monthly violation counts
  violationsByMonth: [18, 22, 15, 12, 10, 8, 11, 9, 7, 6, 9, 5],

  // Violation types (current quarter)
  violationTypes: [
    { type: 'Script Deviation', count: 8, severity: 'low', trend: 'down' },
    { type: 'Missing Disclosure', count: 5, severity: 'high', trend: 'down' },
    { type: 'Hold Time Violation', count: 4, severity: 'medium', trend: 'stable' },
    { type: 'Recording Consent', count: 2, severity: 'critical', trend: 'down' },
    { type: 'PII Handling', count: 3, severity: 'high', trend: 'down' },
    { type: 'Do Not Call Violation', count: 1, severity: 'critical', trend: 'down' },
  ],

  // Pass rates by compliance area
  passRates: [
    { area: 'Call Recording Consent', rate: 99.2, target: 99.0, status: 'pass' },
    { area: 'Customer ID Verification', rate: 97.8, target: 98.0, status: 'fail' },
    { area: 'Required Disclosures', rate: 96.5, target: 95.0, status: 'pass' },
    { area: 'PII Data Protection', rate: 98.9, target: 99.0, status: 'fail' },
    { area: 'Do Not Call Compliance', rate: 99.8, target: 99.5, status: 'pass' },
    { area: 'HIPAA Compliance', rate: 99.5, target: 99.0, status: 'pass' },
    { area: 'Payment Card (PCI-DSS)', rate: 99.1, target: 99.0, status: 'pass' },
    { area: 'Debt Collection (FDCPA)', rate: 98.2, target: 98.0, status: 'pass' },
  ],

  // Compliance by team
  complianceByTeam: [
    { team: 'Alpha', overallScore: 97.5, violations: 2, auditsCompleted: 48 },
    { team: 'Beta', overallScore: 96.8, violations: 3, auditsCompleted: 45 },
    { team: 'Gamma', overallScore: 95.5, violations: 4, auditsCompleted: 42 },
    { team: 'Delta', overallScore: 88.2, violations: 12, auditsCompleted: 50 },
    { team: 'Epsilon', overallScore: 94.8, violations: 5, auditsCompleted: 40 },
    { team: 'Omega', overallScore: 97.2, violations: 1, auditsCompleted: 38 },
  ],

  // Regulatory audit results
  auditResults: [
    { date: '2025-03-15', auditor: 'Internal', scope: 'PCI-DSS', result: 'Pass', findings: 2, critical: 0 },
    { date: '2025-06-22', auditor: 'External (Deloitte)', scope: 'SOC 2 Type II', result: 'Pass', findings: 5, critical: 0 },
    { date: '2025-09-10', auditor: 'Internal', scope: 'HIPAA', result: 'Pass with observations', findings: 3, critical: 0 },
    { date: '2025-11-28', auditor: 'Client (Premier Healthcare)', scope: 'PHI Handling', result: 'Pass', findings: 1, critical: 0 },
  ],
};

// -----------------------------------------------------------------------------
// 18. CAMPAIGN DATA (Outbound/Sales campaigns)
// -----------------------------------------------------------------------------
export const campaignData = {
  // Active campaigns
  activeCampaigns: [
    { id: 'CMP-042', name: 'Q4 Holiday Retention', client: 'TechConnect Solutions', type: 'Outbound', startDate: '2025-11-01', endDate: '2025-12-31', status: 'active', agents: 18, dailyTarget: 450, conversionTarget: 8.5 },
    { id: 'CMP-043', name: 'Healthcare Plan Renewal', client: 'Premier Healthcare', type: 'Outbound', startDate: '2025-11-15', endDate: '2026-01-15', status: 'active', agents: 12, dailyTarget: 320, conversionTarget: 12.0 },
    { id: 'CMP-044', name: 'New Service Upsell', client: 'Swift Logistics', type: 'Blended', startDate: '2025-12-01', endDate: '2026-02-28', status: 'active', agents: 15, dailyTarget: 280, conversionTarget: 6.5 },
    { id: 'CMP-045', name: 'Win-back Campaign', client: 'National Real Estate', type: 'Outbound', startDate: '2025-12-08', endDate: '2026-01-31', status: 'active', agents: 8, dailyTarget: 180, conversionTarget: 4.2 },
  ],

  // Conversion funnel (current month, all campaigns combined)
  conversionFunnel: [
    { stage: 'Leads Loaded', count: 42500 },
    { stage: 'Dial Attempts', count: 38200 },
    { stage: 'Connected', count: 18340 },
    { stage: 'Decision Maker Reached', count: 12150 },
    { stage: 'Pitch Delivered', count: 9720 },
    { stage: 'Interested', count: 4860 },
    { stage: 'Converted', count: 2430 },
  ],

  // Dialer metrics
  dialerMetrics: {
    dialAttempts: 38200,
    connectRate: 48.0,
    rightPartyContact: 31.8,
    talkTime: 245, // seconds avg
    wrapTime: 42, // seconds avg
    abandonRate: 2.1,
    complianceRate: 99.2,
    callsPerAgentPerHour: 12.5,
  },

  // Campaign performance by week (last 4 weeks)
  weeklyPerformance: [
    { week: 'W49', dials: 9200, connects: 4420, conversions: 585, revenue: 142500, conversionRate: 6.4 },
    { week: 'W50', dials: 9800, connects: 4750, conversions: 628, revenue: 156200, conversionRate: 6.5 },
    { week: 'W51', dials: 9500, connects: 4560, conversions: 612, revenue: 148800, conversionRate: 6.4 },
    { week: 'W52', dials: 9700, connects: 4610, conversions: 605, revenue: 151200, conversionRate: 6.2 },
  ],

  // Best-performing agent (campaign context)
  topCampaignAgents: [
    { agentId: 'A-013', name: 'Isabella Rodriguez', conversions: 82, conversionRate: 11.2, revenue: 38500 },
    { agentId: 'A-017', name: 'Chloe Nguyen', conversions: 75, conversionRate: 10.5, revenue: 35200 },
    { agentId: 'A-014', name: 'Noah Clark', conversions: 68, conversionRate: 9.8, revenue: 31800 },
    { agentId: 'A-015', name: 'Ava Robinson', conversions: 62, conversionRate: 9.2, revenue: 28500 },
    { agentId: 'A-007', name: 'Sophia Martinez', conversions: 58, conversionRate: 8.8, revenue: 26200 },
  ],
};

// -----------------------------------------------------------------------------
// 19. KPI SNAPSHOTS (current values for all dashboard KPIs)
// -----------------------------------------------------------------------------
export const kpiSnapshots = {
  // Executive Dashboard
  executive: {
    totalRevenue: { value: 15040000, unit: '$', period: 'YTD', change: 18.2, direction: 'up' },
    totalContacts: { value: 579500, unit: '', period: 'YTD', change: 12.5, direction: 'up' },
    overallCsat: { value: 4.37, unit: '/5', period: 'Current', change: 6.1, direction: 'up' },
    overallNps: { value: 48, unit: '', period: 'Current', change: 50.0, direction: 'up' },
    netMargin: { value: 15.2, unit: '%', period: 'Current', change: 2.8, direction: 'up' },
    agentCount: { value: 500, unit: '', period: 'Current', change: 4.2, direction: 'up' },
    attritionRate: { value: 21, unit: '%', period: 'Annualized', change: -34.4, direction: 'down' },
    clientCount: { value: 5, unit: '', period: 'Current', change: 0, direction: 'stable' },
  },

  // Operations Dashboard
  operations: {
    callsToday: { value: 2685, unit: '', period: 'Today', change: 2.1, direction: 'up' },
    serviceLevel: { value: 83.8, unit: '%', period: 'Current', change: 7.2, direction: 'up' },
    asa: { value: 20, unit: 's', period: 'Current', change: -28.6, direction: 'down' },
    aht: { value: 312, unit: 's', period: 'Current', change: -8.8, direction: 'down' },
    abandonRate: { value: 4.7, unit: '%', period: 'Current', change: -8.2, direction: 'down' },
    occupancy: { value: 85.4, unit: '%', period: 'Current', change: 4.8, direction: 'up' },
    agentsOnline: { value: 412, unit: '', period: 'Now', change: 0, direction: 'stable' },
    callsInQueue: { value: 56, unit: '', period: 'Now', change: 0, direction: 'stable' },
  },

  // Quality Dashboard
  quality: {
    qaScore: { value: 86.7, unit: '/100', period: 'Current', change: 5.2, direction: 'up' },
    fcr: { value: 76.8, unit: '%', period: 'Current', change: 7.9, direction: 'up' },
    evaluationsCompleted: { value: 2450, unit: '', period: 'MTD', change: 5.1, direction: 'up' },
    criticalFails: { value: 4, unit: '', period: 'MTD', change: -55.6, direction: 'down' },
    coachingSessions: { value: 185, unit: '', period: 'MTD', change: 12.1, direction: 'up' },
    calibrationScore: { value: 92.1, unit: '%', period: 'Current', change: 1.5, direction: 'up' },
  },

  // Workforce Dashboard
  workforce: {
    adherence: { value: 92.7, unit: '%', period: 'Current', change: 3.9, direction: 'up' },
    shrinkage: { value: 28.5, unit: '%', period: 'Current', change: -2.1, direction: 'down' },
    forecastAccuracy: { value: 98.9, unit: '%', period: 'Current', change: 1.2, direction: 'up' },
    overtimeHours: { value: 3850, unit: 'hrs', period: 'MTD', change: 8.5, direction: 'up' },
    openPositions: { value: 32, unit: '', period: 'Current', change: -15.8, direction: 'down' },
    agentsInTraining: { value: 35, unit: '', period: 'Current', change: 0, direction: 'stable' },
  },

  // Financial Dashboard
  financial: {
    monthlyRevenue: { value: 1580000, unit: '$', period: 'Current', change: 8.2, direction: 'up' },
    costPerContact: { value: 21.51, unit: '$', period: 'Current', change: 4.5, direction: 'up' },
    revenuePerAgent: { value: 3160, unit: '$', period: 'Current', change: 18.5, direction: 'up' },
    laborCostRatio: { value: 55.6, unit: '%', period: 'Current', change: -1.2, direction: 'down' },
    grossMargin: { value: 38.4, unit: '%', period: 'Current', change: 2.1, direction: 'up' },
    netMargin: { value: 15.2, unit: '%', period: 'Current', change: 2.8, direction: 'up' },
  },

  // AI Dashboard
  ai: {
    botDeflection: { value: 45.0, unit: '%', period: 'Current', change: 57.9, direction: 'up' },
    botCsat: { value: 4.22, unit: '/5', period: 'Current', change: 15.6, direction: 'up' },
    intentAccuracy: { value: 89.5, unit: '%', period: 'Current', change: 9.1, direction: 'up' },
    agentAssistAdoption: { value: 62.5, unit: '%', period: 'Current', change: 22.5, direction: 'up' },
    automationRate: { value: 25.4, unit: '%', period: 'Current', change: 35.1, direction: 'up' },
    costSavings: { value: 285000, unit: '$', period: 'MTD', change: 42.5, direction: 'up' },
  },

  // Compliance Dashboard
  compliance: {
    overallCompliance: { value: 97.8, unit: '%', period: 'Current', change: 2.1, direction: 'up' },
    openViolations: { value: 5, unit: '', period: 'Current', change: -72.2, direction: 'down' },
    auditScore: { value: 94.5, unit: '%', period: 'Last Audit', change: 3.2, direction: 'up' },
    regulatoryRisk: { value: 'Low', unit: '', period: 'Current', change: 0, direction: 'stable' },
  },

  // Campaign Dashboard
  campaign: {
    activeCampaigns: { value: 4, unit: '', period: 'Current', change: 0, direction: 'stable' },
    conversionRate: { value: 6.3, unit: '%', period: 'Current', change: 8.6, direction: 'up' },
    dailyDials: { value: 1385, unit: '', period: 'Today', change: 3.2, direction: 'up' },
    connectRate: { value: 48.0, unit: '%', period: 'Current', change: 5.5, direction: 'up' },
    campaignRevenue: { value: 598700, unit: '$', period: 'MTD', change: 12.8, direction: 'up' },
  },
};

// -----------------------------------------------------------------------------
// 20. ALERTS (Active alerts across all dashboards)
// -----------------------------------------------------------------------------
export const alerts = [
  { id: 'ALT-001', severity: 'critical', dashboard: 'Operations', title: 'Billing Queue SL below 75%', message: 'Billing & Payments queue service level at 74.8% - below 75% threshold. 18 calls waiting, longest wait 3m30s.', timestamp: '2025-12-19T14:32:00Z', acknowledged: false, assignee: null },
  { id: 'ALT-002', severity: 'warning', dashboard: 'Quality', title: 'Team Delta QA score declining', message: 'Team Delta average QA score has fallen to 68.0, below the 70 threshold for 3 consecutive months. PIP recommended for 2 agents.', timestamp: '2025-12-19T09:15:00Z', acknowledged: true, assignee: 'Rachel Foster' },
  { id: 'ALT-003', severity: 'critical', dashboard: 'Compliance', title: 'Customer ID verification below target', message: 'Customer ID verification rate at 97.8% vs 98.0% target. Gap driven primarily by Team Delta (88.2% compliance).', timestamp: '2025-12-18T16:45:00Z', acknowledged: true, assignee: 'Legal & Compliance' },
  { id: 'ALT-004', severity: 'info', dashboard: 'IT Systems', title: 'QA Platform - degraded performance', message: 'QA Platform experiencing elevated latency (340ms vs 150ms baseline). Investigation ongoing - INC-2025-089.', timestamp: '2025-12-15T14:22:00Z', acknowledged: true, assignee: 'Platform Engineering' },
  { id: 'ALT-005', severity: 'warning', dashboard: 'Workforce', title: 'Overtime trending above budget', message: 'December overtime hours projected at 3,850 vs 3,200 budget. 20.3% over plan driven by holiday volume spike.', timestamp: '2025-12-19T08:00:00Z', acknowledged: true, assignee: 'James Rivera' },
  { id: 'ALT-006', severity: 'warning', dashboard: 'CX', title: 'Complaint volume increase', message: 'Complaint-related contacts up 12% vs prior month. Top drivers: billing disputes (45%), service delays (28%).', timestamp: '2025-12-17T11:30:00Z', acknowledged: true, assignee: 'Sarah Okonkwo' },
  { id: 'ALT-007', severity: 'info', dashboard: 'AI', title: 'General Inquiry intent accuracy low', message: 'General Inquiry intent classification accuracy at 78.3% - below 85% target. Recommend model retraining with recent data.', timestamp: '2025-12-16T10:00:00Z', acknowledged: false, assignee: null },
  { id: 'ALT-008', severity: 'info', dashboard: 'Training', title: 'Q4 cohort ramp velocity below average', message: 'Q4 2025 cohort at 72.5 QA avg at week 10, vs 85.0 benchmark. 5 agents at risk of not meeting graduation criteria.', timestamp: '2025-12-18T14:00:00Z', acknowledged: true, assignee: 'Training Manager' },
  { id: 'ALT-009', severity: 'warning', dashboard: 'Financial', title: 'Cost per contact rising', message: 'Cost per contact at $21.51, up 9.1% YTD. Labor cost growth (10.8%) outpacing revenue per contact growth (8.2%).', timestamp: '2025-12-19T07:30:00Z', acknowledged: true, assignee: 'CFO Office' },
  { id: 'ALT-010', severity: 'critical', dashboard: 'Operations', title: 'Agent Charlotte Adams - adherence critical', message: 'Agent A-021 (Charlotte Adams, Team Delta) adherence at 78.5% for 2 consecutive weeks. Currently on PIP.', timestamp: '2025-12-19T10:45:00Z', acknowledged: true, assignee: 'Rachel Foster' },
];

// -----------------------------------------------------------------------------
// 21. CHANNEL MIX DATA
// -----------------------------------------------------------------------------
export const channelMix = {
  // Current month distribution
  current: [
    { channel: 'Voice (Inbound)', percentage: 48.2, volume: 25833, aht: 320, csat: 4.38, trend: 'down' },
    { channel: 'Voice (Outbound)', percentage: 12.5, volume: 6700, aht: 345, csat: 4.15, trend: 'stable' },
    { channel: 'Chat', percentage: 22.8, volume: 12221, aht: 480, csat: 4.48, trend: 'up' },
    { channel: 'Email', percentage: 10.5, volume: 5628, aht: 540, csat: 4.21, trend: 'stable' },
    { channel: 'Self-Service', percentage: 6.0, volume: 3218, aht: null, csat: 4.22, trend: 'up' },
  ],

  // Monthly trend for voice vs digital
  voiceShare: [58.5, 57.8, 56.2, 55.5, 54.8, 53.5, 52.8, 51.5, 50.8, 49.5, 49.8, 48.2],
  digitalShare: [35.5, 36.2, 37.8, 38.5, 39.2, 40.5, 41.2, 42.5, 43.2, 44.5, 44.2, 45.8],
  selfServiceShare: [3.0, 3.2, 3.5, 3.8, 4.0, 4.2, 4.5, 4.8, 5.0, 5.2, 5.5, 6.0],
  outboundShare: [3.0, 2.8, 2.5, 2.2, 2.0, 1.8, 1.5, 1.2, 1.0, 0.8, 0.5, 0.0],
};

// -----------------------------------------------------------------------------
// 22. SLA DATA (by client)
// -----------------------------------------------------------------------------
export const slaData = {
  clients: [
    {
      client: 'TechConnect Solutions',
      metrics: [
        { metric: 'Service Level (80/20)', target: 80, actual: 84.2, status: 'met', penalty: 0 },
        { metric: 'Abandon Rate', target: 5, actual: 3.8, status: 'met', penalty: 0 },
        { metric: 'CSAT', target: 4.0, actual: 4.41, status: 'met', penalty: 0 },
        { metric: 'FCR', target: 70, actual: 78.5, status: 'met', penalty: 0 },
        { metric: 'AHT', target: 360, actual: 328, status: 'met', penalty: 0 },
      ],
    },
    {
      client: 'Premier Healthcare',
      metrics: [
        { metric: 'Service Level (85/20)', target: 85, actual: 87.1, status: 'met', penalty: 0 },
        { metric: 'Abandon Rate', target: 3, actual: 2.5, status: 'met', penalty: 0 },
        { metric: 'CSAT', target: 4.2, actual: 4.52, status: 'met', penalty: 0 },
        { metric: 'HIPAA Compliance', target: 99, actual: 99.5, status: 'met', penalty: 0 },
        { metric: 'AHT', target: 400, actual: 375, status: 'met', penalty: 0 },
      ],
    },
    {
      client: 'Swift Logistics',
      metrics: [
        { metric: 'Service Level (75/30)', target: 75, actual: 79.5, status: 'met', penalty: 0 },
        { metric: 'Abandon Rate', target: 6, actual: 4.2, status: 'met', penalty: 0 },
        { metric: 'CSAT', target: 3.8, actual: 4.18, status: 'met', penalty: 0 },
        { metric: 'FCR', target: 65, actual: 72.1, status: 'met', penalty: 0 },
        { metric: 'AHT', target: 300, actual: 268, status: 'met', penalty: 0 },
      ],
    },
    {
      client: 'National Real Estate',
      metrics: [
        { metric: 'Service Level (78/20)', target: 78, actual: 81.2, status: 'met', penalty: 0 },
        { metric: 'Abandon Rate', target: 5, actual: 4.5, status: 'met', penalty: 0 },
        { metric: 'CSAT', target: 4.0, actual: 4.28, status: 'met', penalty: 0 },
        { metric: 'FCR', target: 68, actual: 74.5, status: 'met', penalty: 0 },
        { metric: 'AHT', target: 340, actual: 315, status: 'met', penalty: 0 },
      ],
    },
    {
      client: 'Global Media Corp',
      metrics: [
        { metric: 'Service Level (80/20)', target: 80, actual: 78.8, status: 'missed', penalty: 5200 },
        { metric: 'Abandon Rate', target: 5, actual: 5.2, status: 'missed', penalty: 2800 },
        { metric: 'CSAT', target: 4.0, actual: 4.05, status: 'met', penalty: 0 },
        { metric: 'FCR', target: 70, actual: 68.2, status: 'missed', penalty: 3100 },
        { metric: 'AHT', target: 330, actual: 342, status: 'missed', penalty: 1500 },
      ],
    },
  ],

  // SLA penalty summary
  totalPenalties: {
    currentMonth: 12600,
    previousMonth: 18200,
    ytd: 142500,
    trend: 'improving',
  },
};

// -----------------------------------------------------------------------------
// 23. HEATMAP DATA (Hour x Day-of-week call volume)
// -----------------------------------------------------------------------------
export const heatmapData = {
  hours: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  // Values represent average call volume per hour-slot
  values: [
    // Mon   Tue   Wed   Thu   Fri   Sat   Sun
    [  32,   30,   28,   31,   25,   12,    8],  // 6AM
    [  68,   65,   62,   70,   55,   25,   18],  // 7AM
    [ 142,  148,  138,  150,  125,   52,   35],  // 8AM
    [ 195,  205,  192,  210,  178,   75,   48],  // 9AM
    [ 225,  230,  218,  228,  195,   85,   55],  // 10AM
    [ 230,  235,  225,  232,  198,   82,   52],  // 11AM
    [ 185,  192,  180,  188,  165,   68,   45],  // 12PM
    [ 205,  215,  198,  218,  185,   72,   48],  // 1PM
    [ 228,  232,  220,  230,  192,   78,   50],  // 2PM
    [ 208,  212,  202,  215,  182,   70,   45],  // 3PM
    [ 178,  185,  172,  180,  158,   58,   38],  // 4PM
    [ 132,  138,  128,  135,  118,   42,   28],  // 5PM
    [  85,   88,   82,   86,   78,   32,   22],  // 6PM
    [  58,   62,   55,   60,   52,   25,   18],  // 7PM
    [  38,   40,   35,   38,   32,   18,   12],  // 8PM
    [  22,   24,   20,   22,   18,   10,    8],  // 9PM
  ],
};

// -----------------------------------------------------------------------------
// 24. AGENT TENURE DISTRIBUTION
// -----------------------------------------------------------------------------
export const tenureDistribution = [
  { range: '0-3 months', count: 52, percentage: 10.4 },
  { range: '3-6 months', count: 68, percentage: 13.6 },
  { range: '6-12 months', count: 95, percentage: 19.0 },
  { range: '1-2 years', count: 125, percentage: 25.0 },
  { range: '2-3 years', count: 98, percentage: 19.6 },
  { range: '3+ years', count: 62, percentage: 12.4 },
];

// -----------------------------------------------------------------------------
// 25. REAL-TIME DASHBOARD DATA (simulated "current" snapshot)
// -----------------------------------------------------------------------------
export const realTimeSnapshot = {
  timestamp: '2025-12-19T14:45:00Z',
  agentsLoggedIn: 412,
  agentsAvailable: 148,
  agentsOnCall: 218,
  agentsInWrap: 28,
  agentsOnBreak: 18,
  callsInQueue: 56,
  longestWaitTime: 210, // seconds
  callsActiveNow: 218,
  ahtRolling30min: 308,
  serviceLevelRolling30min: 82.4,
  abandonRateRolling30min: 4.2,
  callsHandledLast60min: 485,
  queueHealth: [
    { queue: 'General Inquiry', waiting: 12, available: 28, status: 'normal' },
    { queue: 'Technical Support', waiting: 8, available: 22, status: 'normal' },
    { queue: 'Billing & Payments', waiting: 18, available: 8, status: 'critical' },
    { queue: 'Healthcare Support', waiting: 5, available: 18, status: 'normal' },
    { queue: 'Sales Inbound', waiting: 3, available: 15, status: 'healthy' },
    { queue: 'Logistics Tracking', waiting: 7, available: 12, status: 'normal' },
    { queue: 'Escalations', waiting: 2, available: 8, status: 'healthy' },
    { queue: 'After-Hours Emergency', waiting: 1, available: 5, status: 'healthy' },
  ],
};

// -----------------------------------------------------------------------------
// 26. EXECUTIVE SUMMARY CARDS (for the executive overview dashboard)
// -----------------------------------------------------------------------------
export const executiveSummary = {
  period: 'December 2025',
  highlights: [
    { label: 'Revenue', value: '$1.58M', change: '+8.2%', trend: 'up', context: 'vs November' },
    { label: 'CSAT', value: '4.37', change: '+6.1%', trend: 'up', context: 'vs Jan baseline' },
    { label: 'Service Level', value: '83.8%', change: '+5.6pp', trend: 'up', context: 'vs Jan baseline' },
    { label: 'NPS', value: '+48', change: '+16pts', trend: 'up', context: 'vs Jan baseline' },
    { label: 'Attrition', value: '21%', change: '-11pp', trend: 'down', context: 'vs Jan baseline' },
    { label: 'Bot Deflection', value: '45.0%', change: '+16.5pp', trend: 'up', context: 'vs Jan baseline' },
  ],
  riskItems: [
    { area: 'Team Delta Performance', severity: 'high', detail: 'QA score 68.0 (org avg 86.7), adherence 82.0% - intervention plan activated' },
    { area: 'Global Media SLA', severity: 'medium', detail: '4 of 5 SLA metrics missed in December. $12.6K penalty exposure' },
    { area: 'Cost Pressure', severity: 'medium', detail: 'Cost per contact up 9.1% YTD. Labor cost growth outpacing revenue gains' },
  ],
  opportunities: [
    { area: 'AI Expansion', detail: 'Bot deflection up to 45%. Additional $340K annual savings if intent accuracy reaches 92%' },
    { area: 'Digital Migration', detail: 'Digital share at 45.8% (from 35.5% in Jan). Each 1% shift saves ~$28K/month in labor' },
    { area: 'Omega Best Practices', detail: 'Team Omega FCR at 76.9% with highest QA scores. Methodology transfer could lift other teams' },
  ],
};

// -----------------------------------------------------------------------------
// 27. NOTIFICATION PREFERENCES & THRESHOLDS
// -----------------------------------------------------------------------------
export const thresholds = {
  serviceLevel: { warning: 80, critical: 75 },
  abandonRate: { warning: 5, critical: 8 },
  asa: { warning: 30, critical: 60 },
  aht: { warning: 360, critical: 420 },
  qaScore: { warning: 75, critical: 65 },
  csat: { warning: 4.0, critical: 3.5 },
  adherence: { warning: 90, critical: 85 },
  occupancy: { warning: 88, critical: 92 },
  fcr: { warning: 70, critical: 60 },
  compliance: { warning: 95, critical: 90 },
};

// -----------------------------------------------------------------------------
// 28. TREND SPARKLINE DATA (for dashboard micro-charts, last 14 days)
// -----------------------------------------------------------------------------
export const sparklines = {
  serviceLevel: [82.1, 83.5, 81.8, 84.2, 83.0, 82.5, 80.2, 83.8, 84.5, 83.2, 82.8, 84.1, 83.5, 83.8],
  csat: [4.32, 4.35, 4.30, 4.38, 4.34, 4.31, 4.28, 4.36, 4.39, 4.35, 4.33, 4.37, 4.35, 4.37],
  aht: [318, 315, 320, 312, 316, 319, 322, 314, 310, 315, 317, 312, 314, 312],
  callVolume: [2620, 2710, 2680, 2750, 2590, 1480, 1270, 2650, 2720, 2690, 2740, 2600, 1510, 2685],
  qaScore: [85.5, 86.2, 85.8, 86.8, 86.0, 85.5, 84.8, 86.5, 87.0, 86.2, 85.9, 86.7, 86.3, 86.7],
  botDeflection: [43.8, 44.2, 43.5, 44.8, 44.0, 43.2, 42.5, 44.5, 45.2, 44.5, 44.0, 45.0, 44.8, 45.0],
};

// -----------------------------------------------------------------------------
// 29. COLOR PALETTES & CHART CONFIG
// -----------------------------------------------------------------------------
export const chartConfig = {
  teamColors: {
    Alpha: '#4F46E5',
    Beta: '#0EA5E9',
    Gamma: '#10B981',
    Delta: '#F59E0B',
    Epsilon: '#8B5CF6',
    Omega: '#EC4899',
  },
  statusColors: {
    healthy: '#10B981',
    normal: '#3B82F6',
    warning: '#F59E0B',
    critical: '#EF4444',
    degraded: '#F97316',
  },
  sentimentColors: {
    positive: '#10B981',
    neutral: '#6B7280',
    negative: '#EF4444',
  },
  trendColors: {
    up: '#10B981',
    down: '#EF4444',
    stable: '#6B7280',
  },
};
