"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight, ExternalLink, ChevronUp, Phone, Instagram, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Projects array with preview & gallery
const projects = [
  {
    title: "Project One",
    description: "A short description of project one.",
    tags: ["Next.js", "TailwindCSS", "Framer Motion"],
    preview: "/projects/project1-thumb.jpg",
    gallery: [
      "/projects/project1-1.jpg",
      "/projects/project1-2.jpg",
      "/projects/project1-3.jpg",
    ],
  },
  {
    title: "Project Two",
    description: "A short description of project two.",
    tags: ["React", "TypeScript", "API"],
    preview: "/projects/project2-thumb.jpg",
    gallery: [
      "/projects/project2-1.jpg",
      "/projects/project2-2.jpg",
    ],
  },
  {
    title: "Project Three",
    description: "A short description of project three.",
    tags: ["Unreal Engine", "3D", "Game Dev"],
    preview: "/projects/project3-thumb.jpg",
    gallery: [
      "/projects/project3-1.jpg",
      "/projects/project3-2.jpg",
      "/projects/project3-3.jpg",
    ],
  },
];

// Profile info
const profile = {
  name: "Nuno Kurniawan",
  role: "Creative Content Creator",
  description:
    "I am a 3D Artist & Video Editor with experience in creating animations, creative visuals, and multimedia content for various projects. Skilled in Blender, Unreal Engine, Maya, Premiere Pro, and After Effects.",
  email: "kurniawannuno6@gmail.com",
  phone: "+62 896 7752 7711",
  instagram: "https://instagram.com/kurniawannuno6",
  photo: "/Profile.jpg",
};

// Tools / Logos
const tools = [
  { name: "Unreal Engine", icon: "/icons/unreal.png" },
  { name: "Blender", icon: "/icons/blender.png" },
  { name: "After Effects", icon: "/icons/aftereffects.png" },
  { name: "Premiere Pro", icon: "/icons/premiere.png" },
  { name: "Maya", icon: "/icons/maya.png" },
];

export default function PortfolioDark() {
  const [navSolid, setNavSolid] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const grid = document.getElementById("bg-grid");
      if (grid) {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        grid.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const reveal = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay },
    }),
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openLightbox = (images: string[], index = 0) => {
    setGalleryImages(images);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div ref={topRef} className="relative min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 overflow-hidden">
      {/* Background Grid */}
      <div
        id="bg-grid"
        className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.15)_1px,transparent_1px)] 
                   bg-[size:40px_40px] opacity-30 transition-transform duration-200"
      />

      {/* Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-colors ${navSolid ? "bg-black/60 backdrop-blur border-b border-slate-800" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="font-bold text-lg">{profile.name}</h1>
          <nav className="flex gap-6 text-sm text-slate-300">
            <button onClick={() => scrollTo("about")} className="hover:text-white">About</button>
            <button onClick={() => scrollTo("projects")} className="hover:text-white">Projects</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-white">Contact</button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col justify-center items-center text-center h-screen px-6 relative z-10" id="hero">
        <motion.div
          className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-blue-500/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={profile.photo} alt={profile.name} width={160} height={160} className="object-cover" />
        </motion.div>
        <motion.h2 className="text-5xl font-bold mb-4" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={reveal as any} custom={0.2}>
          Hi, I’m <span className="text-blue-400">{profile.name}</span>
        </motion.h2>
        <motion.p className="text-slate-400 max-w-xl mb-6" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={reveal as any} custom={0.4}>
          {profile.description}
        </motion.p>
        <motion.div className="flex gap-4" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={reveal as any} custom={0.6}>
          <Button className="bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50 transition" onClick={() => scrollTo("projects")}>
            View Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" className="border-slate-700 text-blue-950 hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/30 transition" onClick={() => scrollTo("contact")}>
            Contact Me
          </Button>
        </motion.div>
      </section>

      {/* About */}
      <motion.section id="about" className="px-8 py-20 max-w-5xl mx-auto relative z-10" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={reveal as any} custom={0.2}>
        <h3 className="text-3xl font-bold mb-8">About Me</h3>
        <p className="text-slate-400 leading-relaxed">{profile.role} — {profile.description}</p>

        {/* Tools / Logos */}
        <div className="flex flex-wrap gap-4 mt-6">
          {tools.map((tool, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.2 }} className="w-12 h-12 flex items-center justify-center p-2 rounded bg-slate-800 dark:bg-slate-700 shadow hover:shadow-blue-500/50 transition">
              <Image src={tool.icon} alt={tool.name} width={40} height={40} className="object-contain" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section id="projects" className="px-8 py-20 bg-slate-900 dark:bg-slate-800 relative z-10" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={reveal as any} custom={0.2}>
        <h3 className="text-3xl font-bold mb-8">Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div key={idx} whileHover={{ y: -8, boxShadow: "0px 0px 20px rgba(59,130,246,0.5)" }} transition={{ type: "spring", stiffness: 200 }}>
              <Card className="relative overflow-hidden bg-slate-900 dark:bg-slate-700 border-slate-800 cursor-pointer" onClick={() => openLightbox(project.gallery, 0)}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {project.preview && (
                    <Image src={project.preview} alt={project.title} width={400} height={200} className="mb-4 object-cover rounded" />
                  )}
                  <p className="text-slate-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-slate-800 dark:bg-slate-700 text-slate-300">{tag}</Badge>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="flex gap-2 items-center hover:shadow hover:shadow-blue-500/50 transition">
                    <ExternalLink size={16} /> View Gallery
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Lightbox with animation */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="absolute top-4 right-4 text-white p-2 hover:text-blue-400" onClick={closeLightbox}><X size={24} /></button>
            <button className="absolute left-4 text-white p-2 hover:text-blue-400" onClick={prevImage}><ChevronLeft size={32} /></button>
            <motion.div
              key={galleryImages[currentIndex]}
              className="max-w-3xl max-h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={galleryImages[currentIndex]} alt={`Gallery ${currentIndex + 1}`} width={1200} height={800} className="object-contain rounded" />
            </motion.div>
            <button className="absolute right-4 text-white p-2 hover:text-blue-400" onClick={nextImage}><ChevronRight size={32} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact */}
      <motion.section id="contact" className="px-8 py-20 max-w-4xl mx-auto relative z-10" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={reveal as any} custom={0.2}>
        <h3 className="text-3xl font-bold mb-8">CONTACT ME</h3>
        <p className="text-slate-400 mb-6">You can reach me through the following platforms:</p>
        <div className="flex gap-6 flex-wrap">
          <motion.a whileHover={{ scale: 1.1, rotate: -5 }} href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-blue-400 transition"><Mail size={20} /> {profile.email}</motion.a>
          <motion.a whileHover={{ scale: 1.1, rotate: 5 }} href={profile.instagram} target="_blank" className="flex items-center gap-2 hover:text-pink-400 transition"><Instagram size={20} /> Instagram</motion.a>
          <motion.a whileHover={{ scale: 1.1, rotate: 3 }} href={`tel:${profile.phone}`} className="flex items-center gap-2 hover:text-blue-400 transition"><Phone size={20} /> {profile.phone}</motion.a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-slate-800 text-slate-500 text-sm relative z-10">
        © {year} {profile.name}. All rights reserved.
        <div className="mt-4">
          <button onClick={() => scrollTo("hero")} className="inline-flex items-center gap-2 hover:text-white">
            <ChevronUp size={16} /> Back to top
          </button>
        </div>
      </footer>
    </div>
  );
}
