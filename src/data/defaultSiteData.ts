
import { SiteData } from '../types/siteData';

export const defaultSiteData: SiteData = {
  personalInfo: {
    name: "Shubham Sahare",
    jobTitle: "DevOps Engineer & Cloud Infrastructure Specialist",
    bio: "Automating, scaling, and securing infrastructure with a passion for CI/CD, Kubernetes, and cloud-native technologies.",
    email: "shubham.sahare@example.com",
    location: "Mumbai, India",
    profileImageUrl: "",
    resumeUrl: "",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Python", "Linux", "Monitoring"],
  },
  blogPosts: [
    {
      id: 1,
      title: "Getting Started with DevOps",
      excerpt: "Learn the fundamentals of DevOps practices and tools...",
      content: "This is a comprehensive guide to DevOps fundamentals...",
      date: "2025-03-10",
      category: "DevOps",
      status: "Published"
    },
    {
      id: 2,
      title: "Kubernetes for Beginners",
      excerpt: "A comprehensive guide to understanding Kubernetes basics...",
      content: "Kubernetes is a container orchestration platform that...",
      date: "2025-02-25",
      category: "Kubernetes",
      status: "Published"
    },
    {
      id: 3,
      title: "CI/CD Pipeline Automation",
      excerpt: "How to automate your deployment process with CI/CD...",
      content: "Continuous Integration and Continuous Deployment are...",
      date: "2025-02-15",
      category: "Automation",
      status: "Published"
    },
    {
      id: 4,
      title: "Docker Container Orchestration",
      excerpt: "Best practices for managing Docker containers at scale...",
      content: "When working with Docker containers at scale, it's important to...",
      date: "2025-01-30",
      category: "Docker",
      status: "Published"
    },
  ],
  videos: [
    {
      id: 1,
      title: "My DevOps Journey",
      description: "An overview of my career path and experiences in DevOps",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      platform: "youtube"
    },
    {
      id: 2,
      title: "Cloud Infrastructure Skills",
      description: "Demonstrating my expertise in cloud architecture and deployment",
      embedUrl: "https://player.vimeo.com/video/76979871",
      platform: "vimeo"
    },
    {
      id: 3,
      title: "Kubernetes & Container Orchestration",
      description: "Showcasing my skills in container technologies",
      embedUrl: "https://www.youtube.com/embed/PH-2FfFD2PU",
      platform: "youtube"
    }
  ],
  projects: [
    {
      id: 1,
      title: "DevOps Automation Platform",
      description: "A comprehensive DevOps platform that automates infrastructure provisioning.",
      imageUrl: "",
      category: "DevOps",
      technologies: ["Kubernetes", "Docker", "Terraform", "AWS"],
      githubUrl: "https://github.com/example/project1",
      demoUrl: "https://demo.example.com/project1"
    },
    {
      id: 2,
      title: "Cloud Migration Framework",
      description: "A framework for seamless migration of applications to the cloud.",
      imageUrl: "",
      category: "Cloud",
      technologies: ["AWS", "Azure", "Terraform", "Python"],
      githubUrl: "https://github.com/example/project2",
      demoUrl: "https://demo.example.com/project2"
    },
    {
      id: 3,
      title: "Kubernetes Monitoring Solution",
      description: "An end-to-end monitoring solution for Kubernetes clusters.",
      imageUrl: "",
      category: "Monitoring",
      technologies: ["Prometheus", "Grafana", "Kubernetes", "Go"],
      githubUrl: "https://github.com/example/project3",
      demoUrl: "https://demo.example.com/project3"
    }
  ],
  experience: [
    {
      id: 1,
      company: "Cloud Infrastructure Inc.",
      role: "Senior DevOps Engineer",
      period: "2021 - Present",
      description: "Led the migration to Kubernetes, reducing deployment time by 70%. Implemented GitOps workflows and designed scalable multi-cloud architectures for enterprise clients."
    },
    {
      id: 2,
      company: "Tech Solutions Ltd.",
      role: "DevOps Engineer",
      period: "2019 - 2021",
      description: "Built CI/CD pipelines using Jenkins, GitHub Actions, and AWS CodePipeline. Automated infrastructure provisioning with Terraform and CloudFormation."
    },
    {
      id: 3,
      company: "Digital Systems LLC",
      role: "Systems Administrator",
      period: "2017 - 2019",
      description: "Managed Linux servers and implemented monitoring solutions. Introduced containerization with Docker and automated routine maintenance tasks."
    }
  ],
  socialLinks: [
    {
      id: 1,
      platform: "GitHub",
      url: "https://github.com/shubhamsahare",
    },
    {
      id: 2,
      platform: "LinkedIn",
      url: "https://linkedin.com/in/shubhamsahare",
    },
    {
      id: 3,
      platform: "Twitter",
      url: "https://twitter.com/shubhamsahare",
    }
  ],
  siteSettings: {
    siteTitle: "Shubham Sahare - DevOps Engineer",
    siteDescription: "Personal portfolio and resume website for Shubham Sahare, DevOps Engineer",
    seoKeywords: "devops, cloud, kubernetes, docker, CI/CD, automation, infrastructure, engineer",
    whatsappLink: "https://whatsapp.com/group/example",
    showWhatsappSection: true,
    heroVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
};
