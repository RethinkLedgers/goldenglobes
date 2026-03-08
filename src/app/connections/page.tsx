"use client";

import { useState } from "react";
import Link from "next/link";
import { connections, categories } from "@/data/nominees";

export default function ConnectionsPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Get all unique names from connections
  const allNames = new Set<string>();
  connections.forEach(c => {
    allNames.add(c.source);
    allNames.add(c.target);
  });

  // Get connections for selected node
  const nodeConnections = selectedNode
    ? connections.filter(c => c.source === selectedNode || c.target === selectedNode)
    : [];

  // Generate positions for visualization
  const nodes = Array.from(allNames).map((name, index) => {
    const angle = (index / allNames.size) * 2 * Math.PI;
    const radius = 150;
    return {
      name,
      x: 200 + radius * Math.cos(angle),
      y: 200 + radius * Math.sin(angle),
    };
  });

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="font-serif text-4xl tracking-wider shimmer-text mb-4">
          Connections Engine
        </h1>
        <p className="text-gray-400">
          Explore relationships between nominees, projects, and collaborators
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Network Visualization */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4">Network Graph</h3>
            <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto">
              {/* Connections */}
              {connections.map((conn, i) => {
                const sourceNode = nodes.find(n => n.name === conn.source);
                const targetNode = nodes.find(n => n.name === conn.target);
                if (!sourceNode || !targetNode) return null;
                const isActive = selectedNode && (conn.source === selectedNode || conn.target === selectedNode);
                return (
                  <line
                    key={i}
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isActive ? 'var(--gold)' : 'rgba(197, 164, 78, 0.2)'}
                    strokeWidth={isActive ? 2 : 1}
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const isActive = selectedNode === node.name;
                const hasConnections = connections.some(
                  c => c.source === node.name || c.target === node.name
                );
                return (
                  <g key={node.name} onClick={() => setSelectedNode(isActive ? null : node.name)} className="cursor-pointer">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 25 : 20}
                      fill={isActive ? 'var(--gold)' : 'rgba(197, 164, 78, 0.3)'}
                      className="transition-all"
                    />
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? 'black' : 'white'}
                      fontSize={isActive ? 10 : 8}
                      className="pointer-events-none"
                    >
                      {node.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            <p className="text-center text-xs text-gray-500 mt-4">
              Click on a node to explore connections
            </p>
          </div>
        </div>

        {/* Details Panel */}
        <div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 sticky top-24">
            {selectedNode ? (
              <>
                <h3 className="text-lg font-serif text-[var(--gold)] mb-4">{selectedNode}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Connections</p>
                <div className="space-y-2">
                  {nodeConnections.map((conn, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[var(--gold)]">🔗</span>
                        <span className="text-sm text-white">
                          {conn.source === selectedNode ? conn.target : conn.source}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {conn.type === 'shared_project' ? 'Shared Project' :
                         conn.type === 'collaboration' ? 'Collaborated on' : 'Connected'}
                        {conn.project && `: ${conn.project}`}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔗</div>
                <p className="text-gray-400 text-sm">
                  Select a node to view their connections
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connection Types Legend */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="font-serif text-xl tracking-wider text-center mb-6">
          <span className="shimmer-text">Connection Types</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { type: 'shared_project', label: 'Shared Project', desc: 'Worked on the same film or show', icon: '🎬' },
            { type: 'shared_nomination', label: 'Shared Nomination', desc: 'Nominated in the same category', icon: '🏆' },
            { type: 'collaboration', label: 'Collaboration', desc: 'Professional creative partnership', icon: '🤝' },
          ].map((item) => (
            <div
              key={item.type}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="text-white font-medium mt-2">{item.label}</p>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-6xl mx-auto mt-12">
        <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors text-sm">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
