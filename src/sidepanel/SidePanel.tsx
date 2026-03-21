import React, { useState } from 'react';
import { streamAI } from '../utils/api';
import {
  PRICE_ANALYZER_PROMPT,
  COMPARISON_PROMPT,
  DYNAMIC_PRICING_PROMPT,
  ALERT_PROMPT,
} from '../utils/prompts';

type Tab = 'analyze' | 'compare' | 'dynamic' | 'alerts';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'analyze', label: 'Analyze', icon: '🔍' },
  { id: 'compare', label: 'Compare', icon: '⚖️' },
  { id: 'dynamic', label: 'Dynamic', icon: '📈' },
  { id: 'alerts', label: 'Alerts', icon: '🔔' },
];

const promptMap: Record<Tab, string> = {
  analyze: PRICE_ANALYZER_PROMPT,
  compare: COMPARISON_PROMPT,
  dynamic: DYNAMIC_PRICING_PROMPT,
  alerts: ALERT_PROMPT,
};

const placeholderMap: Record<Tab, string> = {
  analyze: 'Enter product name for deep analysis...\ne.g., MacBook Pro M3 14-inch',
  compare: 'Enter products to compare (one per line)...\ne.g., iPhone 15 Pro\nSamsung Galaxy S24 Ultra\nPixel 8 Pro',
  dynamic: 'Enter product for dynamic pricing analysis...\ne.g., PlayStation 5, Nintendo Switch',
  alerts: 'Enter product to set price alerts...\ne.g., Sony WH-1000XM5 headphones',
};

const SidePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('analyze');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ tab: Tab; query: string; result: string }[]>([]);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const res = await streamAI(promptMap[activeTab], input.trim(), (text) => setResult(text));
      setHistory((prev) => [{ tab: activeTab, query: input.trim(), result: res }, ...prev.slice(0, 9)]);
    } catch (e: any) {
      setResult('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-surface flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-900/40 to-teal-900/40 border-b border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-lg font-bold text-white">
            P
          </div>
          <div>
            <h1 className="text-base font-bold text-white">PriceRadar AI</h1>
            <p className="text-[10px] text-slate-400">Advanced Market Price Intelligence</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setResult(''); }}
            className={`flex-1 py-2.5 text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-950/20'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-b border-slate-800">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholderMap[activeTab]}
          className="w-full bg-surface-light border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
          rows={3}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze(); } }}
        />
        <button
          onClick={analyze}
          disabled={loading || !input.trim()}
          className="w-full mt-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-all text-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Analyzing...
            </span>
          ) : (
            { analyze: 'Analyze Price', compare: 'Compare Products', dynamic: 'Check Dynamic Pricing', alerts: 'Set Price Alert' }[activeTab]
          )}
        </button>
      </div>

      {/* Result */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && !result && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="shimmer h-4 rounded" style={{ width: `${85 - i * 10}%` }} />
            ))}
          </div>
        )}
        {result && (
          <div className="bg-surface-light rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                {activeTab === 'analyze' ? 'Price Analysis' : activeTab === 'compare' ? 'Comparison' : activeTab === 'dynamic' ? 'Dynamic Pricing' : 'Alert Strategy'}
              </span>
            </div>
            <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{result}</div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && !loading && (
          <div className="mt-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Recent</h3>
            {history.map((item, i) => (
              <button
                key={i}
                onClick={() => { setActiveTab(item.tab); setInput(item.query); setResult(item.result); }}
                className="w-full text-left mb-2 bg-surface-light/50 hover:bg-surface-light rounded-lg p-2.5 border border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-cyan-900/30 text-cyan-400 px-1.5 py-0.5 rounded">{item.tab}</span>
                  <span className="text-xs text-slate-400 truncate">{item.query}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
