import { Finding, CategoryScore, QualityTier } from '@/types/analysis';
import { RuleCategory } from '@/types/rule';

/**
 * Scoring engine for prompt analysis results
 */

export const calculateScores = async (findings: readonly Finding[]): Promise<{
  overallScore: number;
  categoryScores: readonly CategoryScore[];
  tier: QualityTier;
}> => {
  try {
    const categoryScores = await calculateCategoryScores(findings);
    const overallScore = Math.round(
      categoryScores.reduce((sum, cat) => sum + cat.score, 0)
    );
    const tier = getQualityTier(overallScore);

    return {
      overallScore,
      categoryScores,
      tier
    };
  } catch (error) {
    console.error('Error calculating scores:', error);
    return {
      overallScore: 0,
      categoryScores: [],
      tier: 'critical'
    };
  }
};

export const calculateCategoryScores = async (findings: readonly Finding[]): Promise<readonly CategoryScore[]> => {
  try {
    const categories: RuleCategory[] = ['clarity', 'context', 'instructions', 'format', 'safety'];
    
    return categories.map(category => {
      const categoryFindings = findings.filter(f => f.category === category);
      const maxScore = categoryFindings.reduce((sum, f) => sum + getWeightForRule(f.ruleId), 0);
      const earnedScore = categoryFindings
        .filter(f => f.passed)
        .reduce((sum, f) => sum + getWeightForRule(f.ruleId), 0);
      
      const percentage = maxScore > 0 ? Math.round((earnedScore / maxScore) * 100) : 0;
      
      return {
        category,
        score: earnedScore,
        maxScore,
        percentage
      };
    });
  } catch (error) {
    console.error('Error calculating category scores:', error);
    return [];
  }
};

export const getQualityTier = (score: number): QualityTier => {
  try {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'fair';
    if (score >= 40) return 'poor';
    return 'critical';
  } catch (error) {
    console.error('Error determining quality tier:', error);
    return 'critical';
  }
};

/**
 * Helper function to get rule weight by ID
 * This maps to the weights defined in the rules
 */
const getWeightForRule = (ruleId: string): number => {
  try {
    const weights: Record<string, number> = {
      // Clarity rules
      'R1': 4, 'R2': 5, 'R3': 4, 'R4': 3, 'R5': 4,
      // Context rules  
      'R6': 5, 'R7': 4, 'R8': 3, 'R9': 3, 'R10': 5,
      // Instruction rules
      'R11': 4, 'R12': 4, 'R13': 3, 'R14': 4, 'R15': 3,
      // Format rules
      'R16': 5, 'R17': 4, 'R18': 4, 'R19': 4, 'R20': 3,
      // Safety rules
      'R21': 5, 'R22': 5, 'R23': 3, 'R24': 2, 'R25': 3
    };
    
    return weights[ruleId] || 0;
  } catch (error) {
    console.error(`Error getting weight for rule ${ruleId}:`, error);
    return 0;
  }
};
