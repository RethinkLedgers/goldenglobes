"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface NetworkNode {
  id: string;
  type: "actor" | "director" | "producer" | "studio" | "winner";
  name: string;
  image?: string;
  x: number;
  y: number;
  info: string;
  awards?: string;
}

interface NetworkEdge {
  source: string;
  target: string;
  type: "actor-director" | "director-producer" | "studio-winner";
  collaborations: string[];
  strength: number;
}

const nodes: NetworkNode[] = [
  // Actors (spread across)
  { id: "chalamet", type: "actor", name: "Timothée Chalamet", image: "https://image.tmdb.org/t/p/w500/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg", x: 150, y: 120, info: "2x Oscar Nominee", awards: "Marty Supreme" },
  { id: "dicaprio", type: "actor", name: "Leonardo DiCaprio", image: "https://image.tmdb.org/t/p/w500/iqPBAdsFdAVCdahQM29kTG6UgD7.jpg", x: 120, y: 280, info: "Oscar Winner", awards: "The Revenant" },
  { id: "jordan", type: "actor", name: "Michael B. Jordan", image: "https://image.tmdb.org/t/p/w500/515xNvaMC6xOEOlo0sFqW69ZqUH.jpg", x: 180, y: 440, info: "3x Nominee", awards: "Sinners, Creed" },
  { id: "stone", type: "actor", name: "Emma Stone", image: "https://image.tmdb.org/t/p/w500/cZ8a3QvAnj2cgcgVL6g4XaqPzpL.jpg", x: 250, y: 200, info: "2x Oscar Winner", awards: "La La Land, Poor Things" },
  { id: "hawke", type: "actor", name: "Ethan Hawke", image: "https://image.tmdb.org/t/p/w500/2LoTr6x0TEM7L5em4kSx1VmGDgG.jpg", x: 220, y: 380, info: "4x Nominee", awards: "Boyhood, Training Day" },
  { id: "buckley", type: "actor", name: "Jessie Buckley", image: "https://image.tmdb.org/t/p/w500/i8IlkFbZqKUgkypZKpdhrw00uqw.jpg", x: 100, y: 180, info: "2x Nominee", awards: "The Lost Daughter" },

  // Directors (center constellation)
  { id: "coogler", type: "director", name: "Ryan Coogler", image: "https://image.tmdb.org/t/p/w500/dux4DCDaL6c639DTXGiV7nm1wcN.jpg", x: 400, y: 160, info: "3x Nominee", awards: "Black Panther, Creed, Sinners" },
  { id: "pta", type: "director", name: "Paul Thomas Anderson", image: "https://image.tmdb.org/t/p/w500/wKAs2LtLYSUzt3ZZ8pnxMwuEWuR.jpg", x: 380, y: 340, info: "8x Nominee", awards: "There Will Be Blood, Phantom Thread" },
  { id: "safdie", type: "director", name: "Josh Safdie", image: "https://image.tmdb.org/t/p/w500/iNyilK3Ag6qeOguc0zysxZXEIpJ.jpg", x: 450, y: 480, info: "1x Nominee", awards: "Uncut Gems, Marty Supreme" },
  { id: "zhao", type: "director", name: "Chloé Zhao", image: "https://image.tmdb.org/t/p/w500/r8DmTdOqHbDUydCOVb277rncPTK.jpg", x: 320, y: 260, info: "Oscar Winner", awards: "Nomadland" },
  { id: "delToro", type: "director", name: "Guillermo del Toro", image: "https://image.tmdb.org/t/p/w500/aYomJWx0B2B8ra6Rmgt8lr0XCrw.jpg", x: 480, y: 240, info: "3x Oscar Winner", awards: "Shape of Water, Pinocchio" },

  // Producers (inner ring)
  { id: "feige", type: "producer", name: "Kevin Feige", x: 620, y: 140, info: "Marvel Studios President", awards: "Black Panther, Avengers" },
  { id: "pascal", type: "producer", name: "Pascal Pictures", x: 600, y: 320, info: "Amy Pascal", awards: "Little Women, Spider-Verse" },
  { id: "planB", type: "producer", name: "Plan B", x: 650, y: 460, info: "Brad Pitt's Company", awards: "12 Years a Slave, Moonlight" },
  { id: "a24prod", type: "producer", name: "A24 Productions", x: 580, y: 400, info: "Independent Studio", awards: "Everything Everywhere, Moonlight" },

  // Studios (outer ring)
  { id: "warner", type: "studio", name: "Warner Bros.", x: 800, y: 180, info: "14 nominations 2026" },
  { id: "universal", type: "studio", name: "Universal", x: 820, y: 340, info: "9 nominations 2026" },
  { id: "netflix", type: "studio", name: "Netflix", x: 780, y: 480, info: "11 nominations 2026" },
  { id: "a24", type: "studio", name: "A24", x: 850, y: 260, info: "8 nominations 2026" },
  { id: "disney", type: "studio", name: "Disney", x: 830, y: 420, info: "4 nominations 2026" },

  // Past Winners (scattered)
  { id: "oppenheimer", type: "winner", name: "Oppenheimer", x: 950, y: 150, info: "Best Picture 2024" },
  { id: "everything", type: "winner", name: "Everything Everywhere", x: 980, y: 280, info: "Best Picture 2023" },
  { id: "nomadland", type: "winner", name: "Nomadland", x: 920, y: 380, info: "Best Picture 2021" },
  { id: "parasite", type: "winner", name: "Parasite", x: 960, y: 480, info: "Best Picture 2020" },
  { id: "greenBook", type: "winner", name: "Green Book", x: 900, y: 220, info: "Best Picture 2019" },
  { id: "shapeWater", type: "winner", name: "Shape of Water", x: 940, y: 420, info: "Best Picture 2018" },
];

const edges: NetworkEdge[] = [
  // Actor-Director connections
  { source: "jordan", target: "coogler", type: "actor-director", collaborations: ["Creed", "Black Panther", "Sinners"], strength: 3 },
  { source: "dicaprio", target: "pta", type: "actor-director", collaborations: ["One Battle After Another"], strength: 1 },
  { source: "chalamet", target: "safdie", type: "actor-director", collaborations: ["Marty Supreme"], strength: 1 },
  { source: "stone", target: "pta", type: "actor-director", collaborations: ["Bugonia (rumored)"], strength: 1 },
  { source: "hawke", target: "zhao", type: "actor-director", collaborations: ["Hamnet"], strength: 1 },
  { source: "buckley", target: "zhao", type: "actor-director", collaborations: ["Hamnet"], strength: 1 },
  { source: "stone", target: "delToro", type: "actor-director", collaborations: ["Poor Things"], strength: 1 },

  // Director-Producer connections
  { source: "coogler", target: "feige", type: "director-producer", collaborations: ["Black Panther series"], strength: 3 },
  { source: "coogler", target: "pascal", type: "director-producer", collaborations: ["Sinners"], strength: 1 },
  { source: "pta", target: "planB", type: "director-producer", collaborations: ["One Battle After Another"], strength: 1 },
  { source: "zhao", target: "a24prod", type: "director-producer", collaborations: ["Nomadland"], strength: 2 },
  { source: "delToro", target: "netflix", type: "director-producer", collaborations: ["Frankenstein", "Pinocchio"], strength: 2 },

  // Studio-Winner connections
  { source: "warner", target: "oppenheimer", type: "studio-winner", collaborations: ["Distribution"], strength: 1 },
  { source: "a24", target: "everything", type: "studio-winner", collaborations: ["Production & Distribution"], strength: 2 },
  { source: "netflix", target: "nomadland", type: "studio-winner", collaborations: ["Streaming rights"], strength: 1 },
  { source: "universal", target: "greenBook", type: "studio-winner", collaborations: ["Distribution"], strength: 1 },
  { source: "disney", target: "shapeWater", type: "studio-winner", collaborations: ["Searchlight Pictures"], strength: 1 },
];

const typeStyles = {
  actor: { color: "#C5A44E", glow: "rgba(197, 164, 78, 0.5)", label: "Actors" },
  director: { color: "#a855f7", glow: "rgba(168, 85, 247, 0.5)", label: "Directors" },
  producer: { color: "#f97316", glow: "rgba(249, 115, 22, 0.5)", label: "Producers" },
  studio: { color: "#3b82f6", glow: "rgba(59, 130, 246, 0.5)", label: "Studios" },
  winner: { color: "#22c55e", glow: "rgba(34, 197, 94, 0.5)", label: "Past Winners" },
};

export default function NetworkPage() {
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<NetworkEdge | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getConnectedEdges = (nodeId: string) => {
    return edges.filter(e => e.source === nodeId || e.target === nodeId);
  };

  const isNodeHighlighted = (nodeId: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode.id === nodeId) return true;
    const connectedEdges = getConnectedEdges(hoveredNode.id);
    return connectedEdges.some(e => e.source === nodeId || e.target === nodeId);
  };

  const isEdgeHighlighted = (edge: NetworkEdge) => {
    if (!hoveredNode) return false;
    return edge.source === hoveredNode.id || edge.target === hoveredNode.id;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-serif tracking-wide">Industry Network</h1>
                <p className="text-xs text-gray-500">Constellation Map of Hollywood Connections</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6">
              {Object.entries(typeStyles).map(([type, style]) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`flex items-center gap-2 text-xs transition-all ${
                    selectedType && selectedType !== type ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: style.color }}
                  />
                  <span className="text-gray-400">{style.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <div ref={containerRef} className="relative w-full h-screen">
        {/* Starfield background */}
        <div className="absolute inset-0 overflow-hidden">
          {mounted && Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* SVG Network */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1100 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Glow filters */}
            {Object.entries(typeStyles).map(([type, style]) => (
              <filter key={type} id={`glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}

            {/* Edge gradients */}
            <linearGradient id="edgeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A44E" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="edgeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="edgeGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Edges (connections) */}
          <g className="edges">
            {edges.map((edge, i) => {
              const source = nodes.find(n => n.id === edge.source);
              const target = nodes.find(n => n.id === edge.target);
              if (!source || !target) return null;

              const isHighlighted = hoveredNode && (edge.source === hoveredNode.id || edge.target === hoveredNode.id);
              const isFiltered = selectedType && !(
                source.type === selectedType || target.type === selectedType
              );

              const gradientId = edge.type === "actor-director" ? "edgeGradient1"
                : edge.type === "director-producer" ? "edgeGradient2"
                : "edgeGradient3";

              return (
                <g key={i}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={`url(#${gradientId})`}
                    strokeWidth={isHighlighted ? 2 : 1}
                    className={`transition-all duration-300 ${isFiltered ? "opacity-10" : "opacity-100"}`}
                    style={{
                      filter: isHighlighted ? "drop-shadow(0 0 6px rgba(197, 164, 78, 0.5))" : "none",
                    }}
                  />
                  {/* Invisible hit area for hover */}
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="transparent"
                    strokeWidth="20"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredEdge(edge)}
                    onMouseLeave={() => setHoveredEdge(null)}
                  />
                </g>
              );
            })}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {nodes.map((node) => {
              const style = typeStyles[node.type];
              const isHighlighted = hoveredNode && isNodeHighlighted(node.id);
              const isFiltered = selectedType && node.type !== selectedType;
              const hasImage = node.image && (node.type === "actor" || node.type === "director");

              return (
                <g
                  key={node.id}
                  className={`cursor-pointer transition-all duration-300 ${isFiltered ? "opacity-20" : "opacity-100"}`}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  filter={`url(#glow-${node.type})`}
                >
                  {/* Outer glow ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={hasImage ? 28 : 22}
                    fill="none"
                    stroke={style.color}
                    strokeWidth={isHighlighted ? 2 : 1}
                    strokeOpacity={isHighlighted ? 0.8 : 0.3}
                    className="transition-all duration-300"
                  />

                  {/* Inner circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={hasImage ? 24 : 18}
                    fill="#0a0a0a"
                    stroke={style.color}
                    strokeWidth={isHighlighted ? 2 : 1.5}
                    className="transition-all duration-300"
                  />

                  {/* Node content */}
                  {hasImage && node.image ? (
                    <image
                      href={node.image}
                      x={node.x - 16}
                      y={node.y - 16}
                      width="32"
                      height="32"
                      preserveAspectRatio="xMidYMid slice"
                      style={{ clipPath: "circle(14px)" }}
                    />
                  ) : (
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={style.color}
                      fontSize="9"
                      fontWeight="500"
                    >
                      {node.name.split(" ").map(w => w[0]).join("").slice(0, 3)}
                    </text>
                  )}

                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + (hasImage ? 40 : 32)}
                    textAnchor="middle"
                    fill={isHighlighted ? "#ffffff" : "#6b7280"}
                    fontSize="10"
                    className="transition-all duration-300"
                  >
                    {node.name.length > 15 ? node.name.slice(0, 14) + "…" : node.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover Tooltip */}
        {hoveredNode && (
          <div
            className="fixed z-30 pointer-events-none animate-fade-in"
            style={{
              left: Math.min(hoveredNode.x * 1.2 + 100, window.innerWidth - 280),
              top: hoveredNode.y * 0.9 + 100,
            }}
          >
            <div className="p-4 rounded-xl bg-[#111]/95 backdrop-blur-md border border-white/10 shadow-2xl min-w-[220px]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: typeStyles[hoveredNode.type].color }}
                />
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  {typeStyles[hoveredNode.type].label.slice(0, -1)}
                </span>
              </div>
              <h3 className="text-white font-medium mb-1">{hoveredNode.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{hoveredNode.info}</p>
              {hoveredNode.awards && (
                <p className="text-xs text-[var(--gold)]">Notable: {hoveredNode.awards}</p>
              )}

              {/* Connected nodes */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Connections</p>
                <div className="space-y-1">
                  {getConnectedEdges(hoveredNode.id).slice(0, 3).map((edge, i) => {
                    const connectedId = edge.source === hoveredNode.id ? edge.target : edge.source;
                    const connectedNode = nodes.find(n => n.id === connectedId);
                    if (!connectedNode) return null;
                    return (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: typeStyles[connectedNode.type].color }}
                        />
                        <span>{connectedNode.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edge Tooltip */}
        {hoveredEdge && !hoveredNode && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 animate-fade-in">
            <div className="px-6 py-3 rounded-full bg-[#111]/95 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">Collaborations:</span>
                {hoveredEdge.collaborations.map((collab, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white">
                    {collab}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
          <p className="text-xs text-gray-500">
            Hover over nodes to explore • Click legend to filter
          </p>
        </div>
      </div>
    </div>
  );
}
