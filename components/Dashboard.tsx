
import React, { useState } from 'react';
import { NewsletterCampaign, Track } from '../types';
import { performAssetDScan } from '../services/geminiService';

interface DashboardProps {
  campaigns: NewsletterCampaign[];
  onPlayTrack: (track: Track) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ campaigns, onPlayTrack }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [insight, setInsight] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);

  const handleDScan = async () => {
    if (!searchTerm.trim()) return;
    setAnalyzing(true);
    setInsight(null);
    setSources([]);
    
    try {
      const result = await performAssetDScan(searchTerm);
      setInsight(result.text);
      setSources(result.sources);
    } catch (e) {
      setInsight("ERR_SCAN_SYNC_FAILED: Failed to synchronize with global intelligence feed.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn py-8 pb-32">
      <header>
        <h2 className="text-6xl font-bold text-slate-900 serif italic tracking-tighter">Spectro Analytics</h2>
        <p className="text-slate-400 mt-2 font-bold uppercase text-[11px] tracking-[0.5em]">Real-time Global Intelligence Feed</p>
      </header>

      <div className="bg-slate-950 rounded-[3rem] p-10 shadow-2xl border border-slate-800 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 w-full">
             <label className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em] mb-4 block italic">Initiate Global D-Scan</label>
             <input 
                type="text" 
                placeholder="Query Asset Intelligence (e.g. 'Future of Luxury Botanical Skincare')..."
                className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-amber-600 transition-all text-sm shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleDScan()}
              />
          </div>
          <button 
            disabled={analyzing}
            onClick={handleDScan} 
            className="w-full md:w-80 bg-slate-100 text-slate-950 py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-white transition-all shadow-2xl active:scale-95 disabled:opacity-50"
          >
            {analyzing ? "Synchronizing..." : "Execute D-Scan"}
          </button>
        </div>
      </div>

      {insight ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-100 rounded-[3.5rem] p-12 shadow-sm">
              <h3 className="text-3xl font-bold text-slate-900 serif italic mb-8 border-b border-slate-50 pb-6">Intelligence Synthesis</h3>
              <div className="prose prose-slate max-w-none text-slate-700 font-light text-lg whitespace-pre-wrap italic leading-relaxed">
                {insight}
              </div>
              
              {sources.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 italic">Strategic Verification Sources</h4>
                  <div className="flex flex-wrap gap-3">
                    {sources.map((chunk, i) => (
                      chunk.web && (
                        <a 
                          key={i} 
                          href={chunk.web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-amber-700 bg-amber-50 px-4 py-2 rounded-full hover:bg-amber-100 transition-colors flex items-center gap-2 border border-amber-100 shadow-sm"
                        >
                          {chunk.web.title || 'Source Node'} <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 serif italic mb-8">Performance Metrics</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Global Reach', val: '2.44M', trend: '↑ 12%' },
                    { label: 'Brand Valuation', val: '$1.2M', trend: 'Stable' },
                    { label: 'Community Node Active', val: '14.8k', trend: '↑ 4%' }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-slate-50 pb-4">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.val}</p>
                      </div>
                      <span className="text-[9px] font-bold bg-green-50 text-green-700 px-2 py-1 rounded">{stat.trend}</span>
                    </div>
                  ))}
                </div>
             </div>
             <div className="bg-amber-700 rounded-[3rem] p-10 shadow-2xl text-white">
                <h3 className="text-xl font-bold serif italic mb-4">Studio Prompt</h3>
                <p className="text-xs font-light opacity-80 leading-relaxed mb-6">Based on your D-Scan, the community is showing interest in sustainable luxury. We recommend generating a newsletter focusing on organic sourcing.</p>
                <button className="w-full py-3 bg-white text-amber-800 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-50 transition-colors">Generate Creative Draft</button>
             </div>
          </div>
        </div>
      ) : (
        <div className="py-48 flex flex-col items-center justify-center text-center opacity-40">
           <svg className="w-24 h-24 text-slate-200 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           <h3 className="text-4xl font-bold text-slate-900 serif italic tracking-tight">Intelligence Engine Active</h3>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-4 italic">Awaiting D-Scan synchronization parameters.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
