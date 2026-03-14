
import React, { useState } from 'react';
import CreateCampaign from './CreateCampaign';
import SubscriberList from './SubscriberList';
import { Subscriber, NewsletterCampaign } from '../types';

interface BusinessToolsProps {
  campaigns: NewsletterCampaign[];
  subscribers: Subscriber[];
  onSaveCampaign: (c: any) => void;
  onDeleteSubscriber: (id: string) => void;
}

const BusinessTools: React.FC<BusinessToolsProps> = ({ campaigns, subscribers, onSaveCampaign, onDeleteSubscriber }) => {
  const [activeTab, setActiveTab] = useState<'NEWSLETTER' | 'SUBSCRIBERS'>('NEWSLETTER');

  return (
    <div className="space-y-12 py-8 min-h-[800px]">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-10">
        <div>
          <h2 className="text-5xl font-bold text-slate-900 serif italic tracking-tighter">Seed to Paradise</h2>
          <p className="text-slate-400 mt-2 font-bold tracking-[0.4em] uppercase text-[10px]">Flagship Growth & CRM Ecosystem</p>
        </div>
        <div className="flex bg-slate-200/40 p-1.5 rounded-2xl border border-slate-200 backdrop-blur-sm">
           <button 
             onClick={() => setActiveTab('NEWSLETTER')}
             className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'NEWSLETTER' ? 'bg-white text-amber-800 shadow-xl' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Synthesis Engine
           </button>
           <button 
             onClick={() => setActiveTab('SUBSCRIBERS')}
             className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'SUBSCRIBERS' ? 'bg-white text-amber-800 shadow-xl' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Network Manager
           </button>
        </div>
      </header>

      <div className="relative">
        {activeTab === 'NEWSLETTER' ? (
          <CreateCampaign onSave={onSaveCampaign} />
        ) : (
          <SubscriberList subscribers={subscribers} onDelete={onDeleteSubscriber} />
        )}
      </div>
    </div>
  );
};

export default BusinessTools;
