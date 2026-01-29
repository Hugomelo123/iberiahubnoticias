import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import {
  User, InsertUser,
  Story, InsertStory,
  Match, InsertMatch,
  Briefing, InsertBriefing,
  users, stories, matches, briefings, settings,
} from "@shared/schema";
import { randomUUID } from "crypto";

// Helper: gerar slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
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

// ============ DATABASE STORAGE (PostgreSQL) ============
export class DatabaseStorage implements IStorage {
  // AUTH
  async getUserByPassword(password: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(users).where(eq(users.password, password));
    return result[0];
  }

  // STORIES
  async getAllStories(): Promise<Story[]> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(stories).orderBy(desc(stories.timestamp));
    return result.map((s) => ({
      ...s,
      type: s.type as Story["type"],
      time: formatTimeAgo(s.timestamp),
      author: s.author as Story["author"],
      content: s.content as Story["content"],
    }));
  }

  async getStoryBySlug(slug: string): Promise<Story | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(stories).where(eq(stories.slug, slug));
    if (result.length === 0) return undefined;
    const s = result[0];
    return {
      ...s,
      type: s.type as Story["type"],
      time: formatTimeAgo(s.timestamp),
      author: s.author as Story["author"],
      content: s.content as Story["content"],
    };
  }

  async createStory(data: InsertStory): Promise<Story> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const slug = generateSlug(data.title);
    const timestamp = data.timestamp ?? new Date();
    const time = formatTimeAgo(timestamp);

    const storyData = {
      id,
      slug,
      time,
      title: data.title,
      whatHappened: data.whatHappened,
      whyItMatters: data.whyItMatters,
      entity: data.entity,
      timestamp,
      type: data.type,
      image: data.image ?? null,
      published: data.published ?? true,
      author: data.author,
      content: data.content,
    };

    await db.insert(stories).values(storyData);
    return storyData;
  }

  async updateStory(id: string, data: Partial<InsertStory>): Promise<Story | undefined> {
    if (!db) throw new Error("Database not connected");

    const existing = await db.select().from(stories).where(eq(stories.id, id));
    if (existing.length === 0) return undefined;

    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) {
      updateData.title = data.title;
      updateData.slug = generateSlug(data.title);
    }
    if (data.whatHappened !== undefined) updateData.whatHappened = data.whatHappened;
    if (data.whyItMatters !== undefined) updateData.whyItMatters = data.whyItMatters;
    if (data.entity !== undefined) updateData.entity = data.entity;
    if (data.timestamp !== undefined) {
      updateData.timestamp = data.timestamp;
      updateData.time = formatTimeAgo(data.timestamp);
    }
    if (data.type !== undefined) updateData.type = data.type;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.published !== undefined) updateData.published = data.published;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.content !== undefined) updateData.content = data.content;

    await db.update(stories).set(updateData).where(eq(stories.id, id));

    const updated = await db.select().from(stories).where(eq(stories.id, id));
    if (updated.length === 0) return undefined;

    const s = updated[0];
    return {
      ...s,
      type: s.type as Story["type"],
      time: formatTimeAgo(s.timestamp),
      author: s.author as Story["author"],
      content: s.content as Story["content"],
    };
  }

  async deleteStory(id: string): Promise<boolean> {
    if (!db) throw new Error("Database not connected");
    const result = await db.delete(stories).where(eq(stories.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // MATCHES
  async getAllMatches(): Promise<Match[]> {
    if (!db) throw new Error("Database not connected");
    return await db.select().from(matches);
  }

  async createMatch(data: InsertMatch): Promise<Match> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const match: Match = {
      id,
      teamA: data.teamA,
      teamB: data.teamB,
      competition: data.competition,
      time: data.time,
      isLive: data.isLive ?? false,
      caster: data.caster ?? null,
      link: data.link,
    };
    await db.insert(matches).values(match);
    return match;
  }

  async updateMatch(id: string, data: Partial<InsertMatch>): Promise<Match | undefined> {
    if (!db) throw new Error("Database not connected");

    const existing = await db.select().from(matches).where(eq(matches.id, id));
    if (existing.length === 0) return undefined;

    await db.update(matches).set(data).where(eq(matches.id, id));

    const updated = await db.select().from(matches).where(eq(matches.id, id));
    return updated[0];
  }

  async deleteMatch(id: string): Promise<boolean> {
    if (!db) throw new Error("Database not connected");
    const result = await db.delete(matches).where(eq(matches.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // BRIEFINGS
  async getAllBriefings(): Promise<Briefing[]> {
    if (!db) throw new Error("Database not connected");
    return await db.select().from(briefings);
  }

  async createBriefing(data: InsertBriefing): Promise<Briefing> {
    if (!db) throw new Error("Database not connected");
    const id = randomUUID();
    const briefing = { id, ...data };
    await db.insert(briefings).values(briefing);
    return briefing;
  }

  async deleteBriefing(id: string): Promise<boolean> {
    if (!db) throw new Error("Database not connected");
    const result = await db.delete(briefings).where(eq(briefings.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // MAINTENANCE
  async getMaintenanceMode(): Promise<boolean> {
    if (!db) throw new Error("Database not connected");
    try {
      const result = await db.select().from(settings).where(eq(settings.key, "maintenance_mode"));
      if (result.length === 0) return false;
      return result[0].value === "true";
    } catch (error: any) {
      // Se a tabela não existir, retorna false (manutenção desligada)
      if (error.message?.includes("relation") && error.message?.includes("does not exist")) {
        console.warn("⚠️  Tabela 'settings' não existe - manutenção desligada por defeito");
        return false;
      }
      throw error;
    }
  }

  async setMaintenanceMode(enabled: boolean): Promise<void> {
    if (!db) throw new Error("Database not connected");
    try {
      const existing = await db.select().from(settings).where(eq(settings.key, "maintenance_mode"));
      if (existing.length === 0) {
        await db.insert(settings).values({ key: "maintenance_mode", value: enabled.toString() });
      } else {
        await db.update(settings).set({ value: enabled.toString() }).where(eq(settings.key, "maintenance_mode"));
      }
    } catch (error: any) {
      // Se a tabela não existir, cria-a primeiro
      if (error.message?.includes("relation") && error.message?.includes("does not exist")) {
        console.warn("⚠️  Tabela 'settings' não existe - a criar...");
        // Criar tabela manualmente via raw query
        const pool = (db as any).$client;
        await pool.query(`
          CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
          )
        `);
        // Inserir valor
        await db.insert(settings).values({ key: "maintenance_mode", value: enabled.toString() });
        return;
      }
      throw error;
    }
  }
}

// ============ MEMORY STORAGE (Fallback) ============
export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private storiesMap: Map<string, Story> = new Map();
  private matchesMap: Map<string, Match> = new Map();
  private briefingsMap: Map<string, Briefing> = new Map();
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
      password: process.env.AUTH_PASSWORD || "iberia2026",
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
        hubLink: { text: "Ver perfil da SAW", url: "/team/saw" },
      },
    };
    this.storiesMap.set(story1.id, story1);

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
        hubLink: { text: "Ver perfil de Stadodo", url: "/player/stadodo" },
      },
    };
    this.storiesMap.set(story2.id, story2);

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
      image: null,
      published: true,
      author: { name: "Redação IberiaHub", role: "Equipa Editorial" },
      content: {
        block1: "Contra todas as expectativas, a Astralis apresentou um T-side avassalador em Overpass.",
        block2: "A performance de dev1ce como capitão calou os críticos.",
        hubLink: { text: "Ver estatísticas", url: "/match/ast-vit" },
      },
    };
    this.storiesMap.set(story3.id, story3);

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
      image: null,
      published: true,
      author: { name: "Redação IberiaHub", role: "Equipa Editorial" },
      content: {
        block1: "A atualização desta noite trouxe ajustes solicitados há muito pelos pros.",
        block2: "Estas mudanças prometem reduzir os 'eco rounds' aborrecidos.",
        hubLink: { text: "Ler patch notes", url: "/patch/jan-13" },
      },
    };
    this.storiesMap.set(story4.id, story4);

    // Matches
    const matchesData = [
      { teamA: "SAW", teamB: "G2", competition: "PGL Major Copenhaga", time: "20:00", isLive: true, caster: "Zorlak", link: "https://twitch.tv/zorlakoka" },
      { teamA: "Movistar KOI", teamB: "Astralis", competition: "RMR Europeu", time: "22:30", isLive: false, caster: "Archarom", link: "https://twitch.tv/rtparena" },
      { teamA: "Rhyno", teamB: "FTW", competition: "LPCS Spring", time: "18:00", isLive: false, caster: "Moreira", link: "https://twitch.tv/rtparena" },
      { teamA: "Eternal Fire", teamB: "Vitality", competition: "ESL Pro League", time: "15:00", isLive: false, caster: "Shootsgud", link: "https://twitch.tv/esl_csgo" },
    ];
    matchesData.forEach((m) => {
      const id = randomUUID();
      this.matchesMap.set(id, { id, ...m });
    });

    // Briefings
    const briefingsData = [
      { text: "SAW anuncia saída de arki após 2 anos de liderança técnica.", time: "10:30" },
      { text: "RMR Europeu: Datas confirmadas para Bucareste.", time: "09:15" },
      { text: "Movistar KOI fecha lineup com contratação de stadodo.", time: "08:00" },
      { text: "Valve lança update corretivo para maps de rotação.", time: "Ontem" },
    ];
    briefingsData.forEach((b) => {
      const id = randomUUID();
      this.briefingsMap.set(id, { id, ...b });
    });
  }

  // AUTH
  async getUserByPassword(password: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.password === password);
  }

  // STORIES
  async getAllStories(): Promise<Story[]> {
    return Array.from(this.storiesMap.values())
      .map((s) => ({ ...s, time: formatTimeAgo(s.timestamp) }))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getStoryBySlug(slug: string): Promise<Story | undefined> {
    const story = Array.from(this.storiesMap.values()).find((s) => s.slug === slug);
    return story ? { ...story, time: formatTimeAgo(story.timestamp) } : undefined;
  }

  async createStory(data: InsertStory): Promise<Story> {
    const id = randomUUID();
    const timestamp = data.timestamp ?? new Date();
    const story: Story = {
      id,
      slug: generateSlug(data.title),
      title: data.title,
      whatHappened: data.whatHappened,
      whyItMatters: data.whyItMatters,
      entity: data.entity,
      time: formatTimeAgo(timestamp),
      timestamp,
      type: data.type,
      image: data.image ?? null,
      published: data.published ?? true,
      author: data.author,
      content: data.content,
    };
    this.storiesMap.set(id, story);
    return story;
  }

  async updateStory(id: string, data: Partial<InsertStory>): Promise<Story | undefined> {
    const existing = this.storiesMap.get(id);
    if (!existing) return undefined;

    const timestamp = data.timestamp ?? existing.timestamp;
    const updated: Story = {
      ...existing,
      ...data,
      image: data.image !== undefined ? (data.image ?? null) : existing.image,
      slug: data.title ? generateSlug(data.title) : existing.slug,
      time: formatTimeAgo(timestamp),
      timestamp,
    };
    this.storiesMap.set(id, updated);
    return updated;
  }

  async deleteStory(id: string): Promise<boolean> {
    return this.storiesMap.delete(id);
  }

  // MATCHES
  async getAllMatches(): Promise<Match[]> {
    return Array.from(this.matchesMap.values());
  }

  async createMatch(data: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const match: Match = {
      id,
      teamA: data.teamA,
      teamB: data.teamB,
      competition: data.competition,
      time: data.time,
      isLive: data.isLive ?? false,
      caster: data.caster ?? null,
      link: data.link,
    };
    this.matchesMap.set(id, match);
    return match;
  }

  async updateMatch(id: string, data: Partial<InsertMatch>): Promise<Match | undefined> {
    const existing = this.matchesMap.get(id);
    if (!existing) return undefined;

    const updated: Match = { ...existing, ...data };
    this.matchesMap.set(id, updated);
    return updated;
  }

  async deleteMatch(id: string): Promise<boolean> {
    return this.matchesMap.delete(id);
  }

  // BRIEFINGS
  async getAllBriefings(): Promise<Briefing[]> {
    return Array.from(this.briefingsMap.values());
  }

  async createBriefing(data: InsertBriefing): Promise<Briefing> {
    const id = randomUUID();
    const briefing: Briefing = { id, ...data };
    this.briefingsMap.set(id, briefing);
    return briefing;
  }

  async deleteBriefing(id: string): Promise<boolean> {
    return this.briefingsMap.delete(id);
  }

  // MAINTENANCE
  async getMaintenanceMode(): Promise<boolean> {
    return this.maintenanceMode;
  }

  async setMaintenanceMode(enabled: boolean): Promise<void> {
    this.maintenanceMode = enabled;
  }
}

// ============ STORAGE FACTORY ============
// Usa DatabaseStorage se PostgreSQL disponível, senão MemStorage
export function createStorage(): IStorage {
  if (db) {
    console.log("🗄️  Usando PostgreSQL como storage");
    return new DatabaseStorage();
  } else {
    console.log("📦 Usando storage em memória (dados não persistem)");
    return new MemStorage();
  }
}

// Exporta storage singleton - será inicializado quando o módulo for carregado
export const storage = createStorage();
