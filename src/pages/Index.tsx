
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Linkedin, Github, Mail, FileText, Calendar, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isMuted, setIsMuted] = useState(true);
  const { toast } = useToast();

  const handleDownloadResume = () => {
    toast({
      title: "Resume Download",
      description: "Your resume is being downloaded",
    });
    // In a real app, add actual download functionality here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <a href="#" className="text-xl font-bold">
            John Doe
          </a>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#home" className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#about" className={navigationMenuTriggerStyle()}>
                  About Me
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#portfolio" className={navigationMenuTriggerStyle()}>
                  Portfolio
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#projects" className={navigationMenuTriggerStyle()}>
                  Projects
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#experience" className={navigationMenuTriggerStyle()}>
                  Experience
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#blog" className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#contact" className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="md:hidden">
            {/* Mobile menu button - to be implemented with a proper dropdown */}
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative flex flex-col items-center justify-center min-h-screen pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Video background - replace with actual video */}
          <div className="bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 absolute inset-0 z-0"></div>
          <video 
            className="w-full h-full object-cover" 
            autoPlay 
            loop 
            muted={isMuted}
            playsInline
          >
            <source src="https://cdn.example.com/your-resume-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button 
            onClick={toggleMute} 
            className="absolute bottom-4 right-4 z-10 bg-black/30 p-2 rounded-full"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            John Doe
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4">Senior Software Engineer & UI/UX Designer</p>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Passionate about creating beautiful, functional web experiences with a focus on performance and accessibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownloadResume} className="rounded-full px-8">
              <FileText className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
            <Button variant="outline" className="rounded-full px-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg">
                Hello! I'm John, a passionate software engineer with 7+ years of experience building modern web applications.
                I specialize in React, TypeScript, and UI/UX design, creating solutions that are both beautiful and functional.
              </p>
              <p className="text-lg">
                I believe in clean code, continuous learning, and pushing the boundaries of what's possible on the web.
                When I'm not coding, you'll find me hiking, reading science fiction, or experimenting with new technologies.
              </p>
              <div className="pt-4">
                <h3 className="text-xl font-medium mb-3">My Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Node.js", "UI/UX Design", "Next.js", "GraphQL", "DevOps", "AWS"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
                {/* Replace with actual profile image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Profile Image Placeholder
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Portfolio</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A showcase of my best work across different categories and industries.
          </p>
          
          <div className="flex justify-center flex-wrap gap-3 mb-8">
            {["All", "Web Design", "UI/UX", "Mobile Apps", "DevOps"].map((category) => (
              <Button key={category} variant={category === "All" ? "default" : "outline"} className="rounded-full">
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl aspect-video bg-muted hover:shadow-xl transition-all duration-300">
                {/* Portfolio item - replace with actual project thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                  Project Thumbnail {i + 1}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">Project Name {i + 1}</h3>
                  <p className="text-white/80 mb-4">Brief project description goes here</p>
                  <Button variant="outline" className="w-fit bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
          
          <div className="space-y-12">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="bg-muted rounded-xl overflow-hidden aspect-video relative">
                    {/* Project screenshot - replace with actual screenshot */}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      Project Screenshot {i + 1}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Project Title {i + 1}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["React", "TypeScript", "Tailwind CSS"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                    <Button size="sm" className="gap-2">
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Work Experience</h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-[2px] bg-border md:-translate-x-1/2"></div>
            
            {/* Timeline entries */}
            {[
              {
                company: "Tech Company A",
                role: "Senior Frontend Developer",
                period: "2020 - Present",
                description: "Led the development of the company's flagship product, improving performance by 40% and implementing modern React patterns."
              },
              {
                company: "Agency B",
                role: "UI/UX Designer & Developer",
                period: "2018 - 2020",
                description: "Designed and developed web applications for various clients, focusing on responsive design and accessibility."
              },
              {
                company: "Startup C",
                role: "Frontend Developer",
                period: "2016 - 2018",
                description: "Built interactive web applications using React and Redux, collaborating with a small team in a fast-paced environment."
              }
            ].map((job, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row md:justify-between items-start mb-12 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                <div className={`absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary -translate-x-1/2 z-10`}></div>
                <div className={`w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-card rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-xl">{job.role}</h3>
                        <p className="text-primary">{job.company}</p>
                      </div>
                      <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Latest Articles</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from my professional journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative">
                  {/* Blog featured image - replace with actual image */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Blog Image {i + 1}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {["Development", "React"].map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">How to Build a Modern Web Application</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">May 15, 2023</span>
                    <Button variant="ghost" className="text-primary p-0 h-auto">Read More →</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Get In Touch</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to chat? Feel free to reach out!
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full p-3 rounded-lg border border-border bg-background"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-3 rounded-lg border border-border bg-background"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="w-full p-3 rounded-lg border border-border bg-background"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-3 rounded-lg border border-border bg-background min-h-32"
                    placeholder="Hello, I'd like to talk about..."
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Schedule a call</p>
                      <Button variant="link" className="p-0 h-auto">Book a time slot</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#home" className="text-sm text-muted-foreground hover:text-foreground">Home</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">About</a>
              <a href="#portfolio" className="text-sm text-muted-foreground hover:text-foreground">Portfolio</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
