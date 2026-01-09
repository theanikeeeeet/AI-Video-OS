
import { GoogleGenAI, Type } from "@google/genai";
import { EditProject, Scene, TranscriptionWord, EditAction, VideoInsights } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePostMetadata = async (platform: string, project: EditProject): Promise<{
  title: string;
  description: string;
  hashtags: string[];
}> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      You are a social media growth strategist. 
      Generate a viral title, description, and hashtags for the following video content on ${platform}.
      Video Name: "${project.name}"
      Insights: Hook Score ${project.insights.hookScore}%, Viral Potential ${project.insights.viralPotential}%.
      
      The tone should be platform-appropriate (e.g., professional for LinkedIn, high-energy for TikTok).
      Return as JSON.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "description", "hashtags"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      title: "Check this out!",
      description: "Just finished editing this awesome piece with Nova AI.",
      hashtags: ["#videoediting", "#novaai", "#viral"]
    };
  }
};

export const analyzeVideoIntent = async (prompt: string, currentProject: EditProject): Promise<{
  explanation: string;
  suggestedActions: EditAction[];
}> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      You are Nova, a professional human film editor with a focus on retention and storytelling. 
      Speak like a human editor, not an AI. Use conversational "editor speak".
      
      Example: Instead of "Applying a 1.2x zoom", say "I zoomed in slightly when you mentioned the metrics to keep the viewer focused on the results."
      
      Current Project Context: "${currentProject.name}"
      Retention Insight: Viewers stay engaged until 6s, then attention drops slightly.
      
      User's Request: "${prompt}"
      
      Analyze this intent. Focus on narrative flow, removing filler, and creating impact.
      Return as JSON.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanation: { type: Type.STRING, description: "Your rationale in warm, professional editor language." },
          suggestedActions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING },
                timestamp: { type: Type.NUMBER },
                description: { type: Type.STRING },
                aiReasoning: { type: Type.STRING }
              },
              required: ["id", "type", "description", "aiReasoning"]
            }
          }
        },
        required: ["explanation", "suggestedActions"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      explanation: "I smoothed out that transition. It felt a bit abrupt, so I tightened the cut to keep the momentum going.",
      suggestedActions: []
    };
  }
};

export const generateMockAnalysis = (name: string): EditProject => {
  const scenes: Scene[] = [
    { id: '1', startTime: 0, endTime: 5, description: 'Hook: Subject starts strong', energyScore: 92, sentiment: 'intense', isKeyMoment: true, thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80' },
    { id: '2', startTime: 5, endTime: 12, description: 'Narrative: Context building', energyScore: 65, sentiment: 'neutral', isKeyMoment: false, thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80' },
    { id: '3', startTime: 12, endTime: 25, description: 'Meat: Product demo', energyScore: 88, sentiment: 'positive', isKeyMoment: true, thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80' },
    { id: '4', startTime: 25, endTime: 35, description: 'Filler: Nuance details', energyScore: 45, sentiment: 'neutral', isKeyMoment: false, thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80' },
    { id: '5', startTime: 35, endTime: 45, description: 'Outro: CTA', energyScore: 98, sentiment: 'intense', isKeyMoment: true, thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80' },
  ];

  const transcription: TranscriptionWord[] = [
    { word: "Listen,", start: 0, end: 0.4, isFiller: false, isHighlighted: true },
    { word: "this", start: 0.4, end: 0.6, isFiller: false, isHighlighted: false },
    { word: "video", start: 0.6, end: 1.0, isFiller: false, isHighlighted: false },
    { word: "is", start: 1.0, end: 1.1, isFiller: false, isHighlighted: false },
    { word: "gonna", start: 1.1, end: 1.3, isFiller: false, isHighlighted: false },
    { word: "blow", start: 1.3, end: 1.7, isFiller: false, isHighlighted: true },
    { word: "your", start: 1.7, end: 1.9, isFiller: false, isHighlighted: false },
    { word: "mind.", start: 1.9, end: 2.5, isFiller: false, isHighlighted: true },
    { word: "Uh,", start: 2.5, end: 3.0, isFiller: true, isHighlighted: false },
    { word: "basically", start: 3.0, end: 3.5, isFiller: false, isHighlighted: false },
  ];

  const retentionCurve = Array.from({ length: 45 }, (_, i) => ({
    time: i,
    value: 100 - (i * 0.8) + Math.cos(i/3) * 12
  }));

  const insights: VideoInsights = {
    hookScore: 91,
    retentionRating: 'High',
    energyPeakSeconds: [0, 15, 38],
    viralPotential: 82
  };

  return {
    id: 'proj_' + Math.random().toString(36).substr(2, 5),
    name,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    aspectRatio: '16:9',
    scenes,
    transcription,
    retentionCurve,
    appliedEdits: [],
    insights,
    brandKit: { primaryColor: '#3b82f6', font: 'Inter' }
  };
};
