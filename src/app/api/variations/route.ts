import { NextRequest } from 'next/server'
import { generatePromptVariations } from '@/lib/engine/variations'
import { analyzePromptAgainstRules } from '@/lib/engine/analyzer'

export async function POST(request: NextRequest) {
  try {
    const { originalPrompt } = await request.json()
    
    if (!originalPrompt || typeof originalPrompt !== 'string') {
      return Response.json({ error: 'Original prompt is required' }, { status: 400 })
    }
    
    // First analyze the original prompt
    const originalAnalysis = await analyzePromptAgainstRules(originalPrompt)
    
    // Generate variations based on the analysis
    const variations = await generatePromptVariations(originalPrompt, originalAnalysis)
    
    return Response.json({
      originalAnalysis,
      variations
    })
  } catch (error) {
    console.error('Variations generation error:', error)
    return Response.json({ 
      error: 'Failed to generate variations', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
