export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'project' | 'pdf' | 'shortcut';
  content?: string;
  icon: string;
  children?: string[];
  openBehavior?: 'internal' | 'external';
}

const icons = {
  folder: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="%23FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>',
  computer: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%2337474F" d="M4,34h40V12c0-2.2-1.8-4-4-4H8c-2.2,0-4,1.8-4,4V34z"/><path fill="%2381D4FA" d="M8,12h32v18H8V12z"/><path fill="%23B0BEC5" d="M16,34h16v6H16V34z"/><path fill="%2378909C" d="M12,40h24v4H12V40z"/></svg>',
  browser: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="%2329B6F6"/><path fill="%230288D1" d="M24,4C12.95,4,4,12.95,4,24s8.95,20,20,20s20-8.95,20-20S35.05,4,24,4z M24,40c-8.84,0-16-7.16-16-16S15.16,8,24,8s16,7.16,16,16S32.84,40,24,40z"/><path fill="%2381D4FA" d="M24,8c-4.42,0-8,7.16-8,16s3.58,16,8,16s8-7.16,8-16S28.42,8,24,8z"/></svg>',
  txt: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23E1E2E1" d="M10,4h20l10,10v30H10V4z"/><path fill="%23BDBDBD" d="M30,4l10,10h-10V4z"/><rect x="15" y="16" width="18" height="2" fill="%23757575"/><rect x="15" y="22" width="18" height="2" fill="%23757575"/><rect x="15" y="28" width="18" height="2" fill="%23757575"/></svg>',
  recycleBin: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%2378909C" d="M38,10H10c-1.1,0-2,0.9-2,2v2h32v-2C40,10.9,39.1,10,38,10z"/><path fill="%2390A4AE" d="M10,14l2,28c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2l2-28H10z"/><path fill="%23CFD8DC" d="M18,18h2v20h-2V18z M23,18h2v20h-2V18z M28,18h2v20h-2V18z"/></svg>',
  github: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  linkedin: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%230A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  leetcode: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23FFA116" d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>',
  mail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23F4B400" d="M40,8H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V12C44,9.8,42.2,8,40,8z"/><path fill="%23DB4437" d="M24,26L4,12v24L24,26z M24,26l20,10V12L24,26z"/><path fill="%23F4B400" d="M4,12l20,14l20-14H4z"/></svg>',
  drive: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="4" y="10" width="40" height="28" rx="3" fill="%23CFD8DC"/><rect x="4" y="10" width="40" height="10" rx="3" fill="%23B0BEC5"/><circle cx="38" cy="32" r="4" fill="%2378909C"/><rect x="10" y="15" width="16" height="3" rx="1" fill="%23607D8B"/></svg>',
  cvDownload: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23F44336" d="M8,8v32h32V16l-8-8H8z"/><path fill="%23B71C1C" d="M32,16h8l-8-8V16z"/><path fill="white" d="M16,22h16v2H16z M16,27h16v2H16z M16,32h8v2H16z"/><path fill="%234CAF50" d="M34,38l-6-7h4v-5h4v5h4z"/></svg>',
  liveLink: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="%234CAF50"/><path fill="white" d="M24,8C15.2,8,8,15.2,8,24s7.2,16,16,16s16-7.2,16-16S32.8,8,24,8z M24,36c-6.6,0-12-5.4-12-12s5.4-12,12-12s12,5.4,12,12S30.6,36,24,36z"/><path fill="white" d="M24,12c-3.3,0-6,7.2-6,12s2.7,12,6,12s6-7.2,6-12S27.3,12,24,12z"/><rect x="12" y="22" width="24" height="4" fill="white"/></svg>',
};

const ME = {
  name:     'Alex Carter',
  role:     'Full-Stack Developer & UI Architect',
  location: 'San Francisco, CA',
  email:    'alex.carter.dev@gmail.com',
  github:   'https://github.com/alexcarterdev',
  linkedin: 'https://linkedin.com/in/alexcarterdev',
  leetcode: 'https://leetcode.com/alexcarterdev',
  website:  'https://alexcarter.dev',
  phone:    '+1 (415) 555-0182',
  cvUrl:    'https://drive.google.com/uc?export=download&id=YOUR_GOOGLE_DRIVE_FILE_ID',
};

const RESUME_CONTENT = `
  ╔══════════════════════════════════════╗
  ║         ALEX CARTER                 ║
  ║   Full-Stack Developer              ║
  ║   San Francisco, CA                 ║
  ╚══════════════════════════════════════╝

  📧  alex.carter.dev@gmail.com
  🐙  github.com/alexcarterdev
  💼  linkedin.com/in/alexcarterdev
  📞  +1 (415) 555-0182

  ──────────────────────────────────────
  SUMMARY
  ──────────────────────────────────────
  Full-stack developer with 3+ years
  building production web applications.
  I obsess over clean architecture,
  beautiful UIs, and developer experience.
  Open to full-time & freelance work.

  ──────────────────────────────────────
  EXPERIENCE
  ──────────────────────────────────────
  Full-Stack Dev  •  Freelance
  2022 – Present
  • Shipped 8+ production apps
  • Reduced load times by 40% (SSR)
  • Built real-time WebSocket dashboards

  Frontend Engineer  •  StartupXYZ
  2021 – 2022
  • Led CRA → Next.js App Router migration
  • Introduced Zustand (60% less renders)
  • Mentored 2 junior developers

  ──────────────────────────────────────
  EDUCATION
  ──────────────────────────────────────
  B.S. Computer Science
  UC Berkeley  •  GPA: 3.8 / 4.0  •  2021

  ──────────────────────────────────────
  ACHIEVEMENTS
  ──────────────────────────────────────
  🏆  1st place — HackSF 2023
  ⭐  400+ GitHub stars
  📝  12k+ monthly readers dev.to
`;

const SKILLS_CONTENT = `
  ╔══════════════════════════════════════╗
  ║        TECHNICAL SKILLS             ║
  ╚══════════════════════════════════════╝

  ──────────────────────────────────────
  LANGUAGES
  ──────────────────────────────────────
  ★★★★★  TypeScript / JavaScript
  ★★★★★  HTML5 / CSS3
  ★★★☆☆  Python
  ★★★☆☆  SQL

  ──────────────────────────────────────
  FRONTEND
  ──────────────────────────────────────
  ✓  React 18, Next.js 14 (App Router)
  ✓  Tailwind CSS, Framer Motion
  ✓  Zustand, React Query
  ✓  Shadcn/ui, Radix UI

  ──────────────────────────────────────
  BACKEND
  ──────────────────────────────────────
  ✓  Node.js, Express, Fastify
  ✓  REST APIs, GraphQL
  ✓  Prisma ORM, Drizzle

  ──────────────────────────────────────
  DATABASES & INFRA
  ──────────────────────────────────────
  ✓  PostgreSQL, MongoDB, Redis
  ✓  Docker, Vercel, AWS (S3/EC2)
  ✓  GitHub Actions (CI/CD)

  ──────────────────────────────────────
  PROBLEM SOLVING
  ──────────────────────────────────────
  🟨  LeetCode: 350+ problems solved
      Top 15% globally
      Strong in: Arrays, Trees, DP
`;

const ABOUT_CONTENT = `
  ╔══════════════════════════════════════╗
  ║     HI, I'M ALEX CARTER 👋          ║
  ╚══════════════════════════════════════╝

  Welcome to my portfolio!
  Built as a Windows XP desktop sim
  because a plain React page is boring.

  ──────────────────────────────────────
  WHO AM I?
  ──────────────────────────────────────
  Full-stack developer who loves building
  things that feel magical.

  → Fast, accessible, beautiful UIs
  → Rock-solid backend architecture
  → Developer experience & clean code
  → Ship things that actually work

  Currently seeking full-time roles
  where I can push the web forward.

  ──────────────────────────────────────
  OUTSIDE CODE
  ──────────────────────────────────────
  🎮  Retro OS nostalgia & game modding
  📸  Street photography
  ☕  Specialty coffee enthusiast
  📚  "A Philosophy of Software Design"

  ──────────────────────────────────────
  FUN FACT
  ──────────────────────────────────────
  This portfolio is built entirely from
  scratch: real window manager, virtual
  file system, browser — no libs needed.
  Just React + Zustand + Tailwind CSS.
`;

const CONTACT_CONTENT = `
  ╔══════════════════════════════════════╗
  ║        CONTACT ALEX CARTER          ║
  ╚══════════════════════════════════════╝

  📧  alex.carter.dev@gmail.com
  💼  linkedin.com/in/alexcarterdev
  🐙  github.com/alexcarterdev
  🌐  alexcarter.dev
  📞  +1 (415) 555-0182

  ──────────────────────────────────────
  OPEN TO
  ──────────────────────────────────────
  ✓  Full-time frontend / full-stack
  ✓  Freelance & consulting
  ✓  Open source collaboration

  Best way: email or LinkedIn DM.
  ⏱  Response time: within 24 hours.

  Let's build something great! 🚀
`;

const MY_COMPUTER_CONTENT = `
  ╔══════════════════════════════════════╗
  ║      MY COMPUTER — Properties       ║
  ╚══════════════════════════════════════╝

  System  : Windows XP Professional
  Build   : Alex Portfolio v3.0.0 (2024)

  ──────────────────────────────────────
  PROCESSOR
  ──────────────────────────────────────
  Model  : Alex's Brain™ @ 3.0 GHz
  Cores  : 8  (focus mode: 4)
  Cache  : 16GB curiosity buffer

  ──────────────────────────────────────
  STORAGE
  ──────────────────────────────────────
  C:\\   Local Disk      [8 apps shipped]
  E:\\   Portfolio Drive [resume, skills]

  ──────────────────────────────────────
  NETWORK
  ──────────────────────────────────────
  Status : Online — Available for hire
  Speed  : 800 Mbps (fast learner)
  Ping   : alex.carter.dev@gmail.com

  ──────────────────────────────────────
  REGISTERED TO
  ──────────────────────────────────────
  Name   : Alex Carter
  Role   : Full-Stack Developer
  City   : San Francisco, CA
`;

export const fileSystem: Record<string, FileItem> = {
  desktop: {
    id: 'desktop', name: 'Desktop', type: 'folder', icon: icons.folder,
    children: ['my-computer', 'projects', 'about-me', 'resume-txt', 'skills-txt', 'contact', 'cv-download', 'github', 'linkedin', 'leetcode', 'recycle-bin'],
  },

  // ── My Computer ──────────────────────────────────────────────────────────────
  'my-computer': {
    id: 'my-computer', name: 'My Computer', type: 'folder', icon: icons.computer,
    children: ['c-drive', 'e-drive', 'my-computer-info'],
  },
  'c-drive': {
    id: 'c-drive', name: 'Local Disk (C:)', type: 'folder', icon: icons.drive,
    children: ['projects', 'resume-txt', 'skills-txt'],
  },
  'e-drive': {
    id: 'e-drive', name: 'Portfolio Drive (E:)', type: 'folder', icon: icons.drive,
    children: ['about-me', 'contact', 'cv-download'],
  },
  'my-computer-info': {
    id: 'my-computer-info', name: 'System Info.txt', type: 'shortcut',
    content: MY_COMPUTER_CONTENT, openBehavior: 'internal', icon: icons.txt,
  },

  // ── Projects — FLAT (no nested folders) ──────────────────────────────────────
  projects: {
    id: 'projects', name: 'Projects', type: 'folder', icon: icons.folder,
    children: ['xp-github', 'xp-live', 'sales-github', 'sales-live', 'reel-github', 'reel-live', 'blog-github', 'blog-live'],
  },
  'xp-github': {
    id: 'xp-github', name: 'XP Portfolio — GitHub.lnk', type: 'shortcut',
    content: ME.github, openBehavior: 'external', icon: icons.github,
  },
  'xp-live': {
    id: 'xp-live', name: 'XP Portfolio — Live.lnk', type: 'shortcut',
    content: ME.website, openBehavior: 'external', icon: icons.liveLink,
  },
  'sales-github': {
    id: 'sales-github', name: 'Sales Copilot — GitHub.lnk', type: 'shortcut',
    content: ME.github, openBehavior: 'external', icon: icons.github,
  },
  'sales-live': {
    id: 'sales-live', name: 'Sales Copilot — Live.lnk', type: 'shortcut',
    content: 'https://vercel.com', openBehavior: 'external', icon: icons.liveLink,
  },
  'reel-github': {
    id: 'reel-github', name: 'ReelPost — GitHub.lnk', type: 'shortcut',
    content: ME.github, openBehavior: 'external', icon: icons.github,
  },
  'reel-live': {
    id: 'reel-live', name: 'ReelPost — Live.lnk', type: 'shortcut',
    content: 'https://vercel.com', openBehavior: 'external', icon: icons.liveLink,
  },
  'blog-github': {
    id: 'blog-github', name: 'Dev Blog — GitHub.lnk', type: 'shortcut',
    content: ME.github, openBehavior: 'external', icon: icons.github,
  },
  'blog-live': {
    id: 'blog-live', name: 'Dev Blog — Read.lnk', type: 'shortcut',
    content: 'https://dev.to', openBehavior: 'external', icon: icons.liveLink,
  },

  // ── Text Files ───────────────────────────────────────────────────────────────
  'about-me': {
    id: 'about-me', name: 'About Me.txt', type: 'shortcut',
    content: ABOUT_CONTENT, openBehavior: 'internal', icon: icons.txt,
  },
  'resume-txt': {
    id: 'resume-txt', name: 'Resume.txt', type: 'shortcut',
    content: RESUME_CONTENT, openBehavior: 'internal', icon: icons.txt,
  },
  'skills-txt': {
    id: 'skills-txt', name: 'Skills.txt', type: 'shortcut',
    content: SKILLS_CONTENT, openBehavior: 'internal', icon: icons.txt,
  },
  contact: {
    id: 'contact', name: 'Contact.txt', type: 'shortcut',
    content: CONTACT_CONTENT, openBehavior: 'internal', icon: icons.mail,
  },

  // ── CV Download ──────────────────────────────────────────────────────────────
  'cv-download': {
    id: 'cv-download', name: 'Download CV.lnk', type: 'shortcut',
    content: 'CV_DOWNLOAD', openBehavior: 'external', icon: icons.cvDownload,
  },

  // ── External Shortcuts ───────────────────────────────────────────────────────
  github: {
    id: 'github', name: 'GitHub', type: 'shortcut',
    content: ME.github, openBehavior: 'external', icon: icons.github,
  },
  linkedin: {
    id: 'linkedin', name: 'LinkedIn', type: 'shortcut',
    content: ME.linkedin, openBehavior: 'external', icon: icons.linkedin,
  },
  leetcode: {
    id: 'leetcode', name: 'LeetCode', type: 'shortcut',
    content: ME.leetcode, openBehavior: 'external', icon: icons.leetcode,
  },

  // ── Recycle Bin ──────────────────────────────────────────────────────────────
  'recycle-bin': {
    id: 'recycle-bin', name: 'Recycle Bin', type: 'folder', icon: icons.recycleBin,
    children: ['rejected-job'],
  },
  'rejected-job': {
    id: 'rejected-job', name: 'job_rejection.txt', type: 'shortcut',
    content: `
  Dear Candidate,

  After careful consideration, we have decided
  to move forward with other applicants at
  this time. We wish you the best.

       — Every recruiter, before seeing
         this portfolio.

  ════════════════════════════════════════
  [ This file has been permanently deleted ]
  ════════════════════════════════════════
`,
    openBehavior: 'internal', icon: icons.txt,
  },
};

export const getDesktopIcons = () =>
  fileSystem['desktop'].children?.map((id) => fileSystem[id]) || [];

export const getFolderContents = (folderId: string) =>
  fileSystem[folderId]?.children?.map((id) => fileSystem[id]) || [];
