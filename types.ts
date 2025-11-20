export enum AppView {
  DASHBOARD = 'DASHBOARD',
  OPTIMIZER = 'OPTIMIZER',
  TRENDS = 'TRENDS',
  IDEAS = 'IDEAS',
  SETTINGS = 'SETTINGS',
}

export interface TrendData {
  topic: string;
  volume: string; // e.g. "High", "Medium"
  description: string;
  relatedKeywords: string[];
  sources: { title: string; uri: string }[];
}

export interface OptimizationResult {
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  score: number;
  reasoning: string;
}

export interface VideoIdea {
  title: string;
  hook: string;
  thumbnailConcept: string;
  targetAudience: string;
}

export interface ChannelStats {
  name: string;
  subscribers: string;
  views: string;
  niche: string;
}