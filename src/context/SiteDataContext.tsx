
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

// Define types for our site data
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  status: "Published" | "Draft";
}

export interface VideoItem {
  id: number;
  title: string;
  description: string;
  embedUrl: string;
  platform: "youtube" | "vimeo";
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  jobTitle: string;
  bio: string;
  email: string;
  location: string;
  profileImageUrl: string;
  resumeUrl: string;
  skills: string[];
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  seoKeywords: string;
  whatsappLink: string;
  showWhatsappSection: boolean;
  heroVideoUrl: string;
}

export interface SiteData {
  personalInfo: PersonalInfo;
  blogPosts: BlogPost[];
  videos: VideoItem[];
  projects: Project[];
  experience: Experience[];
  socialLinks: SocialLink[];
  siteSettings: SiteSettings;
}

// Default data
const defaultSiteData: SiteData = {
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

// Create context
interface SiteDataContextType {
  siteData: SiteData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  addBlogPost: (post: Omit<BlogPost, "id">) => void;
  updateBlogPost: (id: number, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: number) => void;
  updateVideos: (videos: VideoItem[]) => void;
  addVideo: (video: Omit<VideoItem, "id">) => void;
  updateVideo: (id: number, video: Partial<VideoItem>) => void;
  deleteVideo: (id: number) => void;
  updateProjects: (projects: Project[]) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  updateExperience: (exp: Experience[]) => void;
  updateSocialLinks: (links: SocialLink[]) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  saveAllData: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

// Provider component
export const SiteDataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Initialize state with default data or from localStorage if available
  const [siteData, setSiteData] = useState<SiteData>(() => {
    const savedData = localStorage.getItem("siteData");
    return savedData ? JSON.parse(savedData) : defaultSiteData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("siteData", JSON.stringify(siteData));
  }, [siteData]);

  // Update functions
  const updatePersonalInfo = (info: PersonalInfo) => {
    setSiteData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info
      }
    }));
    toast.success("Personal information updated");
  };

  const updateBlogPosts = (posts: BlogPost[]) => {
    setSiteData(prev => ({
      ...prev,
      blogPosts: posts
    }));
    toast.success("Blog posts updated");
  };

  const addBlogPost = (post: Omit<BlogPost, "id">) => {
    const newId = Math.max(0, ...siteData.blogPosts.map(p => p.id)) + 1;
    setSiteData(prev => ({
      ...prev,
      blogPosts: [
        ...prev.blogPosts,
        { ...post, id: newId }
      ]
    }));
    toast.success("Blog post added");
  };

  const updateBlogPost = (id: number, post: Partial<BlogPost>) => {
    setSiteData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(p => 
        p.id === id ? { ...p, ...post } : p
      )
    }));
    toast.success("Blog post updated");
  };

  const deleteBlogPost = (id: number) => {
    setSiteData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(p => p.id !== id)
    }));
    toast.success("Blog post deleted");
  };

  const updateVideos = (videos: VideoItem[]) => {
    setSiteData(prev => ({
      ...prev,
      videos
    }));
    toast.success("Videos updated");
  };

  const addVideo = (video: Omit<VideoItem, "id">) => {
    const newId = Math.max(0, ...siteData.videos.map(v => v.id)) + 1;
    setSiteData(prev => ({
      ...prev,
      videos: [
        ...prev.videos,
        { ...video, id: newId }
      ]
    }));
    toast.success("Video added");
  };

  const updateVideo = (id: number, video: Partial<VideoItem>) => {
    setSiteData(prev => ({
      ...prev,
      videos: prev.videos.map(v => 
        v.id === id ? { ...v, ...video } : v
      )
    }));
    toast.success("Video updated");
  };

  const deleteVideo = (id: number) => {
    setSiteData(prev => ({
      ...prev,
      videos: prev.videos.filter(v => v.id !== id)
    }));
    toast.success("Video deleted");
  };

  const updateProjects = (projects: Project[]) => {
    setSiteData(prev => ({
      ...prev,
      projects
    }));
    toast.success("Projects updated");
  };

  const addProject = (project: Omit<Project, "id">) => {
    const newId = Math.max(0, ...siteData.projects.map(p => p.id)) + 1;
    setSiteData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { ...project, id: newId }
      ]
    }));
    toast.success("Project added");
  };

  const updateProject = (id: number, project: Partial<Project>) => {
    setSiteData(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === id ? { ...p, ...project } : p
      )
    }));
    toast.success("Project updated");
  };

  const deleteProject = (id: number) => {
    setSiteData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
    toast.success("Project deleted");
  };

  const updateExperience = (exp: Experience[]) => {
    setSiteData(prev => ({
      ...prev,
      experience: exp
    }));
    toast.success("Experience updated");
  };

  const updateSocialLinks = (links: SocialLink[]) => {
    setSiteData(prev => ({
      ...prev,
      socialLinks: links
    }));
    toast.success("Social links updated");
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteData(prev => ({
      ...prev,
      siteSettings: {
        ...prev.siteSettings,
        ...settings
      }
    }));
    toast.success("Site settings updated");
  };

  const saveAllData = () => {
    localStorage.setItem("siteData", JSON.stringify(siteData));
    toast.success("All site data saved");
  };

  const value = {
    siteData,
    updatePersonalInfo,
    updateBlogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    updateVideos,
    addVideo,
    updateVideo,
    deleteVideo,
    updateProjects,
    addProject,
    updateProject,
    deleteProject,
    updateExperience,
    updateSocialLinks,
    updateSiteSettings,
    saveAllData
  };

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
};

// Custom hook for using the context
export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
};
