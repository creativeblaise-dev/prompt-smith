# Prompt Engineering Principles for PromptSmith

## Overview

This document outlines the comprehensive prompt engineering principles that guide PromptSmith's analysis and refinement system. These principles are based on the **Markdown Prompts Framework (MPF)** developed by CodeSignal's Prompt Engineers and AI experts, combined with industry best practices for effective LLM interaction.

---

## Table of Contents

1. [Core Framework: Markdown Prompts Framework (MPF)](#core-framework-markdown-prompts-framework-mpf)
2. [Formatting and Organization Principles](#formatting-and-organization-principles)
3. [The Power of Examples](#the-power-of-examples)
4. [Style Specification and Control](#style-specification-and-control)
5. [Context Management and Token Optimization](#context-management-and-token-optimization)
6. [The 25 Rules Framework](#the-25-rules-framework)
7. [Practical Application Guidelines](#practical-application-guidelines)

---

## Core Framework: Markdown Prompts Framework (MPF)

The Markdown Prompts Framework is a structured approach to creating highly readable, maintainable, and effective prompts. PromptSmith uses MPF as the foundation for evaluating and refining prompts.

### Why MPF?

While there are many approaches to structuring prompts (OpenAI recommends Markdown, Anthropic recommends XML), MPF has proven extremely effective because:

- **Human Readable**: Prompts are assets that teams reuse and develop over time
- **Easily Skimmable**: Bold section headers make navigation effortless
- **Maintainable**: Clear structure enables collaborative prompt development
- **LLM-Friendly**: Structured format improves model comprehension

### MPF Core Components

#### 1. Section-Based Structure

**Format**: `__SECTION__`

- Split prompts into Markdown sections with bold headers
- Sections show up in **bold** when rendered, making them easily skimmable
- Helps both LLMs and humans understand prompt organization
- Enables quick navigation in large prompts

**Example:**

```markdown
**ASK**
Create a comprehensive API documentation page

**CONTEXT**

- RESTful API for e-commerce platform
- Target audience: third-party developers
```

#### 2. Start with **ASK**

- **Always begin with the **ASK** section at the top**
- Allows you and collaborators to quickly understand the goal
- Provides immediate clarity on the prompt's purpose
- Sets clear expectations for the LLM

**Example:**

```markdown
**ASK**
Generate a Python function that validates email addresses using regex
```

#### 3. Use Bulleted Lists

- Format each section as Markdown bullet points
- Bulleted lists are easier to skim and understand
- Leads to better instruction following by LLMs
- Improves readability for human reviewers

**Example:**

```markdown
**CONSTRAINTS**

- Function must handle international email formats
- Return boolean value (True/False)
- Include inline comments explaining regex pattern
- No external dependencies allowed
```

#### 4. Key Sections for Complex Prompts

While minimizing the number of sections, include these for complex prompts:

- \***\*ASK\*\*** - What are we asking the LLM to do?
- \***\*CONTEXT\*\*** - What does the LLM need to know to respond accurately?
- \***\*CONSTRAINTS\*\*** - What constraints need to be followed when responding?
- \***\*EXAMPLE\*\*** - What's a good example of output you'd be happy with?

---

## Formatting and Organization Principles

### The Importance of Consistent Formatting

Formatting your prompts consistently is not just about aesthetics—it's about making your intentions crystal clear to the AI. Just as jumbled baking instructions lead to a poor cake, disorganized prompts lead to confused AI responses.

### Best Practices

#### Clear Structure

- Present information in logical order
- Group related concepts together
- Use consistent formatting throughout
- Avoid mixing different organizational patterns

#### Visual Hierarchy

- Use section headers to create clear boundaries
- Employ bullet points for lists of items
- Use numbered lists for sequential steps
- Apply consistent indentation for nested information

#### Readability

- Keep sentences concise and direct
- Avoid unnecessary complexity
- Use whitespace effectively
- Break long sections into smaller, digestible parts

### Before and After Example

**Before (Poor Formatting):**

```
Write a short story about an astronaut who discovers a new planet. But make sure the story includes a talking alien, a space battle, and a twist at the end where it was all a simulation. And oh, keep it under 100 words, please.
```

**After (MPF Applied):**

```markdown
**ASK**
Craft a short story about an astronaut's discovery.

**CONTEXT**

- The setting is outer space
- The protagonist is an astronaut

**CONSTRAINTS**

- The story should be no longer than 120 words
- Include the following elements:
  - A talking alien
  - A space battle
  - A twist ending revealing everything was a simulation
```

---

## The Power of Examples

### Why Examples Matter

Examples serve as the cornerstone of effective communication with LLMs. They help the model understand not only the task but also the context and desired format of the output. Well-crafted examples can dramatically improve output quality.

### The Impact of Great Examples

Examples guide the model toward your expectations and significantly influence the quality of generated content. They are not just an add-on—they are fundamental to designing effective prompts.

### Example Best Practices

#### 1. Provide Clear, Relevant Examples

- Show exactly what you want, not just describe it
- Use realistic examples that match your use case
- Include edge cases when relevant

#### 2. Follow the Format Closely

- Explicitly instruct the model to follow the example format
- Show the exact structure you expect
- Include formatting details (spacing, punctuation, style)

#### 3. Use Examples to Define Quality

- Demonstrate the level of detail you expect
- Show the tone and style you prefer
- Illustrate how to handle complexity

### Example: Advertising Copy

**Without Example:**

```markdown
**ASK**
Create short advertising copy to market CodeSignal

**CONSTRAINTS**

- Do not focus too much on features, focus on brand
- Keep the ad very short
```

**Output:** "Here is a draft of a short advertising copy for CodeSignal: CodeSignal. Where coding meets opportunity."
_(Includes unnecessary preamble, poor format, has quotation marks)_

**With Example:**

```markdown
**ASK**
Create short advertising copy to market CodeSignal

**CONSTRAINTS**

- Do not focus too much on features, focus on brand
- Keep the ad very short
- Follow the format of the example closely

**EXAMPLE**
Build tech skills top companies are hiring for.
```

**Output:** "Unlock your coding potential. Shine with CodeSignal."
_(Clean, direct, matches desired format)_

### Few-Shot Learning

Providing multiple examples (few-shot learning) can further improve results:

```markdown
**EXAMPLE**
Input: "Create user account"
Output: POST /api/users

Input: "Get user profile"
Output: GET /api/users/{id}

Input: "Update user email"
Output: PATCH /api/users/{id}/email
```

---

## Style Specification and Control

### Understanding Style Specification

Style specification is the process of guiding LLMs to produce text with specific characteristics. Think of it as giving instructions to a skilled chef—just as you would specify how you want your steak cooked, you can guide LLMs in producing the "flavor" of text you desire.

Style encompasses multiple dimensions:

- **Tone**: Formal, informal, professional, casual, uplifting, serious
- **Language**: Simple, technical, accessible, specialized
- **Length**: Brief, detailed, concise, comprehensive
- **Complexity**: Beginner-friendly, expert-level, intermediate
- **Format**: Narrative, bullet points, technical documentation

### The **STYLE** Section

When style is important to your prompt, add a `__STYLE__` section to your MPF structure:

```markdown
**ASK**
Generate a motivational quote for a team newsletter

**STYLE**

- Tone: uplifting and visionary
- Language: simple and accessible
- Length: short
```

**Output:**

> "In every challenge lies an opportunity to grow stronger together. Let's embrace our journey with courage and unite our efforts toward a future filled with success."

### The Role of Tone

Tone plays a significant role in determining the perception and effectiveness of generated content. Setting an explicit tone helps guide the LLM toward responses that align with the emotional or professional context you aim for.

#### Tone Examples

**Professional and Informative:**

```markdown
**ASK**
Write a brief overview of renewable energy sources

**STYLE**

- Tone: Informative but easy to understand
- Audience: General public
```

**Casual and Friendly:**

```markdown
**ASK**
Explain how to use our new feature

**STYLE**

- Tone: Friendly and encouraging
- Language: Conversational
```

**Formal and Technical:**

```markdown
**ASK**
Document the API authentication process

**STYLE**

- Tone: Professional and precise
- Language: Technical
- Audience: Software engineers
```

### Language and Complexity

Specifying language complexity is crucial when audience expertise varies. This ensures content is appropriately accessible or technical.

#### Simple Language Example

```markdown
**ASK**
Explain how solar panels convert sunlight into electricity

**STYLE**

- Language: Simple, for a general audience
- Avoid: Technical jargon
- Use: Everyday analogies
```

This instructs the LLM to use layman's terms, making complex technology understandable to non-technical readers.

#### Technical Language Example

```markdown
**ASK**
Explain the OAuth 2.0 authorization flow

**STYLE**

- Language: Technical
- Audience: Backend developers
- Include: Protocol details and security considerations
```

### Length and Detail Specification

Specifying length and detail level substantially influences communication effectiveness. Be specific about what you want.

#### Be Specific About Length

**Vague:**

```markdown
**STYLE**

- Length: Short
```

**Specific:**

```markdown
**STYLE**

- Length: Two sentences maximum
- Format: Single paragraph
```

**Example:**

```markdown
**ASK**
Summarize the benefits of using electric vehicles

**STYLE**

- Length: Brief, two sentences
- Focus: Environmental and economic benefits
```

#### Detail Level Examples

**High-Level Overview:**

```markdown
**STYLE**

- Detail: High-level overview only
- Length: 3-4 bullet points
- Avoid: Implementation details
```

**Comprehensive Detail:**

```markdown
**STYLE**

- Detail: Comprehensive with examples
- Include: Edge cases and best practices
- Length: 500-700 words
```

### Style Impact on Output Quality

The same prompt with different style specifications produces dramatically different results:

**Example 1: Without Length Specification**

```markdown
**ASK**
Generate a motivational quote for a team newsletter

**STYLE**

- Tone: uplifting and visionary
- Language: simple and accessible
```

**Output:**

> "Alone we can do so little; together we can do so much. Let's harness our collective strengths, dreams, and ambitions. Every challenge we face is an opportunity to grow stronger, together. Remember, it's not just about reaching the top; it's about the journey we share and the bonds we build. Let's move forward, hand in hand, towards our shared vision. Because when we unite, there's nothing we can't achieve."

**Example 2: With Length Specification**

```markdown
**ASK**
Generate a motivational quote for a team newsletter

**STYLE**

- Tone: uplifting and visionary
- Language: simple and accessible
- Length: short, one sentence
```

**Output:**

> "In every challenge lies an opportunity to grow stronger together."

### Common Style Dimensions

#### Tone Options

- **Professional**: Formal, business-appropriate, objective
- **Casual**: Conversational, friendly, relaxed
- **Academic**: Scholarly, research-oriented, citation-heavy
- **Creative**: Imaginative, expressive, artistic
- **Technical**: Precise, detailed, specification-focused
- **Persuasive**: Convincing, compelling, action-oriented
- **Empathetic**: Understanding, supportive, compassionate

#### Language Complexity

- **Simple**: Elementary vocabulary, short sentences, clear explanations
- **Intermediate**: Moderate vocabulary, balanced complexity
- **Advanced**: Sophisticated vocabulary, complex sentence structures
- **Technical**: Domain-specific terminology, precise definitions
- **Accessible**: Clear explanations with minimal jargon

#### Length Guidelines

- **Micro**: 1-2 sentences (20-40 words)
- **Brief**: 1 paragraph (50-100 words)
- **Short**: 2-3 paragraphs (100-200 words)
- **Medium**: 3-5 paragraphs (200-400 words)
- **Long**: 5+ paragraphs (400+ words)
- **Comprehensive**: Multiple sections (1000+ words)

### Best Practices for Style Specification

#### 1. Be Explicit

Don't assume the model knows what "professional" or "simple" means to you. Define it:

```markdown
**STYLE**

- Tone: Professional (formal but not stuffy, respectful, objective)
- Language: Simple (8th-grade reading level, minimal jargon)
```

#### 2. Consider Your Audience

Always specify who the content is for:

```markdown
**STYLE**

- Audience: Non-technical stakeholders
- Tone: Professional but accessible
- Avoid: Technical jargon, acronyms without explanation
```

#### 3. Use Specific Measurements

Replace vague terms with concrete specifications:

**Vague:** "Keep it short"
**Specific:** "Maximum 3 sentences" or "Under 100 words"

#### 4. Combine Style Elements

Multiple style dimensions work together:

```markdown
**STYLE**

- Tone: Friendly and encouraging
- Language: Simple, conversational
- Length: Brief (2-3 sentences)
- Format: Bullet points preferred
- Audience: First-time users
```

#### 5. Show, Don't Just Tell

Combine style specifications with examples:

```markdown
**STYLE**

- Tone: Casual and friendly
- Language: Conversational

**EXAMPLE**
"Hey there! Let's walk through this together. It's easier than you think!"
```

### Style in Different Contexts

#### Documentation

```markdown
**STYLE**

- Tone: Clear and instructional
- Language: Technical but accessible
- Format: Step-by-step with code examples
- Length: Comprehensive
```

#### Marketing Copy

```markdown
**STYLE**

- Tone: Persuasive and energetic
- Language: Simple and impactful
- Length: Brief and punchy
- Focus: Benefits over features
```

#### Technical Specifications

```markdown
**STYLE**

- Tone: Precise and objective
- Language: Technical with exact terminology
- Format: Structured with clear sections
- Detail: Comprehensive with edge cases
```

#### Educational Content

```markdown
**STYLE**

- Tone: Patient and encouraging
- Language: Simple with clear explanations
- Format: Progressive complexity
- Include: Examples and analogies
```

### Common Style Pitfalls

#### Pitfall 1: Vague Style Requests

**Problem:** "Make it sound nice"
**Solution:** "Tone: Friendly and professional, Language: Accessible to non-experts"

#### Pitfall 2: Conflicting Style Requirements

**Problem:** "Be brief but comprehensive"
**Solution:** "Length: 200 words covering key points only"

#### Pitfall 3: Assuming Context

**Problem:** "Write professionally"
**Solution:** "Tone: Business professional (formal email style), Audience: C-level executives"

#### Pitfall 4: Ignoring Audience

**Problem:** Not specifying who will read the content
**Solution:** Always include audience in style specifications

---

## Context Management and Token Optimization

### Understanding Context Limits

All LLMs have a maximum amount of text they can consider at one time (context window). Understanding and working within these limits is crucial for effective prompt engineering.

### Token Basics

- A **token** is not just a word—it can be a word, part of a word, or punctuation
- As a rule of thumb, think of tokens as roughly equivalent to words
- Different models have different context windows:
  - GPT-3: 2k tokens
  - GPT-3.5: 4k tokens
  - GPT-4: 4k-32k tokens
  - Claude 2: 100k tokens
  - Mistral 7B: 8k tokens

### Why Context Limits Matter

- Most LLM providers charge by the number of tokens used
- Many models have limited context windows
- Longer prompts don't always mean better results
- Efficient prompts save money and improve performance

### Strategies for Overcoming Context Limits

#### 1. Prompt Compression

Simplify prompts to contain only essential information:

**Before:**

```markdown
**CONTEXT**

- The project involves a software tool designed to automate data analysis tasks.
- It is targeted at data scientists and analysts who require efficiency in their workflow.
- The software tool integrates with multiple data sources and provides customizable analysis templates.
- The users of this documentation are primarily interested in understanding how to configure and utilize these templates effectively.
```

**After:**

```markdown
**CONTEXT**

- Targeted at data scientists and analysts for workflow efficiency
- Tool integrates with multiple data sources and provides customizable analysis templates that are easy to configure and utilize
```

#### 2. Focused Queries

- Ask specific questions instead of broad, unfocused ones
- Pinpoint your inquiry to get more accurate responses
- Avoid asking multiple unrelated questions in one prompt

#### 3. Iterative Prompting

- Break complex tasks into smaller, sequential prompts
- Guide the LLM through a logical sequence of thought
- Refine queries based on previous responses

#### 4. Remove Redundancy

- Eliminate repetitive instructions
- Avoid saying the same thing in different ways
- Cut unnecessary elaboration

### Practical Example

**Before (Verbose):**

```markdown
**CONSTRAINTS**

- The table must clearly list the available templates by name.
- Each template description must include the type of analysis it is suited for.
- The table should be designed to be easily readable and understandable.
- It should accommodate a brief description for each template, explaining its primary use case.
- Ensure that the information is presented in a structured format, with each template's name and description clearly delineated.
- The table must be formatted in a way that it can be included in a Markdown or HTML document.
- It is essential that the table be concise yet informative, providing essential information at a glance.
- Please make sure to present the data in a tabular format, with columns for the template name and its corresponding description.
```

**After (Optimized):**

```markdown
**CONSTRAINTS**

- Table must clearly list templates by name and description
- Easy to understand, clearly structured, and beautifully designed
- Description must be concise but short not to break onto the next line
```

---

## The 25 Rules Framework

PromptSmith evaluates prompts against 25 comprehensive rules organized into 5 categories. These rules operationalize the principles above into specific, measurable criteria.

### Rule Categories

#### Category A: Clarity & Intent (5 rules)

- R1: Explicit Role Defined
- R2: Clear Primary Goal
- R3: Scope Is Explicit
- R4: Target Audience Specified
- R5: Ambiguous Language Avoided

#### Category B: Context & Inputs (5 rules)

- R6: Relevant Background Provided
- R7: Inputs Clearly Defined
- R8: Assumptions Are Declared
- R9: Constraints Are Contextualized
- R10: No Contradictory Instructions

#### Category C: Instructions & Constraints (5 rules)

- R11: Step-by-Step Instructions Where Needed
- R12: Explicit Constraints Listed
- R13: Priority Order Defined
- R14: Desired Depth or Detail Specified
- R15: Edge Cases or Exceptions Mentioned

#### Category D: Output Format & Verification (5 rules)

- R16: Output Format Explicitly Defined
- R17: Structured Output Requested Where Appropriate
- R18: Examples Provided (Few-Shot)
- R19: Acceptance Criteria Defined
- R20: Self-Verification Requested

#### Category E: Safety, Privacy & Robustness (5 rules)

- R21: Sensitive Data Avoided
- R22: Ethical or Harmful Requests Avoided
- R23: Tool or Capability Limits Acknowledged
- R24: Over-Specification Avoided
- R25: Prompt Is Reusable

_For detailed rule definitions, see [docs/rules.md](./rules.md)_

---

## Practical Application Guidelines

### When to Use MPF

**Always use MPF for:**

- Complex prompts with multiple requirements
- Prompts that will be reused or shared
- Prompts requiring precise outputs
- Team collaboration on prompt development

**MPF may be overkill for:**

- Simple, one-off questions
- Casual conversational queries
- Exploratory brainstorming

### Prompt Development Workflow

1. **Start with **ASK\*\*\*\*: Define the core objective
2. **Add **CONTEXT\*\*\*\*: Provide necessary background
3. **Define **CONSTRAINTS\*\*\*\*: Set boundaries and requirements
4. **Include **EXAMPLE\*\*\*\*: Show desired output format
5. **Review and Compress**: Remove redundancy, optimize tokens
6. **Test and Iterate**: Run the prompt, refine based on results

### Common Pitfalls to Avoid

#### Over-Specification

- Don't add unnecessary constraints
- Avoid redundant instructions
- Trust the model's capabilities

#### Under-Specification

- Don't assume the model knows your context
- Always define the output format
- Specify the level of detail needed

#### Poor Examples

- Don't use examples that don't match your use case
- Avoid examples that are too simple or too complex
- Ensure examples demonstrate the quality you expect

#### Ignoring Context Limits

- Don't include irrelevant background information
- Avoid verbose explanations when concise ones suffice
- Remember that longer ≠ better

### Quality Checklist

Before finalizing a prompt, ask:

- [ ] Is the **ASK** clear and specific?
- [ ] Have I provided necessary **CONTEXT**?
- [ ] Are **CONSTRAINTS** explicit and non-contradictory?
- [ ] Have I included a relevant **EXAMPLE**?
- [ ] Is **STYLE** specified when tone, length, or complexity matters?
- [ ] Is the prompt formatted with bullet points?
- [ ] Have I removed redundancy and verbosity?
- [ ] Is the output format clearly defined?
- [ ] Have I specified the target audience?
- [ ] Have I avoided sensitive or ambiguous language?
- [ ] Can this prompt be reused or adapted?
- [ ] Is the prompt as concise as possible while remaining clear?

---

## Conclusion

Effective prompt engineering combines structure (MPF), clarity (formatting), guidance (examples), and efficiency (context management). By applying these principles systematically, you can:

- Achieve more consistent, high-quality AI outputs
- Reduce trial-and-error iterations
- Create maintainable, reusable prompts
- Collaborate effectively with team members
- Optimize costs and performance

PromptSmith embodies these principles in its analysis and refinement system, helping users learn and apply best practices automatically.

---

## References

- Markdown Prompts Framework (MPF) - CodeSignal
- PromptSmith Rule Set (25 Rules) - [docs/rules.md](./rules.md)
- System Architecture - [docs/system.md](./system.md)
- Lesson Materials:
  - Mastering Consistent Formatting and Organization
  - Crafting Effective Examples for LLM Prompting
  - Context Limits and Their Impact on Prompt Engineering
  - Mastering the Art of Style in AI Prompting
