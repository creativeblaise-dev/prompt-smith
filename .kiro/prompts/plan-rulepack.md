---
name: plan-rulepack
description: Generate TypeScript types, scoring weights, and test principles from a rules definition document
version: 1.0.0
tags: [rules, types, testing, code-generation]
---

# @plan-rulepack - Rule Pack Code Generator

## Purpose

Transform a rules definition document (like `docs/rules.md`) into production-ready TypeScript code including:

- Type definitions for rules and categories
- Rule objects with scoring weights
- Test principles and property-based test specifications
- Validation schemas

## Instructions

When this prompt is invoked:

1. **Read the Rules Document**
   - Locate and read `docs/rules.md` (or specified rules file)
   - Parse all rule definitions including:
     - Rule ID (R1-R25)
     - Category (A-E)
     - Name and description
     - Score impact (±2 to ±5)
     - Severity (Low/Medium/High)
     - Why it matters
     - Suggested fix

2. **Generate TypeScript Types**
   - Create `RuleCategory` type (union of 'A' | 'B' | 'C' | 'D' | 'E')
   - Create `Severity` type (union of 'Low' | 'Medium' | 'High')
   - Create `Rule` interface with all required fields
   - Include JSDoc comments with examples

3. **Generate Rule Objects**
   - Create one constant per rule (e.g., `R1_ExplicitRole`)
   - Include all metadata from rules.md
   - Add pattern matching logic placeholder with TODO comments
   - Organize by category in separate files

4. **Generate Scoring Configuration**
   - Extract score impacts for each rule
   - Create scoring algorithm documentation
   - Define quality tier thresholds
   - Document base score and calculation method

5. **Generate Test Principles**
   - For each rule, define:
     - Positive test cases (should pass)
     - Negative test cases (should fail)
     - Edge cases to consider
   - Define property-based test specifications:
     - Invariants that must hold
     - Input generators needed
     - Expected properties to verify

6. **Generate Validation Schemas**
   - Create Zod schemas for Rule type
   - Create schemas for analysis results
   - Include validation for score ranges
   - Add error messages

7. **Output Structure**

   ```
   Generated files:
   - src/types/rule.ts (types)
   - src/lib/rules/clarity-rules.ts (Category A)
   - src/lib/rules/context-rules.ts (Category B)
   - src/lib/rules/instruction-rules.ts (Category C)
   - src/lib/rules/format-rules.ts (Category D)
   - src/lib/rules/safety-rules.ts (Category E)
   - src/lib/rules/index.ts (exports)
   - tests/principles/rule-test-cases.md (test specs)
   ```

8. **Provide Implementation Guidance**
   - List pattern matching strategies for each rule
   - Suggest regex patterns or detection logic
   - Highlight rules that need special handling
   - Note any ambiguous rules that need clarification

## Usage

```bash
@plan-rulepack
```

Or with custom rules file:

```bash
@plan-rulepack docs/custom-rules.md
```

## Output Format

1. **Summary**: Overview of rules parsed (count by category, severity distribution)
2. **Generated Code**: Complete TypeScript files ready to use
3. **Test Specifications**: Detailed test cases and properties
4. **Implementation Notes**: Guidance for pattern matching logic

## Quality Checks

Before completing, verify:

- [ ] All rules from docs/rules.md are included
- [ ] Score impacts match the source document
- [ ] Types are strict (no `any` types)
- [ ] Each rule has test specifications
- [ ] Code follows project conventions (kebab-case files, PascalCase exports)
- [ ] JSDoc comments are comprehensive
- [ ] Zod schemas validate all constraints

## Example Output

```typescript
// src/types/rule.ts
export type RuleCategory = "A" | "B" | "C" | "D" | "E";
export type Severity = "Low" | "Medium" | "High";

/**
 * Represents a single rule in the prompt analysis system
 * @example
 * const rule: Rule = {
 *   id: 'R1',
 *   category: 'A',
 *   name: 'Explicit Role Defined',
 *   // ...
 * };
 */
export interface Rule {
  id: string;
  category: RuleCategory;
  name: string;
  description: string;
  whyItMatters: string;
  scoreImpact: number;
  severity: Severity;
  suggestedFix: string;
  check: (prompt: string) => boolean;
}

// src/lib/rules/clarity-rules.ts
/**
 * R1: Explicit Role Defined
 * Category: A (Clarity & Intent)
 * Score Impact: ±4
 * Severity: Medium
 */
export const R1_ExplicitRole: Rule = {
  id: "R1",
  category: "A",
  name: "Explicit Role Defined",
  description:
    "The prompt clearly defines the role or persona the AI should adopt",
  whyItMatters:
    "Defining a role helps the AI understand the perspective and expertise level to apply",
  scoreImpact: 4,
  severity: "Medium",
  suggestedFix:
    'Add a clear role definition at the start, e.g., "You are a senior software engineer..." or "Act as a technical writer..."',
  check: (prompt: string): boolean => {
    // TODO: Implement pattern matching
    // Suggested patterns:
    // - /you are (a|an|the)\s+\w+/i
    // - /act as (a|an|the)\s+\w+/i
    // - /assume the role of/i
    return false;
  },
};
```

## Notes

- This prompt is designed for PromptSmith's rule-based analysis system
- Generated code should be production-ready with minimal manual editing
- Pattern matching logic requires manual implementation (TODOs provided)
- Test specifications guide property-based testing implementation
