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
             {/* Using GitHub avatar as placeholder since exact image isn't available, or a generic placeholder */}
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

        {/* Technical Skills */}
        <section>
          <h2 className="text-xl font-bold uppercase border-b border-white/30 pb-2 mb-4">Technical Skills</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-bold text-white/90 mb-1">Programming</div>
              <ul className="list-disc list-inside text-white/80 marker:text-white/50 space-y-1">
                 <li>C#</li>
                 <li>JavaScript</li>
                 <li>HTML</li>
                 <li>CSS</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-white/90 mb-1">Frameworks & Tools</div>
              <ul className="list-disc list-inside text-white/80 marker:text-white/50 space-y-1">
                 <li>React.js</li>
                 <li>Unity</li>
                 <li>Git, GitHub</li>
                 <li>VS Code</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-white/90 mb-1">Expertise</div>
              <ul className="list-disc list-inside text-white/80 marker:text-white/50 space-y-1">
                 <li>UI/UX Basics</li>
                 <li>Responsive Web Design</li>
                 <li>Game Mechanics</li>
                 <li>OOP</li>
                 <li>Problem Solving</li>
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
          <div className="text-2xl tracking-[0.2em] uppercase text-slate-500">Junior Developer</div>
          <p className="mt-6 text-sm leading-relaxed text-slate-600 text-justify">
            Software Developer with a strong foundation in Computer Science, experience in frontend web
            development (HTML, CSS, JavaScript, React), and ongoing specialization in Unity and C# game
            development. Proven adaptability through roles in customer service and billing operations. Seeking
            an opportunity in Software Engineering, Frontend Development, or Game Development to build
            innovative digital solutions.
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
                 <h3 className="font-bold text-lg">Billing Executive</h3>
                 <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">2025 - Present</span>
              </div>
              <div className="text-slate-500 italic text-sm mb-2">Om Infra Projects | New Delhi, India</div>
              <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-1 marker:text-slate-400">
                <li>Managing billing workflows, documentation, and financial data accuracy.</li>
                <li>Coordinating with project teams for timely verification and updates.</li>
                <li>Improved data consistency and streamlined record-keeping processes.</li>
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
                <li>Processed and managed brand orders in SAP, ensuring accuracy in specifications, quantities, and delivery timelines.</li>
                <li>Coordinated directly with major clients like Fila, Adidas, Puma, and BlackBerry, handling communication and order updates over email.</li>
                <li>Worked with Product Development and Production teams to resolve product issues, approve samples, and track manufacturing progress.</li>
                <li>Ensured on-time delivery by monitoring workflow and following up with production, dispatch, and logistics teams.</li>
                <li>Maintained 5S standards and supported cross-functional teamwork to improve efficiency and reduce errors.</li>
              </ul>
            </div>

            {/* Project 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#2c3e50] bg-white"></div>
              <div className="flex items-baseline justify-between mb-1">
                 <h3 className="font-bold text-lg underline decoration-slate-300 underline-offset-4">Project - Meeting App Zoom Clone</h3>
                 <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">2020 - 2024</span>
              </div>
              <div className="text-slate-500 italic text-sm mb-2">Dronacharya College of Engineering</div>
              <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-1 marker:text-slate-400">
                <li>Developed a fully functional meeting application supporting peer-to-peer video/audio calls using WebRTC.</li>
                <li>Used Socket.io for real-time signaling and managing multiple participants in a single room.</li>
                <li>Integrated features like mute/unmute, camera toggle, chat, and unique room IDs.</li>
                <li>Built with React.js, modular components, and responsive design principles for a smooth UX.</li>
                <li>Deployed the production build on Vercel with optimized performance and secure routing.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Reference */}
        <section className="mt-auto">
           <h2 className="text-2xl font-bold uppercase text-[#2c3e50] border-b-2 border-slate-200 pb-2 mb-4">Reference</h2>
           <p className="text-sm text-slate-500 italic">To be Updated ...</p>
        </section>

      </main>
    </div>
  );
};

export default ResumePrintView;