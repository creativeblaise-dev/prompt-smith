# Prompt Engineering Principles for PromptSmith Development

## Overview

When working on PromptSmith, always apply and reference the comprehensive prompt engineering principles documented in `docs/prompt-engineering-principles.md`.

## Core Framework: Markdown Prompts Framework (MPF)

PromptSmith is built around the Markdown Prompts Framework (MPF). All analysis, refinement, and examples should follow MPF principles:

### MPF Structure

1. **Section-Based Organization**: Use `__SECTION__` format (e.g., `__ASK__`, `__CONTEXT__`, `__CONSTRAINTS__`, `__EXAMPLE__`)
2. **Start with **ASK****: Always begin prompts with the primary objective
3. **Bullet Points**: Format content as scannable lists
4. **Key Sections**: Include **ASK**, **CONTEXT**, **CONSTRAINTS**, and **EXAMPLE** for complex prompts

### Example MPF Prompt

```markdown
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

Input: "invalid.email"
Output: False
```

## Key Principles to Apply

### 1. Formatting and Organization

- Use consistent structure throughout
- Apply clear visual hierarchy
- Keep content scannable and readable
- Group related concepts together

### 2. The Power of Examples

- Examples are fundamental, not optional
- Show exact desired output format
- Include edge cases when relevant
- Use few-shot learning for complex tasks

### 3. Context Optimization

- Remove redundancy and verbosity
- Focus on essential information only
- Optimize for token efficiency
- Break complex tasks into smaller prompts

### 4. The 25 Rules Framework

All prompts should be evaluated against the 25 rules in `docs/rules.md`:

- **Category A**: Clarity & Intent (5 rules)
- **Category B**: Context & Inputs (5 rules)
- **Category C**: Instructions & Constraints (5 rules)
- **Category D**: Output Format & Verification (5 rules)
- **Category E**: Safety, Privacy & Robustness (5 rules)

## Implementation Guidelines

### When Writing Code

- Implement rule checks that align with MPF principles
- Ensure the analyzer detects missing MPF structure
- Refinement service should apply MPF format
- Examples in tests should follow MPF

### When Creating Documentation

- Use MPF format for complex examples
- Reference `docs/prompt-engineering-principles.md`
- Show before/after comparisons
- Demonstrate practical application

### When Testing

- Test prompts should follow MPF
- Include examples of good vs. poor prompts
- Verify MPF structure is applied in refinement
- Check that rules align with principles

## Quality Checklist

Before considering any prompt-related work complete, verify:

- [ ] MPF structure is applied where appropriate
- [ ] Examples are included and relevant
- [ ] Content is optimized for token efficiency
- [ ] All 25 rules are properly implemented
- [ ] Documentation references principles correctly
- [ ] Code comments explain principle application

## References

- **Primary**: `docs/prompt-engineering-principles.md` - Comprehensive principles guide
- **Rules**: `docs/rules.md` - 25 rules framework
- **System**: `docs/system.md` - Architecture and implementation
- **Lessons**: `docs/` - Original lesson materials on MPF, examples, and context limits

## Remember

PromptSmith's value proposition is teaching users to write better prompts. Every feature, rule, and refinement should embody and demonstrate these principles in action.
