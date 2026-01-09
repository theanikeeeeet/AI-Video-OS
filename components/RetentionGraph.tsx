
import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
  data: { time: number; value: number }[];
  currentTime: number;
}

const RetentionGraph: React.FC<Props> = ({ data, currentTime }) => {
  return (
    <div className="w-full bg-neutral-900/20 rounded-[2.5rem] p-8 border border-white/5 backdrop-blur-3xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-3">Audience Pulse</h3>
          <p className="text-[14px] text-white/80 font-medium max-w-xs">Engagement is high through the hook; viewers are locked in until the 6s transition.</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[9px] font-black px-3 py-1 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 uppercase tracking-widest">Stable</span>
        </div>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '11px', padding: '12px', fontWeight: 'bold' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorPulse)" 
              strokeWidth={4}
              animationDuration={2000}
            />
            <ReferenceLine x={currentTime} stroke="#fff" strokeWidth={1} strokeDasharray="6 6" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RetentionGraph;
