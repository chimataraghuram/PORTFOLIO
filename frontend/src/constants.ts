import { Project, Qualification, Skill, ServiceCard } from './types';

export const SOCIAL_LINKS = {
  github: "https://github.com/chimataraghuram",
  linkedin: "https://www.linkedin.com/in/chimataraghuram/",
  telegram: "https://t.me/TechBoyStore",
  linktree: "https://linktr.ee/chimataraghuram",
  techboyStore: "https://techboy-store.vercel.app/",
  techboyAi: "https://chimataraghuram.github.io/TECHBOY-AI/",
  projectFinder: "https://chimataraghuram.github.io/PROJECT-FINDER/",
  resume: "#", // Add your actual resume URL here
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
    { label: "Real World Projects", value: "02" },
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
  { name: "React", level: 75, category: "Frontend" },
  { name: "HTML & CSS", level: 90, category: "Frontend" },
  { name: "AWS", level: 70, category: "Tool" },
  { name: "Git", level: 85, category: "Tool" },
  { name: "GitHub", level: 85, category: "Tool" },
  { name: "n8n", level: 75, category: "Tool" },
  { name: "Docker", level: 70, category: "Tool" },
  { name: "MySQL", level: 80, category: "Backend" },
  { name: "MongoDB", level: 75, category: "Backend" },
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
    title: "Python Full Stack Developer Intern",
    subtitle: "Nipuna Technologies",
    date: "2024 (6 Months)",
    type: "Experience",
    description: "Hands-on experience developing full-fledged websites using Python and Django.",
    certificate: "https://placehold.co/800x600/1e293b/FFF?text=Certificate+Preview", // REPLACE with your actual certificate image URL
    certificateUrl: "https://www.linkedin.com/posts/chimataraghuram_python-full-stack-internship-completion-activity-7251078220253417472-x75K?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_aws-devops-cloudcomputing-activity-7359299490291306496-vwoG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    color: "#10b981" // Emerald Green (Python/Django)
  },
  {
    id: 2,
    title: "AWS Cloud Computing & DevOps Intern",
    subtitle: "APSSDC",
    date: "2 Months",
    type: "Experience",
    description: "Gained practical knowledge in AWS cloud services and deployment strategies.",
    certificate: "https://placehold.co/800x600/1e293b/FFF?text=APSSDC+Certificate",
    certificateUrl: "https://www.linkedin.com/posts/chimataraghuram_aws-devops-cloudcomputing-activity-7359299490291306496-vwoG?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
    color: "#ff9900" // AWS Orange
  },
  {
    id: 3,
    title: "AI & Machine Learning Internship",
    subtitle: "Smartbridge",
    date: "Jun 2025 - Jul 2025 (2 Months)",
    type: "Experience",
    description: "• Developed and trained machine learning models using Python on real-world datasets.\n• Applied data preprocessing, model evaluation and deployment techniques across multiple projects.\n• Integrated AI solutions into practical applications under Google for Developers — India Edu Program.\n• Gained hands-on exposure to end-to-end AI workflow from data handling to model deployment.",
    certificate: "https://placehold.co/800x600/1e293b/FFF?text=Smartbridge+Certificate",
    certificateUrl: "https://www.linkedin.com/posts/chimataraghuram_artificialintelligence-machinelearning-python-activity-7360198142677430274-HiuD?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
    color: "#6366f1" // AI/ML Indigo
  },
  {
    id: 4,
    title: "B-Tech in AI & ML",
    subtitle: "SRK Institute of Technology, Vijayawada",
    date: "2024 - 2027",
    type: "Education",
    description: "Core subjects: AI, ML, Software Engineering, Python, DSA, DBMS.",
    progress: 80,
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
    description: "• Full-stack web app to discover dev projects\n• Built with React, TypeScript & MongoDB\n• Real-time GitHub API integration\n• Secure authentication and custom user profiles\n• Deployed on Render for reliable cloud hosting\n• Features advanced search and filtering capabilities\n• Dynamic and intuitive user dashboard\n• Built with scalable and maintainable architecture",
    image: "/project-screenshots/project-finder.png",
    githubUrl: "https://github.com/chimataraghuram/PROJECT-FINDER.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_fullstack-react-nodejs-ugcPost-7442366443100200960-JC5I?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    liveUrl: "https://chimataraghuram.github.io/PROJECT-FINDER/",
    tags: ["React", "TypeScript", "MongoDB", "GitHub API", "Render"],
    isNew: true,
    color: "#f97316", // Orange
    caseStudy: {
      problem: [
        "Developers often struggle to find open-source projects that match their specific skill sets and interests.",
        "Existing platforms lack a centralized, easy-to-filter hub for discovering development projects with real-time GitHub integration."
      ],
      architecture: [
        "Frontend: Built with React and TypeScript for a type-safe, dynamic user interface.",
        "Backend/Data: Integrates directly with GitHub REST APIs to fetch real-time repository data, stars, and language stats.",
        "Database: Uses MongoDB to store user profiles, saved projects, and custom application state.",
        "Hosting: Fully deployed and continuously integrated via Render."
      ],
      impact: [
        "Created a seamless, visually stunning platform that drastically reduces the time it takes for a developer to find a matching project.",
        "Demonstrated full-stack capability by successfully linking external OAuth/APIs with a custom MongoDB backend."
      ]
    }
  },
  {
    id: 100,
    title: "TECHBOY STORE",
    description: "• Premium e-commerce platform for tech gadgets\n• Sleek, modern UI with dark-theme glassmorphism\n• Seamless shopping with robust product catalogs\n• Integrated secure session management and cart state\n• Optimized animations for interactive user experience\n• Fully responsive design across all mobile devices\n• Engineered with React and optimized Tailwind CSS\n• High-performance asset delivery and lazy loading",
    image: "/project-screenshots/techboy-store.jpg",
    githubUrl: "https://github.com/chimataraghuram/TECHBOY-STORE.git",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
    liveUrl: "https://techboy-store.vercel.app/",
    tags: ["E-commerce", "Store", "Gadgets"],
    isComingSoon: true,
    color: "#ef4444", // Red
    caseStudy: {
      problem: [
        "Tech enthusiasts needed a modern, centralized e-commerce platform dedicated exclusively to premium gadgets and gear.",
        "Existing solutions felt generic and lacked the sleek, futuristic design aesthetic expected by high-end tech consumers."
      ],
      architecture: [
        "Frontend: Modern UI built with React, focusing on a dark-themed, glassmorphism design.",
        "State Management: Implementing robust state handling for the shopping cart and user sessions.",
        "Backend Architecture: Designing scalable data models for products, orders, and customer accounts.",
        "Design System: Custom CSS and Tailwind utilities to create a premium, immersive shopping experience."
      ],
      impact: [
        "Establishing a fully functional, highly visual e-commerce prototype that showcases end-to-end full-stack capabilities.",
        "Creating a highly engaging UI that keeps users browsing longer through micro-interactions and smooth animations."
      ]
    }
  },
  {
    id: 1,
    title: "AWS EC2 Web Deployment",
    description: "• Secure, scalable web deployment on AWS EC2\n• Uses Ubuntu & Apache2 for high performance\n• Focuses on infrastructure management & security\n• Custom VPC and Security Group configurations\n• Demonstrates best practices in cloud administration\n• Continuous monitoring and high availability\n• Automated remote server provisioning\n• Ensures strict firewall rules for HTTP/HTTPS",
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
        "Successfully deployed a reliable, highly available website utilizing AWS cloud infrastructure.",
        "Demonstrated proficiency in Linux server administration, Apache2 configuration, and cloud security best practices."
      ]
    }
  },
];

