'use client'

import { useState } from 'react'
import { PromptVariation } from '@/lib/engine/variations'

interface VariationsViewProps {
  variations: PromptVariation[]
  onSelectVariation: (variation: PromptVariation) => void
}

export default function VariationsView({ variations, onSelectVariation }: VariationsViewProps) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedVariation, setSelectedVariation] = useState<PromptVariation | null>(null)

  const handleSelectVariation = (variation: PromptVariation) => {
    setSelectedVariation(variation)
    onSelectVariation(variation)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Generated Variations</h2>
        <p className="text-sm text-gray-600 mb-4">
          Choose from 3 optimized approaches, each with different strengths:
        </p>
        
        {/* Variation Tabs */}
        <div className="flex space-x-1 mb-4">
          {variations.map((variation, index) => (
            <button
              key={variation.id}
              onClick={() => setSelectedTab(index)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {variation.name}
              <span className="ml-2 text-xs">
                {variation.analysis.overallScore}/100
              </span>
            </button>
          ))}
        </div>

        {/* Selected Variation Display */}
        {variations[selectedTab] && (
          <div className="bg-white rounded-md p-4 border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">
                  {variations[selectedTab].name}
                </h3>
                <p className="text-sm text-gray-600">
                  {variations[selectedTab].description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {variations[selectedTab].analysis.overallScore}/100
                  </div>
                  <div className="text-xs text-gray-500">Quality Score</div>
                </div>
                <button
                  onClick={() => handleSelectVariation(variations[selectedTab])}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Select This
                </button>
              </div>
            </div>

            {/* Prompt Preview */}
            <div className="bg-gray-50 rounded p-3 mb-3">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-40 overflow-y-auto">
                {variations[selectedTab].prompt}
              </pre>
            </div>

            {/* Category Scores */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
              {Object.entries(variations[selectedTab].analysis.categoryScores).map(([category, score]) => (
                <div key={category} className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{score}</div>
                  <div className="text-xs text-gray-600">{category.split(' ')[0]}</div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(variations[selectedTab].prompt)}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                Copy Prompt
              </button>
              <button
                onClick={() => {
                  const analysis = variations[selectedTab].analysis
                  const summary = `Score: ${analysis.overallScore}/100\nRules Passed: ${analysis.results.filter(r => r.passed).length}/${analysis.results.length}`
                  copyToClipboard(`${variations[selectedTab].prompt}\n\n--- Analysis ---\n${summary}`)
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Copy with Analysis
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Variation Details */}
      {selectedVariation && (
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Selected: {selectedVariation.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Performance</h4>
              <div className="space-y-1 text-sm">
                <div>Overall Score: <span className="font-semibold">{selectedVariation.analysis.overallScore}/100</span></div>
                <div>Rules Passed: <span className="font-semibold">{selectedVariation.analysis.results.filter(r => r.passed).length}/{selectedVariation.analysis.results.length}</span></div>
                <div>Approach: <span className="font-semibold capitalize">{selectedVariation.approach}</span></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Why This Works</h4>
              <p className="text-sm text-gray-700">{selectedVariation.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
