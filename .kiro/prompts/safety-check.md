---
description: Run comprehensive safety checks before pushing to GitHub or production
---

# Safety Check

## Purpose

Perform comprehensive security and safety validation before pushing code to GitHub or deploying to production. Identifies vulnerabilities, sensitive data, and security misconfigurations.

## Usage

```
@safety-check
```

Run this before any push to GitHub or production deployment.

## Security Scan Categories

### 1. Sensitive Data Detection

**API Keys & Secrets:**
```bash
# Scan for common secret patterns
grep -r -i "api[_-]key\|secret\|password\|token" --include="*.ts" --include="*.js" --include="*.json" src/
```

**Environment Variables:**
- ✅ No hardcoded secrets in source code
- ✅ .env files in .gitignore
- ✅ .env.example exists with placeholder values
- ❌ BLOCK: Real secrets found in code

**Database Credentials:**
- ✅ No connection strings in source
- ✅ No database passwords hardcoded
- ❌ BLOCK: Database credentials exposed

### 2. File Security Audit

**Sensitive Files:**
```bash
# Check for files that shouldn't be committed
find . -name "*.env" -not -path "./node_modules/*"
find . -name "*.key" -not -path "./node_modules/*"
find . -name "*.pem" -not -path "./node_modules/*"
```

**Git Ignore Validation:**
- ✅ .env* files ignored
- ✅ node_modules ignored
- ✅ Build artifacts ignored
- ✅ IDE files ignored (.vscode, .idea)
- ❌ BLOCK: Sensitive files not ignored

### 3. Dependency Security

**Vulnerability Scan:**
```bash
npm audit --audit-level=moderate
```

**Package Analysis:**
- ✅ No high/critical vulnerabilities
- ✅ Dependencies up to date
- ✅ No suspicious packages
- ⚠️ WARN: Medium vulnerabilities found
- ❌ BLOCK: High/critical vulnerabilities

### 4. Code Security Patterns

**Dangerous Patterns:**
```bash
# Scan for security anti-patterns
grep -r "eval\|innerHTML\|dangerouslySetInnerHTML" --include="*.ts" --include="*.tsx" src/
```

**Security Issues:**
- ✅ No eval() usage
- ✅ No innerHTML assignments
- ✅ No dangerouslySetInnerHTML without sanitization
- ✅ No SQL injection patterns
- ❌ BLOCK: Dangerous patterns found

### 5. Configuration Security

**Next.js Security:**
- ✅ No debug mode in production
- ✅ Proper CORS configuration
- ✅ Security headers configured
- ✅ No exposed internal APIs

**Environment Configuration:**
- ✅ NODE_ENV properly set
- ✅ No development configs in production
- ✅ Proper error handling (no stack traces exposed)

## Safety Check Results

### 🟢 SAFE TO PUSH
```
✅ All security checks passed
✅ No sensitive data found
✅ No vulnerabilities detected
✅ Configuration secure

🚀 Safe to push to GitHub/production
```

### 🟡 WARNINGS FOUND
```
⚠️ Issues found - review recommended:

Warnings:
- Medium severity vulnerabilities: [X]
- Outdated dependencies: [Y]
- Missing security headers: [Z]

Recommendations:
- Run: npm audit fix
- Update dependencies: npm update
- Add security headers to next.config.js

Continue anyway? (y/N):
```

### 🔴 CRITICAL ISSUES - BLOCKED
```
❌ CRITICAL SECURITY ISSUES - PUSH BLOCKED

Critical Issues:
- API keys found in source code
- High severity vulnerabilities
- Sensitive files not ignored

MUST FIX BEFORE PUSHING:
```

## Issue Resolution Guide

### API Keys in Code
**Problem:** Hardcoded secrets found
**Solution:**
```bash
# Move to environment variables
echo "OPENAI_API_KEY=your_key_here" >> .env.local
echo ".env.local" >> .gitignore

# Update code to use process.env
const apiKey = process.env.OPENAI_API_KEY;
```

### Sensitive Files Exposed
**Problem:** .env or key files not ignored
**Solution:**
```bash
# Add to .gitignore
echo ".env*" >> .gitignore
echo "*.key" >> .gitignore
echo "*.pem" >> .gitignore

# Remove from git if already committed
git rm --cached .env
git commit -m "Remove sensitive files from git"
```

### High Severity Vulnerabilities
**Problem:** npm audit shows critical issues
**Solution:**
```bash
# Try automatic fix
npm audit fix

# If manual fix needed
npm audit fix --force

# Update specific packages
npm update [package-name]
```

### Missing Security Headers
**Problem:** No security headers configured
**Solution:**
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

### Dangerous Code Patterns
**Problem:** eval(), innerHTML, or injection risks
**Solution:**
```javascript
// ❌ Dangerous
element.innerHTML = userInput;
eval(userCode);

// ✅ Safe
element.textContent = userInput;
// Use proper parsing/validation instead of eval
```

## Production-Specific Checks

### Environment Variables
- ✅ All required env vars documented
- ✅ Production values different from development
- ✅ No debug flags enabled
- ✅ Proper error handling configured

### Build Security
- ✅ Source maps disabled in production
- ✅ Debug info stripped
- ✅ Minification enabled
- ✅ No development dependencies in production build

### API Security
- ✅ Rate limiting implemented
- ✅ Input validation on all endpoints
- ✅ Proper error responses (no internal details)
- ✅ Authentication/authorization where needed

## Automated Fixes

**Quick Fix Commands:**
```bash
# Fix common issues automatically
npm audit fix
echo ".env*" >> .gitignore
git rm --cached .env 2>/dev/null || true
npm update
```

**Security Headers Setup:**
```bash
# Add security headers to Next.js
cat >> next.config.js << 'EOF'
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
];
EOF
```

## Output Summary

**Safe Push:**
```
🛡️ Security Check Complete

✅ Sensitive Data: Clean
✅ Dependencies: Secure  
✅ Configuration: Safe
✅ Code Patterns: Secure

🚀 APPROVED: Safe to push to GitHub/production
```

**Blocked Push:**
```
🚨 Security Check Failed

❌ Critical Issues Found:
- [Issue 1]: [Description]
- [Issue 2]: [Description]

🛠️ Required Actions:
- [Fix 1]: [Command/solution]
- [Fix 2]: [Command/solution]

🚫 BLOCKED: Fix issues before pushing
```

## Notes

- Run this before every GitHub push
- MANDATORY before production deployments
- Blocks push on critical security issues
- Provides specific fix instructions
- Maintains security audit trail
