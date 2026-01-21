# 🗂️ PromptSmith (PRT) — Sprint Plan & Task Checklist

## 🧭 Sprint 0 — Project Setup & Alignment (½–1 day)

**Goal:** Lock direction, avoid rethinking later.

### Tasks

- [ ]  Create GitHub repository
- [ ]  Add project name, description, license
- [ ]  Commit the Hackathon Development Document
- [ ]  Create folder structure:
    
    ```
    /docs
      ├─ PRD.md
      ├─ DEVLOG.md
      ├─ RULES.md
    /app
    /lib
    /components
    
    ```
    
- [ ]  Add basic README (placeholder)

**Deliverable:**

Repo exists, structure is clear, no ambiguity about what you’re building.

---

## 🧠 Sprint 1 — Product Spec & Rules Definition (Day 1)

**Goal:** Define *what “good prompting” means* in PromptSmith.

### Tasks

- [ ]  Finalize **Prompt Quality Categories**
    - Clarity
    - Context
    - Instructions & Constraints
    - Output Format
    - Verification & Quality
    - Safety & Privacy
- [ ]  Define **scoring model**
    - Total = 100 points
    - Category weights
- [ ]  Write **20–25 concrete rules**
    - Each rule has:
        - id
        - category
        - description
        - severity
        - score impact
        - suggested fix
- [ ]  Write sample “bad” vs “good” prompts for testing

**Deliverables:**

- `/docs/RULES.md`
- `/docs/PRD.md` (problem → solution → scope)

> ⚠️ This sprint is critical. Good rules = good product.
> 

---

## ⚙️ Sprint 2 — Rule Engine & Scoring Logic (Day 2)

**Goal:** Turn rules into a working analysis engine.

### Tasks

- [ ]  Define Zod schemas for:
    - Prompt input
    - Rule
    - Rule finding
    - Score breakdown
- [ ]  Implement rule evaluation logic
- [ ]  Generate findings per rule
- [ ]  Compute:
    - category scores
    - total score
- [ ]  Return structured analysis object

**Deliverable:**

- Raw prompt → structured JSON analysis

> No AI yet. This should work deterministically.
> 

---

## 🤖 Sprint 3 — AI-Assisted Prompt Refinement (Day 3)

**Goal:** Use AI *intentionally*, not magically.

### Tasks

- [ ]  Design **refinement prompt template**
    - Input: raw prompt + findings
    - Output:
        - refined prompt
        - explanation of changes
- [ ]  Add Zod validation for AI output
- [ ]  Handle edge cases (empty prompt, very short prompt)
- [ ]  Compare raw vs refined score

**Deliverable:**

- Raw prompt → refined prompt + explanation + improved score

> This is where Kiro usage shines.
> 

---

## 🖥️ Sprint 4 — Web App Core UI (Day 4)

**Goal:** Make it usable by anyone, not just developers.

### Tasks

- [ ]  Prompt input textarea
- [ ]  “Analyze & Refine” button
- [ ]  Results layout:
    - Score indicator
    - Findings checklist
    - Refined prompt output
- [ ]  Loading & error states
- [ ]  Clean, distraction-free UI

**Deliverable:**

- End-to-end flow works in browser

---

## 🔍 Sprint 5 — Comparison & UX Polish (Day 5)

**Goal:** Make improvement obvious and satisfying.

### Tasks

- [ ]  Before vs After prompt view
- [ ]  Highlighted changes (simple diff is fine)
- [ ]  Score comparison (e.g. 42 → 88)
- [ ]  Category-level score display
- [ ]  Copy refined prompt button

**Deliverable:**

- “Wow moment” for users and judges

---

## 🧪 Sprint 6 — Real-World Scenarios & Testing (Day 6)

**Goal:** Prove usefulness with real prompts.

### Tasks

- [ ]  Prepare 3–5 real prompts:
    - Dev task
    - Writing task
    - Instructional task
- [ ]  Run them through PromptSmith
- [ ]  Adjust rules if feedback feels off
- [ ]  Improve explanations clarity

**Deliverable:**

- Demo-ready examples that *feel real*

---

## 📓 Sprint 7 — Documentation & DEVLOG (Day 7)

**Goal:** Maximize hackathon scoring.

### Tasks

- [ ]  Finalize README:
    - Problem
    - Solution
    - How it works
    - Screenshots
- [ ]  Write DEVLOG:
    - How Kiro was used at each stage
    - Key prompts used in development
    - Decisions influenced by AI
- [ ]  Add setup instructions

**Deliverables:**

- README.md
- `/docs/DEVLOG.md`

> This sprint alone can separate you from average submissions.
> 

---

## 🎥 Sprint 8 — Demo Video & Submission (Day 8)

**Goal:** Tell the story clearly in <3 minutes.

### Tasks

- [ ]  Script demo:
    1. Problem
    2. Bad prompt
    3. PromptSmith refinement
    4. Score improvement
    5. Outcome
- [ ]  Screen record demo
- [ ]  Upload demo video
- [ ]  Final repo cleanup
- [ ]  Submit to hackathon

**Deliverable:**

Submission complete, stress-free.

---

# 🧩 Optional Sprint (ONLY if time remains)

### CLI or IDE teaser

- [ ]  Simple CLI wrapper OR
- [ ]  Mock VS Code integration (even screenshots)

⚠️ Optional — don’t jeopardize core quality.

---

## ✅ Definition of “Done” (important)

PromptSmith is **done** when:

- A user pastes a bad prompt
- Understands *why* it’s bad
- Sees how to improve it
- Gets a better prompt with confidence

Anything beyond that is a bonus.