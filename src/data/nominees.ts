// Golden Globes 2026 Event Intelligence Platform - Data Structure

export interface Nominee {
  id: string;
  name: string;
  type: 'actor' | 'director' | 'producer' | 'writer' | 'composer';
  image: string;
  project?: string;
  role?: string;
  winner: boolean;
  firstTimeWinner?: boolean;
  speech?: {
    length: number; // seconds
    excerpt: string;
    keywords: string[];
    emotionalTone: string;
  };
}

export interface Project {
  id: string;
  title: string;
  type: 'film' | 'television';
  poster: string;
  studio: string;
  streamingPlatform?: string;
  director: string;
  cast: string[];
  overview: string;
  nominations: number;
  wins: number;
  categories: string[];
}

export interface Category {
  id: string;
  name: string;
  type: 'film' | 'television';
  icon: string;
  nominees: Nominee[];
  winner: Nominee;
  presentedAt?: number; // timestamp in ceremony
  moment?: string;
  competitiveness: number; // 1-10
}

export interface Studio {
  name: string;
  nominations: number;
  wins: number;
  projects: string[];
}

export interface Connection {
  source: string;
  target: string;
  type: 'shared_project' | 'shared_nomination' | 'collaboration';
  project?: string;
}

// Ceremony Info
export const ceremonyInfo = {
  date: "January 5, 2026",
  host: "Nikki Glaser",
  venue: "The Beverly Hilton",
  broadcaster: "CBS",
  totalAwards: 27,
  totalNominees: 150,
  totalFilms: 45,
  totalShows: 35,
  firstTimeWinners: 8,
};

// Sample Categories with nominees
export const categories: Category[] = [
  {
    id: "best-picture-drama",
    name: "Best Motion Picture - Drama",
    type: "film",
    icon: "🎬",
    competitiveness: 9,
    nominees: [
      { id: "n1", name: "The Brutalist", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Brutalist", winner: true },
      { id: "n2", name: "Conclave", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Conclave", winner: false },
      { id: "n3", name: "A Complete Unknown", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "A Complete Unknown", winner: false },
      { id: "n4", name: "Sing Sing", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Sing Sing", winner: false },
      { id: "n5", name: "September 5", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "September 5", winner: false },
    ],
    winner: { id: "n1", name: "The Brutalist", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Brutalist", winner: true },
    moment: "The Brutalist wins Best Motion Picture - Drama, marking a major victory for independent cinema.",
  },
  {
    id: "best-picture-comedy",
    name: "Best Motion Picture - Musical or Comedy",
    type: "film",
    icon: "🎭",
    competitiveness: 8,
    nominees: [
      { id: "n6", name: "Anora", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Anora", winner: true, firstTimeWinner: true },
      { id: "n7", name: "A Real Pain", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "A Real Pain", winner: false },
      { id: "n8", name: "Challengers", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Challengers", winner: false },
      { id: "n9", name: "The Substance", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Substance", winner: false },
      { id: "n10", name: "Wicked", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Wicked", winner: false },
    ],
    winner: { id: "n6", name: "Anora", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Anora", winner: true, firstTimeWinner: true },
    moment: "Anora takes home the top comedy prize in a surprise upset.",
  },
  {
    id: "best-actor-drama",
    name: "Best Performance by an Actor - Drama",
    type: "film",
    icon: "男演员",
    competitiveness: 10,
    nominees: [
      { id: "n11", name: "Adrien Brody", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Brutalist", role: "László Tóth", winner: true },
      { id: "n12", name: "Timothée Chalamet", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "A Complete Unknown", role: "Bob Dylan", winner: false },
      { id: "n13", name: "Daniel Craig", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Queer", role: "William Lee", winner: false },
      { id: "n14", name: "Colman Domingo", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Sing Sing", role: "John 'Divine G' Whitfield", winner: false },
      { id: "n15", name: "Ralph Fiennes", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Conclave", role: "Cardinal Lawrence", winner: false },
    ],
    winner: { id: "n11", name: "Adrien Brody", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Brutalist", role: "László Tóth", winner: true },
    moment: "Adrien Brody delivers an emotional acceptance speech for his powerful performance in The Brutalist.",
  },
  {
    id: "best-actress-drama",
    name: "Best Performance by an Actress - Drama",
    type: "film",
    icon: "女演员",
    competitiveness: 9,
    nominees: [
      { id: "n16", name: "Fernanda Torres", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "I'm Still Here", role: "Eunice Paiva", winner: true, firstTimeWinner: true },
      { id: "n17", name: "Angelina Jolie", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Maria", role: "Maria Callas", winner: false },
      { id: "n18", name: "Nicole Kidman", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Babygirl", role: "Romy", winner: false },
      { id: "n19", name: "Tilda Swinton", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Room Next Door", role: "Martha", winner: false },
      { id: "n20", name: "Kate Winslet", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Lee", role: "Lee Miller", winner: false },
    ],
    winner: { id: "n16", name: "Fernanda Torres", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "I'm Still Here", role: "Eunice Paiva", winner: true, firstTimeWinner: true },
    moment: "Brazilian actress Fernanda Torres wins her first Golden Globe for her moving performance.",
  },
  {
    id: "best-tv-drama",
    name: "Best Television Series - Drama",
    type: "television",
    icon: "📺",
    competitiveness: 8,
    nominees: [
      { id: "n21", name: "Shōgun", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Shōgun", winner: true },
      { id: "n22", name: "The Diplomat", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Diplomat", winner: false },
      { id: "n23", name: "Mr. & Mrs. Smith", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Mr. & Mrs. Smith", winner: false },
      { id: "n24", name: "Slow Horses", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Slow Horses", winner: false },
      { id: "n25", name: "Squid Game", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Squid Game", winner: false },
    ],
    winner: { id: "n21", name: "Shōgun", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Shōgun", winner: true },
    moment: "Shōgun dominates the television drama categories, continuing its awards season success.",
  },
  {
    id: "best-tv-comedy",
    name: "Best Television Series - Musical or Comedy",
    type: "television",
    icon: "🎪",
    competitiveness: 7,
    nominees: [
      { id: "n26", name: "Hacks", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Hacks", winner: true },
      { id: "n27", name: "Abbott Elementary", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Abbott Elementary", winner: false },
      { id: "n28", name: "The Bear", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Bear", winner: false },
      { id: "n29", name: "The Gentlemen", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Gentlemen", winner: false },
      { id: "n30", name: "Nobody Wants This", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Nobody Wants This", winner: false },
    ],
    winner: { id: "n26", name: "Hacks", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Hacks", winner: true },
    moment: "Hacks wins big, cementing its place as one of television's top comedies.",
  },
  {
    id: "best-director",
    name: "Best Director - Motion Picture",
    type: "film",
    icon: "🎥",
    competitiveness: 10,
    nominees: [
      { id: "n31", name: "Brady Corbet", type: "director", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Brutalist", winner: true },
      { id: "n32", name: "Jacques Audiard", type: "director", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Emilia Pérez", winner: false },
      { id: "n33", name: "Edward Berger", type: "director", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Conclave", winner: false },
      { id: "n34", name: "Coralie Fargeat", type: "director", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Substance", winner: false },
      { id: "n35", name: "Denis Villeneuve", type: "director", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Dune: Part Two", winner: false },
    ],
    winner: { id: "n31", name: "Brady Corbet", type: "director", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Brutalist", winner: true },
    moment: "Brady Corbet wins for his ambitious vision in The Brutalist.",
  },
  {
    id: "best-supporting-actor",
    name: "Best Performance by a Male Actor in a Supporting Role",
    type: "film",
    icon: "🏆",
    competitiveness: 8,
    nominees: [
      { id: "n36", name: "Kieran Culkin", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "A Real Pain", role: "Benji Kaplan", winner: true },
      { id: "n37", name: "Yura Borisov", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Anora", role: "Igor", winner: false },
      { id: "n38", name: "Edward Norton", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "A Complete Unknown", role: "Pete Seeger", winner: false },
      { id: "n39", name: "Guy Pearce", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Brutalist", role: "Harrison Lee Van Buren", winner: false },
      { id: "n40", name: "Denzel Washington", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Gladiator II", role: "Macrinus", winner: false },
    ],
    winner: { id: "n36", name: "Kieran Culkin", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "A Real Pain", role: "Benji Kaplan", winner: true },
    moment: "Kieran Culkin's heartfelt and humorous performance earns him the Golden Globe.",
  },
  {
    id: "best-supporting-actress",
    name: "Best Performance by a Female Actor in a Supporting Role",
    type: "film",
    icon: "🏆",
    competitiveness: 9,
    nominees: [
      { id: "n41", name: "Zoe Saldaña", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Emilia Pérez", role: "Rita Mora Castro", winner: true },
      { id: "n42", name: "Selena Gomez", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Emilia Pérez", role: "Jessi Del Monte", winner: false },
      { id: "n43", name: "Ariana Grande", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Wicked", role: "Glinda", winner: false },
      { id: "n44", name: "Felicity Jones", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Brutalist", role: "Erzsébet Tóth", winner: false },
      { id: "n45", name: "Margaret Qualley", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "The Substance", role: "Sue", winner: false },
    ],
    winner: { id: "n41", name: "Zoe Saldaña", type: "actor", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Emilia Pérez", role: "Rita Mora Castro", winner: true },
    moment: "Zoe Saldaña wins for her powerful performance in Emilia Pérez.",
  },
  {
    id: "cinematic-achievement",
    name: "Cinematic and Box Office Achievement",
    type: "film",
    icon: "🌟",
    competitiveness: 6,
    nominees: [
      { id: "n46", name: "Wicked", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Wicked", winner: true },
      { id: "n47", name: "Deadpool & Wolverine", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Deadpool & Wolverine", winner: false },
      { id: "n48", name: "Dune: Part Two", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Dune: Part Two", winner: false },
      { id: "n49", name: "Gladiator II", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Gladiator II", winner: false },
      { id: "n50", name: "Inside Out 2", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Inside Out 2", winner: false },
    ],
    winner: { id: "n46", name: "Wicked", type: "producer", image: "https://image.tmdb.org/t/p/w500/placeholder.jpg", project: "Wicked", winner: true },
    moment: "Wicked takes home the Cinematic Achievement award for its box office dominance.",
  },
];

// Sample Projects
export const projects: Project[] = [
  {
    id: "the-brutalist",
    title: "The Brutalist",
    type: "film",
    poster: "https://image.tmdb.org/t/p/w500/placeholder.jpg",
    studio: "A24",
    director: "Brady Corbet",
    cast: ["Adrien Brody", "Felicity Jones", "Guy Pearce"],
    overview: "When a visionary architect and his wife flee post-war Europe in 1947 to rebuild their legacy in the United States, a mysterious, wealthy client changes their lives forever.",
    nominations: 7,
    wins: 3,
    categories: ["Best Motion Picture - Drama", "Best Director", "Best Actor - Drama"],
  },
  {
    id: "anora",
    title: "Anora",
    type: "film",
    poster: "https://image.tmdb.org/t/p/w500/placeholder.jpg",
    studio: "Neon",
    director: "Sean Baker",
    cast: ["Mikey Madison", "Yura Borisov"],
    overview: "A young sex worker from Brooklyn gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch.",
    nominations: 5,
    wins: 2,
    categories: ["Best Motion Picture - Musical or Comedy", "Best Actress - Musical or Comedy"],
  },
  {
    id: "shogun",
    title: "Shōgun",
    type: "television",
    poster: "https://image.tmdb.org/t/p/w500/placeholder.jpg",
    studio: "FX",
    streamingPlatform: "Hulu",
    director: "Jonathan van Tulleken",
    cast: ["Hiroyuki Sanada", "Cosmo Jarvis", "Anna Sawai"],
    overview: "Set in feudal Japan, Lord Yoshii Toranaga fights for his life as his enemies unite against him.",
    nominations: 6,
    wins: 4,
    categories: ["Best Television Series - Drama", "Best Actor - TV Drama", "Best Actress - TV Drama"],
  },
];

// Studio Stats
export const studios: Studio[] = [
  { name: "A24", nominations: 15, wins: 5, projects: ["The Brutalist", "A Real Pain", "Sing Sing"] },
  { name: "Netflix", nominations: 12, wins: 3, projects: ["Emilia Pérez", "The Substance", "Carry-On"] },
  { name: "FX/Hulu", nominations: 10, wins: 4, projects: ["Shōgun", "The Bear"] },
  { name: "Universal", nominations: 8, wins: 2, projects: ["Wicked", "Conclave"] },
  { name: "Neon", nominations: 6, wins: 2, projects: ["Anora", "The Seed of the Sacred Fig"] },
];

// Connections for network graph
export const connections: Connection[] = [
  { source: "Adrien Brody", target: "Brady Corbet", type: "collaboration", project: "The Brutalist" },
  { source: "Adrien Brody", target: "Felicity Jones", type: "shared_project", project: "The Brutalist" },
  { source: "Zoe Saldaña", target: "Selena Gomez", type: "shared_project", project: "Emilia Pérez" },
  { source: "Kieran Culkin", target: "Jesse Eisenberg", type: "collaboration", project: "A Real Pain" },
];

// Calculate statistics
export const getStatistics = () => {
  const allNominees = categories.flatMap(c => c.nominees);
  const winners = categories.map(c => c.winner);
  const firstTimeWinners = winners.filter(w => w.firstTimeWinner);

  return {
    totalAwards: categories.length,
    totalNominees: allNominees.length,
    filmCategories: categories.filter(c => c.type === 'film').length,
    tvCategories: categories.filter(c => c.type === 'television').length,
    firstTimeWinners: firstTimeWinners.length,
    mostAwardedProject: projects.sort((a, b) => b.wins - a.wins)[0],
    mostNominatedProject: projects.sort((a, b) => b.nominations - a.nominations)[0],
  };
};
