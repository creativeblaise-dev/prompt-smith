import { Rule, RuleCategory } from '@/types/rule';
import { clarityRules } from './clarity-rules';
import { contextRules } from './context-rules';
import { instructionRules } from './instruction-rules';
import { formatRules } from './format-rules';
import { safetyRules } from './safety-rules';

/**
 * Central registry of all prompt analysis rules
 */

export const getAllRules = (): readonly Rule[] => {
  try {
    return [
      ...clarityRules,
      ...contextRules,
      ...instructionRules,
      ...formatRules,
      ...safetyRules
    ] as const;
  } catch (error) {
    console.error('Error getting all rules:', error);
    return [];
  }
};

export const getRulesByCategory = async (category: RuleCategory): Promise<readonly Rule[]> => {
  try {
    const allRules = getAllRules();
    return allRules.filter(rule => rule.category === category);
  } catch (error) {
    console.error(`Error getting rules for category ${category}:`, error);
    return [];
  }
};

export const getRuleById = async (id: string): Promise<Rule | undefined> => {
  try {
    const allRules = getAllRules();
    return allRules.find(rule => rule.id === id);
  } catch (error) {
    console.error(`Error getting rule ${id}:`, error);
    return undefined;
  }
};

export const getTotalPossibleScore = (): number => {
  try {
    const allRules = getAllRules();
    return allRules.reduce((total, rule) => total + rule.weight, 0);
  } catch (error) {
    console.error('Error calculating total possible score:', error);
    return 100; // Fallback to expected total
  }
};

// Export individual rule categories for direct access
export {
  clarityRules,
  contextRules,
  instructionRules,
  formatRules,
  safetyRules
};
