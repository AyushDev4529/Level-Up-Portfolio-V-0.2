
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Gamepad2, 
  Code2, 
  Cpu, 
  Trophy, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Sword,
  Flame,
  Skull,
  Gem,
  Wrench,
  Brain,
  Terminal,
  Zap,
  Coffee,
  Headphones,
  Loader2,
  ScanEye,
  Info,
  Play,
  Check
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import StatRadar from './components/StatRadar.tsx';
import ChatConsole from './components/ChatConsole.tsx';
import CommitHeatmap from './components/CommitHeatmap.tsx';
import { Project, Skill, Stat, AppScreen, DIFFICULTY_XP, GithubStats } from './types.ts';
import { githubStats as initialStats } from './githubStats.ts';

// --- Data Constants ---
const STATS: Stat[] = [
  { subject: 'Coding', A: 60, fullMark: 100 },
  { subject: 'Design', A: 75, fullMark: 100 },
  { subject: 'Logic', A: 70, fullMark: 100 },
  { subject: 'Creativity', A: 90, fullMark: 100 },
  { subject: 'Teamwork', A: 85, fullMark: 100 },
  { subject: 'Speed', A: 60, fullMark: 100 },
];

const SKILLS: Skill[] = [
  { name: 'HTML/CSS', level: 65, category: 'Language' },
  { name: 'JavaScript', level: 55, category: 'Language' },
  { name: 'React', level: 50, category: 'Tool' },
  { name: 'C#', level: 30, category: 'Language' },
  { name: 'Unity', level: 10, category: 'Engine' },
  { name: 'Git', level: 70, category: 'Tool' },
  { name: 'Blender', level: 30, category: 'Tool' },
];

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Neon Drifter (Prototype)',
    description: 'A high-speed cyberpunk racing game prototype exploring procedural track generation.',
    tags: ['Unity', 'C#', 'Learning'],
    // Cyberpunk/Neon City Theme
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=600&h=600',
    difficulty: 'Hard'
  },
  {
    id: 'p2',
    title: 'Dungeon Echoes',
    description: 'Roguelite dungeon crawler concept. Working on AI behaviors.',
    tags: ['Unity', 'C#', 'AI'],
    // Dark Fantasy/Dungeon Theme
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=600&h=600',
    difficulty: 'Nightmare'
  },
  {
    id: 'p3',
    title: 'Portfolio Website',
    description: 'Gamified portfolio website built with React and Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    // Code/Tech Theme
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=600&h=600',
    difficulty: 'Medium'
  },
  {
    id: 'p4',
    title: 'Pixel Farm',
    description: 'Relaxing farming simulator concept art and logic planning.',
    tags: ['Game Design', 'Pixel Art'],
    // Nature/Farm Theme
    imageUrl: 'https://images.unsplash.com/photo-1629814696091-643c19b67482?auto=format&fit=crop&q=80&w=600&h=600',
    difficulty: 'Easy'
  }
];

const INVENTORY = [
  { id: 'i1', name: 'Visual Studio Code', type: 'IDE', rarity: 'Legendary', icon: Terminal, desc: '+50 Coding Speed' },
  { id: 'i2', name: 'Unity', type: 'Engine', rarity: 'Epic', icon: Zap, desc: 'Reality Distortion' },
  { id: 'i3', name: 'Git', type: 'Tool', rarity: 'Rare', icon: Github, desc: 'Save Point' },
  { id: 'i4', name: 'React', type: 'Tech', rarity: 'Epic', icon: Code2, desc: 'Component Fabrication' },
  { id: 'i5', name: 'Coffee', type: 'Consumable', rarity: 'Common', icon: Coffee, desc: 'Restore Energy' },
  { id: 'i6', name: 'Lofi Beats', type: 'Buff', rarity: 'Common', icon: Headphones, desc: '+10 Focus' },
];

// --- Helper Functions (Moved outside component for performance) ---

const calculateLevel = (totalXP: number) => {
  if (totalXP < 0) return 1;
  return Math.floor(Math.sqrt(totalXP / 50));
};

const calculateXPForNextLevel = (level: number) => {
  return 50 * Math.pow(level + 1, 2);
};

const calculateXPForCurrentLevel = (level: number) => {
  return 50 * Math.pow(level, 2);
};

const getRarityStyles = (rarity: string) => {
  switch(rarity) {
    case 'Legendary': return { border: 'border-orange-500', shadow: 'shadow-orange-500/50', text: 'text-orange-500', bg: 'bg-orange-950/30' };
    case 'Epic': return { border: 'border-purple-500', shadow: 'shadow-purple-500/50', text: 'text-purple-400', bg: 'bg-purple-950/30' };
    case 'Rare': return { border: 'border-blue-400', shadow: 'shadow-blue-400/50', text: 'text-blue-400', bg: 'bg-blue-950/30' };
    default: return { border: 'border-slate-600', shadow: 'shadow-slate-500/20', text: 'text-slate-400', bg: 'bg-slate-800' };
  }
};

const getSkillRank = (level: number) => {
  if (level >= 90) return { title: 'Legendary', color: 'text-yellow-400', glow: 'shadow-yellow-400/50' };
  if (level >= 75) return { title: 'Master', color: 'text-purple-400', glow: 'shadow-purple-400/50' };
  if (level >= 60) return { title: 'Expert', color: 'text-neon-pink', glow: 'shadow-neon-pink/50' };
  if (level >= 40) return { title: 'Adept', color: 'text-neon-blue', glow: 'shadow-neon-blue/50' };
  if (level >= 20) return { title: 'Apprentice', color: 'text-green-400', glow: 'shadow-green-400/50' };
  return { title: 'Novice', color: 'text-slate-400', glow: 'shadow-slate-400/50' };
};

// --- Sub-components (Moved outside for better React reconciliation) ---

const StartScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-dark-bg relative overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />
    <div className="z-10 text-center space-y-8 px-4">
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue drop-shadow-[0_0_10px_rgba(57,255,20,0.5)] animate-pulse-fast">
        DEV_QUEST
      </h1>
      <p className="text-slate-400 text-lg md:text-xl font-mono tracking-widest">
        PRESS START TO BEGIN
      </p>
      <button 
        onClick={onStart}
        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-neon-green text-neon-green font-bold text-xl uppercase tracking-wider hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
      >
        <Play className="w-6 h-6 fill-current" />
        <span>Start Game</span>
        <div className="absolute -inset-1 bg-neon-green opacity-20 blur group-hover:opacity-40 transition-opacity" />
      </button>
    </div>
  </div>
);

const SkillBar: React.FC<{ skill: Skill; index: number }> = React.memo(({ skill, index }) => {
  const rank = getSkillRank(skill.level);
  
  let Icon = Code2;
  let barColor = 'from-blue-600 to-neon-blue';

  switch(skill.category) {
    case 'Engine': 
      Icon = Zap;
      barColor = 'from-yellow-600 to-yellow-300';
      break;
    case 'Tool':
      Icon = Wrench;
      barColor = 'from-green-600 to-neon-green';
      break;
    case 'Soft':
      Icon = Brain;
      barColor = 'from-pink-600 to-neon-pink';
      break;
  }

  if (skill.name === 'Git' || skill.name === 'Terminal') Icon = Terminal;
  if (skill.name === 'React') Icon = Code2;

  return (
    <div 
      className="relative bg-slate-900/60 border border-slate-700 p-4 rounded-lg group hover:border-white/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-2.5 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-neon-blue/50 group-hover:text-neon-blue transition-colors duration-300 shadow-inner`}>
           <Icon size={24} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-1">
            <h4 className="font-bold text-lg text-slate-200 group-hover:text-white transition-colors tracking-wide">{skill.name}</h4>
            <span className={`text-[10px] font-black uppercase tracking-widest ${rank.color} drop-shadow-sm`}>{rank.title}</span>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
             <span>PROFICIENCY</span>
             <span>{skill.level}%</span>
          </div>
        </div>
      </div>

      <div className="h-3 bg-slate-950 rounded-sm overflow-hidden border border-slate-800 relative">
        <div className="absolute inset-0 w-full h-full flex justify-between px-0.5 z-10 pointer-events-none opacity-30">
           {[...Array(10)].map((_, i) => <div key={i} className="w-[1px] h-full bg-slate-900"></div>)}
        </div>
        <div 
          className={`h-full relative transition-all duration-1000 ease-out bg-gradient-to-r ${barColor} group-hover:brightness-110`}
          style={{ width: `${skill.level}%` }}
        >
            <div className={`absolute right-0 top-0 bottom-0 w-1 bg-white/50 blur-[2px]`} />
        </div>
      </div>
    </div>
  );
});

const ProjectCard: React.FC<{ project: Project }> = React.memo(({ project }) => {
  const xpValue = DIFFICULTY_XP[project.difficulty];

  let themeColor = 'text-neon-green border-neon-green shadow-neon-green/50';
  let cardBorder = 'border-neon-green/50';
  let holoGradient = 'from-transparent via-neon-green/30 to-transparent';

  switch (project.difficulty) {
    case 'Easy':
      themeColor = 'text-neon-green border-neon-green shadow-neon-green/50';
      cardBorder = 'border-neon-green/50';
      holoGradient = 'from-transparent via-neon-green/20 to-transparent';
      break;
    case 'Medium':
      themeColor = 'text-neon-blue border-neon-blue shadow-neon-blue/50';
      cardBorder = 'border-neon-blue/50';
      holoGradient = 'from-transparent via-neon-blue/20 to-transparent';
      break;
    case 'Hard':
      themeColor = 'text-orange-500 border-orange-500 shadow-orange-500/50';
      cardBorder = 'border-orange-500/50';
      holoGradient = 'from-transparent via-orange-500/20 to-transparent';
      break;
    case 'Nightmare':
      themeColor = 'text-red-600 border-red-600 shadow-red-600/50';
      cardBorder = 'border-red-600/50';
      holoGradient = 'from-transparent via-red-600/20 to-transparent';
      break;
  }

  const renderDifficultyIcon = (diff: Project['difficulty']) => {
    switch (diff) {
      case 'Easy': return <Gem size={14} className="fill-current" />;
      case 'Medium': return <Sword size={14} className="fill-current" />;
      case 'Hard': return <Flame size={14} className="fill-current" />;
      case 'Nightmare': return <Skull size={14} className="fill-current" />;
    }
  };

  return (
    <div className={`group relative w-full max-w-[320px] aspect-[2.5/3.5] bg-slate-900 rounded-xl p-3 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10 cursor-default`}>
      <div className={`absolute inset-0 rounded-xl border-4 ${cardBorder} pointer-events-none z-20 group-hover:brightness-150 transition-all`}></div>
      <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg z-0`}></div>
       <div className={`absolute inset-0 rounded-lg bg-gradient-to-tr ${holoGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30 mix-blend-color-dodge`} 
           style={{ backgroundSize: '300% 300%', animation: 'holo-shine 3s infinite linear' }}
      ></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-1.5 px-0.5">
            <span className={`font-bold text-sm uppercase tracking-tighter text-slate-100 drop-shadow-md truncate max-w-[70%]`}>
              {project.title}
            </span>
            <div className={`relative group/tooltip flex items-center gap-1 ${themeColor.split(' ')[0]} cursor-help`}>
                 <span className="text-[9px] font-bold">HP</span>
                 <span className="text-lg font-black leading-none">{Math.round(xpValue * 1000)}</span>
                 {renderDifficultyIcon(project.difficulty)}
                 <div className={`absolute top-full right-0 mt-1 px-2 py-1 bg-slate-900 border ${cardBorder} rounded text-[10px] shadow-xl z-50 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap`}>
                    <span className="text-slate-400 font-bold uppercase mr-1">Difficulty:</span>
                    <span className={`font-black uppercase ${themeColor.split(' ')[0]}`}>{project.difficulty}</span>
                 </div>
            </div>
        </div>

        <div className={`relative w-full aspect-square border-4 ${cardBorder} bg-black shadow-inner mb-2 overflow-hidden group-hover:border-white/80 transition-colors`}>
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              loading="lazy"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600&h=600`;
              }}
            />
            <div className="absolute top-0 left-0 w-2 h-2 bg-white/20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/20"></div>
        </div>

        <div className="flex items-center gap-1 mb-2 bg-slate-950/40 p-1 rounded-sm border border-slate-700/50 shadow-inner">
             <div className="bg-slate-800 text-slate-400 text-[8px] font-bold uppercase px-1 rounded-sm border border-slate-600">Type</div>
             <div className="flex gap-1 flex-wrap">
                {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[9px] font-mono text-slate-300 bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded shadow-sm">
                        {tag}
                    </span>
                ))}
             </div>
        </div>

        <div className="flex-1 bg-slate-100/5 border border-slate-700/30 rounded p-2 mb-2 shadow-inner relative group-hover:bg-slate-100/10 transition-colors">
             <div className="text-[10px] md:text-xs text-slate-300 font-serif leading-tight">
                {project.description}
             </div>
             <div className="absolute bottom-1 right-1 opacity-20 text-[30px] leading-none pointer-events-none">
                {renderDifficultyIcon(project.difficulty)}
             </div>
        </div>

         <div className="flex gap-2 mt-auto">
            {project.demoUrl ? (
                <a href={project.demoUrl} target="_blank" className={`flex-1 text-center py-1.5 text-[10px] font-bold uppercase bg-slate-900 border ${cardBorder} ${themeColor.split(' ')[0]} hover:bg-${themeColor.split(' ')[0]} hover:text-black transition-colors rounded shadow-lg`}>
                    Play
                </a>
            ) : <div className="flex-1 text-center py-1.5 text-[10px] font-bold uppercase bg-slate-950 border border-slate-800 text-slate-600 rounded cursor-not-allowed">WIP</div>}
            
            {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" className="flex-1 text-center py-1.5 text-[10px] font-bold uppercase bg-slate-800 border border-slate-600 text-slate-300 hover:bg-white hover:text-black transition-colors rounded shadow-lg">
                    Code
                </a>
            )}
         </div>
         
         <div className="flex justify-between text-[8px] text-slate-600 font-mono mt-1 px-1">
            <span>{project.id.toUpperCase()}</span>
            <span>{project.difficulty.substring(0,3).toUpperCase()} // 2025</span>
         </div>
      </div>
    </div>
  );
});

// --- Main Component ---

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [activeTab, setActiveTab] = useState<AppScreen>(AppScreen.START);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  
  // State for item inspector
  const [hoveredItem, setHoveredItem] = useState<any | null>(null);

  // --- GitHub Stats State ---
  const [stats, setStats] = useState<GithubStats>(() => {
    // Defensive initialization
    if (!initialStats) {
      return {
        totalCommits: 0,
        totalRepos: 0,
        totalStars: 0,
        monthlyStreak: false,
        lastUpdated: new Date().toISOString(),
        history: []
      };
    }
    return {
      ...initialStats,
      history: initialStats.history || []
    };
  });

  // --- Live Fetch GitHub Data ---
  useEffect(() => {
    if (!gameStarted) return;

    const fetchLiveUpdates = async () => {
      try {
        const username = 'AyushDev4529';
        // Use a publicly available proxy or GitHub API directly (limited rate without auth, but works for events)
        const response = await fetch(`https://api.github.com/users/${username}/events?per_page=30`);
        if (!response.ok) return;
        
        const events = await response.json();
        
        // Calculate new commits since last static update
        const lastUpdatedTime = new Date(stats.lastUpdated).getTime();
        let newCommits = 0;
        const newHistory = [...stats.history];

        // Process events
        if (Array.isArray(events)) {
            events.forEach((event: any) => {
                const eventTime = new Date(event.created_at).getTime();
                
                // Only count if it's newer than our static snapshot
                if (eventTime > lastUpdatedTime && event.type === 'PushEvent') {
                    const commitCount = event.payload.size || 1;
                    newCommits += commitCount;

                    // Update History Day
                    const dateStr = event.created_at.split('T')[0];
                    const existingDay = newHistory.find(d => d.date === dateStr);
                    if (existingDay) {
                        existingDay.count += commitCount;
                    } else {
                        newHistory.push({ date: dateStr, count: commitCount });
                    }
                }
            });
        }

        if (newCommits > 0) {
            setStats(prev => ({
                ...prev,
                totalCommits: prev.totalCommits + newCommits,
                history: newHistory,
                lastUpdated: new Date().toISOString()
            }));
        }

      } catch (e) {
        console.error("Failed to fetch live GitHub stats", e);
      }
    };

    fetchLiveUpdates();
  }, [gameStarted]);

  // --- XP System ---
  const currentXP = useMemo(() => {
    const commitsXP = stats.totalCommits * 0.1;
    const reposXP = stats.totalRepos * 5;
    const starsXP = stats.totalStars * 0.2;
    const projectsXP = PROJECTS.reduce((acc, p) => acc + DIFFICULTY_XP[p.difficulty], 0);
    
    return Math.floor(commitsXP + reposXP + starsXP + projectsXP);
  }, [stats]);

  const level = calculateLevel(currentXP);
  const nextLevelXP = calculateXPForNextLevel(level);
  const currentLevelBaseXP = calculateXPForCurrentLevel(level);
  const xpProgress = Math.min(100, Math.max(0, ((currentXP - currentLevelBaseXP) / (nextLevelXP - currentLevelBaseXP)) * 100));

  // --- Handlers ---

  const handleStart = () => {
    setGameStarted(true);
    setActiveTab(AppScreen.HUB);
  };

  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // --- HEADER ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(44, 62, 80);
    doc.text("AYUSH SINGH", 20, yPos);
    yPos += 8;

    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text("JUNIOR DEVELOPER", 20, yPos);
    yPos += 10;

    // --- CONTACT ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text(`Email: gamedev4529@gmail.com | Phone: 7982138425`, 20, yPos);
    yPos += 5;
    doc.text(`Location: Uttam Nagar, New Delhi - 110059 | Portfolio: github.com/AyushDev4529`, 20, yPos);
    yPos += 8;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;

    // --- SUMMARY ---
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const summary = "Software Developer with a strong foundation in Computer Science, experience in frontend web development (HTML, CSS, JavaScript, React), and ongoing specialization in Unity and C# game development. Proven adaptability through roles in customer service and billing operations. Seeking an opportunity in Software Engineering, Frontend Development, or Game Development to build innovative digital solutions.";
    const splitSummary = doc.splitTextToSize(summary, 170);
    doc.text(splitSummary, 20, yPos);
    yPos += (splitSummary.length * 5) + 5;

    // --- EDUCATION ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.text("EDUCATION", 20, yPos);
    yPos += 6;

    doc.setFontSize(10);
    // B.Tech
    doc.setFont("helvetica", "bold");
    doc.text("B.Tech in Computer Science Engineering", 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.text("2020 - 2024", 170, yPos, { align: 'right' });
    yPos += 5;
    doc.text("Dronacharya College of Engineering", 20, yPos);
    yPos += 6;

    // Class 12
    doc.setFont("helvetica", "bold");
    doc.text("Class 12 (Senior Secondary)", 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.text("2018 - 2019", 170, yPos, { align: 'right' });
    yPos += 5;
    doc.text("Sanjeevani Public School", 20, yPos);
    yPos += 10;

    // --- SKILLS ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.text("TECHNICAL SKILLS", 20, yPos);
    yPos += 6;

    doc.setFontSize(10);
    const skills = [
      { cat: "Programming", val: "C#, JavaScript, HTML, CSS" },
      { cat: "Frameworks & Tools", val: "React.js, Unity, Git, GitHub, VS Code" },
      { cat: "Expertise", val: "UI/UX Basics, Responsive Web Design, Game Mechanics, OOP" },
      { cat: "Languages", val: "English, Hindi" }
    ];

    skills.forEach(skill => {
        doc.setFont("helvetica", "bold");
        doc.text(`${skill.cat}:`, 20, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(skill.val, 65, yPos);
        yPos += 5;
    });
    yPos += 5;

    // --- EXPERIENCE ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.text("EXPERIENCE", 20, yPos);
    yPos += 6;

    // Job 1
    doc.setFontSize(11);
    doc.text("Billing Executive", 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("2025 - Present", 170, yPos, { align: 'right' });
    yPos += 5;
    doc.setFont("helvetica", "italic");
    doc.text("Om Infra Projects | New Delhi, India", 20, yPos);
    yPos += 6;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const job1Bullets = [
      "Managing billing workflows, documentation, and financial data accuracy.",
      "Coordinating with project teams for timely verification and updates.",
      "Improved data consistency and streamlined record-keeping processes."
    ];
    job1Bullets.forEach(b => {
        doc.text(`• ${b}`, 25, yPos);
        yPos += 5;
    });
    yPos += 4;

    // Job 2
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(44, 62, 80);
    doc.text("Customer Service Executive", 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("2024 - 2025", 170, yPos, { align: 'right' });
    yPos += 5;
    doc.setFont("helvetica", "italic");
    doc.text("Manohar Filaments Pvt. Ltd. | New Delhi, India", 20, yPos);
    yPos += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const job2Bullets = [
      "Processed and managed brand orders in SAP, ensuring accuracy in specifications.",
      "Coordinated directly with major clients like Fila, Adidas, Puma, and BlackBerry.",
      "Worked with Product/Production teams to resolve issues and track manufacturing.",
      "Ensured on-time delivery by monitoring workflow with logistics teams.",
      "Maintained 5S standards and supported cross-functional teamwork."
    ];
    job2Bullets.forEach(b => {
        const splitBullet = doc.splitTextToSize(`• ${b}`, 165);
        doc.text(splitBullet, 25, yPos);
        yPos += (splitBullet.length * 4) + 1;
    });
    yPos += 4;

    // --- PROJECTS ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.text("PROJECTS", 20, yPos);
    yPos += 6;

    // Project 1
    doc.setFontSize(11);
    doc.text("Meeting App Zoom Clone", 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("2020 - 2024", 170, yPos, { align: 'right' });
    yPos += 5;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const projBullets = [
      "Developed a meeting application supporting peer-to-peer video/audio using WebRTC.",
      "Used Socket.io for real-time signaling and managing multiple participants.",
      "Integrated features like mute/unmute, camera toggle, chat, and unique room IDs.",
      "Built with React.js, modular components, and responsive design principles.",
      "Deployed the production build on Vercel with optimized performance."
    ];
    projBullets.forEach(b => {
        const splitBullet = doc.splitTextToSize(`• ${b}`, 165);
        doc.text(splitBullet, 25, yPos);
        yPos += (splitBullet.length * 4) + 1;
    });

    doc.save('Ayush_Singh_Resume.pdf');
  };

  const handleDownloadResume = () => {
    if (downloadProgress !== null || downloadSuccess) return;
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev === null) return 0;
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          generateAndDownloadPDF();
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 3000);
          return null;
        }
        return next;
      });
    }, 150); // Slightly faster animation
  };

  if (!gameStarted) {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-slate-200 font-mono flex flex-col relative overflow-x-hidden">
      
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />

      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur border-b border-slate-700 shadow-lg">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 md:gap-0">
          
          <div className="flex flex-col gap-2 order-1 w-full md:w-auto">
            <div 
              className="flex items-center gap-3 cursor-pointer group transition-all"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <div className="relative">
                   <div className="w-12 h-12 bg-slate-800 rounded-lg border-2 border-neon-green flex items-center justify-center shadow-[0_0_10px_rgba(57,255,20,0.3)] group-hover:border-neon-blue group-hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all duration-300">
                     <Gamepad2 className="text-neon-green w-8 h-8 group-hover:text-neon-blue transition-colors duration-300" />
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-2 border-slate-900 group-hover:bg-neon-blue transition-colors duration-300" />
                </div>
                <div>
                  <h1 className="font-bold text-lg md:text-xl tracking-wider text-white">AYUSH SINGH</h1>
                  <div className="text-xs text-neon-green font-bold">LVL {level} DEV</div>
                </div>
            </div>
            
            <div className="w-64 group relative">
               <div className="text-[10px] text-slate-400 font-bold mb-1 flex justify-between gap-2">
                  <span>XP: {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()}</span>
                  <span className="text-neon-green">+{Math.round(stats.totalCommits * 0.1 + stats.totalStars * 0.2)} (Recent)</span>
               </div>
               <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div 
                    className="h-full bg-gradient-to-r from-green-600 to-neon-green shadow-[0_0_10px_rgba(57,255,20,0.5)] transition-all duration-1000 ease-out"
                    style={{ width: `${xpProgress}%` }}
                  />
               </div>
                
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-600 rounded p-3 text-xs shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                   <div className="font-bold text-white mb-2 border-b border-slate-700 pb-1">XP Breakdown</div>
                   <div className="space-y-1 text-slate-300">
                      <div className="flex justify-between"><span>Commits (0.1xp):</span> <span className="text-neon-green">+{Math.round(stats.totalCommits * 0.1)}</span></div>
                      <div className="flex justify-between"><span>Repos (5xp):</span> <span className="text-neon-blue">+{stats.totalRepos * 5}</span></div>
                      <div className="flex justify-between"><span>Stars (0.2xp):</span> <span className="text-yellow-400">+{Math.round(stats.totalStars * 0.2)}</span></div>
                      <div className="flex justify-between"><span>Projects:</span> <span className="text-purple-400">+{PROJECTS.reduce((acc, p) => acc + DIFFICULTY_XP[p.difficulty], 0)}</span></div>
                   </div>
                </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-end order-3 md:order-last mt-2 md:mt-0">
            
             <button 
              onClick={handleDownloadResume}
              disabled={downloadProgress !== null || downloadSuccess}
              className={`md:hidden flex items-center gap-2 border px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer order-2 ${
                  downloadSuccess 
                    ? 'bg-green-900/30 border-green-500 text-green-400' 
                    : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-white'
                }`}
            >
              {downloadProgress !== null ? (
                 <>
                   <Loader2 size={16} className="animate-spin text-neon-blue" />
                   <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden relative">
                     <div className="absolute top-0 left-0 h-full bg-neon-blue transition-all duration-200" style={{ width: `${downloadProgress}%` }} />
                   </div>
                 </>
              ) : downloadSuccess ? (
                 <>
                   <Check size={16} />
                   <span>Saved!</span>
                 </>
              ) : (
                 <>
                   <Download size={16} className="text-neon-blue" />
                   <span>Resume.pdf</span>
                 </>
              )}
            </button>

            <button 
              onClick={handleDownloadResume}
              disabled={downloadProgress !== null || downloadSuccess}
              className={`hidden md:flex items-center gap-2 border px-4 py-2 rounded text-sm font-bold transition-colors cursor-pointer order-1 ${
                   downloadSuccess 
                    ? 'bg-green-900/30 border-green-500 text-green-400' 
                    : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-white'
                }`}
            >
              {downloadProgress !== null ? (
                 <>
                   <Loader2 size={16} className="animate-spin text-neon-blue" />
                   <span className="text-xs text-neon-blue">Downloading {downloadProgress}%</span>
                   <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden relative">
                     <div className="absolute top-0 left-0 h-full bg-neon-blue transition-all duration-200" style={{ width: `${downloadProgress}%` }} />
                   </div>
                 </>
              ) : downloadSuccess ? (
                 <>
                   <Check size={16} />
                   <span>Resume Downloaded!</span>
                 </>
              ) : (
                 <>
                   <Download size={16} className="text-neon-blue" />
                   <span>Resume.pdf</span>
                 </>
              )}
            </button>

            <div className="flex gap-2 border-l border-slate-700 pl-4 md:pl-6 order-3 md:order-2">
              <a href="https://github.com/AyushDev4529" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded hover:bg-slate-700 hover:text-white transition-colors relative group">
                <Github size={18} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
              </a>
              <a href="https://www.linkedin.com/in/ayush-singh-3296b6382?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded hover:bg-slate-700 hover:text-blue-400 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:gamedev4529@gmail.com" className="p-2 bg-slate-800 rounded hover:bg-slate-700 hover:text-red-400 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-52 md:pt-40 pb-20 flex-1 flex flex-col gap-8 z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="w-full h-80">
               <StatRadar data={STATS} />
            </div>
            
            <div className="w-full h-80">
               <CommitHeatmap history={stats.history} streak={stats.monthlyStreak} />
            </div>

            <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl shadow-xl w-full h-80 flex flex-col overflow-hidden">
               <div className="p-4 border-b border-slate-700 flex justify-between items-center shrink-0">
                 <h3 className="text-neon-pink font-bold uppercase tracking-widest text-sm">Inventory</h3>
                 <button 
                   onClick={() => setShowInventory(!showInventory)}
                   className="text-[10px] text-slate-500 hover:text-white"
                 >
                   {showInventory ? 'COLLAPSE' : 'EXPAND'}
                 </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                 <div className="flex flex-wrap gap-4 justify-start content-start">
                    {INVENTORY.map((item) => {
                       const style = getRarityStyles(item.rarity);
                       const isHovered = hoveredItem?.id === item.id;
                       return (
                         <div 
                           key={item.id}
                           onMouseEnter={() => setHoveredItem(item)}
                           onMouseLeave={() => setHoveredItem(null)}
                           className={`relative w-12 h-12 bg-slate-800 rounded-lg border-2 ${isHovered ? 'border-white scale-110 z-10' : style.border} flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg`}
                         >
                            <item.icon size={20} className={style.text} />
                         </div>
                       );
                    })}
                    
                    {[...Array(4)].map((_, i) => (
                       <div key={`empty-${i}`} className="w-12 h-12 bg-slate-900/50 rounded-lg border border-slate-800 flex items-center justify-center opacity-50">
                          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                       </div>
                    ))}
                 </div>
               </div>
               
               <div className="h-24 bg-slate-950 border-t border-slate-700 p-3 shrink-0 flex gap-3 items-center transition-opacity duration-300">
                  {hoveredItem ? (
                     <>
                        <div className={`w-12 h-12 rounded-lg border-2 ${getRarityStyles(hoveredItem.rarity).border} bg-slate-900 flex items-center justify-center shrink-0`}>
                            <hoveredItem.icon size={20} className={getRarityStyles(hoveredItem.rarity).text} />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className={`font-bold text-sm ${getRarityStyles(hoveredItem.rarity).text}`}>{hoveredItem.name}</div>
                           <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-0.5">{hoveredItem.type} &bull; {hoveredItem.rarity}</div>
                           <div className="text-[10px] text-slate-300 leading-tight truncate">{hoveredItem.desc}</div>
                        </div>
                     </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs italic gap-2">
                       <Info size={14} />
                       <span>Hover over an item to inspect</span>
                    </div>
                  )}
               </div>
            </div>
        </div>

        <div className="w-full space-y-8">
          
          <nav className="flex gap-4 border-b border-slate-700 pb-1 overflow-x-auto">
            {[
              { id: AppScreen.HUB, label: 'Abilities', icon: Cpu },
              { id: AppScreen.RESUME, label: 'Quests', icon: Trophy },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'border-neon-green text-neon-green bg-gradient-to-t from-neon-green/10 to-transparent' 
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="min-h-[500px]">
            {activeTab === AppScreen.HUB && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Cpu className="text-neon-blue" />
                  Skill Tree
                </h2>
                
                <div className="space-y-8">
                   {['Language', 'Engine', 'Tool'].map(cat => {
                      const catSkills = SKILLS.filter(s => s.category === cat).sort((a,b) => b.level - a.level);
                      if (catSkills.length === 0) return null;
                      
                      return (
                        <div key={cat}>
                          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 border-l-2 border-slate-700 pl-3">{cat}s</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {catSkills.map((skill, idx) => (
                              <SkillBar key={skill.name} skill={skill} index={idx} />
                            ))}
                          </div>
                        </div>
                      );
                   })}
                </div>
              </div>
            )}

            {activeTab === AppScreen.RESUME && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Trophy className="text-yellow-500" />
                      Quest Log
                    </h2>
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Total: {PROJECTS.length}</span>
                 </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center md:place-items-start">
                  {PROJECTS.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </main>

      <ChatConsole />

    </div>
  );
};

export default App;
