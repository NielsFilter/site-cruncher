export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  authProvider: 'google' | 'github';
  createdAt: Date;
}

export interface Cruncher {
  id: string;
  userId: string;
  name: string;
  modelKey: string; // Encrypted before storage
  modelName: string;
  systemPrompt: string;
  sitemapUrl: string;
  documentsEnabled?: boolean; // For future document upload feature
  createdAt: Date;
  updatedAt: Date;
}

export interface CrunchRun {
  id: string;
  cruncherId: string;
  timestamp: Date;
  totalPagesCrawled: number;
  totalChunksGenerated: number;
  crawlDuration: number; // in milliseconds
  status: 'completed' | 'failed' | 'in-progress';
  error?: string;
}

export interface CrunchedData {
  id: string;
  cruncherId: string;
  runId: string;
  url: string;
  chunkNumber: number;
  title: string;
  summary: string;
  content: string;
  metadata: Record<string, any>;
  embedding?: number[]; // Vector representation
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  cruncherId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Settings {
  storeChatHistory: boolean;
  theme: 'light' | 'dark' | 'system';
}
