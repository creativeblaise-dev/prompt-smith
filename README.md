# PromptSmith (PRT) - AI Prompt Refinement Tool

**Dynamous × Kiro Hackathon Project**  
_January 21-23, 2026_

---

## Overview

PromptSmith is a prompt analysis and refinement tool that helps users systematically improve the quality of AI prompts before execution. It treats prompts as first-class artifacts (like code) that can be analyzed, linted, scored, refined, and iterated on using clear rules and best practices.

### The Problem

When AI prompts produce poor or inconsistent results, users often:

- Don't understand **why** the output failed
- Can't tell whether the prompt follows best practices
- Repeatedly rewrite prompts without structured feedback
- Waste time due to unclear guidance

### The Solution

PromptSmith provides:

- **Rule-based analysis** against 25 best-practice rules across 5 categories
- **Quality scoring** (0-100) with category-level breakdowns
- **Actionable feedback** with specific suggestions for improvement
- **AI-assisted refinement** that preserves intent while fixing issues
- **Before/after comparison** to visualize improvements

---

## Features

### Core MVP Features

1. **Prompt Input & Analysis**
   - Paste or write raw prompts for evaluation
   - Real-time analysis against 25 rules

2. **Rule-Based Linting**
   - Category A: Clarity & Intent (5 rules)
   - Category B: Context & Inputs (5 rules)
   - Category C: Instructions & Constraints (5 rules)
   - Category D: Output Format & Verification (5 rules)
   - Category E: Safety, Privacy & Robustness (5 rules)

3. **Quality Scoring**
   - Overall score (0-100)
   - Category-level sub-scores
   - Quality tier assignment (Excellent/Good/Fair/Poor/Critical)

4. **AI-Assisted Refinement**
   - Generate improved versions with explanations
   - Preserve original intent
   - Apply fixes based on rule findings

5. **Before/After Comparison**
   - Side-by-side view
   - Highlighted differences
   - Score improvement metrics

6. **Export & Reuse**
   - Copy refined prompt
   - Download functionality
   - Local session storage

---

## Tech Stack

- **Frontend**: React + Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Validation**: Zod schemas
- **AI Integration**: OpenAI API (or similar)
- **Storage**: Browser LocalStorage (no backend persistence)
- **Deployment**: Vercel

---

## Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Modern web browser
- AI API key (OpenAI, Anthropic, etc.)

---

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd prompt-smith
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local and add your AI API key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
prompt-smith/
├── .kiro/                      # Kiro CLI configuration
│   ├── prompts/                # Custom development prompts
│   ├── specs/                  # Feature specifications
│   └── steering/               # Project knowledge documents
├── .agents/                    # Implementation plans
│   └── plans/
├── docs/                       # Documentation
│   ├── DEVLOG.md              # Development log (hackathon requirement)
│   ├── rules.md               # 25-rule specification
│   └── system.md              # System architecture blueprint
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── page.tsx           # Home page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   ├── lib/                   # Core business logic
│   │   ├── rules/             # Rule definitions
│   │   ├── engine/            # Analysis engine
│   │   ├── schemas/           # Zod schemas
│   │   └── utils/             # Utilities
│   └── types/                 # TypeScript types
├── public/                    # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## Development Workflow

This project was built using **Kiro CLI** with a spec-driven development approach:

1. **@quickstart** - Initial project setup and configuration
2. **@prime** - Load project context
3. **@plan-feature** - Create detailed implementation plans
4. **@execute** - Implement features systematically
5. **@code-review** - Maintain code quality

See `docs/DEVLOG.md` for detailed development timeline and decisions.

---

## Rule Set

PromptSmith evaluates prompts against **25 rules** across **5 categories**:

### Category A: Clarity & Intent

- R1: Explicit Role Defined (±4)
- R2: Clear Primary Goal (±5)
- R3: Scope Is Explicit (±4)
- R4: Target Audience Specified (±3)
- R5: Ambiguous Language Avoided (±4)

### Category B: Context & Inputs

- R6: Relevant Background Provided (±5)
- R7: Inputs Clearly Defined (±4)
- R8: Assumptions Are Declared (±3)
- R9: Constraints Are Contextualized (±3)
- R10: No Contradictory Instructions (±5)

### Category C: Instructions & Constraints

- R11: Step-by-Step Instructions Where Needed (±4)
- R12: Explicit Constraints Listed (±4)
- R13: Priority Order Defined (±3)
- R14: Desired Depth or Detail Specified (±4)
- R15: Edge Cases or Exceptions Mentioned (±3)

### Category D: Output Format & Verification

- R16: Output Format Explicitly Defined (±5)
- R17: Structured Output Requested Where Appropriate (±4)
- R18: Examples Provided (Few-Shot) (±4)
- R19: Acceptance Criteria Defined (±4)
- R20: Self-Verification Requested (±3)

### Category E: Safety, Privacy & Robustness

- R21: Sensitive Data Avoided (±5)
- R22: Ethical or Harmful Requests Avoided (±5)
- R23: Tool or Capability Limits Acknowledged (±3)
- R24: Over-Specification Avoided (±2)
- R25: Prompt Is Reusable (±3)

**Total Possible Score**: 100 points

See `docs/rules.md` for complete rule definitions.

---

## Architecture

### System Components

1. **Rule Engine** - Pattern matching and rule evaluation
2. **Scoring System** - Calculate quality scores
3. **Analysis Engine** - Orchestrate rule evaluation
4. **AI Refinement Service** - Generate improved prompts
5. **Comparison System** - Visualize before/after differences

See `docs/system.md` for detailed architecture blueprint.

---

## Testing

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables

```bash
OPENAI_API_KEY=your_api_key_here
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## Hackathon Submission

### Required Documentation

- ✅ **README.md** - This file
- ✅ **DEVLOG.md** - Development timeline and decisions
- ✅ **.kiro/** - Custom prompts and steering documents
- ⏳ **Demo Video** - 2-3 minute demonstration (TBD)

### Judging Criteria (100 points)

- **Application Quality** (40 pts) - Functionality, value, code quality
- **Kiro CLI Usage** (20 pts) - Effective use of features
- **Documentation** (20 pts) - Completeness and clarity
- **Innovation** (15 pts) - Uniqueness and creativity
- **Presentation** (5 pts) - Demo video and README

---

## Contributing

This is a hackathon project. Contributions are welcome after the competition ends.

---

## License

MIT License - See LICENSE file for details

---

## Acknowledgments

- Built for the **Dynamous × Kiro Hackathon** (January 2026)
- Developed using **Kiro CLI** for AI-assisted development
- Inspired by the need for systematic prompt quality improvement

---

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Kiro CLI**
