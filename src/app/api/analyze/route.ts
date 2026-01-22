import { NextRequest, NextResponse } from 'next/server';
import { PromptAnalyzer } from '@/lib/engine/analyzer';
import { PromptInputSchema } from '@/lib/schemas/prompt';
import { AnalysisResultSchema } from '@/lib/schemas/analysis';

/**
 * POST /api/analyze - Analyze a prompt against all rules
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedInput = PromptInputSchema.parse(body);

    // Initialize analyzer and perform analysis
    const analyzer = new PromptAnalyzer();
    const result = await analyzer.analyze(validatedInput.content);

    // Validate response before sending
    const validatedResult = AnalysisResultSchema.parse(result);

    return NextResponse.json(validatedResult, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('API Error:', error);

    // Handle validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Handle analysis errors
    if (error instanceof Error && error.message.includes('Analysis failed')) {
      return NextResponse.json(
        {
          error: 'Analysis failed',
          message: error.message,
        },
        { status: 422 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/analyze - Handle CORS preflight
 */
export async function OPTIONS() {
  try {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('OPTIONS Error:', error);
    return new NextResponse(null, { status: 500 });
  }
}
