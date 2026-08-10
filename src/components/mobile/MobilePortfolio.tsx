'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, ExternalLink, Mail, Terminal, Code2 } from 'lucide-react';
import { fileSystem } from '@/config/fileSystem';

export const MobilePortfolio = () => {
  // Extract custom projects from the virtual filesystem.
  const projects = Object.values(fileSystem)
    .filter(f => f.type === 'project' && f.content)
    .slice(0, 4);

  const skills = ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Zustand', 'Node.js', 'System Architecture'];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-[#316ac5] selection:text-white pb-20 relative overflow-x-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md mx-auto px-5 pt-8 relative z-10 flex flex-col space-y-12">
        
        {/* Banner: Best on Desktop */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex items-start space-x-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent opacity-50" />
          <div className="bg-blue-500/20 p-2.5 rounded-xl border border-blue-500/30 shadow-inner flex-shrink-0 relative z-10">
            <Monitor className="text-blue-400 w-5 h-5" />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-white tracking-wide">Desktop View Recommended</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              For the full pristine <span className="text-blue-400 font-medium">Windows XP</span> simulation and interactive window manager, please visit on a desktop device.
            </p>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center text-center space-y-6 pt-4"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative w-28 h-28 bg-[#111] rounded-full overflow-hidden border-2 border-white/10 p-1 flex items-center justify-center">
              <img src="/farhan.png" alt="Farhan CC" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-blue-400 tracking-widest uppercase mb-2"
            >
              Open to Work
            </motion.div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Farhan</h1>
            <p className="text-lg text-gray-400 font-medium max-w-[280px] mx-auto leading-relaxed">
              Full-Stack Developer & UI Architect
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <a 
              href="/Farhan%20cc%20Next%20js%20Developer.pdf" 
              download="Farhan cc Next js Developer.pdf" 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors flex items-center space-x-2 shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              <span>Download Resume</span>
            </a>
            <a href="https://github.com/farhancc" target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-gray-300"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/farhan-cc" target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-blue-400"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:farhancc123@gmail.com" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Mail className="w-5 h-5 text-red-400" />
            </a>
          </motion.div>
        </motion.section>

        {/* Dynamic Projects */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <div className="flex items-center space-x-3 pb-2 border-b border-white/10">
            <Terminal className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">Selected Works</h2>
          </div>
          
          <div className="grid gap-4">
            {projects.length > 0 ? projects.map((proj, idx) => (
              <motion.div 
                key={proj.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/[0.03] border border-white border-opacity-5 p-5 rounded-2xl hover:bg-white/[0.05] transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-100">{proj.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 mb-4 leading-relaxed">
                    Production caliber web application leveraging modern architectures.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Case Study</span>
                  <a href={proj.content} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-blue-400 font-medium text-sm hover:text-blue-300">
                    <span>View Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            )) : (
              <div className="opacity-50 text-sm">No live projects currently available.</div>
            )}
          </div>
        </motion.section>

        {/* Skills Tag Cloud */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
           <div className="flex items-center space-x-3 pb-2 border-b border-white/10">
            <Code2 className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">Technical Arsenal</h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill, idx) => (
              <motion.span 
                key={skill} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-colors cursor-default shadow-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
};
