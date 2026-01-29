# Implement Variations Generator

**ASK**
Implement the Prompt Variations Generator feature according to the specification in `.kiro/specs/prompt-variations-generator.md`

**CONTEXT**
- PromptSmith currently has a working 25-rule analysis engine
- We need to add the flagship innovative feature: generating 3 distinct prompt variations
- This is the key differentiator that will make PromptSmith stand out in the hackathon
- The feature should integrate seamlessly with existing analysis and UI components

**CONSTRAINTS**
- Follow the exact specification in the prompt-variations-generator.md file
- Maintain all existing functionality (don't break current features)
- Use TypeScript with proper type safety
- Integrate with existing PromptAnalysis schema and rule engine
- Keep performance under 3 seconds for generation + analysis
- Ensure each variation is meaningfully different (>70% structural difference)

**IMPLEMENTATION REQUIREMENTS**

1. **Core Engine** (`src/lib/engine/variations.ts`):
   - Implement VariationGenerator class with all specified methods
   - Create 3 distinct generation algorithms (structured, conversational, technical)
   - Integrate with existing analyzer for parallel analysis
   - Implement performance ranking logic

2. **API Integration** (`src/app/api/variations/route.ts`):
   - Create new API endpoint for variation generation
   - Handle original prompt + analysis as input
   - Return ranked variations with full analysis

3. **UI Components** (`src/components/VariationsView.tsx`):
   - Tabbed interface for 3 variations
   - Score indicators and comparison view
   - Copy/export functionality
   - Integration with existing PromptAnalyzer

4. **Schema Updates** (`src/lib/schemas/analysis.ts`):
   - Add PromptVariation type if needed
   - Ensure compatibility with existing types

**EXAMPLE**
Input: "Help me write a blog post about AI"

Expected Output:
- **Structured**: MPF format with clear sections, bullet points, verification
- **Conversational**: Friendly tone, natural language, approachable
- **Technical**: Precise specs, detailed constraints, formal language

Each with independent analysis scores and ranking.

**VERIFICATION**
- All 3 variations generate successfully
- Each variation scores higher than original (when possible)
- Variations are structurally different from each other
- UI displays variations clearly with scores
- Performance meets <3 second requirement
- Integration doesn't break existing functionality
