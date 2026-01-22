import { Rule } from '@/types/rule';

/**
 * Category C: Instructions & Constraints Rules
 * These rules ensure the prompt provides clear, actionable instructions.
 */

export const instructionRules: readonly Rule[] = [
  {
    id: 'R11',
    name: 'Step-by-Step Instructions Where Needed',
    category: 'instructions',
    description: 'Complex tasks should include step-by-step instructions',
    weight: 4,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const stepPatterns = [
          /\d+\.\s+/g,
          /(first|second|third|then|next|finally)/i,
          /(step \d+|phase \d+)/i,
          /\*\*steps\*\*/i
        ];
        const hasSteps = stepPatterns.some(pattern => pattern.test(prompt));
        const isComplex = prompt.length > 300 || prompt.split(/[.!?]/).length > 5;
        return !isComplex || hasSteps;
      } catch (error) {
        console.error('Error in R11 check:', error);
        return false;
      }
    },
    suggestion: 'Break complex tasks into numbered steps: "1. First, 2. Then, 3. Finally"'
  },

  {
    id: 'R12',
    name: 'Explicit Constraints Listed',
    category: 'instructions',
    description: 'Prompt should explicitly list all constraints and limitations',
    weight: 4,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const constraintPatterns = [
          /(constraint|limitation|requirement)s?:/i,
          /(must|should|need to|required to)/i,
          /(do not|don\'t|avoid|exclude)/i,
          /\*\*constraints\*\*/i
        ];
        return constraintPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R12 check:', error);
        return false;
      }
    },
    suggestion: 'Add "Constraints:" section listing all requirements and limitations'
  },

  {
    id: 'R13',
    name: 'Priority Order Defined',
    category: 'instructions',
    description: 'When multiple requirements exist, priority should be specified',
    weight: 3,
    severity: 'low',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const priorityPatterns = [
          /(priority|important|critical|essential)/i,
          /(first|primary|secondary|most important)/i,
          /(prioritize|focus on)/i,
          /\*\*priority\*\*/i
        ];
        const hasMultipleRequirements = (prompt.match(/\b(must|should|need)\b/gi) || []).length > 2;
        return !hasMultipleRequirements || priorityPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R13 check:', error);
        return false;
      }
    },
    suggestion: 'When multiple requirements exist, specify priority: "Most important:", "Secondary:"'
  },

  {
    id: 'R14',
    name: 'Desired Depth or Detail Specified',
    category: 'instructions',
    description: 'Prompt should specify the level of detail or depth required',
    weight: 4,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const depthPatterns = [
          /(brief|detailed|comprehensive|thorough)/i,
          /(summary|overview|in-depth|deep dive)/i,
          /(high-level|detailed|specific)/i,
          /(length|words|pages|paragraphs):\s*\d+/i
        ];
        return depthPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R14 check:', error);
        return false;
      }
    },
    suggestion: 'Specify depth: "Brief overview", "Detailed analysis", or "Comprehensive guide"'
  },

  {
    id: 'R15',
    name: 'Edge Cases or Exceptions Mentioned',
    category: 'instructions',
    description: 'Prompt should address potential edge cases or exceptions',
    weight: 3,
    severity: 'low',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const edgeCasePatterns = [
          /(edge case|exception|special case)/i,
          /(if.*then|when.*do|unless)/i,
          /(handle|address|consider)/i,
          /\*\*exceptions\*\*/i
        ];
        return edgeCasePatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R15 check:', error);
        return false;
      }
    },
    suggestion: 'Consider edge cases: "If X occurs, then Y" or "Handle exceptions by..."'
  }
] as const;
