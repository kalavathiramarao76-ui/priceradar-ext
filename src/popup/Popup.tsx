import React, { useState } from 'react';
import { callAI } from '../utils/api';
import { QUICK_PRICE_PROMPT } from '../utils/prompts';

const Popup: React.FC = () => {
  const [product, setProduct] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!product.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const res = await callAI(QUICK_PRICE_PROMPT, product.trim());
      setResult(res);
    } catch (e: any) {
      setResult('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const openSidePanel = () => {
    chrome.runtime.sendMessage({ action: 'openSidePanel' });
  };

  return (
    <div className="w-[380px] min-h-[480px] bg-surface p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-xl font-bold">
          P
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">PriceHawk</h1>
          <p className="text-xs text-slate-400">Market Price Intelligence</p>
        </div>
        <button
          onClick={openSidePanel}
          className="ml-auto text-xs bg-surface-light hover:bg-surface-lighter text-cyan-400 px-3 py-1.5 rounded-lg transition-colors"
        >
          Full Panel
        </button>
      </div>

      {/* Input */}
      <div className="mb-3">
        <label className="text-xs text-slate-400 mb-1 block">Product Name</label>
        <textarea
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g., iPhone 15 Pro Max 256GB, Sony WH-1000XM5..."
          className="w-full bg-surface-light border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          rows={3}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze(); } }}
        />
      </div>

      <button
        onClick={analyze}
        disabled={loading || !product.trim()}
        className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-all pulse-cyan text-sm"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Analyzing Market...
          </span>
        ) : 'Check Price'}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-3 flex-1 bg-surface-light rounded-lg p-3 border border-slate-700 overflow-y-auto max-h-[240px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-cyan-400">Price Analysis</span>
          </div>
          <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{result}</div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {['Compare Prices', 'Price History', 'Set Alert'].map((label) => (
          <button
            key={label}
            onClick={openSidePanel}
            className="text-[10px] bg-surface-light hover:bg-surface-lighter text-slate-400 hover:text-cyan-400 py-2 rounded-lg transition-colors border border-slate-700/50"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-slate-800 text-center">
        <span className="text-[10px] text-slate-600">Powered by PriceHawk Engine</span>
      </div>
    </div>
  );
};

export default Popup;
