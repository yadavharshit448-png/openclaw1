export type WindowKey = '7d' | '30d' | '90d';

export type RiskLevel = 'high' | 'medium' | 'low';

export type Vendor = {
  id: string;
  name: string;
  category: string;
  owner: string;
  criticality: 'Critical' | 'Important' | 'Watch';
  dueInDays: number;
  item: string;
  progress: number;
  links: string[];
  note: string;
};

export type RiskItem = {
  id: string;
  title: string;
  vendor: string;
  dueLabel: string;
  dueInDays: number;
  risk: RiskLevel;
  action: string;
};

export const features = [
  'Risk inbox for the next 7, 30, and 90 days',
  'Vendor watchlist with owner and migration progress',
  'Deadline timeline for deprecations, renewals, and expiry dates',
  'Offline-friendly sample notes and JSON handoff reminder',
  'Clear TODO hooks for local storage, reminders, and cloud sync'
];

export const screens = [
  {
    title: 'Command Center',
    description: 'Top risk summary, urgency filters, and today's most important actions.'
  },
  {
    title: 'Vendor Watchlist',
    description: 'Tracked dependency cards with category, owner, links, and progress.'
  },
  {
    title: 'Timeline & Notes',
    description: 'Upcoming deadlines, migration notes, and export/import checklist.'
  }
];

export const privacyNotes = [
  'Demo-only MVP: no network calls, analytics, or account system included.',
  'Publish a privacy policy before enabling notifications, sync, or telemetry.',
  'Do not store secrets or API keys in the app; only dependency metadata belongs here.'
];

export const summaryStats = [
  { label: 'Tracked vendors', value: '6' },
  { label: 'Risks due in 30d', value: '4' },
  { label: 'Critical items', value: '2' }
];

export const vendors: Vendor[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payments',
    owner: 'Harshit',
    criticality: 'Critical',
    dueInDays: 12,
    item: 'Upgrade webhook retry notes + API version sunset',
    progress: 0.45,
    links: ['changelog', 'docs'],
    note: 'Sandbox webhook signatures changed; verify support docs before the next release.'
  },
  {
    id: 'firebase',
    name: 'Firebase Auth',
    category: 'Auth',
    owner: 'Dev team',
    criticality: 'Critical',
    dueInDays: 5,
    item: 'SHA cert rotation + Android SDK bump',
    progress: 0.72,
    links: ['release notes', 'status'],
    note: 'Certificate reminder is close. Keep the rollback note with the keystore owner.'
  },
  {
    id: 'twilio',
    name: 'Twilio Verify',
    category: 'Messaging',
    owner: 'Ops',
    criticality: 'Important',
    dueInDays: 28,
    item: 'Pricing tier change review',
    progress: 0.2,
    links: ['pricing', 'email note'],
    note: 'Need a quick founder review because the new tier impacts OTP margins.'
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'Infra',
    owner: 'Platform',
    criticality: 'Important',
    dueInDays: 41,
    item: 'SSL certificate expiry check',
    progress: 0.6,
    links: ['dashboard', 'status'],
    note: 'Renewal path is documented, but the owner handoff is missing.'
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'AI',
    owner: 'Product',
    criticality: 'Important',
    dueInDays: 63,
    item: 'Responses API migration readiness',
    progress: 0.33,
    links: ['migration guide', 'changelog'],
    note: 'Track old endpoint usage and cut over prompt logging safely.'
  },
  {
    id: 'clerk',
    name: 'Clerk',
    category: 'Identity',
    owner: 'Frontend',
    criticality: 'Watch',
    dueInDays: 87,
    item: 'Deprecated session prop cleanup',
    progress: 0.88,
    links: ['release notes'],
    note: 'Almost done. Leave this visible until the cleanup ships to production.'
  }
];

export const riskInbox: RiskItem[] = [
  {
    id: 'firebase-cert',
    title: 'Rotate Firebase Android cert and verify sign-in fallback',
    vendor: 'Firebase Auth',
    dueLabel: 'Due in 5 days',
    dueInDays: 5,
    risk: 'high',
    action: 'Confirm keystore owner + update release checklist'
  },
  {
    id: 'stripe-version',
    title: 'Map Stripe webhook events to the next API version',
    vendor: 'Stripe',
    dueLabel: 'Due in 12 days',
    dueInDays: 12,
    risk: 'high',
    action: 'Replay sample events in staging'
  },
  {
    id: 'twilio-pricing',
    title: 'Review OTP cost impact from Twilio pricing update',
    vendor: 'Twilio Verify',
    dueLabel: 'Due in 28 days',
    dueInDays: 28,
    risk: 'medium',
    action: 'Add revised CAC math to founder notes'
  },
  {
    id: 'cloudflare-ssl',
    title: 'Prepare SSL renewal handoff for Cloudflare zone',
    vendor: 'Cloudflare',
    dueLabel: 'Due in 41 days',
    dueInDays: 41,
    risk: 'medium',
    action: 'Document backup owner and expiry check'
  },
  {
    id: 'openai-migrate',
    title: 'Audit older OpenAI endpoints before migration window closes',
    vendor: 'OpenAI API',
    dueLabel: 'Due in 63 days',
    dueInDays: 63,
    risk: 'low',
    action: 'List affected features and test prompts'
  }
];

export const timeline = [
  'This week: rotate Firebase cert and finish Stripe staging replay.',
  'This month: review Twilio pricing impact and set Cloudflare renewal owner.',
  'This quarter: complete OpenAI migration audit and close Clerk cleanup.'
];

export const checklist = [
  'Keep links to changelogs, docs, status pages, and emails for each vendor.',
  'Record owner, due date, rollback path, and business impact for every risky change.',
  'Export data to JSON before adding sync so teams can move records safely later.'
];
