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
  computer: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="6" y="32" width="36" height="11" rx="1" fill="%23D4D0C8" stroke="%23808080" stroke-width="1"/><rect x="7" y="33" width="34" height="9" fill="%23ECE9D8"/><rect x="10" y="35" width="12" height="2" fill="%23808080"/><rect x="10" y="39" width="16" height="1.5" fill="%23808080"/><circle cx="34" cy="37" r="1.5" fill="%2300E676"/><circle cx="38" cy="37" r="1.2" fill="%23FF5252"/><path d="M20,29 L28,29 L30,33 L18,33 Z" fill="%23BDBDBD" stroke="%23808080" stroke-width="0.5"/><rect x="18" y="32" width="12" height="1" fill="%239E9E9E"/><rect x="5" y="4" width="38" height="26" rx="2" fill="%23D4D0C8" stroke="%23808080" stroke-width="1"/><rect x="6" y="5" width="36" height="24" rx="1.5" fill="%23ECE9D8"/><rect x="9" y="7" width="30" height="20" rx="1" fill="%23808080"/><rect x="10" y="8" width="28" height="18" fill="%230058EE"/><path d="M10,18 Q18,12 28,15 L38,13 L38,26 L10,26 Z" fill="%233A93FF"/><path d="M10,8 L24,8 L10,22 Z" fill="white" opacity="0.25"/><g transform="translate(20, 13) scale(0.35)"><path fill="%23F25022" d="M1 1h8v8H1z"/><path fill="%237FBA00" d="M10 1h8v8h-8z"/><path fill="%2300A4EF" d="M1 10h8v8H1z"/><path fill="%23FFB900" d="M10 10h8v8h-8z"/></g></svg>',
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
  name:     'Farhan CC',
  role:     'Full Stack / Next.js Developer',
  location: 'Kerala, India',
  email:    'farhancc123@gmail.com',
  github:   'https://github.com/farhancc',
  linkedin: 'https://www.linkedin.com/in/farhan-cc',
  leetcode: 'https://leetcode.com/farhancc',
  website:  'https://github.com/farhancc',
  phone:    '+91 9961157999',
  cvUrl:    '/Farhan%20cc%20Next%20js%20Developer.pdf',
};

const RESUME_CONTENT = `
  ╔══════════════════════════════════════════════════════════╗
  ║                 FARHAN CC                                ║
  ║  Full Stack Developer | Next.js, TypeScript & SaaS       ║
  ╚══════════════════════════════════════════════════════════╝

  📧  farhancc123@gmail.com
  📞  +91 9961157999
  🐙  github.com/farhancc
  💼  linkedin.com/in/farhan-cc

  ──────────────────────────────────────────────────────────
  SUMMARY
  ──────────────────────────────────────────────────────────
  Full Stack Developer specializing in Next.js, TypeScript,
  Node.js, and modern cloud architectures. Extensive experience
  in building multi-tenant SaaS platforms, Odoo ERP integrations,
  AI-powered workflows (OpenAI + RAG), analytics dashboards,
  and high-performance hybrid desktop/web applications.

  ──────────────────────────────────────────────────────────
  FEATURED PROJECTS
  ──────────────────────────────────────────────────────────
  1. Sales Intelligence Platform (Multi-Tenant SaaS / AI / Odoo)
     • Connects Odoo ERP data to AI Sales Copilot via OpenAI + RAG
     • Centralized sales dashboards & analytics insights

  2. Careva — Salon & Spa ERP (Multi-Tenant SaaS)
     • Multi-tenant ERP with wildcard subdomain isolation
     • POS, Inventory, CRM, Bookings, Calendar & WhatsApp CRM

  3. IDexo — Variable Data Printing SaaS (Cloud + Electron)
     • Multi-tenant SaaS with hybrid Electron.js architecture
     • Offloads heavy PDF generation from cloud servers to local CPU

  4. Sedeer Customer Portal & Commercial Applications
     • Next.js e-commerce portal integrated with Odoo ERP
     • Pets Colony, NikahRoots, Olo Rental & Kiyano Ice Cream
`;

const SKILLS_CONTENT = `
  ╔══════════════════════════════════════════════════════════╗
  ║                TECHNICAL EXPERTISE                       ║
  ╚══════════════════════════════════════════════════════════╝

  ──────────────────────────────────────────────────────────
  FRONTEND
  ──────────────────────────────────────────────────────────
  ✓  Next.js, React.js, TypeScript
  ✓  Tailwind CSS, Zustand, Redux Toolkit, React Query

  ──────────────────────────────────────────────────────────
  BACKEND & DATABASE
  ──────────────────────────────────────────────────────────
  ✓  Node.js, NestJS, Express.js, REST APIs, JWT
  ✓  PostgreSQL, MongoDB, Redis

  ──────────────────────────────────────────────────────────
  ARCHITECTURE & AI
  ──────────────────────────────────────────────────────────
  ★  Multi-Tenant SaaS Architecture & Tenant Isolation
  ★  ERP Integration (Odoo ERP)
  ★  AI Applications (OpenAI API, RAG Architecture)
  ★  Client/Server Workload Distribution (Electron.js)

  ──────────────────────────────────────────────────────────
  INFRASTRUCTURE & TOOLS
  ──────────────────────────────────────────────────────────
  ✓  Docker, Cloudinary, Git/GitHub, Vercel
`;

const ABOUT_CONTENT = `
  ╔══════════════════════════════════════════════════════════╗
  ║       HI, I'M FARHAN CC 👋                               ║
  ╚══════════════════════════════════════════════════════════╝

  Welcome to my portfolio!
  Built as a Windows XP desktop simulation to demonstrate
  product craftsmanship and interactive system design.

  ──────────────────────────────────────────────────────────
  WHAT I BUILD
  ──────────────────────────────────────────────────────────
  Full Stack Developer building real software products:

  → Multi-Tenant SaaS Architecture (Subdomains, Isolation)
  → Enterprise ERP Integrations (Odoo ERP, POS, CRM, Inventory)
  → Modern AI Systems (OpenAI API, RAG Knowledge Retrieval)
  → Hybrid Desktop/Cloud Architectures (Electron CPU Offloading)

  Open for Full Stack & Next.js engineering opportunities!
`;

const CONTACT_CONTENT = `
  ╔══════════════════════════════════════════════════════════╗
  ║          CONTACT FARHAN CC                               ║
  ╚══════════════════════════════════════════════════════════╝

  📧  farhancc123@gmail.com
  📞  +91 9961157999
  🐙  github.com/farhancc
  💼  linkedin.com/in/farhan-cc

  ──────────────────────────────────────────────────────────
  OPEN TO
  ──────────────────────────────────────────────────────────
  ✓  Full-Time Full Stack / Next.js Developer roles
  ✓  SaaS & Product Architecture Consulting
  ✓  Freelance Contracts & Open Source Collaboration

  Let's build something great! 🚀
`;

const MY_COMPUTER_CONTENT = `
  ╔══════════════════════════════════════════════════════════╗
  ║      MY COMPUTER — System Properties                     ║
  ╚══════════════════════════════════════════════════════════╝

  System  : Windows XP Professional
  Build   : Farhan CC Portfolio (2026)

  ──────────────────────────────────────────────────────────
  PROCESSOR & STACK
  ──────────────────────────────────────────────────────────
  Model  : Next.js + TypeScript + Node.js @ 3.0 GHz
  Cores  : 8 Cores (Multi-Tenancy, AI/RAG, Odoo ERP)

  ──────────────────────────────────────────────────────────
  NETWORK STATUS
  ──────────────────────────────────────────────────────────
  Status : Online — Open for hire
  Ping   : farhancc123@gmail.com

  ──────────────────────────────────────────────────────────
  REGISTERED TO
  ──────────────────────────────────────────────────────────
  Name   : Farhan CC
  Role   : Full Stack / Next.js Developer
`;

const PROJECT_OVERVIEW_TXT = `
  ╔══════════════════════════════════════════════════════════╗
  ║            PROJECT PORTFOLIO OVERVIEW                    ║
  ╚══════════════════════════════════════════════════════════╝

  This folder contains the complete project catalog and technical
  architectural breakdowns for Farhan CC's engineering work.

  TECHNICAL THEMES & ARCHITECTURE:
  1. Multi-Tenant SaaS Architecture (Subdomains, Isolation, Billing)
  2. ERP & Business Workflows (Odoo ERP Integration, CRM, POS)
  3. Modern AI Systems (OpenAI API, RAG Context Retrieval)
  4. Hybrid Desktop/Cloud Systems (Electron.js CPU Offloading)

  PROJECT FILES IN THIS DIRECTORY:
  • 01_Sales_Intelligence.txt  → Multi-Tenant SaaS + Odoo + AI Copilot
  • 02_Careva_Spa_ERP.txt      → Multi-Tenant Salon ERP + Subdomains
  • 03_IDexo_SaaS.txt          → Variable Data Printing + Electron
  • 04_Sedeer_Portal.txt       → Next.js + Odoo Customer Commerce
  • 05_Pets_Colony.txt         → Peer-to-Peer Marketplace
  • 06_NikahRoots.txt          → Matrimonial Matchmaking Platform
  • 07_Olo_Rental.txt          → Rental Booking Platform
  • 08_Kiyano_Ice_Cream.txt    → Brand Frontend Site
`;

const SALESINTEL_TXT = `
  ╔══════════════════════════════════════════════════════════╗
  ║           SALES INTELLIGENCE PLATFORM                    ║
  ╚══════════════════════════════════════════════════════════╝

  Category : Multi-Tenant SaaS / AI / Business Intelligence
  Live     : https://salesintel-frontend.zbeanztech.com/login

  OVERVIEW:
  A multi-tenant SaaS platform that connects organizations to their
  Odoo ERP and transforms raw business data into actionable sales
  intelligence, customer insights, and product analytics.

  CORE FEATURES:
  • Multi-tenant SaaS architecture with full Odoo ERP integration
  • Centralized sales dashboards & analytics telemetry
  • Customer & Product intelligence insights
  • AI Sales Copilot for decision support

  AI & RAG ARCHITECTURE:
  Odoo ERP Data → Data Processing → Company Knowledge Layer 
  → RAG (Retrieval-Augmented Generation) → OpenAI API → Contextual Sales Copilot

  TECHNOLOGIES:
  Next.js, React.js, TypeScript, Node.js, Odoo ERP, OpenAI API, RAG, REST APIs
`;

const CAREVA_TXT = `
  ╔══════════════════════════════════════════════════════════╗
  ║               CAREVA — SALON & SPA ERP                   ║
  ╚══════════════════════════════════════════════════════════╝

  Category : Multi-Tenant SaaS / ERP
  Live     : https://spa-erp-gamma.vercel.app/
  GitHub   : https://github.com/farhancc/spa-erp

  OVERVIEW:
  Careva is a comprehensive multi-tenant ERP platform built for salons
  and spas, integrating operations, scheduling, POS, and customer CRM.

  CORE MODULES:
  • POS & Inventory Management
  • Sales & CRM workflows
  • Appointment Booking & Staff Calendar
  • WhatsApp CRM & Appointment Reminders
  • Tenant-specific wildcard subdomain support (tenant.example.com)

  TECHNOLOGIES:
  Next.js, NestJS, TypeScript, PostgreSQL, Cloudinary
`;

const IDEXO_TXT = `
  ╔══════════════════════════════════════════════════════════╗
  ║      IDEXO — VARIABLE DATA PRINTING SAAS                 ║
  ╚══════════════════════════════════════════════════════════╝

  Category : SaaS / Document Processing / Electron / Automation
  Live     : https://idexocards.vercel.app/
  GitHub   : https://github.com/farhancc/student-idcard-system

  OVERVIEW:
  IDexo is a multi-tenant variable data printing SaaS designed to automate
  large-scale personalized ID card creation.

  HYBRID ARCHITECTURE:
  Combines a cloud-based Next.js SaaS app with a native Electron.js desktop
  application to offload CPU-intensive high-resolution PDF rendering from
  cloud servers to client machines.

  KEY FEATURES:
  • Credit-based billing & bulk Excel data import
  • Dynamic template engine & placeholder field mapping
  • Separate Approval PDF and high-res Production PDF workflows

  TECHNOLOGIES:
  Next.js, Node.js, TypeScript, Electron.js, Cloudinary
`;

const SEDEER_TXT = `
  ╔══════════════════════════════════════════════════════════╗
  ║               SEDEER CUSTOMER PORTAL                     ║
  ╚══════════════════════════════════════════════════════════╝

  Category : E-Commerce / Customer Portal / ERP Integration
  Live     : http://portal.sedeer.com/

  OVERVIEW:
  Customer-facing commerce portal built with Next.js and integrated with
  Odoo ERP as the backend engine for live product data and commerce workflows.

  TECHNOLOGIES:
  Next.js, React.js, TypeScript, Odoo ERP, REST/API integration
`;

const PETSCOLONY_TXT = `
  ╔══════════════════════════════════════════════════════════╗
  ║                   PETS COLONY                            ║
  ╚══════════════════════════════════════════════════════════╝

  Category : Peer-to-Peer Marketplace
  Live     : https://www.petscolony.in/
  GitHub   : https://github.com/farhancc/keralapetsandplants

  OVERVIEW:
  Peer-to-peer marketplace platform connecting pet owners and buyers
  through searchable pet listings and customer-facing discovery workflows.
`;

const NIKAHROOTS_TXT = `
  ╔══════════════════════════════════════════════════════════╗
  ║                   NIKAHROOTS                             ║
  ╚══════════════════════════════════════════════════════════╝

  Category : Matrimonial / Social Platform
  Live     : https://www.nikahroots.in/en/home
  GitHub   : https://github.com/farhancc/MatchMaking

  OVERVIEW:
  Community matrimonial matchmaking platform featuring profile discovery,
  user management, and matchmaking workflows.
`;

const OLORENTAL_TXT = `
  ╔══════════════════════════════════════════════════════════╗
  ║                   OLO RENTAL                             ║
  ╚══════════════════════════════════════════════════════════╝

  Category : Rental Platform
  Live     : https://olorental.com/

  OVERVIEW:
  Rental booking application featuring product showcase, availability,
  and reservation workflows.
`;

const KIYANO_TXT = `
  ╔══════════════════════════════════════════════════════════╗
  ║              KIYANO ICE CREAM                            ║
  ╚══════════════════════════════════════════════════════════╝

  Category : Brand / Marketing Website
  Live     : https://kiyanoicecream.com/
  GitHub   : https://github.com/farhancc/ICECREAMCOMPANYLANDING-

  OVERVIEW:
  Responsive brand website designed with modern UI presentation, fluid
  animations, and product-focused user experience.
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

  // ── Projects Folder ─────────────────────────────────────────────────────────
  projects: {
    id: 'projects', name: 'Projects', type: 'folder', icon: icons.folder,
    children: [
      'proj-readme-txt',
      'proj-salesintel-txt', 'salesintel-live',
      'proj-careva-txt', 'spa-erp-live', 'spa-erp-github', 
      'proj-idexo-txt', 'idexo-live', 'idexo-github', 
      'proj-sedeer-txt', 'sedeer-live',
      'proj-petscolony-txt', 'petscolony-live', 'petscolony-github', 
      'proj-nikahroots-txt', 'nikahroots-live', 'nikahroots-github', 
      'proj-olorental-txt', 'olorental-live',
      'proj-kiyano-txt', 'kiyano-live', 'kiyano-github',
    ],
  },
  'proj-readme-txt': {
    id: 'proj-readme-txt', name: '00_Project_Overview.txt', type: 'shortcut',
    content: PROJECT_OVERVIEW_TXT, openBehavior: 'internal', icon: icons.txt,
  },
  'proj-salesintel-txt': {
    id: 'proj-salesintel-txt', name: '01_Sales_Intelligence.txt', type: 'shortcut',
    content: SALESINTEL_TXT, openBehavior: 'internal', icon: icons.txt,
  },
  'salesintel-live': {
    id: 'salesintel-live', name: 'Sales Intelligence — Live.lnk', type: 'project',
    content: 'https://salesintel-frontend.zbeanztech.com/login', openBehavior: 'external', icon: icons.liveLink,
  },
  'proj-careva-txt': {
    id: 'proj-careva-txt', name: '02_Careva_Spa_ERP.txt', type: 'shortcut',
    content: CAREVA_TXT, openBehavior: 'internal', icon: icons.txt,
  },
  'spa-erp-live': {
    id: 'spa-erp-live', name: 'Careva Spa ERP — Live.lnk', type: 'project',
    content: 'https://spa-erp-gamma.vercel.app/', openBehavior: 'external', icon: icons.liveLink,
  },
  'spa-erp-github': {
    id: 'spa-erp-github', name: 'Careva Spa ERP — GitHub.lnk', type: 'shortcut',
    content: 'https://github.com/farhancc/spa-erp', openBehavior: 'external', icon: icons.github,
  },
  'proj-idexo-txt': {
    id: 'proj-idexo-txt', name: '03_IDexo_Printing_SaaS.txt', type: 'shortcut',
    content: IDEXO_TXT, openBehavior: 'internal', icon: icons.txt,
  },
  'idexo-live': {
    id: 'idexo-live', name: 'IDexo Cards — Live.lnk', type: 'project',
    content: 'https://idexocards.vercel.app/', openBehavior: 'external', icon: icons.liveLink,
  },
  'idexo-github': {
    id: 'idexo-github', name: 'Student ID Card System — GitHub.lnk', type: 'shortcut',
    content: 'https://github.com/farhancc/student-idcard-system', openBehavior: 'external', icon: icons.github,
  },
  'proj-sedeer-txt': {
    id: 'proj-sedeer-txt', name: '04_Sedeer_Portal.txt', type: 'shortcut',
    content: SEDEER_TXT, openBehavior: 'internal', icon: icons.txt,
  },
  'sedeer-live': {
    id: 'sedeer-live', name: 'Sedeer Portal — Live.lnk', type: 'project',
    content: 'http://portal.sedeer.com/', openBehavior: 'external', icon: icons.liveLink,
  },
  'proj-petscolony-txt': {
    id: 'proj-petscolony-txt', name: '05_Pets_Colony.txt', type: 'shortcut',
    content: PETSCOLONY_TXT, openBehavior: 'internal', icon: icons.txt,
  },
  'petscolony-live': {
    id: 'petscolony-live', name: 'Pets Colony — Live.lnk', type: 'project',
    content: 'https://www.petscolony.in/', openBehavior: 'external', icon: icons.liveLink,
  },
  'petscolony-github': {
    id: 'petscolony-github', name: 'Pets Colony — GitHub.lnk', type: 'shortcut',
    content: 'https://github.com/farhancc/keralapetsandplants', openBehavior: 'external', icon: icons.github,
  },
  'proj-nikahroots-txt': {
    id: 'proj-nikahroots-txt', name: '06_NikahRoots.txt', type: 'shortcut',
    content: NIKAHROOTS_TXT, openBehavior: 'internal', icon: icons.txt,
  },
  'nikahroots-live': {
    id: 'nikahroots-live', name: 'NikahRoots — Live.lnk', type: 'project',
    content: 'https://www.nikahroots.in/en/home', openBehavior: 'external', icon: icons.liveLink,
  },
  'nikahroots-github': {
    id: 'nikahroots-github', name: 'NikahRoots Matchmaking — GitHub.lnk', type: 'shortcut',
    content: 'https://github.com/farhancc/MatchMaking', openBehavior: 'external', icon: icons.github,
  },
  'proj-olorental-txt': {
    id: 'proj-olorental-txt', name: '07_Olo_Rental.txt', type: 'shortcut',
    content: OLORENTAL_TXT, openBehavior: 'internal', icon: icons.txt,
  },
  'olorental-live': {
    id: 'olorental-live', name: 'Olo Rental — Live.lnk', type: 'project',
    content: 'https://olorental.com/', openBehavior: 'external', icon: icons.liveLink,
  },
  'proj-kiyano-txt': {
    id: 'proj-kiyano-txt', name: '08_Kiyano_Ice_Cream.txt', type: 'shortcut',
    content: KIYANO_TXT, openBehavior: 'internal', icon: icons.txt,
  },
  'kiyano-live': {
    id: 'kiyano-live', name: 'Kiyano Ice Cream — Live.lnk', type: 'project',
    content: 'https://kiyanoicecream.com/', openBehavior: 'external', icon: icons.liveLink,
  },
  'kiyano-github': {
    id: 'kiyano-github', name: 'Kiyano Ice Cream — GitHub.lnk', type: 'shortcut',
    content: 'https://github.com/farhancc/ICECREAMCOMPANYLANDING-', openBehavior: 'external', icon: icons.github,
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
    content: '/Farhan%20cc%20Next%20js%20Developer.pdf', openBehavior: 'external', icon: icons.cvDownload,
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
