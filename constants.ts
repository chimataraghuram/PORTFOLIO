import { Project, Qualification, Skill, ServiceCard } from './types';

export const SOCIAL_LINKS = {
  github: "https://github.com/chimataraghuram",
  linkedin: "https://www.linkedin.com/in/chimataraghuram/",
  telegram: "https://t.me/TechBoyStore",
  linktree: "https://linktr.ee/chimataraghuram",
  techboyStore: "https://chimataraghuram.github.io/TECHBOY-STORE/",
  email: "chimataraghuram02a@gmail.com",
  phone: "", // Add if needed
  location: "Chirala Mandal, Andhra Pradesh, India"
};

export const ABOUT_DATA = {
  name: "Chimata Raghuram",
  role: "Python Full Stack Developer | AI Engineer | Tech Enthusiast",
  description: "I'm an AI & ML student on a mission to create AI solutions that genuinely make a difference! Currently diving deep into my BTech studies at SRK Institute in Vijayawada, I'm cultivating strong foundations to build cutting-edge technology. With a completion of a 3-year diploma in AI & ML and an internship in Python Full Stack development, I blend creativity with analytical thinking to ensure innovation meets real-world needs.",
  stats: [
    { label: "Aggregate CGPA", value: "8.00+" },
    { label: "Projects Completed", value: "08+" },
    { label: "Internships", value: "05+" }
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
  { name: "Git & GitHub", level: 85, category: "Tool" },
  { name: "MySQL", level: 80, category: "Backend" },
  { name: "MongoDB", level: 75, category: "Backend" },
  { name: "AI Tools", level: 80, category: "Core" },
  { name: "Artificial Intelligence", level: 80, category: "Core" },
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
    id: 8,
    title: "AI-ML Virtual Internship",
    subtitle: "AICTE, EduSkills Foundation®",
    date: "July 2025 - September 2025",
    type: "Experience",
    description: "10-week virtual internship organized by AICTE and EduSkills Foundation.",
    certificate: "https://placehold.co/800x600/1e293b/FFF?text=AICTE+EduSkills+Certificate",
    certificateUrl: "https://www.linkedin.com/posts/chimataraghuram_ai-machinelearning-internship-activity-7375433968579649536-o-nu?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/"
  },

  {
    id: 10,
    title: "Data Analysis with LLMs Virtual Internship",
    subtitle: "AICTE, VOIS (Vodafone Intelligent Solutions)",
    date: "September 11, 2025 - October 8, 2025",
    type: "Experience",
    description: "Joint initiative facilitated by AICTE and VOIS focusing on Data Analysis with LLMs.",
    certificate: "https://placehold.co/800x600/1e293b/FFF?text=AICTE+VOIS+Certificate",
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
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/"
  },
  {
    id: 4,
    title: "B-Tech in AI & ML",
    subtitle: "SRK Institute of Technology, Vijayawada",
    date: "2024 - 2027 (Pursuing)",
    type: "Education",
    description: "Core subjects: AI, ML, Software Engineering, Python, DSA, DBMS."
  },
  {
    id: 5,
    title: "Diploma in AI & ML",
    subtitle: "St. Mary's Group of Institutions, Guntur",
    date: "2021 - 2024",
    type: "Education",
    description: "Completed with 78.68%. Strong practical skills in programming."
  },
  {
    id: 6,
    title: "SSC",
    subtitle: "Vignana Bharathi High School",
    date: "Completed 2021",
    type: "Education",
    description: "Scored 100%. First place in English writing skills."
  }
];

export const PROJECTS_DATA: Project[] = [

  {
    id: 100,
    title: "TECHBOY STORE",
    description: "Your ultimate destination for tech gadgets, accessories, and exclusive gear. Powered by passion for technology.",
    image: "/techboy-store.jpg",
    liveUrl: "https://chimataraghuram.github.io/TECHBOY-STORE/",
    tags: ["E-commerce", "Store", "Gadgets"],
    isComingSoon: true,
    color: "#f97316" // Orange
  },
  {
    id: 99,
    title: "PROJECT FINDER",
    description: "An innovative tool to help developers discover and explore widely available projects.",
    image: "/project-finder.png",
    liveUrl: "https://chimataraghuram.github.io/PROJECT-FINDER/",
    tags: ["React", "Search", "Tool"],
    isNew: true,
    color: "#06b6d4" // Cyan
  },
  {
    id: 1,
    title: "Virtual Windows Desktop on AWS",
    description: "Setup and configuration of a virtual Windows desktop on AWS using EC2 Windows Server instances.",
    image: "/aws-desktop-final.jpg",
    githubUrl: "https://github.com/chimataraghuram/Virtual-Windows-Desktop-on-AWS-Using-Windows-Server.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_aws-windowsserver-miniproject-activity-7332458130729013248-I3g4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    tags: ["AWS", "EC2", "Cloud"],
    color: "#ff9900" // AWS Orange
  },
  {
    id: 2,
    title: "Enchanted Wings: Butterfly Species",
    description: "A deep learning project exploring butterfly species classification and ecological importance using CNNs.",
    image: "/butterfly-project.png",
    githubUrl: "https://github.com/chimataraghuram/Enchanted-Wings-Marvels-of-butterfly-species.git",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
    liveUrl: "https://chimataraghuram.github.io/Enchanted-Wings-Marvels-of-butterfly-species/",
    tags: ["AI", "Deep Learning", "Python"],
    color: "#ec4899" // Pink
  },
  {
    id: 4,
    title: "AI Powered Phishing Email Detector",
    description: "An AI solution to identify phishing emails using text classification and keyword intelligence (GenAI).",
    image: "/phishing-detector.png",
    githubUrl: "https://github.com/chimataraghuram/AI_Powered_Phishing_Email_Detector.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_internship-cybersecurity-genai-activity-7411413711753740288-9YdN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    liveUrl: "https://chimataraghuram.github.io/AI_Powered_Phishing_Email_Detector/",
    huggingFaceUrl: "https://huggingface.co/chimataraghuram/AI_Powered_Phishing_Email_Detector",
    tags: ["AI", "GenAI", "Cybersecurity"],
    color: "#3b82f6" // Blue
  },
  {
    id: 3,
    title: "My E- Startup Website Deployment on AWS Ubuntu Server",
    description: "Deployment of a responsive E-Startup landing page on an AWS Ubuntu EC2 instance using Apache web server.",
    image: "/e-startup-aws.png",
    githubUrl: "https://github.com/chimataraghuram/ProtoType-Website-Using-ubuntu-Server-On-AWS.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_aws-ubuntu-winscp-activity-7333181094806097921-5l4c?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    liveUrl: "#",
    tags: ["AWS", "Ubuntu", "Apache"],
    color: "#E95420" // Ubuntu Orange
  },
  {
    id: 103,
    title: "Employee Productivity Prediction",
    description: "An intelligent analytic tool designed to predict and analyze employee productivity metrics using advanced machine learning algorithms.",
    image: "/employee-productivity.png",
    liveUrl: "http://localhost:5000",
    githubUrl: "https://github.com/chimataraghuram/Employee-Productivity-Prediction-Project.git",
    linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
    tags: ["Machine Learning", "Python", "Analytics"],
    color: "#10b981" // Emerald Green
  },
  {
    id: 101,
    title: "Rock-Paper-Scissors-Game",
    description: "A classic interactive Rock-Paper-Scissors game built with HTML, CSS, and JavaScript. Challenge the computer!",
    image: "/rps-game.png",
    githubUrl: "https://github.com/chimataraghuram/Rock-Paper-Scissors-Game.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_webdevelopment-javascript-html-activity-7329028831762178048-jWDG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    liveUrl: "https://chimataraghuram.github.io/Rock-Paper-Scissors-Game/",
    tags: ["JavaScript", "HTML", "Game"],
    color: "#8b5cf6" // Violet
  },
  {
    id: 102,
    title: "QR-Code-Generator",
    description: "A fast and easy-to-use tool to generate QR codes for URLs and text. Built with HTML, CSS, and JavaScript.",
    image: "/qr-code-gen.png",
    githubUrl: "https://github.com/chimataraghuram/QR-Code-Generator.git",
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_webdevelopment-javascript-html-activity-7329206880151527424-Cz8K?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    liveUrl: "https://chimataraghuram.github.io/QR-Code-Generator/",
    tags: ["JavaScript", "HTML", "Tool"],
    color: "#a855f7" // Purple
  },

];
