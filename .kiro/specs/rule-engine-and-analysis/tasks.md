# Tasks: Rule Engine and Prompt Analysis System

**Feature**: Core rule-based prompt analysis engine
**Status**: ✅ COMPLETED
**Estimated Total Effort**: 8-12 hours

---

## Task Breakdown

### Phase 1: Foundation & Type System

- [x] 1. Set up type definitions and schemas
  - [x] 1.1 Create `src/types/rule.ts` with Rule, RuleCategory, Severity types
  - [x] 1.2 Create `src/types/analysis.ts` with Finding, AnalysisResult, CategoryScore types
  - [x] 1.3 Create `src/lib/schemas/prompt.ts` with PromptInputSchema
  - [x] 1.4 Create `src/lib/schemas/analysis.ts` with FindingSchema and AnalysisResultSchema
  - [x] 1.5 Verify all types compile without errors

### Phase 2: Rule Definitions

- [x] 2. Implement Category A rules (Clarity & Intent)
  - [x] 2.1 Create `src/lib/rules/clarity-rules.ts`
  - [x] 2.2 Implement R1: Explicit Role Defined
  - [x] 2.3 Implement R2: Clear Primary Goal
  - [x] 2.4 Implement R3: Scope Is Explicit
  - [x] 2.5 Implement R4: Target Audience Specified
  - [x] 2.6 Implement R5: Ambiguous Language Avoided

- [x] 3. Implement Category B rules (Context & Inputs)
  - [x] 3.1 Create `src/lib/rules/context-rules.ts`
  - [x] 3.2 Implement R6: Relevant Background Provided
  - [x] 3.3 Implement R7: Inputs Clearly Defined
  - [x] 3.4 Implement R8: Assumptions Are Declared
  - [x] 3.5 Implement R9: Constraints Are Contextualized
  - [x] 3.6 Implement R10: No Contradictory Instructions

- [x] 4. Implement Category C rules (Instructions & Constraints)
  - [x] 4.1 Create `src/lib/rules/instruction-rules.ts`
  - [x] 4.2 Implement R11: Step-by-Step Instructions Where Needed
  - [x] 4.3 Implement R12: Explicit Constraints Listed
  - [x] 4.4 Implement R13: Priority Order Defined
  - [x] 4.5 Implement R14: Desired Depth or Detail Specified
  - [x] 4.6 Implement R15: Edge Cases or Exceptions Mentioned

- [x] 5. Implement Category D rules (Output Format & Verification)
  - [x] 5.1 Create `src/lib/rules/format-rules.ts`
  - [x] 5.2 Implement R16: Output Format Explicitly Defined
  - [x] 5.3 Implement R17: Structured Output Requested Where Appropriate
  - [x] 5.4 Implement R18: Examples Provided (Few-Shot)
  - [x] 5.5 Implement R19: Acceptance Criteria Defined
  - [x] 5.6 Implement R20: Self-Verification Requested

- [x] 6. Implement Category E rules (Safety, Privacy & Robustness)
  - [x] 6.1 Create `src/lib/rules/safety-rules.ts`
  - [x] 6.2 Implement R21: Sensitive Data Avoided
  - [x] 6.3 Implement R22: Ethical or Harmful Requests Avoided
  - [x] 6.4 Implement R23: Tool or Capability Limits Acknowledged
  - [x] 6.5 Implement R24: Over-Specification Avoided
  - [x] 6.6 Implement R25: Prompt Is Reusable

- [x] 7. Create rule index and exports
  - [x] 7.1 Create `src/lib/rules/index.ts`
  - [x] 7.2 Export getAllRules() function
  - [x] 7.3 Export getRulesByCategory() function
  - [x] 7.4 Verify all 25 rules are exported correctly

### Phase 3: Analysis Engine

- [x] 8. Implement scoring engine
  - [x] 8.1 Create `src/lib/engine/scorer.ts`
  - [x] 8.2 Implement calculateScores() function
  - [x] 8.3 Implement calculateCategoryScores() helper
  - [x] 8.4 Implement getQualityTier() function
  - [x] 8.5 Add unit tests for scoring logic

- [x] 9. Implement analyzer class
  - [x] 9.1 Create `src/lib/engine/analyzer.ts`
  - [x] 9.2 Implement PromptAnalyzer class constructor
  - [x] 9.3 Implement analyze() method
  - [x] 9.4 Implement evaluateRules() private method
  - [x] 9.5 Implement evaluateRule() private method
  - [x] 9.6 Implement generateSummary() private method
  - [x] 9.7 Add error handling for rule evaluation failures

### Phase 4: API Integration

- [x] 10. Create API endpoint
  - [x] 10.1 Create `src/app/api/analyze/route.ts`
  - [x] 10.2 Implement POST handler
  - [x] 10.3 Add request validation with Zod
  - [x] 10.4 Add response validation with Zod
  - [x] 10.5 Implement error handling (400, 500)
  - [x] 10.6 Add CORS headers if needed

### Phase 5: Unit Testing

- [x] 11. Write unit tests for rules
  - [x] 11.1 Create `tests/rules/clarity-rules.test.ts`
  - [x] 11.2 Create `tests/rules/context-rules.test.ts`
  - [x] 11.3 Create `tests/rules/instruction-rules.test.ts`
  - [x] 11.4 Create `tests/rules/format-rules.test.ts`
  - [x] 11.5 Create `tests/rules/safety-rules.test.ts`
  - [x] 11.6 Test each rule with positive and negative cases
  - [x] 11.7 Test edge cases (empty, very long, special chars)

- [x] 12. Write unit tests for engine
  - [x] 12.1 Create `tests/engine/scorer.test.ts`
  - [x] 12.2 Test score calculation algorithm
  - [x] 12.3 Test score clamping (0-100)
  - [x] 12.4 Test category score calculation
  - [x] 12.5 Test quality tier assignment
  - [x] 12.6 Create `tests/engine/analyzer.test.ts`
  - [x] 12.7 Test end-to-end analysis flow
  - [x] 12.8 Test finding generation
  - [x] 12.9 Test summary calculation
  - [x] 12.10 Test error handling

### Phase 6: Property-Based Testing

- [x] 13. Set up property-based testing
  - [x] 13.1 Install fast-check: `npm install --save-dev fast-check @types/fast-check`
  - [x] 13.2 Create `tests/properties/analyzer.properties.test.ts`
  - [x] 13.3 Set up test file structure with vitest

- [x] 14. Write Property 1: Score Bounds
  - [x] 14.1 Implement property test for score range [0, 100]
  - [x] 14.2 Run test with 1000+ random inputs
  - [x] 14.3 Verify property holds for all inputs

- [x] 15. Write Property 2: Finding Count Consistency
  - [x] 15.1 Implement property test for finding count = 25
  - [x] 15.2 Verify passed + failed = total
  - [x] 15.3 Run test with 1000+ random inputs

- [x] 16. Write Property 3: Score Calculation Correctness
  - [x] 16.1 Implement property test for score algorithm
  - [x] 16.2 Verify calculated score matches expected
  - [x] 16.3 Run test with 1000+ random inputs

- [x] 17. Write Property 4: Quality Tier Consistency
  - [x] 17.1 Implement property test for tier assignment
  - [x] 17.2 Verify tier matches score range
  - [x] 17.3 Run test with 1000+ random inputs

- [x] 18. Write Property 5: Category Score Independence
  - [x] 18.1 Implement property test for category isolation
  - [x] 18.2 Verify each category only uses its own rules
  - [x] 18.3 Run test with 1000+ random inputs

- [x] 19. Write Property 6: Severity Classification Consistency
  - [x] 19.1 Implement property test for severity counts
  - [x] 19.2 Verify summary matches actual findings
  - [x] 19.3 Run test with 1000+ random inputs

- [x] 20. Write Property 7: Idempotence
  - [x] 20.1 Implement property test for deterministic analysis
  - [x] 20.2 Verify same prompt produces same results
  - [x] 20.3 Run test with 1000+ random inputs

- [x] 21. Write Property 8: Schema Validation
  - [x] 21.1 Implement property test for Zod validation
  - [x] 21.2 Verify all outputs pass schema validation
  - [x] 21.3 Run test with 1000+ random inputs

### Phase 7: Integration & Example Testing

- [x] 22. Write integration tests for API
  - [x] 22.1 Create `tests/api/analyze.test.ts`
  - [x] 22.2 Test POST /api/analyze with valid input
  - [x] 22.3 Test response format matches schema
  - [x] 22.4 Test with includePassedRules option
  - [x] 22.5 Test error responses (400 for invalid input)
  - [x] 22.6 Test error responses (500 for server errors)

- [x] 23. Write example-based tests
  - [x] 23.1 Create `tests/examples/good-prompts.test.ts`
  - [x] 23.2 Test well-structured MPF prompt (should score > 75)
  - [x] 23.3 Test comprehensive prompt with all sections
  - [x] 23.4 Create `tests/examples/bad-prompts.test.ts`
  - [x] 23.5 Test minimal prompt (should score < 50)
  - [x] 23.6 Test vague prompt with no structure
  - [x] 23.7 Create `tests/examples/edge-cases.test.ts`
  - [x] 23.8 Test empty prompt
  - [x] 23.9 Test very long prompt (10,000 chars)
  - [x] 23.10 Test prompt with special characters

### Phase 8: Performance Testing & Optimization

- [x] 24. Write performance tests
  - [x] 24.1 Create `tests/performance/analyzer.perf.test.ts`
  - [x] 24.2 Test 1000-char prompt completes in < 100ms
  - [x] 24.3 Test 10000-char prompt completes in < 1000ms
  - [x] 24.4 Profile regex patterns for efficiency
  - [x] 24.5 Optimize any slow patterns

- [x] 25. Optimize pattern matching
  - [x] 25.1 Review all regex patterns for backtracking
  - [x] 25.2 Use non-capturing groups where possible
  - [x] 25.3 Test patterns with pathological inputs
  - [x] 25.4 Add regex performance comments

### Phase 9: Documentation & Validation

- [x] 26. Add code documentation
  - [x] 26.1 Add JSDoc comments to all public functions
  - [x] 26.2 Add inline comments for complex logic
  - [x] 26.3 Document pattern matching strategies
  - [x] 26.4 Add usage examples in comments

- [x] 27. Validate implementation
  - [x] 27.1 Run all unit tests and verify they pass
  - [x] 27.2 Run all property-based tests and verify they pass
  - [x] 27.3 Run integration tests and verify they pass
  - [x] 27.4 Check TypeScript compilation (no errors)
  - [x] 27.5 Verify code coverage > 80%
  - [x] 27.6 Test API endpoint manually with Postman/curl

- [x] 28. Final verification
  - [x] 28.1 Verify all 25 rules are implemented
  - [x] 28.2 Verify all 8 properties pass
  - [x] 28.3 Verify performance requirements met
  - [x] 28.4 Verify error handling works correctly
  - [x] 28.5 Run full test suite one final time

---

## Task Dependencies

### Critical Path

1 → 2,3,4,5,6 → 7 → 8 → 9 → 10 → 11,12 → 13 → 14-21 → 22,23 → 24,25 → 26 → 27 → 28

### Parallel Work Opportunities

- Tasks 2-6 (rule implementations) can be done in parallel
- Tasks 11.1-11.5 (rule tests) can be done in parallel
- Tasks 14-21 (property tests) can be done in parallel after task 13
- Tasks 22-23 (integration/example tests) can be done in parallel

---

## Estimated Time per Phase

- **Phase 1** (Foundation): 1 hour
- **Phase 2** (Rule Definitions): 3-4 hours
- **Phase 3** (Analysis Engine): 2 hours
- **Phase 4** (API Integration): 1 hour
- **Phase 5** (Unit Testing): 2 hours
- **Phase 6** (Property-Based Testing): 1.5 hours
- **Phase 7** (Integration Testing): 1 hour
- **Phase 8** (Performance): 0.5 hours
- **Phase 9** (Documentation & Validation): 1 hour

**Total**: 8-12 hours

---

## Success Criteria

### Must Complete

- ✅ All 25 rules implemented and tested
- ✅ All 8 correctness properties pass
- ✅ API endpoint functional and tested
- ✅ Performance requirements met (< 1 second)
- ✅ Code coverage > 80%
- ✅ Zero TypeScript errors

### Quality Gates

- All unit tests pass
- All property-based tests pass (1000+ runs each)
- All integration tests pass
- Performance benchmarks met
- Zod schemas validate all data

---

## Notes

- Focus on one phase at a time
- Test each rule immediately after implementation
- Run property tests frequently to catch issues early
- Keep regex patterns simple and well-documented
- Prioritize correctness over optimization initially
- Use the design document as reference throughout

---

**Status**: ✅ Ready for Implementation
**Next Step**: Begin with Phase 1 - Foundation & Type System
