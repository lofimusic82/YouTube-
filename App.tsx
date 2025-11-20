import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Trends } from './components/Trends';
import { Optimizer } from './components/Optimizer';
import { IdeaGenerator } from './components/IdeaGenerator';
import { AppView, ChannelStats } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isConnected, setIsConnected] = useState(false);
  const [stats, setStats] = useState<ChannelStats | null>(null);

  // Simulate fetching data upon connection
  useEffect(() => {
    if (isConnected) {
      setStats({
        name: "Tech Explorer",
        subscribers: "12.5K",
        views: "452K",
        niche: "Technology"
      });
    } else {
      setStats(null);
    }
  }, [isConnected]);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard stats={stats} onConnect={() => setIsConnected(true)} />;
      case AppView.TRENDS:
        return <Trends />;
      case AppView.OPTIMIZER:
        return <Optimizer />;
      case AppView.IDEAS:
        return <IdeaGenerator />;
      default:
        return <Dashboard stats={stats} onConnect={() => setIsConnected(true)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-950 text-slate-200 font-sans selection:bg-brand-500/30 selection:text-brand-200">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isChannelConnected={isConnected} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar for Mobile/Context - hidden on desktop for now as sidebar covers it, 
            but good for structure. We just use a simple spacer or breadcrumb if needed. */}
        <header className="h-16 border-b border-dark-800 flex items-center justify-between px-8 bg-dark-950/80 backdrop-blur z-10">
          <h2 className="text-lg font-medium text-white tracking-tight">
            {currentView === AppView.DASHBOARD && 'Dashboard'}
            {currentView === AppView.TRENDS && 'Trend Intelligence'}
            {currentView === AppView.OPTIMIZER && 'Metadata Optimization'}
            {currentView === AppView.IDEAS && 'Content Ideation'}
          </h2>
          
          {/* Simulating User Profile */}
          <div className="flex items-center space-x-4">
             <div className="text-xs text-slate-500">v2.4.0</div>
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-purple-600 p-[1px]">
               <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center text-xs font-bold">
                 TM
               </div>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;