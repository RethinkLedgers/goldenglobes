import { categories } from "./nominees";

// Category Intelligence Types
export interface NomineeIntelligence {
  nomineeName: string;
  film?: string;
  image: string;
  winProbability: number;
  historicalSimilarity: {
    score: number;
    comparableWinners: string[];
    matchRate: string;
  };
  upsetRisk: {
    level: "Low" | "Moderate" | "High";
    score: number;
    factors: string[];
  };
  momentum: {
    rating: number;
    trend: "Rising" | "Stable" | "Cooling";
    weeklyChange: string;
  };
  narrativeStrength: {
    score: number;
    elements: string[];
  };
  executiveSummary: string;
  keyInsight: string;
  strongContenderReasons: string[];
  historicalPatterns: string[];
  riskFactors: string[];
}

export interface CategoryIntelligence {
  categoryName: string;
  categoryType: 'individual' | 'film';
  nominees: NomineeIntelligence[];
  raceTightness: number;
  favorite: string;
  raceDescription: string;
  categoryHistory: {
    pastWinners: { year: number; winner: string; film?: string }[];
    insights: string[];
    trends: string[];
  };
}

// AI Awards Analyst data for top films
export interface AnalystReport {
  film: string;
  image: string;
  nominations: number;
  winProbability: number;
  historicalSimilarity: {
    score: number;
    comparableFilms: string[];
    matchRate: string;
  };
  upsetRisk: {
    level: "Low" | "Moderate" | "High";
    score: number;
    factors: string[];
  };
  momentum: {
    rating: number;
    trend: "Rising" | "Stable" | "Cooling";
    weeklyChange: string;
  };
  narrativeStrength: {
    score: number;
    elements: string[];
    awardsCircuit: string;
  };
  executiveSummary: string;
  keyInsight: string;
}

export const analystReports: AnalystReport[] = [
  {
    film: "Sinners",
    image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg",
    nominations: 10,
    winProbability: 67,
    historicalSimilarity: {
      score: 84,
      comparableFilms: ["The Shape of Water (2018)", "Get Out (2017)", "Black Panther (2019)"],
      matchRate: "7 of 10 similar films won"
    },
    upsetRisk: {
      level: "Low",
      score: 28,
      factors: [
        "Strong across all major categories",
        "Director + Picture + Screenplay combo historically strong",
        "No significant controversy or backlash"
      ]
    },
    momentum: {
      rating: 92,
      trend: "Rising",
      weeklyChange: "+4% from guild announcements"
    },
    narrativeStrength: {
      score: 88,
      elements: [
        "Cultural phenomenon status",
        "Ryan Coogler's first nomination",
        "Representation milestone",
        "Critical and commercial crossover"
      ],
      awardsCircuit: "Swept major precursors"
    },
    executiveSummary: "Sinners enters ceremony night as the definitive frontrunner, combining critical acclaim with cultural resonance. Coogler's genre-defying approach mirrors recent Best Picture winners that broke traditional molds. The film's 10 nominations across major and technical categories signals broad Academy support—a key predictor of ultimate success.",
    keyInsight: "Films with 10+ nominations and Director+Screenplay nods have won 73% of the time in the expanded era."
  },
  {
    film: "One Battle After Another",
    image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg",
    nominations: 9,
    winProbability: 24,
    historicalSimilarity: {
      score: 71,
      comparableFilms: ["There Will Be Blood (2008)", "Licorice Pizza (2022)", "American Hustle (2014)"],
      matchRate: "3 of 8 similar films won"
    },
    upsetRisk: {
      level: "Moderate",
      score: 45,
      factors: [
        "PTA's history of nominations without wins",
        "Could split prestige drama votes",
        "Strong alternative for traditionalists"
      ]
    },
    momentum: {
      rating: 78,
      trend: "Stable",
      weeklyChange: "+1% steady positioning"
    },
    narrativeStrength: {
      score: 72,
      elements: [
        "Academy favorite director",
        "Period prestige elements",
        "Star-studded ensemble",
        "Craftsmanship across departments"
      ],
      awardsCircuit: "Strong guild showing but missed key precursors"
    },
    executiveSummary: "Paul Thomas Anderson's latest represents the traditional prestige drama contingent. While critically respected and technically accomplished, the film faces an uphill battle against the cultural momentum of Sinners. PTA's eight previous nominations without a win creates a compelling narrative, but may also suggest the Academy's preference for his peers in competitive years.",
    keyInsight: "Runner-up positioning in most major categories suggests potential spoiler role if frontrunner stumbles."
  },
  {
    film: "Sentimental Value",
    image: "https://image.tmdb.org/t/p/w500/pz9NCWxxOk3o0W3v1Zkhawrwb4i.jpg",
    nominations: 8,
    winProbability: 6,
    historicalSimilarity: {
      score: 65,
      comparableFilms: ["The Worst Person in the World (2022)", "Parasite (2020)", "Roma (2019)"],
      matchRate: "2 of 5 similar films won"
    },
    upsetRisk: {
      level: "High",
      score: 72,
      factors: [
        "International film factor",
        "Limited theatrical release",
        "Strong but niche appeal"
      ]
    },
    momentum: {
      rating: 68,
      trend: "Rising",
      weeklyChange: "+6% post-critics awards"
    },
    narrativeStrength: {
      score: 81,
      elements: [
        "Universal critical acclaim",
        "Emotional storytelling",
        "International cinema spotlight",
        "Strong acting branch support"
      ],
      awardsCircuit: "Won top critics prizes, building late momentum"
    },
    executiveSummary: "Joachim Trier's family drama represents the international arthouse contingent with surprising strength across categories. While Best Picture remains unlikely, strong showing in International Feature and acting categories could signal future Academy trends. The film's emotional resonance and critical support make it a dark horse worth monitoring.",
    keyInsight: "International films rarely win Best Picture but often secure major category wins—watch Supporting Actress."
  },
  {
    film: "Frankenstein",
    image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg",
    nominations: 7,
    winProbability: 2,
    historicalSimilarity: {
      score: 52,
      comparableFilms: ["The Shape of Water (2018)", "Poor Things (2024)", "Nightmare Alley (2022)"],
      matchRate: "1 of 4 similar films won"
    },
    upsetRisk: {
      level: "High",
      score: 85,
      factors: [
        "Genre bias persists",
        "Netflix distribution factor",
        "Dark subject matter"
      ]
    },
    momentum: {
      rating: 54,
      trend: "Cooling",
      weeklyChange: "-3% from peak positioning"
    },
    narrativeStrength: {
      score: 69,
      elements: [
        "Del Toro's vision and pedigree",
        "Technical achievement",
        "Literary adaptation prestige",
        "Jacob Elordi breakout"
      ],
      awardsCircuit: "Strong craft support, mixed precursor results"
    },
    executiveSummary: "Guillermo del Toro's gothic adaptation showcases the director's signature craft but faces significant headwinds. Horror-adjacent films remain underrepresented in top categories despite recent inroads. The film's best chances lie in technical categories and potentially Supporting Actor, where Elordi's transformation has garnered attention.",
    keyInsight: "Technical categories remain the primary path to Oscar gold for genre films of this caliber."
  }
];

// Calculate nomination counts per film
export function getNominationLeaderboard() {
  const filmCounts: Record<string, { title: string; count: number; image: string }> = {};

  categories.forEach(category => {
    category.nominees.forEach(nominee => {
      // For actor/actress categories, use the "details" field which contains the film name
      const filmTitle = nominee.details || nominee.title;
      if (!filmCounts[filmTitle]) {
        filmCounts[filmTitle] = {
          title: filmTitle,
          count: 0,
          image: nominee.image
        };
      }
      filmCounts[filmTitle].count++;
    });
  });

  return Object.values(filmCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

// Studio data (inferred from films)
export const studioBreakdown = [
  { studio: "Warner Bros.", films: ["Sinners", "Marty Supreme", "F1"], nominations: 14, color: "#0047AB" },
  { studio: "A24", films: ["The Secret Agent", "Sentimental Value"], nominations: 8, color: "#1CE783" },
  { studio: "Netflix", films: ["Frankenstein", "Hamnet", "Train Dreams"], nominations: 11, color: "#E50914" },
  { studio: "Universal", films: ["One Battle After Another"], nominations: 9, color: "#278E46" },
  { studio: "Focus Features", films: ["Bugonia", "Blue Moon"], nominations: 6, color: "#F5A623" },
  { studio: "Neon", films: ["It Was Just an Accident"], nominations: 3, color: "#FF6B6B" },
  { studio: "Disney", films: ["Avatar: Fire and Ash", "Zootopia 2"], nominations: 4, color: "#113CCF" },
  { studio: "Sony Pictures", films: ["Weapons", "The Smashing Machine"], nominations: 3, color: "#FFFFFF" },
];

// First-time nominees
export const firstTimeNominees = [
  { name: "Joachim Trier", category: "Best Director", film: "Sentimental Value", image: "https://image.tmdb.org/t/p/w500/o5KXJRWbzyGYSxDhXsBqbCiZnqU.jpg" },
  { name: "Wagner Moura", category: "Best Actor", film: "The Secret Agent", image: "https://image.tmdb.org/t/p/w500/yJjV1ZCQbCSSgRy05FncCKjyaY4.jpg" },
  { name: "Renate Reinsve", category: "Best Actress", film: "Sentimental Value", image: "https://image.tmdb.org/t/p/w500/eepHWTjtKRdGcrtchFb3axdp2eL.jpg" },
  { name: "Jacob Elordi", category: "Best Supporting Actor", film: "Frankenstein", image: "https://image.tmdb.org/t/p/w500/qZNRPWCP2c5d0YaYLTzHXU9Rdoe.jpg" },
  { name: "Inga Ibsdotter Lilleaas", category: "Best Supporting Actress", film: "Sentimental Value", image: "https://image.tmdb.org/t/p/w500/wlZPIgnXMpK3Nvvhg0bZzmWxZDH.jpg" },
  { name: "Teyana Taylor", category: "Best Supporting Actress", film: "One Battle After Another", image: "https://image.tmdb.org/t/p/w500/foj8l6GGlZxZXcW6pU5wnNxDjSx.jpg" },
];

// Category competitiveness (how tight is the race)
export const categoryCompetitiveness = [
  { category: "Best Picture", tightness: 85, favorite: "Sinners", description: "Very tight race between Sinners and One Battle After Another" },
  { category: "Best Actor", tightness: 72, favorite: "Timothée Chalamet", description: "Chalamet leads but DiCaprio gaining momentum" },
  { category: "Best Actress", tightness: 90, favorite: "Undecided", description: "Wide open race with no clear frontrunner" },
  { category: "Best Director", tightness: 68, favorite: "Ryan Coogler", description: "Coogler has edge after Sinners success" },
  { category: "Best Supporting Actor", tightness: 55, favorite: "Jacob Elordi", description: "Elordi's breakout performance leads" },
  { category: "Best Supporting Actress", tightness: 78, favorite: "Undecided", description: "Multiple strong contenders" },
  { category: "Best Original Screenplay", tightness: 82, favorite: "Sinners", description: "Coogler's original script highly praised" },
  { category: "Best Adapted Screenplay", tightness: 60, favorite: "Train Dreams", description: "Literary adaptation leads" },
];

// Historical comparison data
export const historicalComparison = {
  currentYear: {
    year: 2026,
    totalNominations: 115,
    mostNominated: { film: "Sinners", count: 10 },
    categories: 23,
    firstTimeNominees: 34,
  },
  comparisons: [
    { year: 2025, mostNominated: "Emilia Pérez", count: 13, winner: "Anora" },
    { year: 2024, mostNominated: "Oppenheimer", count: 13, winner: "Oppenheimer" },
    { year: 2023, mostNominated: "Everything Everywhere", count: 11, winner: "Everything Everywhere" },
    { year: 2022, mostNominated: "The Power of the Dog", count: 12, winner: "CODA" },
    { year: 2021, mostNominated: "Mank", count: 10, winner: "Nomadland" },
    { year: 2020, mostNominated: "Joker", count: 11, winner: "Parasite" },
    { year: 2019, mostNominated: "Roma", count: 10, winner: "Green Book" },
    { year: 2018, mostNominated: "The Shape of Water", count: 13, winner: "The Shape of Water" },
    { year: 2017, mostNominated: "La La Land", count: 14, winner: "Moonlight" },
    { year: 2016, mostNominated: "The Revenant", count: 12, winner: "Spotlight" },
  ],
  insights: [
    "Sinners' 10 nominations matches the average for eventual Best Picture winners over the past decade",
    "This year has the highest percentage of first-time nominees (34) since 2019",
    "Horror elements in Sinners mark only the 4th time a film with supernatural themes led nominations",
    "International films account for 23% of all nominations, a record high",
  ],
};

// Network Graph Data
export interface NetworkNode {
  id: string;
  type: "actor" | "director" | "studio" | "pastWinner";
  name: string;
  image?: string;
  x: number;
  y: number;
  info?: string;
}

export interface NetworkEdge {
  source: string;
  target: string;
  type: "actor-director" | "director-studio" | "studio-winner";
  collaborations?: string[];
}

export const networkNodes: NetworkNode[] = [
  // Actors (left column)
  { id: "chalamet", type: "actor", name: "Timothée Chalamet", image: "https://image.tmdb.org/t/p/w500/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg", x: 80, y: 80, info: "2x Oscar nominee, Marty Supreme" },
  { id: "dicaprio", type: "actor", name: "Leonardo DiCaprio", image: "https://image.tmdb.org/t/p/w500/iqPBAdsFdAVCdahQM29kTG6UgD7.jpg", x: 80, y: 180, info: "Oscar winner, One Battle After Another" },
  { id: "jordan", type: "actor", name: "Michael B. Jordan", image: "https://image.tmdb.org/t/p/w500/515xNvaMC6xOEOlo0sFqW69ZqUH.jpg", x: 80, y: 280, info: "3x nominee, Sinners" },
  { id: "stone", type: "actor", name: "Emma Stone", image: "https://image.tmdb.org/t/p/w500/cZ8a3QvAnj2cgcgVL6g4XaqPzpL.jpg", x: 80, y: 380, info: "2x Oscar winner, Bugonia" },
  { id: "hawke", type: "actor", name: "Ethan Hawke", image: "https://image.tmdb.org/t/p/w500/2LoTr6x0TEM7L5em4kSx1VmGDgG.jpg", x: 80, y: 480, info: "4x nominee, Blue Moon" },

  // Directors (center column)
  { id: "coogler", type: "director", name: "Ryan Coogler", image: "https://image.tmdb.org/t/p/w500/dux4DCDaL6c639DTXGiV7nm1wcN.jpg", x: 280, y: 120, info: "Black Panther, Creed, Sinners" },
  { id: "pta", type: "director", name: "Paul Thomas Anderson", image: "https://image.tmdb.org/t/p/w500/wKAs2LtLYSUzt3ZZ8pnxMwuEWuR.jpg", x: 280, y: 240, info: "8x nominee, One Battle After Another" },
  { id: "safdie", type: "director", name: "Josh Safdie", image: "https://image.tmdb.org/t/p/w500/iNyilK3Ag6qeOguc0zysxZXEIpJ.jpg", x: 280, y: 360, info: "Uncut Gems, Marty Supreme" },
  { id: "zhao", type: "director", name: "Chloé Zhao", image: "https://image.tmdb.org/t/p/w500/r8DmTdOqHbDUydCOVb277rncPTK.jpg", x: 280, y: 480, info: "Oscar winner, Hamnet" },

  // Studios (right-center column) - using film posters as representations
  { id: "warner", type: "studio", name: "Warner Bros.", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", x: 480, y: 100, info: "14 nominations this year" },
  { id: "universal", type: "studio", name: "Universal", image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg", x: 480, y: 220, info: "9 nominations this year" },
  { id: "netflix", type: "studio", name: "Netflix", image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg", x: 480, y: 340, info: "11 nominations this year" },
  { id: "a24", type: "studio", name: "A24", image: "https://image.tmdb.org/t/p/w500/pz9NCWxxOk3o0W3v1Zkhawrwb4i.jpg", x: 480, y: 460, info: "8 nominations this year" },

  // Past Winners (right column) - using movie poster URLs
  { id: "oppenheimer", type: "pastWinner", name: "Oppenheimer", image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", x: 680, y: 100, info: "Best Picture 2024" },
  { id: "everything", type: "pastWinner", name: "Everything Everywhere", image: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", x: 680, y: 220, info: "Best Picture 2023" },
  { id: "nomadland", type: "pastWinner", name: "Nomadland", image: "https://image.tmdb.org/t/p/w500/qUcmHz2fqnQUshP4mdw5eU2flpC.jpg", x: 680, y: 340, info: "Best Picture 2021" },
  { id: "parasite", type: "pastWinner", name: "Parasite", image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", x: 680, y: 460, info: "Best Picture 2020" },
];

export const networkEdges: NetworkEdge[] = [
  // Actor-Director connections
  { source: "jordan", target: "coogler", type: "actor-director", collaborations: ["Creed", "Black Panther", "Sinners"] },
  { source: "dicaprio", target: "pta", type: "actor-director", collaborations: ["One Battle After Another"] },
  { source: "chalamet", target: "safdie", type: "actor-director", collaborations: ["Marty Supreme"] },
  { source: "stone", target: "pta", type: "actor-director", collaborations: ["Bugonia (rumored)"] },
  { source: "hawke", target: "zhao", type: "actor-director", collaborations: ["Blue Moon"] },

  // Director-Studio connections
  { source: "coogler", target: "warner", type: "director-studio", collaborations: ["Black Panther series", "Sinners"] },
  { source: "pta", target: "universal", type: "director-studio", collaborations: ["One Battle After Another", "Licorice Pizza"] },
  { source: "safdie", target: "warner", type: "director-studio", collaborations: ["Marty Supreme", "Uncut Gems"] },
  { source: "zhao", target: "netflix", type: "director-studio", collaborations: ["Hamnet", "Nomadland"] },

  // Studio-Past Winner connections
  { source: "warner", target: "oppenheimer", type: "studio-winner", collaborations: ["Distributed Oppenheimer"] },
  { source: "a24", target: "everything", type: "studio-winner", collaborations: ["Distributed Everything Everywhere"] },
  { source: "netflix", target: "nomadland", type: "studio-winner", collaborations: ["Streaming distribution"] },
  { source: "universal", target: "parasite", type: "studio-winner", collaborations: ["International distribution partner"] },
];
