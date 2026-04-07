import { Project, Qualification, Skill, ServiceCard, Exploration } from './types';

export const SOCIAL_LINKS = {
  github: "https://github.com/chimataraghuram",
  linkedin: "https://www.linkedin.com/in/chimataraghuram/",
  telegram: "https://t.me/TechBoyStore",
  linktree: "https://linktr.ee/chimataraghuram",
  techboyStore: "https://chimataraghuram.github.io/TECHBOY-STORE/",
  techboyAi: "https://chimataraghuram.github.io/TECHBOY-AI/",
  resume: "#", // Add your actual resume URL here
  email: "chimataraghuram02a@gmail.com",
  portfolioRepo: "https://github.com/chimataraghuram/PORTFOLIO.git",
  phone: "", // Add if needed
  location: "Chirala Mandal, Andhra Pradesh, India"
};

export const ABOUT_DATA = {
  name: "Chimata Raghuram",
  role: "Python Full Stack Developer | AI Engineer | Tech Enthusiast",
  description: "I'm an AI & ML student on a mission to create AI solutions that genuinely make a difference! Currently diving deep into my BTech studies at SRK Institute in Vijayawada, I'm cultivating strong foundations to build cutting-edge technology. With a completion of a 3-year diploma in AI & ML and an internship in Python Full Stack development, I blend creativity with analytical thinking to ensure innovation meets real-world needs.",
  stats: [
    { label: "Real World Projects", value: "02" },
    { label: "Diploma Years", value: "03" },
    { label: "B-Tech Years", value: "03" }
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
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_aws-devops-cloudcomputing-activity-7359299490291306496-vwoG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw"
  },
  {
    id: 2,
    title: "Cloud Computing & DevOps Intern",
    subtitle: "APSSDC",
    date: "2 Months",
    type: "Experience",
    description: "Gained practical knowledge in AWS cloud services and deployment strategies.",
    certificate: "https://placehold.co/800x600/1e293b/FFF?text=APSSDC+Certificate",
    certificateUrl: "https://www.linkedin.com/posts/chimataraghuram_aws-devops-cloudcomputing-activity-7359299490291306496-vwoG?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/"
  },
  {
    id: 3,
    title: "AI & ML Intern",
    subtitle: "SmartBridge",
    date: "2 Months",
    type: "Experience",
    description: "Worked on real-world AI/ML problem statements.",
    certificate: "https://placehold.co/800x600/1e293b/FFF?text=SmartBridge+Certificate",
    certificateUrl: "https://www.linkedin.com/posts/chimataraghuram_artificialintelligence-machinelearning-python-activity-7360198142677430274-HiuD?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/"
  },
  {
    id: 11,
    title: "Google Cloud Generative AI",
    subtitle: "SmartBridge",
    date: "December 16, 2025 – February 20, 2026",
    type: "Experience",
    description: "Hands-on internship focused on Google Cloud's Generative AI technologies and applications.",
    certificate: "https://placehold.co/800x600/1e293b/FFF?text=Google+Cloud+GenAI+Certificate",
    certificateUrl: "https://www.linkedin.com/posts/chimataraghuram_generativeai-googlecloud-internship-share-7440777255003410432-xi8t?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_generativeai-googlecloud-internship-share-7440777255003410432-xi8t?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw"
  },
  {
    id: 4,
    title: "B-Tech in AI & ML",
    subtitle: "SRK Institute of Technology, Vijayawada",
    date: "2024 - 2027 (Pursuing)",
    type: "Education",
    description: "Core subjects: AI, ML, Software Engineering, Python, DSA, DBMS.",
    progress: 80
  },
  {
    id: 5,
    title: "Diploma in AI & ML",
    subtitle: "St. Mary's Group of Institutions, Guntur",
    date: "2021 - 2024",
    type: "Education",
    description: "Completed with 78.68%. Strong practical skills in programming.",
    progress: 100
  },
  {
    id: 6,
    title: "SSC",
    subtitle: "Vignana Bharathi High School",
    date: "Completed 2021",
    type: "Education",
    description: "Scored 100%. First place in English writing skills.",
    progress: 100
  }
];

export const PROJECTS_DATA: Project[] = [

  {
    id: 99,
    title: "PROJECT FINDER",
    description: "An innovative tool to help developers discover and explore widely available projects.",
    image: "/project-finder.png",
    githubUrl: "https://github.com/chimataraghuram/PROJECT-FINDER.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_fullstack-react-nodejs-ugcPost-7442366443100200960-JC5I?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    liveUrl: "https://chimataraghuram.github.io/PROJECT-FINDER/",
    tags: ["React", "Search", "Tool"],
    isNew: true,
    color: "#f97316" // Orange
  },
  {
    id: 100,
    title: "TECHBOY STORE",
    description: "Your ultimate destination for tech gadgets, accessories, and exclusive gear. Powered by passion for technology.",
    image: "/techboy-store.jpg",
    githubUrl: "https://github.com/chimataraghuram/TECHBOY-STORE.git",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
    liveUrl: "https://chimataraghuram.github.io/TECHBOY-STORE/",
    tags: ["E-commerce", "Store", "Gadgets"],
    isComingSoon: true,
    color: "#ef4444" // Red
  },
  {
    id: 1,
    title: "Virtual Windows Desktop on AWS",
    description: "Setup and configuration of a virtual Windows desktop on AWS using EC2 Windows Server instances.",
    image: "/aws-desktop-final.jpg",
    githubUrl: "https://github.com/chimataraghuram/Virtual-Windows-Desktop-on-AWS-Using-Windows-Server.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_aws-windowsserver-miniproject-activity-7332458130729013248-I3g4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    tags: ["AWS", "EC2", "Cloud"],
    color: "#3b82f6" // Blue
  },
];


export const EXPLORATIONS_DATA: Exploration[] = [
  {
    id: 1,
    title: "Running Local LLMs with Ollama",
    description: "Dive into local AI engineering! I explored using Ollama to run, manage, and interact with large language models directly on my machine, bypassing cloud dependencies.",
    image: "/ollama-exploration.jpg",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_ollama-localllm-aiengineering-activity-7421509833641734144-A-YW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    tags: ["AI Engineering", "Ollama", "Local LLM"],
    color: "#38bdf8"
  },
  {
    id: 2,
    title: "Reviving Tech with ChromeOS Flex",
    description: "Explored ChromeOS Flex to breathe new life into older hardware. A seamless dive into the Google ecosystem, testing performance, stability, and the clean 'Aluminium OS' experience.",
    image: "/chromeos-flex.jpg",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_chromeosflex-aluminiumos-googleecosystem-activity-7416354901347213312-VIWr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    tags: ["ChromeOS Flex", "OS Exploration", "Google"],
    color: "#4285F4"
  },
  {
    id: 3,
    title: "Vibe Coding & Automation",
    description: "Exploring the 'Vibe Coding' trend and leveraging Google's automation tools to streamline workflows and enhance developer productivity.",
    image: "/vibe-coding.jpg",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_automation-vibecoding-google-activity-7410677263437889537-1ga_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    tags: ["Automation", "Vibe Coding", "Google"],
    color: "#EA4335"
  }
];

