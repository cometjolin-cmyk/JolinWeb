/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, FC, cloneElement, ReactElement, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { 
  Shield, 
  Cpu, 
  MessageSquare, 
  ExternalLink, 
  ChevronRight, 
  Send, 
  User, 
  Bot,
  Terminal,
  Code,
  Zap,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Monitor,
  Power,
  Crosshair,
  Clock,
  MapPin,
  Activity,
  Folder,
  Pin,
  FolderSearch,
  FileText,
  Settings,
  HardDrive,
  Search,
  ChevronDown,
  FileCode,
  Layout,
  Database,
  Layers,
  BarChart3,
  LineChart,
  PieChart,
  Maximize2,
  Minimize2,
  Globe,
  RotateCw,
  Home,
  ArrowLeft,
  BookOpen,
  Gamepad2,
  Brain,
  Video
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import ReactPlayer from 'react-player';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PERSONAL_INFO, ABOUT_ME, PROJECTS, CHATBOT_INFO } from "./constants";
import { GoogleGenAI } from "@google/genai";

// --- AI Chatbot Logic ---
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_PROMPT = `You are the AI assistant for 許家羚's personal portfolio.
家羚 is an aspiring cybersecurity student and an AI-driven learner.
Your goal is to answer questions about 家羚's projects, skills, and journey based on the following information:
Name: ${PERSONAL_INFO.name}
Role: ${PERSONAL_INFO.role}
Tagline: ${PERSONAL_INFO.tagline}
Journey: ${ABOUT_ME.sections.map(s => s.content).join(" ")}
Projects: ${PROJECTS.map(p => `${p.title}: ${p.problem} -> ${p.action} -> ${p.result} (Link: ${p.link})`).join("; ")}

Please be professional, friendly, and concise. If you don't know something, honestly state that you are still learning about that part of 家羚's journey. Use an emotional yet clean tone.`;

// --- Helper Components ---

const Pentominoes = () => {
  const [blocks, setBlocks] = useState([
    { id: 1, x: 20, y: 20, color: "#ff0000", shape: [[1,1], [1,0], [1,0]] },
    { id: 2, x: 80, y: 40, color: "#00ff00", shape: [[1,1,1], [0,1,0]] },
    { id: 3, x: 140, y: 10, color: "#0000ff", shape: [[1,1], [1,1]] },
    { id: 4, x: 50, y: 100, color: "#ffff00", shape: [[1,1,1,1]] },
  ]);

  return (
    <div className="relative w-full h-48 bg-zinc-900/10 retro-inset overflow-hidden p-4">
      <div className="absolute top-2 right-2 text-[8px] font-bold text-zinc-400 uppercase">Logic_Puzzle_v1.0</div>
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          drag
          dragConstraints={{ left: 0, right: 250, top: 0, bottom: 120 }}
          className="absolute cursor-grab active:cursor-grabbing"
          style={{ left: block.x, top: block.y }}
        >
          <div className="grid gap-0.5" style={{ 
            gridTemplateColumns: `repeat(${block.shape[0].length}, 12px)`,
            gridTemplateRows: `repeat(${block.shape.length}, 12px)`
          }}>
            {block.shape.flat().map((cell, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 border border-black/20 ${cell ? "" : "opacity-0"}`}
                style={{ backgroundColor: cell ? block.color : "transparent" }}
              />
            ))}
          </div>
        </motion.div>
      ))}
      <div className="absolute bottom-2 left-2 text-[8px] font-bold text-zinc-500 italic">
        "Solving bugs is like a puzzle; every piece has its destined place."
      </div>
    </div>
  );
};

const SkillTreeMap = () => {
  const journey = [
    { year: "2023", title: "Cybersecurity", desc: "Foundation in logic & defense", icon: Shield },
    { year: "2024", title: "AI & DL", desc: "CNNs & Neural Networks", icon: Cpu },
    { year: "2025", title: "UI/UX & React", desc: "Creative Dev & Human-Centric Design", icon: Layout },
  ];

  return (
    <div className="space-y-4 p-2">
      <div className="flex justify-between items-center border-b border-zinc-300 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest">Growth_Trajectory.map</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-[8px] text-zinc-500">LIVE_SYNC</span>
        </div>
      </div>
      <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-300 before:border-l before:border-white">
        {journey.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="relative"
          >
            <div className="absolute -left-[23px] top-1 w-4 h-4 retro-panel flex items-center justify-center bg-[#c0c0c0] z-10">
              <step.icon className="w-2 h-2 text-black" />
            </div>
            <div className="retro-panel p-3 bg-zinc-100">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[10px] font-black uppercase">{step.title}</h4>
                <span className="text-[8px] font-mono text-zinc-400">{step.year}</span>
              </div>
              <p className="text-[9px] leading-tight text-zinc-600">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const InteractiveBio: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const [unlocked, setUnlocked] = useState({
    past: true,
    turning: false,
    present: false,
  });

  const [blocks, setBlocks] = useState([
    { id: 'turning', x: 20, y: 10, color: "#ff0000", shape: [[1,1], [1,0], [1,0]], label: "轉折" },
    { id: 'present', x: 100, y: 40, color: "#00ff00", shape: [[1,1,1], [0,1,0]], label: "現在" },
  ]);

  const slots = [
    { id: 'turning', x: 200, y: 20, label: "轉折缺口" },
    { id: 'present', x: 200, y: 100, label: "現在缺口" },
  ];

  const handleDragEnd = (id: string, info: any) => {
    const slot = slots.find(s => s.id === id);
    if (slot) {
      // Simple distance check for "snapping"
      const distance = Math.sqrt(Math.pow(info.point.x - (slot.x + 400), 2) + Math.pow(info.point.y - (slot.y + 300), 2));
      // Note: This is a bit tricky with absolute positioning and scroll, 
      // let's simplify for the demo: if they drag it to the right side, unlock.
      if (info.offset.x > 100) {
        setUnlocked(prev => ({ ...prev, [id]: true }));
      }
    }
  };

  const bgAlpha = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const textColor = useTransform(scrollYProgress, [0.5, 0.8], ["#000000", "#000000"]);
  const retroGray = "#c0c0c0";

  return (
    <div ref={containerRef} className="h-[500px] overflow-y-auto custom-scrollbar bg-[#c0c0c0] relative">
      {/* Dynamic Background Transition */}
      <motion.div 
        style={{ opacity: bgAlpha }}
        className="absolute inset-0 bg-white z-0 pointer-events-none"
      />

      <div className="relative z-10 p-8 space-y-24">
        {/* 1. Profile Section */}
        <section className="flex flex-col md:flex-row gap-8 items-center border-b border-zinc-400 pb-12">
          <div className="w-32 h-32 retro-inset p-1 bg-white shrink-0">
            <img src={PERSONAL_INFO.avatar} alt="Avatar" className="w-full h-full object-cover pixelated" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <h3 className="text-2xl font-black uppercase text-black">{PERSONAL_INFO.name}</h3>
              <div className="flex gap-2">
                <Badge className="text-[10px] bg-blue-100 text-blue-800 border-blue-200">ENTP-A</Badge>
                <Badge className="text-[10px] bg-red-100 text-red-800 border-red-200">Cyber_Explorer</Badge>
              </div>
            </div>
            <div className="retro-inset bg-black p-3 font-mono text-[11px] text-green-500 relative overflow-hidden">
              <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
              <motion.p
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
                className="whitespace-nowrap overflow-hidden border-r-2 border-green-500"
              >
                "System logic is my language, and puzzles are my fuel."
              </motion.p>
            </div>
          </div>
        </section>

        {/* 2. Puzzle Section */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase text-zinc-600">AI_Assistant:</span>
            </div>
            <p className="text-sm font-bold text-black bg-white/50 p-3 retro-panel italic">
              「請協助重組我的成長邏輯... 拖動方塊填補缺口以解鎖故事。」
            </p>
          </div>

          <div className="h-64 retro-inset bg-zinc-900/5 relative p-4 overflow-hidden">
            <div className="absolute top-2 right-2 text-[8px] font-bold text-zinc-400 uppercase">Growth_Logic_Debugger_v2.1</div>
            
            {/* Slots (Gaps) */}
            <div className="absolute right-8 top-0 bottom-0 flex flex-col justify-around">
              {slots.map(slot => (
                <div key={slot.id} className="w-24 h-16 border-2 border-dashed border-zinc-400 flex items-center justify-center bg-zinc-200/50">
                  <span className="text-[8px] font-bold text-zinc-400 uppercase">{slot.label}</span>
                </div>
              ))}
            </div>

            {/* Blocks */}
            {blocks.map((block) => (
              <motion.div
                key={block.id}
                drag
                dragMomentum={false}
                onDragEnd={(_, info) => handleDragEnd(block.id, info)}
                className={`absolute cursor-grab active:cursor-grabbing z-20 ${unlocked[block.id as keyof typeof unlocked] ? "opacity-30 pointer-events-none" : ""}`}
                style={{ left: block.x, top: block.y }}
              >
                <div className="grid gap-0.5" style={{ 
                  gridTemplateColumns: `repeat(${block.shape[0].length}, 16px)`,
                  gridTemplateRows: `repeat(${block.shape.length}, 16px)`
                }}>
                  {block.shape.flat().map((cell, i) => (
                    <div 
                      key={i} 
                      className={`w-4 h-4 border border-black/20 shadow-sm ${cell ? "" : "opacity-0"}`}
                      style={{ backgroundColor: cell ? block.color : "transparent" }}
                    />
                  ))}
                </div>
                <div className="text-[8px] font-bold text-center mt-1 uppercase">{block.label}</div>
              </motion.div>
            ))}

            {/* Unlocked Text Overlays */}
            <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-around w-1/2 pointer-events-none">
              <AnimatePresence>
                {unlocked.turning && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 p-2 retro-panel text-[10px] font-bold text-blue-800">
                    [解鎖] 接觸 AI 後，我發現學習是可以被『設計』的。
                  </motion.div>
                )}
                {unlocked.present && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 p-2 retro-panel text-[10px] font-bold text-green-800">
                    [解鎖] 我開始建立學習系統，探索資安與系統漏洞。
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 3. Deep Dive Blog Section */}
        <section className="space-y-16 pb-20">
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-zinc-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Deep_Dive_Narrative</span>
            <div className="h-[1px] flex-1 bg-zinc-300" />
          </div>

          <div className="space-y-20 max-w-xl mx-auto">
            {ABOUT_ME.sections.map((section, i) => (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`space-y-4 p-8 rounded-lg transition-colors duration-700 ${unlocked[section.id as keyof typeof unlocked] || section.id === 'future' ? "opacity-100" : "opacity-20 blur-sm"}`}
              >
                <h4 className="text-xl font-black text-black tracking-tight">{section.title}</h4>
                <p className="text-sm leading-relaxed text-zinc-700 font-medium">
                  {section.content}
                </p>
                {i < ABOUT_ME.sections.length - 1 && (
                  <div className="pt-8 flex justify-center">
                    <ChevronDown className="w-4 h-4 text-zinc-300 animate-bounce" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const SkillBar: FC<{ 
  label: string; 
  value: number; 
  delay: number; 
  isHighlighted?: boolean;
  hasShockwave?: boolean;
}> = ({ label, value, delay, isHighlighted, hasShockwave }) => {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    if (isHighlighted) {
      setCurrentValue(value);
    } else {
      setCurrentValue(0);
    }
  }, [value, isHighlighted]);

  return (
    <motion.div 
      animate={hasShockwave ? { 
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 }
      } : {}}
      className="space-y-1 relative"
    >
      {/* Golden Shockwave Effect */}
      <AnimatePresence>
        {hasShockwave && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-accent/30 rounded-lg pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-tight relative z-10">
        <span className="text-black/60">{label}</span>
        <motion.span 
          animate={hasShockwave ? { color: ["#000", "#FFD700", "#000"] } : {}}
          className={`${isHighlighted ? "text-accent brightness-150" : "text-zinc-400"} font-black transition-colors duration-300`}
        >
          [{currentValue}]
        </motion.span>
      </div>
      <div className="h-2 bg-zinc-800/20 retro-inset overflow-hidden relative z-10">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentValue / 150) * 100}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full relative ${isHighlighted ? "bg-accent shadow-[0_0_15px_rgba(255,215,0,0.8)] saturate-150" : "bg-zinc-400 opacity-30"}`}
        >
          {/* Pulse Effect */}
          {isHighlighted && (
            <motion.div 
              animate={{ x: ["-100%", "1000%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 left-0 w-4 bg-white/40 skew-x-12 blur-sm"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const AvatarCard: FC = () => {
  return (
    <div className="relative w-full aspect-[3/4] retro-window bg-zinc-900 overflow-hidden group">
      {/* Pentominoes Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="pentomino" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 0h5v5H0zM5 5h5v5H5z" fill="currentColor" className="text-accent" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pentomino)" />
        </svg>
      </div>
      
      {/* CRT Effects */}
      <div className="absolute inset-0 scanline opacity-30 z-20 pointer-events-none" />
      <div className="absolute inset-0 scanline-move opacity-20 z-20 pointer-events-none" />
      
      {/* Nameplate */}
      <div className="absolute top-2 left-2 right-2 z-30">
        <div className="bg-[#000080] border border-white/30 px-2 py-1 shadow-[2px_2px_0_black]">
          <span className="text-white font-bold text-[9px] uppercase tracking-widest">[ 資訊專業學生 ]</span>
        </div>
      </div>

      {/* Avatar Image */}
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-zinc-800/50">
        <img 
          src="https://i.ibb.co/zHjY8rG3/Gemini-Generated-Image-bfn4lbbfn4lbbfn4.png" 
          alt="Avatar" 
          className="w-full h-full object-contain pixelated opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Status Display */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#000080]/90 p-2 space-y-0.5">
        <div className="flex justify-between items-center">
          <span className="text-[8px] font-black text-white uppercase">STATUS: ONLINE</span>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        </div>
        <div className="text-[7px] font-bold text-white/70 uppercase truncate">
          LOC: Fo Guang University
        </div>
      </div>
    </div>
  );
};

const NotepadWindow: FC<{ title: string; content: string; isOpen: boolean; onClose: () => void }> = ({ title, content, isOpen, onClose }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDisplayedText("");
      setIsComplete(false);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(content.slice(0, i));
        i++;
        if (i > content.length) {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isOpen, content]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed z-[2000] w-80 retro-window shadow-2xl pointer-events-auto"
      style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
    >
      <div className="retro-title-bar flex justify-between items-center !bg-zinc-700">
        <div className="flex items-center gap-2">
          <FileText className="w-3 h-3 text-white" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-white">{title}.txt - Notepad</span>
        </div>
        <button onClick={onClose} className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300">X</button>
      </div>
      <div className="p-4 bg-white min-h-[150px] font-mono text-xs text-zinc-800 leading-relaxed flex flex-col">
        <div className="flex-1 whitespace-pre-wrap">
          {displayedText}
          {!isComplete && <span className="animate-pulse">_</span>}
        </div>
        {isComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 pt-2 border-t border-zinc-200 text-[10px] text-blue-600 font-bold"
          >
            {">"} Logic Restructuring... Complete.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FloppyDisk: FC<{ 
  id: string; 
  label: string; 
  color: string; 
  icon: any; 
  onInsert: (id: string) => void;
  isInstalled: boolean;
  onHover: (id: string | null) => void;
}> = ({ id, label, color, icon: Icon, onInsert, isInstalled, onHover }) => {
  if (isInstalled) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ 
        scale: 1.1, 
        rotate: -5,
        zIndex: 50,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
      onHoverStart={() => onHover(id)}
      onHoverEnd={() => onHover(null)}
      onDragEnd={(_, info) => {
        // Check if disk is near the slot area
        // The slot is roughly at the bottom center of the window
        const slotElement = document.getElementById('floppy-slot');
        if (slotElement) {
          const rect = slotElement.getBoundingClientRect();
          if (
            info.point.x > rect.left && 
            info.point.x < rect.right && 
            info.point.y > rect.top && 
            info.point.y < rect.bottom + 50
          ) {
            onInsert(id);
          }
        }
      }}
      className="w-20 h-20 retro-panel p-1 cursor-grab active:cursor-grabbing relative group shrink-0"
      style={{ backgroundColor: color }}
    >
      {/* Floppy Disk Details */}
      <div className="absolute top-1 right-1 w-4 h-4 bg-zinc-800/20 border border-black/10" /> {/* Write protect */}
      <div className="absolute top-1 left-1 w-12 h-1 bg-black/10" />
      
      <div className="mt-4 bg-white/90 h-10 flex flex-col items-center justify-center border border-black/10 px-1">
        <Icon className="w-4 h-4 mb-0.5" style={{ color: color === '#ffffff' ? '#000' : color }} />
        <span className="text-[7px] font-black uppercase tracking-tighter text-center leading-none text-black">{label}</span>
      </div>
      
      <div className="absolute bottom-1 left-1 right-1 h-1 bg-zinc-800/30" />
    </motion.div>
  );
};

const InstallationProgressWindow: FC<{ 
  skill: string; 
  progress: number; 
  isOpen: boolean;
}> = ({ skill, progress, isOpen }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed z-[3000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 retro-window shadow-2xl pointer-events-none"
    >
      <div className="retro-title-bar !bg-[#000080] px-2 py-1">
        <span className="text-[9px] font-bold text-white uppercase">System_Installer.exe</span>
      </div>
      <div className="p-4 bg-[#c0c0c0] space-y-3">
        <div className="text-[10px] font-bold text-black">
          Installing Driver: <span className="text-blue-800">{skill}_Core.vxd</span>...
        </div>
        <div className="h-4 retro-inset bg-white p-0.5 flex gap-0.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-full flex-1 transition-colors duration-200 ${i < (progress / 5) ? "bg-[#000080]" : "bg-transparent"}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[8px] font-mono text-zinc-600">
          <span>{progress}% Complete</span>
          <span className="animate-pulse">READING_SECTOR...</span>
        </div>
      </div>
    </motion.div>
  );
};

const FloppyDriveSystem: FC<{ onInsert: (id: string) => void; installedSkills: string[]; isBusy: boolean }> = ({ onInsert, installedSkills, isBusy }) => {
  const [hoveredDisk, setHoveredDisk] = useState<string | null>(null);
  
  const disks = [
    { id: 'AI', label: 'AI_Enlighten.vxd', color: '#3776AB', icon: Brain },
    { id: 'Python', label: 'Security.sys', color: '#000000', icon: Code },
    { id: 'Unity', label: 'Secrets.exe', color: '#ffffff', icon: Gamepad2 },
    { id: 'AE', label: 'Visuals.dll', color: '#CF96FD', icon: Video },
  ];

  return (
    <div className="space-y-8">
      {/* Disks Rack */}
      <div className="flex flex-wrap justify-center gap-4">
        {disks.map(disk => (
          <FloppyDisk 
            key={disk.id} 
            {...disk} 
            onInsert={onInsert} 
            isInstalled={installedSkills.includes(disk.id)} 
            onHover={setHoveredDisk}
          />
        ))}
      </div>

      {/* The Drive A: */}
      <div className="max-w-md mx-auto space-y-2">
        <div className="flex justify-between items-end px-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">3.5" Floppy Drive (A:)</span>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold text-zinc-400 uppercase">Busy</span>
            <div className={`w-2 h-2 rounded-full border border-black/20 ${isBusy ? "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-red-900/30"}`} />
          </div>
        </div>
        
        <div id="floppy-slot" className={`h-12 bg-zinc-800 rounded-sm shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] relative flex items-center justify-center group overflow-hidden transition-all duration-300 ${hoveredDisk ? "ring-2 ring-accent/50 ring-offset-2 ring-offset-zinc-800" : ""}`}>
          {/* The Slot */}
          <motion.div 
            animate={hoveredDisk ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-[90%] h-2 bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] ${hoveredDisk ? "shadow-[0_0_15px_rgba(255,215,0,0.4)]" : ""}`} 
          />
          
          {/* Eject Button */}
          <div className="absolute right-4 bottom-2 w-4 h-2 bg-zinc-700 border border-zinc-600 rounded-sm" />
          
          {/* Drag Target Area Hint */}
          <div className={`absolute inset-0 border-2 border-dashed border-white/5 transition-opacity flex flex-col items-center justify-center ${hoveredDisk ? "opacity-100 bg-accent/5" : "opacity-0 group-hover:opacity-100"}`}>
            <span className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em]">
              {hoveredDisk ? "> Insert Disk Here..." : "Insert_Disk_Here"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const IdentityPropertiesWindow: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [installedSkills, setInstalledSkills] = useState<string[]>([]);
  const [installingSkill, setInstallingSkill] = useState<string | null>(null);
  const [installProgress, setInstallProgress] = useState(0);
  const [notepad, setNotepad] = useState<{ title: string; content: string; isOpen: boolean } | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [shockwaveSkill, setShockwaveSkill] = useState<string | null>(null);
  const [showBootHint, setShowBootHint] = useState(true);
  
  if (!isOpen) return null;

  const skills = [
    { label: "Python", value: 128, id: 'Python' },
    { label: "Unity", value: 115, id: 'Unity' },
    { label: "AI / Gemini", value: 120, id: 'AI' },
    { label: "After Effects", value: 110, id: 'AE' },
  ];

  const handleInsert = (id: string) => {
    if (installingSkill) return;
    setShowBootHint(false);
    setInstallingSkill(id);
    setInstallProgress(0);
    
    // Simulate installation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setInstallProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          completeInstallation(id);
        }, 500);
      }
    }, 100);
  };

  const completeInstallation = (id: string) => {
    setInstalledSkills(prev => [...prev, id]);
    setInstallingSkill(null);
    setShockwaveSkill(id);
    setTimeout(() => setShockwaveSkill(null), 2000);

    // Narrative Logic
    const contentMap: Record<string, { title: string; content: string }> = {
      'AI': {
        title: "AI 啟蒙故事",
        content: `曾經，學習是零散的輸入。接觸 Gemini 後，我發現「學習可被設計」。透過 Prompt Engineering 構建思維鏈，並建立個人 RAG 架構將資訊模組化，讓知識轉化為可調用的代碼塊。AI 不是外掛，是我思維內核的延伸。`
      },
      'Python': {
        title: "我和資安",
        content: `資安是迷人的邏輯博弈。我著迷於在秩序中尋找那 1% 的裂縫。以「獵人」視角審視漏洞，將攻擊思維轉化為嚴謹的編碼習慣。對我而言，程式碼的優雅在於邏輯的不可侵犯性。最深刻的建設，源於對破壞的透徹理解。`
      },
      'AE': {
        title: "美學設計",
        content: `視覺是數據的最終表情。我運用 Unity 與 AE 創作具備物理慣性的 3D 互動，讓 UI 擺脫平面限制。在 Cyberpunk 與 Macaron 色調間，透過邏輯計算每一幀轉場。好的介面應如代碼般清晰，像藝術般直覺。`
      },
      'Unity': {
        title: "我的小秘密",
        content: `加載個人數據：喜歡跳舞、吉他，並積極考取資安與雲端證照。在代碼之外，我依然是追求生活和探索熱情的探索者。`
      }
    };
    
    setTimeout(() => {
      setNotepad({ ...contentMap[id], isOpen: true });
    }, 200);

    if (id === 'AI') {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 500);
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isFlashing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      <InstallationProgressWindow 
        isOpen={!!installingSkill} 
        skill={installingSkill || ""} 
        progress={installProgress} 
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none"
      >
        {/* Background AI Module Text */}
        {installedSkills.includes('AI') && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          >
            <div className="text-[15vw] font-black uppercase text-accent rotate-[-15deg] whitespace-nowrap">
              核心模組導入成功
            </div>
          </motion.div>
        )}
        <div className="max-w-5xl w-full retro-window pointer-events-auto shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="retro-title-bar flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Settings className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Chia-Ling_Hsu.dll (核心效能面板)</span>
            </div>
            <button onClick={onClose} className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300 active:bg-zinc-400">X</button>
          </div>
          
          <div className="bg-[#c0c0c0] p-6 md:p-8 overflow-y-auto custom-scrollbar-w95 relative">
            {/* Boot Hint Bubble */}
            <AnimatePresence>
              {showBootHint && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute bottom-4 right-4 z-[1100] w-64"
                >
                  <div className="retro-panel bg-blue-600 text-white p-3 text-[10px] font-bold shadow-xl border-2 border-white/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Cpu className="w-3 h-3 animate-pulse" />
                      <span>📡 System Alert:</span>
                    </div>
                    [請將下方磁碟片拖入 Drive A: 將會開啟對應故事和說明！]
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left: Avatar Card */}
              <div className="lg:col-span-3">
                <AvatarCard />
              </div>

              {/* Middle: Stats */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xs font-black text-black uppercase tracking-widest">JolinOS Performance Log:</h3>
                  <p className="text-[10px] font-mono text-blue-800 font-bold">( LV. NEXT -{'>'} 80% to Success )</p>
                </div>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <SkillBar 
                      key={skill.label} 
                      {...skill} 
                      delay={0.2 + i * 0.1} 
                      isHighlighted={installedSkills.includes(skill.id)}
                      hasShockwave={shockwaveSkill === skill.id}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Traits & Persona */}
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-black/10 pb-2">
                    <Cpu className="w-4 h-4 text-zinc-600" />
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-600">邏輯驅動內核 1.5</span>
                  </div>
                  <div className="retro-inset bg-zinc-900 p-4 font-mono text-sm text-accent italic leading-relaxed shadow-[inset_0_0_20px_rgba(255,215,0,0.1)]">
                    "System logic is my language,<br />
                    and puzzles are my fuel."
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-black/10 pb-2">
                    <Activity className="w-4 h-4 text-zinc-600" />
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-600">特質標籤</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["ENTP-A", "資安探索者", "UI/UX 設計", "學霸目標 4.3 GPA"].map(tag => (
                      <span key={tag} className="retro-badge !bg-blue-100 !text-blue-800 !border-blue-300">[{tag}]</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Floppy Drive System */}
            <div className="mt-12 pt-8 border-t border-black/10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-zinc-300" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Interaction_Core: Drive_A</span>
                <div className="h-[1px] flex-1 bg-zinc-300" />
              </div>

              <FloppyDriveSystem 
                onInsert={handleInsert} 
                installedSkills={installedSkills} 
                isBusy={!!installingSkill} 
              />
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-[#c0c0c0] border-t border-zinc-400 px-2 py-1 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <div className="retro-inset bg-zinc-200 px-2 py-0.5 text-[9px] font-mono text-zinc-600 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${installedSkills.length === 4 ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`} />
                Status: {installedSkills.length === 4 ? "All Drivers Installed" : `Waiting for Driver Installation (${installedSkills.length}/4)...`}
              </div>
              <div className="text-[9px] font-mono text-zinc-500">
                Drive_A: {installingSkill ? `READING_${installingSkill.toUpperCase()}` : "READY"}
              </div>
            </div>
            <button onClick={onClose} className="retro-panel px-8 py-1 text-[10px] font-bold hover:bg-zinc-300">確定</button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {notepad?.isOpen && (
          <NotepadWindow 
            title={notepad.title}
            content={notepad.content}
            isOpen={notepad.isOpen}
            onClose={() => setNotepad(prev => prev ? { ...prev, isOpen: false } : null)}
          />
        )}
      </AnimatePresence>

      <SystemAlertPopup 
        isOpen={isAlertOpen}
        title="Gemini_Core_Sync.exe"
        message="📡 偵測到核心模組請求！"
        submessage="Gemini 1.5 核心模組導入成功。你想了解家羚是如何訓練我的嗎？"
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          setIsAlertOpen(false);
          // Trigger Gemini easter egg logic if needed
        }}
      />
    </>
  );
};

const Player = ReactPlayer as any;

const FileManagerWindow: FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onSelectProject: (p: typeof PROJECTS[0]) => void;
  preSelectedProject?: typeof PROJECTS[0] | null;
}> = ({ isOpen, onClose, onSelectProject, preSelectedProject }) => {
  const [hoveredProject, setHoveredProject] = useState<typeof PROJECTS[0] | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>("Selected_Featured");
  
  useEffect(() => {
    if (preSelectedProject) {
      setHoveredProject(preSelectedProject);
      setSelectedFolder(preSelectedProject.folder || "Selected_Featured");
    }
  }, [preSelectedProject, isOpen]);

  if (!isOpen) return null;

  const folders = [
    { name: "AI_Nutrition", id: "AI_Nutrition" },
    { name: "UIUX_Lab", id: "UIUX_Lab" },
    { name: "Deep_Learning", id: "Deep_Learning" },
    { name: "Selected_Featured", id: "Selected_Featured" }
  ];

  const filteredProjects = selectedFolder === "Selected_Featured" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.folder === selectedFolder);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none"
    >
      <div className="max-w-6xl w-full retro-window pointer-events-auto shadow-2xl h-[650px] flex flex-col">
        <div className="retro-title-bar flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HardDrive className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">System_Explorer - C:\Users\Jolin\Projects\{selectedFolder}</span>
          </div>
          <div className="flex gap-1">
            <button className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300">_</button>
            <button className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300">□</button>
            <button onClick={onClose} className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300 active:bg-zinc-400">X</button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden bg-white">
          {/* Directory Tree */}
          <div className="w-56 border-r border-zinc-300 bg-[#f0f0f0] p-2 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-1 mb-2">
              <ChevronDown className="w-3 h-3" />
              <Folder className="w-3 h-3 text-yellow-600" fill="currentColor" fillOpacity={0.2} />
              <span className="text-[10px] font-bold">C:\Users\Jolin\Projects</span>
            </div>
            <div className="pl-4 space-y-1">
              {folders.map(folder => (
                <div 
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`flex items-center gap-1 px-1 cursor-pointer hover:bg-blue-100 ${selectedFolder === folder.id ? "bg-[#000080] text-white" : ""}`}
                >
                  <Folder className={`w-3 h-3 ${selectedFolder === folder.id ? "text-white" : "text-yellow-600"}`} fill="currentColor" fillOpacity={0.2} />
                  <span className="text-[10px]">{folder.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="h-8 bg-[#c0c0c0] border-b border-zinc-400 flex items-center px-2 gap-4">
              <div className="flex gap-1">
                <button className="retro-panel p-1"><ChevronRight className="w-3 h-3 rotate-180" /></button>
                <button className="retro-panel p-1"><ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="flex-1 retro-inset bg-white px-2 py-0.5 text-[9px] flex items-center gap-2">
                <HardDrive className="w-3 h-3 text-zinc-400" />
                <span>C:\Users\Jolin\Projects\{selectedFolder}</span>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* File List */}
              <div className="flex-1 p-4 grid grid-cols-3 gap-6 overflow-y-auto custom-scrollbar bg-white">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setHoveredProject(project)}
                    onDoubleClick={() => onSelectProject(project)}
                    className="flex flex-col items-center gap-2 p-2 cursor-pointer group"
                  >
                    <div className="w-20 h-20 retro-inset p-1 bg-zinc-100 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 scanline opacity-10 z-10 pointer-events-none" />
                      {project.filename.endsWith('.exe') ? (
                        <Monitor className="w-12 h-12 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                      ) : (
                        <FileCode className="w-12 h-12 text-zinc-400 group-hover:text-purple-600 transition-colors" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-center group-hover:bg-[#000080] group-hover:text-white px-1">
                      {project.filename}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Preview Pane */}
              <div className="w-80 border-l border-zinc-300 bg-[#f9f9f9] p-4 overflow-y-auto custom-scrollbar flex flex-col">
                <AnimatePresence mode="wait">
                  {hoveredProject ? (
                    <motion.div 
                      key={hoveredProject.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4 flex-1"
                    >
                      <div className="aspect-video retro-inset overflow-hidden relative bg-black">
                        <div className="absolute inset-0 scanline opacity-30 z-20 pointer-events-none" />
                        {hoveredProject.video ? (
                          <Player
                            url={hoveredProject.video}
                            playing={true}
                            muted={true}
                            loop={true}
                            width="100%"
                            height="100%"
                            config={{
                              youtube: {
                                playerVars: { controls: 0, modestbranding: 1 }
                              }
                            }}
                          />
                        ) : (
                          <img src={hoveredProject.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-[11px] font-black uppercase border-b border-zinc-300 pb-1 flex justify-between items-center">
                          {hoveredProject.title}
                          <Badge className="text-[7px] h-4 bg-green-100 text-green-800 border-green-200">PROPS</Badge>
                        </h4>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[9px]">
                            <span className="text-zinc-500 uppercase">Status:</span>
                            <span className="font-bold text-green-600">{hoveredProject.status}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] text-zinc-500 uppercase">Tech_Stack:</span>
                            <div className="flex flex-wrap gap-1">
                              {hoveredProject.tools.slice(0, 4).map(t => (
                                <span key={t} className="text-[8px] bg-zinc-200 px-1 border border-zinc-300">{t}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] text-zinc-500 uppercase">Core_Module:</span>
                            <span className="text-[9px] font-bold text-blue-800">{hoveredProject.core}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-zinc-200 space-y-4">
                        <div className="flex items-center gap-2">
                          <motion.div 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-1.5 h-3 bg-zinc-800"
                          />
                          <span className="text-[9px] font-bold text-zinc-600 italic">
                            {">"} Click to expand details_
                          </span>
                        </div>
                        <button 
                          onClick={() => onSelectProject(hoveredProject)}
                          className="retro-panel w-full py-2 bg-[#000080] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-800"
                        >
                          OPEN_FILE
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-300 space-y-2">
                      <FolderSearch className="w-12 h-12" />
                      <span className="text-[10px] font-bold uppercase">Select_a_Project</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="h-6 bg-[#c0c0c0] border-t border-zinc-400 flex items-center px-2 justify-between text-[9px] text-zinc-600">
          <div className="flex gap-4">
            <span>{filteredProjects.length} object(s)</span>
            <span>{selectedFolder}</span>
          </div>
          <div className="flex items-center gap-1">
            <Monitor className="w-3 h-3" />
            <span>Local Disk (C:)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SystemMonitorWindow: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const techData = [
    { name: 'Python.exe', usage: 95, color: '#3776AB' },
    { name: 'React.sys', usage: 90, color: '#61DAFB' },
    { name: 'TypeScript.dll', usage: 88, color: '#3178C6' },
    { name: 'Tailwind.css', usage: 92, color: '#06B6D4' },
    { name: 'Gemini_AI.core', usage: 85, color: '#8E44AD' },
    { name: 'CyberSec.vault', usage: 80, color: '#E74C3C' },
  ];

  const signalData = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: 50 + Math.sin(i * 0.5) * 20 + Math.random() * 10
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none"
    >
      <div className="max-w-2xl w-full retro-window pointer-events-auto shadow-2xl">
        <div className="retro-title-bar !bg-[#008000] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">System_Performance_Monitor</span>
          </div>
          <button onClick={onClose} className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300 active:bg-zinc-400">X</button>
        </div>

        <div className="p-4 bg-[#c0c0c0] space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Process Usage */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-400 pb-1">
                <span className="text-[10px] font-bold uppercase">Brain_Process_Usage</span>
                <span className="text-[10px] font-mono text-green-700">CPU: 98%</span>
              </div>
              <div className="space-y-3">
                {techData.map((tech) => (
                  <div key={tech.name} className="space-y-1">
                    <div className="flex justify-between text-[9px] font-bold">
                      <span>{tech.name}</span>
                      <span>{tech.usage}%</span>
                    </div>
                    <div className="h-3 retro-inset bg-zinc-300 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.usage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full"
                        style={{ backgroundColor: tech.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Waveform */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-400 pb-1">
                <span className="text-[10px] font-bold uppercase">Neural_Signal_Sync</span>
                <span className="text-[10px] font-mono text-blue-700">STABLE</span>
              </div>
              <div className="h-48 retro-inset bg-black p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={signalData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00ff00" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#00ff00" fillOpacity={1} fill="url(#colorVal)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="retro-panel p-2 bg-zinc-100 flex flex-col items-center">
                  <span className="text-[8px] text-zinc-500 uppercase">Logic_Core</span>
                  <span className="text-xs font-black text-green-600">OPTIMIZED</span>
                </div>
                <div className="retro-panel p-2 bg-zinc-100 flex flex-col items-center">
                  <span className="text-[8px] text-zinc-500 uppercase">UX_Sensor</span>
                  <span className="text-xs font-black text-blue-600">HIGH_SENS</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Twin Log */}
          <div className="retro-inset bg-black p-3 font-vt323 text-green-500 text-sm h-12 flex items-center overflow-hidden">
            <motion.div
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="whitespace-nowrap"
            >
              [LOG]: 偵測到強大的 UI/UX 感知能力... 系統運作穩定。核心邏輯模組已加載。正在同步創意信號...
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OperationLogWindow: FC<{ logs: string[] }> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-12 right-4 z-[50] w-64 h-32 retro-window shadow-lg pointer-events-none opacity-80 hover:opacity-100 transition-opacity"
    >
      <div className="retro-title-bar !bg-zinc-700 flex justify-between items-center h-5">
        <span className="text-[8px] font-bold uppercase tracking-widest text-white px-2">Operation_Log.sys</span>
        <div className="flex gap-1 pr-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="p-2 bg-black/90 h-[calc(100%-20px)] overflow-y-auto custom-scrollbar font-mono text-[8px] text-green-400 space-y-1"
      >
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="opacity-40">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
            <span>{log}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Components ---

const SectionTitle = ({ title, subtitle, align = "left" }: { title: string; subtitle?: string; align?: "left" | "center" }) => (
  <div className={`mb-32 space-y-6 ${align === "center" ? "text-center" : "text-left"}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-block"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4 block">Section</span>
      <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-metallic leading-none">
        {title}
      </h2>
    </motion.div>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-xl max-w-2xl font-medium"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ScanlineOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[2000] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    <motion.div 
      animate={{ y: ["-100%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 w-full h-20 bg-white/5 blur-xl"
    />
  </div>
);

const PortalIntro = ({ 
  status, 
  setStatus, 
  isDark, 
  setIsDark 
}: { 
  status: "boot" | "miniature" | "zooming" | "desktop";
  setStatus: (s: "boot" | "miniature" | "zooming" | "desktop") => void;
  isDark?: boolean; 
  setIsDark?: (v: boolean) => void 
}) => {
  const [biosText, setBiosText] = useState<string[]>([]);
  const [showStartBtn, setShowStartBtn] = useState(false);
  const [isDegaussing, setIsDegaussing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const bootSequences = [
    "System: Jolin_Hsu_Portfolio initialized.",
    "Status: Freshman / EECS Student.",
    "Goal: Reaching 4.3 GPA... OK.",
    "PRESS START TO ENTER REALITY_"
  ];

  useEffect(() => {
    if (status === "boot") {
      let currentLine = 0;
      const typeLine = () => {
        if (currentLine < bootSequences.length) {
          setBiosText(prev => [...prev, bootSequences[currentLine]]);
          currentLine++;
          setTimeout(typeLine, Math.random() * 200 + 100);
        } else {
          setTimeout(() => setShowStartBtn(true), 800);
        }
      };
      typeLine();
    }
  }, [status]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const triggerDegauss = () => {
    setIsDegaussing(true);
    setTimeout(() => {
      if (setIsDark) setIsDark(!isDark);
      setIsDegaussing(false);
    }, 150);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[2000] bg-black overflow-hidden flex items-center justify-center"
    >
      <AnimatePresence>
        {isDegaussing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="degauss-flash"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {status === "boot" && (
          <motion.div 
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-vt323 text-xl md:text-2xl text-white space-y-4 w-full max-w-2xl px-12 relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none text-[15vw] font-black tracking-tighter">
              JolinOS
            </div>
            
            <div className="space-y-2 relative z-10">
              {biosText.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-white/20 w-8">[{i + 1}]</span>
                  <span className="tracking-tight">{line}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-white/40 tracking-widest">_</span>
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-3 h-6 bg-white inline-block align-middle"
                />
              </div>
            </div>

            {showStartBtn && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-16 flex flex-col items-center gap-8"
              >
                <button 
                  onClick={() => setStatus("miniature")}
                  className="retro-btn"
                >
                  [ START ]
                </button>
                
                <button 
                  onClick={triggerDegauss}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <Power className="w-3 h-3" />
                  Degauss_System
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {status === "miniature" && (
          <motion.div 
            key="miniature"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col items-center justify-center perspective-1200"
          >
            <motion.div 
              animate={{ 
                y: [-10, 10],
                rotateX: mousePos.y * 5,
                rotateY: mousePos.x * 5
              }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotateX: { type: "spring", stiffness: 100, damping: 30 },
                rotateY: { type: "spring", stiffness: 100, damping: 30 }
              }}
              className="relative group"
            >
           
>
  <div className="scanline" />
  <div className="scanline-move" />
  <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
    <div className="text-[10px] font-vt323 text-accent animate-pulse">JolinOS v2.6</div>
    <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,0,1)]" />
  </div>
</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <button onClick={() => setStatus("zooming")} className="retro-btn">
                [ INITIALIZE_LINK ]
              </button>
              <span className="text-[8px] uppercase tracking-[1em] text-white/20">Neural_Sync_Ready</span>
            </motion.div>
          </motion.div>
        )}

        {status === "zooming" && (
          <motion.div 
            key="zooming"
            className="w-full h-full flex items-center justify-center relative overflow-hidden"
          >
            {/* Warp Lines / Speed Lines */}
            <div className="absolute inset-0 z-0">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 8], 
                    opacity: [0, 1, 0],
                    x: (Math.random() - 0.5) * 2000,
                    y: (Math.random() - 0.5) * 2000
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity, 
                    delay: Math.random() * 0.5,
                    ease: "circIn"
                  }}
                  className="absolute top-1/2 left-1/2 w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_10px_white]"
                />
              ))}
            </div>

            <motion.div 
              initial={{ scale: 1, filter: "blur(0px)" }}
              animate={{ 
                scale: 30, 
                filter: ["blur(0px)", "blur(12px)", "blur(0px)"],
                opacity: [1, 1, 0]
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.7, 0, 0.3, 1],
                filter: { times: [0, 0.4, 1], duration: 1.5 }
              }}
              onAnimationComplete={() => setStatus("desktop")}
              className="relative w-[400px] h-[300px] z-10 flex items-center justify-center"
            >
               <div className="relative w-full h-full">
                 <img 
                  src="https://picsum.photos/seed/retro-pc/800/600" 
                  alt="Retro PC" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                {/* Screen content zooming with parallax */}
                <motion.div 
                  animate={{ scale: [1, 2] }}
                  transition={{ duration: 1.5, ease: "easeIn" }}
                  className="absolute top-[22%] left-[28%] w-[44%] h-[42%] bg-accent/20 border border-accent/50"
                />
               </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

const ProjectDetail: FC<{ project: typeof PROJECTS[0] | null; onClose: () => void }> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "SPECS" | "LOG">("OVERVIEW");
  if (!project) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-[1100] flex items-center justify-center p-4 md:p-12 pointer-events-none"
      >
        <div className="max-w-4xl w-full retro-window pointer-events-auto shadow-2xl">
          <div className="retro-title-bar flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white/20 rounded-sm" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Project_Inspector: {project.title}</span>
            </div>
            <button onClick={onClose} className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300 active:bg-zinc-400">X</button>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-[#c0c0c0] px-2 pt-2 gap-1 border-b border-zinc-400">
            {["OVERVIEW", "SPECS", "LOG"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? "bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-zinc-800 -mb-[2px] z-10" 
                    : "bg-[#b0b0b0] border-t border-l border-white border-r border-zinc-800 opacity-60 hover:opacity-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 bg-[#c0c0c0] min-h-[400px] max-h-[70vh] overflow-y-auto custom-scrollbar">
            {activeTab === "OVERVIEW" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="retro-inset aspect-video overflow-hidden relative bg-black">
                  <div className="absolute inset-0 scanline opacity-30 z-20 pointer-events-none" />
                  {project.video ? (
                    <Player
                      url={project.video}
                      playing={true}
                      controls={true}
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-black tracking-tighter text-black uppercase">{project.title}</h2>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 uppercase text-[8px]">{project.status}</Badge>
                  </div>
                  <p className="text-sm text-black/80 leading-relaxed font-bold italic border-l-4 border-accent pl-4">
                    "{project.catchphrase}"
                  </p>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-zinc-500">The Challenge</span>
                    <p className="text-sm text-black/80 leading-relaxed font-medium">{project.problem}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "SPECS" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 border-b border-black/10 block pb-2">The Action (Highlights)</span>
                    <div className="space-y-4">
                      {project.action.split('；').map((action, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-4 h-4 retro-panel flex items-center justify-center bg-zinc-800 text-white text-[8px] shrink-0 mt-1">{i+1}</div>
                          <p className="text-sm text-black/80 leading-relaxed font-medium">{action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 border-b border-black/10 block pb-2">Technical Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {project.tools?.map(tool => (
                          <span key={tool} className="retro-badge">{tool}</span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 border-b border-black/10 block pb-2">Core Logic</span>
                      <div className="retro-panel p-3 bg-blue-50 border-blue-200">
                        <p className="text-xs font-bold text-blue-900 uppercase tracking-tight">{project.core}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gallery Section */}
                {(project as any).gallery && (project as any).gallery.length > 0 && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 border-b border-black/10 block pb-2">Project Gallery / 展示截圖</span>
                    <div className="grid grid-cols-2 gap-4">
                      {(project as any).gallery.map((img: string, i: number) => (
                        <div key={i} className="retro-inset aspect-video overflow-hidden bg-black group relative">
                          <img 
                            src={img} 
                            alt={`Gallery ${i}`} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="retro-panel w-full py-3 bg-[#000080] text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-800" onClick={() => window.open(project.link, '_blank')}>
                  🌐 立即訪問 / Launch_Live_Demo
                </button>
              </div>
            )}

            {activeTab === "LOG" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 border-b border-black/10 block pb-2">Key Results</span>
                  <p className="text-sm text-black/80 leading-relaxed">{project.result}</p>
                </div>
                <div className="retro-panel p-6 space-y-4 bg-zinc-200">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Outcome_Log</span>
                  <p className="text-xs text-black leading-relaxed font-black uppercase tracking-widest">{project.outcome}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ChatWindow: FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  messages: any[];
  input: string;
  setInput: (v: string) => void;
  onSend: (customMsg?: string) => void;
  isTyping: boolean;
}> = ({ isOpen, onClose, messages, input, setInput, onSend, isTyping }) => {
  if (!isOpen) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none"
    >
      <div className="max-w-xl w-full retro-window pointer-events-auto shadow-xl">
        <div className="retro-title-bar !bg-[#000080] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">AI_Assistant_Terminal (Digital_Twin)</span>
          </div>
          <button onClick={onClose} className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300 active:bg-zinc-400">X</button>
        </div>
        <div className="p-4 bg-black flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[80%] p-3 font-vt323 text-lg ${msg.role === "user" ? "bg-accent text-black" : "text-accent border border-accent/30"}`}>
                  <span className="text-[10px] opacity-50 block mb-1">{msg.role.toUpperCase()}</span>
                  {msg.content}
                </div>
                {msg.options && (
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    {msg.options.map((opt: string) => (
                      <button 
                        key={opt}
                        onClick={() => onSend(opt)}
                        className="text-left px-3 py-1 border border-accent/30 text-accent hover:bg-accent hover:text-black font-vt323 text-sm transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="text-accent font-vt323 animate-pulse">SYSTEM_THINKING...</div>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Enter command..."
              className="flex-1 bg-black border border-accent/50 text-accent font-vt323 px-4 py-2 outline-none focus:border-accent"
            />
            <button onClick={() => onSend()} className="retro-btn !px-4 !py-1 !text-sm">SEND</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DesktopIcon = ({ icon: Icon, label, onClick, isHighlighted }: { icon: any; label: string; onClick: () => void; isHighlighted?: boolean }) => (
  <motion.div 
    drag
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    dragElastic={1}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    animate={isHighlighted ? { 
      scale: [1, 1.2, 1],
      filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
    } : {}}
    transition={isHighlighted ? { duration: 0.5, repeat: Infinity } : {}}
    className={`flex flex-col items-center gap-1 p-2 cursor-pointer group w-20 select-none ${isHighlighted ? "z-50" : ""}`}
  >
    <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95">
      <Icon className={`w-10 h-10 drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)] ${isHighlighted ? "text-accent" : "text-[#ffd700]"}`} fill="currentColor" fillOpacity={0.2} />
    </div>
    <span className={`text-[9px] font-bold px-1 py-0.5 uppercase tracking-tighter text-center shadow-sm ${isHighlighted ? "bg-accent text-black" : "bg-[#000080] text-white"}`}>
      {label}
    </span>
  </motion.div>
);

const IdentityLabel: FC<{ desktopRef: React.RefObject<HTMLDivElement | null> }> = ({ desktopRef }) => {
  return (
    <motion.div 
      drag
      dragConstraints={desktopRef}
      dragMomentum={false}
      initial={{ x: "calc(50vw - 144px)", y: 150, rotate: 0 }}
      style={{ 
        rotate: 0,
        backgroundColor: "#fdfdfd",
        boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
        border: "1px solid #e5e5e5"
      }}
      className="absolute z-30 w-72 p-6 cursor-grab active:cursor-grabbing select-none post-it-note"
    >
      <div className="space-y-4">
        <div className="font-mono font-black text-xs text-zinc-400 tracking-widest border-b border-zinc-100 pb-1">
          [WHO_AM_I]
        </div>
        
        <div className="font-hand text-zinc-800 space-y-4 leading-relaxed">
          <p className="text-sm">
            這裡是我的「數位雙生」系統。<br />
            歡迎了解我的故事和走過的路與創作。
          </p>
          
          <p className="text-sm font-bold">
            「我是 <span className="text-black border-b-2 border-black/10">許家羚</span>：一名在研究
            <span className="bg-yellow-100/80 px-1 mx-0.5">資安</span>與
            <span className="bg-yellow-100/80 px-1 mx-0.5">AI 進化</span>之間切換的
            <span className="text-blue-700 font-black">數位探索者</span>。」
          </p>
          
          <p className="text-[10px] font-mono text-zinc-400 italic pt-2">
            Exploring the intersection of Security and Intelligent Design.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const StickyNote: FC<{ onGeminiClick: () => void; desktopRef: React.RefObject<HTMLDivElement | null> }> = ({ onGeminiClick, desktopRef }) => {
  return (
    <motion.div 
      drag
      dragConstraints={desktopRef}
      dragMomentum={false}
      initial={{ x: "calc(100vw - 280px)", y: 32, rotate: 2 }}
      style={{ 
        rotate: 2,
        backgroundColor: "#FFFF88",
        boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
      }}
      className="absolute z-40 w-56 p-6 cursor-grab active:cursor-grabbing select-none post-it-note"
    >
      {/* Virtual Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/30 backdrop-blur-[1px] rotate-[-1deg] border border-white/20" />
      
      <div className="font-hand text-zinc-800 space-y-3">
        <div className="flex items-center gap-2 border-b border-zinc-400/30 pb-1">
          <Pin className="w-3 h-3 text-red-500" />
          <span className="text-sm font-bold">📌 TODO List:</span>
        </div>
        
        <ul className="text-xs space-y-2 list-none">
          <li>
            - 升級「阿爸的家園」系統
            <div className="text-[10px] ml-3 text-zinc-600">
              (<span 
                onClick={(e) => {
                  e.stopPropagation();
                  onGeminiClick();
                }}
                className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline decoration-dotted animate-pulse"
              >Gemini</span> 1.5 Pro 整合完成! ✅)
            </div>
          </li>
          <li>- 調優 MBTI 測驗轉場動畫</li>
          <li>- 整理專案 Debug 紀錄檔</li>
        </ul>

        <div className="pt-2 border-t border-zinc-400/30 text-[10px] italic leading-tight">
          ※ Tip: 雙擊 C:\ 磁碟內的 .log 檔案，可檢視我的開發思維軌跡。
        </div>
      </div>
    </motion.div>
  );
};

const DecryptText: FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState("");
  const chars = "01$#@%&*<>?/\\|{}[]";
  
  useEffect(() => {
    if (!isInView) {
      setDisplayText(text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (index < iteration) return text[index];
        if (char === " ") return " ";
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return <span ref={ref} className="font-mono">{displayText}</span>;
};

const DigitalJournalWindow: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 pointer-events-none"
    >
      <div className="w-full max-w-6xl h-full retro-window pointer-events-auto shadow-2xl flex flex-col overflow-hidden">
        {/* Browser Header */}
        <div className="retro-title-bar !bg-[#000080] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Netscape Navigator - [My_Journey.html]</span>
          </div>
          <div className="flex gap-1">
            <button className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300">_</button>
            <button className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300">□</button>
            <button onClick={onClose} className="retro-panel px-2 py-0.5 text-[10px] font-bold hover:bg-zinc-300 active:bg-zinc-400">X</button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-[#c0c0c0] border-b border-white px-2 py-1 flex gap-4 text-[11px] shrink-0">
          <span className="hover:underline cursor-default">File</span>
          <span className="hover:underline cursor-default">Edit</span>
          <span className="hover:underline cursor-default">View</span>
          <span className="hover:underline cursor-default">Go</span>
          <span className="hover:underline cursor-default">Bookmarks</span>
          <span className="hover:underline cursor-default">Options</span>
          <span className="hover:underline cursor-default">Directory</span>
          <span className="hover:underline cursor-default">Window</span>
          <span className="hover:underline cursor-default">Help</span>
        </div>

        {/* Toolbar */}
        <div className="bg-[#c0c0c0] border-b border-zinc-400 p-1 flex items-center gap-2 shrink-0">
          <div className="flex gap-1">
            <button className="retro-btn p-1"><ArrowLeft className="w-4 h-4" /></button>
            <button className="retro-btn p-1 rotate-180"><ArrowLeft className="w-4 h-4" /></button>
            <button className="retro-btn p-1"><RotateCw className="w-4 h-4" /></button>
            <button className="retro-btn p-1"><Home className="w-4 h-4" /></button>
          </div>
          <div className="flex-1 retro-inset bg-white px-2 py-1 flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-400">Location:</span>
            <span className="text-[11px] font-mono truncate">C:\Users\Jolin\Memory_Drive\My_Journey.html</span>
          </div>
          <div className="w-8 h-8 retro-panel bg-zinc-300 flex items-center justify-center">
            <div className="w-6 h-6 bg-[#000080] rounded-full animate-pulse" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#f5f5f0] overflow-y-auto custom-scrollbar-w95 paper-texture p-8 md:p-20">
          <div className="max-w-3xl mx-auto space-y-32 font-serif text-zinc-900">
            {/* Header */}
            <header className="text-center space-y-4 border-b-2 border-zinc-200 pb-12">
              <h1 className="text-4xl font-black tracking-tighter uppercase font-sans">許家羚的數位日誌</h1>
              <p className="text-xl font-mono text-zinc-500">[ 2018-2026 邏輯重構備忘錄 ]</p>
            </header>

            {/* Act 1 */}
            <section className="relative">
              <div className="absolute -left-12 top-0 w-1 h-full bg-zinc-200" />
              <div className="space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 font-sans">
                  <span className="bg-black text-white px-2 py-1 text-sm">ACT I</span>
                  灰階時代的迷失 —— 關於「輸入」的困惑
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p>
                      在傳統教育體系下，我曾像一台舊式磁帶機，拼命接收數據卻不知道如何調用。
                      那是一個只有「輸入」卻缺乏「索引」的年代。
                    </p>
                    <p className="font-bold italic border-l-4 border-black pl-4 py-2">
                      「那時的我，擁有一座圖書館，卻弄丟了所有的索引卡。」
                    </p>
                  </div>
                  <div className="retro-inset p-4 bg-white flex flex-col items-center gap-2">
                    <div className="w-full aspect-square bg-zinc-100 flex items-center justify-center relative overflow-hidden">
                      <Cpu className="w-24 h-24 text-zinc-300 animate-pulse" />
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 100 100">
                          <path d="M10 10 L90 90 M90 10 L10 90 M50 0 L50 100 M0 50 L100 50" stroke="black" strokeWidth="0.5" fill="none" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Fig 1.1: 思維混亂電路圖</span>
                  </div>
                </div>
                {/* Margin Note */}
                <div className="absolute -right-40 top-20 w-32 hidden lg:block">
                  <p className="font-hand text-blue-600 text-sm rotate-3">
                    那時候總覺得腦袋快要溢位了... 😵‍調用
                  </p>
                </div>
              </div>
            </section>

            {/* Act 2 */}
            <section className="relative">
              <div className="absolute -left-12 top-0 w-1 h-full bg-zinc-200" />
              <div className="space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 font-sans">
                  <span className="bg-black text-white px-2 py-1 text-sm">ACT II</span>
                  0 與 1 的覺醒 —— 當 AI 成為我的系統內核
                </h2>
                <div className="space-y-8">
                  <p className="text-lg leading-relaxed">
                    這是我最重要的轉折。我第一次感受到「學習可以被設計」的瞬間。
                    這不是關於使用工具，而是關於<span className="font-black underline decoration-accent decoration-4">「思維架構的軟體升級」</span>。
                  </p>
                  
                  {/* Text Decryption Interaction */}
                  <div className="retro-inset p-8 bg-zinc-900 text-accent font-mono text-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-accent/30 pb-2 mb-4">
                      <Terminal className="w-4 h-4" />
                      <span>RECONSTRUCTING_LOGIC.sh</span>
                    </div>
                    <DecryptText text="AI 不是代筆者，它是我的大腦外掛，幫我把破碎的資訊重組成堅固的框架。" />
                  </div>

                  <p className="text-lg leading-relaxed">
                    當 AI 介入我的學習流，我不再只是儲存資訊，而是開始設計如何「處理」資訊。
                    每一行代碼，都是在修復我思維系統中的舊 Bug。
                  </p>
                </div>
                {/* Margin Note */}
                <div className="absolute -right-40 top-40 w-32 hidden lg:block">
                  <p className="font-hand text-red-600 text-sm -rotate-2">
                    那晚我點了第三杯咖啡，終於看懂了卷積層的運算邏輯。☕️
                  </p>
                </div>
              </div>
            </section>

            {/* Act 3 */}
            <section className="relative">
              <div className="absolute -left-12 top-0 w-1 h-full bg-zinc-200" />
              <div className="space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 font-sans">
                  <span className="bg-black text-white px-2 py-1 text-sm">ACT III</span>
                  守護與探索 —— 從資安到真實世界的裂縫
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p>
                      資安是「最極致的邏輯博弈」。
                      我對系統漏洞的研究，其實是對「秩序」的深層渴望。
                    </p>
                    <p className="font-bold italic border-l-4 border-black pl-4 py-2">
                      「資安教會我：最安全的系統，源於對脆弱性的最深理解。」
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="retro-inset bg-black p-4 h-48 overflow-hidden relative">
                      <div className="absolute inset-0 scanline opacity-20" />
                      <div className="space-y-1">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="text-[8px] font-mono text-green-500/50 whitespace-nowrap animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                            {`[SCANNING] VULNERABILITY_DETECTED_AT_0x${Math.random().toString(16).slice(2, 10).toUpperCase()}... STATUS: PATCHING`}
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Fig 3.1: 實時系統漏洞掃描模擬</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Guestbook */}
            <footer className="pt-20 border-t-2 border-zinc-200">
              <div className="retro-window bg-[#c0c0c0] p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-400 pb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase font-sans">[Guestbook]</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 border border-zinc-400 text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-blue-800">System_Admin</span>
                      <span className="text-zinc-400">2026-04-12</span>
                    </div>
                    <p>系統偵測：這是一個持續進化的內核。</p>
                  </div>
                  <div className="bg-white p-3 border border-zinc-400 text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-blue-800">Logic_Seeker</span>
                      <span className="text-zinc-400">2026-04-11</span>
                    </div>
                    <p>這段故事的重構邏輯非常清晰，期待看到更多 Act IV 的內容！</p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SystemAlertPopup: FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  title?: string;
  message?: string;
  submessage?: string;
}> = ({ isOpen, onClose, onConfirm, title, message, submessage }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[5000] flex items-center justify-center p-4 pointer-events-none"
    >
      <div className="w-[320px] retro-window pointer-events-auto shadow-2xl">
        <div className="retro-title-bar !bg-[#000080] flex justify-between items-center px-2 py-1">
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">{title || "System_Alert.exe"}</span>
          <button onClick={onClose} className="retro-panel px-1.5 py-0.5 text-[10px] font-bold hover:bg-zinc-300">X</button>
        </div>
        <div className="p-4 bg-[#c0c0c0] space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-yellow-400 rounded-full border-2 border-white shadow-[1px_1px_0_black]">
              <span className="text-black font-black text-lg">!</span>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-black leading-tight">{message || "📡 偵測到核心模組請求！"}</p>
              <p className="text-[11px] text-black/80 leading-relaxed">
                {submessage || (
                  <>
                    正在為您展示家羚最深度的 AI 整合專案：阿爸的家園。<br />
                    這裡展示了我是如何被訓練來優化健康飲食邏輯的。
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={onConfirm}
              className="retro-btn !px-6 !py-1 !text-xs !font-bold min-w-[80px]"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"boot" | "miniature" | "zooming" | "desktop">("boot");
  const [showIntro, setShowIntro] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [isDegaussing, setIsDegaussing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMonitorOpen, setIsMonitorOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [highlightedIcon, setHighlightedIcon] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opLogs, setOpLogs] = useState<string[]>(["System initialized.", "Kernel loaded."]);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string; options?: string[] }[]>([
    { 
      role: "bot", 
      content: "我是家羚的數位雙生，你想先了解她的：",
      options: ["1. 許家羚的故事", "2. 創作作品", "3. 系統效能監測 (System Monitor)"]
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (status === 'desktop') {
      setIsChatOpen(true);
    }
  }, [status]);

  useEffect(() => {
    if (status !== 'desktop') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setShowIntro(false);
    }
  }, [status]);

  const triggerDegauss = () => {
    setIsDegaussing(true);
    setTimeout(() => {
      setIsDark(!isDark);
      setIsDegaussing(false);
    }, 150);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleSend = async (customMsg?: string) => {
    const userMsg = customMsg || input.trim();
    if (!userMsg || isTyping) return;
    
    if (!customMsg) setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    
    // Handle specific options
    if (userMsg.includes("1. 許家羚的故事")) {
      setOpLogs(prev => [...prev, "User selected 'Stories'. Loading Digital_Journal.exe..."]);
      setIsChatOpen(false);
      setTimeout(() => {
        setIsJournalOpen(true);
        setOpLogs(prev => [...prev, "Digital_Journal.exe loaded successfully."]);
      }, 800);
      return;
    }
    
    if (userMsg.includes("2. 創作作品")) {
      setOpLogs(prev => [...prev, "User selected 'Works'. Navigating to C:\\Works\\Selected_Featured..."]);
      setIsChatOpen(false);
      setTimeout(() => {
        setIsGalleryOpen(true);
        setOpLogs(prev => [...prev, "File Manager ready."]);
      }, 800);
      return;
    }

    if (userMsg.includes("3. 系統效能監測 (System Monitor)")) {
      setOpLogs(prev => [...prev, "User selected 'Performance'. Launching Identity_Properties.dll..."]);
      setIsChatOpen(false);
      setTimeout(() => {
        setIsAboutOpen(true);
        setOpLogs(prev => [...prev, "Identity_Properties.dll active."]);
      }, 800);
      return;
    }

    setIsTyping(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: SYSTEM_PROMPT + "\n\nUser: " + userMsg,
      });
      const botResponse = response.text || "SYSTEM ERROR: RESPONSE_EMPTY";
      setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: "bot", content: "CRITICAL ERROR: DATA_STREAM_INTERRUPTED" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#008080] text-foreground font-sans selection:bg-accent selection:text-black overflow-hidden relative"
    >
      {/* Degauss Flash Overlay */}
      <AnimatePresence>
        {isDegaussing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="degauss-flash"
          />
        )}
      </AnimatePresence>

      {/* Digital Grid Background */}
      <div 
        style={{ 
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
          transition: 'transform 0.1s ease-out'
        }}
        className="fixed inset-0 digital-grid pointer-events-none opacity-20" 
      />

      {showIntro && (
        <PortalIntro 
          status={status}
          setStatus={setStatus}
          isDark={isDark}
          setIsDark={setIsDark}
        />
      )}

      {/* Windows 95 Desktop */}
      <div ref={desktopRef} className="relative z-10 h-screen p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <DesktopIcon 
            icon={Folder} 
            label="About_Me" 
            onClick={() => setIsAboutOpen(true)} 
            isHighlighted={highlightedIcon === "About_Me"}
          />
          <DesktopIcon 
            icon={BookOpen} 
            label="Digital_Journal" 
            onClick={() => setIsJournalOpen(true)} 
            isHighlighted={highlightedIcon === "Digital_Journal"}
          />
          <DesktopIcon 
            icon={Folder} 
            label="My_Works" 
            onClick={() => setIsGalleryOpen(true)} 
            isHighlighted={highlightedIcon === "My_Works"}
          />
          <DesktopIcon 
            icon={Folder} 
            label="AI_Chat" 
            onClick={() => setIsChatOpen(true)} 
            isHighlighted={highlightedIcon === "AI_Chat"}
          />
        </div>

        <StickyNote 
          desktopRef={desktopRef}
          onGeminiClick={() => {
            setOpLogs(prev => [...prev, "Requesting priority access to AI_Module...", "Opening System_Explorer.exe /root/Featured_Works..."]);
            setIsAlertOpen(true);
          }} 
        />

        <IdentityLabel desktopRef={desktopRef} />

        {/* Windows Manager */}
        <AnimatePresence>
          <FileManagerWindow 
            isOpen={isGalleryOpen} 
            preSelectedProject={selectedProject}
            onClose={() => {
              setIsGalleryOpen(false);
              setMessages(prev => [...prev, { 
                role: "bot", 
                content: "看完這些作品後，你或許會對家羚的邏輯世界 (故事) 好奇，或者想直接確認她的系統參數 (技能)？",
                options: ["1. 許家羚的故事", "3. 系統效能監測 (System Monitor)"]
              }]);
              setIsChatOpen(true);
            }} 
            onSelectProject={(p) => setSelectedProject(p)}
          />
          <IdentityPropertiesWindow 
            isOpen={isAboutOpen} 
            onClose={() => {
              setIsAboutOpen(false);
              setIsChatOpen(true);
            }} 
          />
          <SystemMonitorWindow
            isOpen={isMonitorOpen}
            onClose={() => {
              setIsMonitorOpen(false);
              setIsChatOpen(true);
            }}
          />
          <DigitalJournalWindow
            isOpen={isJournalOpen}
            onClose={() => {
              setIsJournalOpen(false);
              setIsChatOpen(true);
            }}
          />
          <ChatWindow 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)}
            messages={messages}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            isTyping={isTyping}
          />
          <SystemAlertPopup 
            isOpen={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
            onConfirm={() => {
              setIsAlertOpen(false);
              const abaProject = PROJECTS.find(p => p.title.includes("阿爸的家園"));
              setIsGalleryOpen(true);
              if (abaProject) {
                setSelectedProject(abaProject);
              }
            }}
          />
        </AnimatePresence>

        <OperationLogWindow logs={opLogs} />

        {/* Taskbar */}
        <div className="fixed bottom-0 left-0 right-0 h-10 retro-panel flex items-center px-2 gap-2 z-50">
          <button className="retro-btn h-7 px-4 flex items-center gap-2 !text-[12px] font-bold">
            <div className="w-4 h-4 bg-accent rounded-sm" />
            START
          </button>
          
          <div className="h-7 w-[1px] bg-zinc-400 mx-1" />
          
          <button 
            onClick={triggerDegauss}
            className="retro-btn h-7 px-3 flex items-center gap-2 !text-[10px] font-bold"
          >
            <Power className="w-3 h-3" />
            {isDark ? "DAY_MODE" : "NIGHT_MODE"}
          </button>

          <div className="flex-1" />
          <div className="retro-inset h-7 px-4 flex items-center gap-4">
            <Activity className="w-3 h-3 text-black" />
            <span className="text-[10px] font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      {/* Global Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[3000]">
        <div className="scanline opacity-10" />
      </div>
    </div>
  );
}
