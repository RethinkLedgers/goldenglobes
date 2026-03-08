#!/usr/bin/env npx tsx
/**
 * Golden Globes Ceremony Snippet Finder
 *
 * Searches YouTube and web sources for Golden Globes ceremony clips,
 * highlights, acceptance speeches, and red carpet moments.
 *
 * Usage:
 *   npx tsx scripts/find-ceremony-snippets.ts [options]
 *
 * Options:
 *   --category <name>   Filter by category (e.g., "Best Picture")
 *   --type <type>        Clip type: speech | highlight | redcarpet | backstage | all (default: all)
 *   --year <year>        Ceremony year (default: 2026)
 *   --nominee <name>     Search for specific nominee
 *   --limit <n>          Max results (default: 10)
 *   --json               Output as JSON
 */

const GOLDEN_GLOBES_CHANNELS = {
  official: {
    name: "Golden Globe Awards",
    youtubeHandle: "@goldenglobes",
    youtubeChannelId: "UCWMvEkmW2LbRRkMiQPGm49A",
    website: "https://goldenglobes.com",
  },
  nbc: {
    name: "NBC",
    youtubeHandle: "@NBC",
    youtubeChannelId: "UCHDkGxOLRj0B0CdysfFo0gA",
    website: "https://nbc.com/golden-globe-awards",
  },
  peacock: {
    name: "Peacock",
    youtubeHandle: "@peacock",
    youtubeChannelId: "UCJ1cFYDGrmWj5TYHiOjRiJQ",
    website: "https://peacocktv.com",
  },
  variety: {
    name: "Variety",
    youtubeHandle: "@Variety",
    youtubeChannelId: "UCgRQHK8Ttr1j9xCEpCAlgbQ",
    website: "https://variety.com/t/golden-globes/",
  },
  hollywoodReporter: {
    name: "The Hollywood Reporter",
    youtubeHandle: "@hollywoodreporter",
    youtubeChannelId: "UCwmI8v8l0nVEaAFaDTMnBMg",
    website: "https://hollywoodreporter.com/t/golden-globes/",
  },
};

const SNIPPET_TYPES = {
  speech: {
    label: "Acceptance Speeches",
    searchTerms: ["acceptance speech", "wins", "winner speech", "award speech"],
  },
  highlight: {
    label: "Ceremony Highlights",
    searchTerms: ["highlights", "best moments", "ceremony", "opening monologue", "recap"],
  },
  redcarpet: {
    label: "Red Carpet",
    searchTerms: ["red carpet", "arrivals", "fashion", "interviews arrivals"],
  },
  backstage: {
    label: "Backstage & Press Room",
    searchTerms: ["backstage", "press room", "behind the scenes", "after party"],
  },
};

interface SnippetQuery {
  category?: string;
  type: keyof typeof SNIPPET_TYPES | "all";
  year: number;
  nominee?: string;
  limit: number;
  json: boolean;
}

interface SnippetResult {
  title: string;
  source: string;
  type: string;
  searchUrl: string;
  channelUrl: string;
  websiteUrl: string;
}

function parseArgs(): SnippetQuery {
  const args = process.argv.slice(2);
  const query: SnippetQuery = {
    type: "all",
    year: 2026,
    limit: 10,
    json: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--category":
        query.category = args[++i];
        break;
      case "--type":
        query.type = args[++i] as SnippetQuery["type"];
        break;
      case "--year":
        query.year = parseInt(args[++i], 10);
        break;
      case "--nominee":
        query.nominee = args[++i];
        break;
      case "--limit":
        query.limit = parseInt(args[++i], 10);
        break;
      case "--json":
        query.json = true;
        break;
    }
  }

  return query;
}

function buildYouTubeSearchUrl(terms: string[], channelId?: string): string {
  const query = encodeURIComponent(terms.join(" "));
  const base = "https://www.youtube.com/results";
  const params = channelId
    ? `?search_query=${query}+channel:${channelId}`
    : `?search_query=${query}`;
  return `${base}${params}`;
}

function findSnippets(query: SnippetQuery): SnippetResult[] {
  const results: SnippetResult[] = [];
  const baseTerms = [`Golden Globes ${query.year}`];

  if (query.nominee) baseTerms.push(query.nominee);
  if (query.category) baseTerms.push(query.category);

  const types =
    query.type === "all"
      ? (Object.keys(SNIPPET_TYPES) as (keyof typeof SNIPPET_TYPES)[])
      : [query.type];

  for (const type of types) {
    const snippetType = SNIPPET_TYPES[type];
    if (!snippetType) continue;

    for (const [key, channel] of Object.entries(GOLDEN_GLOBES_CHANNELS)) {
      for (const term of snippetType.searchTerms) {
        if (results.length >= query.limit) break;

        const searchTerms = [...baseTerms, term];
        results.push({
          title: `${snippetType.label}: "${searchTerms.join(" ")}"`,
          source: channel.name,
          type: snippetType.label,
          searchUrl: buildYouTubeSearchUrl(searchTerms, channel.youtubeChannelId),
          channelUrl: `https://youtube.com/${channel.youtubeHandle}`,
          websiteUrl: channel.website,
        });
      }
    }
  }

  return results.slice(0, query.limit);
}

function printResults(results: SnippetResult[], query: SnippetQuery): void {
  if (query.json) {
    console.log(JSON.stringify({ query, results, channels: GOLDEN_GLOBES_CHANNELS }, null, 2));
    return;
  }

  console.log("\n============================================");
  console.log("  Golden Globes Ceremony Snippet Finder");
  console.log("============================================\n");
  console.log(`Year: ${query.year}`);
  if (query.category) console.log(`Category: ${query.category}`);
  if (query.nominee) console.log(`Nominee: ${query.nominee}`);
  console.log(`Type: ${query.type}`);
  console.log(`\n--- ${results.length} Search Links Found ---\n`);

  for (const [i, result] of results.entries()) {
    console.log(`${i + 1}. [${result.source}] ${result.title}`);
    console.log(`   YouTube Search: ${result.searchUrl}`);
    console.log(`   Channel: ${result.channelUrl}`);
    console.log("");
  }

  console.log("--- Official Sources ---\n");
  for (const channel of Object.values(GOLDEN_GLOBES_CHANNELS)) {
    console.log(`  ${channel.name}`);
    console.log(`    YouTube: https://youtube.com/${channel.youtubeHandle}`);
    console.log(`    Website: ${channel.website}`);
    console.log("");
  }
}

// Main
const query = parseArgs();
const results = findSnippets(query);
printResults(results, query);
