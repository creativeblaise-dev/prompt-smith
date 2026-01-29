'use client'

import { useState } from 'react'
import { PromptAnalysis } from '@/lib/schemas/analysis'
import { PromptVariation } from '@/lib/engine/variations'
import VariationsView from './VariationsView'

interface RefinementResult {
  refinedPrompt: string
  improvements: string[]
  explanation: string
}

export default function PromptAnalyzer() {
  const [prompt, setPrompt] = useState('')
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null)
  const [variations, setVariations] = useState<PromptVariation[] | null>(null)
  const [selectedVariation, setSelectedVariation] = useState<PromptVariation | null>(null)
  const [refinement, setRefinement] = useState<RefinementResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGeneratingVariations, setIsGeneratingVariations] = useState(false)
  const [isRefining, setIsRefining] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!prompt.trim()) return

    setIsAnalyzing(true)
    setError(null)
    setVariations(null)
    setSelectedVariation(null)
    setRefinement(null)
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }]
        })
      })

      if (!response.ok) throw new Error('Analysis failed')
      
      const analysisResult = await response.json()
      setAnalysis(analysisResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGenerateVariations = async () => {
    if (!analysis) return

    setIsGeneratingVariations(true)
    setError(null)
    
    try {
      const response = await fetch('/api/variations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalPrompt: prompt
        })
      })

      if (!response.ok) throw new Error('Variations generation failed')
      
      const result = await response.json()
      setVariations(result.variations)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Variations generation failed')
    } finally {
      setIsGeneratingVariations(false)
    }
  }

  const handleSelectVariation = (variation: PromptVariation) => {
    setSelectedVariation(variation)
  }

  const handleRefine = async () => {
    if (!analysis) return

    setIsRefining(true)
    setError(null)
    
    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalPrompt: prompt,
          analysisResults: analysis.results
        })
      })

      if (!response.ok) throw new Error('Refinement failed')
      
      const refinementResult = await response.json()
      setRefinement(refinementResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Refinement failed')
    } finally {
      setIsRefining(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">PromptSmith - Intelligent Prompt Optimization</h1>
        
        <div className="space-y-2">
          <label htmlFor="prompt" className="block text-sm font-medium">
            Enter your prompt for analysis and optimization:
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste your AI prompt here..."
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!prompt.trim() || isAnalyzing}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Prompt'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white rounded-md">
                <h3 className="font-medium text-gray-900">Overall Score</h3>
                <p className="text-2xl font-bold text-blue-600">{analysis.overallScore}/100</p>
              </div>
              
              <div className="p-4 bg-white rounded-md">
                <h3 className="font-medium text-gray-900">Category Scores</h3>
                <div className="space-y-1 text-sm">
                  {Object.entries(analysis.categoryScores).map(([category, score]) => (
                    <div key={category} className="flex justify-between">
                      <span>{category}:</span>
                      <span className="font-medium">{score}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-medium text-gray-900">Rule Analysis</h3>
              {analysis.results.slice(0, 5).map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md border ${
                    result.passed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {result.ruleId} - {result.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        result.passed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {result.passed ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                  {result.suggestion && (
                    <p className="text-sm text-blue-600 mt-1">
                      💡 {result.suggestion}
                    </p>
                  )}
                </div>
              ))}
              {analysis.results.length > 5 && (
                <p className="text-sm text-gray-500">
                  ... and {analysis.results.length - 5} more rules
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleGenerateVariations}
                disabled={isGeneratingVariations}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {isGeneratingVariations ? 'Generating...' : '🚀 Generate Smart Variations'}
              </button>
              
              <button
                onClick={handleRefine}
                disabled={isRefining}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isRefining ? 'Refining...' : 'Generate Basic Refinement'}
              </button>
            </div>
          </div>
        </div>
      )}

      {variations && (
        <VariationsView 
          variations={variations} 
          onSelectVariation={handleSelectVariation}
        />
      )}

      {refinement && (
        <div className="p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Basic Refined Prompt</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Improved Version:</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-3 rounded border">
{refinement.refinedPrompt}
              </pre>
            </div>

            <div className="p-4 bg-white rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Improvements Applied:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {refinement.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(refinement.refinedPrompt)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Copy Refined Prompt
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
