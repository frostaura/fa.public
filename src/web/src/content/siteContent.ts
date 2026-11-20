export interface CompanyContent {
  key: string;
  name: string;
  imply: string;
  mission: string;
  energy: string;
  focus: string[];
  projects: string[];
  cross: string[];
  roles: Array<[title: string, summary: string]>;
  spotlight: Array<{ label: string; value: string }>;
}

export interface ProjectContent {
  name: string;
  company: string;
  thesis: string;
  projectType: string;
}

export interface HeroContext {
  title: string;
  text: string;
  ctaLabel: string;
  ctaTarget: string;
}

export interface GuidedSpotlightItem {
  id: string;
  label: string;
  title: string;
  summary: string;
  points: string[];
  tags: string[];
}

export const companyOrder = ['consolidated', 'technologies', 'labs'] as const;

export const companyContent: Record<(typeof companyOrder)[number], CompanyContent> = {
  consolidated: {
    key: 'consolidated',
    name: 'FrostAura Consolidated',
    imply: 'Parent governance, capital allocation, brand quality, and mission integrity.',
    mission:
      'Direct capital, talent, and operating discipline across FrostAura so the portfolio compounds without losing coherence.',
    energy: 'Core signal',
    focus: [
      'Owns long-horizon allocation decisions and public narrative quality.',
      'Keeps company-level ambition tied to execution standards and financial reality.',
    ],
    projects: ['Portfolio design', 'Capital strategy', 'Governance systems', 'Brand architecture'],
    cross: ['Technologies', 'Labs'],
    roles: [
      ['Chief of Staff / Operator', 'Cross-company execution, planning cadence, and follow-through.'],
      ['Strategy and Capital Lead', 'Allocation logic, fundraising quality, and venture prioritization.'],
      ['Brand and Communications Director', 'Narrative quality, investor materials, and public clarity.'],
      ['Systems Finance Lead', 'Cash flow discipline, reporting, and portfolio visibility.'],
    ],
    spotlight: [
      { label: 'Role', value: 'Parent system' },
      { label: 'Function', value: 'Capital + governance' },
      { label: 'Output', value: 'Portfolio coherence' },
    ],
  },
  technologies: {
    key: 'technologies',
    name: 'FrostAura Technologies',
    imply: 'Software, AI, systems execution, and revenue.',
    mission:
      'Generate capital and control systems through software, AI, automation, and high-performance digital products.',
    energy: 'Revenue engine',
    focus: [
      'Commercial software products and internal operating systems.',
      'AI and data platforms that accelerate the rest of FrostAura.',
      'Elegant product execution with a bias toward real-world leverage.',
    ],
    projects: ['Crusaders Squash Control System', 'Gaia', 'FrostAura public website'],
    cross: ['Labs', 'All internal systems'],
    roles: [
      ['Principal Platform Engineer', 'Distributed systems, reliability, product architecture, and security.'],
      ['Principal AI Engineer', 'Applied ML, evaluation, LLM systems, and data pipelines.'],
      ['Senior Product Systems Architect', 'Turns mission into clear product systems and workflows.'],
      ['Operating Product Lead', 'Customer judgment, commercial sense, and execution rigor.'],
    ],
    spotlight: [
      { label: 'Role', value: 'Software + AI' },
      { label: 'Function', value: 'Cash flow + control systems' },
      { label: 'Output', value: 'Operating leverage' },
    ],
  },
  labs: {
    key: 'labs',
    name: 'FrostAura Labs',
    imply: 'Moonshots, frontier R&D, and future strategic capability.',
    mission:
      'Incubate high-risk future capability through advanced concepts, frontier AI, stealth prototypes, and experimental programs.',
    energy: 'Frontier R&D',
    focus: [
      'Early product bets, built in the open before they earn a commercial home.',
      'Rapid exploration of software, hardware, and hybrid capability bets.',
      'Feeds mature programs into Technologies.',
    ],
    projects: ['Reel', 'Trimix', 'StoryTime'],
    cross: ['Technologies'],
    roles: [
      ['Principal Research Engineer', 'Theory-to-system translation and rapid prototyping.'],
      ['Systems Prototyping Lead', 'Cross-layer proof-of-capability builds.'],
      ['Strategic Programs Lead', 'Sensitive work orchestration and dependency control.'],
      ['Lab Director', 'Research portfolio quality and long-range prioritization.'],
    ],
    spotlight: [
      { label: 'Role', value: 'Moonshot engine' },
      { label: 'Function', value: 'Proof of capability' },
      { label: 'Output', value: 'Future leverage' },
    ],
  },
};

export const projectContent: ProjectContent[] = [
  {
    name: 'Crusaders Squash Control System',
    company: 'FrostAura Technologies',
    thesis: 'Court booking for racquet clubs, sold in playing minutes.',
    projectType: 'Court-booking software',
  },
  {
    name: 'Gaia',
    company: 'FrostAura Technologies',
    thesis:
      'Installable AI-agent plugins that give an agent a repository’s context, process, and product discipline, plus an MCP server.',
    projectType: 'AI agent toolkit',
  },
  {
    name: 'FrostAura public website',
    company: 'FrostAura Technologies',
    thesis: 'This site: the FrostAura front door, with the careers and investor intake flows.',
    projectType: 'Public website',
  },
  {
    name: 'Reel',
    company: 'FrostAura Labs',
    thesis: 'A movie and TV recommender built from your own viewing history.',
    projectType: 'Recommender app',
  },
  {
    name: 'Trimix',
    company: 'FrostAura Labs',
    thesis: 'A dive log that lives on your phone.',
    projectType: 'Dive-log app',
  },
  {
    name: 'StoryTime',
    company: 'FrostAura Labs',
    thesis: 'On-device bedtime stories for iPhone.',
    projectType: 'iPhone app',
  },
];

export const heroContexts: Record<'default' | 'careers' | 'investors', HeroContext> = {
  default: {
    title: 'We build the future of human capability.',
    text:
      'FrostAura is a long-horizon parent system that operates today through Technologies and Labs, structured to grow into further areas as it earns them — built to turn wealth into capability, then capability into progress.',
    ctaLabel: 'Meet the team',
    ctaTarget: 'careers',
  },
  careers: {
    title: 'Build elegant, difficult things across a company architecture designed for range.',
    text:
      'FrostAura hires leaders, principal engineers, senior researchers, and operators who can own systems, raise standards, and create leverage across multiple company lines.',
    ctaLabel: 'Start your application',
    ctaTarget: 'careers',
  },
  investors: {
    title: 'A disciplined architecture for aligned capital, capability, and long-range intent.',
    text:
      'FrostAura combines commercial software, frontier optionality, and long-range intent inside one coherent system.',
    ctaLabel: 'Share your investment thesis',
    ctaTarget: 'investors',
  },
};

export const missionMoments = [
  {
    label: 'Short-term',
    title: 'Build profitable, high-performance capability engines.',
    summary: 'Commercial execution and software revenue generate the first layer of power.',
  },
  {
    label: 'Medium-term',
    title: 'Turn capital and intelligence into advanced capability.',
    summary: 'Capital, intelligence, and engineering launch ventures that expand human capability.',
  },
  {
    label: 'Long-term',
    title: 'Translate capability into enduring progress.',
    summary: 'Health, resilience, longevity, and enduring institutions become visible proof the system matters.',
  },
] as const;

export const homeSignals = [
  { label: 'Parent system', value: '1', copy: 'One shell for capital allocation, software, and frontier R&D.' },
  { label: 'Active divisions', value: '2', copy: 'Technologies for software and AI; Labs for frontier R&D.' },
  { label: 'Mission horizons', value: '3', copy: 'Near-term cash flow, medium-term capability, long-term advancement.' },
] as const;

export const homeManifesto = [
  {
    label: 'Parent system',
    title: 'Not a single-product company.',
    summary:
      'A multidisciplinary parent system that can launch, operate, and scale multiple mission-aligned ventures without losing coherence.',
  },
  {
    label: 'Capital philosophy',
    title: 'Turn wealth into capability, and capability into progress.',
    summary:
      'Operating businesses are built to generate capital that can be redeployed into frontier capability and public benefit.',
  },
  {
    label: 'Talent doctrine',
    title: 'Small, elite, high-trust teams.',
    summary:
      'The blueprint favors senior builders who can own direction and execution without bloated teams.',
  },
] as const;

export const careerFocusRoles = [
  'Principal Platform Engineer',
  'Principal AI Engineer',
  'Strategy and Capital Lead',
];

export const careerSpotlights: GuidedSpotlightItem[] = [
  {
    id: 'why-frostaura',
    label: 'Operating signal',
    title: 'We hire for leverage, range, and calm execution.',
    summary:
      'FrostAura stays intentionally lean. Each senior person should set direction, build real systems, and raise standards across more than one edge of the architecture.',
    points: [
      'Own systems end to end, not narrow slices.',
      'Move between strategy, architecture, and execution cleanly.',
      'Prefer elegant communication, precision, and judgment under pressure.',
    ],
    tags: ['Systems ownership', 'High standards', 'Cross-company leverage'],
  },
  {
    id: 'focus-roles',
    label: 'Current focus',
    title: 'Near-term searches are concentrated on a few high-impact lanes.',
    summary:
      'The public pipeline is intentionally curated. These roles unlock immediate capability across software, AI, and capital.',
    points: careerFocusRoles,
    tags: ['Intentional hiring', 'Senior-only bias', 'Mission-critical roles'],
  },
  {
    id: 'work-shape',
    label: 'Team shape',
    title: 'Compact teams with unusually high trust and output.',
    summary:
      'Expect broad remit, direct access to decision-making, and fewer layers between idea, build, and deployment.',
    points: [
      'Leadership tracks: division leads, founding operators, strategic programs.',
      'Engineering tracks: platform and AI.',
    ],
    tags: ['Small teams', 'Fast loops', 'Real ownership'],
  },
];

export const investorSpotlights: GuidedSpotlightItem[] = [
  {
    id: 'thesis',
    label: 'Architecture thesis',
    title: 'The system compounds because each layer makes the next one stronger.',
    summary:
      'Software is built to be the first engine. That engine funds capability, and capability funds frontier R&D.',
    points: [
      'Operating cash flow is meant to provide early control and resilience.',
      'Frontier optionality sits in Labs.',
    ],
    tags: ['Cash flow', 'Optionality'],
  },
  {
    id: 'fit',
    label: 'Partner fit',
    title: 'FrostAura is designed for selective long-horizon partners.',
    summary:
      'We welcome aligned capital, strategic support, research collaboration, and long-range relationships that strengthen the architecture beyond funding alone.',
    points: [
      'High-signal, thesis-driven conversations over broad fundraising outreach.',
      'Modular architecture enables targeted participation without narrative drift.',
      'Commercial and frontier programs can be evaluated inside one coherent frame.',
    ],
    tags: ['Selective access', 'Strategic value', 'Long horizon'],
  },
  {
    id: 'what-matters',
    label: 'What matters',
    title: 'The real question is how much capability one partnership can unlock.',
    summary:
      'Capital matters, but so do network effects, technical judgment, regional reach, and the ability to accelerate real operating momentum.',
    points: [
      'Operating company growth and venture design remain disciplined.',
      'Frontier programs stay tied to execution standards and sequencing.',
      'Public narrative quality remains coherent across standalone entry points.',
    ],
    tags: ['Execution discipline', 'Network leverage', 'Narrative coherence'],
  },
];

export const careerTrackOptions = [
  'Leadership / Division Building',
  'Principal Software and Platform Engineering',
  'Principal AI / ML Engineering',
  'Strategy / Capital / Partnerships',
  'Brand / Communications / Narrative',
];

export const companyInterestOptions = ['FrostAura Technologies', 'FrostAura Labs'];

export const adjacentCompanyOptions = ['Technologies', 'Labs'];

export const investorCompanyOptions = ['Technologies', 'Labs'];

export const investorInterestProfileOptions = [
  'Operating company growth',
  'Frontier R&D exposure',
  'Strategic partnership',
];
