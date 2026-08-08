import React from 'react';
import { Project, Skill } from '../types';

interface ResumePrintViewProps {
  skills: Skill[];
  projects: Project[];
}

const ResumePrintView: React.FC<ResumePrintViewProps> = ({ skills, projects }) => {
  return (
    <div id="resume-print-view" className="hidden w-full h-auto bg-white text-black max-w-[210mm] mx-auto">
      
      {/* LEFT SIDEBAR - Dark Blue/Slate */}
      <aside className="w-[35%] bg-[#2c3e50] text-white p-6 flex flex-col gap-8 print:bg-[#2c3e50] print:text-white">
        
        {/* Profile Image */}
        <div className="flex justify-center mb-2">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg relative">
             <img 
               src="https://github.com/AyushDev4529.png" 
               alt="Ayush Singh" 
               className="w-full h-full object-cover"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Ayush+Singh&background=random&size=128';
               }}
             />
          </div>
        </div>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-bold uppercase border-b border-white/30 pb-2 mb-4">Contact</h2>
          <div className="space-y-4 text-sm font-light">
            <div>
              <div className="font-bold text-white/70 text-xs uppercase mb-1">Phone</div>
              <div>7982138425</div>
            </div>
            <div>
              <div className="font-bold text-white/70 text-xs uppercase mb-1">Email</div>
              <div className="break-words">gamedev4529@gmail.com</div>
            </div>
             <div>
              <div className="font-bold text-white/70 text-xs uppercase mb-1">Portfolio</div>
              <div className="break-words">To be Updated</div>
            </div>
            <div>
              <div className="font-bold text-white/70 text-xs uppercase mb-1">Address</div>
              <div>Uttam Nagar, New Delhi<br/>110059, Delhi</div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold uppercase border-b border-white/30 pb-2 mb-4">Education</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-white/60 text-xs mb-1">2020 - 2024</div>
              <div className="font-bold">B.Tech in Computer Science Engineering</div>
              <div className="text-white/80 italic">Dronacharya College of Engineering</div>
            </div>
            <div>
              <div className="text-white/60 text-xs mb-1">2018 - 2019</div>
              <div className="font-bold">Class 12 (Senior Secondary)</div>
              <div className="text-white/80 italic">Sanjeevani Public School</div>
            </div>
          </div>
        </section>

        {/* Technical & Commercial Skills */}
        <section>
          <h2 className="text-xl font-bold uppercase border-b border-white/30 pb-2 mb-4">Skills & Expertise</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-bold text-white/90 mb-1">Operations & Compliance</div>
              <ul className="list-disc list-inside text-white/80 marker:text-white/50 space-y-1">
                 <li>SAP ERP Operations</li>
                 <li>Compliance Management</li>
                 <li>B2B Customer Relations</li>
                 <li>Client Problem Solving</li>
                 <li>Intermediate Excel</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-white/90 mb-1">Programming & Game Dev</div>
              <ul className="list-disc list-inside text-white/80 marker:text-white/50 space-y-1">
                 <li>C#</li>
                 <li>Unity</li>
                 <li>Game Mechanics & OOP</li>
                 <li>Git, GitHub</li>
                 <li>VS Code</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Language */}
        <section>
          <h2 className="text-xl font-bold uppercase border-b border-white/30 pb-2 mb-4">Language</h2>
          <ul className="text-sm space-y-1 text-white/80">
            <li>English</li>
            <li>Hindi</li>
          </ul>
        </section>

      </aside>

      {/* RIGHT CONTENT - White */}
      <main className="flex-1 p-8 flex flex-col gap-6 text-slate-800">
        
        {/* Header */}
        <header className="mb-4">
          <h1 className="text-5xl font-bold uppercase tracking-wide text-[#2c3e50] mb-2">Ayush Singh</h1>
          <div className="text-2xl tracking-[0.2em] uppercase text-slate-500">Compliance Executive</div>
          <p className="mt-6 text-sm leading-relaxed text-slate-600 text-justify">
            Detail-oriented Compliance and Operations professional with hands-on experience navigating complex enterprise environments. Proven track record of operating SAP to process orders, managing B2B customer relations, and ensuring regulatory compliance for major infrastructure projects. Equipped with a strong technical foundation in Computer Science, bringing an analytical, problem-solving approach to workflow efficiency, client communications, and operational data management.
          </p>
        </header>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold uppercase text-[#2c3e50] border-b-2 border-slate-200 pb-2 mb-6">Experience</h2>
          
          <div className="relative border-l-2 border-slate-300 pl-6 space-y-8 ml-2">
            
            {/* Job 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#2c3e50] bg-white"></div>
              <div className="flex items-baseline justify-between mb-1">
                 <h3 className="font-bold text-lg">Compliance Manager</h3>
                 <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">2025 - Present</span>
              </div>
              <div className="text-slate-500 italic text-sm mb-2">Om Infra Shrey India Pvt. Ltd. (Acquired Om Infra Projects, April 2026) | New Delhi</div>
              <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-1 marker:text-slate-400">
                <li>Manage regulatory compliance, billing workflows, and documentation for large-scale infrastructure operations.</li>
                <li>Interact directly with major B2B enterprise clients, including Larsen & Toubro (L&T) and Tata Projects Ltd (TPL), to ensure project requirements are met.</li>
                <li>Utilize intermediate Excel to maintain financial data accuracy, generate reports, and streamline complex record-keeping processes.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#2c3e50] bg-white"></div>
              <div className="flex items-baseline justify-between mb-1">
                 <h3 className="font-bold text-lg">Customer Service Executive</h3>
                 <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">2024 - 2025</span>
              </div>
              <div className="text-slate-500 italic text-sm mb-2">Manohar Filaments Pvt. Ltd. | New Delhi, India</div>
              <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-1 marker:text-slate-400">
                <li>Operated SAP to manually place orders and process brand requests, ensuring total accuracy in specifications and delivery timelines.</li>
                <li>Managed and interacted directly with major B2B clients, including Fila, Ducati, Adidas, and Puma, addressing inquiries and solving operational problems.</li>
                <li>Maintained strong customer relations by serving as the primary communication bridge between external clients and internal production teams.</li>
                <li>Monitored dispatch and logistics workflows to track manufacturing progress and guarantee on-time delivery.</li>
              </ul>
            </div>

            {/* Project 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#2c3e50] bg-white"></div>
              <div className="flex items-baseline justify-between mb-1">
                 <h3 className="font-bold text-lg underline decoration-slate-300 underline-offset-4">Technical Project - Kitchen Chaos (3D Game)</h3>
                 <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">2025 - 2026</span>
              </div>
              <div className="text-slate-500 italic text-sm mb-2">Personal Development Portfolio</div>
              <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-1 marker:text-slate-400">
                <li>Developed a fully playable 3D game environment utilizing the Unity Engine and C# scripting.</li>
                <li>Implemented core object-oriented programming (OOP) concepts to manage game states, player mechanics, and user interfaces.</li>
                <li>Demonstrated highly analytical problem-solving skills and the ability to independently master complex software ecosystems.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Reference */}
        <section className="mt-auto">
           <h2 className="text-2xl font-bold uppercase text-[#2c3e50] border-b-2 border-slate-200 pb-2 mb-4">Reference</h2>
           <p className="text-sm text-slate-500 italic">Available upon request.</p>
        </section>

      </main>
    </div>
  );
};

export default ResumePrintView;