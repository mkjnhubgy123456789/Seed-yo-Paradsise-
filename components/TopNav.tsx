
import React from 'react';
import { Module } from '../types';
import { ICONS } from '../constants';

interface TopNavProps {
  activeModule: Module;
  setModule: (m: Module) => void;
}

const TopNav: React.FC<TopNavProps> = ({ activeModule, setModule }) => {
  const items = [
    { id: Module.DASHBOARD, label: 'Analytics', icon: ICONS.Dashboard },
    { id: Module.NEWSLETTER, label: 'Reports', icon: ICONS.Newsletter },
    { id: Module.ASSETS, label: 'Studio', icon: ICONS.Assets },
    { id: Module.SETTINGS, label: 'Control', icon: ICONS.Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950 text-white z-50 flex items-center px-8 border-b border-slate-800 shadow-lg">
      <div className="mr-12 flex flex-col group cursor-pointer" onClick={() => setModule(Module.DASHBOARD)}>
        <span className="text-xl font-bold serif italic tracking-tighter group-hover:text-amber-500 transition-colors">SpectroModel</span>
        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold opacity-80">Studio Hub</span>
      </div>
      
      <div className="flex-1 flex items-center justify-center space-x-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setModule(item.id)}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
              activeModule === item.id 
                ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <item.icon />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex flex-col items-end mr-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Production Node</span>
          <span className="text-[9px] text-amber-500 font-bold uppercase tracking-widest">Active State</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center cursor-pointer overflow-hidden shadow-inner hover:border-amber-500 transition-colors">
          <img src="https://picsum.photos/100/100" alt="User Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
