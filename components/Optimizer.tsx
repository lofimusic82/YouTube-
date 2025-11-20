import React, { useState } from 'react';
import { optimizeVideoMetadata } from '../services/gemini';
import { OptimizationResult } from '../types';
import { Wand2, Copy, Check, RefreshCw, Tag, Sparkles } from 'lucide-react';

export const Optimizer: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!title || !niche) return;
    setLoading(true);
    try {
      const data = await optimizeVideoMetadata(title, description, niche);
      setResult(data);
    } catch (e) {
      alert("Optimization failed. Please try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-6">
      {/* Input Column */}
      <div className="lg:w-1/2 flex flex-col bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-dark-800 bg-dark-900/50">
          <h2 className="font-semibold text-white flex items-center">
            <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
            Current Metadata
          </h2>
        </div>
        
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Video Niche / Topic *</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full p-3 bg-dark-950 border border-dark-700 rounded-lg text-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              placeholder="e.g., Gaming, Tech Reviews"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Draft Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-dark-950 border border-dark-700 rounded-lg text-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              placeholder="My Awesome Video"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Draft Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="w-full p-3 bg-dark-950 border border-dark-700 rounded-lg text-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
              placeholder="Briefly describe your video..."
            />
          </div>
        </div>

        <div className="p-4 border-t border-dark-800 bg-dark-900/50">
          <button
            onClick={handleOptimize}
            disabled={loading || !title || !niche}
            className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-brand-900/20 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            <span>Generate Optimization</span>
          </button>
        </div>
      </div>

      {/* Output Column */}
      <div className="lg:w-1/2 bg-dark-900 border border-dark-800 rounded-xl overflow-hidden flex flex-col relative">
        <div className="p-4 border-b border-dark-800 bg-gradient-to-r from-dark-900 to-brand-900/10 flex justify-between items-center">
          <h2 className="font-semibold text-white flex items-center text-brand-400">
            <Sparkles className="w-4 h-4 mr-2" />
            Optimized Result
          </h2>
          {result && (
            <span className="text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded">
              Score: {result.score}/100
            </span>
          )}
        </div>

        {!result ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-10 text-center">
            <div className="w-16 h-16 bg-dark-800 rounded-2xl flex items-center justify-center mb-4">
              <Wand2 className="w-8 h-8 opacity-50" />
            </div>
            <p>Enter your details and hit generate to see AI magic happen.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 animate-fade-in">
            {/* Reason */}
            <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-300 italic">"{result.reasoning}"</p>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Optimized Title</label>
              <div className="group relative">
                <div className="p-4 bg-dark-950 border border-dark-700 rounded-lg text-white font-medium text-lg shadow-inner">
                  {result.title}
                </div>
                <button 
                  onClick={() => copyToClipboard(result.title, 'title')}
                  className="absolute right-2 top-2 p-2 bg-dark-800 rounded hover:bg-dark-700 text-slate-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  {copied === 'title' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
              <div className="group relative">
                <div className="p-4 bg-dark-950 border border-dark-700 rounded-lg text-slate-300 text-sm whitespace-pre-wrap h-48 overflow-y-auto shadow-inner">
                  {result.description}
                </div>
                <button 
                  onClick={() => copyToClipboard(result.description, 'desc')}
                  className="absolute right-4 top-4 p-2 bg-dark-800 rounded hover:bg-dark-700 text-slate-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  {copied === 'desc' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Tags & Hashtags */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-dark-800 border border-dark-700 rounded text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                  <button 
                    onClick={() => copyToClipboard(result.tags.join(','), 'tags')}
                    className="px-2 py-1 bg-brand-900/20 border border-brand-900/50 rounded text-xs text-brand-400 hover:bg-brand-900/40 transition-colors flex items-center"
                  >
                    <Copy className="w-3 h-3 mr-1" /> Copy All
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hashtags</label>
                <div className="flex flex-wrap gap-2 text-brand-400 font-medium text-sm">
                  {result.hashtags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};