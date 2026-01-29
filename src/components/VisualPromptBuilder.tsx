'use client'

import { useState } from 'react'
import { Button } from './ui/Button'
import { Textarea } from './ui/Textarea'
import { Plus, GripVertical, X, FileText } from 'lucide-react'

interface MPFSection {
  id: string
  type: 'ASK' | 'CONTEXT' | 'CONSTRAINTS' | 'EXAMPLE' | 'VERIFICATION'
  content: string
}

interface VisualPromptBuilderProps {
  onPromptGenerated: (prompt: string) => void
}

const SECTION_TEMPLATES = {
  ASK: 'Define the primary objective or task you want the AI to accomplish',
  CONTEXT: 'Provide relevant background information, setting, or domain knowledge',
  CONSTRAINTS: 'List specific requirements, limitations, or rules to follow',
  EXAMPLE: 'Show desired input/output format or provide sample responses',
  VERIFICATION: 'Define success criteria and validation requirements'
}

export default function VisualPromptBuilder({ onPromptGenerated }: VisualPromptBuilderProps) {
  const [sections, setSections] = useState<MPFSection[]>([
    { id: '1', type: 'ASK', content: '' }
  ])
  const [isOpen, setIsOpen] = useState(false)

  const addSection = (type: MPFSection['type']) => {
    const newSection: MPFSection = {
      id: Date.now().toString(),
      type,
      content: ''
    }
    setSections([...sections, newSection])
  }

  const updateSection = (id: string, content: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, content } : s))
  }

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id))
  }

  const generatePrompt = () => {
    const prompt = sections
      .filter(s => s.content.trim())
      .map(s => `**${s.type}**\n${s.content.trim()}`)
      .join('\n\n')
    
    onPromptGenerated(prompt)
    setIsOpen(false)
  }

  const applyTemplate = (type: MPFSection['type']) => {
    const section = sections.find(s => s.type === type)
    if (section) {
      updateSection(section.id, SECTION_TEMPLATES[type])
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full"
      >
        <FileText className="w-4 h-4 mr-2" />
        Visual Prompt Builder
      </Button>
    )
  }

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Visual Prompt Builder</h3>
        <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {sections.map((section, index) => (
          <div key={section.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-sm text-gray-700">__{section.type}__</span>
                <Button
                  onClick={() => applyTemplate(section.type)}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  Use Template
                </Button>
              </div>
              {sections.length > 1 && (
                <Button
                  onClick={() => removeSection(section.id)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
            <Textarea
              value={section.content}
              onChange={(e) => updateSection(section.id, e.target.value)}
              placeholder={SECTION_TEMPLATES[section.type]}
              className="min-h-[80px] text-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(['CONTEXT', 'CONSTRAINTS', 'EXAMPLE', 'VERIFICATION'] as const).map(type => (
          !sections.find(s => s.type === type) && (
            <Button
              key={type}
              onClick={() => addSection(type)}
              variant="outline"
              size="sm"
            >
              <Plus className="w-3 h-3 mr-1" />
              {type}
            </Button>
          )
        ))}
      </div>

      <div className="flex space-x-2 pt-2">
        <Button onClick={generatePrompt} className="flex-1">
          Generate Prompt
        </Button>
        <Button onClick={() => setIsOpen(false)} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  )
}
