
import React from 'react';
import { Scene } from '../types.ts';

interface Props {
  scenes: Scene[];
  currentTime: number;
  onSceneClick: (time: number) => void;
}

const SceneCards: React.FC<Props> = ({ scenes, currentTime, onSceneClick }) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory">
      {scenes.map((scene, idx) => {
        const isActive = currentTime >= scene.startTime && currentTime <= scene.endTime;
        const isFirst = idx === 0;
        return (
          <div 
            key={scene.id}
            onClick={() => onSceneClick(scene.startTime)}
            className={`flex-shrink-0 w-72 snap-start group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isActive ? 'scale-[1.03] translate-y-[-4px]' : 'opacity-40 hover:opacity-100 grayscale-[0.3] hover:grayscale-0'
            }`}
          >
            <div className={`relative aspect-video rounded-[2.5rem] overflow-hidden border-2 transition-all shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] ${
              isActive ? 'border-blue-500 ring-[10px] ring-blue-500/5' : 'border-white/5'
            }`}>
              <img src={scene.thumbnail} alt={scene.description} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                {isFirst && (
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-blue-600 text-white rounded-full shadow-lg">Hook</span>
                )}
                {scene.isKeyMoment && (
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-yellow-500 text-black rounded-full shadow-lg">Key</span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="text-[10px] font-black text-white/90 tracking-widest">
                  {Math.floor(scene.startTime)}s — {Math.floor(scene.endTime)}s
                </span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                  <span className="text-[10px] font-black text-blue-400">{scene.energyScore}%</span>
                </div>
              </div>
            </div>
            <div className="mt-5 px-2">
              <p className="text-[13px] font-bold text-white/90 leading-tight line-clamp-1">{scene.description.split(': ')[1] || scene.description}</p>
              <div className="w-12 h-1 bg-neutral-800 rounded-full mt-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${scene.energyScore > 80 ? 'bg-blue-500' : 'bg-neutral-600'}`}
                  style={{ width: `${scene.energyScore}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SceneCards;
