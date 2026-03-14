
export enum Module {
  DASHBOARD = 'DASHBOARD',
  NEWSLETTER = 'NEWSLETTER',
  ASSETS = 'ASSETS',
  SETTINGS = 'SETTINGS'
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: string;
}

export interface NewsletterCampaign {
  id: string;
  title: string;
  subject: string;
  content: string;
  createdAt: string;
  status: 'draft' | 'sent';
  recipientsCount: number;
}

export interface GenerationConfig {
  topic: string;
  tone: string;
  includeOffer: boolean;
  audienceType: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
  bpm?: number;
  key?: string;
}

export interface MediaItem {
  id: string;
  type: 'video' | 'image' | 'audio';
  url: string;
  label: string;
  fileName?: string;
}
