import { useState, useEffect, useCallback } from 'react';

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
  error: string | null;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [value, setStoredValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
      setError(null);
    } catch (err) {
      setError(`Failed to read from localStorage: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [key]);

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      setError(null);
    } catch (err) {
      setError(`Failed to write to localStorage: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
      setError(null);
    } catch (err) {
      setError(`Failed to remove from localStorage: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [key, initialValue]);

  return {
    value,
    setValue,
    removeValue,
    error,
  };
}

// Specialized hook for saved prompts
interface SavedPrompt {
  id: number;
  prompt: string;
  timestamp: string;
}

export function useSavedPrompts() {
  const { value: savedPrompts, setValue, error } = useLocalStorage<SavedPrompt[]>('promptsmith-saved', []);

  const savePrompt = useCallback((prompt: string) => {
    const newPrompt: SavedPrompt = {
      id: Date.now(),
      prompt,
      timestamp: new Date().toISOString(),
    };
    
    const updated = [newPrompt, ...savedPrompts].slice(0, 10); // Keep only last 10
    setValue(updated);
  }, [savedPrompts, setValue]);

  const removePrompt = useCallback((id: number) => {
    const updated = savedPrompts.filter(p => p.id !== id);
    setValue(updated);
  }, [savedPrompts, setValue]);

  const clearAll = useCallback(() => {
    setValue([]);
  }, [setValue]);

  return {
    savedPrompts,
    savePrompt,
    removePrompt,
    clearAll,
    error,
  };
}
