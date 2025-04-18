
import axios from 'axios';
import { ApiResponse, LoginRequest, RegisterRequest, AuthResponse } from '@/types/api';
import { BlogPost, VideoItem, Project, Experience, SocialLink, PersonalInfo, SiteSettings } from '@/context/SiteDataContext';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (data: LoginRequest) => 
    api.post<ApiResponse<AuthResponse>>('/auth/login', data),
  
  register: (data: RegisterRequest) =>
    api.post<ApiResponse<AuthResponse>>('/auth/register', data),
    
  logout: () => api.post<ApiResponse>('/auth/logout'),
};

export const blogApi = {
  getAll: () => api.get<ApiResponse<BlogPost[]>>('/blog'),
  getOne: (id: string) => api.get<ApiResponse<BlogPost>>(`/blog/${id}`),
  create: (data: Omit<BlogPost, "id">) => api.post<ApiResponse<BlogPost>>('/blog', data),
  update: (id: string, data: Partial<BlogPost>) => api.put<ApiResponse<BlogPost>>(`/blog/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/blog/${id}`),
};

export const mediaApi = {
  getAllVideos: () => api.get<ApiResponse<VideoItem[]>>('/media/videos'),
  createVideo: (data: Omit<VideoItem, "id">) => api.post<ApiResponse<VideoItem>>('/media/videos', data),
  updateVideo: (id: string, data: Partial<VideoItem>) => api.put<ApiResponse<VideoItem>>(`/media/videos/${id}`, data),
  deleteVideo: (id: string) => api.delete<ApiResponse>(`/media/videos/${id}`),
};

export const projectApi = {
  getAll: () => api.get<ApiResponse<Project[]>>('/projects'),
  create: (data: Omit<Project, "id">) => api.post<ApiResponse<Project>>('/projects', data),
  update: (id: string, data: Partial<Project>) => api.put<ApiResponse<Project>>(`/projects/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/projects/${id}`),
};

export const profileApi = {
  getPersonalInfo: () => api.get<ApiResponse<PersonalInfo>>('/profile'),
  updatePersonalInfo: (data: PersonalInfo) => api.put<ApiResponse<PersonalInfo>>('/profile', data),
  updateSocialLinks: (data: SocialLink[]) => api.put<ApiResponse<SocialLink[]>>('/profile/social', data),
  updateExperience: (data: Experience[]) => api.put<ApiResponse<Experience[]>>('/profile/experience', data),
};

export const settingsApi = {
  getSiteSettings: () => api.get<ApiResponse<SiteSettings>>('/settings'),
  updateSiteSettings: (data: Partial<SiteSettings>) => api.put<ApiResponse<SiteSettings>>('/settings', data),
};

export const usersApi = {
  getAll: () => api.get<ApiResponse<any[]>>('/users'),
  create: (data: { name: string; email: string; password: string; role: string }) => 
    api.post<ApiResponse<any>>('/users', data),
  delete: (id: string) => api.delete<ApiResponse>(`/users/${id}`),
};
