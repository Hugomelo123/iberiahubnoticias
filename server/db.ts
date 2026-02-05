import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import { nanoid } from "nanoid";

const { Pool } = pg;

// Verifica se DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL não definida - usando storage em memória");
}

// Cria pool de conexões PostgreSQL
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })
  : null;

// Cria instância do Drizzle
export const db = pool ? drizzle(pool, { schema }) : null;

// Função para testar conexão
export async function testConnection(): Promise<boolean> {
  if (!pool) {
    console.log("📦 Modo: Storage em memória (DATABASE_URL não definida)");
    return false;
  }

  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("✅ Conexão com PostgreSQL estabelecida");
    return true;
  } catch (error) {
    console.error("❌ Erro ao conectar com PostgreSQL:", error);
    return false;
  }
}

// Função para criar tabelas (seed inicial)
export async function initializeDatabase(): Promise<void> {
  if (!db || !pool) return;

  try {
    // Verifica se as tabelas existem, se não, cria-as
    console.log("🔄 Inicializando banco de dados...");

    // Criar tabelas se não existirem
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS stories (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        what_happened TEXT NOT NULL,
        why_it_matters TEXT NOT NULL,
        entity TEXT NOT NULL,
        time TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
        type TEXT NOT NULL,
        image TEXT,
        published BOOLEAN NOT NULL DEFAULT TRUE,
        author JSONB NOT NULL,
        content JSONB
      );

      CREATE TABLE IF NOT EXISTS matches (
        id TEXT PRIMARY KEY,
        team_a TEXT NOT NULL,
        team_b TEXT NOT NULL,
        competition TEXT NOT NULL,
        time TEXT NOT NULL,
        is_live BOOLEAN NOT NULL DEFAULT FALSE,
        caster TEXT,
        link TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS briefings (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        time TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);

    // Corrigir colunas que possam ter sido criadas como varchar(21) pelo Drizzle
    // ALTER TYPE é idempotente se já for TEXT
    await pool.query(`
      ALTER TABLE stories ALTER COLUMN id TYPE TEXT;
      ALTER TABLE stories ALTER COLUMN slug TYPE TEXT;
      ALTER TABLE stories ALTER COLUMN title TYPE TEXT;
      ALTER TABLE stories ALTER COLUMN what_happened TYPE TEXT;
      ALTER TABLE stories ALTER COLUMN why_it_matters TYPE TEXT;
      ALTER TABLE stories ALTER COLUMN entity TYPE TEXT;
      ALTER TABLE stories ALTER COLUMN time TYPE TEXT;
      ALTER TABLE stories ALTER COLUMN type TYPE TEXT;
      ALTER TABLE stories ALTER COLUMN image TYPE TEXT;

      ALTER TABLE matches ALTER COLUMN id TYPE TEXT;
      ALTER TABLE matches ALTER COLUMN team_a TYPE TEXT;
      ALTER TABLE matches ALTER COLUMN team_b TYPE TEXT;
      ALTER TABLE matches ALTER COLUMN competition TYPE TEXT;
      ALTER TABLE matches ALTER COLUMN time TYPE TEXT;
      ALTER TABLE matches ALTER COLUMN caster TYPE TEXT;
      ALTER TABLE matches ALTER COLUMN link TYPE TEXT;

      ALTER TABLE briefings ALTER COLUMN id TYPE TEXT;
      ALTER TABLE briefings ALTER COLUMN text TYPE TEXT;
      ALTER TABLE briefings ALTER COLUMN time TYPE TEXT;

      ALTER TABLE users ALTER COLUMN id TYPE TEXT;
      ALTER TABLE users ALTER COLUMN username TYPE TEXT;
      ALTER TABLE users ALTER COLUMN password TYPE TEXT;
    `);
    console.log("✅ Tabelas verificadas/criadas");

    // Seed dos utilizadores editores - criar ou atualizar
    const existingUsers = await db.select().from(schema.users);

    const editors = [
      // Fundadores
      { username: "hugo", password: process.env.PASS_HUGO || `temp_${nanoid(12)}` },
      { username: "eric", password: process.env.PASS_ERIC || `temp_${nanoid(12)}` },
      // Direção Editorial
      { username: "tiago", password: process.env.PASS_TIAGO || `temp_${nanoid(12)}` },
      { username: "ricardo", password: process.env.PASS_RICARDO || `temp_${nanoid(12)}` },
      // Marketing & Design
      { username: "paloma", password: process.env.PASS_PALOMA || `temp_${nanoid(12)}` },
      { username: "guilherme", password: process.env.PASS_GUILHERME || `temp_${nanoid(12)}` },
    ];

    if (existingUsers.length === 0) {
      // Criar novos utilizadores
      console.log("📝 Criando utilizadores editores...");

      for (const editor of editors) {
        await db.insert(schema.users).values({
          id: nanoid(),
          username: editor.username,
          password: editor.password,
        });
      }

      console.log(`✅ ${editors.length} utilizadores criados`);
    } else {
      // Atualizar passwords dos utilizadores existentes
      console.log("🔄 Atualizando passwords dos utilizadores...");

      for (const editor of editors) {
        const envVar = `PASS_${editor.username.toUpperCase()}`;
        if (process.env[envVar]) {
          const result = await pool.query(
            `UPDATE users SET password = $1 WHERE username = $2 RETURNING username`,
            [editor.password, editor.username]
          );
          if (result.rowCount && result.rowCount > 0) {
            console.log(`✅ Password atualizada para ${editor.username} (${editor.password.length} chars)`);
          } else {
            console.log(`⚠️  Utilizador ${editor.username} não encontrado na BD para atualizar`);
          }
        } else {
          console.log(`⚠️  Variável ${envVar} não definida`);
        }
      }

      // Debug: listar utilizadores na BD
      const allUsers = await pool.query(`SELECT username, LENGTH(password) as pwd_len FROM users`);
      console.log("📋 Utilizadores na BD:", allUsers.rows.map(u => `${u.username}(${u.pwd_len}chars)`).join(", "));
    }

    // Seed de dados iniciais se não houver stories
    const existingStories = await db.select().from(schema.stories);
    if (existingStories.length === 0) {
      console.log("📝 Criando dados de exemplo...");
      await seedInitialData();
    }

    console.log("✅ Banco de dados inicializado");
  } catch (error) {
    console.error("❌ Erro ao inicializar banco de dados:", error);
    throw error;
  }
}

// Seed de dados iniciais
async function seedInitialData(): Promise<void> {
  if (!db) return;

  // Stories
  const storiesData = [
    {
      id: nanoid(),
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
    },
    {
      id: nanoid(),
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
    },
    {
      id: nanoid(),
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
        hubLink: { text: "Ver estatísticas", url: "/match/ast-vit" },
      },
    },
    {
      id: nanoid(),
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
        hubLink: { text: "Ler patch notes", url: "/patch/jan-13" },
      },
    },
  ];

  for (const story of storiesData) {
    await db.insert(schema.stories).values(story);
  }

  // Matches
  const matchesData = [
    { id: nanoid(), teamA: "SAW", teamB: "G2", competition: "PGL Major Copenhaga", time: "20:00", isLive: true, caster: "Zorlak", link: "https://twitch.tv/zorlakoka" },
    { id: nanoid(), teamA: "Movistar KOI", teamB: "Astralis", competition: "RMR Europeu", time: "22:30", isLive: false, caster: "Archarom", link: "https://twitch.tv/rtparena" },
    { id: nanoid(), teamA: "Rhyno", teamB: "FTW", competition: "LPCS Spring", time: "18:00", isLive: false, caster: "Moreira", link: "https://twitch.tv/rtparena" },
    { id: nanoid(), teamA: "Eternal Fire", teamB: "Vitality", competition: "ESL Pro League", time: "15:00", isLive: false, caster: "Shootsgud", link: "https://twitch.tv/esl_csgo" },
  ];

  for (const match of matchesData) {
    await db.insert(schema.matches).values(match);
  }

  // Briefings
  const briefingsData = [
    { id: nanoid(), text: "SAW anuncia saída de arki após 2 anos de liderança técnica.", time: "10:30" },
    { id: nanoid(), text: "RMR Europeu: Datas confirmadas para Bucareste.", time: "09:15" },
    { id: nanoid(), text: "Movistar KOI fecha lineup com contratação de stadodo.", time: "08:00" },
    { id: nanoid(), text: "Valve lança update corretivo para maps de rotação.", time: "Ontem" },
  ];

  for (const briefing of briefingsData) {
    await db.insert(schema.briefings).values(briefing);
  }

  // Settings (maintenance mode)
  await db.insert(schema.settings).values({
    key: "maintenance_mode",
    value: "false",
  });
}
