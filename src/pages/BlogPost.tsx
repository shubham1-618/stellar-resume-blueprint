import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import { useSiteData } from "@/contexts/SiteDataContext";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { siteData } = useSiteData();
  
  const post = siteData.blogPosts.find(post => post.id === Number(id));
  
  if (!post || post.status !== "Published") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
        <ParticleBackground />
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')} className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
      <ParticleBackground />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')} 
          className="mb-8 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        
        <article className="max-w-3xl mx-auto bg-gradient-to-br from-[#1A1F2C]/80 to-[#0F172A]/80 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
            <div className="flex items-center text-white/60 mb-6">
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span>{post.category}</span>
              </div>
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none prose-invert prose-p:text-white/80">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
