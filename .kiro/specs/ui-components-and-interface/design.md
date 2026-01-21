# Design: UI Components and User Interface

**Feature**: Complete user interface for prompt analysis and refinement
**Status**: Design Phase
**Last Updated**: 2026-01-21

---

## 1. Architecture Overview

### 1.1 Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│                     (src/app/)                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Page Component                          │
│                  (page.tsx)                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Application State                       │  │
│  │  - prompt: string                                 │  │
│  │  - analysisResult: AnalysisResult | null         │  │
│  │  - refinedPrompt: string | null                  │  │
│  │  - loading: boolean                               │  │
│  │  - error: Error | null                            │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Input      │ │   Results    │ │  Comparison  │
│  Components  │ │  Components  │ │  Components  │
└──────────────┘ └──────────────┘ └──────────────┘
```

### 1.2 Data Flow

1. **User Input** → PromptInput component updates state
2. **Analyze Action** → API call to /api/analyze
3. **API Response** → Update analysisResult state
4. **Render Results** → ScoreDisplay and FindingsList components
5. **Refine Action** → API call to /api/refine (future)
6. **Comparison** → ComparisonView shows diff
7. **Export** → ExportControls handle copy/download

---

## 2. Component Specifications

### 2.1 PromptInput Component

**Purpose**: Allow users to input prompts for analysis

**Props**:

```typescript
interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  loading: boolean;
  maxLength?: number;
}
```

**State**:

```typescript
interface PromptInputState {
  charCount: number;
  showExamples: boolean;
}
```

**Implementation**:

```typescript
// src/components/prompt-input.tsx
'use client';

import { useState } from 'react';

export function PromptInput({
  value,
  onChange,
  onAnalyze,
  onClear,
  loading,
  maxLength = 10000,
}: PromptInputProps) {
  const charCount = value.length;
  const isOverLimit = charCount > maxLength;
  const isEmpty = charCount === 0;

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full min-h-[200px] p-4 border rounded-lg resize-y"
          disabled={loading}
          aria-label="Prompt input"
          aria-describedby="char-count"
        />
        <div
          id="char-count"
          className={`text-sm mt-2 ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}
        >
          {charCount} / {maxLength}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onAnalyze}
          disabled={isEmpty || isOverLimit || loading}
          className="btn-primary"
        >
          {loading ? 'Analyzing...' : 'Analyze Prompt'}
        </button>
        <button
          onClick={onClear}
          disabled={isEmpty || loading}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
```

**Styling**:

- Tailwind classes for responsive design
- Focus states with ring
- Disabled states with opacity
- Smooth transitions

### 2.2 ScoreDisplay Component

**Purpose**: Display overall score and quality tier

**Props**:

```typescript
interface ScoreDisplayProps {
  score: number;
  qualityTier: "Excellent" | "Good" | "Fair" | "Poor" | "Critical";
  categoryScores: Record<RuleCategory, CategoryScore>;
}
```

**Implementation**:

```typescript
// src/components/score-display.tsx
'use client';

export function ScoreDisplay({ score, qualityTier, categoryScores }: ScoreDisplayProps) {
  const tierColors = {
    Excellent: 'text-green-600 bg-green-50',
    Good: 'text-blue-600 bg-blue-50',
    Fair: 'text-yellow-600 bg-yellow-50',
    Poor: 'text-orange-600 bg-orange-50',
    Critical: 'text-red-600 bg-red-50',
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-900">{score}</div>
        <div className="text-sm text-gray-600 mt-1">out of 100</div>
        <div className={`inline-block px-4 py-2 rounded-full mt-4 ${tierColors[qualityTier]}`}>
          {qualityTier}
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(categoryScores).map(([category, data]) => (
          <CategoryScoreCard key={category} category={category} data={data} />
        ))}
      </div>
    </div>
  );
}

function CategoryScoreCard({ category, data }: { category: string; data: CategoryScore }) {
  const categoryNames = {
    A: 'Clarity & Intent',
    B: 'Context & Inputs',
    C: 'Instructions',
    D: 'Output Format',
    E: 'Safety & Privacy',
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="text-sm font-medium text-gray-600">Category {category}</div>
      <div className="text-xs text-gray-500 mt-1">{categoryNames[category]}</div>
      <div className="text-2xl font-bold mt-2">{data.score}</div>
      <div className="text-xs text-gray-600 mt-1">
        {data.rulesPassed}/{data.totalRules} passed
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${(data.rulesPassed / data.totalRules) * 100}%` }}
        />
      </div>
    </div>
  );
}
```

**Visual Design**:

- Large, prominent score number
- Color-coded quality tier badge
- Category cards in responsive grid
- Progress bars for visual feedback

### 2.3 FindingsList Component

**Purpose**: Display analysis findings grouped by severity

**Props**:

```typescript
interface FindingsListProps {
  findings: Finding[];
  showPassed?: boolean;
}
```

**Implementation**:

```typescript
// src/components/findings-list.tsx
'use client';

import { useState } from 'react';

export function FindingsList({ findings, showPassed = false }: FindingsListProps) {
  const [expandedSeverity, setExpandedSeverity] = useState<string[]>(['High', 'Medium']);

  const filteredFindings = showPassed ? findings : findings.filter(f => !f.passed);

  const groupedFindings = {
    High: filteredFindings.filter(f => f.severity === 'High'),
    Medium: filteredFindings.filter(f => f.severity === 'Medium'),
    Low: filteredFindings.filter(f => f.severity === 'Low'),
  };

  const toggleSeverity = (severity: string) => {
    setExpandedSeverity(prev =>
      prev.includes(severity)
        ? prev.filter(s => s !== severity)
        : [...prev, severity]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Findings</h3>
        <div className="text-sm text-gray-600">
          {filteredFindings.length} issue{filteredFindings.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {(['High', 'Medium', 'Low'] as const).map(severity => {
        const severityFindings = groupedFindings[severity];
        if (severityFindings.length === 0) return null;

        const isExpanded = expandedSeverity.includes(severity);

        return (
          <div key={severity} className="border rounded-lg">
            <button
              onClick={() => toggleSeverity(severity)}
              className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <SeverityBadge severity={severity} />
                <span className="font-medium">{severity} Severity</span>
                <span className="text-sm text-gray-600">
                  ({severityFindings.length})
                </span>
              </div>
              <ChevronIcon expanded={isExpanded} />
            </button>

            {isExpanded && (
              <div className="border-t divide-y">
                {severityFindings.map(finding => (
                  <FindingCard key={finding.ruleId} finding={finding} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FindingCard({ finding }: { finding: Finding }) {
  const [showFix, setShowFix] = useState(false);

  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        <StatusIcon passed={finding.passed} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{finding.ruleName}</span>
            <CategoryBadge category={finding.category} />
            <span className="text-xs text-gray-500">{finding.ruleId}</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">{finding.message}</p>

          {!finding.passed && (
            <button
              onClick={() => setShowFix(!showFix)}
              className="text-sm text-blue-600 hover:underline mt-2"
            >
              {showFix ? 'Hide' : 'Show'} suggested fix
            </button>
          )}

          {showFix && (
            <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
              {finding.suggestedFix}
            </div>
          )}
        </div>
        <ScoreImpact impact={finding.scoreImpact} passed={finding.passed} />
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[severity]}`}>
      {severity}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
      Cat {category}
    </span>
  );
}

function StatusIcon({ passed }: { passed: boolean }) {
  return passed ? (
    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  );
}

function ScoreImpact({ impact, passed }: { impact: number; passed: boolean }) {
  const sign = passed ? '+' : '-';
  const color = passed ? 'text-green-600' : 'text-red-600';

  return (
    <div className={`text-sm font-medium ${color}`}>
      {sign}{impact}
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
```

**Features**:

- Collapsible severity groups
- Expandable suggested fixes
- Visual status indicators
- Score impact display
- Category badges

### 2.4 ExportControls Component

**Purpose**: Allow users to export refined prompts

**Props**:

```typescript
interface ExportControlsProps {
  prompt: string;
  filename?: string;
}
```

**Implementation**:

```typescript
// src/components/export-controls.tsx
'use client';

import { useState } from 'react';

export function ExportControls({ prompt, filename = 'refined-prompt' }: ExportControlsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = (format: 'txt' | 'md') => {
    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    saved.unshift({
      prompt,
      timestamp: Date.now(),
    });
    localStorage.setItem('promptHistory', JSON.stringify(saved.slice(0, 10)));
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleCopy}
        className="btn-primary flex items-center gap-2"
      >
        <CopyIcon />
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>

      <button
        onClick={() => handleDownload('txt')}
        className="btn-secondary flex items-center gap-2"
      >
        <DownloadIcon />
        Download .txt
      </button>

      <button
        onClick={() => handleDownload('md')}
        className="btn-secondary flex items-center gap-2"
      >
        <DownloadIcon />
        Download .md
      </button>

      <button
        onClick={handleSave}
        className="btn-secondary flex items-center gap-2"
      >
        <SaveIcon />
        Save to History
      </button>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  );
}
```

**Features**:

- Copy to clipboard with feedback
- Download as .txt or .md
- Save to localStorage history
- Icon buttons for clarity

---

## 3. Page Implementation

### 3.1 Main Page Component

```typescript
// src/app/page.tsx
'use client';

import { useState } from 'react';
import { PromptInput } from '@/components/prompt-input';
import { ScoreDisplay } from '@/components/score-display';
import { FindingsList } from '@/components/findings-list';
import { ExportControls } from '@/components/export-controls';
import type { AnalysisResult } from '@/types/analysis';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">PromptSmith</h1>
          <p className="text-gray-600 mt-2">
            Analyze and refine your AI prompts for better results
          </p>
        </header>

        <div className="space-y-8">
          {/* Input Section */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Prompt</h2>
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              loading={loading}
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
                {error}
              </div>
            )}
          </section>

          {/* Results Section */}
          {analysisResult && (
            <>
              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                <ScoreDisplay
                  score={analysisResult.overallScore}
                  qualityTier={analysisResult.qualityTier}
                  categoryScores={analysisResult.categoryScores}
                />
              </section>

              <section className="bg-white rounded-lg shadow p-6">
                <FindingsList findings={analysisResult.findings} />
              </section>

              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Export</h2>
                <ExportControls prompt={prompt} />
              </section>
            </>
          )}
        </div>

        <footer className="text-center mt-12 text-gray-600 text-sm">
          <p>Built with Kiro IDE for the Kiro Hackathon 2026</p>
        </footer>
      </div>
    </main>
  );
}
```

---

## 4. Styling System

### 4.1 Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};
```

### 4.2 Global Styles

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg font-medium;
    @apply hover:bg-blue-700 active:bg-blue-800;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
    @apply transition-colors duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
  }

  .btn-secondary {
    @apply px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium;
    @apply hover:bg-gray-50 active:bg-gray-100;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
    @apply transition-colors duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }

  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg;
    @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
    @apply disabled:bg-gray-100 disabled:cursor-not-allowed;
  }
}
```

### 4.3 Responsive Design

**Breakpoints**:

- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

**Mobile-First Approach**:

```typescript
// Example responsive component
<div className="
  grid grid-cols-1        // Mobile: 1 column
  md:grid-cols-2          // Tablet: 2 columns
  lg:grid-cols-5          // Desktop: 5 columns
  gap-4
">
  {/* Category cards */}
</div>
```

---

## 5. State Management

### 5.1 Application State

```typescript
// State structure in page.tsx
interface AppState {
  // Input state
  prompt: string;

  // Analysis state
  analysisResult: AnalysisResult | null;
  loading: boolean;
  error: string | null;

  // UI state
  showPassedRules: boolean;
  expandedSeverities: string[];
}
```

### 5.2 Custom Hooks

```typescript
// src/hooks/use-prompt-analysis.ts
import { useState } from "react";
import type { AnalysisResult } from "@/types/analysis";

export function usePromptAnalysis() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data = await response.json();
      setResult(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { result, loading, error, analyze, reset };
}
```

```typescript
// src/hooks/use-local-storage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue] as const;
}
```

---

## 6. Accessibility Implementation

### 6.1 ARIA Labels and Roles

```typescript
// Example: Accessible button
<button
  onClick={handleAnalyze}
  disabled={isEmpty || loading}
  aria-label="Analyze prompt"
  aria-busy={loading}
  aria-disabled={isEmpty || loading}
>
  {loading ? 'Analyzing...' : 'Analyze Prompt'}
</button>

// Example: Accessible form
<textarea
  value={prompt}
  onChange={handleChange}
  aria-label="Prompt input"
  aria-describedby="char-count error-message"
  aria-invalid={isOverLimit}
/>
<div id="char-count" role="status" aria-live="polite">
  {charCount} / {maxLength}
</div>
```

### 6.2 Keyboard Navigation

**Tab Order**:

1. Prompt textarea
2. Analyze button
3. Clear button
4. Load Example button
5. Results (if present)
6. Export controls

**Keyboard Shortcuts**:

- `Ctrl/Cmd + Enter`: Analyze prompt
- `Escape`: Clear input (with confirmation)
- `Tab`: Navigate forward
- `Shift + Tab`: Navigate backward
- `Space/Enter`: Activate buttons

```typescript
// Example: Keyboard shortcut handler
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleAnalyze();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [handleAnalyze]);
```

### 6.3 Focus Management

```typescript
// Focus trap for modals
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  ) : null;
}
```

### 6.4 Color Contrast

**Minimum Ratios** (WCAG AA):

- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1

**Color Palette** (contrast-safe):

```css
/* Text on white background */
.text-gray-900 {
  color: #111827;
} /* 16.1:1 */
.text-gray-700 {
  color: #374151;
} /* 10.7:1 */
.text-gray-600 {
  color: #4b5563;
} /* 7.5:1 */

/* Status colors */
.text-green-700 {
  color: #15803d;
} /* 4.7:1 */
.text-red-700 {
  color: #b91c1c;
} /* 5.9:1 */
.text-yellow-700 {
  color: #a16207;
} /* 5.4:1 */
```

---

## 7. Performance Optimization

### 7.1 Code Splitting

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const ComparisonView = dynamic(() => import('@/components/comparison-view'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
```

### 7.2 Memoization

```typescript
import { useMemo, useCallback } from 'react';

function FindingsList({ findings }: FindingsListProps) {
  // Memoize expensive computations
  const groupedFindings = useMemo(() => {
    return {
      High: findings.filter(f => f.severity === 'High'),
      Medium: findings.filter(f => f.severity === 'Medium'),
      Low: findings.filter(f => f.severity === 'Low'),
    };
  }, [findings]);

  // Memoize callbacks
  const handleToggle = useCallback((severity: string) => {
    setExpanded(prev => /* ... */);
  }, []);

  return /* ... */;
}
```

### 7.3 Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="PromptSmith Logo"
  width={200}
  height={50}
  priority
/>
```

### 7.4 Bundle Size Optimization

```javascript
// next.config.js
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
};
```

---

## 8. Error Handling

### 8.1 Error Boundary

```typescript
// src/components/error-boundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 8.2 API Error Handling

```typescript
// src/lib/api-client.ts
export async function analyzePrompt(prompt: string): Promise<AnalysisResult> {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error.message, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    if (error instanceof TypeError) {
      throw new APIError("Network error. Please check your connection.", 0);
    }
    throw new APIError("An unexpected error occurred", 500);
  }
}

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "APIError";
  }
}
```

---

## 9. Testing Strategy

### 9.1 Component Testing

```typescript
// tests/components/prompt-input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PromptInput } from '@/components/prompt-input';

describe('PromptInput', () => {
  it('renders textarea and buttons', () => {
    render(
      <PromptInput
        value=""
        onChange={() => {}}
        onAnalyze={() => {}}
        onClear={() => {}}
        loading={false}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Analyze Prompt')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('disables analyze button when empty', () => {
    render(
      <PromptInput
        value=""
        onChange={() => {}}
        onAnalyze={() => {}}
        onClear={() => {}}
        loading={false}
      />
    );

    expect(screen.getByText('Analyze Prompt')).toBeDisabled();
  });

  it('shows character count', () => {
    render(
      <PromptInput
        value="Test prompt"
        onChange={() => {}}
        onAnalyze={() => {}}
        onClear={() => {}}
        loading={false}
      />
    );

    expect(screen.getByText(/11 \/ 10000/)).toBeInTheDocument();
  });

  it('calls onAnalyze when button clicked', () => {
    const onAnalyze = jest.fn();
    render(
      <PromptInput
        value="Test prompt"
        onChange={() => {}}
        onAnalyze={onAnalyze}
        onClear={() => {}}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText('Analyze Prompt'));
    expect(onAnalyze).toHaveBeenCalledTimes(1);
  });
});
```

### 9.2 Integration Testing

```typescript
// tests/integration/analysis-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/analyze', (req, res, ctx) => {
    return res(
      ctx.json({
        promptId: '123',
        timestamp: Date.now(),
        originalPrompt: 'test',
        overallScore: 75,
        qualityTier: 'Good',
        categoryScores: { /* ... */ },
        findings: [],
        summary: { /* ... */ },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Analysis Flow', () => {
  it('completes full analysis workflow', async () => {
    render(<Home />);

    // Enter prompt
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test prompt' } });

    // Click analyze
    fireEvent.click(screen.getByText('Analyze Prompt'));

    // Wait for results
    await waitFor(() => {
      expect(screen.getByText('Analysis Results')).toBeInTheDocument();
    });

    // Verify score displayed
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
  });
});
```

### 9.3 Accessibility Testing

```typescript
// tests/accessibility/a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '@/app/page';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## 10. Implementation Phases

### Phase 1: Core Components (2-3 hours)

- Set up component structure
- Implement PromptInput
- Implement ScoreDisplay
- Implement FindingsList
- Basic Tailwind styling

### Phase 2: Integration (1-2 hours)

- Connect to analysis API
- Handle loading states
- Error handling
- Display results

### Phase 3: Export & Polish (1-2 hours)

- Implement ExportControls
- LocalStorage integration
- Responsive design refinement
- Animations and transitions

### Phase 4: Accessibility & Testing (1-2 hours)

- Accessibility audit and fixes
- Component tests
- Integration tests
- Performance optimization

---

## 11. Success Metrics

### Technical Metrics

- Lighthouse Performance score > 90
- Lighthouse Accessibility score > 95
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Bundle size < 500KB

### User Experience Metrics

- Task completion rate > 95%
- Average time to analyze < 30 seconds
- Error rate < 5%
- User satisfaction score > 4/5

---

## 12. References

- **Requirements**: `.kiro/specs/ui-components-and-interface/requirements.md`
- **Analysis Engine**: `.kiro/specs/rule-engine-and-analysis/`
- **Product Vision**: `.kiro/steering/product.md`
- **Technical Stack**: `.kiro/steering/tech.md`
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Next.js**: https://nextjs.org/docs
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

**Design Status**: ✅ Complete and ready for implementation
**Next Step**: Create tasks.md with implementation breakdown
