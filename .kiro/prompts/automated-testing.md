---
description: Automated testing workflow with Kiro CLI integration
---

Create and run automated tests for PromptSmith with comprehensive validation.

## Testing Strategy

### 1. Rule Engine Testing
- Test all 25 rules with sample prompts
- Validate scoring calculations
- Check edge cases and error handling

### 2. API Endpoint Testing
- Test /api/analyze endpoint
- Test /api/variations endpoint
- Test /api/refine endpoint
- Validate request/response schemas

### 3. Component Testing
- Test core React components
- Validate user interactions
- Check accessibility compliance

## Implementation

### Create Test Files
```bash
# Create test directory structure
mkdir -p src/__tests__/{rules,api,components}

# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Test Configuration
Create `jest.config.js`:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

### Run Tests
```bash
npm test
```

## Validation Checklist

- [ ] All rule tests pass
- [ ] API endpoints return correct schemas
- [ ] Components render without errors
- [ ] Build succeeds after tests
- [ ] Coverage reports generated

## Success Criteria

- 100% rule coverage
- All API endpoints tested
- Core components validated
- Zero test failures
- Clean build after testing
