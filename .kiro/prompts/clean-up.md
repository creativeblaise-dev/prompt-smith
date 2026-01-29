# Clean-Up Prompt

**ASK**
Analyze the current workspace and identify files that serve no purpose in the PromptSmith project, then remove them to clean up the codebase.

**CONTEXT**
- This is a Next.js TypeScript project for prompt analysis and refinement
- Core functionality: 25-rule analysis engine, rule-based refinement, React UI
- Architecture: Self-contained, no external API dependencies
- Focus: Clean, minimal codebase for hackathon submission

**CONSTRAINTS**
- Only remove files that are genuinely unused or redundant
- Preserve all functional code, documentation, and configuration files
- Keep all files in .kiro/ directory (project steering and prompts)
- Maintain all working features and functionality
- Do not remove any files that might be needed for deployment or development

**ANALYSIS CRITERIA**
Files to consider for removal:
- Unused component files with no imports/references
- Empty or placeholder files with no content
- Duplicate files or outdated versions
- Test files that don't exist or aren't configured
- Build artifacts or temporary files
- Unused asset files
- Configuration files for tools not being used

Files to KEEP:
- All .kiro/ steering documents and prompts
- All documentation (README, DEVLOG, IMPROVEMENTS, etc.)
- All working components and API routes
- All configuration files (tsconfig, tailwind, next.config, etc.)
- Package.json and lock files
- All files in src/ that are actively used

**EXAMPLE**
Before cleanup:
```
src/
├── components/
│   ├── PromptAnalyzer.tsx    # KEEP - main component
│   └── unused-component.tsx  # REMOVE - not imported anywhere
├── lib/
│   ├── engine/analyzer.ts    # KEEP - core functionality
│   └── old-version.ts        # REMOVE - outdated duplicate
```

After cleanup:
```
src/
├── components/
│   └── PromptAnalyzer.tsx    # Clean, focused structure
├── lib/
│   └── engine/analyzer.ts
```

**VERIFICATION**
After cleanup:
- Run `npm run build` to ensure no broken imports
- Run `npx tsc --noEmit` to check TypeScript compilation
- Verify all core features still work (analyze, refine, UI)
- Confirm no missing dependencies or broken references
