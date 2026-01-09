
export type EditActionType = 
  | 'JUMP_CUT' 
  | 'DYNAMIC_ZOOM' 
  | 'CAPTION_STYLE' 
  | 'B_ROLL' 
  | 'MUSIC_DUCK' 
  | 'COLOR_GRADE' 
  | 'BRANDING' 
  | 'AI_REWRITE';

export type Platform = 'tiktok' | 'youtube_long' | 'youtube_shorts' | 'instagram' | 'linkedin';

export type ExportStatus = 'idle' | 'queued' | 'processing' | 'completed';

export type PublishStatus = 'idle' | 'connecting' | 'uploading' | 'processing' | 'published' | 'failed' | 'expired';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AccountConnection {
  platform: Platform;
  username: string;
  avatarUrl: string;
  isConnected: boolean;
  accessToken?: string;
  accountId?: string; // Instagram Business Account ID
  pageId?: string;    // Linked Facebook Page ID
  expiresAt?: number;
}

export interface PostConfig {
  title: string;
  description: string;
  hashtags: string[];
  scheduleTime?: string;
  isDraft: boolean;
}

export interface ExportPreset {
  id: Platform;
  name: string;
  icon: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  recommendedResolution: string;
  status: ExportStatus;
  progress: number;
  downloadUrl?: string;
  shareUrl?: string;
  publishStatus: PublishStatus;
  publishedUrl?: string;
  error?: string;
}

export interface VideoInsights {
  hookScore: number;
  retentionRating: 'High' | 'Average' | 'Low';
  energyPeakSeconds: number[];
  viralPotential: number;
}

export interface Scene {
  id: string;
  startTime: number;
  endTime: number;
  description: string;
  energyScore: number;
  sentiment: 'positive' | 'neutral' | 'negative' | 'intense';
  isKeyMoment: boolean;
  thumbnail: string;
}

export interface TranscriptionWord {
  word: string;
  start: number;
  end: number;
  isFiller: boolean;
  isHighlighted: boolean;
}

export interface EditProject {
  id: string;
  name: string;
  videoUrl: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  scenes: Scene[];
  transcription: TranscriptionWord[];
  retentionCurve: { time: number; value: number }[];
  appliedEdits: EditAction[];
  insights: VideoInsights;
  brandKit: { primaryColor: string; font: string };
}

export interface EditAction {
  id: string;
  type: EditActionType;
  timestamp: number;
  description: string;
  aiReasoning: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  actions?: EditAction[];
}
