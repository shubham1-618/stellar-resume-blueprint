import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { blogApi, mediaApi, projectApi, profileApi, settingsApi } from "@/services/api";
import { defaultSiteData } from "@/data/defaultSiteData";
import { SiteData, PersonalInfo, BlogPost, VideoItem, Project, Experience, SocialLink, SiteSettings } from "@/types/siteData";

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

export const SiteDataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [
          personalInfo,
          blogPosts,
          videos,
          projects,
          siteSettings
        ] = await Promise.all([
          profileApi.getPersonalInfo(),
          blogApi.getAll(),
          mediaApi.getAllVideos(),
          projectApi.getAll(),
          settingsApi.getSiteSettings()
        ]);

        setSiteData(prev => ({
          ...prev,
          personalInfo: personalInfo.data?.data || prev.personalInfo,
          blogPosts: blogPosts.data?.data || prev.blogPosts,
          videos: videos.data?.data || prev.videos,
          projects: projects.data?.data || prev.projects,
          siteSettings: siteSettings.data?.data || prev.siteSettings,
        }));
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast.error('Error loading data');
      }
    };

    loadInitialData();
  }, []);

  const updatePersonalInfo = async (info: PersonalInfo) => {
    try {
      const response = await profileApi.updatePersonalInfo(info);
      if (response.data.success) {
        setSiteData(prev => ({ ...prev, personalInfo: info }));
        toast.success('Personal information updated');
      }
    } catch (error) {
      toast.error('Error updating personal information');
    }
  };

  const updateBlogPosts = (posts: BlogPost[]) => {
    setSiteData(prev => ({ ...prev, blogPosts: posts }));
    toast.success("Blog posts updated");
  };

  const addBlogPost = async (post: Omit<BlogPost, "id">) => {
    try {
      const response = await blogApi.create(post);
      if (response.data.success) {
        setSiteData(prev => ({
          ...prev,
          blogPosts: [...prev.blogPosts, response.data.data!]
        }));
        toast.success('Blog post added');
      }
    } catch (error) {
      toast.error('Error adding blog post');
    }
  };

  const updateBlogPost = (id: number, post: Partial<BlogPost>) => {
    setSiteData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(p => p.id === id ? { ...p, ...post } : p)
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
    setSiteData(prev => ({ ...prev, experience: exp }));
    toast.success("Experience updated");
  };

  const updateSocialLinks = (links: SocialLink[]) => {
    setSiteData(prev => ({ ...prev, socialLinks: links }));
    toast.success("Social links updated");
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteData(prev => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...settings }
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

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
};
