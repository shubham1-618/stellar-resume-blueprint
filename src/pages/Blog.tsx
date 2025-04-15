
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import { useSiteData } from "@/context/SiteDataContext";
import { ArrowLeft, BookOpen } from "lucide-react";

const Blog = () => {
  const { siteData } = useSiteData();
  
  // Filter published blog posts
  const publishedPosts = siteData.blogPosts.filter(post => post.status === "Published");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
      <ParticleBackground />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">DevOps Insights</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore my thoughts and experiences on DevOps, cloud infrastructure, and automation.
          </p>
        </div>
        
        {publishedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
                  <CardHeader>
                    <div className="text-sm text-white/60">{post.date} · {post.category}</div>
                    <CardTitle className="text-white">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-white/70">{post.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <div className="text-[#9b87f5] text-sm font-medium">Read more →</div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 rounded-xl p-8">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-white/20" />
            <p className="text-white/60">No blog posts available yet.</p>
            <Link to="/">
              <button className="mt-4 flex items-center gap-2 mx-auto text-[#9b87f5] hover:text-[#D6BCFA] transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
