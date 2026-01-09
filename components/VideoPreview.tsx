
import React, { useRef, useEffect, useState } from 'react';
import { EditProject } from '../types.ts';

interface Props {
  project: EditProject;
  currentTime: number;
  setCurrentTime: (t: number) => void;
}

const VideoPreview: React.FC<Props> = ({ project, currentTime, setCurrentTime }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.4) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const activeWord = project.transcription.find(w => currentTime >= w.start && currentTime <= w.end);

  return (
    <div className="relative w-full aspect-video bg-black rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] border border-neutral-900 group">
      <video
        ref={videoRef}
        src={project.videoUrl}
        className="w-full h-full object-cover transition-transform duration-700"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        playsInline
      />
      
      <div className="absolute top-10 left-10 flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        <span className="text-[10px] mono font-bold text-white/60 tracking-widest uppercase">Nova OS // Preview Mode</span>
      </div>

      {activeWord && (
        <div className="absolute bottom-[30%] left-0 right-0 flex justify-center pointer-events-none px-20">
          <span 
            className={`text-5xl md:text-8xl font-black italic uppercase transition-all duration-75 transform ${
              activeWord.isHighlighted ? 'text-yellow-400 scale-110 drop-shadow-[0_10px_30px_rgba(250,204,21,0.4)]' : 'text-white scale-100'
            } drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] tracking-tighter`}
          >
            {activeWord.word}
          </span>
        </div>
      )}

      <div className="absolute bottom-10 left-10 right-10 flex items-center gap-8 bg-black/60 backdrop-blur-2xl border border-white/5 p-6 rounded-[2.5rem] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
        <button 
          onClick={togglePlay}
          className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-90 shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
        >
          {isPlaying ? (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <div className="flex-1 flex flex-col gap-3">
           <div className="flex justify-between items-end">
             <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">Master Grade Timeline</span>
             <span className="text-[12px] mono font-black text-white/90">{Math.floor(currentTime)}s <span className="text-white/20">/</span> 45s</span>
           </div>
           <div 
             className="h-1.5 bg-neutral-800/50 rounded-full relative overflow-hidden cursor-pointer group/seek"
             onClick={(e) => {
               const rect = e.currentTarget.getBoundingClientRect();
               const x = e.clientX - rect.left;
               const pct = x / rect.width;
               setCurrentTime(pct * 45);
             }}
           >
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                style={{ width: `${(currentTime / 45) * 100}%` }}
              />
           </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
