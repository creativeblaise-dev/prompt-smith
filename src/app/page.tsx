'use client';

import { useState } from 'react';
import { PromptInput } from '@/components/prompt-input';
import { ScoreDisplay } from '@/components/score-display';
import { FindingsList } from '@/components/findings-list';
import { ExportControls } from '@/components/export-controls';
import { AnalysisResult } from '@/types/analysis';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: prompt }),
      });
      
      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setAnalysisResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PromptSmith</h1>
          <p className="text-lg text-gray-600 mb-4">
            AI Prompt Analysis and Refinement Tool
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Analyze your AI prompts against 25 best-practice rules across 5 categories. 
            Get actionable feedback and quality scores to improve your prompt effectiveness.
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Input Section */}
          <section>
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              isLoading={isLoading}
            />
          </section>

          {/* Error Display */}
          {error && (
            <section>
              <div className="card bg-red-50 border-red-200">
                <div className="flex items-center gap-2 text-red-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Analysis Error</span>
                </div>
                <p className="mt-2 text-red-700">{error}</p>
                <button
                  onClick={handleAnalyze}
                  className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Try again
                </button>
              </div>
            </section>
          )}

          {/* Results Section */}
          {analysisResult && (
            <>
              <section>
                <ScoreDisplay result={analysisResult} />
              </section>

              <section>
                <FindingsList result={analysisResult} />
              </section>

              <section>
                <ExportControls prompt={prompt} disabled={isLoading} />
              </section>
            </>
          )}

          {/* Loading State */}
          {isLoading && (
            <section>
              <div className="card text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your prompt...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Evaluating against 25 best-practice rules
                </p>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Built with ❤️ using Kiro CLI for the Dynamous × Kiro Hackathon
          </p>
          <p className="text-xs text-gray-400 mt-1">
            January 21-23, 2026
          </p>
        </footer>
      </div>
    </div>
  );
}
