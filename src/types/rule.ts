export type Severity = 'high' | 'medium' | 'low';

export type RuleCategory = 
  | 'clarity' 
  | 'context' 
  | 'instructions' 
  | 'format' 
  | 'safety';

export type Rule = Readonly<{
  id: string;
  name: string;
  category: RuleCategory;
  description: string;
  weight: number;
  severity: Severity;
  check: (prompt: string) => boolean;
  suggestion: string;
}>;

export type RuleCheck = (prompt: string) => boolean;
export type RuleEvaluator = (rule: Rule) => (prompt: string) => boolean;
