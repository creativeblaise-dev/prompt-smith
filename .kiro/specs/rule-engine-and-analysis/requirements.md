# Requirements: Rule Engine and Prompt Analysis System

**Feature**: Core rule-based prompt analysis engine
**Priority**: P0 (Critical - Foundation for entire system)
**Estimated Effort**: 8-12 hours

---

## 1. User Stories

### US-1.1: As a developer, I want to define rules in a structured format

**Acceptance Criteria**:

- Rules are defined using TypeScript interfaces
- Each rule has all required fields (id, category, name, description, checks, etc.)
- Rules are organized by category (A-E)
- Rules are type-safe and validated with Zod schemas

### US-1.2: As a user, I want my prompt analyzed against best practices

**Acceptance Criteria**:

- System evaluates prompt against all 25 rules
- Each rule produces a pass/fail result
- Failing rules generate specific findings with suggestions
- Analysis completes in < 1 second

### US-1.3: As a user, I want to see a quality score for my prompt

**Acceptance Criteria**:

- Overall score calculated (0-100 scale)
- Category-level sub-scores provided
- Score calculation follows defined algorithm
- Quality tier assigned (Excellent/Good/Fair/Poor/Critical)

### US-1.4: As a user, I want actionable feedback on how to improve

**Acceptance Criteria**:

- Each failing rule provides a specific suggestion
- Suggestions are clear and actionable
- Severity level indicated (Low/Medium/High)
- Findings are grouped by category

### US-1.5: As a developer, I want the analysis to be type-safe and validated

**Acceptance Criteria**:

- All data structures use TypeScript types
- Zod schemas validate inputs and outputs
- Invalid inputs are rejected with clear errors
- Type safety enforced throughout the system

---

## 2. Functional Requirements

### FR-1: Rule Definition System

#### FR-1.1: Rule Structure

- Each rule MUST have: id, category, name, description, checks, whyItMatters, scoreImpact, severity, suggestedFix
- Rule IDs MUST follow format: R1-R25
- Categories MUST be one of: A, B, C, D, E
- Score impact MUST be between ±2 and ±5
- Severity MUST be: Low, Medium, or High

#### FR-1.2: Rule Categories

- Category A: Clarity & Intent (5 rules)
- Category B: Context & Inputs (5 rules)
- Category C: Instructions & Constraints (5 rules)
- Category D: Output Format & Verification (5 rules)
- Category E: Safety, Privacy & Robustness (5 rules)

#### FR-1.3: Rule Storage

- Rules stored in TypeScript configuration files
- Rules organized by category
- Rules exportable as a single collection
- Rules validated on load

### FR-2: Pattern Matching Engine

#### FR-2.1: Text Analysis

- Detect role definitions ("You are", "Act as", "Assume the role")
- Identify goal statements and objectives
- Find scope definitions and boundaries
- Detect audience specifications
- Flag ambiguous language (vague terms without definition)

#### FR-2.2: Context Detection

- Identify background information
- Detect input specifications
- Find assumption declarations
- Locate constraint explanations
- Detect contradictory instructions

#### FR-2.3: Instruction Analysis

- Identify step-by-step structures
- Find explicit constraints
- Detect priority indicators
- Identify depth/detail specifications
- Find edge case mentions

#### FR-2.4: Format Detection

- Identify output format specifications
- Detect structured output requests
- Find examples (few-shot patterns)
- Locate acceptance criteria
- Detect self-verification requests

#### FR-2.5: Safety Checks

- Detect sensitive data patterns (API keys, passwords, PII)
- Flag potentially harmful requests
- Identify capability limit acknowledgments
- Detect over-specification
- Assess reusability

### FR-3: Scoring System

#### FR-3.1: Score Calculation

- Base score: 50 points
- Add scoreImpact for passing rules
- Subtract scoreImpact for failing rules
- Clamp final score between 0-100
- Calculate category sub-scores

#### FR-3.2: Quality Tiers

- 90-100: Excellent
- 75-89: Good
- 60-74: Fair
- 40-59: Poor
- 0-39: Critical

#### FR-3.3: Score Breakdown

- Overall score
- Category scores (A-E)
- Rules passed vs total
- Score impact per category

### FR-4: Finding Generation

#### FR-4.1: Finding Structure

- Rule ID and name
- Category
- Severity level
- Pass/fail status
- Descriptive message
- Suggested fix
- Score impact
- Optional: location in prompt

#### FR-4.2: Finding Prioritization

- High severity findings first
- Medium severity second
- Low severity last
- Within severity: by score impact

### FR-5: Analysis Output

#### FR-5.1: Analysis Result Structure

```typescript
{
  promptId: string
  timestamp: number
  originalPrompt: string
  overallScore: number
  qualityTier: string
  categoryScores: {
    A: number, B: number, C: number, D: number, E: number
  }
  findings: Finding[]
  summary: {
    totalRules: number
    rulesPassed: number
    rulesFailed: number
    highSeverityIssues: number
    mediumSeverityIssues: number
    lowSeverityIssues: number
  }
}
```

---

## 3. Non-Functional Requirements

### NFR-1: Performance

- Analysis MUST complete in < 1 second for prompts up to 10,000 characters
- Pattern matching MUST be efficient (no exponential regex)
- Rule evaluation MUST be parallelizable where possible

### NFR-2: Accuracy

- Pattern matching MUST have > 90% accuracy
- False positives MUST be < 10%
- False negatives MUST be < 10%

### NFR-3: Maintainability

- Rules MUST be easy to add/modify
- Code MUST be well-documented
- Types MUST be comprehensive
- Tests MUST cover core logic

### NFR-4: Type Safety

- All functions MUST have explicit return types
- No `any` types allowed
- Zod schemas MUST validate all external data
- TypeScript strict mode MUST be enabled

### NFR-5: Error Handling

- Invalid inputs MUST be rejected with clear errors
- Rule evaluation errors MUST not crash the system
- Errors MUST be logged for debugging
- User-facing errors MUST be actionable

---

## 4. Technical Constraints

### TC-1: Technology Stack

- TypeScript (strict mode)
- Zod for validation
- Next.js API routes
- No external rule engine libraries

### TC-2: Data Storage

- No database required for MVP
- Rules stored in code
- Analysis results returned immediately
- No server-side persistence

### TC-3: Dependencies

- Minimize external dependencies
- Use standard library where possible
- Zod for validation only
- No ML/AI for rule evaluation (pattern matching only)

---

## 5. Out of Scope (for this feature)

- AI-assisted refinement (separate feature)
- UI components (separate feature)
- Export functionality (separate feature)
- User accounts or authentication
- Prompt history or versioning
- Custom rule definitions by users
- Multi-language support

---

## 6. Success Criteria

### Minimum Viable Product (MVP)

- ✅ All 25 rules defined and implemented
- ✅ Pattern matching works for each rule
- ✅ Scoring system calculates correctly
- ✅ Findings generated with suggestions
- ✅ Analysis completes in < 1 second
- ✅ Type-safe implementation
- ✅ Zod validation in place

### Quality Metrics

- Code coverage > 80% for core logic
- No TypeScript errors
- All Zod schemas validate correctly
- Performance benchmarks met

### User Experience

- Clear, actionable findings
- Accurate rule evaluation
- Helpful suggestions
- Consistent scoring

---

## 7. Dependencies

### Depends On

- TypeScript configuration (✅ Complete)
- Zod installation (✅ Complete)
- Next.js setup (✅ Complete)

### Blocks

- AI refinement service (needs analysis output)
- UI components (needs analysis API)
- Comparison system (needs analysis results)

---

## 8. Testing Strategy

### Unit Tests

- Rule definition validation
- Pattern matching accuracy
- Score calculation correctness
- Finding generation

### Integration Tests

- End-to-end analysis flow
- API endpoint functionality
- Error handling

### Test Cases

- Empty prompt
- Minimal prompt
- Well-structured prompt
- Poorly-structured prompt
- Edge cases (very long, special characters, etc.)

---

## 9. Implementation Notes

### Phase 1: Type Definitions

1. Define Rule interface
2. Define Finding interface
3. Define AnalysisResult interface
4. Create Zod schemas

### Phase 2: Rule Definitions

1. Define all 25 rules in configuration
2. Organize by category
3. Validate rule structure

### Phase 3: Pattern Matching

1. Implement pattern matchers for each rule
2. Test accuracy
3. Optimize performance

### Phase 4: Analysis Engine

1. Implement rule evaluation logic
2. Implement scoring system
3. Implement finding generation
4. Create analysis orchestrator

### Phase 5: API Integration

1. Create /api/analyze endpoint
2. Add request validation
3. Add error handling
4. Test end-to-end

---

## 10. Open Questions

1. Should we support custom rule weights in the future?
2. Should we allow users to disable specific rules?
3. Should we provide detailed explanations for why rules passed?
4. Should we support batch analysis of multiple prompts?

---

## 11. References

- System Blueprint: `docs/system.md`
- Rule Set: `docs/rules.md` (25 rules across 5 categories)
- Product Requirements: `.kiro/steering/product.md`
- Technical Architecture: `.kiro/steering/tech.md`

## 12. Rule Set Details

The complete rule set is defined in `docs/rules.md` with the following structure:

### Category A: Clarity & Intent (5 rules)

- R1: Explicit Role Defined (±4, Medium)
- R2: Clear Primary Goal (±5, High)
- R3: Scope Is Explicit (±4, Medium)
- R4: Target Audience Specified (±3, Low)
- R5: Ambiguous Language Avoided (±4, Medium)

### Category B: Context & Inputs (5 rules)

- R6: Relevant Background Provided (±5, High)
- R7: Inputs Clearly Defined (±4, Medium)
- R8: Assumptions Are Declared (±3, Low)
- R9: Constraints Are Contextualized (±3, Low)
- R10: No Contradictory Instructions (±5, High)

### Category C: Instructions & Constraints (5 rules)

- R11: Step-by-Step Instructions Where Needed (±4, Medium)
- R12: Explicit Constraints Listed (±4, Medium)
- R13: Priority Order Defined (±3, Low)
- R14: Desired Depth or Detail Specified (±4, Medium)
- R15: Edge Cases or Exceptions Mentioned (±3, Low)

### Category D: Output Format & Verification (5 rules)

- R16: Output Format Explicitly Defined (±5, High)
- R17: Structured Output Requested Where Appropriate (±4, Medium)
- R18: Examples Provided (Few-Shot) (±4, Medium)
- R19: Acceptance Criteria Defined (±4, Medium)
- R20: Self-Verification Requested (±3, Low)

### Category E: Safety, Privacy & Robustness (5 rules)

- R21: Sensitive Data Avoided (±5, High)
- R22: Ethical or Harmful Requests Avoided (±5, High)
- R23: Tool or Capability Limits Acknowledged (±3, Low)
- R24: Over-Specification Avoided (±2, Low)
- R25: Prompt Is Reusable (±3, Low)

**Total Possible Score**: 100 points (50 base + up to 50 from rules)
**Scoring Method**: Start at 50, add/subtract score impact based on pass/fail
