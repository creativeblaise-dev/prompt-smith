'use client';

import { useState } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  isLoading?: boolean;
  maxLength?: number;
}

export function PromptInput({
  value,
  onChange,
  onAnalyze,
  onClear,
  isLoading = false,
  maxLength = 10000
}: PromptInputProps) {
  const [error, setError] = useState<string>('');

  const handleAnalyze = () => {
    if (!value.trim()) {
      setError('Please enter a prompt to analyze');
      return;
    }
    if (value.length > maxLength) {
      setError(`Prompt must be ${maxLength} characters or less`);
      return;
    }
    setError('');
    onAnalyze();
  };

  const handleClear = () => {
    onChange('');
    setError('');
    onClear();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleAnalyze();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClear();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your prompt for analysis
        </label>
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste or type your AI prompt here..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="char-count error-message"
          disabled={isLoading}
        />
        <div className="flex justify-between items-center mt-2">
          <div id="char-count" className="text-sm text-gray-500">
            {value.length.toLocaleString()} / {maxLength.toLocaleString()} characters
          </div>
          {error && (
            <div id="error-message" className="text-sm text-red-600" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={handleAnalyze}
          disabled={isLoading || !value.trim()}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-describedby="analyze-help"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Prompt'}
        </button>
        <button
          onClick={handleClear}
          disabled={isLoading}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
      
      <div id="analyze-help" className="text-xs text-gray-500">
        Tip: Press Ctrl+Enter (Cmd+Enter on Mac) to analyze, Escape to clear
      </div>
    </div>
  );
}
