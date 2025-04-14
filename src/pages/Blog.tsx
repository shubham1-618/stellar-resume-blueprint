
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";

// Mock blog data - in a real app, this would come from an API or context
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with DevOps",
    excerpt: "Learn the fundamentals of DevOps practices and tools...",
    date: "2025-03-10",
    category: "DevOps",
  },
  {
    id: 2,
    title: "Kubernetes for Beginners",
    excerpt: "A comprehensive guide to understanding Kubernetes basics...",
    date: "2025-02-25",
    category: "Kubernetes",
  },
  {
    id: 3,
    title: "CI/CD Pipeline Automation",
    excerpt: "How to automate your deployment process with CI/CD...",
    date: "2025-02-15",
    category: "Automation",
  },
  {
    id: 4,
    title: "Docker Container Orchestration",
    excerpt: "Best practices for managing Docker containers at scale...",
    date: "2025-01-30",
    category: "Docker",
  },
];

const Blog = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
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
      </div>
    </div>
  );
};

export default Blog;
