import { PromptAnalysis } from '../schemas/analysis'
import { analyzePromptAgainstRules } from './analyzer'

export interface PromptVariation {
  id: string
  name: string
  description: string
  prompt: string
  analysis: PromptAnalysis
  approach: 'structured' | 'conversational' | 'technical'
}

export async function generatePromptVariations(
  originalPrompt: string,
  originalAnalysis: PromptAnalysis
): Promise<PromptVariation[]> {
  const failedRules = originalAnalysis.results.filter(r => !r.passed)
  const suggestions = failedRules.map(r => r.suggestion).filter(Boolean) as string[]
  
  // Generate 3 different approaches
  const structuredPrompt = generateStructuredVariation(originalPrompt, suggestions)
  const conversationalPrompt = generateConversationalVariation(originalPrompt, suggestions)
  const technicalPrompt = generateTechnicalVariation(originalPrompt, suggestions)
  
  // Analyze each variation in parallel
  const [structuredAnalysis, conversationalAnalysis, technicalAnalysis] = await Promise.all([
    analyzePromptAgainstRules(structuredPrompt),
    analyzePromptAgainstRules(conversationalPrompt),
    analyzePromptAgainstRules(technicalPrompt)
  ])
  
  const variations: PromptVariation[] = [
    {
      id: 'structured',
      name: 'Structured Version',
      description: 'Highly organized with clear MPF sections and bullet points',
      prompt: structuredPrompt,
      analysis: structuredAnalysis,
      approach: 'structured'
    },
    {
      id: 'conversational',
      name: 'Conversational Version', 
      description: 'Natural, friendly tone while maintaining clarity',
      prompt: conversationalPrompt,
      analysis: conversationalAnalysis,
      approach: 'conversational'
    },
    {
      id: 'technical',
      name: 'Technical Version',
      description: 'Precise, detailed specifications with explicit constraints',
      prompt: technicalPrompt,
      analysis: technicalAnalysis,
      approach: 'technical'
    }
  ]
  
  // Sort by score (highest first)
  return variations.sort((a, b) => b.analysis.overallScore - a.analysis.overallScore)
}

function generateStructuredVariation(original: string, suggestions: string[]): string {
  const intent = extractIntent(original)
  
  return `**ASK**
${intent}

**CONTEXT**
- Task requires systematic approach
- Applied prompt engineering best practices
- Optimized for clarity and structure

**CONSTRAINTS**
- Maintain original intent and purpose
- Follow structured methodology
- Provide specific, actionable guidance
${suggestions.length > 0 ? `- Address: ${suggestions.slice(0, 2).join(', ')}` : ''}

**EXAMPLE**
Input: [Describe expected input format]
Output: [Specify desired output structure]

**VERIFICATION**
- Check output meets all requirements
- Validate against success criteria
- Ensure completeness and accuracy`
}

function generateConversationalVariation(original: string, suggestions: string[]): string {
  const intent = extractIntent(original)
  
  return `Hi! I'd like you to help me with something specific.

${intent}

Here's what I'm looking for:
- Keep the tone natural and approachable
- Make sure your response is clear and easy to understand
- Focus on being helpful and thorough
${suggestions.length > 0 ? `- Please also: ${suggestions.slice(0, 2).join(' and ')}` : ''}

If you need any clarification or have questions about what I'm asking for, just let me know. I want to make sure we're on the same page before you start.

Thanks for your help!`
}

function generateTechnicalVariation(original: string, suggestions: string[]): string {
  const intent = extractIntent(original)
  
  return `OBJECTIVE: ${intent}

SPECIFICATIONS:
- Primary function: Execute the requested task with precision
- Quality standards: High accuracy, completeness, and relevance
- Output requirements: Structured, detailed, and actionable
- Error handling: Identify and address potential issues
${suggestions.length > 0 ? `- Additional requirements: ${suggestions.slice(0, 3).join('; ')}` : ''}

CONSTRAINTS:
- Maintain factual accuracy
- Follow established best practices
- Provide comprehensive coverage
- Include relevant examples where applicable

VALIDATION CRITERIA:
- Output addresses all specified requirements
- Information is accurate and up-to-date
- Format is appropriate for intended use
- Response demonstrates clear understanding of the request

EXECUTION: Proceed with the above parameters and deliver results according to specifications.`
}

function extractIntent(prompt: string): string {
  const cleaned = prompt.trim()
  
  // If prompt is short, use as-is
  if (cleaned.length <= 100) {
    return cleaned
  }
  
  // Try to extract first sentence or main request
  const sentences = cleaned.split(/[.!?]+/)
  const firstSentence = sentences[0]?.trim()
  
  if (firstSentence && firstSentence.length > 20) {
    return firstSentence
  }
  
  // Fallback: use first 100 characters
  return cleaned.substring(0, 100).trim() + (cleaned.length > 100 ? '...' : '')
}
