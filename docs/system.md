# PromptSmith System Blueprint

## Overview

PromptSmith analyzes and refines AI prompts using a rule-based evaluation system combined with AI-assisted refinement. This document defines the core system architecture and behavior.

The system is built on comprehensive prompt engineering principles documented in [prompt-engineering-principles.md](./prompt-engineering-principles.md), which include:

- **Markdown Prompts Framework (MPF)**: Structured approach to prompt organization
- **Formatting Best Practices**: Clear, consistent prompt structure
- **Example-Driven Design**: Using examples to guide LLM behavior
- **Context Optimization**: Efficient token usage and context management
- **25 Rules Framework**: Comprehensive evaluation criteria

These principles inform every aspect of the analysis and refinement process.

---

## Rule-Based Analysis System

### Rule Structure

Each rule follows a consistent structure:

```typescript
interface Rule {
  id: string; // e.g., "R1", "R2"
  category: RuleCategory; // A, B, C, D, or E
  name: string; // e.g., "Explicit Role Defined"
  description: string; // What the rule checks
  checks: string[]; // Specific patterns or conditions
  whyItMatters: string; // Explanation of importance
  scoreImpact: number; // Points added/subtracted (±2 to ±5)
  severity: "Low" | "Medium" | "High";
  suggestedFix: string; // Actionable improvement suggestion
}
```

### Rule Categories (25 Total Rules)

#### **Category A: Clarity & Intent (5 rules)**

- R1: Explicit Role Defined (±4, Medium)
- R2: Clear Primary Goal (±5, High)
- R3: Scope Is Explicit (±4, Medium)
- R4: Target Audience Specified (±3, Low)
- R5: Ambiguous Language Avoided (±4, Medium)

#### **Category B: Context & Inputs (5 rules)**

- R6: Relevant Background Provided (±5, High)
- R7: Inputs Clearly Defined (±4, Medium)
- R8: Assumptions Are Declared (±3, Low)
- R9: Constraints Are Contextualized (±3, Low)
- R10: No Contradictory Instructions (±5, High)

#### **Category C: Instructions & Constraints (5 rules)**

- R11: Step-by-Step Instructions Where Needed (±4, Medium)
- R12: Explicit Constraints Listed (±4, Medium)
- R13: Priority Order Defined (±3, Low)
- R14: Desired Depth or Detail Specified (±4, Medium)
- R15: Edge Cases or Exceptions Mentioned (±3, Low)

#### **Category D: Output Format & Verification (5 rules)**

- R16: Output Format Explicitly Defined (±5, High)
- R17: Structured Output Requested Where Appropriate (±4, Medium)
- R18: Examples Provided (Few-Shot) (±4, Medium)
- R19: Acceptance Criteria Defined (±4, Medium)
- R20: Self-Verification Requested (±3, Low)

#### **Category E: Safety, Privacy & Robustness (5 rules)**

- R21: Sensitive Data Avoided (±5, High)
- R22: Ethical or Harmful Requests Avoided (±5, High)
- R23: Tool or Capability Limits Acknowledged (±3, Low)
- R24: Over-Specification Avoided (±2, Low)
- R25: Prompt Is Reusable (±3, Low)

---

## Scoring System

### Base Score Calculation

- **Starting Score**: 50 points (neutral baseline)
- **Maximum Score**: 100 points
- **Minimum Score**: 0 points

### Score Adjustment Logic

```
For each rule:
  IF rule is satisfied:
    score += rule.scoreImpact
  ELSE:
    score -= rule.scoreImpact

Final Score = clamp(score, 0, 100)
```

### Category Scores

Each category receives a sub-score based on its rules:

```
Category Score = (satisfied rules / total rules) × 100
```

### Quality Tiers

- **90-100**: Excellent - Production-ready prompt
- **75-89**: Good - Minor improvements recommended
- **60-74**: Fair - Several improvements needed
- **40-59**: Poor - Significant refinement required
- **0-39**: Critical - Major issues, complete rewrite suggested

---

## Analysis Engine

### Input Processing

1. **Sanitization**: Remove sensitive data patterns
2. **Tokenization**: Break prompt into analyzable segments
3. **Pattern Matching**: Apply rule checks
4. **Context Analysis**: Understand prompt structure and intent

### Rule Evaluation Process

```
For each rule:
  1. Apply pattern matching checks
  2. Evaluate conditions (boolean logic)
  3. Generate finding if rule fails
  4. Calculate score impact
  5. Generate suggested fix
```

### Finding Structure

```typescript
interface Finding {
  ruleId: string;
  ruleName: string;
  category: RuleCategory;
  severity: "Low" | "Medium" | "High";
  passed: boolean;
  message: string;
  suggestion: string;
  scoreImpact: number;
  location?: {
    start: number;
    end: number;
  };
}
```

---

## AI Refinement Service

### Refinement Philosophy

The refinement service applies the principles from [prompt-engineering-principles.md](./prompt-engineering-principles.md):

1. **Apply MPF Structure**: Organize prompts using `__ASK__`, `__CONTEXT__`, `__CONSTRAINTS__`, `__EXAMPLE__` sections
2. **Use Bullet Points**: Format content as scannable lists
3. **Provide Examples**: Include relevant examples to guide output
4. **Optimize Context**: Remove redundancy while preserving clarity
5. **Maintain Intent**: Preserve the original goal while improving structure

### Refinement Process

1. **Analyze Original**: Run rule-based analysis
2. **Generate Context**: Create refinement instructions based on findings
3. **AI Processing**: Send to AI with structured prompt
4. **Validate Output**: Ensure refined prompt addresses issues
5. **Re-analyze**: Score refined prompt to verify improvement

### Refinement Prompt Template

```
You are a prompt engineering expert specializing in the Markdown Prompts Framework (MPF).

Your task is to refine prompts to follow MPF best practices while addressing specific issues.

MPF PRINCIPLES:
1. Structure prompts using __SECTION__ headers (e.g., __ASK__, __CONTEXT__, __CONSTRAINTS__, __EXAMPLE__)
2. Always start with __ASK__ section at the top
3. Format each section as bulleted lists for readability
4. Include relevant examples in __EXAMPLE__ section when helpful
5. Keep prompts concise - remove redundancy while preserving clarity
6. Ensure output format is explicitly defined
7. Avoid ambiguous language and contradictory instructions

Original Prompt:
{original_prompt}

Issues Found:
{findings_list}

Instructions:
1. Preserve the original intent and core request
2. Apply MPF structure if not already present
3. Address each issue listed above, prioritizing high-severity items
4. Use bullet points for better readability
5. Add relevant examples if missing and helpful
6. Remove redundancy and verbosity
7. Ensure output format is clearly specified
8. Maintain natural, clear language
9. Do not over-engineer or add unnecessary complexity

Provide:
1. The refined prompt (using MPF format)
2. Brief explanation of key changes made
3. Rationale for improvements

Refined Prompt:
```

### Refinement Constraints

- **Preserve original intent**: Never change the core goal
- **Apply MPF structure**: Use `__SECTION__` format with bullet points
- **Address high-severity issues first**: Prioritize critical problems
- **Maintain or reduce prompt length**: Optimize for token efficiency
- **Avoid over-engineering**: Don't add unnecessary complexity
- **Keep language natural and clear**: Maintain readability
- **Include examples when helpful**: Guide expected output format
- **Remove redundancy**: Eliminate repetitive or verbose content

---

## Comparison System

### Diff Generation

- **Text Diff**: Character-level or word-level differences
- **Structural Diff**: Changes in sections, formatting, structure
- **Score Diff**: Before/after score comparison

### Visualization

- Side-by-side view
- Inline highlighting (additions in green, removals in red)
- Score improvement metrics
- Category-level improvements

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Prompt Input │  │   Results    │  │  Comparison  │  │
│  └──────┬───────┘  └──────▲───────┘  └──────▲───────┘  │
│         │                  │                  │          │
└─────────┼──────────────────┼──────────────────┼──────────┘
          │                  │                  │
          ▼                  │                  │
┌─────────────────────────────────────────────────────────┐
│                    API Layer (Next.js)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  POST /api/analyze                               │   │
│  │  POST /api/refine                                │   │
│  └──────────────────────────────────────────────────┘   │
└─────────┬───────────────────────────────────┬───────────┘
          │                                   │
          ▼                                   ▼
┌──────────────────────┐          ┌──────────────────────┐
│  Rule Engine         │          │  AI Refinement       │
│  ┌────────────────┐  │          │  Service             │
│  │ Rule Loader    │  │          │  ┌────────────────┐  │
│  │ Pattern Match  │  │          │  │ Prompt Builder │  │
│  │ Score Calc     │  │          │  │ AI Client      │  │
│  │ Finding Gen    │  │          │  │ Validator      │  │
│  └────────────────┘  │          │  └────────────────┘  │
└──────────────────────┘          └──────────────────────┘
          │                                   │
          └───────────────┬───────────────────┘
                          ▼
                ┌──────────────────┐
                │  Zod Schemas     │
                │  - PromptSchema  │
                │  - AnalysisSchema│
                │  - FindingSchema │
                └──────────────────┘
```

---

## Storage Strategy

### Session Storage (Browser)

- Store analysis results
- Cache refined prompts
- Save comparison history
- No server-side persistence

### Data Structure

```typescript
interface Session {
  id: string;
  timestamp: number;
  originalPrompt: string;
  analysis: AnalysisResult;
  refinedPrompt?: string;
  refinedAnalysis?: AnalysisResult;
}
```

---

## Error Handling

### Rule Evaluation Errors

- Graceful degradation: Skip failing rules
- Log errors for debugging
- Continue with remaining rules

### AI Service Errors

- Retry logic (max 3 attempts)
- Fallback to rule-based suggestions only
- Clear error messaging to user

### Validation Errors

- Zod schema validation
- User-friendly error messages
- Input sanitization

---

## Performance Considerations

### Analysis Performance

- Target: < 1 second for rule evaluation
- Parallel rule checking where possible
- Efficient pattern matching

### AI Refinement Performance

- Target: < 5 seconds for AI response
- Streaming responses (if supported)
- Progress indicators

### UI Performance

- Debounced input (500ms)
- Lazy loading of comparison view
- Optimistic UI updates

---

## Security & Privacy

### Input Sanitization

- Remove API keys, tokens, passwords
- Detect PII patterns
- Warn users about sensitive data

### AI Service Security

- Server-side API key storage
- Rate limiting
- Request validation

### Data Privacy

- No server-side prompt storage
- Client-side only persistence
- Clear privacy policy

---

## Extensibility

### Adding New Rules

1. Define rule in rules configuration
2. Implement check logic
3. Add to appropriate category
4. Update scoring system
5. Test with sample prompts

### Custom Rule Sets

Future: Allow users to define custom rules or rule sets

### AI Provider Flexibility

Abstract AI client to support multiple providers:

- OpenAI
- Anthropic
- Local models
- Custom endpoints

---

## Success Metrics

### System Performance

- Analysis accuracy: > 90%
- Refinement improvement: Average +20 points
- Response time: < 5 seconds total

### User Experience

- Intuitive workflow
- Clear, actionable feedback
- Visible quality improvement

### Technical Quality

- Type-safe implementation
- Comprehensive error handling
- Well-documented code
- Maintainable architecture

---

## Implementation Priorities

### Phase 1: Core Engine (MVP)

1. Rule definition system
2. Pattern matching logic
3. Scoring calculation
4. Finding generation

### Phase 2: AI Integration

1. AI client setup
2. Refinement prompt engineering
3. Response validation
4. Error handling

### Phase 3: UI Components

1. Prompt input
2. Analysis results display
3. Score visualization
4. Comparison view

### Phase 4: Polish

1. Export functionality
2. Session management
3. Performance optimization
4. Documentation

---

This blueprint serves as the technical foundation for PromptSmith implementation.
