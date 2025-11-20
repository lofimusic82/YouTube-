import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, Wand2, TrendingUp, Lightbulb, Settings, Youtube } from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  isChannelConnected: boolean;
  onConnect: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isChannelConnected, onConnect }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.TRENDS, label: 'Trend Hunter', icon: TrendingUp },
    { id: AppView.OPTIMIZER, label: 'Video Optimizer', icon: Wand2 },
    { id: AppView.IDEAS, label: 'Idea Generator', icon: Lightbulb },
  ];

  return (
    <div className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center space-x-2 border-b border-dark-800">
        <div className="bg-brand-600 p-1.5 rounded-lg">
          <Youtube className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          TubeMax AI
        </span>
      </div>

      <div className="flex-1 px-3 py-6 space-y-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
          Menu
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              currentView === item.id
                ? 'bg-brand-600/10 text-brand-500 border border-brand-600/20'
                : 'text-slate-400 hover:bg-dark-800 hover:text-slate-200'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-brand-500' : ''}`} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-dark-800">
        {isChannelConnected ? (
          <button 
            onClick={() => onChangeView(AppView.SETTINGS)}
            className="w-full flex items-center space-x-3 bg-dark-800 p-3 rounded-lg border border-dark-700/50 hover:border-brand-500/30 transition-colors text-left group"
          >
            <img 
              src="https://picsum.photos/seed/user/40/40" 
              alt="Channel" 
              className="w-10 h-10 rounded-full ring-2 ring-brand-900 group-hover:ring-brand-500 transition-all"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Tech Explorer</p>
              <p className="text-xs text-slate-400 group-hover:text-brand-400 transition-colors">12.5K subs</p>
            </div>
          </button>
        ) : (
          <button 
            onClick={onConnect}
            className="w-full p-3 rounded-lg bg-dark-800 border border-dashed border-dark-600 text-center hover:bg-dark-700 hover:border-dark-500 transition-all group"
          >
            <p className="text-xs text-slate-400 mb-2 group-hover:text-slate-300">No Channel Linked</p>
            <p className="text-[10px] text-slate-500 group-hover:text-brand-400 font-medium">Click to connect</p>
          </button>
        )}
        
        <button 
          onClick={() => onChangeView(AppView.SETTINGS)}
          className={`mt-4 w-full flex items-center justify-center space-x-2 text-xs transition-colors ${
            currentView === AppView.SETTINGS 
              ? 'text-brand-500 font-medium' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};