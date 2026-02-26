"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getNominationLeaderboard,
  studioBreakdown,
  firstTimeNominees,
  categoryCompetitiveness,
  historicalComparison,
  networkNodes,
  networkEdges,
  analystReports,
} from "@/data/intelligence";

interface IntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLiveMode?: boolean;
}

interface AIAnalysis {
  film: string;
  strongContenderReasons: string[];
  historicalPatterns: string[];
  similarFilmHistory: { won: number; lost: number; examples: string[] };
  upsetPotential: number;
  confidenceLevel: "High" | "Medium" | "Low";
  keyFactors: { factor: string; impact: "Positive" | "Neutral" | "Negative" }[];
  prediction: string;
  comparableWinners: string[];
  riskFactors: string[];
}

const aiAnalyses: Record<string, AIAnalysis> = {
  "Sinners": {
    film: "Sinners",
    strongContenderReasons: [
      "10 nominations is the historical sweet spot for Best Picture winners",
      "Ryan Coogler's critical momentum following Black Panther success",
      "Strong across technical categories indicates broad Academy support",
      "Original screenplay nomination shows writing branch support",
      "Cultural impact and box office performance signal mainstream appeal"
    ],
    historicalPatterns: [
      "7 of the last 10 Best Picture winners had 10+ nominations",
      "Films with both Original Screenplay and Director nods have 68% win rate",
      "Horror/supernatural elements historically struggle, but Get Out broke this pattern",
      "Summer releases rarely win, but this scored late-year positioning"
    ],
    similarFilmHistory: {
      won: 2,
      lost: 3,
      examples: ["Get Out (lost BP, won Original Screenplay)", "The Shape of Water (won)", "Black Panther (lost BP, won in technical)"]
    },
    upsetPotential: 32,
    confidenceLevel: "High",
    keyFactors: [
      { factor: "Nomination count (10)", impact: "Positive" },
      { factor: "Director nomination", impact: "Positive" },
      { factor: "Genre (horror elements)", impact: "Neutral" },
      { factor: "Star power (Michael B. Jordan)", impact: "Positive" },
      { factor: "Cultural moment", impact: "Positive" }
    ],
    prediction: "Strong frontrunner for Best Picture with approximately 65% probability. Most likely to also win in technical categories.",
    comparableWinners: ["The Shape of Water", "Nomadland", "Everything Everywhere All at Once"],
    riskFactors: [
      "Horror genre bias still exists in older Academy voters",
      "Could split votes with One Battle After Another for 'serious drama' voters",
      "Director category is competitive"
    ]
  },
  "One Battle After Another": {
    film: "One Battle After Another",
    strongContenderReasons: [
      "Paul Thomas Anderson is an Academy favorite with multiple past nominations",
      "1970s period setting appeals to older Academy demographic",
      "Leonardo DiCaprio's presence guarantees attention and votes",
      "Strong technical craft across multiple categories",
      "Prestige drama DNA aligns with traditional Academy taste"
    ],
    historicalPatterns: [
      "PT Anderson films consistently overperform at the Oscars",
      "1970s-set films have won Best Picture 4 times in last 20 years",
      "Ensemble dramas with star power have strong track records",
      "Films distributed by Universal have won 3 of last 10 Best Pictures"
    ],
    similarFilmHistory: {
      won: 3,
      lost: 4,
      examples: ["There Will Be Blood (lost)", "Licorice Pizza (lost)", "Boogie Nights (lost)", "American Hustle (lost)"]
    },
    upsetPotential: 45,
    confidenceLevel: "Medium",
    keyFactors: [
      { factor: "Director pedigree", impact: "Positive" },
      { factor: "Star ensemble", impact: "Positive" },
      { factor: "Period authenticity", impact: "Positive" },
      { factor: "PTA's Oscar history (no wins)", impact: "Neutral" },
      { factor: "Runtime and pacing", impact: "Neutral" }
    ],
    prediction: "Legitimate spoiler candidate. If Sinners stumbles, this is the likely beneficiary. Strong chance in acting categories.",
    comparableWinners: ["The Godfather", "No Country for Old Men", "Argo"],
    riskFactors: [
      "PT Anderson has never won Best Director despite 8 nominations",
      "May be seen as 'too inside baseball' for broader Academy",
      "Competition from Sinners for similar voter base"
    ]
  },
  "Frankenstein": {
    film: "Frankenstein",
    strongContenderReasons: [
      "Guillermo del Toro has strong Academy relationships",
      "Technical achievements are likely to resonate",
      "Jacob Elordi's breakout performance generates buzz",
      "Classic literature adaptation appeals to traditionalists"
    ],
    historicalPatterns: [
      "Horror/fantasy films rarely win Best Picture",
      "Del Toro's The Shape of Water is the exception that proved the rule",
      "Literary adaptations have mixed Best Picture history"
    ],
    similarFilmHistory: {
      won: 1,
      lost: 5,
      examples: ["The Shape of Water (won)", "Crimson Peak (snubbed)", "Nightmare Alley (lost)"]
    },
    upsetPotential: 78,
    confidenceLevel: "Low",
    keyFactors: [
      { factor: "Director's Oscar pedigree", impact: "Positive" },
      { factor: "Genre (horror/gothic)", impact: "Negative" },
      { factor: "Technical ambition", impact: "Positive" },
      { factor: "Release timing", impact: "Neutral" }
    ],
    prediction: "Unlikely to win Best Picture but strong contender in technical categories. Potential upset in Supporting Actor for Elordi.",
    comparableWinners: ["The Shape of Water"],
    riskFactors: [
      "Genre bias remains significant",
      "Dark subject matter may alienate some voters",
      "Netflix distribution may hurt with theatrical purists"
    ]
  }
};

export default function IntelligenceModal({ isOpen, onClose, isLiveMode = false }: IntelligenceModalProps) {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AIAnalysis | null>(null);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [analysisStep, setAnalysisStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
      setShowAnalysis(false);
      setSelectedFilm(null);
      setCurrentAnalysis(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleGenerateAnalysis = (film: string) => {
    setSelectedFilm(film);
    setIsAnalyzing(true);
    setShowAnalysis(false);
    setAnalysisStep(0);
    setDisplayedText("");

    // Simulate AI "thinking" with delays
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
      const analysis = aiAnalyses[film] || aiAnalyses["Sinners"];
      setCurrentAnalysis(analysis);

      // Staggered reveal of analysis sections
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setAnalysisStep(step);
        if (step >= 6) clearInterval(interval);
      }, 400);
    }, 1500);
  };

  if (!isOpen) return null;

  const leaderboard = getNominationLeaderboard();

  const tabs = [
    { id: "leaderboard", label: "Nomination Leader" },
    { id: "network", label: "Industry Network" },
    { id: "studios", label: "Studio Breakdown" },
    { id: "firsttime", label: "First-Time Nominees" },
    { id: "competitiveness", label: "Race Analysis" },
    { id: "historical", label: "Historical" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={`relative h-full w-full overflow-y-auto transition-all duration-700 [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-2">
                Data Insights
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
                Awards Intelligence
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--gold)] transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* AI Analysis Box */}
          <div className={`mb-8 p-6 rounded-2xl border transition-all duration-500 ${
            isLiveMode
              ? "bg-gradient-to-br from-[var(--gold)]/20 via-[var(--gold)]/5 to-transparent border-[var(--gold)]/40 shadow-[0_0_40px_rgba(197,164,78,0.15)]"
              : "bg-gradient-to-br from-[var(--gold)]/10 via-transparent to-[var(--gold)]/5 border-[var(--gold)]/20"
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isLiveMode
                  ? "bg-gradient-to-br from-[var(--gold)]/50 to-[var(--gold)]/20 shadow-[0_0_20px_rgba(197,164,78,0.3)]"
                  : "bg-gradient-to-br from-[var(--gold)]/30 to-[var(--gold)]/10"
              }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">AI Awards Analysis</h3>
                  {isLiveMode && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 rounded text-[10px] text-red-400 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {isLiveMode ? "Live mode enabled" : "Select a film to generate AI-powered insights"}
                </p>
              </div>
            </div>

            {!showAnalysis ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {leaderboard.slice(0, 6).map((film) => (
                    <button
                      key={film.title}
                      onClick={() => handleGenerateAnalysis(film.title)}
                      disabled={isAnalyzing}
                      className={`p-3 rounded-xl text-left transition-all duration-300 ${
                        selectedFilm === film.title
                          ? "bg-[var(--gold)]/20 border border-[var(--gold)]/40"
                          : "bg-white/[0.03] border border-white/[0.06] hover:border-[var(--gold)]/30"
                      } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <p className="text-white text-sm font-medium truncate">{film.title}</p>
                      <p className="text-xs text-gray-500">{film.count} nominations</p>
                    </button>
                  ))}
                </div>

                {isAnalyzing && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="w-5 h-5 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-400">Analyzing {selectedFilm}...</p>
                  </div>
                )}
              </>
            ) : currentAnalysis && (
              <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-serif text-white">{currentAnalysis.film}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      currentAnalysis.confidenceLevel === "High"
                        ? "bg-green-500/20 text-green-400"
                        : currentAnalysis.confidenceLevel === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {currentAnalysis.confidenceLevel} Confidence
                    </span>
                  </div>
                  <button
                    onClick={() => { setShowAnalysis(false); setSelectedFilm(null); }}
                    className="text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    New Analysis
                  </button>
                </div>

                {/* Prediction */}
                {analysisStep >= 1 && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-[var(--gold)]/20">
                    <p className="text-xs text-[var(--gold)] uppercase tracking-wider mb-2">Prediction</p>
                    <p className="text-white text-sm leading-relaxed">{currentAnalysis.prediction}</p>
                  </div>
                )}

                {/* Why Strong Contender */}
                {analysisStep >= 2 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Why It's a Strong Contender</p>
                    <div className="space-y-2">
                      {currentAnalysis.strongContenderReasons.map((reason, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-[var(--gold)] mt-1">•</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Factors Grid */}
                {analysisStep >= 3 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Key Factors</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {currentAnalysis.keyFactors.map((factor, i) => (
                        <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                          <p className="text-xs text-gray-500 mb-1">{factor.factor}</p>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            factor.impact === "Positive"
                              ? "bg-green-500/20 text-green-400"
                              : factor.impact === "Negative"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}>
                            {factor.impact}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Historical Patterns */}
                {analysisStep >= 4 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Historical Patterns</p>
                    <div className="space-y-2">
                      {currentAnalysis.historicalPatterns.map((pattern, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-[var(--gold-dark)] mt-1">→</span>
                          <span>{pattern}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upset Potential & Similar Films */}
                {analysisStep >= 5 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Upset Potential</p>
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-serif text-white">{currentAnalysis.upsetPotential}%</div>
                        <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              currentAnalysis.upsetPotential > 60
                                ? "bg-gradient-to-r from-red-500 to-red-400"
                                : currentAnalysis.upsetPotential > 30
                                ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                                : "bg-gradient-to-r from-green-500 to-green-400"
                            }`}
                            style={{ width: `${currentAnalysis.upsetPotential}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {currentAnalysis.upsetPotential > 60
                          ? "High upset risk - race is unpredictable"
                          : currentAnalysis.upsetPotential > 30
                          ? "Moderate upset potential"
                          : "Low upset risk - frontrunner status"}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Similar Films History</p>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-2xl font-serif text-green-400">{currentAnalysis.similarFilmHistory.won}</p>
                          <p className="text-xs text-gray-500">Won</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-serif text-red-400">{currentAnalysis.similarFilmHistory.lost}</p>
                          <p className="text-xs text-gray-500">Lost</p>
                        </div>
                        <div className="flex-1 text-xs text-gray-400">
                          Win rate: {Math.round((currentAnalysis.similarFilmHistory.won / (currentAnalysis.similarFilmHistory.won + currentAnalysis.similarFilmHistory.lost)) * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comparable Winners & Risk Factors */}
                {analysisStep >= 6 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Comparable Winners</p>
                      <div className="flex flex-wrap gap-2">
                        {currentAnalysis.comparableWinners.map((winner, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] text-xs">
                            {winner}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Risk Factors</p>
                      <div className="space-y-1">
                        {currentAnalysis.riskFactors.map((risk, i) => (
                          <p key={i} className="text-xs text-red-400/80">• {risk}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* AI Awards Analyst Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-[var(--gold)] to-transparent rounded-full" />
              <h3 className="text-lg text-white/90">AI Awards Analyst</h3>
              <span className="ml-auto text-[10px] text-gray-500 uppercase tracking-wider">Industry Report</span>
            </div>

            <div className="space-y-4">
              {analystReports.map((report, idx) => (
                <div
                  key={report.film}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] hover:border-[var(--gold)]/20 transition-all duration-500"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                      <img
                        src={report.image}
                        alt={report.film}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-white font-medium text-lg">{report.film}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-gray-400 uppercase tracking-wider">
                          {report.nominations} noms
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{report.executiveSummary}</p>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                    {/* Win Probability */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Win Probability</p>
                      <p className={`text-2xl font-serif ${
                        report.winProbability >= 50 ? "text-[var(--gold)]" : "text-gray-300"
                      }`}>{report.winProbability}%</p>
                      <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] rounded-full"
                          style={{ width: `${report.winProbability}%` }}
                        />
                      </div>
                    </div>

                    {/* Historical Similarity */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Historical Match</p>
                      <p className="text-2xl font-serif text-white">{report.historicalSimilarity.score}<span className="text-sm text-gray-500">/100</span></p>
                      <p className="text-[10px] text-gray-500 mt-1">{report.historicalSimilarity.matchRate}</p>
                    </div>

                    {/* Upset Risk */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Upset Risk</p>
                      <div className="flex items-center gap-2">
                        <p className={`text-2xl font-serif ${
                          report.upsetRisk.level === "Low" ? "text-green-400" :
                          report.upsetRisk.level === "Moderate" ? "text-yellow-400" : "text-red-400"
                        }`}>{report.upsetRisk.score}%</p>
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          report.upsetRisk.level === "Low" ? "bg-green-500/20 text-green-400" :
                          report.upsetRisk.level === "Moderate" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"
                        }`}>
                          {report.upsetRisk.level}
                        </span>
                      </div>
                    </div>

                    {/* Momentum */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Momentum</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-serif text-white">{report.momentum.rating}</p>
                        <span className={`flex items-center gap-1 text-[10px] ${
                          report.momentum.trend === "Rising" ? "text-green-400" :
                          report.momentum.trend === "Cooling" ? "text-red-400" : "text-gray-400"
                        }`}>
                          {report.momentum.trend === "Rising" && "↑"}
                          {report.momentum.trend === "Cooling" && "↓"}
                          {report.momentum.trend === "Stable" && "→"}
                          {report.momentum.trend}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">{report.momentum.weeklyChange}</p>
                    </div>

                    {/* Narrative Strength */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Narrative Strength</p>
                      <p className="text-2xl font-serif text-white">{report.narrativeStrength.score}<span className="text-sm text-gray-500">/100</span></p>
                      <p className="text-[10px] text-[var(--gold)] mt-1">{report.narrativeStrength.awardsCircuit}</p>
                    </div>
                  </div>

                  {/* Key Insight */}
                  <div className="p-4 rounded-xl bg-[var(--gold)]/5 border border-[var(--gold)]/10">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--gold)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider mb-1">Key Insight</p>
                        <p className="text-sm text-gray-300">{report.keyInsight}</p>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <details className="mt-4 group">
                    <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform group-open:rotate-90">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      View detailed analysis
                    </summary>
                    <div className="mt-4 space-y-4 pt-4 border-t border-white/5">
                      {/* Comparable Films */}
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Comparable Historical Films</p>
                        <div className="flex flex-wrap gap-2">
                          {report.historicalSimilarity.comparableFilms.map((film, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400">
                              {film}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Upset Risk Factors */}
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Upset Risk Factors</p>
                        <ul className="space-y-1">
                          {report.upsetRisk.factors.map((factor, i) => (
                            <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                              <span className="text-red-400/60 mt-1">•</span>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Narrative Elements */}
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Narrative Strength Elements</p>
                        <div className="grid grid-cols-2 gap-2">
                          {report.narrativeStrength.elements.map((element, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                              {element}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 rounded-lg ${
                  activeTab === tab.id
                    ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30"
                    : "text-gray-500 hover:text-gray-300 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[60vh]">
            {/* Leaderboard */}
            {activeTab === "leaderboard" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-[var(--gold)] to-transparent rounded-full" />
                  <h3 className="text-lg text-white/90">Most Nominated Films</h3>
                </div>
                <div className="grid gap-3">
                  {leaderboard.map((film, index) => (
                    <div
                      key={film.title}
                      className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.06] transition-all duration-300 hover:border-[var(--gold)]/30 ${
                        index < 3 ? "hover:shadow-[0_0_30px_rgba(197,164,78,0.1)]" : ""
                      }`}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                          index === 0
                            ? "bg-[var(--gold)] text-black"
                            : index === 1
                            ? "bg-gray-400 text-black"
                            : index === 2
                            ? "bg-amber-700 text-white"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={film.image}
                          alt={film.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{film.title}</p>
                        <p className="text-xs text-gray-500">{film.count} nominations</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(film.count, 10) }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-4 rounded-sm ${
                              i < 3 ? "bg-[var(--gold)]" : "bg-[var(--gold-dark)]/40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Network Graph */}
            {activeTab === "network" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-[var(--gold)] to-transparent rounded-full" />
                  <h3 className="text-lg text-white/90">Industry Network</h3>
                  <Link
                    href="/network"
                    onClick={onClose}
                    className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-xs text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-all"
                  >
                    <span>Full Constellation View</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--gold)]" />
                    <span className="text-xs text-gray-400">Actors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-xs text-gray-400">Directors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-gray-400">Studios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-400">Past Winners</span>
                  </div>
                </div>

                {/* Network Visualization */}
                <div className="relative w-full h-[500px] rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                  <svg width="100%" height="100%" viewBox="0 0 760 560" className="absolute inset-0">
                    {/* Definitions */}
                    <defs>
                      {/* Edge gradients */}
                      <linearGradient id="edgeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
                      </linearGradient>
                      <linearGradient id="edgeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                      </linearGradient>
                      <linearGradient id="edgeGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
                      </linearGradient>
                      {/* Clip paths for circular images */}
                      <clipPath id="clip-actor">
                        <circle cx="0" cy="0" r="18" />
                      </clipPath>
                      <clipPath id="clip-director">
                        <circle cx="0" cy="0" r="18" />
                      </clipPath>
                      <clipPath id="clip-studio">
                        <circle cx="0" cy="0" r="16" />
                      </clipPath>
                      <clipPath id="clip-winner">
                        <circle cx="0" cy="0" r="16" />
                      </clipPath>
                    </defs>

                    {networkEdges.map((edge, i) => {
                      const source = networkNodes.find(n => n.id === edge.source);
                      const target = networkNodes.find(n => n.id === edge.target);
                      if (!source || !target) return null;

                      const gradientId = edge.type === "actor-director" ? "edgeGradient1"
                        : edge.type === "director-studio" ? "edgeGradient2"
                        : "edgeGradient3";

                      return (
                        <g key={i} className="network-edge group" data-collabs={edge.collaborations?.join(", ")}>
                          <line
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke={`url(#${gradientId})`}
                            strokeWidth="1.5"
                            className="transition-all duration-300"
                          />
                          <line
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="transparent"
                            strokeWidth="20"
                            className="cursor-pointer"
                          >
                            <title>{edge.collaborations?.join(", ")}</title>
                          </line>
                        </g>
                      );
                    })}

                    {/* Nodes */}
                    {networkNodes.map((node) => {
                      const colors = {
                        actor: "var(--gold)",
                        director: "#a855f7",
                        studio: "#3b82f6",
                        pastWinner: "#22c55e"
                      };

                      return (
                        <g
                          key={node.id}
                          className="network-node cursor-pointer"
                          data-info={node.info}
                        >
                          {/* Glow effect */}
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.type === "studio" || node.type === "pastWinner" ? 28 : 32}
                            fill={colors[node.type]}
                            fillOpacity="0.1"
                            className="transition-all duration-300"
                          />
                          {/* Node circle */}
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.type === "studio" || node.type === "pastWinner" ? 24 : 28}
                            fill="#0a0a0a"
                            stroke={colors[node.type]}
                            strokeWidth="2"
                            className="transition-all duration-300"
                          />
                          {/* Image or text */}
                          {node.image ? (
                            <g>
                              <circle
                                cx={node.x}
                                cy={node.y}
                                r={node.type === "studio" || node.type === "pastWinner" ? 14 : 16}
                                fill="transparent"
                              />
                              <image
                                href={node.image}
                                x={node.x - (node.type === "studio" || node.type === "pastWinner" ? 14 : 16)}
                                y={node.y - (node.type === "studio" || node.type === "pastWinner" ? 14 : 16)}
                                width={node.type === "studio" || node.type === "pastWinner" ? 28 : 32}
                                height={node.type === "studio" || node.type === "pastWinner" ? 28 : 32}
                                preserveAspectRatio="xMidYMid slice"
                                style={{ clipPath: `circle(${node.type === "studio" || node.type === "pastWinner" ? 14 : 16}px at center)` }}
                              />
                            </g>
                          ) : (
                            <text
                              x={node.x}
                              y={node.y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="white"
                              fontSize="10"
                              fontWeight="500"
                            >
                              {node.name.split(" ").map(w => w[0]).join("")}
                            </text>
                          )}
                          {/* Label */}
                          <text
                            x={node.x}
                            y={node.y + 42}
                            textAnchor="middle"
                            fill="#9ca3af"
                            fontSize="10"
                          >
                            {node.name.length > 15 ? node.name.slice(0, 14) + "..." : node.name}
                          </text>
                          {/* Hover tooltip background */}
                          <rect
                            x={node.x - 80}
                            y={node.y - 70}
                            width="160"
                            height="24"
                            rx="4"
                            fill="#1a1a1a"
                            stroke={colors[node.type]}
                            strokeOpacity="0.3"
                            className="opacity-0 transition-opacity duration-300 pointer-events-none"
                          />
                          <text
                            x={node.x}
                            y={node.y - 55}
                            textAnchor="middle"
                            fill="white"
                            fontSize="9"
                            className="opacity-0 transition-opacity duration-300 pointer-events-none"
                          >
                            {node.info}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Hover Tooltip */}
                  <div id="network-tooltip" className="absolute hidden p-3 rounded-lg bg-[#1a1a1a] border border-[var(--gold)]/30 text-xs text-white pointer-events-none z-10 max-w-[200px]">
                    <div id="tooltip-title" className="font-medium mb-1"></div>
                    <div id="tooltip-info" className="text-gray-400"></div>
                    <div id="tooltip-collabs" className="text-[var(--gold)] mt-2"></div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center text-xs text-gray-500">
                  Hover over nodes to see collaboration history • Lines show professional connections
                </div>
              </div>
            )}

            {/* Studio Breakdown */}
            {activeTab === "studios" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-[var(--gold)] to-transparent rounded-full" />
                  <h3 className="text-lg text-white/90">Studio Dominance</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {studioBreakdown.map((studio) => (
                    <div
                      key={studio.studio}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: studio.color }}
                          />
                          <span className="text-white font-medium">{studio.studio}</span>
                        </div>
                        <span className="text-[var(--gold)] font-medium">{studio.nominations}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${(studio.nominations / 15) * 100}%`,
                            backgroundColor: studio.color,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-3 truncate">
                        {studio.films.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* First-Time Nominees */}
            {activeTab === "firsttime" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-[var(--gold)] to-transparent rounded-full" />
                  <h3 className="text-lg text-white/90">First-Time Nominees</h3>
                  <span className="ml-auto text-xs text-[var(--gold)] bg-[var(--gold)]/10 px-3 py-1 rounded-full">
                    {firstTimeNominees.length} newcomers
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {firstTimeNominees.map((nominee) => (
                    <div
                      key={nominee.name}
                      className="group p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[var(--gold)]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,164,78,0.1)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors">
                          <Image
                            src={nominee.image}
                            alt={nominee.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium">{nominee.name}</p>
                          <p className="text-xs text-gray-500">{nominee.category}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-3">{nominee.film}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="px-2 py-0.5 bg-[var(--gold)]/10 rounded text-[10px] text-[var(--gold)] uppercase tracking-wider">
                          First Nomination
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Competitiveness */}
            {activeTab === "competitiveness" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-[var(--gold)] to-transparent rounded-full" />
                  <h3 className="text-lg text-white/90">Race Analysis</h3>
                </div>
                <div className="grid gap-4">
                  {categoryCompetitiveness.map((cat) => (
                    <div
                      key={cat.category}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">{cat.category}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            cat.tightness >= 80
                              ? "bg-red-500/20 text-red-400"
                              : cat.tightness >= 60
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {cat.tightness >= 80 ? "Very Tight" : cat.tightness >= 60 ? "Competitive" : "Clear Favorite"}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-3">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            cat.tightness >= 80
                              ? "bg-gradient-to-r from-red-500 to-red-400"
                              : cat.tightness >= 60
                              ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                              : "bg-gradient-to-r from-green-500 to-green-400"
                          }`}
                          style={{ width: `${cat.tightness}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{cat.description}</span>
                        <span className="text-[var(--gold)]">Frontrunner: {cat.favorite}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Historical */}
            {activeTab === "historical" && (
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-[var(--gold)] to-transparent rounded-full" />
                  <h3 className="text-lg text-white/90">Historical Comparison</h3>
                </div>

                {/* Current Year Stats */}
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="p-5 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-center">
                    <p className="text-3xl font-serif text-[var(--gold)]">{historicalComparison.currentYear.totalNominations}</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Total Nominations</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-3xl font-serif text-white">{historicalComparison.currentYear.categories}</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Categories</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-3xl font-serif text-white">{historicalComparison.currentYear.firstTimeNominees}</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">First-Timers</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-3xl font-serif text-white">{historicalComparison.currentYear.mostNominated.count}</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Top Film Noms</p>
                  </div>
                </div>

                {/* Past Years */}
                <div>
                  <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-4">Past 10 Years</h4>
                  <div className="space-y-2">
                    {historicalComparison.comparisons.map((year) => (
                      <div
                        key={year.year}
                        className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                      >
                        <span className="text-gray-500 w-16">{year.year}</span>
                        <div className="flex-1">
                          <span className="text-white">{year.mostNominated}</span>
                          <span className="text-gray-500 ml-2">({year.count} noms)</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">Winner:</span>
                          <span className="text-xs text-[var(--gold)] ml-1">{year.winner}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insights */}
                <div>
                  <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-4">Key Insights</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {historicalComparison.insights.map((insight, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-sm text-gray-300"
                      >
                        <span className="text-[var(--gold)] mr-2">→</span>
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
