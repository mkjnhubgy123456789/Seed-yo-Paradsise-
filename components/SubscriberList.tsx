
import React from 'react';
import { Subscriber } from '../types';

interface SubscriberListProps {
  subscribers: Subscriber[];
  onDelete: (id: string) => void;
}

const SubscriberList: React.FC<SubscriberListProps> = ({ subscribers, onDelete }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 serif italic">Community Nodes</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-2">Strategic Network Access</p>
        </div>
        <button className="bg-slate-950 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-2xl hover:bg-amber-700 transition-all border border-slate-800">
          Sync External CRM
        </button>
      </header>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[9px] uppercase tracking-[0.3em] font-bold border-b border-slate-100">
                <th className="px-12 py-8">Identity Profile</th>
                <th className="px-8 py-8">Encryption / Email</th>
                <th className="px-8 py-8">Sync Status</th>
                <th className="px-8 py-8">Node Joined</th>
                <th className="px-12 py-8 text-right">Vault Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-12 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-bold border border-slate-800 shadow-lg">
                        {sub.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900 serif italic text-xl">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-sm text-slate-500 font-light italic">{sub.email}</td>
                  <td className="px-8 py-8">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                      sub.status === 'active' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-8 py-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub.subscribedAt}</td>
                  <td className="px-12 py-8 text-right">
                    <button 
                      onClick={() => { if(confirm(`Confirm permanent removal of community node: ${sub.name}?`)) onDelete(sub.id); }}
                      className="p-3 text-slate-200 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriberList;
