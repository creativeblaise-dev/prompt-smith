'use client';

import { useState } from 'react';

interface ExportControlsProps {
  prompt: string;
  disabled?: boolean;
}

interface IconProps {
  className?: string;
}

function CopyIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function DownloadIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function SaveIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  );
}

export function ExportControls({ prompt, disabled = false }: ExportControlsProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleCopy = async () => {
    if (!prompt.trim()) return;
    
    try {
      await navigator.clipboard.writeText(prompt);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };
  
  const handleDownload = (format: 'txt' | 'md') => {
    if (!prompt.trim()) return;
    
    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleSave = () => {
    if (!prompt.trim()) return;
    
    try {
      const saved = JSON.parse(localStorage.getItem('promptsmith-saved') || '[]');
      const newPrompt = {
        id: Date.now(),
        prompt,
        timestamp: new Date().toISOString()
      };
      saved.unshift(newPrompt);
      // Keep only last 10 prompts
      localStorage.setItem('promptsmith-saved', JSON.stringify(saved.slice(0, 10)));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };
  
  if (!prompt.trim()) {
    return null;
  }
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Refined Prompt</h3>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          disabled={disabled}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          aria-describedby="copy-status"
        >
          <CopyIcon />
          {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        
        <button
          onClick={() => handleDownload('txt')}
          disabled={disabled}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <DownloadIcon />
          Download as TXT
        </button>
        
        <button
          onClick={() => handleDownload('md')}
          disabled={disabled}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <DownloadIcon />
          Download as MD
        </button>
        
        <button
          onClick={handleSave}
          disabled={disabled}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          aria-describedby="save-status"
        >
          <SaveIcon />
          {saveSuccess ? 'Saved!' : 'Save Locally'}
        </button>
      </div>
      
      <div className="mt-3 text-sm text-gray-500">
        {copySuccess && (
          <div id="copy-status" className="text-green-600" role="status">
            ✓ Copied to clipboard successfully
          </div>
        )}
        {saveSuccess && (
          <div id="save-status" className="text-green-600" role="status">
            ✓ Saved to browser storage (last 10 prompts kept)
          </div>
        )}
        {!copySuccess && !saveSuccess && (
          <div>
            Export your refined prompt for use in other applications
          </div>
        )}
      </div>
    </div>
  );
}
