'use client'

import { Textarea } from './ui/Textarea'
import { Button } from './ui/Button'
import { AlertCircle, Zap } from 'lucide-react'

interface InputPanelProps {
  prompt: string
  setPrompt: (prompt: string) => void
  onAnalyze: () => void
  onClear: () => void
  isAnalyzing: boolean
  error: string | null
}

export default function InputPanel({ 
  prompt, 
  setPrompt, 
  onAnalyze, 
  onClear,
  isAnalyzing, 
  error 
}: InputPanelProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Input Card */}
      <div className="card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">Prompt Input</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-base font-medium mb-3 text-slate-700">
              Enter your AI prompt for analysis and optimization
            </label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Paste your AI prompt here...

Example: Help me write a blog post about artificial intelligence"
              className="min-h-[240px] resize-none text-base"
            />
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={onAnalyze}
              disabled={!prompt.trim() || isAnalyzing}
              className="flex-1"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Analyzing Prompt...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-3" />
                  Analyze Prompt
                </>
              )}
            </Button>
            
            <Button
              onClick={onClear}
              disabled={!prompt.trim() && !isAnalyzing}
              variant="outline"
              size="lg"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card p-4 border-red-200 bg-red-50 animate-slide-up">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-base text-red-800 font-medium">Error: {error}</p>
          </div>
        </div>
      )}

      {/* Tips Card */}
      <div className="card p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-4 text-lg">💡 Pro Tips</h3>
        <ul className="space-y-3 text-base text-blue-800">
          <li>• Be specific about your desired output format</li>
          <li>• Include relevant context and constraints</li>
          <li>• Define the AI&apos;s role clearly</li>
          <li>• Provide examples when helpful</li>
        </ul>
      </div>
    </div>
  )
}
