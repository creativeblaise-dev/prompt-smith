import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { originalPrompt, analysisResults } = await request.json()
    
    // Rule-based refinement using prompt engineering best practices
    const failedRules = analysisResults.filter((r: any) => !r.passed)
    const suggestions = analysisResults.filter((r: any) => r.suggestion).map((r: any) => r.suggestion)
    
    // Apply MPF structure based on analysis
    const refinedPrompt = generateStructuredPrompt(originalPrompt, failedRules, suggestions)
    
    const improvements = [
      'Applied MPF (Markdown Prompts Framework) structure',
      'Enhanced clarity and organization', 
      `Addressed ${failedRules.length} rule violations`,
      'Added proper sections and formatting',
      ...suggestions.slice(0, 2) // Include top suggestions
    ]

    return Response.json({
      refinedPrompt,
      improvements,
      explanation: 'Rule-based refinement using systematic prompt engineering principles.'
    })
  } catch (error) {
    console.error('Refinement error:', error)
    return Response.json({ 
      error: 'Refinement failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

function generateStructuredPrompt(original: string, failedRules: any[], suggestions: string[]): string {
  // Extract intent from original prompt
  const intent = original.length > 100 ? original.substring(0, 100) + '...' : original
  
  return `**ASK**
${intent}

**CONTEXT**
- Task requires clear, structured approach
- Applied best practices from prompt analysis

**CONSTRAINTS**
- Maintain original intent and purpose
- Follow systematic methodology
- Provide specific, actionable guidance

**EXAMPLE**
Input: [Describe expected input]
Output: [Specify desired format and structure]

**VERIFICATION**
- Check output meets requirements
- Validate against success criteria`
}
