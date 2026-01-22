import { Rule } from '@/types/rule';

/**
 * Category D: Output Format & Verification Rules
 * These rules ensure the prompt specifies clear output requirements and verification criteria.
 */

export const formatRules: readonly Rule[] = [
  {
    id: 'R16',
    name: 'Output Format Explicitly Defined',
    category: 'format',
    description: 'Prompt should clearly specify the desired output format',
    weight: 5,
    severity: 'high',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const formatPatterns = [
          /(format|output|response):\s*\w+/i,
          /(json|xml|markdown|html|csv|table)/i,
          /(list|bullet|numbered|paragraph)/i,
          /\*\*format\*\*/i
        ];
        return formatPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R16 check:', error);
        return false;
      }
    },
    suggestion: 'Specify output format: "Format: JSON", "Response as bullet points", etc.'
  },

  {
    id: 'R17',
    name: 'Structured Output Requested Where Appropriate',
    category: 'format',
    description: 'Complex outputs should request structured format (JSON, tables, etc.)',
    weight: 4,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const structurePatterns = [
          /(json|xml|yaml|table|structured)/i,
          /(schema|template|format)/i,
          /\{.*\}/,
          /\*\*structure\*\*/i
        ];
        const isComplex = prompt.length > 300 || prompt.includes('multiple') || prompt.includes('list');
        return !isComplex || structurePatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R17 check:', error);
        return false;
      }
    },
    suggestion: 'For complex outputs, request structured format: "Return as JSON with fields..."'
  },

  {
    id: 'R18',
    name: 'Examples Provided (Few-Shot)',
    category: 'format',
    description: 'Prompt should include examples of desired output format',
    weight: 4,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const examplePatterns = [
          /(example|sample|instance):/i,
          /(for example|e\.g\.|such as)/i,
          /(like this|as follows)/i,
          /\*\*example\*\*/i
        ];
        return examplePatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R18 check:', error);
        return false;
      }
    },
    suggestion: 'Add examples: "Example:", "For instance:", or "Sample output:"'
  },

  {
    id: 'R19',
    name: 'Acceptance Criteria Defined',
    category: 'format',
    description: 'Prompt should specify what constitutes a successful response',
    weight: 4,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const criteriaPatterns = [
          /(criteria|requirement|must include)/i,
          /(success|acceptable|valid)/i,
          /(ensure|verify|check)/i,
          /\*\*criteria\*\*/i
        ];
        return criteriaPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R19 check:', error);
        return false;
      }
    },
    suggestion: 'Define success criteria: "The response must include...", "Ensure that..."'
  },

  {
    id: 'R20',
    name: 'Self-Verification Requested',
    category: 'format',
    description: 'Prompt should ask AI to verify or validate its own response',
    weight: 3,
    severity: 'low',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const verificationPatterns = [
          /(verify|validate|check|review)/i,
          /(double.?check|confirm)/i,
          /(ensure.*correct|make sure)/i,
          /\*\*verify\*\*/i
        ];
        return verificationPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R20 check:', error);
        return false;
      }
    },
    suggestion: 'Add verification: "Please verify your response" or "Double-check that..."'
  }
] as const;
