
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Linkedin, Github, Mail, FileText, Calendar, ChevronDown, Code, Terminal, Server, Database, Cloud, Download, ExternalLink, BookOpen, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    portfolio: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    blog: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar styling based on scroll position
      setIsScrolled(window.scrollY > 50);

      // Find which section is currently in view
      const currentPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section in sectionRefs) {
        const element = sectionRefs[section].current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToSection = (sectionId) => {
    const element = sectionRefs[sectionId].current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for the fixed header
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between h-20 px-4 md:px-6">
          <a href="#" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">
            Shubham Sahare
          </a>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {Object.keys(sectionRefs).map((section) => (
                <NavigationMenuItem key={section}>
                  <NavigationMenuLink 
                    onClick={() => scrollToSection(section)}
                    className={`${navigationMenuTriggerStyle()} cursor-pointer ${activeSection === section ? "bg-white/10" : ""}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
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
      <section id="home" ref={sectionRefs.home} className="relative flex flex-col items-center justify-center min-h-screen pt-16 overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 z-0">
          {/* Video background - replace with actual video */}
          <div className="bg-gradient-to-br from-[#1A1F2C]/80 via-[#7E69AB]/30 to-[#9b87f5]/20 absolute inset-0 z-0"></div>
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
            className="absolute bottom-4 right-4 z-10 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
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
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">
              Shubham Sahare
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">DevOps Engineer & Cloud Infrastructure Specialist</p>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Automating, scaling, and securing infrastructure with a passion for CI/CD, Kubernetes, and cloud-native technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleDownloadResume} className="rounded-full px-8 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none transition-all duration-300 transform hover:scale-105">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button variant="outline" className="rounded-full px-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </div>
            
            <div className="mt-12 flex justify-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-10 w-10 bg-white/5"
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" ref={sectionRefs.about} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] to-[#0F172A] -z-10"></div>
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-white/80 leading-relaxed">
                Hello! I'm Shubham, a passionate DevOps Engineer with expertise in automating, optimizing, and securing cloud infrastructure. 
                With a strong foundation in both development and operations, I bridge the gap between these two worlds to create efficient, 
                scalable, and reliable systems.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                I believe in the power of automation and continuous improvement. My goal is to build resilient infrastructure that enables 
                development teams to deliver features rapidly without compromising on stability or security. When not working with cloud 
                technologies, I enjoy contributing to open-source projects and sharing knowledge through my technical blog.
              </p>
              <div className="pt-4">
                <h3 className="text-xl font-medium mb-3 text-white/90">My Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    {name: "AWS", icon: <Cloud className="h-4 w-4 mr-1" />},
                    {name: "Kubernetes", icon: <Server className="h-4 w-4 mr-1" />},
                    {name: "Docker", icon: <Database className="h-4 w-4 mr-1" />},
                    {name: "Terraform", icon: <Code className="h-4 w-4 mr-1" />},
                    {name: "CI/CD", icon: <Terminal className="h-4 w-4 mr-1" />},
                    {name: "Python", icon: <Code className="h-4 w-4 mr-1" />},
                    {name: "Linux", icon: <Terminal className="h-4 w-4 mr-1" />},
                    {name: "Monitoring", icon: <Cpu className="h-4 w-4 mr-1" />},
                  ].map((skill) => (
                    <span key={skill.name} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm flex items-center hover:bg-white/10 transition-colors duration-300">
                      {skill.icon} {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#9b87f5]/20 to-[#1A1F2C] relative shadow-2xl border border-white/10 transform hover:scale-[1.02] transition-all duration-500">
                {/* Replace with actual profile image */}
                <div className="absolute inset-0 flex items-center justify-center text-white/40">
                  Profile Image
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#9b87f5]/10 rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#7E69AB]/10 rounded-full -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" ref={sectionRefs.portfolio} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#1E293B] -z-10"></div>
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Portfolio</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] mx-auto mb-4 rounded-full"></div>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            A showcase of my infrastructure projects, cloud architectures, and DevOps solutions.
          </p>
          
          <div className="flex justify-center flex-wrap gap-3 mb-8">
            {["All", "Cloud Infrastructure", "CI/CD", "Kubernetes", "Monitoring"].map((category, index) => (
              <Button 
                key={category} 
                variant={index === 0 ? "default" : "outline"} 
                className={`rounded-full ${index === 0 ? "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none" : "bg-white/5 border-white/10 hover:bg-white/10"} transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl aspect-video bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] hover:shadow-xl transition-all duration-500 border border-white/5 hover:border-white/10 transform hover:scale-[1.02]">
                {/* Portfolio item - replace with actual project thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center text-white/40">
                  Project Thumbnail {i + 1}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">Cloud Infrastructure Project {i + 1}</h3>
                  <p className="text-white/80 mb-4">Automated AWS infrastructure using Terraform and CI/CD pipelines</p>
                  <Button variant="outline" className="w-fit bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white group-hover:animate-fade-in rounded-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={sectionRefs.projects} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] to-[#0F172A] -z-10"></div>
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Featured Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] mx-auto mb-12 rounded-full"></div>
          
          <div className="space-y-20">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] rounded-xl overflow-hidden aspect-video relative border border-white/10 shadow-xl transform hover:scale-[1.02] transition-all duration-500">
                    {/* Project screenshot - replace with actual screenshot */}
                    <div className="absolute inset-0 flex items-center justify-center text-white/40">
                      Project Screenshot {i + 1}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">DevOps Automation Platform</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Kubernetes", "Docker", "Terraform", "AWS"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-[#9b87f5]/10 text-[#D6BCFA] rounded-full text-xs border border-[#9b87f5]/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    A comprehensive DevOps platform that automates infrastructure provisioning, application deployment, and monitoring. 
                    Built with Terraform, Kubernetes, and AWS services to enable rapid, consistent, and secure deployments across multiple environments.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="gap-2 rounded-full bg-white/5 border-white/10 hover:bg-white/10">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                    <Button size="sm" className="gap-2 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none">
                      <ExternalLink className="h-4 w-4 mr-1" />
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
      <section id="experience" ref={sectionRefs.experience} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#1E293B] -z-10"></div>
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Work Experience</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] mx-auto mb-12 rounded-full"></div>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-[#9b87f5] to-[#D6BCFA] md:-translate-x-1/2"></div>
            
            {/* Timeline entries */}
            {[
              {
                company: "Cloud Infrastructure Inc.",
                role: "Senior DevOps Engineer",
                period: "2021 - Present",
                description: "Led the migration to Kubernetes, reducing deployment time by 70%. Implemented GitOps workflows and designed scalable multi-cloud architectures for enterprise clients."
              },
              {
                company: "Tech Solutions Ltd.",
                role: "DevOps Engineer",
                period: "2019 - 2021",
                description: "Built CI/CD pipelines using Jenkins, GitHub Actions, and AWS CodePipeline. Automated infrastructure provisioning with Terraform and CloudFormation."
              },
              {
                company: "Digital Systems LLC",
                role: "Systems Administrator",
                period: "2017 - 2019",
                description: "Managed Linux servers and implemented monitoring solutions. Introduced containerization with Docker and automated routine maintenance tasks."
              }
            ].map((job, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row md:justify-between items-start mb-16 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                <div className={`absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full bg-[#9b87f5] -translate-x-1/2 z-10 border-2 border-white shadow-md`}></div>
                <div className={`w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] rounded-xl p-6 shadow-md border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:translate-y-[-5px]">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-xl text-white">{job.role}</h3>
                        <p className="text-[#9b87f5]">{job.company}</p>
                      </div>
                      <span className="bg-[#9b87f5]/10 text-[#D6BCFA] text-sm px-3 py-1 rounded-full border border-[#9b87f5]/20">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-white/70 leading-relaxed">{job.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" ref={sectionRefs.blog} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] to-[#0F172A] -z-10"></div>
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Latest Articles</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] mx-auto mb-4 rounded-full"></div>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Insights, guides, and thoughts on DevOps, cloud architecture, and automation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Kubernetes Best Practices for Production",
                tags: ["Kubernetes", "DevOps"],
                date: "April 10, 2025",
                excerpt: "Essential strategies for running resilient, secure, and efficient Kubernetes clusters in production environments."
              },
              {
                title: "Infrastructure as Code: Beyond the Basics",
                tags: ["Terraform", "AWS"],
                date: "March 22, 2025",
                excerpt: "Advanced techniques for managing complex infrastructure with Terraform modules, workspaces, and state management."
              },
              {
                title: "Building Effective CI/CD Pipelines",
                tags: ["CI/CD", "Automation"],
                date: "February 15, 2025",
                excerpt: "Design patterns and implementation strategies for creating robust continuous integration and delivery workflows."
              }
            ].map((article, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] rounded-xl overflow-hidden shadow-md border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:translate-y-[-5px]">
                <div className="aspect-video bg-[#9b87f5]/10 relative">
                  {/* Blog featured image - replace with actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-[#9b87f5]/40" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-[#9b87f5]/10 text-[#D6BCFA] rounded-full text-xs border border-[#9b87f5]/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{article.title}</h3>
                  <p className="text-white/70 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/50">{article.date}</span>
                    <Button variant="ghost" className="text-[#9b87f5] p-0 h-auto hover:text-[#D6BCFA] transition-colors">Read More →</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={sectionRefs.contact} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#1E293B] -z-10"></div>
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Get In Touch</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] mx-auto mb-4 rounded-full"></div>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to discuss DevOps and cloud solutions? Feel free to reach out!
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/80">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-[#9b87f5] focus:ring-1 focus:ring-[#9b87f5] transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/80">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-[#9b87f5] focus:ring-1 focus:ring-[#9b87f5] transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-white/80">
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-[#9b87f5] focus:ring-1 focus:ring-[#9b87f5] transition-all duration-300"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white min-h-32 focus:border-[#9b87f5] focus:ring-1 focus:ring-[#9b87f5] transition-all duration-300"
                    placeholder="Hello Shubham, I'd like to discuss..."
                  />
                </div>
                <Button className="w-full rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none transition-all duration-300 transform hover:scale-[1.02]">Send Message</Button>
              </form>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#9b87f5]/10 p-3 rounded-full border border-[#9b87f5]/20">
                      <Mail className="h-5 w-5 text-[#9b87f5]" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Email</p>
                      <p className="text-white">shubham.sahare@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-[#9b87f5]/10 p-3 rounded-full border border-[#9b87f5]/20">
                      <Calendar className="h-5 w-5 text-[#9b87f5]" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Schedule a call</p>
                      <Button variant="link" className="p-0 h-auto text-[#9b87f5] hover:text-[#D6BCFA]">Book a time slot</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4 text-white">Follow Me</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Linkedin className="h-5 w-5 text-[#9b87f5]" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Github className="h-5 w-5 text-[#9b87f5]" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Mail className="h-5 w-5 text-[#9b87f5]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-[#0F172A] -z-10"></div>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Shubham Sahare</h2>
              <p className="text-sm text-white/50">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              {Object.keys(sectionRefs).map((section) => (
                <a 
                  key={section}
                  href={`#${section}`} 
                  onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
