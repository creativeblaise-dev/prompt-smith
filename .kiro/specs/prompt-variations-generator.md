# Prompt Variations Generator - Feature Specification

## Overview

The Prompt Variations Generator is PromptSmith's flagship innovative feature that generates multiple optimized approaches from a single prompt. Instead of providing one "correct" refinement, it offers 3 distinct optimization strategies, each with its own analysis and performance metrics.

## Feature Requirements

### Functional Requirements

#### FR1: Multiple Approach Generation
- **Requirement**: Generate exactly 3 distinct prompt variations from any input
- **Approaches**:
  1. **Structured Version**: Heavy MPF formatting with clear sections
  2. **Conversational Version**: Natural, friendly tone while maintaining clarity
  3. **Technical Version**: Precise specifications with detailed constraints
- **Acceptance Criteria**: Each variation must be meaningfully different in style and approach

#### FR2: Parallel Analysis
- **Requirement**: Analyze each variation against the full 25-rule framework
- **Output**: Complete PromptAnalysis object for each variation
- **Performance**: All 3 analyses must complete within 5 seconds
- **Acceptance Criteria**: Each variation receives independent scoring and feedback

#### FR3: Performance Ranking
- **Requirement**: Rank variations by overall performance score
- **Display**: Show variations in descending order of quality
- **Insights**: Provide rationale for ranking decisions
- **Acceptance Criteria**: Users can easily identify the highest-performing variation

#### FR4: Comparative Analysis
- **Requirement**: Enable side-by-side comparison of all variations
- **Metrics**: Show score differences, rule compliance, and trade-offs
- **Visualization**: Clear presentation of strengths/weaknesses
- **Acceptance Criteria**: Users understand why each approach works differently

### Non-Functional Requirements

#### NFR1: Performance
- **Generation Time**: < 3 seconds for all 3 variations
- **Analysis Time**: < 2 seconds for parallel rule evaluation
- **UI Responsiveness**: Smooth transitions and loading states
- **Memory Usage**: Efficient handling of multiple prompt analyses

#### NFR2: Quality
- **Variation Distinctiveness**: Each approach must be > 70% different in structure
- **Score Improvement**: At least 2 variations should score higher than original
- **Intent Preservation**: All variations must maintain original prompt intent
- **Readability**: Each variation must be clear and actionable

#### NFR3: User Experience
- **Intuitive Interface**: Users can understand differences without explanation
- **Selection Mechanism**: Easy way to choose preferred variation
- **Copy Functionality**: One-click copying of selected variation
- **Educational Value**: Users learn different prompt engineering approaches

## Technical Specification

### Architecture

```typescript
// Core Types
interface PromptVariation {
  id: string
  name: string
  description: string
  prompt: string
  analysis: PromptAnalysis
  approach: 'structured' | 'conversational' | 'technical'
}

interface VariationGeneratorConfig {
  preserveIntent: boolean
  maxLength: number
  minScoreImprovement: number
}

// Main Service
class VariationGenerator {
  async generateVariations(
    originalPrompt: string,
    originalAnalysis: PromptAnalysis,
    config?: VariationGeneratorConfig
  ): Promise<PromptVariation[]>
  
  private generateStructuredVariation(prompt: string, suggestions: string[]): string
  private generateConversationalVariation(prompt: string, suggestions: string[]): string
  private generateTechnicalVariation(prompt: string, suggestions: string[]): string
  private extractIntent(prompt: string): string
  private rankVariations(variations: PromptVariation[]): PromptVariation[]
}
```

### Implementation Details

#### Structured Variation Algorithm
1. Extract core intent from original prompt
2. Apply MPF structure with clear sections
3. Add bullet points for readability
4. Include verification criteria
5. Address top rule violations

#### Conversational Variation Algorithm
1. Maintain natural, friendly tone
2. Use approachable language patterns
3. Include clarification requests
4. Preserve core requirements
5. Add conversational elements

#### Technical Variation Algorithm
1. Use precise, formal language
2. Add detailed specifications
3. Include validation criteria
4. Define clear constraints
5. Provide execution parameters

### Data Flow

```
Original Prompt + Analysis
         ↓
Intent Extraction
         ↓
Parallel Generation:
├── Structured Approach
├── Conversational Approach  
└── Technical Approach
         ↓
Parallel Analysis (25 rules each)
         ↓
Performance Ranking
         ↓
UI Presentation with Comparison
```

## User Interface Specification

### Layout Requirements

#### Primary Display
- **Tabbed Interface**: 3 tabs for each variation approach
- **Score Indicators**: Prominent display of each variation's score
- **Quick Preview**: First 2 lines of each variation visible
- **Selection Controls**: Radio buttons or similar for choosing preferred approach

#### Detailed View
- **Full Prompt Display**: Complete variation text in readable format
- **Analysis Results**: Rule-by-rule breakdown for selected variation
- **Comparison Mode**: Side-by-side view of original vs. selected variation
- **Action Buttons**: Copy, Export, Use as Base for further editing

#### Performance Indicators
- **Score Improvement**: Visual indicator of improvement over original
- **Category Breakdown**: Mini-charts showing category performance
- **Recommendation Badge**: "Best for [use case]" suggestions
- **Confidence Level**: System confidence in the variation's effectiveness

### Interaction Patterns

#### Selection Flow
1. User views all 3 variations with scores
2. User can preview each variation
3. User selects preferred approach
4. System shows detailed analysis
5. User can copy or export selected variation

#### Comparison Flow
1. User activates comparison mode
2. System shows original vs. all variations
3. Differences are highlighted
4. Score improvements are visualized
5. User can switch between variations for comparison

## Testing Requirements

### Unit Tests
- **Variation Generation**: Test each approach algorithm independently
- **Intent Extraction**: Verify core purpose is preserved
- **Analysis Integration**: Ensure proper rule evaluation
- **Ranking Logic**: Test performance-based sorting

### Integration Tests
- **End-to-End Flow**: Complete generation and analysis pipeline
- **UI Integration**: Proper display and interaction
- **Performance Tests**: Response time requirements
- **Error Handling**: Graceful failure scenarios

### User Acceptance Tests
- **Variation Quality**: Manual review of generated approaches
- **Score Accuracy**: Verify analysis results are meaningful
- **User Comprehension**: Test if users understand differences
- **Selection Utility**: Confirm users can make informed choices

## Success Metrics

### Quantitative Metrics
- **Generation Success Rate**: > 95% successful variation generation
- **Score Improvement**: Average +15 points over original
- **Performance Time**: < 3 seconds total generation time
- **User Engagement**: > 80% of users interact with multiple variations

### Qualitative Metrics
- **Variation Distinctiveness**: Manual review confirms meaningful differences
- **Intent Preservation**: Original purpose maintained in all variations
- **User Satisfaction**: Positive feedback on variation quality
- **Educational Value**: Users report learning different approaches

## Implementation Priority

### Phase 1: Core Generation (Must Have)
- Basic variation generation algorithms
- Intent extraction logic
- Parallel analysis integration
- Simple UI display

### Phase 2: Enhanced UX (Should Have)
- Performance ranking
- Comparative analysis
- Improved UI with tabs/previews
- Copy/export functionality

### Phase 3: Advanced Features (Could Have)
- Custom variation parameters
- User preference learning
- Advanced comparison tools
- Performance prediction integration

This specification provides the foundation for implementing PromptSmith's most innovative feature, transforming it from a basic analyzer into an intelligent prompt optimization platform.
