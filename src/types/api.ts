import { BlogPost, VideoItem, Project, Experience, SocialLink, PersonalInfo, SiteSettings } from "@/types/siteData";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  fullName: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
}
