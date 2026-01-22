import { AnalysisResult, Finding } from '@/types/analysis';
import { Rule } from '@/types/rule';
import { getAllRules } from '@/lib/rules';
import { calculateScores } from './scorer';

/**
 * Main prompt analyzer class
 */
export class PromptAnalyzer {
  private rules: readonly Rule[];

  constructor() {
    this.rules = getAllRules();
  }

  /**
   * Analyze a prompt against all rules
   */
  async analyze(prompt: string): Promise<AnalysisResult> {
    try {
      if (!prompt || typeof prompt !== 'string') {
        throw new Error('Invalid prompt: must be a non-empty string');
      }

      const findings = await this.evaluateRules(prompt);
      const { overallScore, categoryScores, tier } = await calculateScores(findings);
      const maxScore = this.rules.reduce((sum, rule) => sum + rule.weight, 0);

      return {
        overallScore,
        maxScore,
        percentage: Math.round((overallScore / maxScore) * 100),
        tier,
        categoryScores,
        findings,
        prompt,
        analyzedAt: new Date()
      };
    } catch (error) {
      console.error('Error analyzing prompt:', error);
      throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Evaluate all rules against the prompt
   */
  private async evaluateRules(prompt: string): Promise<readonly Finding[]> {
    try {
      const findings: Finding[] = [];
      
      for (const rule of this.rules) {
        try {
          const finding = await this.evaluateRule(rule, prompt);
          findings.push(finding);
        } catch (error) {
          console.error(`Error evaluating rule ${rule.id}:`, error);
          findings.push({
            ruleId: rule.id,
            ruleName: rule.name,
            category: rule.category,
            severity: rule.severity,
            message: `Rule evaluation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            suggestion: rule.suggestion,
            passed: false
          });
        }
      }

      return findings;
    } catch (error) {
      console.error('Error evaluating rules:', error);
      throw new Error('Failed to evaluate rules');
    }
  }

  /**
   * Evaluate a single rule against the prompt
   */
  private async evaluateRule(rule: Rule, prompt: string): Promise<Finding> {
    try {
      const passed = await rule.check(prompt);
      const message = passed 
        ? `✓ ${rule.name}: Requirement met`
        : `✗ ${rule.name}: ${rule.description}`;

      return {
        ruleId: rule.id,
        ruleName: rule.name,
        category: rule.category,
        severity: rule.severity,
        message,
        suggestion: rule.suggestion,
        passed
      };
    } catch (error) {
      console.error(`Error in rule ${rule.id} evaluation:`, error);
      throw new Error(`Rule ${rule.id} evaluation failed`);
    }
  }
}
