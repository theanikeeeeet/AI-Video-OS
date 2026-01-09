
import React from 'react';
import { VideoInsights } from '../types.ts';

interface Props {
  insights: VideoInsights;
}

const InsightPanel: React.FC<Props> = ({ insights }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-neutral-900/30 border border-white/5 p-8 rounded-[2.5rem] text-center backdrop-blur-3xl shadow-2xl">
          <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.3em] block mb-3">Hook Score</span>
          <div className="text-4xl font-black text-blue-500 tracking-tighter italic uppercase">{insights.hookScore}%</div>
        </div>
        <div className="bg-neutral-900/30 border border-white/5 p-8 rounded-[2.5rem] text-center backdrop-blur-3xl shadow-2xl">
          <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.3em] block mb-3">Viral Index</span>
          <div className="text-4xl font-black text-white tracking-tighter italic uppercase">{insights.viralPotential}%</div>
        </div>
      </div>
      <div className="bg-blue-600/5 border border-blue-500/10 px-8 py-5 rounded-[1.8rem] flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">High Performance Forecast</span>
        </div>
      </div>
    </div>
  );
};

export default InsightPanel;
