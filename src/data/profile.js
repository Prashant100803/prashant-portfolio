export const profile = {
  name: 'Prashant Yadav',
  greeting: "HI, I'M PRASHANT.",
  role: 'SOFTWARE DEVELOPER',
  subrole: 'FULL-STACK WEB DEVELOPER',
  tagline: 'Turning Ideas Into Exceptional Digital Experiences.',
  email: 'py9162840@gmail.com',
  phone: '+91 9305842074',
  whatsapp: 'https://wa.me/919305842074',
  github: 'https://github.com/Prashant100803',
  linkedin: 'https://www.linkedin.com/in/prashant-yadav-b8702b411',
  photo: '/profile.jpg',
  resume: '',
  aboutHeading: 'MORE THAN CODE. I BUILD EXPERIENCES.',
  about:
    'I am a passionate software developer and full-stack web developer who blends precision engineering with cinematic 3D interaction. I specialize in building modern, responsive, and performance-driven digital platforms that solve real business problems and leave a lasting impression.',
  status: 'Open to Freelance Projects & Full-Time Opportunities',
  location: 'Mumbai, India',
}

// Interactive categorized skills including new AI/ML category
export const skillsCategories = [
  {
    category: 'Programming',
    description: 'Foundational languages, algorithmic problem solving, and design patterns.',
    color: '#EF4444',
    items: [
      { name: 'JavaScript', level: 'ES6+, Async, V8 Engine', tag: 'Core' },
      { name: 'Python', level: 'Scripting, Automation, AI/ML', tag: 'Language' },
      { name: 'DSA', level: 'Arrays, Trees, Graphs, Complexity', tag: 'Logic' },
      { name: 'OOP', level: 'Inheritance, Encapsulation, Polymorphism', tag: 'Paradigm' },
    ],
  },
  {
    category: 'Frontend',
    description: 'Modern, reactive user interfaces, component systems, and responsive design.',
    color: '#DC2626',
    items: [
      { name: 'HTML5', level: 'Semantic, Accessible, SEO-friendly', tag: 'Markup' },
      { name: 'CSS3', level: 'Flexbox, Grid, Custom Keyframes', tag: 'Styling' },
      { name: 'React.js', level: 'Hooks, Custom Context, State Machines', tag: 'Framework' },
      { name: 'Next.js', level: 'SSR, SSG, App Router, Hybrid Rendering', tag: 'Meta-Framework' },
      { name: 'Tailwind CSS', level: 'Design Systems, JIT Engine, Responsive', tag: 'Styling' },
    ],
  },
  {
    category: 'Backend',
    description: 'Scalable server architectures, secure routing, and auth protocols.',
    color: '#B91C1C',
    items: [
      { name: 'Node.js', level: 'Event-driven, Non-blocking I/O', tag: 'Runtime' },
      { name: 'Express.js', level: 'REST APIs, Middleware Pipelines', tag: 'Backend' },
      { name: 'REST APIs', level: 'API Contracts, CRUD, Webhooks', tag: 'Protocol' },
      { name: 'JWT', level: 'Secure Authentication & Session Tokens', tag: 'Security' },
    ],
  },
  {
    category: 'Databases',
    description: 'Relational data modeling, indexing, and high-integrity queries.',
    color: '#991B1B',
    items: [
      { name: 'MySQL', level: 'Relational Schema, Foreign Keys, Joins', tag: 'RDBMS' },
      { name: 'PostgreSQL', level: 'Complex Queries, JSONB, Performance', tag: 'SQL' },
    ],
  },
  {
    category: 'AI / Machine Learning',
    description: 'Intelligent systems, data analytics pipelines, and LLM integrations.',
    color: '#EF4444',
    items: [
      { name: 'Machine Learning Fundamentals', level: 'Supervised, Unsupervised, Evaluation', tag: 'Core AI' },
      { name: 'Python for AI/ML', level: 'Data Modeling & Inference Pipelines', tag: 'Scripting' },
      { name: 'NumPy', level: 'Vectorized Operations & Multi-dim Arrays', tag: 'Compute' },
      { name: 'Pandas', level: 'Data Wrangling, Cleaning, & EDA', tag: 'Data' },
      { name: 'Scikit-learn', level: 'Classifiers, Regression, Preprocessing', tag: 'ML Lib' },
      { name: 'AI API Integration', level: 'OpenAI, Gemini API, Vision Models', tag: 'Integration' },
      { name: 'Prompt Engineering', level: 'Few-shot, Context Framing, Reasoning', tag: 'Prompting' },
      { name: 'AI-Assisted Development', level: 'Autonomous Agents, Accelerated Workflows', tag: 'Productivity' },
    ],
  },
  {
    category: 'Development Tools',
    description: 'Production workflows, cloud platforms, and developer ergonomics.',
    color: '#DC2626',
    items: [
      { name: 'Git', level: 'Branching Strategies, Interactive Rebase', tag: 'VCS' },
      { name: 'GitHub', level: 'Actions CI/CD, PR Workflows, Collaboration', tag: 'DevOps' },
      { name: 'VS Code', level: 'Advanced Debugging, Custom Environments', tag: 'IDE' },
      { name: 'Linux', level: 'Bash Scripting, Permissions, CLI Tooling', tag: 'OS' },
      { name: 'Docker', level: 'Containerization, Multi-stage Builds', tag: 'DevOps' },
      { name: 'Vercel', level: 'Edge Deployments, Serverless Functions', tag: 'Cloud' },
      { name: 'AWS Basics', level: 'S3 Storage, EC2 Instances, CloudFront', tag: 'Cloud' },
    ],
  },
]

// 3D Interactive Floating Skills (for Three.js Scene with Crimson materials)
export const skills3D = [
  { n: 'React.js', c: '#EF4444', k: 'ico' },
  { n: 'Node.js', c: '#DC2626', k: 'cone' },
  { n: 'Python', c: '#F87171', k: 'box' },
  { n: 'Next.js', c: '#B91C1C', k: 'knot' },
  { n: 'AI/ML', c: '#EF4444', k: 'torus' },
  { n: 'JavaScript', c: '#DC2626', k: 'dod' },
  { n: 'Tailwind', c: '#991B1B', k: 'oct' },
  { n: 'PostgreSQL', c: '#EF4444', k: 'box' },
]

// Services Offered
export const services = [
  {
    id: 1,
    title: 'Full-Stack Web Development',
    description:
      'End-to-end development of robust web applications using React, Next.js, and Node.js. Fast, secure, and architected for long-term growth.',
    deliverables: ['Custom Web Applications', 'RESTful API Engineering', 'Database Architecture', 'Secure Auth & Payments'],
    icon: 'code',
  },
  {
    id: 2,
    title: 'Interactive 3D & Creative Frontend',
    description:
      'Immersive digital experiences featuring Three.js, React Three Fiber, WebGL, and custom GSAP animations that captivate clients and elevate brands.',
    deliverables: ['Cinematic 3D Scenes', 'Smooth Scroll Choreography', 'Micro-Interactions', 'High-Converting Landing Pages'],
    icon: 'cube',
  },
  {
    id: 3,
    title: 'AI Integration & Intelligent Apps',
    description:
      'Infusing artificial intelligence into web applications: LLM API integrations, automated smart workflows, computer vision, and prompt-engineered tools.',
    deliverables: ['AI API / LLM Integrations', 'Smart Note-taking & Summarization', 'Computer Vision Prototypes', 'Data Analysis with Python'],
    icon: 'sparkles',
  },
  {
    id: 4,
    title: 'Performance, SEO & Speed Optimization',
    description:
      'Auditing and transforming slow websites into lightning-fast, 95+ Lighthouse score platforms that rank higher on search engines and convert visitors.',
    deliverables: ['Code-Splitting & Lazy-Loading', 'Core Web Vitals Optimization', 'SEO Architecture', 'Cross-Device Responsiveness'],
    icon: 'rocket',
  },
]

// Preserved Projects with Structured Case Studies
export const projects = [
  {
    id: 0,
    name: 'Gravion Consultancy – Real Estate Platform',
    d: 'Commercial real estate and property consultancy platform with interactive property showcases and direct client inquiry pipelines.',
    stack: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Commercial Platform',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'High-value property buyers needed a fast, interactive way to inspect commercial listings with immediate inquiry channels.',
      solution: 'Engineered a modern web platform featuring categorized property filters, high-res image optimization, and one-tap WhatsApp / call triggers.',
      features: [
        'Responsive commercial listings with fast asset loading',
        'Direct inquiry funnel with pre-filled property specs',
        'Mobile-first responsive architecture tested across smartphones',
      ],
      outcomes: 'Elevated client brand authority and streamlined buyer lead capture with zero friction.',
    },
  },
  {
    id: 1,
    name: 'AI Notes Making & Summary App',
    d: 'Intelligent productivity application that automatically converts complex study materials and articles into structured key takeaways.',
    stack: ['React.js', 'Node.js', 'AI API', 'Tailwind CSS'],
    category: 'AI Application',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'Students and self-learners spend excessive hours manually summarizing lengthy texts, causing fatigue and inconsistent retention.',
      solution: 'Built an automated AI notes engine that parses raw text into bullet summaries, key terms, and exportable study outlines.',
      features: [
        'Instant natural language summarization with AI integration',
        'Clean reading interface designed for cognitive clarity',
        'Exportable study sheets and organized categorized storage',
      ],
      outcomes: 'Saved users valuable study hours while improving material comprehension.',
    },
  },
  {
    id: 2,
    name: 'WildInsight – AI Animal Detection',
    d: 'Computer-vision web prototype identifying and classifying animal species from uploaded field images with descriptive context.',
    stack: ['Python', 'AI/ML', 'JavaScript', 'HTML5/CSS3'],
    category: 'Computer Vision',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'Manual wildlife classification in research and educational environments is slow and requires specialized taxonomy knowledge.',
      solution: 'Developed an accessible web interface linked to machine learning inference models for rapid species classification and habitat overview.',
      features: [
        'Rapid image processing with confidence scoring',
        'Species profile cards with ecological context and status',
        'Responsive gallery interface with drag-and-drop uploads',
      ],
      outcomes: 'Demonstrated seamless coupling of backend ML inference with an intuitive web UI.',
    },
  },
  {
    id: 3,
    name: 'Notes Share – Collaborative Study Platform',
    d: 'Resource-sharing academic repository enabling university peers to upload, organize, and discover verified study notes and question banks.',
    stack: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS'],
    category: 'Full-Stack Platform',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'Crucial study documents are lost in fragmented chat channels, leading to unorganized exam preparation.',
      solution: 'Created a centralized repository with course-based indexing, fast search, and peer document access.',
      features: [
        'Structured semester and subject document categorization',
        'Fast file search and preview generation',
        'Fully responsive mobile study experience',
      ],
      outcomes: 'Organized educational assets into an accessible central hub.',
    },
  },
  {
    id: 4,
    name: 'MTAP – Mobile Repair & Service Portal',
    d: 'Modern service booking and diagnostic website for a tech repair enterprise, featuring transparent pricing and direct scheduling.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    category: 'Commercial Business',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'A local hardware repair shop struggled with lost inquiries and lack of transparent device service pricing.',
      solution: 'Crafted a sleek repair portal with transparent price breakdown by device model and instant WhatsApp booking.',
      features: [
        'Interactive device and issue selector',
        'Transparent estimated repair costs and turnaround time',
        'Direct inquiry button connecting to technician instantly',
      ],
      outcomes: 'Boosted customer confidence and automated diagnostic walk-in inquiries.',
    },
  },
  {
    id: 5,
    name: 'Event Management & Ticketing Interface',
    d: 'Dynamic event discovery and booking portal where users explore upcoming tech conferences, hackathons, and campus summits.',
    stack: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    category: 'Interactive Web UI',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'Attendees often abandon complex ticket booking flows that lack clear timeline schedules and speaker clarity.',
      solution: 'Built a vibrant event schedule interface with speaker spotlights, date filtering, and streamlined RSVP confirmations.',
      features: [
        'Timeline-based session and agenda navigation',
        'Dynamic speaker modal profiles and bios',
        'Instant confirmation receipt generator',
      ],
      outcomes: 'Achieved high prototype engagement and intuitive navigation flow.',
    },
  },
]

export const education = [
  {
    t: 'Ideal College, Mumbai University',
    d: 'Undergraduate Degree in Information Technology / Computer Studies',
    period: 'Completed',
  },
  {
    t: 'Pendharkar College, Dombivli',
    d: 'Higher Secondary Certificate (HSC) in Science',
    period: 'Junior College',
  },
  {
    t: 'Maharashtra State Board',
    d: 'Secondary School Certificate (SSC) with distinction',
    period: 'Schooling',
  },
]
