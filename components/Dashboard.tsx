import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight, Activity, Eye, Users, Video } from 'lucide-react';
import { ChannelStats } from '../types';

interface DashboardProps {
  stats: ChannelStats | null;
  onConnect: () => void;
}

const mockData = [
  { name: 'Mon', views: 4000 },
  { name: 'Tue', views: 3000 },
  { name: 'Wed', views: 2000 },
  { name: 'Thu', views: 2780 },
  { name: 'Fri', views: 1890 },
  { name: 'Sat', views: 2390 },
  { name: 'Sun', views: 3490 },
];

export const Dashboard: React.FC<DashboardProps> = ({ stats, onConnect }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">Channel Overview</h1>
          <p className="text-slate-400 mt-1">Your performance analytics and quick actions.</p>
        </div>
        {!stats && (
          <button 
            onClick={onConnect}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium shadow-lg shadow-brand-900/20 transition-all flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Connect YouTube Account</span>
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Views', value: stats ? stats.views : '--', icon: Eye, change: '+12.5%' },
          { label: 'Subscribers', value: stats ? stats.subscribers : '--', icon: Users, change: '+4.2%' },
          { label: 'Avg CTR', value: stats ? '8.4%' : '--', icon: Activity, change: '-1.1%' },
          { label: 'Active Videos', value: '42', icon: Video, change: '0%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 p-6 rounded-xl hover:border-brand-900/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-dark-800 rounded-lg group-hover:bg-brand-900/20 transition-colors">
                <stat.icon className="w-5 h-5 text-slate-400 group-hover:text-brand-500" />
              </div>
              {stats && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') ? 'bg-green-900/20 text-green-400' : 
                  stat.change === '0%' ? 'bg-slate-800 text-slate-400' : 'bg-red-900/20 text-red-400'
                }`}>
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-900/50 border border-dark-800 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Weekly Performance</h3>
            <select className="bg-dark-800 border border-dark-700 text-slate-300 text-sm rounded-lg px-3 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 28 Days</option>
            </select>
          </div>
          
          {stats ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                    cursor={{ fill: '#334155', opacity: 0.2 }}
                  />
                  <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                    {mockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#dc2626' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 w-full flex flex-col items-center justify-center border-2 border-dashed border-dark-800 rounded-lg">
              <p className="text-slate-500 mb-4">Connect your channel to view analytics</p>
              <button onClick={onConnect} className="text-brand-500 font-medium hover:underline">Connect Now</button>
            </div>
          )}
        </div>

        {/* Recent Activity / Tips */}
        <div className="bg-dark-900/50 border border-dark-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
          <div className="space-y-4">
            {[
              "Your recent video 'Tech Review' is trending up. Consider making a Part 2.",
              "Gaming niche CTR is up 5% this week. Good time to upload.",
              "Your audience is most active at 6PM EST today."
            ].map((insight, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 bg-dark-800/50 rounded-lg border border-dark-700/50">
                <div className="mt-1 min-w-4 min-h-4 bg-brand-500/20 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3 text-brand-500" />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};