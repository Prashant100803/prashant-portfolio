export const profile = {
  name: 'Prashant Yadav',
  title: 'Creative Web Developer',
  headline: 'Crafting Modern Websites & High-Performance Digital Experiences',
  email: 'py9162840@gmail.com',
  phone: '+91 9305842074',
  whatsapp: 'https://wa.me/919305842074',
  github: 'https://github.com/Prashant100803',
  linkedin: 'https://www.linkedin.com/in/prashant-yadav-b8702b411',
  photo: '/profile.jpg',
  resume: '', // Can be linked to /resume.pdf when uploaded
  about:
    'I am a creative web developer with a passion for designing and building modern, responsive, and engaging web applications. I combine clean frontend architecture with smooth interactivity and intuitive UI/UX to help clients, businesses, and startups transform ideas into impactful digital products.',
  status: 'Available for freelance projects & full-time roles',
  location: 'Mumbai, India',
  interests: [
    'Modern Web Development',
    'Interactive 3D & Creative UI',
    'Responsive & Mobile-First Design',
    'Performance Optimization',
    'Full-Stack Architecture',
  ],
}

// 3D Scene Skills (retained for WebGL floating animation)
export const skills = [
  { n: 'HTML5', c: '#e34f26', k: 'dod' },
  { n: 'CSS3', c: '#2965f1', k: 'oct' },
  { n: 'JavaScript', c: '#f7df1e', k: 'box' },
  { n: 'React.js', c: '#22d3ee', k: 'ico' },
  { n: 'Node.js', c: '#7ac143', k: 'cone' },
  { n: 'Git', c: '#f05032', k: 'knot' },
  { n: 'GitHub', c: '#a78bfa', k: 'torus' },
]

// Categorized Skills for the readable 2D skills grid (Accessible without WebGL)
export const skillsCategories = [
  {
    category: 'Frontend Development',
    description: 'Building accessible, fast, and responsive user interfaces with modern web standards.',
    items: [
      { name: 'HTML5', level: 'Semantic, SEO, & A11y', tag: 'Core' },
      { name: 'CSS3 / Modern CSS', level: 'Flexbox, Grid, Animations', tag: 'Styling' },
      { name: 'JavaScript (ES6+)', level: 'Async, DOM, Modern Syntax', tag: 'Logic' },
      { name: 'React.js', level: 'Hooks, Component Architecture, State', tag: 'Framework' },
      { name: 'Tailwind CSS', level: 'Utility-first, Responsive Systems', tag: 'Styling' },
    ],
  },
  {
    category: 'Backend Development',
    description: 'Creating robust server-side logic, routing, and clean RESTful API integrations.',
    items: [
      { name: 'Node.js', level: 'Server Runtime, Event-driven architecture', tag: 'Runtime' },
      { name: 'Express.js', level: 'REST APIs, Middleware, Routing', tag: 'Backend' },
      { name: 'RESTful APIs', level: 'CRUD Operations, JSON, Integration', tag: 'API' },
    ],
  },
  {
    category: 'Tools & Workflow',
    description: 'Industry-standard developer tooling for version control, builds, and efficiency.',
    items: [
      { name: 'Git', level: 'Branching, Merging, Version Control', tag: 'VCS' },
      { name: 'GitHub', level: 'Collaboration, CI/CD Workflows, Repos', tag: 'Platform' },
      { name: 'Vite', level: 'Modern Bundling, Fast HMR, Build Optimization', tag: 'Build' },
      { name: 'VS Code', level: 'Extensions, Debugging, Custom Tooling', tag: 'Editor' },
    ],
  },
  {
    category: 'Other Technologies',
    description: 'Complementary design, graphics, and performance disciplines.',
    items: [
      { name: 'Responsive Design', level: 'Mobile-first, Cross-device Fluidity', tag: 'UX' },
      { name: 'WebGL & Three.js', level: '3D Scenes, Shaders, Creative Web', tag: 'Graphics' },
      { name: 'Performance & SEO', level: 'Lighthouse Audits, Lazy-loading, Fast LCP', tag: 'Speed' },
    ],
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

// Real projects with structured case-study content
export const projects = [
  {
    id: 0,
    name: 'Gravion Consultancy – Real Estate Platform',
    d: 'A comprehensive commercial real estate and property consultancy web platform with interactive property listings and client inquiry workflows.',
    stack: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Client Web Platform',
    live: '', // Only rendered when valid
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'Property buyers and investors needed an intuitive, fast way to browse high-value commercial properties with seamless inquiry channels and fast image loading.',
      solution: 'Engineered a modern, responsive web application featuring custom filtering, clear property specifications, and direct WhatsApp / call CTA integration.',
      features: [
        'Responsive property showcase grid with high-resolution media handling',
        'Direct inquiry integration connecting prospective clients immediately',
        'Optimized mobile navigation for clients on smartphones and tablets',
        'Clean brand identity with smooth micro-interactions',
      ],
      outcomes: 'Delivered a professional digital presence that significantly improved visitor engagement and streamlined buyer inquiries.',
    },
  },
  {
    id: 1,
    name: 'AI Notes Making & Summary App',
    d: 'An intelligent productivity application that transforms lengthy study material and articles into concise, structured study notes with AI.',
    stack: ['React.js', 'Node.js', 'AI API', 'Tailwind CSS'],
    category: 'AI Web Application',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'Students and self-learners spend excessive hours manually summarizing long study materials, leading to cognitive overload and fragmented notes.',
      solution: 'Created an automated notes generator that processes raw text, organizes it into structured bullet points, key takeaways, and flashcards.',
      features: [
        'Fast natural language text summarization and bullet extraction',
        'Categorized note storage with exportable Markdown and PDF support',
        'Clean reading interface with dark/light visual comfort',
      ],
      outcomes: 'Streamlined note-taking workflow, saving students measurable hours in review preparation.',
    },
  },
  {
    id: 2,
    name: 'WildInsight – AI Animal Detection',
    d: 'An intelligent computer-vision web prototype designed to identify and classify animal species from uploaded images in real time.',
    stack: ['Python', 'AI/ML', 'JavaScript', 'HTML5/CSS3'],
    category: 'Computer Vision Prototype',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'Manual identification of wildlife species in field research and educational environments is slow and requires specialized taxonomy knowledge.',
      solution: 'Built an accessible web interface backed by computer vision models to quickly classify animal species and present descriptive biological context.',
      features: [
        'Instant image upload with confidence score and species classification',
        'Detailed species profile cards with habitat and conservation status',
        'Responsive image viewer with bounding-box highlighting',
      ],
      outcomes: 'Demonstrated successful integration of machine learning inference models with an accessible frontend interface.',
    },
  },
  {
    id: 3,
    name: 'Notes Share – Collaborative Study Platform',
    d: 'A community resource-sharing platform allowing students to upload, organize, and discover verified academic notes and past exam papers.',
    stack: ['React.js', 'Node.js', 'Express.js', 'CSS Modules'],
    category: 'Full-Stack Platform',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'Academic resources are often scattered across disparate chat groups, leading to lost materials and outdated exam prep documents.',
      solution: 'Engineered a centralized sharing repository with subject categorization, searchable tags, and peer-to-peer download capability.',
      features: [
        'Course and semester-based document indexing and fast search',
        'Secure document upload and thumbnail preview generation',
        'Responsive layout optimized for mobile study on the go',
      ],
      outcomes: 'Created an organized digital library serving peer student communities with zero downtime.',
    },
  },
  {
    id: 4,
    name: 'MTAP – Mobile Repair & Service Portal',
    d: 'A modern service booking and diagnostic website for a tech repair business, featuring instant price estimates and repair request tracking.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    category: 'Commercial Business Website',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'A local electronics repair shop suffered from inefficient phone-based scheduling and lost customer walk-ins due to lack of transparent repair pricing.',
      solution: 'Designed and deployed an interactive service portal displaying transparent repair pricing for common smartphone and device issues with an inquiry form.',
      features: [
        'Device and issue selector with instant estimated repair turnaround time',
        'Direct WhatsApp contact CTA for expedited customer support',
        'Mobile-first responsive layout with fast 3G loading performance',
      ],
      outcomes: 'Modernized the shop’s local brand presence and automated common diagnostic inquiries.',
    },
  },
  {
    id: 5,
    name: 'Event Management & Ticketing Interface',
    d: 'An event discovery and booking portal where users can browse upcoming tech summits, workshops, and college fests with ticket reservations.',
    stack: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    category: 'Interactive Web UI',
    live: '',
    github: 'https://github.com/Prashant100803',
    caseStudy: {
      problem: 'Traditional campus and community events suffered from chaotic RSVP forms and poor ticket confirmation tracking.',
      solution: 'Crafted an engaging event portal with category filtering, schedule timelines, speaker highlights, and instant RSVP confirmation.',
      features: [
        'Dynamic event filtering by date, genre, and availability',
        'Interactive speaker grid with detailed bio and session modal views',
        'Calendar integration and ticket confirmation receipt card',
      ],
      outcomes: 'Delivered an intuitive ticketing experience with high user satisfaction during prototype trials.',
    },
  },
]
