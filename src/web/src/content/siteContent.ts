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
  constellation: {
    x: number;
    y: number;
    tier: 'core' | 'orbit' | 'frontier';
  };
}

export interface ProjectContent {
  name: string;
  company: string;
  thesis: string;
  projectType: string;
  stage: string;
  horizon: string;
  energy: string;
  cross: string[];
  portfolioRole: string;
  whyNow: string;
  blueprint: string;
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

export const companyOrder = [
  'consolidated',
  'technologies',
  'industries',
  'helix',
  'underwater',
  'exploration',
  'labs',
  'ventures',
  'foundation',
] as const;

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
      'Sets the sequence for ventures, exploration, hard-tech, and philanthropic expression.',
    ],
    projects: ['Portfolio design', 'Capital strategy', 'Governance systems', 'Brand architecture'],
    cross: ['Technologies', 'Ventures', 'Foundation', 'All operating units'],
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
    constellation: { x: 50, y: 48, tier: 'core' },
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
    projects: ['Life OS', 'TaleWeaver', 'FrostAura Startup', 'Enterprise AI systems'],
    cross: ['Industries', 'Helix', 'Labs', 'All internal systems'],
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
    constellation: { x: 30, y: 24, tier: 'orbit' },
  },
  industries: {
    key: 'industries',
    name: 'FrostAura Industries',
    imply: 'Hard tech, robotics, electronics, and embodied systems.',
    mission:
      'Build intelligent physical systems that extend human reach through robotics, drones, and advanced hardware.',
    energy: 'Embodied capability',
    focus: [
      'Embodies autonomy and software in the physical world.',
      'Supports field operations, exploration, and future mission hardware.',
      'Pairs systems engineering depth with premium execution quality.',
    ],
    projects: ['Robotics systems', 'Drones and autonomy', 'Sensor systems', 'Mission hardware'],
    cross: ['Technologies', 'Underwater', 'Exploration', 'Labs'],
    roles: [
      ['Principal Robotics Engineer', 'Mechatronics, control systems, and deployment judgment.'],
      ['Lead Embedded Systems Engineer', 'Firmware, board interfaces, and field reliability.'],
      ['Autonomy Systems Engineer', 'Perception, planning, and simulation-to-field loops.'],
      ['Hardware Program Lead', 'Supplier strategy, integration quality, and systems planning.'],
    ],
    spotlight: [
      { label: 'Role', value: 'Hardware + autonomy' },
      { label: 'Function', value: 'Field systems' },
      { label: 'Output', value: 'Physical reach' },
    ],
    constellation: { x: 68, y: 24, tier: 'orbit' },
  },
  helix: {
    key: 'helix',
    name: 'FrostAura Helix',
    imply: 'Life systems, computational biology, vitality, and longevity.',
    mission:
      'Advance biology, health optimization, and long-horizon resilience through computational life systems and carefully directed R&D.',
    energy: 'Life systems',
    focus: [
      'Bio-AI and computational biology programs with real scientific taste.',
      'Health and longevity pathways that align with the long-range FrostAura thesis.',
      'Secure, reproducible life systems tooling and data workflows.',
    ],
    projects: ['Protein folding AI', 'Computational biology', 'Genomics systems', 'Bio-optimization platforms'],
    cross: ['Technologies', 'Labs', 'Industries'],
    roles: [
      ['Principal Computational Biology Engineer', 'Bioinformatics pipelines and experimental-computational loops.'],
      ['Principal ML Scientist', 'Biological machine learning and evaluation rigor.'],
      ['Bioinformatics Platform Engineer', 'Secure analysis workflows and scalable life-systems tooling.'],
      ['Life Systems Director', 'Program design, partnerships, and scientific prioritization.'],
    ],
    spotlight: [
      { label: 'Role', value: 'Biology + compute' },
      { label: 'Function', value: 'Health R&D' },
      { label: 'Output', value: 'Long-range resilience' },
    ],
    constellation: { x: 18, y: 48, tier: 'frontier' },
  },
  underwater: {
    key: 'underwater',
    name: 'FrostAura Underwater',
    imply: 'Elite underwater operations, training, and expedition support.',
    mission:
      'Build an elegant underwater operating platform across dive centers, training, field services, and expedition support.',
    energy: 'Ocean operations',
    focus: [
      'Commercial ocean-facing execution with premium experience quality.',
      'Training, certification, and field operations as capability engines.',
      'Operational support for exploration missions and ocean partnerships.',
    ],
    projects: ['Dive center operations', 'Training and certification', 'Underwater services', 'Expedition support'],
    cross: ['Exploration', 'Industries', 'Foundation'],
    roles: [
      ['Senior Dive Operations Lead', 'Safety culture, field leadership, and service quality.'],
      ['Expedition Systems Manager', 'Logistics, readiness, permits, and field support.'],
      ['Partnerships Lead', 'Destination relationships and premium alliances.'],
      ['Operations Director', 'Network growth, service design, and execution standards.'],
    ],
    spotlight: [
      { label: 'Role', value: 'Commercial ocean platform' },
      { label: 'Function', value: 'Training + services' },
      { label: 'Output', value: 'Field readiness' },
    ],
    constellation: { x: 80, y: 48, tier: 'frontier' },
  },
  exploration: {
    key: 'exploration',
    name: 'FrostAura Exploration',
    imply: 'Discovery, frontier missions, archaeology, and truth-seeking.',
    mission:
      'Pursue discovery through marine archaeology, deep-ocean missions, mapping, and research partnerships.',
    energy: 'Discovery missions',
    focus: [
      'Turns field capability into knowledge, research value, and public fascination.',
      'Builds research-grade missions with strong technical support and documentation.',
      'Connects discovery to cultural, scientific, and storytelling impact.',
    ],
    projects: ['Marine archaeology', 'Discovery missions', 'Survey and mapping', 'Research documentation'],
    cross: ['Underwater', 'Industries', 'Foundation', 'TaleWeaver'],
    roles: [
      ['Lead Marine Archaeologist', 'Field interpretation, site stewardship, and scholarly rigor.'],
      ['Expedition Research Lead', 'Turns missions into datasets and narratives.'],
      ['Survey Systems Engineer', 'Mapping, sensing, instrumentation, and field support.'],
      ['Exploration Director', 'Mission design and partnership quality.'],
    ],
    spotlight: [
      { label: 'Role', value: 'Research + truth seeking' },
      { label: 'Function', value: 'Mission design' },
      { label: 'Output', value: 'Public fascination' },
    ],
    constellation: { x: 32, y: 74, tier: 'frontier' },
  },
  labs: {
    key: 'labs',
    name: 'FrostAura Labs',
    imply: 'Moonshots, frontier R&D, and future strategic capability.',
    mission:
      'Incubate high-risk future capability through advanced concepts, frontier AI, stealth prototypes, and experimental programs.',
    energy: 'Frontier R&D',
    focus: [
      'Internal R&D for projects not yet ready for public positioning.',
      'Rapid exploration of software, hardware, and hybrid capability bets.',
      'Feeds mature programs into Technologies, Industries, Helix, or Ventures.',
    ],
    projects: ['Moonshots', 'Frontier AI', 'Stealth prototypes', 'Advanced systems'],
    cross: ['Technologies', 'Industries', 'Helix', 'Ventures'],
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
    constellation: { x: 68, y: 74, tier: 'frontier' },
  },
  ventures: {
    key: 'ventures',
    name: 'FrostAura Ventures',
    imply: 'Portfolio building, incubation, spin-outs, and ownership.',
    mission:
      'Create, hold, scale, and selectively acquire companies that prove durable and strategically aligned with FrostAura.',
    energy: 'Venture formation',
    focus: [
      'Receives mature internal programs that deserve standalone company treatment.',
      'Builds venture design, portfolio logic, and scaling discipline.',
      'Expands FrostAura commercially without diluting the mission model.',
    ],
    projects: ['Spin-outs', 'Venture creation', 'Acquisitions', 'Strategic investments'],
    cross: ['Technologies', 'Labs', 'Capital strategy'],
    roles: [
      ['Venture Lead', 'Formation judgment, founder support, and scaling discipline.'],
      ['Strategy and Capital Lead', 'Deal sourcing, diligence, and allocation logic.'],
      ['Product Incubation Lead', 'Shapes new concepts into investable venture theses.'],
      ['Corporate Development Lead', 'Transactions, partnerships, and integration thinking.'],
    ],
    spotlight: [
      { label: 'Role', value: 'Portfolio builder' },
      { label: 'Function', value: 'Spin-out discipline' },
      { label: 'Output', value: 'Durable ownership' },
    ],
    constellation: { x: 18, y: 86, tier: 'orbit' },
  },
  foundation: {
    key: 'foundation',
    name: 'FrostAura Foundation',
    imply: 'Stewardship, legitimacy, impact, and visible public good.',
    mission:
      'Convert commercial success into visible public good through education, science, ocean initiatives, and humanitarian programs.',
    energy: 'Visible public good',
    focus: [
      'Anchors the moral purpose of the system with concrete impact.',
      'Supports scholarships, science and ocean programs, and aligned sponsorships.',
      'Creates a durable bridge between capability and contribution.',
    ],
    projects: ['Education and scholarships', 'Ocean programs', 'Community support', 'Humanitarian initiatives'],
    cross: ['Underwater', 'Exploration', 'Helix', 'Brand'],
    roles: [
      ['Foundation Director', 'Program strategy, stewardship, and governance judgment.'],
      ['Impact Programs Lead', 'Operational discipline and visible execution quality.'],
      ['Partnerships and Grant Manager', 'Sponsors, collaborators, and reporting structure.'],
      ['Impact Operations Lead', 'Budgets, documentation, and sustainable delivery.'],
    ],
    spotlight: [
      { label: 'Role', value: 'Impact expression' },
      { label: 'Function', value: 'Stewardship + legitimacy' },
      { label: 'Output', value: 'Human benefit' },
    ],
    constellation: { x: 82, y: 86, tier: 'orbit' },
  },
};

export const projectContent: ProjectContent[] = [
  {
    name: 'Life OS',
    company: 'FrostAura Technologies',
    thesis:
      'A software-first platform for personal and operational clarity, designed to help people run life with more intention and control.',
    projectType: 'Product system',
    stage: 'Active build',
    horizon: 'Near-term product engine',
    energy: 'Capital into user capability',
    cross: ['Technologies -> core build', 'Helix -> health pathways', 'Ventures -> spin-out potential'],
    portfolioRole: 'Digital control layer with room to become a venture-scale platform.',
    whyNow: 'It sharpens product execution, recurring revenue potential, and internal operating discipline at the same time.',
    blueprint: 'Placed in Technologies today, with a Ventures path if it matures into a standalone company.',
  },
  {
    name: 'TaleWeaver',
    company: 'FrostAura Technologies',
    thesis:
      'A narrative and media-tech system that turns stories, structure, and synthesis into a durable product experience.',
    projectType: 'Narrative platform',
    stage: 'Brand + product design',
    horizon: 'Standalone media-tech path',
    energy: 'Narrative into venture value',
    cross: ['Technologies -> product execution', 'Ventures -> standalone brand path', 'Exploration -> documentary output'],
    portfolioRole: 'Turns FrostAura narrative quality into product leverage and future media-company optionality.',
    whyNow: 'Narrative systems can elevate product quality, documentary output, and public fascination before the broader portfolio is fully visible.',
    blueprint: 'A Technologies-native build today with a clean spin-out route through Ventures later.',
  },
  {
    name: 'FrostAura Startup',
    company: 'FrostAura Technologies',
    thesis:
      'A startup digital twin and operating software concept that turns planning, structure, and execution into a living company system.',
    projectType: 'Operating platform',
    stage: 'Internal systems mode',
    horizon: 'Future venture candidate',
    energy: 'Planning into operating control',
    cross: ['Technologies -> build and revenue', 'Ventures -> future company', 'Consolidated -> internal operating layer'],
    portfolioRole: 'Internal command system that could graduate into a category-defining venture product.',
    whyNow: 'FrostAura itself needs a disciplined operating layer, and building it internally creates both control and product insight.',
    blueprint: 'Squarely a software and AI system inside Technologies until it earns independent scale.',
  },
  {
    name: 'Enterprise AI Systems',
    company: 'FrostAura Technologies',
    thesis:
      'Applied AI, automation, security, and software systems that generate operating cash flow and strategic capability early.',
    projectType: 'Revenue engine',
    stage: 'Commercial delivery',
    horizon: 'Cash flow foundation',
    energy: 'Revenue into portfolio momentum',
    cross: ['All divisions -> shared intelligence', 'Labs -> deeper R&D', 'Consolidated -> cash flow and control'],
    portfolioRole: 'Immediate capital engine and shared intelligence layer for the whole portfolio.',
    whyNow: 'Early revenue is what funds harder capability bets without diluting long-range intent.',
    blueprint: 'The blueprint makes Technologies the first cash-flow engine that powers the wider mission stack.',
  },
  {
    name: 'Robotics and Autonomy',
    company: 'FrostAura Industries',
    thesis:
      'Embodied capability across drones, robotics, control systems, and mission-specific hardware.',
    projectType: 'Hard-tech platform',
    stage: 'Capability buildout',
    horizon: 'Field deployment stack',
    energy: 'Software into physical reach',
    cross: ['Industries -> build', 'Technologies -> autonomy and data', 'Exploration -> field deployment'],
    portfolioRole: 'Transforms software competence into physical reach, mission hardware, and real-world execution.',
    whyNow: 'It creates reusable autonomy, sensing, and deployment systems that multiple FrostAura companies can depend on.',
    blueprint: 'This is Industries territory until a specific platform deserves a venture-grade spin-out.',
  },
  {
    name: 'Protein Folding AI',
    company: 'FrostAura Helix',
    thesis:
      'A computational life systems program exploring protein understanding, biological modeling, and long-horizon therapeutic potential.',
    projectType: 'Bio-AI program',
    stage: 'Research acceleration',
    horizon: 'Long-range science engine',
    energy: 'Compute into health resilience',
    cross: ['Helix -> research core', 'Technologies -> data and ML systems', 'Labs -> frontier capability'],
    portfolioRole: 'Anchors Helix around credible Bio-AI, health resilience, and long-range scientific differentiation.',
    whyNow: 'It is one of the clearest paths from machine intelligence into durable biological capability.',
    blueprint: 'The blueprint places it in Helix, with optional evolution into Labs or Ventures if a platform emerges.',
  },
  {
    name: 'Underwater Network',
    company: 'FrostAura Underwater',
    thesis:
      'An elegant international underwater operations and training platform with room for premium services, expeditions, and growth.',
    projectType: 'Operational platform',
    stage: 'Network design',
    horizon: 'Field platform expansion',
    energy: 'Operations into expedition power',
    cross: ['Underwater -> commercial engine', 'Exploration -> field support', 'Foundation -> ocean initiatives'],
    portfolioRole: 'Builds an ocean-facing commercial engine while giving Exploration a serious field platform.',
    whyNow: 'It can generate revenue, brand legitimacy, and expedition readiness earlier than frontier programs alone.',
    blueprint: 'The blueprint treats Underwater as both a business and a capability runway for ocean missions.',
  },
  {
    name: 'Marine Archaeology Missions',
    company: 'FrostAura Exploration',
    thesis:
      'Research and discovery missions built to surface new truths, protected history, and public fascination.',
    projectType: 'Discovery program',
    stage: 'Mission planning',
    horizon: 'Research + storytelling arc',
    energy: 'Fieldwork into public wonder',
    cross: ['Exploration -> mission core', 'Underwater -> operations', 'TaleWeaver -> narrative output'],
    portfolioRole: 'Turns field capability into truth-seeking, cultural value, and public fascination.',
    whyNow: 'Exploration is where FrostAura becomes more than a business portfolio and starts to matter in the world.',
    blueprint: 'The blueprint positions exploration as discovery, stewardship, and documentary-grade mission work.',
  },
];

export const heroContexts: Record<'default' | 'careers' | 'investors', HeroContext> = {
  default: {
    title: 'We build the future of human capability.',
    text:
      'FrostAura is a long-horizon parent system across software, AI, engineering, biology, exploration, ventures, and public good — built to turn wealth into capability, then capability into progress.',
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
      'FrostAura combines operating cash flow, frontier optionality, venture formation, and visible public-good intent inside one coherent system.',
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
    summary: 'AI, robotics, exploration, and life systems become real operating advantages.',
  },
  {
    label: 'Long-term',
    title: 'Translate capability into enduring progress.',
    summary: 'Health, resilience, ocean work, and public institutions become visible proof the system matters.',
  },
] as const;

export const homeSignals = [
  { label: 'Parent system', value: '1', copy: 'One shell for operators, venture formation, frontier R&D, and public good.' },
  { label: 'Core entities', value: '8', copy: 'Software, engineering, biology, exploration, ventures, and impact.' },
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
      'Operating businesses generate power that can be redeployed into robotics, biology, exploration, and public benefit.',
  },
  {
    label: 'Talent doctrine',
    title: 'Small, elite, high-trust teams.',
    summary:
      'The blueprint favors senior builders who can own direction and execution without bloated teams.',
  },
] as const;

export const projectFrames = [
  {
    label: 'Capital flow',
    title: 'Cash flow first. Frontier second. Impact last — one loop.',
    summary:
      'Technologies and Underwater create early operating power. Consolidated allocates that power into Industries, Helix, Exploration, Labs, and eventually public good.',
  },
  {
    label: 'Placement logic',
    title: 'Every project must earn its place.',
    summary:
      'Programs belong when they generate capital, build reusable capability, advance human flourishing, strengthen the institution, or create visible public good.',
  },
  {
    label: 'Venture path',
    title: 'Breakout programs can graduate into companies.',
    summary:
      'Ventures exists so proven internal work can become durable standalone ownership instead of remaining trapped as a department forever.',
  },
] as const;

export const careerFocusRoles = [
  'Principal Platform Engineer',
  'Principal AI Engineer',
  'Robotics Systems Lead',
  'Computational Life Systems Lead',
  'Expedition Operations Director',
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
      'The public pipeline is intentionally curated. These roles unlock immediate capability across software, AI, robotics, life systems, field operations, and capital.',
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
      'Engineering tracks: platform, AI, robotics, embedded, autonomy.',
      'Field tracks: exploration, marine archaeology, dive ops, expedition systems.',
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
      'Software-led revenue creates the first engine. That engine funds capability. Capability creates new ventures, frontier R&D, and visible public-good legitimacy.',
    points: [
      'Operating cash flow provides early control and resilience.',
      'Frontier optionality spans software, hard tech, exploration, and life systems.',
      'The Foundation keeps the long-range thesis legible in public.',
    ],
    tags: ['Cash flow', 'Optionality', 'Public-good signal'],
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
  'Robotics / Embedded / Hardware Engineering',
  'Computational Biology / Life Systems',
  'Field Operations / Exploration',
  'Strategy / Capital / Partnerships',
  'Brand / Communications / Narrative',
];

export const companyInterestOptions = [
  'FrostAura Technologies',
  'FrostAura Industries',
  'FrostAura Helix',
  'FrostAura Underwater',
  'FrostAura Exploration',
  'FrostAura Labs',
  'FrostAura Ventures',
  'FrostAura Foundation',
];
