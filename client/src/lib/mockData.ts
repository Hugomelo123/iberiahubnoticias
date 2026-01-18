// Types usados pela aplicação
// Os dados agora vêm da API, estes types são mantidos para referência

export interface Story {
  id: string;
  slug: string;
  title: string;
  whatHappened: string;
  whyItMatters: string;
  entity: string;
  time: string;
  timestamp: Date;
  type: 'match' | 'transfer' | 'news' | 'interview';
  image?: string;
  published?: boolean;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content?: {
    block1: string;
    block2: string;
    hubLink: {
      text: string;
      url: string;
    }
  }
}

export interface BriefingItem {
  id: string;
  text: string;
  time: string;
}

export interface MatchLive {
  id: string;
  teamA: string;
  teamB: string;
  competition: string;
  time: string;
  isLive: boolean;
  caster?: string;
  link: string;
}

