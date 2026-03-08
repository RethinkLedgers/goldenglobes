// Golden Globes 2026 Nominees Data
// Nominations will be announced December 2025

export const ceremonyInfo = {
  date: "January 2026",
  host: "TBA",
  venue: "The Beverly Hilton",
  broadcaster: "CBS",
};

export interface Nominee {
  title: string;
  image: string;
  details?: string;
  description?: string;
}

export interface Category {
  name: string;
  icon: string;
  nominees: Nominee[];
}

// Placeholder categories - actual nominees TBA
export const categories: Category[] = [
  {
    name: "Best Motion Picture - Drama",
    icon: "🎬",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
  {
    name: "Best Motion Picture - Musical or Comedy",
    icon: "🎭",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
  {
    name: "Best Director - Motion Picture",
    icon: "🎥",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
  {
    name: "Best Performance by an Actor - Drama",
    icon: "男演员",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
  {
    name: "Best Performance by an Actress - Drama",
    icon: "女演员",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
  {
    name: "Best Television Series - Drama",
    icon: "📺",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
  {
    name: "Best Television Series - Musical or Comedy",
    icon: "🎪",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
  {
    name: "Best Limited Series or Motion Picture Made for Television",
    icon: "🎞️",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
  {
    name: "Cinematic and Box Office Achievement",
    icon: "🏆",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
  {
    name: "Best Original Score - Motion Picture",
    icon: "🎵",
    nominees: [
      { title: "Nominee TBA", image: "https://via.placeholder.com/300x450/1a1a1a/C5A44E?text=TBA" },
    ],
  },
];
