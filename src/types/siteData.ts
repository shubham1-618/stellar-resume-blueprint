
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

