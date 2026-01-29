'use client'

import { PerformancePrediction } from '@/lib/engine/performance'
import { TrendingUp, Zap, Target, Award } from 'lucide-react'

interface PerformancePredictorProps {
  prediction: PerformancePrediction
}

export default function PerformancePredictor({ prediction }: PerformancePredictorProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Performance Prediction</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getConfidenceColor(prediction.confidenceLevel)}`}>
          {prediction.confidenceLevel} confidence
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-4 h-4 text-blue-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Success Rate</span>
          </div>
          <div className={`text-2xl font-bold px-3 py-1 rounded border ${getScoreColor(prediction.successLikelihood)}`}>
            {prediction.successLikelihood}%
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Efficiency</span>
          </div>
          <div className={`text-2xl font-bold px-3 py-1 rounded border ${getScoreColor(prediction.tokenEfficiency)}`}>
            {prediction.tokenEfficiency}%
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-4 h-4 text-purple-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Complexity</span>
          </div>
          <div className={`text-2xl font-bold px-3 py-1 rounded border ${getScoreColor(100 - prediction.complexityScore)}`}>
            {prediction.complexityScore}%
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Recommended Use Case</h4>
        <p className="text-blue-800 text-sm">{prediction.recommendedUseCase}</p>
      </div>
    </div>
  )
}
