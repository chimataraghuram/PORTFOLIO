import { Project, Qualification, Skill, ServiceCard } from './types';

export const SOCIAL_LINKS = {
  github: "https://github.com/chimataraghuram",
  linkedin: "https://www.linkedin.com/in/chimataraghuram/",
  leetcode: "https://leetcode.com/u/chimataraghuram/",
  telegram: "https://t.me/TechBoyStore",
  linktree: "https://linktr.ee/chimataraghuram",
  techboyStore: "https://techboy-store.vercel.app/",
  techboyAi: "https://chimataraghuram.github.io/TECHBOY-AI/",
  projectFinder: "https://chimataraghuram.github.io/PROJECT-FINDER/",
  examMonitor: "https://github.com/chimataraghuram/Development-of-Smart-Examination-Monitoring-platform-with-Integrity-Analysis-Reporting-System.git",
  resume: "/resume.pdf", // Add your actual resume.pdf to frontend/public/ folder
  email: "chimataraghuram02a@gmail.com",
  portfolioRepo: "https://github.com/chimataraghuram/PORTFOLIO.git",
  phone: "", // Add if needed
  location: "Chirala Mandal, Andhra Pradesh, India"
};

export const ABOUT_DATA = {
  name: "Chimata Raghuram",
  role: "Python Full Stack Developer | ACTIVELY LEARNER | Tech Enthusiast",
  description: "I'm an AI & ML student on a mission to create AI solutions that genuinely make a difference! Currently diving deep into my BTech studies at SRK Institute in Vijayawada, I'm cultivating strong foundations to build cutting-edge technology. With a completion of a 3-year diploma in AI & ML and an internship in Python Full Stack development, I blend creativity with analytical thinking to ensure innovation meets real-world needs.",
  stats: [
    { label: "Aggregate CGPA", value: "8.00+" },
    { label: "Real World Projects", value: "04" },
    { label: "Github Contributions", value: "...", key: "github" }
  ]
};

export const ABOUT_CARDS_DATA: ServiceCard[] = [
  {
    id: 1,
    title: "AI & ML Innovation",
    icon: "brain",
    description: "Developing intelligent models and data-driven solutions for real-world problems."
  },
  {
    id: 2,
    title: "Full Stack Dev",
    icon: "code",
    description: "Building responsive, scalable web applications using Django and React ecosystems."
  },
  {
    id: 3,
    title: "Cloud & DevOps",
    icon: "cloud",
    description: "Deploying and managing applications on AWS with efficient CI/CD practices."
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: "Python", level: 90, category: "Language" },
  { name: "JavaScript", level: 80, category: "Language" },
  { name: "Django", level: 85, category: "Backend" },
  { name: "FastAPI", level: 85, category: "Backend" },
  { name: "Flask", level: 80, category: "Backend" },
  { name: "React", level: 75, category: "Frontend" },
  { name: "HTML & CSS", level: 90, category: "Frontend" },
  { name: "AWS", level: 70, category: "Tool" },
  { name: "Git", level: 85, category: "Tool" },
  { name: "GitHub", level: 85, category: "Tool" },
  { name: "n8n", level: 75, category: "Tool" },
  { name: "Docker", level: 70, category: "Tool" },
  { name: "MySQL", level: 80, category: "Backend" },
  { name: "MongoDB", level: 75, category: "Backend" },
  { name: "SQLite", level: 80, category: "Backend" },
  { name: "OpenCV", level: 75, category: "Core" },
  { name: "AI Tools", level: 80, category: "Core" },
  { name: "Artificial Intelligence", level: 80, category: "Core" },
  { name: "OpenClaw", level: 65, category: "Core" },
  { name: "Nano Claw", level: 65, category: "Core" },
  { name: "Google AI Studio", level: 80, category: "Tool" },
  { name: "Antigravity", level: 85, category: "Tool" },
  { name: "Claude Code", level: 80, category: "Tool" },
  { name: "Codex", level: 80, category: "Tool" },
  { name: "Cursor", level: 85, category: "Tool" },
];

export const QUALIFICATIONS_DATA: Qualification[] = [
  {
    id: 1,
    title: "AI Software Developer Intern",
    subtitle: "Jaimini Group",
    date: "Jul 2026 – Present",
    type: "Experience",
    description: "• Owned end-to-end backend development for NQAS.ai, an AI-powered healthcare quality assessment platform, integrating six AI modules from architecture through deployment.\n• Conducted backend and API testing, managed GitHub deployment, and tracked tasks in Jira while collaborating with cross-functional teams.",
    certificateUrl: "https://lnkd.in/p/gvHBMXV9",
    linkedinUrl: "https://lnkd.in/p/gvHBMXV9",
    buttonText: "View Offer Letter",
    color: "#a855f7", // Purple / AI
    badge: "Stipend",
    statusBadge: "Active",
    locationType: "Remote",
    tags: ["Python", "FastAPI", "Healthcare AI"]
  },
  {
    id: 2,
    title: "Python Backend Intern",
    subtitle: "Infosys Springboard 7.0",
    date: "Jun 2026 – Sep 2026",
    type: "Experience",
    description: "• Built OpenCV-based face and tab-switch monitoring with integrity scoring for ExamMonitor in an Agile team using Python, Flask, and SQLite.\n• Wrote unit tests, tracked defects, and maintained Agile documentation (sprint backlog, retrospectives) under mentor guidance.",
    certificateUrl: "https://lnkd.in/p/d_AKZEqN",
    linkedinUrl: "https://lnkd.in/p/d_AKZEqN",
    buttonText: "View Certificate",
    color: "#06b6d4", // Cyan / Infosys Blue
    badge: "Infosys",
    statusBadge: "Completed",
    locationType: "Remote",
    tags: ["OpenCV", "Flask", "SQLite"]
  },
  {
    id: 3,
    title: "Cloud Computing Intern",
    subtitle: "APSSDC",
    date: "May 2025 – Jul 2025",
    type: "Experience",
    description: "• Deployed web applications on AWS EC2 with Nginx, security groups, HTTPS, and automated CI/CD deployment pipelines.\n• Worked hands-on with EC2, S3, IAM, and AWS Lambda, exploring serverless cloud architecture, resource scaling, and real-time monitoring.\n• Built an end-to-end cloud automation mini-project demonstrating complete AWS infrastructure workflows.",
    certificateUrl: "https://lnkd.in/p/gfiuZCYZ",
    linkedinUrl: "https://lnkd.in/p/gfiuZCYZ",
    buttonText: "View Certificate",
    color: "#ff9900", // AWS Orange
    badge: "AWS",
    statusBadge: "Completed",
    locationType: "Remote",
    tags: ["AWS", "EC2", "S3", "Lambda", "Nginx"]
  },
  {
    id: 4,
    title: "B-Tech in AI & ML",
    subtitle: "SRK Institute of Technology, Vijayawada",
    date: "2024 - 2027",
    type: "Education",
    description: "Core subjects: AI, ML, Software Engineering, Python, DSA, DBMS.",
    progress: 95,
    color: "#0ea5e9" // Sky Blue
  },
  {
    id: 5,
    title: "Diploma in AI & ML",
    subtitle: "St. Mary's Group of Institutions, Guntur",
    date: "2021 - 2024",
    type: "Education",
    description: "Completed with 78.68%. Strong practical skills in programming.",
    progress: 100,
    color: "#8b5cf6" // Violet
  },
  {
    id: 6,
    title: "SSC",
    subtitle: "Vignana Bharathi High School",
    date: "2021",
    type: "Education",
    description: "Scored 100%. First place in English writing skills.",
    progress: 100,
    color: "#64748b" // Slate
  }
];

export const PROJECTS_DATA: Project[] = [

  {
    id: 99,
    title: "PROJECT FINDER (Full-Stack)",
    description: "• Unified discovery engine across GitHub, HuggingFace, Kaggle & LinkedIn with live API proxy backend\n• OpenRouter + Gemini AI for real-time architectural reviews of any discovered project\n• Comparison Studio for side-by-side repository evaluation with platform-native cards",
    image: "/project-screenshots/project-finder.png",
    githubUrl: "https://github.com/chimataraghuram/PROJECT-FINDER.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_fullstack-react-nodejs-ugcPost-7442366443100200960-JC5I?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    liveUrl: "https://chimataraghuram.github.io/PROJECT-FINDER/",
    tags: ["React", "TypeScript", "MongoDB", "GitHub API", "Render"],
    isNew: true,
    color: "#f97316", // Orange
    caseStudy: {
      problem: [
        "Developers waste hours switching between GitHub, Hugging Face, Kaggle and LinkedIn to discover projects, AI models and datasets relevant to their work.",
        "Existing platforms are siloed — no single place combines multi-platform discovery with intelligent AI-powered project analysis and comparison."
      ],
      architecture: [
        "Frontend: React 19 with TypeScript and Framer Motion — platform-native UI cards for GitHub, HuggingFace, Kaggle and LinkedIn with intent-based search triggering.",
        "Backend/Data: Node.js Express API proxy connecting GitHub REST API, HuggingFace, Kaggle and LinkedIn — returns real-time repo data, stars, model specs and dataset details.",
        "Database: MongoDB for storing search history, saved projects and user preferences — connected via Mongoose with scalable schema design.",
        "Hosting: Frontend on GitHub Pages, backend API proxy on Render with zero-downtime continuous deployment."
      ],
      impact: [
        "Built a multi-platform developer research engine that searches across 4 platforms simultaneously — replacing hours of manual discovery with seconds of intelligent search",
        "Integrated OpenRouter + Gemini AI to deliver real-time architectural reviews and Comparison Studio — giving developers instant technical analysis of any discovered project"
      ]
    }
  },
  {
    id: 100,
    title: "TECHBOY STORE",
    description: "• Smartphone intelligence platform for price tracking, comparison & smart recommendations\n• n8n automated email alerts when prices drop to user's target price\n• Built with React, Django REST, PostgreSQL, Firebase Auth & Google OAuth",
    image: "/project-screenshots/techboy-store.jpg",
    githubUrl: "https://github.com/chimataraghuram/TECHBOY-STORE.git",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
    liveUrl: "https://techboy-store.vercel.app/",
    tags: ["Smartphone", "Price Tracking", "Automation"],
    isLive: true,
    color: "#ef4444", // Red
    caseStudy: {
      problem: [
        "Tech enthusiasts waste hours watching YouTube reviews and manually comparing specs before buying a smartphone. Existing platforms are either generic or overwhelming.",
        "TechBoy Store solves this by becoming a smart smartphone advisor — users get intelligent recommendations, price tracking and automated alerts in one platform."
      ],
      architecture: [
        "Frontend: React 19, Vite, Tailwind CSS and Framer Motion — dark-themed glassmorphism UI with smooth animations and fully responsive design across all devices.",
        "State Management: Firebase Authentication with Google OAuth for user sessions — wishlist, price alerts and comparison data persisted per user in PostgreSQL via Django REST Framework.",
        "Backend Architecture: Django REST Framework with PostgreSQL — scalable data models for smartphones, price history, user watchlists and alert configurations with n8n webhook integration.",
        "Design System: Futuristic cyberpunk aesthetic with red accent branding, Tailwind utilities and custom CSS — TechBoy Trends section with live price drops, new launches and trending devices.",
      ],
      impact: [
        "Built a fully functional smartphone intelligence platform with real price tracking, automated n8n email alerts and Google OAuth — shipped and live.",
        "Replaced manual research with intelligent discovery — users find best value phones across categories in seconds with comparison and wishlist features."
      ]
    }
  },
  {
    id: 101,
    title: "ExamMonitor (Infosys Springboard)",
    description: "• Smart examination monitoring platform with real-time integrity analysis & reporting system\n• Webcam-based face monitoring (absence & multiple faces) and browser tab-switch detection with OpenCV\n• Candidate & administrator analytics dashboards with automated integrity score calculation",
    image: "/project-screenshots/exam-monitor.jpg",
    githubUrl: "https://github.com/chimataraghuram/Development-of-Smart-Examination-Monitoring-platform-with-Integrity-Analysis-Reporting-System.git",
    linkedinUrl: "https://lnkd.in/p/g2NGCB-R",
    tags: ["Python", "Flask", "OpenCV", "SQLite", "AI/ML"],
    isNew: true,
    color: "#06b6d4", // Cyan / Infosys Cyan
    caseStudy: {
      problem: [
        "Online examinations are vulnerable to cheating, multi-person impersonation, and unauthorized tab-switching without reliable proctoring mechanisms.",
        "Institutions require lightweight, automated examination supervision with integrity auditing that does not demand heavy proprietary surveillance hardware."
      ],
      architecture: [
        "Computer Vision & Proctoring: OpenCV for continuous webcam feed analysis — tracks face presence, detects multiple faces, and calculates integrity penalties.",
        "Backend & Engine: Python Flask REST framework managing assessment sessions, secure authentication, live suspicious event logging, and candidate state machines.",
        "Storage & Audit Trail: SQLite with optimized relational tables storing detailed activity timelines, violations, and report generation datasets.",
        "Dashboard & Reporting: Interactive candidate and admin analytics portals displaying integrity score charts, suspicious incident logs, and exportable audit reports."
      ],
      impact: [
        "Engineered an automated examination supervision application with computer vision proctoring and comprehensive integrity analytics under Infosys Springboard 7.0.",
        "Collaborated across an Agile development team, delivering 3 major development milestones from authentication to computer vision and audit reporting."
      ]
    }
  },
  {
    id: 1,
    title: "AWS EC2 Web Deployment",
    description: "• Deployed static website on AWS EC2 Ubuntu Server via SSH and Apache2\n• Configured Security Groups, IAM roles and firewall rules for secure access\n• Gained hands-on Linux server administration and cloud deployment experience",
    image: "/project-screenshots/aws-ec2-deployment.png",
    githubUrl: "https://github.com/chimataraghuram/AWS-EC2-Website-Deployment-Using-Ubuntu-Apache2.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_aws-ec2-ubuntu-activity-7342920256123826177-2FuF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    tags: ["AWS", "EC2", "Ubuntu", "Apache2", "Cloud"],
    color: "#3b82f6", // Blue
    caseStudy: {
      problem: [
        "Deploying and managing static or dynamic websites on a scalable cloud infrastructure can be challenging without proper server configuration knowledge.",
        "Organizations need a reliable, cost-effective way to host web applications with high availability and security."
      ],
      architecture: [
        "Cloud Provider: Amazon Web Services (AWS)",
        "Compute: EC2 (Elastic Compute Cloud) running Ubuntu Linux.",
        "Web Server: Apache2 configured for optimal performance and secure HTTP access.",
        "Networking: Custom Security Groups to manage inbound HTTP/HTTPS and SSH traffic."
      ],
      impact: [
        "Successfully deployed a live website on AWS EC2 Ubuntu Server — configured end-to-end from instance launch to Apache2 setup via SSH.",
        "Demonstrated hands-on Linux server administration, Apache2 configuration, security groups and cloud deployment workflow."
      ]
    }
  },
];
