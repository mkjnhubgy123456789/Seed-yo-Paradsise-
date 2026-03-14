
import React, { useState } from 'react';
import { generateNewsletterContent } from '../services/geminiService';
import { GenerationConfig } from '../types';

interface CreateCampaignProps {
  onSave: (campaign: any) => void;
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ onSave }) => {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<GenerationConfig>({
    topic: 'The Intersection of Botanical Luxury and Global Wellness',
    tone: 'Elegant & Visionary',
    includeOffer: true,
    audienceType: 'Artists, Curators & High-Net-Worth Individuals'
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [subject, setSubject] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateNewsletterContent(config);
      const subjectMatch = result.match(/Subject:\s*(.*)/i);
      const cleanContent = result.replace(/Subject:\s*.*\n?/i, '').trim();
      
      setSubject(subjectMatch ? subjectMatch[1].trim() : 'Seed to Paradise: A New Vision');
      setGeneratedContent(cleanContent);
    } catch (err) {
      alert("Unable to reach the synthesis node. Please check connectivity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
      {/* Configuration Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm h-fit">
          <header className="border-b border-slate-100 pb-6 mb-8">
             <h3 className="text-2xl font-bold text-slate-900 serif italic">Content Architect</h3>
             <p className="text-[9px] text-amber-700 font-bold uppercase tracking-widest mt-1">AI Synthesis Logic</p>
          </header>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Narrative Topic</label>
              <textarea
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 font-medium transition-all text-sm h-32"
                value={config.topic}
                onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                placeholder="What is the focus of this campaign?"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Editorial Tone</label>
              <select
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 font-medium transition-all text-sm"
                value={config.tone}
                onChange={(e) => setConfig({ ...config, tone: e.target.value })}
              >
                <option>Elegant & Visionary</option>
                <option>Analytical & Authoritative</option>
                <option>Personal & Warm</option>
                <option>High-End Commercial</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] text-white transition-all shadow-2xl active:scale-95 mt-4 ${
                loading ? 'bg-amber-800/50' : 'bg-amber-700 hover:bg-amber-800'
              }`}
            >
              {loading ? 'Synthesizing Content...' : 'Generate Campaign Draft'}
            </button>
          </div>
        </div>
      </div>

      {/* Editor Main */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[700px]">
          <div className="bg-slate-50 p-8 border-b border-slate-100 flex items-center gap-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap italic">Subject Line:</span>
            <input 
              type="text"
              className="bg-transparent border-none focus:ring-0 text-xl font-bold text-slate-900 w-full placeholder:text-slate-200 serif italic"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="The narrative title..."
            />
          </div>

          <div className="p-12 flex-1 flex flex-col bg-[#fcfbf7]/20">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold italic serif text-slate-900">Seed to Paradise</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-700 font-bold mt-2">Elite Distribution Suite</p>
            </div>
            
            <textarea 
              className="w-full bg-transparent border-none focus:ring-0 text-slate-800 leading-relaxed font-light flex-1 min-h-[400px] placeholder:text-slate-200 text-lg italic"
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              placeholder="Draft your high-end creative content here..."
            />

            <div className="mt-12 pt-10 border-t border-slate-100 text-center space-y-4">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">Seed to Paradise | Global Headquarters</p>
              <div className="flex justify-center gap-6">
                <a href="#" className="text-amber-800 text-[9px] font-bold uppercase tracking-widest hover:underline">Manage Subscription</a>
                <a href="#" className="text-slate-400 text-[9px] font-bold uppercase tracking-widest hover:underline">Unsubscribe Policy</a>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <button 
              className="text-[10px] font-bold text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-widest"
              onClick={() => { setGeneratedContent(''); setSubject(''); }}
            >
              Purge Workspace
            </button>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:shadow-md transition-all">Export JSON</button>
              <button 
                className="px-10 py-3 bg-slate-950 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black shadow-2xl transition-all disabled:opacity-50"
                disabled={!generatedContent || loading}
                onClick={() => onSave({ title: config.topic, subject, content: generatedContent })}
              >
                Archive to Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
