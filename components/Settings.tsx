import React from 'react';
import { LogOut, Bell, Shield, User, Monitor, HelpCircle } from 'lucide-react';

interface SettingsProps {
  isConnected: boolean;
  onDisconnect: () => void;
  onConnect: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isConnected, onDisconnect, onConnect }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Settings</h2>
        <p className="text-slate-400">Manage your account preferences and channel connection.</p>
      </div>

      {/* Account Section */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-dark-800 bg-dark-900/50">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <User className="w-5 h-5 mr-2 text-brand-500" />
            Account Connection
          </h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white font-medium">YouTube Channel</p>
              <p className="text-sm text-slate-400">
                {isConnected 
                  ? "Currently synced with Tech Explorer" 
                  : "No channel currently connected to TubeMax AI"}
              </p>
            </div>
            
            {isConnected ? (
              <button 
                onClick={onDisconnect}
                className="px-4 py-2 border border-red-900/30 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg text-sm font-medium transition-all flex items-center shadow-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect Channel
              </button>
            ) : (
              <button 
                onClick={onConnect}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-brand-900/20"
              >
                Connect Channel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* General Preferences (Mock) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-dark-800 bg-dark-900/50">
            <h3 className="text-base font-semibold text-white flex items-center">
              <Monitor className="w-4 h-4 mr-2 text-slate-400" />
              Appearance
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between opacity-50 pointer-events-none">
              <span className="text-sm text-slate-300">Theme</span>
              <span className="text-xs bg-dark-800 px-2 py-1 rounded text-slate-400 border border-dark-700">Dark Mode</span>
            </div>
            <div className="flex items-center justify-between opacity-50 pointer-events-none">
              <span className="text-sm text-slate-300">Compact View</span>
              <div className="w-8 h-4 bg-dark-800 rounded-full border border-dark-700 relative">
                <div className="w-2 h-2 bg-slate-600 rounded-full absolute left-1 top-1"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-dark-800 bg-dark-900/50">
            <h3 className="text-base font-semibold text-white flex items-center">
              <Bell className="w-4 h-4 mr-2 text-slate-400" />
              Notifications
            </h3>
          </div>
          <div className="p-6 space-y-4">
             <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Weekly Report</span>
              <button className="w-8 h-4 bg-brand-900/30 rounded-full border border-brand-600/30 relative cursor-pointer">
                <div className="w-2 h-2 bg-brand-500 rounded-full absolute right-1 top-1"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Trend Alerts</span>
              <button className="w-8 h-4 bg-brand-900/30 rounded-full border border-brand-600/30 relative cursor-pointer">
                <div className="w-2 h-2 bg-brand-500 rounded-full absolute right-1 top-1"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

       <div className="flex justify-center pt-8">
         <div className="flex items-center text-slate-600 text-xs hover:text-slate-500 transition-colors cursor-pointer">
            <HelpCircle className="w-3 h-3 mr-1" />
            <span>Help & Support</span>
            <span className="mx-2">•</span>
            <span>Terms</span>
            <span className="mx-2">•</span>
            <span>Privacy</span>
         </div>
       </div>
    </div>
  );
};