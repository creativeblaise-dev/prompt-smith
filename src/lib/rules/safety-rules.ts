import { Rule } from '@/types/rule';

/**
 * Category E: Safety, Privacy & Robustness Rules
 * These rules ensure the prompt follows safety guidelines and best practices.
 */

export const safetyRules: readonly Rule[] = [
  {
    id: 'R21',
    name: 'Sensitive Data Avoided',
    category: 'safety',
    description: 'Prompt should not contain or request sensitive personal information',
    weight: 5,
    severity: 'high',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const sensitivePatterns = [
          /(password|ssn|social security|credit card)/i,
          /(personal.*information|private.*data)/i,
          /(phone.*number|address|email.*address)/i,
          /(api.*key|secret|token)/i
        ];
        return !sensitivePatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R21 check:', error);
        return false;
      }
    },
    suggestion: 'Remove or replace sensitive data with placeholders like [EMAIL], [PHONE], etc.'
  },

  {
    id: 'R22',
    name: 'Ethical or Harmful Requests Avoided',
    category: 'safety',
    description: 'Prompt should not request harmful, illegal, or unethical content',
    weight: 5,
    severity: 'high',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const harmfulPatterns = [
          /(hack|exploit|illegal|harmful)/i,
          /(violence|weapon|drug)/i,
          /(discriminat|bias|hate)/i,
          /(manipulat|deceiv|fraud)/i
        ];
        return !harmfulPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R22 check:', error);
        return false;
      }
    },
    suggestion: 'Ensure requests are ethical and legal. Avoid harmful or discriminatory content.'
  },

  {
    id: 'R23',
    name: 'Tool or Capability Limits Acknowledged',
    category: 'safety',
    description: 'Prompt should acknowledge AI limitations and capabilities',
    weight: 3,
    severity: 'medium',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const limitPatterns = [
          /(limitation|cannot|unable)/i,
          /(within.*capabilities|best.*effort)/i,
          /(if.*possible|try to)/i,
          /\*\*limitations\*\*/i
        ];
        return limitPatterns.some(pattern => pattern.test(prompt));
      } catch (error) {
        console.error('Error in R23 check:', error);
        return false;
      }
    },
    suggestion: 'Acknowledge limits: "If possible", "Within your capabilities", "Try to..."'
  },

  {
    id: 'R24',
    name: 'Over-Specification Avoided',
    category: 'safety',
    description: 'Prompt should not be overly complex or contradictory',
    weight: 2,
    severity: 'low',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const wordCount = prompt.split(/\s+/).length;
        const sentenceCount = prompt.split(/[.!?]+/).length;
        const avgWordsPerSentence = wordCount / sentenceCount;
        
        // Flag if too complex (very long sentences or too many requirements)
        const tooComplex = avgWordsPerSentence > 30 || wordCount > 1000;
        const tooManyRequirements = (prompt.match(/\b(must|should|need|require)\b/gi) || []).length > 10;
        
        return !tooComplex && !tooManyRequirements;
      } catch (error) {
        console.error('Error in R24 check:', error);
        return false;
      }
    },
    suggestion: 'Simplify complex prompts. Break into shorter sentences and fewer requirements.'
  },

  {
    id: 'R25',
    name: 'Prompt Is Reusable',
    category: 'safety',
    description: 'Prompt should be generic enough to work with different inputs',
    weight: 3,
    severity: 'low',
    check: async (prompt: string): Promise<boolean> => {
      try {
        const reusabilityPatterns = [
          /\[.*\]/, // Placeholders
          /\{.*\}/, // Variables
          /(input|data|information|content)/i,
          /(given|provided|supplied)/i
        ];
        const hasSpecificNames = /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/.test(prompt); // Proper names
        const hasSpecificDates = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/.test(prompt); // Specific dates
        
        return reusabilityPatterns.some(pattern => pattern.test(prompt)) && !hasSpecificNames && !hasSpecificDates;
      } catch (error) {
        console.error('Error in R25 check:', error);
        return false;
      }
    },
    suggestion: 'Use placeholders [INPUT] or variables {data} instead of specific names/dates'
  }
] as const;
