
import React from 'react';
import { ChatMessage } from '../types.ts';

interface Props {
  messages: ChatMessage[];
  isProcessing: boolean;
}

const CommandFeed: React.FC<Props> = ({ messages, isProcessing }) => {
  return (
    <div className="flex flex-col gap-10 overflow-y-auto pr-4 max-h-[60vh] pb-32 scrollbar-none">
      {messages.map((msg, i) => (
        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
          <div className={`max-w-[95%] p-6 rounded-[2rem] transition-all duration-500 ${
            msg.role === 'user' 
              ? 'bg-neutral-800/80 border border-white/5 text-neutral-200 shadow-xl' 
              : 'bg-blue-600/5 border border-blue-500/10 text-blue-50 shadow-sm'
          }`}>
            <p className="text-[14px] leading-relaxed font-medium">
              {msg.role === 'assistant' && <span className="text-blue-500 font-black block mb-2 text-[10px] uppercase tracking-[0.2em]">Nova</span>}
              {msg.content}
            </p>
            {msg.actions && msg.actions.length > 0 && (
              <div className="mt-6 space-y-2.5">
                {msg.actions.map(action => (
                  <div key={action.id} className="flex items-center gap-3 p-4 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-md group hover:border-blue-500/30 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <span className="text-[11px] font-bold text-neutral-500 group-hover:text-blue-300 transition-colors">{action.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest mt-4 px-3">
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      ))}
      {isProcessing && (
        <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-neutral-900/40 border border-white/5 animate-pulse backdrop-blur-xl">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Editing...</span>
        </div>
      )}
    </div>
  );
};

export default CommandFeed;
