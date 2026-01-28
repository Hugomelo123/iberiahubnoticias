import { 
  User, InsertUser, 
  Story, InsertStory, 
  Match, InsertMatch,
  Briefing, InsertBriefing 
} from "@shared/schema";
import { randomUUID } from "crypto";

// Helper: gerar slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper: tempo relativo em PT
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "Agora mesmo";
  if (diffMins < 60) return `Há ${diffMins} minutos`;
  if (diffHours < 24) return `Há ${diffHours} horas`;
  if (diffDays === 1) return "Ontem";
  return `Há ${diffDays} dias`;
}

export interface IStorage {
  // Auth
  getUserByPassword(password: string): Promise<User | undefined>;

  // Stories
  getAllStories(): Promise<Story[]>;
  getStoryBySlug(slug: string): Promise<Story | undefined>;
  createStory(story: InsertStory): Promise<Story>;
  updateStory(id: string, story: Partial<InsertStory>): Promise<Story | undefined>;
  deleteStory(id: string): Promise<boolean>;

  // Matches
  getAllMatches(): Promise<Match[]>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatch(id: string, match: Partial<InsertMatch>): Promise<Match | undefined>;
  deleteMatch(id: string): Promise<boolean>;

  // Briefings
  getAllBriefings(): Promise<Briefing[]>;
  createBriefing(briefing: InsertBriefing): Promise<Briefing>;
  deleteBriefing(id: string): Promise<boolean>;

  // Maintenance
  getMaintenanceMode(): Promise<boolean>;
  setMaintenanceMode(enabled: boolean): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private stories: Map<string, Story> = new Map();
  private matches: Map<string, Match> = new Map();
  private briefings: Map<string, Briefing> = new Map();
  private maintenanceMode: boolean = false;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Editor user
    const editorId = randomUUID();
    this.users.set(editorId, {
      id: editorId,
      username: "editor",
      password: "iberia2026"
    });

    // Stories
    const story1: Story = {
      id: randomUUID(),
      slug: "saw-major-copenhagen-qualificacao",
      title: "SAW faz história e garante vaga no Major",
      whatHappened: "A equipa portuguesa venceu a Fnatic por 2-0 no decisivo do RMR e carimbou a passagem a Copenhaga.",
      whyItMatters: "É a primeira vez que um quinteto totalmente português alcança o maior palco do Counter-Strike mundial.",
      entity: "SAW",
      time: "Há 2 horas",
      timestamp: new Date(),
      type: "match",
      image: "/attached_assets/generated_images/dark_cinematic_esports_arena_stage_with_spotlights.png",
      published: true,
      author: { name: "Ricardo 'vts' Moreira", role: "Editor-Chefe" },
      content: {
        block1: "Numa série controlada do início ao fim, a SAW superou os fantasmas do passado. Com um 13-5 em Vertigo e 13-10 em Ancient, a equipa liderada por MUTiRiS não deu hipóteses à histórica organização Fnatic.",
        block2: "Este resultado valida anos de investimento no cenário ibérico e quebra a 'maldição' dos RMRs anteriores. Portugal entra finalmente no mapa principal do CS2.",
        hubLink: { text: "Ver perfil da SAW", url: "/team/saw" }
      }
    };
    this.stories.set(story1.id, story1);

    const story2: Story = {
      id: randomUUID(),
      slug: "stadodo-movistar-koi",
      title: "Stadodo é o novo sniper da KOI",
      whatHappened: "O AWPer português junta-se ao projeto ibérico para a nova temporada.",
      whyItMatters: "Reencontro com antigos colegas e uma nova oportunidade internacional.",
      entity: "Movistar KOI",
      time: "Há 4 horas",
      timestamp: new Date(Date.now() - 4 * 3600000),
      type: "transfer",
      image: "/attached_assets/generated_images/esports_team_emotional_huddle_dark_lighting.png",
      published: true,
      author: { name: "Gonçalo 'Pizituh' Pinto", role: "Repórter" },
      content: {
        block1: "Após meses de especulação, a organização espanhola confirmou a contratação. Stadodo chega para ocupar a vaga deixada em aberto.",
        block2: "O movimento consolida a mistura de talentos portugueses e espanhóis na scene.",
        hubLink: { text: "Ver perfil de Stadodo", url: "/player/stadodo" }
      }
    };
    this.stories.set(story2.id, story2);

    const story3: Story = {
      id: randomUUID(),
      slug: "blast-spring-groups",
      title: "Astralis surpreende na estreia da BLAST",
      whatHappened: "A equipa dinamarquesa bateu a Vitality na abertura do grupo A.",
      whyItMatters: "Primeiro teste real para o novo lineup com dev1ce a IGL.",
      entity: "Astralis",
      time: "Ontem",
      timestamp: new Date(Date.now() - 24 * 3600000),
      type: "match",
      published: true,
      author: { name: "Redação IberiaHub", role: "Equipa Editorial" },
      content: {
        block1: "Contra todas as expectativas, a Astralis apresentou um T-side avassalador em Overpass.",
        block2: "A performance de dev1ce como capitão calou os críticos.",
        hubLink: { text: "Ver estatísticas", url: "/match/ast-vit" }
      }
    };
    this.stories.set(story3.id, story3);

    const story4: Story = {
      id: randomUUID(),
      slug: "cs2-update-economy",
      title: "Valve ajusta economia no novo patch",
      whatHappened: "Mudanças no loss bonus e recompensas de kill de caçadeira.",
      whyItMatters: "Alteração fundamental no meta competitivo antes do Major.",
      entity: "Valve",
      time: "Ontem",
      timestamp: new Date(Date.now() - 25 * 3600000),
      type: "news",
      published: true,
      author: { name: "Redação IberiaHub", role: "Equipa Editorial" },
      content: {
        block1: "A atualização desta noite trouxe ajustes solicitados há muito pelos pros.",
        block2: "Estas mudanças prometem reduzir os 'eco rounds' aborrecidos.",
        hubLink: { text: "Ler patch notes", url: "/patch/jan-13" }
      }
    };
    this.stories.set(story4.id, story4);

    // Matches
    const matchesData = [
      { teamA: 'SAW', teamB: 'G2', competition: 'PGL Major Copenhaga', time: '20:00', isLive: true, caster: 'Zorlak', link: 'https://twitch.tv/zorlakoka' },
      { teamA: 'Movistar KOI', teamB: 'Astralis', competition: 'RMR Europeu', time: '22:30', isLive: false, caster: 'Archarom', link: 'https://twitch.tv/rtparena' },
      { teamA: 'Rhyno', teamB: 'FTW', competition: 'LPCS Spring', time: '18:00', isLive: false, caster: 'Moreira', link: 'https://twitch.tv/rtparena' },
      { teamA: 'Eternal Fire', teamB: 'Vitality', competition: 'ESL Pro League', time: '15:00', isLive: false, caster: 'Shootsgud', link: 'https://twitch.tv/esl_csgo' },
    ];
    matchesData.forEach(m => {
      const id = randomUUID();
      this.matches.set(id, { id, ...m });
    });

    // Briefings
    const briefingsData = [
      { text: "SAW anuncia saída de arki após 2 anos de liderança técnica.", time: "10:30" },
      { text: "RMR Europeu: Datas confirmadas para Bucareste.", time: "09:15" },
      { text: "Movistar KOI fecha lineup com contratação de stadodo.", time: "08:00" },
      { text: "Valve lança update corretivo para maps de rotação.", time: "Ontem" },
    ];
    briefingsData.forEach(b => {
      const id = randomUUID();
      this.briefings.set(id, { id, ...b });
    });
  }

  // AUTH
  async getUserByPassword(password: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.password === password);
  }

  // STORIES
  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values())
      .map(s => ({ ...s, time: formatTimeAgo(s.timestamp) }))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getStoryBySlug(slug: string): Promise<Story | undefined> {
    const story = Array.from(this.stories.values()).find(s => s.slug === slug);
    return story ? { ...story, time: formatTimeAgo(story.timestamp) } : undefined;
  }

  async createStory(data: InsertStory): Promise<Story> {
    const id = randomUUID();
    const story: Story = {
      ...data,
      id,
      slug: generateSlug(data.title),
      time: formatTimeAgo(data.timestamp),
    };
    this.stories.set(id, story);
    return story;
  }

  async updateStory(id: string, data: Partial<InsertStory>): Promise<Story | undefined> {
    const existing = this.stories.get(id);
    if (!existing) return undefined;
    
    const updated: Story = {
      ...existing,
      ...data,
      slug: data.title ? generateSlug(data.title) : existing.slug,
      time: formatTimeAgo(data.timestamp || existing.timestamp),
    };
    this.stories.set(id, updated);
    return updated;
  }

  async deleteStory(id: string): Promise<boolean> {
    return this.stories.delete(id);
  }

  // MATCHES
  async getAllMatches(): Promise<Match[]> {
    return Array.from(this.matches.values());
  }

  async createMatch(data: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const match: Match = { id, ...data };
    this.matches.set(id, match);
    return match;
  }

  async updateMatch(id: string, data: Partial<InsertMatch>): Promise<Match | undefined> {
    const existing = this.matches.get(id);
    if (!existing) return undefined;
    
    const updated: Match = { ...existing, ...data };
    this.matches.set(id, updated);
    return updated;
  }

  async deleteMatch(id: string): Promise<boolean> {
    return this.matches.delete(id);
  }

  // BRIEFINGS
  async getAllBriefings(): Promise<Briefing[]> {
    return Array.from(this.briefings.values());
  }

  async createBriefing(data: InsertBriefing): Promise<Briefing> {
    const id = randomUUID();
    const briefing: Briefing = { id, ...data };
    this.briefings.set(id, briefing);
    return briefing;
  }

  async deleteBriefing(id: string): Promise<boolean> {
    return this.briefings.delete(id);
  }

  // MAINTENANCE
  async getMaintenanceMode(): Promise<boolean> {
    return this.maintenanceMode;
  }

  async setMaintenanceMode(enabled: boolean): Promise<void> {
    this.maintenanceMode = enabled;
  }
}

export const storage = new MemStorage();
