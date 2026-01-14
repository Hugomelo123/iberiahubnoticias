import heroImage from '@assets/generated_images/dark_cinematic_esports_arena_stage_with_spotlights.png';
import teamImage from '@assets/generated_images/esports_team_emotional_huddle_dark_lighting.png';

export interface Story {
  id: string;
  slug: string;
  title: string;
  whatHappened: string;
  whyItMatters: string;
  entity: string; // Team or Player
  time: string;
  timestamp: Date; // For sorting
  type: 'match' | 'transfer' | 'news' | 'interview';
  image?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content?: {
    block1: string; // What happened detailed
    block2: string; // Why it matters detailed
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

export const liveMatches: MatchLive[] = [
  { 
    id: 'm1', 
    teamA: 'SAW', 
    teamB: 'G2', 
    competition: 'PGL Major Copenhaga', 
    time: '20:00', 
    isLive: true, 
    caster: 'Zorlak', 
    link: 'https://twitch.tv/zorlakoka' 
  },
  { 
    id: 'm2', 
    teamA: 'Movistar KOI', 
    teamB: 'Astralis', 
    competition: 'RMR Europeu', 
    time: '22:30', 
    isLive: false, 
    caster: 'Archarom', 
    link: 'https://twitch.tv/rtparena' 
  }
];

export const briefingItems: BriefingItem[] = [
  { id: '1', text: "SAW anuncia saída de arki após 2 anos de liderança técnica.", time: "10:30" },
  { id: '2', text: "RMR Europeu: Datas confirmadas para Bucareste.", time: "09:15" },
  { id: '3', text: "Movistar KOI fecha lineup com contratação de stadodo.", time: "08:00" },
  { id: '4', text: "Valve lança update corretivo para maps de rotação.", time: "Ontem" },
];

export const stories: Story[] = [
  {
    id: '1',
    slug: 'saw-major-copenhagen-qualificacao',
    title: "SAW faz história e garante vaga no Major",
    whatHappened: "A equipa portuguesa venceu a Fnatic por 2-0 no decisivo do RMR e carimbou a passagem a Copenhaga.",
    whyItMatters: "É a primeira vez que um quinteto totalmente português alcança o maior palco do Counter-Strike mundial.",
    entity: "SAW",
    time: "Há 2 horas",
    timestamp: new Date(),
    type: 'match',
    image: heroImage,
    author: {
      name: "Ricardo 'vts' Moreira",
      role: "Editor-Chefe",
    },
    content: {
      block1: "Numa série controlada do início ao fim, a SAW superou os fantasmas do passado. Com um 13-5 em Vertigo e 13-10 em Ancient, a equipa liderada por MUTiRiS não deu hipóteses à histórica organização Fnatic. Ewjerkz foi o destaque estatístico, mas a coesão tática foi o verdadeiro diferencial.",
      block2: "Este resultado valida anos de investimento no cenário ibérico e quebra a 'maldição' dos RMRs anteriores. Portugal entra finalmente no mapa principal do CS2, abrindo portas para maior visibilidade, investimento e inspiração para a nova geração de jogadores nacionais.",
      hubLink: {
        text: "Ver perfil da SAW",
        url: "/team/saw"
      }
    }
  },
  {
    id: '2',
    slug: 'stadodo-movistar-koi',
    title: "Stadodo é o novo sniper da KOI",
    whatHappened: "O AWPer português junta-se ao projeto ibérico para a nova temporada.",
    whyItMatters: "Reencontro com antigos colegas e uma nova oportunidade internacional.",
    entity: "Movistar KOI",
    time: "Há 4 horas",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    type: 'transfer',
    image: teamImage,
    author: {
      name: "Gonçalo 'Pizituh' Pinto",
      role: "Repórter",
    },
    content: {
      block1: "Após meses de especulação, a organização espanhola confirmou a contratação. Stadodo chega para ocupar a vaga deixada em aberto, trazendo experiência e consistência à equipa que procura recuperar o estatuto na região.",
      block2: "O movimento consolida a mistura de talentos portugueses e espanhóis na scene, provando que a 'Iberian Superteam' continua a ser um conceito viável e competitivo.",
      hubLink: {
        text: "Ver perfil de Stadodo",
        url: "/player/stadodo"
      }
    }
  },
  {
    id: '3',
    slug: 'blast-spring-groups',
    title: "Astralis surpreende na estreia da BLAST",
    whatHappened: "A equipa dinamarquesa bateu a Vitality na abertura do grupo A.",
    whyItMatters: "Primeiro teste real para o novo lineup com dev1ce a IGL.",
    entity: "Astralis",
    time: "Ontem",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: 'match',
    author: {
      name: "Redação IberiaHub",
      role: "Equipa Editorial",
    },
    content: {
      block1: "Contra todas as expectativas, a Astralis apresentou um T-side avassalador em Overpass. A Vitality, atual número 1 do mundo, pareceu lenta a reagir às adaptações táticas dos dinamarqueses.",
      block2: "A performance de dev1ce como capitão calou os críticos, mostrando que consegue manter o nível de fragging enquanto lidera. O grupo A fica agora totalmente em aberto.",
      hubLink: {
        text: "Ver estatísticas da partida",
        url: "/match/ast-vit"
      }
    }
  },
  {
    id: '4',
    slug: 'cs2-update-economy',
    title: "Valve ajusta economia no novo patch",
    whatHappened: "Mudanças no loss bonus e recompensas de kill de caçadeira.",
    whyItMatters: "Alteração fundamental no meta competitivo antes do Major.",
    entity: "Valve",
    time: "Ontem",
    timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000),
    type: 'news',
    author: {
      name: "Redação IberiaHub",
      role: "Equipa Editorial",
    },
    content: {
      block1: "A atualização desta noite trouxe ajustes solicitados há muito pelos pros. O loss bonus agora reseta de forma diferente, permitindo mais buy rounds, e a Zeus x27 voltou a ter cooldown reduzido.",
      block2: "Estas mudanças prometem reduzir os 'eco rounds' aborrecidos e aumentar a frequência de gun rounds, tornando as partidas mais dinâmicas para os espectadores.",
      hubLink: {
        text: "Ler patch notes completas",
        url: "/patch/jan-13"
      }
    }
  }
];
