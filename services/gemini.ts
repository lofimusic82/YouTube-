import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TrendData, OptimizationResult, VideoIdea } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Fetches trending topics from Google Search based on a niche.
 */
export const fetchTrendingTopics = async (niche: string): Promise<TrendData[]> => {
  try {
    const prompt = `What are the top 4 specifically trending YouTube video topics or keywords related to "${niche}" right now? 
    Use Google Search to find recent data. 
    For each trend, provide a short description, estimated interest level (High/Very High), and 3 related keywords.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    
    if (!text) {
      return [];
    }
    
    // Second pass to structure the search results into JSON for the UI
    const formattingPrompt = `
      Based on the following research about YouTube trends:
      ---
      ${text}
      ---
      Extract 4 trending topics into a JSON array. 
      Schema: [{ "topic": string, "volume": string, "description": string, "relatedKeywords": string[] }]
    `;

    const formatResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattingPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              volume: { type: Type.STRING },
              description: { type: Type.STRING },
              relatedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    });

    const data = JSON.parse(formatResponse.text || '[]');
    
    // Extract sources from the first response's grounding metadata
    // Safely map grounding chunks to the required format
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '#'
    })).filter(s => s.uri !== '#').slice(0, 3) || [];

    return data.map((d: any) => ({ ...d, sources }));

  } catch (error) {
    console.error("Error fetching trends:", error);
    return [];
  }
};

/**
 * Optimizes video metadata based on current best practices.
 */
export const optimizeVideoMetadata = async (
  currentTitle: string, 
  currentDesc: string, 
  niche: string
): Promise<OptimizationResult> => {
  
  const prompt = `
    Act as a YouTube Algorithm Expert.
    Optimize the following video metadata for a channel in the "${niche}" niche.
    Current Title: "${currentTitle}"
    Current Description: "${currentDesc}"

    Goal: maximize CTR (Click Through Rate) and SEO discovery.
    
    Return a JSON object with:
    1. A viral, punchy Title.
    2. An SEO-optimized, engaging Description (first 2 lines are crucial).
    3. 10 relevant comma-separated Tags.
    4. 5 relevant Hashtags.
    5. A virality score (0-100).
    6. A short reasoning string explaining why this is better.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      tags: { type: Type.ARRAY, items: { type: Type.STRING } },
      hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
      score: { type: Type.NUMBER },
      reasoning: { type: Type.STRING }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema
      }
    });

    return JSON.parse(response.text || '{}') as OptimizationResult;
  } catch (error) {
    console.error("Optimization failed", error);
    throw error;
  }
};

/**
 * Generates video ideas for a channel.
 */
export const generateVideoIdeas = async (niche: string): Promise<VideoIdea[]> => {
  const prompt = `
    Generate 3 highly clickable YouTube video ideas for a channel about "${niche}".
    Focus on "Gap in the market" or "Trending Twist" concepts.
  `;

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        hook: { type: Type.STRING },
        thumbnailConcept: { type: Type.STRING },
        targetAudience: { type: Type.STRING }
      }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Idea generation failed", error);
    return [];
  }
};