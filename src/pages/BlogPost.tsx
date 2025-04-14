
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";

// Mock blog data - in a real app, this would come from an API or context
const blogPosts = {
  "1": {
    id: 1,
    title: "Getting Started with DevOps",
    content: `
      <p class="mb-4">DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Key DevOps Principles</h2>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Collaboration between development and operations teams</li>
        <li>Automation of the software delivery process</li>
        <li>Continuous Integration and Continuous Deployment (CI/CD)</li>
        <li>Monitoring and logging</li>
        <li>Infrastructure as Code</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Essential DevOps Tools</h2>
      
      <p class="mb-4">There are numerous tools that support DevOps practices:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Version Control:</strong> Git, GitHub, GitLab</li>
        <li><strong>CI/CD:</strong> Jenkins, CircleCI, GitHub Actions</li>
        <li><strong>Configuration Management:</strong> Ansible, Puppet, Chef</li>
        <li><strong>Containerization:</strong> Docker, Kubernetes</li>
        <li><strong>Monitoring:</strong> Prometheus, Grafana, ELK Stack</li>
      </ul>
      
      <p class="mb-4">Implementing DevOps requires a cultural shift as well as adoption of new tools and practices. Start small, focus on automation, and gradually expand your DevOps capabilities.</p>
    `,
    date: "2025-03-10",
    category: "DevOps",
    author: "Shubham Sahare",
  },
  "2": {
    id: 2,
    title: "Kubernetes for Beginners",
    content: `
      <p class="mb-4">Kubernetes is an open-source platform designed to automate deploying, scaling, and operating application containers. It groups containers that make up an application into logical units for easy management and discovery.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Kubernetes Architecture</h2>
      
      <p class="mb-4">Kubernetes follows a client-server architecture with the following components:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Master Node:</strong> Controls the cluster and its components</li>
        <li><strong>Worker Nodes:</strong> Run applications as containers</li>
        <li><strong>Pods:</strong> The smallest deployable units that can be created and managed</li>
        <li><strong>Services:</strong> Abstract way to expose an application running on a set of Pods</li>
        <li><strong>Deployments:</strong> Declarative updates for Pods and ReplicaSets</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Getting Started with Kubernetes</h2>
      
      <p class="mb-4">To begin with Kubernetes, follow these steps:</p>
      
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li>Install kubectl, the Kubernetes command-line tool</li>
        <li>Set up a local Kubernetes cluster using Minikube or Kind</li>
        <li>Learn to create and manage basic Kubernetes resources</li>
        <li>Deploy a simple application to your cluster</li>
        <li>Explore more advanced features like scaling and rolling updates</li>
      </ol>
      
      <p class="mb-4">Kubernetes has a steep learning curve, but its benefits for container orchestration are immense. Start with simple deployments and gradually learn more complex features.</p>
    `,
    date: "2025-02-25",
    category: "Kubernetes",
    author: "Shubham Sahare",
  },
  "3": {
    id: 3,
    title: "CI/CD Pipeline Automation",
    content: `
      <p class="mb-4">Continuous Integration and Continuous Deployment (CI/CD) pipelines are the backbone of modern DevOps practices, enabling teams to deliver code changes more frequently and reliably.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Benefits of CI/CD</h2>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Faster time to market for new features</li>
        <li>Improved code quality through automated testing</li>
        <li>Reduced manual errors in the deployment process</li>
        <li>Faster feedback loops for developers</li>
        <li>More frequent and reliable releases</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Building an Effective CI/CD Pipeline</h2>
      
      <p class="mb-4">An effective CI/CD pipeline typically includes these stages:</p>
      
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><strong>Source Control:</strong> Code changes are committed to a repository</li>
        <li><strong>Build:</strong> Application is compiled and built</li>
        <li><strong>Test:</strong> Automated tests verify the build's functionality</li>
        <li><strong>Deploy to Staging:</strong> Application is deployed to a staging environment</li>
        <li><strong>Integration Tests:</strong> Additional tests in a production-like environment</li>
        <li><strong>Deploy to Production:</strong> Application is released to users</li>
        <li><strong>Monitoring:</strong> Application performance and errors are tracked</li>
      </ol>
      
      <p class="mb-4">Tools like Jenkins, GitHub Actions, CircleCI, and GitLab CI/CD can help you implement robust pipelines. Choose the one that best integrates with your existing workflow and start automating your deployment process today.</p>
    `,
    date: "2025-02-15",
    category: "Automation",
    author: "Shubham Sahare",
  },
  "4": {
    id: 4,
    title: "Docker Container Orchestration",
    content: `
      <p class="mb-4">Docker containers provide a consistent environment for applications, making them easier to develop, test, and deploy. However, managing containers at scale requires orchestration tools and strategies.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Container Orchestration Challenges</h2>
      
      <p class="mb-4">When running containers in production, you'll face several challenges:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Deploying and scaling multiple containers</li>
        <li>Load balancing traffic between containers</li>
        <li>Managing container networking and storage</li>
        <li>Handling container failures and restarts</li>
        <li>Rolling updates with zero downtime</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Orchestration Tools</h2>
      
      <p class="mb-4">Several tools can help with container orchestration:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Kubernetes:</strong> The most popular and feature-rich container orchestration platform</li>
        <li><strong>Docker Swarm:</strong> Docker's native clustering and scheduling tool</li>
        <li><strong>Amazon ECS/EKS:</strong> AWS's container management services</li>
        <li><strong>Google Kubernetes Engine (GKE):</strong> Google Cloud's managed Kubernetes service</li>
        <li><strong>Azure Kubernetes Service (AKS):</strong> Microsoft Azure's managed Kubernetes offering</li>
      </ul>
      
      <p class="mb-4">Kubernetes has emerged as the industry standard for container orchestration, but simpler solutions like Docker Swarm may be sufficient for less complex deployments. Choose the right tool based on your specific requirements and team expertise.</p>
    `,
    date: "2025-01-30",
    category: "Docker",
    author: "Shubham Sahare",
  },
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id || !blogPosts[id as keyof typeof blogPosts]) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <Button asChild>
          <Link to="/blog">Back to blog</Link>
        </Button>
      </div>
    );
  }
  
  const post = blogPosts[id as keyof typeof blogPosts];
  
  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
          </Link>
        </Button>
        
        <article className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
          <div className="text-sm text-muted-foreground mb-2">
            {post.date} · {post.category}
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center mb-8">
            <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center text-primary font-bold">
              {post.author.charAt(0)}
            </div>
            <div className="ml-3">
              <div className="font-medium">{post.author}</div>
              <div className="text-sm text-muted-foreground">DevOps Engineer</div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
