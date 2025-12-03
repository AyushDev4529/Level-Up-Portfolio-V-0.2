import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ScanEye } from 'lucide-react';
import { Stat } from '../types';

interface StatRadarProps {
  data: Stat[];
}

const StatRadar: React.FC<StatRadarProps> = ({ data }) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl shadow-xl overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-700 flex items-center gap-2 shrink-0">
        <ScanEye size={16} className="text-neon-blue" />
        <span className="text-neon-blue font-bold uppercase tracking-widest text-sm">
          Player Stats
        </span>
      </div>
      
      <div className="flex-1 w-full min-h-0 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Dev"
              dataKey="A"
              stroke="#39ff14"
              strokeWidth={2}
              fill="#39ff14"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatRadar;