import React, { useState } from 'react';
import { TrendData } from '../types';
import { fetchTrendingTopics } from '../services/gemini';
import { Search, Loader2, Flame, ExternalLink, Hash } from 'lucide-react';

export const Trends: React.FC = () => {
  const [niche, setNiche] = useState('Technology');
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;
    
    setLoading(true);
    setTrends([]);
    const data = await fetchTrendingTopics(niche);
    setTrends(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-3xl font-bold text-white">Trend Hunter</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Discover real-time trending topics directly from Google Search. 
          Find the wave before it crashes.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-500" />
        </div>
        <input
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Enter your niche (e.g., Minecraft, Vegan Cooking, AI News)"
          className="w-full pl-12 pr-4 py-4 bg-dark-900 border border-dark-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all shadow-xl shadow-black/20"
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-6 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
        </button>
      </form>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {trends.map((trend, index) => (
          <div key={index} className="bg-dark-900/80 backdrop-blur border border-dark-800 rounded-xl p-6 hover:border-brand-500/30 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                  {trend.volume} Volume
                </span>
              </div>
              <span className="text-4xl font-black text-dark-800 group-hover:text-dark-700 transition-colors select-none">
                #{index + 1}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
              {trend.topic}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {trend.description}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-4">
              {trend.relatedKeywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 bg-dark-800 rounded-md text-xs text-slate-300 flex items-center border border-dark-700">
                  <Hash className="w-3 h-3 mr-1 opacity-50" />
                  {kw}
                </span>
              ))}
            </div>

            {/* Sources */}
            {trend.sources && trend.sources.length > 0 && (
              <div className="pt-4 border-t border-dark-800/50">
                <p className="text-xs text-slate-500 mb-2">Sources:</p>
                <ul className="space-y-1">
                  {trend.sources.map((source, si) => (
                    <li key={si}>
                      <a href={source.uri} target="_blank" rel="noreferrer" className="text-xs text-brand-500 hover:text-brand-400 flex items-center truncate max-w-full">
                        <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{source.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {!loading && trends.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-block p-4 rounded-full bg-dark-800 mb-4">
            <Search className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-slate-500">Enter a niche above to start hunting trends.</p>
        </div>
      )}
    </div>
  );
};