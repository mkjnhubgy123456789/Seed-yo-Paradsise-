
import React, { useState, useRef, useEffect } from 'react';
import { Track } from '../types';

interface MusicBarProps {
  track: Track;
}

const MusicBar: React.FC<MusicBarProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && track.id !== 'default') {
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.warn);
    }
  }, [track]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          alert("Audio Activation Required: Please interact with the page to enable audio.");
        });
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-28 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800 px-12 flex items-center justify-between z-[100] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <audio 
        ref={audioRef} 
        src={track.url} 
        loop 
        onPlay={() => setIsPlaying(true)} 
        onPause={() => setIsPlaying(false)} 
      />
      
      <div className="flex items-center space-x-6 w-1/3">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shadow-2xl overflow-hidden relative group">
           <img src={track.cover} alt="Cover" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
           {isPlaying && (
             <div className="absolute bottom-1 right-1 flex gap-0.5 items-end h-4 px-0.5">
                <div className="w-1 h-full bg-amber-500 animate-bounce rounded-full"></div>
                <div className="w-1 h-3/4 bg-amber-500 animate-bounce [animation-delay:0.2s] rounded-full"></div>
                <div className="w-1 h-1/2 bg-amber-500 animate-bounce [animation-delay:0.4s] rounded-full"></div>
             </div>
           )}
        </div>
        <div className="hidden sm:block overflow-hidden">
          <p className="text-sm font-bold text-white uppercase tracking-[0.2em] truncate italic">{track.title}</p>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.1em]">{track.artist}</span>
             <span className="text-[8px] bg-slate-900 text-amber-500 px-2 py-0.5 rounded-full font-bold border border-amber-900/50">432Hz</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3 gap-3">
        <div className="flex items-center gap-8">
           <button className="text-slate-600 hover:text-white transition-all hover:scale-110 active:scale-90">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
           </button>
           <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-slate-950 hover:bg-amber-600 hover:text-white transition-all shadow-xl active:scale-95"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
           <button className="text-slate-600 hover:text-white transition-all hover:scale-110 active:scale-90">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6h2v12h-2zm-10.5 0v12l8.5-6z"/></svg>
           </button>
        </div>
        <div className="w-full max-w-md flex items-center gap-4">
           <span className="text-[9px] text-slate-600 font-mono">0:00</span>
           <div className="flex-1 h-1 bg-slate-900 rounded-full relative overflow-hidden group cursor-pointer border border-slate-800">
             <div className={`absolute left-0 top-0 bottom-0 bg-amber-600 transition-all duration-1000 ${isPlaying ? 'w-2/3' : 'w-0'}`}></div>
           </div>
           <span className="text-[9px] text-slate-600 font-mono">4:32</span>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-end space-x-8 w-1/3">
        <div className="flex items-center gap-4 group">
           <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
           <div className="w-24 h-1 bg-slate-900 rounded-full relative">
              <div className="absolute inset-0 w-3/4 h-full bg-slate-600 rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MusicBar;
