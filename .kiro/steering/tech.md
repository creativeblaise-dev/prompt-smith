# Technical Architecture

## Technology Stack

### Frontend

- **React** - UI component library
- **Next.js** - React framework with SSR/SSG capabilities
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Tailwind CSS** (recommended) - Utility-first CSS for rapid UI development

### Backend / Logic

- **Next.js API Routes** - Serverless API endpoints
- **AI Integration** - Prompt analysis and refinement using AI models
- **Rule Evaluation Engine** - Custom logic for analyzing prompts against best practices

### Validation & Structure

- **Zod** - TypeScript-first schema validation for:
  - Rule definitions
  - Analysis output
  - Refinement results
  - API request/response validation

### Storage (Lightweight)

- **Browser LocalStorage** - Client-side persistence for sessions (no accounts required)
- Optional: Simple file-based storage for demo purposes

### Development Tools

- **Node.js** (v18+) - JavaScript runtime
- **npm/yarn/pnpm** - Package management
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Kiro IDE** - Primary development environment

## Architecture Overview

### High-Level Components

```
┌─────────────────────────────────────────┐
│         Web Application (Next.js)        │
├─────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────┐ │
│  │   UI Layer   │  │  API Routes     │ │
│  │  (React/TS)  │  │  (Serverless)   │ │
│  └──────────────┘  └─────────────────┘ │
│         │                   │           │
│         └───────┬───────────┘           │
│                 │                       │
│  ┌──────────────▼──────────────┐       │
│  │   Rule Evaluation Engine    │       │
│  │  (Prompt Analysis Logic)    │       │
│  └──────────────┬──────────────┘       │
│                 │                       │
│  ┌──────────────▼──────────────┐       │
│  │   AI Refinement Service     │       │
│  │  (Prompt Improvement)       │       │
│  └─────────────────────────────┘       │
└─────────────────────────────────────────┘
```

### Data Flow

1. User inputs prompt in UI
2. Frontend sends prompt to API route
3. Rule engine analyzes prompt against best practices
4. AI service generates refined version
5. Results (findings, score, refined prompt) returned to UI
6. User views comparison and exports refined prompt

## Development Environment

### Required Tools

- Node.js v18+ and npm/yarn/pnpm
- Git for version control
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Kiro IDE for AI-assisted development

### Setup Instructions

```bash
# Clone repository
git clone <repo-url>
cd prompt-smith

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to localhost:3000
```

### Environment Variables

```
# .env.local
OPENAI_API_KEY=<your-key>  # or other AI provider
NODE_ENV=development
```

## Code Standards

### TypeScript

- Strict mode enabled
- Explicit return types for functions
- No `any` types (use `unknown` if needed)
- Interfaces for object shapes, types for unions/primitives

### React/Next.js

- Functional components with hooks
- Server components by default (Next.js 13+ App Router)
- Client components only when needed (interactivity, browser APIs)
- Consistent file naming: `kebab-case.tsx`

### Code Style

- ESLint + Prettier for consistent formatting
- 2-space indentation
- Single quotes for strings
- Trailing commas in multi-line structures
- Meaningful variable and function names

### Component Organization

- One component per file
- Co-locate related components in feature folders
- Separate business logic from presentation
- Use custom hooks for reusable logic

## Testing Strategy

### Hackathon Scope (Minimal)

- Manual testing of core workflows
- Validation of Zod schemas
- Basic error handling verification

### Post-Hackathon (Future)

- Unit tests with Jest/Vitest
- Component tests with React Testing Library
- E2E tests with Playwright
- Schema validation tests
- Rule engine logic tests

## Deployment Process

### Hackathon Deployment

- **Vercel** (recommended) - Zero-config Next.js deployment
  - Connect GitHub repository
  - Automatic deployments on push
  - Environment variables via dashboard
  - Free tier sufficient for demo

### Alternative Options

- Netlify
- Railway
- Self-hosted with Docker

### Deployment Steps

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy (automatic)
5. Share demo URL

## Performance Requirements

### Hackathon Scope

- Prompt analysis: < 3 seconds
- UI responsiveness: Immediate feedback
- Page load: < 2 seconds
- Support for prompts up to 10,000 characters

### Optimization Strategies

- Server-side rendering for initial load
- Client-side caching of analysis results
- Lazy loading of non-critical components
- Efficient AI API usage (batching if needed)

## Security Considerations

### Data Privacy

- No user accounts or authentication required
- No persistent storage of user prompts on server
- Client-side storage only (user's browser)
- Clear privacy messaging in UI

### API Security

- Rate limiting on API routes
- Input validation with Zod schemas
- Sanitization of user inputs
- Secure environment variable handling

### AI Safety

- Content filtering for inappropriate prompts
- Clear terms of use
- No storage of sensitive information
- Responsible AI usage guidelines

### Hackathon Context

- Focus on functionality over enterprise security
- Document security considerations for future
- Implement basic protections (validation, sanitization)
- No payment processing or sensitive data handling
