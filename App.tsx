
import React, { useState, useCallback } from 'react';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import BusinessTools from './components/BusinessTools';
import SocialAssets from './components/SocialAssets';
import MusicBar from './components/MusicBar';
import { Module, NewsletterCampaign, Subscriber, Track, MediaItem } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<Module>(Module.DASHBOARD);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { id: '1', name: 'Julian Reed', email: 'j.reed@spectro.co', status: 'active', subscribedAt: '2024-01-05' },
    { id: '2', name: 'Elena Thorne', email: 'elena@blueprint.me', status: 'active', subscribedAt: '2024-02-14' },
    { id: '3', name: 'Marcus Vane', email: 'm.vane@architecture.org', status: 'active', subscribedAt: '2024-03-20' },
  ]);
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: 'default',
    title: 'Blueprint Alpha Resonance',
    artist: 'SpectroModel Studio',
    url: 'https://cdn.pixabay.com/audio/2022/02/10/audio_f3299c80f4.mp3',
    cover: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?w=200'
  });

  const addMediaToStudio = useCallback(async (file: File, type: 'video' | 'image' | 'audio') => {
    const newItem: MediaItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: file.name.split('.')[0].replace(/[-_]/g, ' '),
      fileName: file.name,
      url: URL.createObjectURL(file)
    };
    setMediaItems(prev => [newItem, ...prev]);
  }, []);

  const renameMediaInStudio = useCallback((id: string, newLabel: string) => {
    setMediaItems(prev => prev.map(item => item.id === id ? { ...item, label: newLabel } : item));
  }, []);

  const deleteSubscriber = useCallback((id: string) => {
    setSubscribers(prev => prev.filter(s => s.id !== id));
  }, []);

  const handleSaveCampaign = (data: Partial<NewsletterCampaign>) => {
    const newCamp: NewsletterCampaign = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title || 'Untitled Narrative',
      subject: data.subject || '',
      content: data.content || '',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft',
      recipientsCount: 0
    };
    setCampaigns([newCamp, ...campaigns]);
    setActiveModule(Module.DASHBOARD);
  };

  const renderModule = () => {
    switch (activeModule) {
      case Module.DASHBOARD:
        return <Dashboard campaigns={campaigns} onPlayTrack={setCurrentTrack} />;
      case Module.NEWSLETTER:
        return (
          <BusinessTools 
            campaigns={campaigns} 
            subscribers={subscribers} 
            onSaveCampaign={handleSaveCampaign} 
            onDeleteSubscriber={deleteSubscriber} 
          />
        );
      case Module.ASSETS:
        return (
          <SocialAssets 
            mediaItems={mediaItems} 
            onAddMedia={addMediaToStudio} 
            onRenameMedia={renameMediaInStudio} 
          />
        );
      case Module.SETTINGS:
        return (
          <div className="py-32 text-center animate-fadeIn">
             <h2 className="text-5xl font-bold serif italic text-slate-900 tracking-tight">Platform Control Center</h2>
             <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.6em] mt-4 mb-16">Global Brand Orchestration Node</p>
             <div className="max-w-2xl mx-auto bg-white p-16 rounded-[4rem] border border-slate-100 shadow-2xl text-left">
                <div className="space-y-12">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-8">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Environment Node</label>
                      <p className="text-2xl font-bold text-slate-900 serif italic mt-2">Production Engines Active</p>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">System Core</label>
                    <p className="text-2xl font-bold text-amber-700 serif italic mt-2">SpectroModel Studio v7.4.2 (Pro Integrated)</p>
                  </div>
                  <div className="pt-8">
                     <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest shadow-xl hover:bg-black transition-all">Regenerate Encryption Keys</button>
                  </div>
                </div>
             </div>
          </div>
        );
      default:
        return <Dashboard campaigns={campaigns} onPlayTrack={setCurrentTrack} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] pb-32">
      <TopNav activeModule={activeModule} setModule={setActiveModule} />
      <main className="pt-24 px-8 md:px-16 max-w-7xl mx-auto">
        {renderModule()}
      </main>
      <MusicBar track={currentTrack} />
    </div>
  );
};

export default App;
