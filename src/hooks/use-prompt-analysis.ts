import { useState, useCallback } from 'react';
import { AnalysisResult } from '@/types/analysis';

interface UsePromptAnalysisReturn {
  analysisResult: AnalysisResult | null;
  isLoading: boolean;
  error: string;
  analyze: (prompt: string) => Promise<void>;
  reset: () => void;
  retry: () => Promise<void>;
}

export function usePromptAnalysis(): UsePromptAnalysisReturn {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [lastPrompt, setLastPrompt] = useState<string>('');

  const analyze = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setLastPrompt(prompt);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retry = useCallback(async () => {
    if (lastPrompt) {
      await analyze(lastPrompt);
    }
  }, [analyze, lastPrompt]);

  const reset = useCallback(() => {
    setAnalysisResult(null);
    setError('');
    setLastPrompt('');
  }, []);

  return {
    analysisResult,
    isLoading,
    error,
    analyze,
    reset,
    retry,
  };
}
