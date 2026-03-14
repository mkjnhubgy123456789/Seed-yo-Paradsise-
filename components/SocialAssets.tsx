
import React, { useRef, useState } from 'react';
import { MediaItem } from '../types';

interface SocialAssetsProps {
  mediaItems: MediaItem[];
  onAddMedia: (file: File, type: 'video' | 'image' | 'audio') => void;
  onRenameMedia: (id: string, newLabel: string) => void;
}

const SocialAssets: React.FC<SocialAssetsProps> = ({ mediaItems, onAddMedia, onRenameMedia }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempLabel, setTempLabel] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image';
      onAddMedia(file, type);
    }
  };

  return (
    <div className="space-y-12 py-8 animate-fadeIn">
      <header className="flex justify-between items-end border-b border-slate-200 pb-10">
        <div>
          <h2 className="text-5xl font-bold text-slate-900 serif italic tracking-tighter">Production Studio</h2>
          <p className="text-slate-400 mt-2 font-bold uppercase text-[11px] tracking-[0.3em]">High-Resolution Asset Stream</p>
        </div>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFile} />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-10 py-5 bg-slate-950 text-white rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-amber-700 transition-all border border-slate-800"
        >
          Import Production Node
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {mediaItems.length === 0 && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="col-span-full border-4 border-dashed border-slate-100 rounded-[3rem] py-48 text-center cursor-pointer hover:border-amber-200 hover:bg-amber-50/20 transition-all"
          >
            <p className="text-2xl font-bold text-slate-300 serif italic">No Production Assets Detected</p>
            <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">Awaiting local asset synchronization.</p>
          </div>
        )}
        
        {mediaItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all flex flex-col"
          >
            <div className="aspect-video bg-slate-950 relative flex items-center justify-center overflow-hidden">
              {item.type === 'video' ? (
                <video src={item.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted loop autoPlay />
              ) : item.type === 'image' ? (
                <img src={item.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={item.label} />
              ) : (
                <div className="text-amber-500 bg-amber-500/10 p-10 rounded-full border border-amber-500/20 shadow-inner">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 3v11H4a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V7.4l9-1.8V17a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V3z" /></svg>
                </div>
              )}
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                 <span className="text-[10px] text-white font-bold uppercase tracking-widest bg-slate-950/80 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">Inspection State</span>
              </div>
            </div>

            <div className="p-10 flex-1 flex flex-col justify-between">
              <div>
                {editingId === item.id ? (
                  <div className="flex gap-2">
                    <input 
                      autoFocus
                      className="bg-slate-50 border border-amber-500 rounded-xl px-4 py-2 w-full text-lg font-bold serif italic outline-none"
                      value={tempLabel}
                      onChange={(e) => setTempLabel(e.target.value)}
                    />
                    <button 
                      onClick={() => { onRenameMedia(item.id, tempLabel); setEditingId(null); }}
                      className="bg-slate-950 text-white p-2 rounded-xl"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-start group/name">
                    <h4 className="font-bold text-slate-900 text-3xl serif italic tracking-tight truncate capitalize">{item.label}</h4>
                    <button 
                      onClick={() => { setEditingId(item.id); setTempLabel(item.label); }}
                      className="opacity-0 group-hover/name:opacity-100 text-slate-400 hover:text-amber-700 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                  </div>
                )}
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] italic mt-2">Active Studio Session Node</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialAssets;
