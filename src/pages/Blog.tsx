
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import { useSiteData } from "@/context/SiteDataContext";

const Blog = () => {
  const { siteData } = useSiteData();
  
  // Filter published blog posts
  const publishedPosts = siteData.blogPosts.filter(post => post.status === "Published");

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">DevOps Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my thoughts and experiences on DevOps, cloud infrastructure, and automation.
          </p>
        </div>
        
        {publishedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                  <CardHeader>
                    <div className="text-sm text-muted-foreground">{post.date} · {post.category}</div>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <div className="text-primary text-sm font-medium">Read more →</div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
