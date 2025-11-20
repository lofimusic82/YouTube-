import React, { useState } from 'react';
import { VideoIdea } from '../types';
import { generateVideoIdeas } from '../services/gemini';
import { Lightbulb, Play, Target, Image as ImageIcon, Sparkles } from 'lucide-react';

export const IdeaGenerator: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!niche) return;
    setLoading(true);
    const data = await generateVideoIdeas(niche);
    setIdeas(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-dark-900 to-dark-800 border border-dark-700 rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-purple-600 to-brand-600"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-4">Brainstorm Viral Concepts</h2>
          <div className="flex gap-2 max-w-lg mx-auto">
            <input 
              type="text" 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Enter your channel niche (e.g. Urban Gardening)"
              className="flex-1 bg-dark-950 border border-dark-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !niche}
              className="bg-white text-dark-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
              Generate
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {ideas.map((idea, idx) => (
          <div key={idx} className="bg-dark-900 border border-dark-800 rounded-xl p-6 hover:border-brand-500/30 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
                {idea.title}
              </h3>
              <div className="bg-dark-800 p-2 rounded-lg">
                <Play className="w-5 h-5 text-brand-500 fill-current" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-slate-400 text-sm font-medium">
                  <Target className="w-4 h-4 mr-2 text-blue-400" />
                  The Hook
                </div>
                <p className="text-slate-300 text-sm leading-relaxed bg-dark-950/50 p-3 rounded-lg border border-dark-800">
                  {idea.hook}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-slate-400 text-sm font-medium">
                  <ImageIcon className="w-4 h-4 mr-2 text-purple-400" />
                  Thumbnail Concept
                </div>
                <p className="text-slate-300 text-sm leading-relaxed bg-dark-950/50 p-3 rounded-lg border border-dark-800">
                  {idea.thumbnailConcept}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-slate-400 text-sm font-medium">
                  <Target className="w-4 h-4 mr-2 text-green-400" />
                  Target Audience
                </div>
                <p className="text-slate-300 text-sm leading-relaxed bg-dark-950/50 p-3 rounded-lg border border-dark-800">
                  {idea.targetAudience}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && ideas.length === 0 && (
         <div className="text-center py-12 opacity-30">
           <Lightbulb className="w-12 h-12 mx-auto mb-3" />
           <p>Ideas are waiting...</p>
         </div>
      )}
    </div>
  );
};