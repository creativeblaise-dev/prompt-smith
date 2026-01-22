import { Rule } from '@/types/rule';

/**
 * Category B: Context & Inputs Rules
 * These rules ensure the prompt provides sufficient context and clearly defines inputs.
 */

export const contextRules: readonly Rule[] = [
  {
    id: 'R6',
    name: 'Relevant Background Provided',
    category: 'context',
    description: 'Prompt should provide necessary background information',
    weight: 5,
    severity: 'high',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const backgroundPatterns = [
          /(background|context|situation|scenario):/i,
          /(given|considering|based on)/i,
          /(currently|previously|in the past)/i,
          /\*\*context\*\*/i
        ];
        return backgroundPatterns.some(pattern => pattern.test(prompt)) || prompt.length > 200;
      } catch (error) {
        console.error('Error in R6 check:', error);
        return false;
      }
    },
    suggestion: 'Add a "Context:" or "Background:" section with relevant information'
  },

  {
    id: 'R7',
    name: 'Inputs Clearly Defined',
    category: 'context',
    description: 'Prompt should clearly specify what inputs or data will be provided',
    weight: 4,
    severity: 'high',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const inputPatterns = [
          /(input|data|information|file|document):\s*\w+/i,
          /(provided|given|attached|included)/i,
          /(here is|below is|following)/i,
          /\*\*input\*\*/i
        ];
        return inputPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R7 check:', error);
        return false;
      }
    },
    suggestion: 'Specify inputs with "Input:", "Data:", or "The following information:"'
  },

  {
    id: 'R8',
    name: 'Assumptions Are Declared',
    category: 'context',
    description: 'Prompt should explicitly state any assumptions being made',
    weight: 3,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const assumptionPatterns = [
          /(assume|assuming|assumption)/i,
          /(given that|suppose|presume)/i,
          /\*\*assumptions\*\*/i
        ];
        return assumptionPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R8 check:', error);
        return false;
      }
    },
    suggestion: 'Add "Assumptions:" section or use "Assuming that..." to clarify assumptions'
  },

  {
    id: 'R9',
    name: 'Constraints Are Contextualized',
    category: 'context',
    description: 'Prompt should explain why constraints exist and their importance',
    weight: 3,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const constraintPatterns = [
          /(constraint|limitation|restriction):\s*\w+/i,
          /(must not|cannot|should not|avoid)/i,
          /(due to|because of|given)/i,
          /\*\*constraints\*\*/i
        ];
        return constraintPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R9 check:', error);
        return false;
      }
    },
    suggestion: 'Explain constraints with context: "Due to X, you must not Y"'
  },

  {
    id: 'R10',
    name: 'No Contradictory Instructions',
    category: 'context',
    description: 'Prompt should not contain conflicting or contradictory requirements',
    weight: 5,
    severity: 'high',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const contradictionPatterns = [
          /(but|however|although|despite).*(must|should|need)/i,
          /(don\'t|do not).*(but|however).*(do|should)/i,
          /(avoid|exclude).*(include|add)/i
        ];
        return !contradictionPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R10 check:', error);
        return false;
      }
    },
    suggestion: 'Review for contradictions like "be brief but comprehensive" and resolve conflicts'
  }
] as const;
