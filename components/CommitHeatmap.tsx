
import React, { useMemo } from 'react';
import { Activity } from 'lucide-react';
import { ContributionDay } from '../types';

interface CommitHeatmapProps {
  history: ContributionDay[];
  streak: boolean;
}

const CommitHeatmap: React.FC<CommitHeatmapProps> = ({ history, streak }) => {
  
  const { days, totalMonthCommits, monthName, isOnline, currentYear } = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed

    // Get number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Get the day of the week the month starts on (0=Sun, 1=Mon, ...)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Helper to format date YYYY-MM-DD
    const formatDate = (day: number) => {
      const d = String(day).padStart(2, '0');
      const m = String(currentMonth + 1).padStart(2, '0');
      return `${currentYear}-${m}-${d}`;
    };

    const getCountForDate = (dateStr: string) => {
      if (!history) return 0;
      const dayStat = history.find(h => h.date === dateStr);
      return dayStat ? dayStat.count : 0;
    };

    const getIntensity = (count: number) => {
      if (count === 0) return 0;
      if (count <= 1) return 1;
      if (count <= 3) return 2;
      if (count <= 5) return 3;
      return 4;
    };

    const daysList = [];
    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysList.push(null);
    }
    
    // Add actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatDate(d);
      const count = getCountForDate(dateStr);
      daysList.push({
        day: d,
        date: dateStr,
        count,
        intensity: getIntensity(count)
      });
    }

    // Pad the rest of the grid to ensure 6 rows (7 * 6 = 42 cells) to maintain consistent height
    const totalCells = 42;
    while (daysList.length < totalCells) {
      daysList.push(null);
    }

    const totalMonthCommits = daysList.reduce((acc, curr) => acc + (curr ? curr.count : 0), 0);
    const monthName = today.toLocaleString('default', { month: 'long' });
    const isOnline = totalMonthCommits > 0 || streak;

    return { days: daysList, totalMonthCommits, monthName, isOnline, currentYear };
  }, [history, streak]);

  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl shadow-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
            <Activity size={16} className={`text-neon-green ${isOnline ? 'animate-pulse' : ''}`} />
            <span className="text-neon-green font-bold uppercase tracking-widest text-sm">
            Source_Activity
            </span>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {monthName} {currentYear}
        </div>
      </div>
      
      {/* Content Body - Forces grid to take available space between header and footer */}
      <div className="flex-1 p-2 min-h-0">
         <div className="grid grid-cols-7 grid-rows-6 gap-1 w-full h-full">
            {days.map((day, idx) => {
                // Render empty/placeholder slots
                if (!day) {
                    return <div key={`empty-${idx}`} className="bg-slate-800/20 rounded border border-slate-800/40 relative flex items-center justify-center opacity-30">
                        {/* Tiny decorative dot for empty space */}
                        <div className="w-0.5 h-0.5 bg-slate-600 rounded-full"></div>
                    </div>;
                }

                let bgClass = 'bg-slate-800/60 border-slate-700/50';
                let content = <div className="text-[8px] text-slate-700 font-mono select-none">+</div>;
                
                // Opacity-based gradient for smoother transition using theme color
                if (day.intensity > 0) {
                     content = null;
                }
                if (day.intensity === 1) bgClass = 'bg-neon-green/20 border-neon-green/30';
                if (day.intensity === 2) bgClass = 'bg-neon-green/40 border-neon-green/50';
                if (day.intensity === 3) bgClass = 'bg-neon-green/70 border-neon-green/80 shadow-[0_0_5px_rgba(57,255,20,0.3)]';
                if (day.intensity === 4) bgClass = 'bg-neon-green border-white shadow-[0_0_15px_rgba(57,255,20,0.6)]';

                return (
                    <div 
                        key={day.date}
                        className={`rounded border flex items-center justify-center transition-all duration-300 relative group cursor-default ${bgClass}`}
                    >
                        {content}
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 border border-slate-600 rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-lg">
                            {day.count} contributions on {day.date}
                        </div>
                    </div>
                );
            })}
         </div>
      </div>
      
      {/* Footer Stats - Fixed height, never hidden */}
      <div className="p-2 border-t border-slate-800 text-center shrink-0 flex justify-between items-center px-4">
         <div className="text-[10px] text-slate-500 font-mono">
            Total: <span className="text-neon-green font-bold">{totalMonthCommits}</span>
         </div>
         <div className="text-[10px] font-mono flex items-center gap-1">
             <span className="text-slate-500">UPLINK STATUS:</span>
             <span className={isOnline ? "text-neon-green font-bold animate-pulse" : "text-amber-500 font-bold"}>
                 {isOnline ? 'ESTABLISHED' : 'SEARCHING...'}
             </span>
         </div>
      </div>
    </div>
  );
};

export default CommitHeatmap;
