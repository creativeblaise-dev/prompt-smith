'use client'

import { useState } from 'react'
import { PromptAnalysis } from '@/lib/schemas/analysis'
import { PromptVariation } from '@/lib/engine/variations'
import { Button } from './ui/Button'
import { 
  BarChart3, 
  Sparkles, 
  Copy, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Lightbulb
} from 'lucide-react'

interface RefinementResult {
  refinedPrompt: string
  improvements: string[]
  explanation: string
}

interface ResultsPanelProps {
  analysis: PromptAnalysis | null
  variations: PromptVariation[] | null
  selectedVariation: PromptVariation | null
  refinement: RefinementResult | null
  isGeneratingVariations: boolean
  isRefining: boolean
  onGenerateVariations: () => void
  onSelectVariation: (variation: PromptVariation) => void
  onRefine: () => void
}

export default function ResultsPanel({
  analysis,
  variations,
  selectedVariation,
  refinement,
  isGeneratingVariations,
  isRefining,
  onGenerateVariations,
  onSelectVariation,
  onRefine
}: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<'analysis' | 'variations' | 'refinement'>('analysis')
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getSeverityIcon = (passed: boolean, score: number) => {
    if (passed) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (score >= 3) return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    return <XCircle className="w-4 h-4 text-red-500" />
  }

  if (!analysis) {
    return (
      <div className="card p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Analyze</h3>
        <p className="text-gray-600 text-base">
          Enter a prompt on the left to get started with intelligent analysis and optimization
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Analysis Results</h2>
          <div className={`px-4 py-2 rounded-lg border font-semibold text-lg ${getScoreColor(analysis.overallScore)}`}>
            {analysis.overallScore}/100
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          {Object.entries(analysis.categoryScores).map(([category, score]) => {
            const categoryNames = {
              clarityIntent: 'Clarity & Intent',
              contextInputs: 'Context & Inputs', 
              instructionsConstraints: 'Instructions & Constraints',
              outputFormat: 'Output Format & Verification',
              safetyPrivacy: 'Safety, Privacy & Robustness'
            }
            
            const categoryName = categoryNames[category as keyof typeof categoryNames] || category
            // Convert percentage score (0-100) to points out of 20
            const pointsOutOf20 = Math.round((score / 100) * 20)
            const percentage = Math.min(score, 100) // Ensure percentage doesn't exceed 100%
            
            return (
              <div key={category} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    {categoryName}
                  </div>
                  <div className={`text-lg font-semibold ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {pointsOutOf20}/20
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(percentage)}% complete
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={onGenerateVariations}
            disabled={isGeneratingVariations}
            className="flex-1"
          >
            {isGeneratingVariations ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Variations
              </>
            )}
          </Button>
          
          <Button
            onClick={onRefine}
            disabled={isRefining}
            variant="outline"
            className="flex-1"
          >
            {isRefining ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin mr-2" />
                Refining...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Refine Prompt
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'analysis', label: 'Analysis', icon: BarChart3 },
              { id: 'variations', label: 'Variations', icon: Sparkles },
              { id: 'refinement', label: 'Refinement', icon: Lightbulb }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-4">
              {analysis.results.map((result, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    {getSeverityIcon(result.passed, result.score)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{result.ruleId}</h4>
                        <span className="text-sm text-gray-500">
                          {result.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{result.message}</p>
                      {result.suggestion && (
                        <p className="text-blue-600 text-sm mt-2">
                          💡 {result.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Variations Tab */}
          {activeTab === 'variations' && (
            <div className="space-y-4">
              {variations ? (
                variations.map((variation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{variation.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(variation.analysis.overallScore)}`}>
                          {variation.analysis.overallScore}/100
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(variation.prompt, `${variation.name} variation`)}
                        >
                          {copiedText === `${variation.name} variation` ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{variation.description}</p>
                    <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                      {variation.prompt}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click &quot;Generate Variations&quot; to see optimized approaches</p>
                </div>
              )}
            </div>
          )}

          {/* Refinement Tab */}
          {activeTab === 'refinement' && (
            <div className="space-y-4">
              {refinement ? (
                <>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Refined Prompt</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(refinement.refinedPrompt, 'refined prompt')}
                      >
                        {copiedText === 'refined prompt' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                      {refinement.refinedPrompt}
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Improvements Made</h4>
                    <ul className="space-y-2">
                      {refinement.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Explanation</h4>
                    <p className="text-sm text-gray-600">{refinement.explanation}</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click &quot;Refine Prompt&quot; to see an improved version</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
