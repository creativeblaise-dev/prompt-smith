'use client'

import { useState } from 'react'
import { PromptAnalysis } from '@/lib/schemas/analysis'
import { PromptVariation } from '@/lib/engine/variations'
import { PerformancePrediction, predictPromptPerformance } from '@/lib/engine/performance'
import Header from './Header'
import InputPanel from './InputPanel'
import ResultsPanel from './ResultsPanel'
import VisualPromptBuilder from './VisualPromptBuilder'
import PerformancePredictor from './PerformancePredictor'

interface RefinementResult {
  refinedPrompt: string
  improvements: string[]
  explanation: string
}

export default function ModernPromptAnalyzer() {
  const [prompt, setPrompt] = useState('')
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null)
  const [variations, setVariations] = useState<PromptVariation[] | null>(null)
  const [selectedVariation, setSelectedVariation] = useState<PromptVariation | null>(null)
  const [refinement, setRefinement] = useState<RefinementResult | null>(null)
  const [prediction, setPrediction] = useState<PerformancePrediction | null>(null)
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
    setPrediction(null)
    
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
      
      // Generate performance prediction
      const performancePrediction = predictPromptPerformance(
        prompt,
        analysisResult.overallScore,
        analysisResult.categoryScores
      )
      setPrediction(performancePrediction)
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

  const handleVisualPromptGenerated = (generatedPrompt: string) => {
    setPrompt(generatedPrompt)
  }

  const handleClear = () => {
    setPrompt('')
    setAnalysis(null)
    setVariations(null)
    setSelectedVariation(null)
    setRefinement(null)
    setPrediction(null)
    setError(null)
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient mb-4">
              Transform Your AI Prompts
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Analyze, optimize, and perfect your prompts with intelligent feedback and smart variations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Input */}
            <div className="space-y-6">
              <InputPanel
                prompt={prompt}
                setPrompt={setPrompt}
                onAnalyze={handleAnalyze}
                onClear={handleClear}
                isAnalyzing={isAnalyzing}
                error={error}
              />
              
              <VisualPromptBuilder onPromptGenerated={handleVisualPromptGenerated} />
              
              {prediction && <PerformancePredictor prediction={prediction} />}
            </div>

            {/* Right Panel - Results */}
            <ResultsPanel
              analysis={analysis}
              variations={variations}
              selectedVariation={selectedVariation}
              refinement={refinement}
              isGeneratingVariations={isGeneratingVariations}
              isRefining={isRefining}
              onGenerateVariations={handleGenerateVariations}
              onSelectVariation={handleSelectVariation}
              onRefine={handleRefine}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
