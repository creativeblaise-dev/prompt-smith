---
description: Commit recent implementation with comprehensive checks
argument-hint: [feature-name]
---

# Commit Implementation

## Purpose

Safely commit recent implementation work with comprehensive validation checks and user confirmation before pushing to master.

## Usage

```
@commit-implementation rule-engine
@commit-implementation ui-components
@commit-implementation ai-refinement
```

## Pre-Commit Validation Checklist

### 1. Security & Safety Checks

**Run Safety Check:**
```bash
@safety-check
```
- ✅ Must pass security scan
- ✅ No sensitive data exposed
- ✅ No critical vulnerabilities
- ❌ BLOCK if critical security issues found

### 2. Code Quality Checks

**TypeScript Compilation:**
```bash
npx tsc --noEmit
```
- ✅ Must pass with zero errors
- ❌ Stop if compilation fails

**Build Verification:**
```bash
npm run build
```
- ✅ Must build successfully
- ❌ Stop if build fails

**Linting:**
```bash
npm run lint
```
- ✅ Must pass with no errors/warnings
- ❌ Stop if linting fails

### 3. File Structure Validation

**Required Files Present:**
- ✅ All planned files created
- ✅ No missing implementations
- ✅ Package.json dependencies updated

**Clean Working Directory:**
- ✅ No untracked sensitive files (.env, secrets)
- ✅ No build artifacts in git
- ✅ No temporary files

### 4. Implementation Completeness

**Tasks Status:**
- ✅ All tasks marked as completed in tasks.md
- ✅ Implementation summary added
- ✅ Validation results documented

**Documentation Updated:**
- ✅ DEVLOG.md updated with progress
- ✅ README.md reflects new features (if needed)
- ✅ API documentation current

## Commit Process

### 1. Stage Changes
```bash
git add .
```

### 2. Generate Commit Message

**Format:**
```
feat: implement [feature-name]

- [Key achievement 1]
- [Key achievement 2]
- [Key achievement 3]

Validation:
- ✅ Security: Clean
- ✅ TypeScript: No errors
- ✅ Build: Successful
- ✅ Lint: Clean
- ✅ Tests: [status]

Next: [next sprint/phase]
```

**Example:**
```
feat: implement rule engine and analysis system

- Add 25 prompt analysis rules across 5 categories
- Implement async scoring engine with error handling
- Create REST API endpoint with validation
- Add comprehensive TypeScript types and schemas

Validation:
- ✅ Security: Clean
- ✅ TypeScript: No errors
- ✅ Build: Successful
- ✅ Lint: Clean
- ✅ API: Functional

Next: Sprint 3 (AI refinement) or Sprint 4 (UI components)
```

### 3. Commit Locally
```bash
git commit -m "[generated message]"
```

### 4. Pre-Push Verification

**Final Checks:**
- ✅ Commit message is descriptive
- ✅ All validations passed
- ✅ No sensitive data committed
- ✅ Branch is clean and ready

**Show Commit Summary:**
```bash
git log --oneline -1
git diff --stat HEAD~1
```

### 5. User Confirmation

**Prompt User:**
```
🚀 Ready to push to master:

Commit: [commit hash] [commit message]
Files changed: [X] files, [Y] insertions, [Z] deletions

Validation Results:
✅ Security: Clean
✅ TypeScript: Clean
✅ Build: Success
✅ Lint: Clean
✅ Implementation: Complete

Push to master? (y/N):
```

**Wait for explicit confirmation before pushing**

### 6. Push to Master
```bash
# Only if user confirms with 'y' or 'yes'
git push origin master
```

## Error Handling

**Validation Failures:**
- Stop process immediately
- Show clear error message
- Suggest fix commands
- Don't commit until resolved

**Git Issues:**
- Check for merge conflicts
- Verify remote connection
- Handle authentication issues
- Provide clear error messages

**User Cancellation:**
- Respect user decision
- Keep local commit
- Explain how to push later manually

## Safety Features

**Never Auto-Push:**
- Always require explicit user confirmation
- Show exactly what will be pushed
- Allow user to review changes first

**Rollback Capability:**
- Keep local commit even if push fails
- Provide rollback instructions if needed
- Don't lose work on errors

**Sensitive Data Protection:**
- Check for .env files
- Scan for API keys in code
- Warn about potential secrets
- Block commit if sensitive data found

## Output Format

**Success:**
```
✅ Implementation committed successfully!

Commit: abc1234 feat: implement [feature-name]
Status: Pushed to master
Files: [X] changed, [Y] insertions, [Z] deletions

Next Steps:
- Update project board
- Begin next sprint phase
- Document lessons learned
```

**Failure:**
```
❌ Commit blocked - validation failed

Issues found:
- TypeScript errors: [X]
- Build failures: [Y]
- Lint warnings: [Z]

Fix these issues and run @commit-implementation again.
```

## Notes

- Run this ONLY after implementation is complete and tested
- Always review changes before confirming push
- Use descriptive feature names for better commit history
- This replaces manual git commands for implementation commits
