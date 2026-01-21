# Design: Rule Engine and Prompt Analysis System

**Feature**: Core rule-based prompt analysis engine
**Status**: Design Phase
**Last Updated**: 2026-01-21

---

## 1. Architecture Overview

### 1.1 System Components

```
┌─────────────────────────────────────────────────────────┐
│                    API Layer                             │
│              /api/analyze/route.ts                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 Analysis Engine                          │
│              lib/engine/analyzer.ts                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Rule       │  │   Pattern    │  │   Scoring    │ │
│  │  Evaluator   │  │   Matcher    │  │   Engine     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Rule Definitions                        │
│                  lib/rules/*.ts                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Clarity  │ │ Context  │ │ Instruct │ │  Format  │  │
│  │  Rules   │ │  Rules   │ │  Rules   │ │  Rules   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Data Flow

1. **Input**: User prompt (string) via API endpoint
2. **Validation**: Zod schema validates input structure
3. **Analysis**: Analyzer evaluates prompt against all 25 rules
4. **Pattern Matching**: Each rule runs pattern detection logic
5. **Scoring**: Score calculator computes overall and category scores
6. **Finding Generation**: Failed rules generate actionable findings
7. **Output**: Structured AnalysisResult returned to client

---

## 2. Type System Design

### 2.1 Core Types

```typescript
// types/rule.ts
export type RuleCategory = "A" | "B" | "C" | "D" | "E";
export type Severity = "Low" | "Medium" | "High";

export interface Rule {
  id: string; // R1-R25
  category: RuleCategory;
  name: string;
  description: string;
  whyItMatters: string;
  scoreImpact: number; // ±2 to ±5
  severity: Severity;
  suggestedFix: string;
  check: (prompt: string) => boolean;
}

// types/analysis.ts
export interface Finding {
  ruleId: string;
  ruleName: string;
  category: RuleCategory;
  severity: Severity;
  passed: boolean;
  message: string;
  suggestedFix: string;
  scoreImpact: number;
  location?: {
    start: number;
    end: number;
  };
}

export interface CategoryScore {
  category: RuleCategory;
  score: number;
  maxScore: number;
  rulesPassed: number;
  totalRules: number;
}

export interface AnalysisResult {
  promptId: string;
  timestamp: number;
  originalPrompt: string;
  overallScore: number;
  qualityTier: "Excellent" | "Good" | "Fair" | "Poor" | "Critical";
  categoryScores: Record<RuleCategory, CategoryScore>;
  findings: Finding[];
  summary: {
    totalRules: number;
    rulesPassed: number;
    rulesFailed: number;
    highSeverityIssues: number;
    mediumSeverityIssues: number;
    lowSeverityIssues: number;
  };
}
```

### 2.2 Zod Schemas

```typescript
// lib/schemas/prompt.ts
import { z } from "zod";

export const PromptInputSchema = z.object({
  prompt: z
    .string()
    .min(1, "Prompt cannot be empty")
    .max(10000, "Prompt exceeds maximum length of 10,000 characters"),
  options: z
    .object({
      includePassedRules: z.boolean().optional().default(false),
    })
    .optional(),
});

export type PromptInput = z.infer<typeof PromptInputSchema>;

// lib/schemas/analysis.ts
export const FindingSchema = z.object({
  ruleId: z.string(),
  ruleName: z.string(),
  category: z.enum(["A", "B", "C", "D", "E"]),
  severity: z.enum(["Low", "Medium", "High"]),
  passed: z.boolean(),
  message: z.string(),
  suggestedFix: z.string(),
  scoreImpact: z.number().int().min(-5).max(5),
  location: z
    .object({
      start: z.number().int().nonnegative(),
      end: z.number().int().nonnegative(),
    })
    .optional(),
});

export const AnalysisResultSchema = z.object({
  promptId: z.string().uuid(),
  timestamp: z.number().int().positive(),
  originalPrompt: z.string(),
  overallScore: z.number().int().min(0).max(100),
  qualityTier: z.enum(["Excellent", "Good", "Fair", "Poor", "Critical"]),
  categoryScores: z.record(
    z.enum(["A", "B", "C", "D", "E"]),
    z.object({
      category: z.enum(["A", "B", "C", "D", "E"]),
      score: z.number().int().min(0).max(100),
      maxScore: z.number().int().positive(),
      rulesPassed: z.number().int().nonnegative(),
      totalRules: z.number().int().positive(),
    }),
  ),
  findings: z.array(FindingSchema),
  summary: z.object({
    totalRules: z.number().int().positive(),
    rulesPassed: z.number().int().nonnegative(),
    rulesFailed: z.number().int().nonnegative(),
    highSeverityIssues: z.number().int().nonnegative(),
    mediumSeverityIssues: z.number().int().nonnegative(),
    lowSeverityIssues: z.number().int().nonnegative(),
  }),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
```

---

## 3. Rule Definition System

### 3.1 Rule Organization

Rules are organized into 5 category files:

- `lib/rules/clarity-rules.ts` - Category A (R1-R5)
- `lib/rules/context-rules.ts` - Category B (R6-R10)
- `lib/rules/instruction-rules.ts` - Category C (R11-R15)
- `lib/rules/format-rules.ts` - Category D (R16-R20)
- `lib/rules/safety-rules.ts` - Category E (R21-R25)
- `lib/rules/index.ts` - Exports all rules as a single collection

### 3.2 Rule Implementation Pattern

Each rule follows this structure:

```typescript
// Example: R1 - Explicit Role Defined
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
    const rolePatterns = [
      /you are (a|an|the)\s+\w+/i,
      /act as (a|an|the)\s+\w+/i,
      /assume the role of/i,
      /as (a|an)\s+\w+,/i,
      /your role is/i,
    ];
    return rolePatterns.some((pattern) => pattern.test(prompt));
  },
};
```

### 3.3 Pattern Matching Strategies

Different rule types use different pattern matching approaches:

**Keyword Detection** (R1, R2, R4):

- Use regex patterns to detect specific phrases
- Case-insensitive matching
- Multiple pattern alternatives

**Structural Analysis** (R11, R16, R17):

- Detect numbered lists, bullet points
- Identify markdown formatting
- Check for section headers

**Content Analysis** (R5, R21, R22):

- Scan for ambiguous terms ("maybe", "possibly", "somewhat")
- Detect sensitive data patterns (API keys, emails, passwords)
- Flag potentially harmful content

**Presence/Absence Checks** (R6, R7, R18):

- Verify background information exists
- Check for input/output examples
- Ensure constraints are mentioned

---

## 4. Analysis Engine Design

### 4.1 Analyzer Component

```typescript
// lib/engine/analyzer.ts

export class PromptAnalyzer {
  private rules: Rule[];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  /**
   * Analyzes a prompt against all rules
   * @param prompt - The prompt text to analyze
   * @returns Complete analysis result with score and findings
   */
  public analyze(prompt: string): AnalysisResult {
    const promptId = crypto.randomUUID();
    const timestamp = Date.now();

    // Evaluate all rules
    const findings = this.evaluateRules(prompt);

    // Calculate scores
    const { overallScore, categoryScores } = this.calculateScores(findings);

    // Determine quality tier
    const qualityTier = this.getQualityTier(overallScore);

    // Generate summary
    const summary = this.generateSummary(findings);

    return {
      promptId,
      timestamp,
      originalPrompt: prompt,
      overallScore,
      qualityTier,
      categoryScores,
      findings,
      summary,
    };
  }

  private evaluateRules(prompt: string): Finding[] {
    return this.rules.map((rule) => this.evaluateRule(rule, prompt));
  }

  private evaluateRule(rule: Rule, prompt: string): Finding {
    const passed = rule.check(prompt);

    return {
      ruleId: rule.id,
      ruleName: rule.name,
      category: rule.category,
      severity: rule.severity,
      passed,
      message: passed ? `✓ ${rule.name}` : `✗ ${rule.description}`,
      suggestedFix: rule.suggestedFix,
      scoreImpact: rule.scoreImpact,
    };
  }

  private calculateScores(findings: Finding[]): {
    overallScore: number;
    categoryScores: Record<RuleCategory, CategoryScore>;
  } {
    // Implementation in scorer.ts
    return calculateScores(findings);
  }

  private getQualityTier(score: number): QualityTier {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 40) return "Poor";
    return "Critical";
  }

  private generateSummary(findings: Finding[]): AnalysisSummary {
    return {
      totalRules: findings.length,
      rulesPassed: findings.filter((f) => f.passed).length,
      rulesFailed: findings.filter((f) => !f.passed).length,
      highSeverityIssues: findings.filter(
        (f) => !f.passed && f.severity === "High",
      ).length,
      mediumSeverityIssues: findings.filter(
        (f) => !f.passed && f.severity === "Medium",
      ).length,
      lowSeverityIssues: findings.filter(
        (f) => !f.passed && f.severity === "Low",
      ).length,
    };
  }
}
```

### 4.2 Scoring Engine

```typescript
// lib/engine/scorer.ts

export interface ScoreCalculation {
  overallScore: number;
  categoryScores: Record<RuleCategory, CategoryScore>;
}

/**
 * Calculates overall and category-level scores from findings
 *
 * Algorithm:
 * 1. Start with base score of 50
 * 2. For each rule: add scoreImpact if passed, subtract if failed
 * 3. Clamp final score between 0-100
 * 4. Calculate category scores independently
 */
export function calculateScores(findings: Finding[]): ScoreCalculation {
  const BASE_SCORE = 50;

  // Calculate overall score
  let overallScore = BASE_SCORE;
  for (const finding of findings) {
    if (finding.passed) {
      overallScore += finding.scoreImpact;
    } else {
      overallScore -= finding.scoreImpact;
    }
  }

  // Clamp between 0-100
  overallScore = Math.max(0, Math.min(100, overallScore));

  // Calculate category scores
  const categoryScores = calculateCategoryScores(findings);

  return { overallScore, categoryScores };
}

function calculateCategoryScores(
  findings: Finding[],
): Record<RuleCategory, CategoryScore> {
  const categories: RuleCategory[] = ["A", "B", "C", "D", "E"];
  const scores: Record<RuleCategory, CategoryScore> = {} as any;

  for (const category of categories) {
    const categoryFindings = findings.filter((f) => f.category === category);
    const totalRules = categoryFindings.length;
    const rulesPassed = categoryFindings.filter((f) => f.passed).length;

    // Calculate max possible score for this category
    const maxScore = categoryFindings.reduce(
      (sum, f) => sum + f.scoreImpact,
      0,
    );

    // Calculate actual score (base 50 + impacts)
    let score = 50;
    for (const finding of categoryFindings) {
      score += finding.passed ? finding.scoreImpact : -finding.scoreImpact;
    }
    score = Math.max(0, Math.min(100, score));

    scores[category] = {
      category,
      score,
      maxScore,
      rulesPassed,
      totalRules,
    };
  }

  return scores;
}
```

---

## 5. API Design

### 5.1 Analyze Endpoint

```typescript
// src/app/api/analyze/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PromptInputSchema } from "@/lib/schemas/prompt";
import { PromptAnalyzer } from "@/lib/engine/analyzer";
import { getAllRules } from "@/lib/rules";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedInput = PromptInputSchema.parse(body);

    // Initialize analyzer with all rules
    const rules = getAllRules();
    const analyzer = new PromptAnalyzer(rules);

    // Analyze the prompt
    const result = analyzer.analyze(validatedInput.prompt);

    // Filter out passed rules if not requested
    if (!validatedInput.options?.includePassedRules) {
      result.findings = result.findings.filter((f) => !f.passed);
    }

    // Validate output
    const validatedResult = AnalysisResultSchema.parse(result);

    return NextResponse.json(validatedResult, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 },
      );
    }

    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### 5.2 API Request/Response Examples

**Request:**

```json
{
  "prompt": "Write a function to validate emails",
  "options": {
    "includePassedRules": false
  }
}
```

**Response:**

```json
{
  "promptId": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": 1705852800000,
  "originalPrompt": "Write a function to validate emails",
  "overallScore": 42,
  "qualityTier": "Poor",
  "categoryScores": {
    "A": {
      "category": "A",
      "score": 35,
      "maxScore": 20,
      "rulesPassed": 1,
      "totalRules": 5
    },
    "B": {
      "category": "B",
      "score": 40,
      "maxScore": 20,
      "rulesPassed": 0,
      "totalRules": 5
    },
    "C": {
      "category": "C",
      "score": 45,
      "maxScore": 18,
      "rulesPassed": 2,
      "totalRules": 5
    },
    "D": {
      "category": "D",
      "score": 30,
      "maxScore": 20,
      "rulesPassed": 0,
      "totalRules": 5
    },
    "E": {
      "category": "E",
      "score": 60,
      "maxScore": 16,
      "rulesPassed": 4,
      "totalRules": 5
    }
  },
  "findings": [
    {
      "ruleId": "R1",
      "ruleName": "Explicit Role Defined",
      "category": "A",
      "severity": "Medium",
      "passed": false,
      "message": "✗ The prompt should clearly define the role or persona",
      "suggestedFix": "Add a clear role definition at the start, e.g., 'You are a senior software engineer...'",
      "scoreImpact": 4
    }
  ],
  "summary": {
    "totalRules": 25,
    "rulesPassed": 7,
    "rulesFailed": 18,
    "highSeverityIssues": 6,
    "mediumSeverityIssues": 8,
    "lowSeverityIssues": 4
  }
}
```

---

## 6. Implementation Strategy

### 6.1 Development Phases

**Phase 1: Foundation (2-3 hours)**

- Set up type definitions
- Create Zod schemas
- Implement basic Rule interface
- Create test fixtures

**Phase 2: Rule Definitions (3-4 hours)**

- Implement all 25 rules across 5 categories
- Write pattern matching logic for each rule
- Test individual rule accuracy
- Document rule rationale

**Phase 3: Analysis Engine (2-3 hours)**

- Implement PromptAnalyzer class
- Implement scoring engine
- Create finding generator
- Add error handling

**Phase 4: API Integration (1-2 hours)**

- Create /api/analyze endpoint
- Add request/response validation
- Implement error handling
- Test end-to-end flow

**Phase 5: Testing & Optimization (1-2 hours)**

- Write unit tests for rules
- Test scoring accuracy
- Performance optimization
- Documentation

### 6.2 File Structure

```
src/
├── types/
│   ├── rule.ts              # Rule, RuleCategory, Severity types
│   └── analysis.ts          # Finding, AnalysisResult types
├── lib/
│   ├── schemas/
│   │   ├── prompt.ts        # PromptInputSchema
│   │   └── analysis.ts      # AnalysisResultSchema, FindingSchema
│   ├── rules/
│   │   ├── clarity-rules.ts # R1-R5
│   │   ├── context-rules.ts # R6-R10
│   │   ├── instruction-rules.ts # R11-R15
│   │   ├── format-rules.ts  # R16-R20
│   │   ├── safety-rules.ts  # R21-R25
│   │   └── index.ts         # Export all rules
│   └── engine/
│       ├── analyzer.ts      # PromptAnalyzer class
│       └── scorer.ts        # Score calculation logic
└── app/
    └── api/
        └── analyze/
            └── route.ts     # POST /api/analyze endpoint
```

---

## 7. Correctness Properties

### 7.1 Property-Based Testing Framework

We will use **fast-check** (JavaScript/TypeScript property-based testing library) to validate correctness properties.

Installation:

```bash
npm install --save-dev fast-check @types/fast-check
```

### 7.2 Core Correctness Properties

#### Property 1: Score Bounds

**Validates: Requirements 1.3, FR-3.1**

The overall score must always be between 0 and 100, regardless of input.

```typescript
// Test: Overall score is always within valid range [0, 100]
import * as fc from "fast-check";

fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
  const result = analyzer.analyze(prompt);
  return result.overallScore >= 0 && result.overallScore <= 100;
});
```

#### Property 2: Finding Count Consistency

**Validates: Requirements 1.2, FR-4**

The number of findings must equal the total number of rules (25), and passed + failed must equal total.

```typescript
// Test: Finding count consistency
fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
  const result = analyzer.analyze(prompt);
  const totalFindings = result.findings.length;
  const passed = result.summary.rulesPassed;
  const failed = result.summary.rulesFailed;

  return totalFindings === 25 && passed + failed === 25;
});
```

#### Property 3: Score Calculation Correctness

**Validates: Requirements 1.3, FR-3.1**

The overall score must equal base score (50) plus sum of impacts from passed rules minus sum of impacts from failed rules, clamped to [0, 100].

```typescript
// Test: Score calculation matches algorithm
fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
  const result = analyzer.analyze(prompt);

  let expectedScore = 50;
  for (const finding of result.findings) {
    if (finding.passed) {
      expectedScore += finding.scoreImpact;
    } else {
      expectedScore -= finding.scoreImpact;
    }
  }
  expectedScore = Math.max(0, Math.min(100, expectedScore));

  return result.overallScore === expectedScore;
});
```

#### Property 4: Quality Tier Consistency

**Validates: Requirements 1.3, FR-3.2**

The quality tier must match the score range.

```typescript
// Test: Quality tier matches score range
fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
  const result = analyzer.analyze(prompt);
  const score = result.overallScore;
  const tier = result.qualityTier;

  if (score >= 90) return tier === "Excellent";
  if (score >= 75) return tier === "Good";
  if (score >= 60) return tier === "Fair";
  if (score >= 40) return tier === "Poor";
  return tier === "Critical";
});
```

#### Property 5: Category Score Independence

**Validates: Requirements 1.3, FR-3.3**

Each category score must be calculated independently and only consider rules from that category.

```typescript
// Test: Category scores only depend on their own rules
fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
  const result = analyzer.analyze(prompt);

  for (const category of ["A", "B", "C", "D", "E"] as RuleCategory[]) {
    const categoryScore = result.categoryScores[category];
    const categoryFindings = result.findings.filter(
      (f) => f.category === category,
    );

    // Verify count matches
    if (categoryScore.totalRules !== categoryFindings.length) return false;
    if (
      categoryScore.rulesPassed !==
      categoryFindings.filter((f) => f.passed).length
    )
      return false;
  }

  return true;
});
```

#### Property 6: Severity Classification Consistency

**Validates: Requirements 1.4, FR-4.2**

The summary severity counts must match the actual findings.

```typescript
// Test: Severity counts match findings
fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
  const result = analyzer.analyze(prompt);

  const highCount = result.findings.filter(
    (f) => !f.passed && f.severity === "High",
  ).length;
  const mediumCount = result.findings.filter(
    (f) => !f.passed && f.severity === "Medium",
  ).length;
  const lowCount = result.findings.filter(
    (f) => !f.passed && f.severity === "Low",
  ).length;

  return (
    result.summary.highSeverityIssues === highCount &&
    result.summary.mediumSeverityIssues === mediumCount &&
    result.summary.lowSeverityIssues === lowCount
  );
});
```

#### Property 7: Idempotence

**Validates: Requirements 1.2, NFR-3**

Analyzing the same prompt multiple times should produce the same results (excluding timestamp and promptId).

```typescript
// Test: Analysis is deterministic
fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
  const result1 = analyzer.analyze(prompt);
  const result2 = analyzer.analyze(prompt);

  // Scores should be identical
  if (result1.overallScore !== result2.overallScore) return false;
  if (result1.qualityTier !== result2.qualityTier) return false;

  // Findings should be identical (excluding order)
  if (result1.findings.length !== result2.findings.length) return false;

  return true;
});
```

#### Property 8: Schema Validation

**Validates: Requirements 1.5, NFR-4**

All analysis results must pass Zod schema validation.

```typescript
// Test: Output always validates against schema
fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
  const result = analyzer.analyze(prompt);

  try {
    AnalysisResultSchema.parse(result);
    return true;
  } catch {
    return false;
  }
});
```

### 7.3 Property Test Organization

```typescript
// tests/properties/analyzer.properties.test.ts

import * as fc from "fast-check";
import { describe, it, expect } from "vitest";
import { PromptAnalyzer } from "@/lib/engine/analyzer";
import { getAllRules } from "@/lib/rules";
import { AnalysisResultSchema } from "@/lib/schemas/analysis";

describe("PromptAnalyzer - Correctness Properties", () => {
  const analyzer = new PromptAnalyzer(getAllRules());

  it("Property 1: Overall score is always within [0, 100]", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
        const result = analyzer.analyze(prompt);
        return result.overallScore >= 0 && result.overallScore <= 100;
      }),
      { numRuns: 1000 },
    );
  });

  it("Property 2: Finding count equals total rules (25)", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
        const result = analyzer.analyze(prompt);
        return (
          result.findings.length === 25 &&
          result.summary.rulesPassed + result.summary.rulesFailed === 25
        );
      }),
      { numRuns: 1000 },
    );
  });

  it("Property 3: Score calculation matches algorithm", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
        const result = analyzer.analyze(prompt);

        let expectedScore = 50;
        for (const finding of result.findings) {
          expectedScore += finding.passed
            ? finding.scoreImpact
            : -finding.scoreImpact;
        }
        expectedScore = Math.max(0, Math.min(100, expectedScore));

        return result.overallScore === expectedScore;
      }),
      { numRuns: 1000 },
    );
  });

  it("Property 4: Quality tier matches score range", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
        const result = analyzer.analyze(prompt);
        const score = result.overallScore;
        const tier = result.qualityTier;

        if (score >= 90) return tier === "Excellent";
        if (score >= 75) return tier === "Good";
        if (score >= 60) return tier === "Fair";
        if (score >= 40) return tier === "Poor";
        return tier === "Critical";
      }),
      { numRuns: 1000 },
    );
  });

  it("Property 5: Category scores are independent", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
        const result = analyzer.analyze(prompt);

        for (const category of ["A", "B", "C", "D", "E"] as const) {
          const categoryScore = result.categoryScores[category];
          const categoryFindings = result.findings.filter(
            (f) => f.category === category,
          );

          if (categoryScore.totalRules !== categoryFindings.length)
            return false;
          if (
            categoryScore.rulesPassed !==
            categoryFindings.filter((f) => f.passed).length
          )
            return false;
        }

        return true;
      }),
      { numRuns: 1000 },
    );
  });

  it("Property 6: Severity counts match findings", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
        const result = analyzer.analyze(prompt);

        const highCount = result.findings.filter(
          (f) => !f.passed && f.severity === "High",
        ).length;
        const mediumCount = result.findings.filter(
          (f) => !f.passed && f.severity === "Medium",
        ).length;
        const lowCount = result.findings.filter(
          (f) => !f.passed && f.severity === "Low",
        ).length;

        return (
          result.summary.highSeverityIssues === highCount &&
          result.summary.mediumSeverityIssues === mediumCount &&
          result.summary.lowSeverityIssues === lowCount
        );
      }),
      { numRuns: 1000 },
    );
  });

  it("Property 7: Analysis is idempotent", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
        const result1 = analyzer.analyze(prompt);
        const result2 = analyzer.analyze(prompt);

        return (
          result1.overallScore === result2.overallScore &&
          result1.qualityTier === result2.qualityTier &&
          result1.findings.length === result2.findings.length
        );
      }),
      { numRuns: 1000 },
    );
  });

  it("Property 8: Output validates against schema", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 10000 }), (prompt) => {
        const result = analyzer.analyze(prompt);

        try {
          AnalysisResultSchema.parse(result);
          return true;
        } catch {
          return false;
        }
      }),
      { numRuns: 1000 },
    );
  });
});
```

---

## 8. Error Handling Strategy

### 8.1 Input Validation Errors

```typescript
// Invalid prompt length
{
  "error": "Invalid input",
  "details": [
    {
      "code": "too_small",
      "minimum": 1,
      "path": ["prompt"],
      "message": "Prompt cannot be empty"
    }
  ]
}

// Prompt too long
{
  "error": "Invalid input",
  "details": [
    {
      "code": "too_big",
      "maximum": 10000,
      "path": ["prompt"],
      "message": "Prompt exceeds maximum length of 10,000 characters"
    }
  ]
}
```

### 8.2 Rule Evaluation Errors

If a rule's check function throws an error:

- Log the error with rule ID and prompt excerpt
- Mark the rule as failed (conservative approach)
- Continue evaluating other rules
- Include error in response metadata (optional)

```typescript
private evaluateRule(rule: Rule, prompt: string): Finding {
  try {
    const passed = rule.check(prompt);
    return this.createFinding(rule, passed);
  } catch (error) {
    console.error(`Rule ${rule.id} evaluation failed:`, error);
    // Conservative: treat as failed
    return this.createFinding(rule, false);
  }
}
```

### 8.3 API Error Responses

```typescript
// 400 Bad Request - Invalid input
{
  "error": "Invalid input",
  "details": [...zodErrors]
}

// 500 Internal Server Error - Unexpected error
{
  "error": "Internal server error",
  "message": "An unexpected error occurred during analysis"
}
```

---

## 9. Performance Considerations

### 9.1 Performance Requirements

- Analysis must complete in < 1 second for prompts up to 10,000 characters
- Pattern matching must be efficient (no exponential regex)
- Rule evaluation should be parallelizable where possible

### 9.2 Optimization Strategies

**Efficient Regex Patterns:**

- Avoid backtracking (use atomic groups where possible)
- Use non-capturing groups `(?:...)` instead of capturing groups
- Limit quantifier scope
- Test regex performance with long inputs

**Early Termination:**

- For rules that check presence, stop on first match
- Use `some()` instead of `filter().length > 0`

**Lazy Evaluation:**

- Don't compute category scores until needed
- Cache rule results if analyzing same prompt multiple times

**Parallel Evaluation (Future):**

- Rules are independent and can be evaluated in parallel
- Use Web Workers or worker threads for large-scale analysis

### 9.3 Performance Testing

```typescript
// tests/performance/analyzer.perf.test.ts

describe("Performance Tests", () => {
  it("should analyze 1000-char prompt in < 100ms", () => {
    const prompt = "a".repeat(1000);
    const start = performance.now();
    analyzer.analyze(prompt);
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100);
  });

  it("should analyze 10000-char prompt in < 1000ms", () => {
    const prompt = "a".repeat(10000);
    const start = performance.now();
    analyzer.analyze(prompt);
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(1000);
  });
});
```

---

## 10. Testing Strategy

### 10.1 Unit Tests

**Rule Tests** (`tests/rules/*.test.ts`):

- Test each rule individually
- Verify pattern matching accuracy
- Test edge cases (empty string, very long string, special characters)
- Verify rule metadata (id, category, severity, scoreImpact)

**Scorer Tests** (`tests/engine/scorer.test.ts`):

- Test score calculation algorithm
- Test clamping behavior (0-100)
- Test category score calculation
- Test quality tier assignment

**Analyzer Tests** (`tests/engine/analyzer.test.ts`):

- Test end-to-end analysis flow
- Test finding generation
- Test summary calculation
- Test error handling

### 10.2 Property-Based Tests

**Correctness Properties** (`tests/properties/analyzer.properties.test.ts`):

- All 8 properties defined in section 7.2
- Run with 1000+ random inputs
- Verify invariants hold across all inputs

### 10.3 Integration Tests

**API Tests** (`tests/api/analyze.test.ts`):

- Test POST /api/analyze endpoint
- Test request validation
- Test response format
- Test error responses
- Test with real-world prompts

### 10.4 Example-Based Tests

**Known Prompts** (`tests/examples/*.test.ts`):

- Test with well-structured prompts (should score high)
- Test with poorly-structured prompts (should score low)
- Test with edge cases (empty, minimal, very long)
- Verify specific rules pass/fail as expected

```typescript
// tests/examples/good-prompt.test.ts

describe("Well-Structured Prompt Analysis", () => {
  it("should score high for MPF-formatted prompt", () => {
    const prompt = `
**ASK**
Generate a Python function that validates email addresses

**CONTEXT**
- Function will be used in user registration system
- Must handle international email formats

**CONSTRAINTS**
- Return boolean value (True/False)
- Include inline comments
- No external dependencies

**EXAMPLE**
Input: "user@example.com"
Output: True
    `;

    const result = analyzer.analyze(prompt);

    expect(result.overallScore).toBeGreaterThan(75);
    expect(result.qualityTier).toMatch(/Good|Excellent/);
    expect(result.summary.rulesPassed).toBeGreaterThan(15);
  });
});
```

---

## 11. Design Decisions & Rationale

### 11.1 Why Class-Based Analyzer?

**Decision**: Use a class (`PromptAnalyzer`) instead of pure functions.

**Rationale**:

- Encapsulates rules and configuration
- Easier to test (can inject mock rules)
- Allows for future state management (caching, metrics)
- Clear separation of concerns

### 11.2 Why Separate Scorer Module?

**Decision**: Extract scoring logic into separate `scorer.ts` module.

**Rationale**:

- Scoring algorithm is complex and deserves its own module
- Easier to test in isolation
- Can be reused by other components
- Follows single responsibility principle

### 11.3 Why Zod for Validation?

**Decision**: Use Zod for all input/output validation.

**Rationale**:

- Type-safe schema validation
- Automatic TypeScript type inference
- Clear error messages
- Runtime validation ensures data integrity
- Aligns with project requirements (NFR-4)

### 11.4 Why Pattern Matching Over ML?

**Decision**: Use regex/pattern matching instead of ML models.

**Rationale**:

- Deterministic and explainable
- No training data required
- Fast and lightweight
- Easier to debug and maintain
- Meets performance requirements (< 1 second)
- Aligns with technical constraints (TC-3)

### 11.5 Why Base Score of 50?

**Decision**: Start with base score of 50, not 0.

**Rationale**:

- Allows for both positive and negative impacts
- More intuitive scoring (50 = neutral, not terrible)
- Matches common grading systems
- Provides better score distribution

### 11.6 Why Include Passed Rules Option?

**Decision**: Allow filtering out passed rules from response.

**Rationale**:

- Reduces response size for large prompts
- Focuses user attention on issues
- Optional: users can still see all rules if needed
- Improves UI performance

---

## 12. Future Enhancements

### 12.1 Potential Improvements (Post-MVP)

**Custom Rule Weights:**

- Allow users to adjust rule importance
- Personalized scoring based on use case
- Save weight preferences

**Rule Disabling:**

- Let users disable specific rules
- Useful for domain-specific prompts
- Maintain score calculation integrity

**Location Tracking:**

- Identify exact position of issues in prompt
- Highlight problematic sections in UI
- Provide inline suggestions

**Batch Analysis:**

- Analyze multiple prompts at once
- Compare prompts side-by-side
- Aggregate statistics

**Rule Explanations:**

- Detailed explanations for why rules passed
- Educational content for each rule
- Links to best practices documentation

**Performance Optimization:**

- Parallel rule evaluation
- Caching for repeated prompts
- Incremental analysis for large prompts

**Advanced Pattern Matching:**

- NLP-based analysis for complex rules
- Semantic understanding of context
- Better ambiguity detection

### 12.2 Integration Opportunities

- CLI tool for prompt analysis
- IDE extension (VS Code, Kiro)
- CI/CD integration for prompt testing
- API client libraries (Python, JavaScript)
- Webhook support for automated workflows

---

## 13. Dependencies & Prerequisites

### 13.1 Required Dependencies

```json
{
  "dependencies": {
    "zod": "^3.22.4",
    "next": "^14.0.0",
    "react": "^18.2.0"
  },
  "devDependencies": {
    "fast-check": "^3.15.0",
    "@types/fast-check": "^3.15.0",
    "vitest": "^1.0.0",
    "typescript": "^5.3.0"
  }
}
```

### 13.2 Configuration Requirements

**TypeScript (tsconfig.json):**

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

**Vitest (vitest.config.ts):**

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["tests/**", "**/*.test.ts"],
    },
  },
});
```

### 13.3 Environment Setup

No environment variables required for core analysis engine. All configuration is code-based.

---

## 14. Success Metrics

### 14.1 Technical Metrics

- ✅ All 25 rules implemented and tested
- ✅ All 8 correctness properties pass with 1000+ test cases
- ✅ Code coverage > 80% for core logic
- ✅ Analysis completes in < 1 second for 10,000 char prompts
- ✅ Zero TypeScript errors in strict mode
- ✅ All Zod schemas validate correctly

### 14.2 Quality Metrics

- Pattern matching accuracy > 90%
- False positive rate < 10%
- False negative rate < 10%
- API response time < 100ms (excluding analysis)

### 14.3 User Experience Metrics

- Clear, actionable findings for failed rules
- Accurate scoring that reflects prompt quality
- Helpful suggestions that improve prompts
- Consistent results across multiple analyses

---

## 15. References

- **Requirements**: `.kiro/specs/rule-engine-and-analysis/requirements.md`
- **Rule Definitions**: `docs/rules.md`
- **System Architecture**: `docs/system.md`
- **Prompt Principles**: `docs/prompt-engineering-principles.md`
- **Project Structure**: `.kiro/steering/structure.md`
- **Technical Stack**: `.kiro/steering/tech.md`

---

**Design Status**: ✅ Complete and ready for implementation
**Next Step**: Create tasks.md with implementation breakdown
