import { useState } from "react";
import { Code, ExternalLink, Github, Mail, Linkedin, Twitter, Download, MapPin, Calendar, Star, Users, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/hooks/use-theme";
import { Link } from "wouter";

export default function Portfolio() {
  const { theme, toggleTheme } = useTheme();

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with user authentication, payment processing, shopping cart, and admin dashboard. Built with modern technologies.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      stars: 156,
      forks: 43
    },
    {
      id: 2,
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates, task tracking, team collaboration, and progress analytics.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      tech: ["React", "Firebase", "Material-UI", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      stars: 89,
      forks: 24
    },
    {
      id: 3,
      title: "Restaurant Management App",
      description: "Complete restaurant management solution with order tracking, menu management, inventory control, and staff scheduling.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      tech: ["React", "Express", "PostgreSQL", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stars: 67,
      forks: 18
    },
    {
      id: 4,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with post scheduling, engagement tracking, and performance metrics.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      tech: ["Vue.js", "Chart.js", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stars: 42,
      forks: 12
    },
    {
      id: 5,
      title: "CodeVault - Code Snippet Manager",
      description: "Modern code snippet sharing platform with syntax highlighting, search functionality, and responsive design.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      tech: ["React", "TypeScript", "Tailwind CSS", "Express"],
      liveUrl: "/app",
      githubUrl: "#",
      featured: false,
      stars: 38,
      forks: 9
    },
    {
      id: 6,
      title: "Learning Management System",
      description: "Educational platform with course creation, student enrollment, progress tracking, and quiz functionality.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
      tech: ["Next.js", "Prisma", "PostgreSQL", "NextAuth"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stars: 73,
      forks: 21
    }
  ];

  const skills = [
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "Vue.js", level: 80, category: "Frontend" },
    { name: "CSS/SCSS", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 80, category: "Backend" },
    { name: "PostgreSQL", level: 75, category: "Backend" },
    { name: "MongoDB", level: 70, category: "Backend" },
    { name: "Docker", level: 65, category: "DevOps" },
    { name: "AWS", level: 70, category: "DevOps" },
    { name: "Git", level: 90, category: "Tools" }
  ];

  const experience = [
    {
      title: "Senior Software Engineer",
      company: "Microsoft",
      location: "Bangalore, India",
      period: "2023 - Present",
      description: "Leading development of cloud-based enterprise solutions using React, Azure, and .NET. Managing cross-functional teams and driving technical architecture decisions.",
      achievements: ["Architected microservices handling 1M+ requests/day", "Reduced system latency by 45%", "Led team of 8 engineers across 3 time zones"]
    },
    {
      title: "Full Stack Developer",
      company: "Flipkart",
      location: "Bangalore, India",
      period: "2021 - 2023",
      description: "Developed scalable e-commerce features and payment systems. Worked on high-traffic applications serving millions of users daily.",
      achievements: ["Built real-time inventory management system", "Improved checkout conversion by 25%", "Optimized database queries reducing load by 40%"]
    },
    {
      title: "Software Developer",
      company: "Infosys",
      location: "Pune, India",
      period: "2019 - 2021",
      description: "Started career developing web applications for banking and finance clients. Gained expertise in full-stack development and agile methodologies.",
      achievements: ["Delivered 15+ client projects on time", "Reduced manual testing effort by 60%", "Mentored 5 junior developers"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="text-white w-4 h-4" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio</h1>
              </div>
            </Link>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-6">
                <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">About</a>
                <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">Projects</a>
                <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">Skills</a>
                <a href="#experience" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">Experience</a>
                <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">Contact</a>
              </nav>
              
              <Link href="/app">
                <Button variant="outline" size="sm">
                  CodeVault
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Sanjay Kumar</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Software Engineer specializing in full-stack development with expertise in React, Node.js, 
                and modern JavaScript frameworks. Passionate about building scalable web applications and solving complex problems.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </Button>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                  alt="Alex Johnson" 
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Available for work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience in web development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {projects.filter(p => p.featured).map(project => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.liveUrl}>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.githubUrl}>
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map(project => (
              <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-200">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 3).map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{project.stars}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GitBranch className="w-3 h-3" />
                        <span>{project.forks}</span>
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                        <a href={project.liveUrl}>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                        <a href={project.githubUrl}>
                          <Github className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Technologies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Frontend">Frontend</TabsTrigger>
              <TabsTrigger value="Backend">Backend</TabsTrigger>
              <TabsTrigger value="DevOps">DevOps</TabsTrigger>
              <TabsTrigger value="Tools">Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(skill => (
                  <Card key={skill.name} className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                      <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={skill.level} className="h-2" />
                      <div className="text-right text-sm text-gray-600 dark:text-gray-400">{skill.level}%</div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {["Frontend", "Backend", "DevOps", "Tools"].map(category => (
              <TabsContent key={category} value={category} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.filter(skill => skill.category === category).map(skill => (
                    <Card key={skill.name} className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                        <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={skill.level} className="h-2" />
                        <div className="text-right text-sm text-gray-600 dark:text-gray-400">{skill.level}%</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Work Experience</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My professional journey and key accomplishments.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-12">
              {experience.map((exp, index) => (
                <div key={index} className="relative flex items-start space-x-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-gray-900 dark:text-white">{exp.title}</CardTitle>
                          <p className="text-lg font-medium text-blue-500">{exp.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.period}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">Key Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Work Together</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-4">
              <Mail className="w-5 h-5 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <Github className="w-8 h-8" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <Twitter className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}