# Project Structure

## Directory Layout

```
prompt-smith/
├── .kiro/                          # Kiro IDE configuration
│   ├── steering/                   # Project knowledge documents
│   │   ├── product.md
│   │   ├── tech.md
│   │   └── structure.md
│   ├── prompts/                    # Custom Kiro prompts
│   └── agents/                     # Custom Kiro agents (if any)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── page.tsx                # Home page
│   │   ├── layout.tsx              # Root layout
│   │   ├── api/                    # API routes
│   │   │   ├── analyze/            # Prompt analysis endpoint
│   │   │   └── refine/             # Prompt refinement endpoint
│   │   └── globals.css             # Global styles
│   ├── components/                 # React components
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── textarea.tsx
│   │   ├── prompt-input.tsx        # Prompt input component
│   │   ├── analysis-results.tsx    # Analysis display
│   │   ├── score-display.tsx       # Score visualization
│   │   ├── comparison-view.tsx     # Before/after comparison
│   │   └── export-controls.tsx     # Export functionality
│   ├── lib/                        # Core business logic
│   │   ├── rules/                  # Rule definitions
│   │   │   ├── clarity-rules.ts
│   │   │   ├── context-rules.ts
│   │   │   ├── format-rules.ts
│   │   │   └── index.ts
│   │   ├── engine/                 # Rule evaluation engine
│   │   │   ├── analyzer.ts
│   │   │   ├── scorer.ts
│   │   │   └── refiner.ts
│   │   ├── schemas/                # Zod schemas
│   │   │   ├── prompt.ts
│   │   │   ├── analysis.ts
│   │   │   └── refinement.ts
│   │   └── utils/                  # Utility functions
│   │       ├── ai-client.ts
│   │       └── helpers.ts
│   └── types/                      # TypeScript type definitions
│       ├── prompt.ts
│       ├── rule.ts
│       └── analysis.ts
├── public/                         # Static assets
│   ├── favicon.ico
│   └── images/
├── docs/                           # Documentation
│   ├── DEVLOG.md                   # Hackathon development log
│   ├── RULES.md                    # Rule definitions reference
│   └── API.md                      # API documentation
├── examples/                       # Example prompts
│   ├── good-prompts/
│   └── bad-prompts/
├── .env.local                      # Environment variables (gitignored)
├── .env.example                    # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── eslint.config.js
├── prettier.config.js
└── README.md
```

## File Naming Conventions

### General Rules

- **Directories**: `kebab-case` (e.g., `prompt-input/`)
- **React Components**: `kebab-case.tsx` (e.g., `prompt-input.tsx`)
- **TypeScript Files**: `kebab-case.ts` (e.g., `ai-client.ts`)
- **Type Definitions**: `kebab-case.ts` in `types/` folder
- **API Routes**: `route.ts` (Next.js convention)

### Component Naming

- Component files: `kebab-case.tsx`
- Component exports: `PascalCase` (e.g., `PromptInput`)
- Hooks: `camelCase` with `use` prefix (e.g., `usePromptAnalysis`)

### Constants and Enums

- Constants: `UPPER_SNAKE_CASE`
- Enums: `PascalCase`

## Module Organization

### Feature-Based Organization

Components and logic are organized by feature/domain:

- `components/` - UI components grouped by purpose
- `lib/rules/` - Rule definitions by category
- `lib/engine/` - Core analysis and refinement logic
- `lib/schemas/` - Validation schemas

### Separation of Concerns

- **Presentation**: React components in `components/`
- **Business Logic**: Core logic in `lib/`
- **API Layer**: Next.js API routes in `app/api/`
- **Types**: Shared types in `types/`
- **Utilities**: Helper functions in `lib/utils/`

### Import Patterns

```typescript
// Absolute imports from src root
import { PromptInput } from "@/components/prompt-input";
import { analyzePrompt } from "@/lib/engine/analyzer";
import { PromptSchema } from "@/lib/schemas/prompt";
```

## Configuration Files

### Core Configuration

- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript compiler options
- **`next.config.js`** - Next.js configuration
- **`tailwind.config.js`** - Tailwind CSS customization
- **`eslint.config.js`** - Linting rules
- **`prettier.config.js`** - Code formatting rules

### Environment Configuration

- **`.env.local`** - Local environment variables (gitignored)
- **`.env.example`** - Template for required variables
- **`.env.production`** - Production variables (if needed)

### Kiro Configuration

- **`.kiro/steering/`** - Project knowledge documents
- **`.kiro/prompts/`** - Custom development prompts
- **`.kiro/agents/`** - Custom AI agents

## Documentation Structure

### Required Documentation

- **`README.md`** - Project overview, setup, usage
- **`docs/DEVLOG.md`** - Hackathon development log (required for submission)
- **`docs/RULES.md`** - Detailed rule definitions and rationale
- **`docs/API.md`** - API endpoint documentation

### Code Documentation

- JSDoc comments for public functions
- Inline comments for complex logic
- Type definitions serve as documentation

### Hackathon Documentation

- Clear setup instructions in README
- Comprehensive DEVLOG with timeline and decisions
- Demo video (2-3 minutes)

## Asset Organization

### Static Assets (`public/`)

- **`images/`** - UI images, logos, screenshots
- **`favicon.ico`** - Site favicon
- **`robots.txt`** - SEO configuration (if needed)

### Styling

- **`src/app/globals.css`** - Global styles and Tailwind imports
- Component-specific styles: Tailwind utility classes
- No separate CSS modules (use Tailwind)

## Build Artifacts

### Development

- **`.next/`** - Next.js build cache (gitignored)
- **`node_modules/`** - Dependencies (gitignored)

### Production

- **`.next/`** - Optimized production build
- **`out/`** - Static export (if using `next export`)

### Gitignore

```
.next/
node_modules/
.env.local
.DS_Store
*.log
```

## Environment-Specific Files

### Development

- `.env.local` - Local development variables
- `next.config.js` - Development-specific settings

### Production

- Environment variables set in Vercel dashboard
- Production optimizations in `next.config.js`

### Environment Variables

```bash
# .env.example
OPENAI_API_KEY=your_api_key_here
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Configuration Strategy

- Use `NEXT_PUBLIC_` prefix for client-side variables
- Keep sensitive keys server-side only
- Document all required variables in `.env.example`
- Never commit `.env.local` to version control
