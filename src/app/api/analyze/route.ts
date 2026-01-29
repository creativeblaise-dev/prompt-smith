import { NextRequest } from 'next/server'
import { analyzePromptAgainstRules } from '@/lib/engine/analyzer'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()
    const lastMessage = messages[messages.length - 1]
    const prompt = lastMessage.content

    // Use our rule engine to analyze the prompt
    const analysis = await analyzePromptAgainstRules(prompt)
    
    // Return the analysis as JSON
    return Response.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return new Response('Analysis failed', { status: 500 })
  }
}
