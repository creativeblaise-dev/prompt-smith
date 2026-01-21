# PromptSmith (PRT) — V1 Rule Set (25 Rules)

## Category A: Clarity & Intent (5 rules)

### **R1. Explicit Role Defined**

**Description:**

The prompt clearly defines the role or perspective the AI should assume.

**Checks:**

- Looks for phrases like "You are a…", "Act as…", "Assume the role of…"

**Why it matters:**

Role definition strongly influences tone, depth, and accuracy.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"Explicitly define the role the AI should take."

---

### **R2. Clear Primary Goal**

**Description:**

The prompt states a single, clear primary objective.

**Checks:**

- Detects vague verbs ("help", "tell me about") without outcome
- Flags multiple competing goals

**Why it matters:**

Unclear goals lead to unfocused outputs.

**Score impact:** +5 / −5

**Severity:** High

**Suggested fix:**

"State exactly what outcome you want."

---

### **R3. Scope Is Explicit**

**Description:**

The prompt defines what is in scope and (optionally) out of scope.

**Checks:**

- Mentions limits, exclusions, or boundaries

**Why it matters:**

Prevents overengineering or irrelevant responses.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"Clarify what should and should not be included."

---

### **R4. Target Audience Specified**

**Description:**

The prompt specifies who the output is for.

**Checks:**

- Mentions audience (beginner, expert, user, stakeholder, etc.)

**Why it matters:**

Audience affects tone, complexity, and explanation depth.

**Score impact:** +3 / −3

**Severity:** Low

**Suggested fix:**

"Specify the intended audience."

---

### **R5. Ambiguous Language Avoided**

**Description:**

The prompt avoids vague or subjective terms without clarification.

**Checks:**

- Flags words like "nice", "simple", "fast", "best" without definition

**Why it matters:**

Ambiguity leads to unpredictable output.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"Replace vague terms with concrete criteria."

---

## Category B: Context & Inputs (5 rules)

### **R6. Relevant Background Provided**

**Description:**

The prompt includes necessary background information.

**Checks:**

- Mentions environment, domain, or prior state

**Why it matters:**

LLMs perform better with situational context.

**Score impact:** +5 / −5

**Severity:** High

**Suggested fix:**

"Add relevant background or constraints."

---

### **R7. Inputs Clearly Defined**

**Description:**

All required inputs are explicitly stated.

**Checks:**

- References to "this", "above", or missing data

**Why it matters:**

Missing inputs cause hallucination or assumptions.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"Explicitly list required inputs."

---

### **R8. Assumptions Are Declared**

**Description:**

The prompt clarifies assumptions instead of leaving them implicit.

**Checks:**

- Mentions defaults, versions, or assumed conditions

**Why it matters:**

Reduces incorrect assumptions by the AI.

**Score impact:** +3 / −3

**Severity:** Low

**Suggested fix:**

"State assumptions clearly."

---

### **R9. Constraints Are Contextualized**

**Description:**

Constraints are explained, not just listed.

**Checks:**

- Explains _why_ constraints exist

**Why it matters:**

Helps the model prioritize correctly.

**Score impact:** +3 / −3

**Severity:** Low

**Suggested fix:**

"Explain the reasoning behind constraints."

---

### **R10. No Contradictory Instructions**

**Description:**

The prompt does not contain conflicting directions.

**Checks:**

- Detects logical contradictions

**Why it matters:**

Conflicts confuse model behavior.

**Score impact:** +5 / −5

**Severity:** High

**Suggested fix:**

"Resolve or remove conflicting instructions."

---

## Category C: Instructions & Constraints (5 rules)

### **R11. Step-by-Step Instructions Where Needed**

**Description:**

Complex tasks are broken into steps.

**Checks:**

- Flags complex requests with no structure

**Why it matters:**

Improves reasoning and accuracy.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"Break the task into ordered steps."

---

### **R12. Explicit Constraints Listed**

**Description:**

The prompt explicitly lists constraints.

**Checks:**

- Time, length, tools, style, exclusions

**Why it matters:**

Guides output boundaries.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"List explicit constraints."

---

### **R13. Priority Order Defined**

**Description:**

If multiple instructions exist, priority is clear.

**Checks:**

- Looks for ordering language ("most important", "first")

**Why it matters:**

Prevents the model from guessing priorities.

**Score impact:** +3 / −3

**Severity:** Low

**Suggested fix:**

"Clarify priority of instructions."

---

### **R14. Desired Depth or Detail Specified**

**Description:**

The expected level of detail is stated.

**Checks:**

- Length, depth, or verbosity hints

**Why it matters:**

Avoids overly shallow or verbose responses.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"Specify the desired depth or length."

---

### **R15. Edge Cases or Exceptions Mentioned**

**Description:**

The prompt accounts for special cases.

**Checks:**

- Mentions edge cases or failure scenarios

**Why it matters:**

Improves robustness of output.

**Score impact:** +3 / −3

**Severity:** Low

**Suggested fix:**

"Mention edge cases or exceptions."

---

## Category D: Output Format & Verification (5 rules)

### **R16. Output Format Explicitly Defined**

**Description:**

The prompt specifies the output format.

**Checks:**

- Markdown, JSON, list, code block, etc.

**Why it matters:**

Prevents unusable outputs.

**Score impact:** +5 / −5

**Severity:** High

**Suggested fix:**

"Specify the output format."

---

### **R17. Structured Output Requested Where Appropriate**

**Description:**

Complex outputs request structure or schema.

**Checks:**

- Tables, bullet points, JSON keys

**Why it matters:**

Improves readability and reuse.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"Request structured output."

---

### **R18. Examples Provided (Few-Shot)**

**Description:**

The prompt includes examples when helpful.

**Checks:**

- Input/output examples

**Why it matters:**

Examples dramatically improve accuracy.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"Provide a short example."

---

### **R19. Acceptance Criteria Defined**

**Description:**

The prompt defines what success looks like.

**Checks:**

- "The output should…", "Must satisfy…"

**Why it matters:**

Enables evaluation of quality.

**Score impact:** +4 / −4

**Severity:** Medium

**Suggested fix:**

"Define acceptance criteria."

---

### **R20. Self-Verification Requested**

**Description:**

The prompt asks the AI to verify its output.

**Checks:**

- "Check your answer", "Validate assumptions"

**Why it matters:**

Reduces simple errors.

**Score impact:** +3 / −3

**Severity:** Low

**Suggested fix:**

"Ask the model to review its output."

---

## Category E: Safety, Privacy & Robustness (5 rules)

### **R21. Sensitive Data Avoided**

**Description:**

The prompt does not request or include sensitive data.

**Checks:**

- API keys, passwords, PII

**Why it matters:**

Security and compliance.

**Score impact:** +5 / −5

**Severity:** High

**Suggested fix:**

"Remove sensitive data."

---

### **R22. Ethical or Harmful Requests Avoided**

**Description:**

The prompt avoids unethical or harmful tasks.

**Checks:**

- Violence, fraud, misuse

**Why it matters:**

Responsible AI usage.

**Score impact:** +5 / −5

**Severity:** High

**Suggested fix:**

"Reframe the request safely."

---

### **R23. Tool or Capability Limits Acknowledged**

**Description:**

The prompt acknowledges model limitations.

**Checks:**

- Versioning, knowledge cutoff, capabilities

**Why it matters:**

Prevents unrealistic expectations.

**Score impact:** +3 / −3

**Severity:** Low

**Suggested fix:**

"Acknowledge tool limitations."

---

### **R24. Over-Specification Avoided**

**Description:**

The prompt avoids unnecessary verbosity.

**Checks:**

- Redundant or irrelevant instructions

**Why it matters:**

Over-specification can degrade output.

**Score impact:** +2 / −2

**Severity:** Low

**Suggested fix:**

"Simplify and remove redundancy."

---

### **R25. Prompt Is Reusable**

**Description:**

The prompt is written generically enough to reuse.

**Checks:**

- Hard-coded, one-off phrasing

**Why it matters:**

Reusable prompts save time long-term.

**Score impact:** +3 / −3

**Severity:** Low

**Suggested fix:**

"Generalize the prompt for reuse."

---

## ✅ Summary

- **Total rules:** 25
- **Total score:** 100 points
- **Design intent:**
  - Objective scoring
  - Explainable feedback
  - Applicable across domains
  - Hackathon-appropriate complexity

This rule set is:

- strong enough to impress judges
- realistic to implement before Jan 30
- useful beyond the hackathon
