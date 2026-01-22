import { Rule } from '@/types/rule';

/**
 * Category A: Clarity & Intent Rules
 * These rules ensure the prompt clearly communicates its purpose and requirements.
 */

export const clarityRules: readonly Rule[] = [
  {
    id: 'R1',
    name: 'Explicit Role Defined',
    category: 'clarity',
    description: 'Prompt should explicitly define the AI\'s role or persona',
    weight: 4,
    severity: 'high',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const rolePatterns = [
          /you are (a|an|the)?\s*\w+/i,
          /act as (a|an|the)?\s*\w+/i,
          /role:\s*\w+/i,
          /as (a|an|the)?\s*\w+/i,
          /persona:\s*\w+/i
        ];
        return rolePatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R1 check:', error);
        return false;
      }
    },
    suggestion: 'Start with "You are a [role]" or "Act as a [role]" to define the AI\'s persona'
  },

  {
    id: 'R2',
    name: 'Clear Primary Goal',
    category: 'clarity',
    description: 'Prompt should have a clear, unambiguous primary objective',
    weight: 5,
    severity: 'high',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const goalPatterns = [
          /^(create|generate|write|analyze|explain|help|build|design|review)/i,
          /(please|can you|i need you to|your task is to)/i,
          /(objective|goal|purpose):\s*\w+/i
        ];
        return goalPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R2 check:', error);
        return false;
      }
    },
    suggestion: 'Begin with a clear action verb like "Create", "Analyze", or "Help me with"'
  },

  {
    id: 'R3',
    name: 'Scope Is Explicit',
    category: 'clarity',
    description: 'Prompt should clearly define what is included and excluded',
    weight: 4,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const scopePatterns = [
          /(focus on|limit to|only|specifically|exclude|include)/i,
          /(scope|boundary|range):\s*\w+/i,
          /(within|outside|beyond)/i
        ];
        return scopePatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R3 check:', error);
        return false;
      }
    },
    suggestion: 'Add scope boundaries like "Focus on X" or "Exclude Y" to clarify limits'
  },

  {
    id: 'R4',
    name: 'Target Audience Specified',
    category: 'clarity',
    description: 'Prompt should specify the intended audience or user level',
    weight: 3,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const audiencePatterns = [
          /(beginner|intermediate|advanced|expert)/i,
          /(audience|target|for)\s*(students|developers|managers|users)/i,
          /(technical|non-technical)/i,
          /level:\s*(basic|intermediate|advanced)/i
        ];
        return audiencePatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R4 check:', error);
        return false;
      }
    },
    suggestion: 'Specify the audience level: "for beginners", "technical audience", etc.'
  },

  {
    id: 'R5',
    name: 'Ambiguous Language Avoided',
    category: 'clarity',
    description: 'Prompt should avoid vague terms and unclear references',
    weight: 4,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const ambiguousPatterns = [
          /\b(some|few|many|several|various|stuff|things|good|bad|nice|cool)\b/gi,
          /\b(it|this|that|they|them)\b(?!\s+(is|are|was|were|will|should|can|could))/gi
        ];
        const matches = ambiguousPatterns.reduce((count, pattern) => {
          const found = prompt.match(pattern);
          return count + (found ? found.length : 0);
        }, 0);
        return matches < 3; // Allow some ambiguous terms but not too many
      } catch (error) {
        console.error('Error in R5 check:', error);
        return false;
      }
    },
    suggestion: 'Replace vague terms like "some", "things", "good" with specific descriptions'
  }
] as const;
