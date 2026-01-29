# PromptSmith User Guide

## Getting Started

### What is PromptSmith?
PromptSmith is an AI prompt optimization platform that helps you write better prompts through systematic analysis, intelligent variations, and visual building tools. Instead of guessing what makes a good prompt, PromptSmith provides expert feedback and measurable improvements.

### Quick Start
1. Open PromptSmith in your browser
2. Paste or type your AI prompt in the left panel
3. Click "Analyze Prompt" to get instant feedback
4. Explore improvements through variations and refinement
5. Copy your optimized prompt for use

## Core Features

### 1. Prompt Analysis Engine

**What it does**: Analyzes your prompt against 25 expert-crafted rules across 5 categories.

**How to use**:
1. Enter your prompt in the text area
2. Click "Analyze Prompt"
3. Review your overall score (0-100)
4. Check category breakdowns:
   - **Clarity & Intent**: Is your goal clear?
   - **Context & Inputs**: Do you provide enough background?
   - **Instructions & Constraints**: Are requirements specific?
   - **Output Format**: Is the desired format defined?
   - **Safety & Privacy**: Are there any risks?

**Understanding Results**:
- **Green scores (80-100)**: Excellent, no changes needed
- **Yellow scores (60-79)**: Good, minor improvements possible
- **Red scores (0-59)**: Needs improvement, follow suggestions

### 2. Performance Prediction System

**What it does**: Predicts how well your prompt will perform before you use it.

**Metrics explained**:
- **Success Rate**: Likelihood of getting desired results (0-100%)
- **Token Efficiency**: Cost-effectiveness rating (0-100%)
- **Complexity Score**: How complex your prompt is (0-100%)
- **Recommended Use Case**: Best application for your prompt
- **Confidence Level**: How certain the prediction is (High/Medium/Low)

**How to interpret**:
- **High Success Rate + High Efficiency**: Excellent prompt, ready to use
- **Low Success Rate**: Needs improvement before deployment
- **High Complexity**: May be over-engineered, consider simplifying

### 3. Intelligent Variations Generator

**What it does**: Creates three different optimized versions of your prompt, each targeting different use cases.

**The Three Approaches**:

**Structured Approach**:
- Uses MPF (Markdown Prompts Framework) format
- Clear sections with bullet points
- Best for: Complex tasks, technical documentation, systematic processes

**Conversational Approach**:
- Natural, friendly tone
- Easy to understand language
- Best for: User-facing applications, creative tasks, general assistance

**Technical Approach**:
- Precise specifications
- Detailed constraints and requirements
- Best for: API integrations, code generation, formal documentation

**How to use**:
1. After analyzing your prompt, click "Generate Variations"
2. Review all three approaches in the Variations tab
3. Compare scores to see which performs best
4. Click the copy button to use your preferred variation

### 4. Visual Prompt Builder

**What it does**: Drag-and-drop interface for building prompts using MPF structure.

**Available Sections**:
- **ASK**: Your main request or objective
- **CONTEXT**: Background information and setting
- **CONSTRAINTS**: Requirements, limitations, and rules
- **EXAMPLE**: Sample inputs and desired outputs
- **VERIFICATION**: Success criteria and validation steps

**How to use**:
1. Click "Visual Prompt Builder" in the left panel
2. Start with the ASK section (always included)
3. Add other sections using the buttons
4. Fill in each section with relevant content
5. Use "Use Template" for pre-written examples
6. Click "Generate Prompt" to create your structured prompt

**Templates available**:
- Each section has expert-written templates
- Click "Use Template" to populate with examples
- Customize the template content for your needs

### 5. Rule-Based Refinement

**What it does**: Automatically improves your prompt based on failed rules.

**How to use**:
1. After analysis, click "Refine Prompt" 
2. Review the improved version in the Refinement tab
3. See specific improvements made
4. Read the explanation of changes
5. Copy the refined prompt

**What gets improved**:
- Adds missing structure (MPF format)
- Clarifies vague instructions
- Adds necessary context
- Defines output format
- Includes examples where helpful

## Best Practices

### Writing Effective Prompts

**Start with Structure**:
```
**ASK**
[Your main request]

**CONTEXT**
[Relevant background]

**CONSTRAINTS**
[Requirements and limitations]

**EXAMPLE**
[Sample input/output]
```

**Be Specific**:
- ❌ "Write code"
- ✅ "Write a Python function that validates email addresses"

**Provide Context**:
- ❌ "Create a report"
- ✅ "Create a quarterly sales report for the marketing team showing revenue trends"

**Define Output Format**:
- ❌ "Analyze this data"
- ✅ "Analyze this data and return results as JSON with 'summary', 'insights', and 'recommendations' fields"

**Include Examples**:
```
**EXAMPLE**
Input: "user@example.com"
Output: {"valid": true, "message": "Email format is correct"}
```

### Using the Platform Effectively

**Workflow Recommendations**:
1. **Start Simple**: Begin with your basic prompt idea
2. **Analyze First**: Always run analysis before refinement
3. **Check Performance**: Review prediction metrics
4. **Try Variations**: Compare different approaches
5. **Iterate**: Use feedback to improve further

**When to Use Each Feature**:
- **Analysis**: Every prompt, to understand current quality
- **Performance Prediction**: Before deploying important prompts
- **Variations**: When you need different approaches for different audiences
- **Visual Builder**: When learning MPF or building complex prompts
- **Refinement**: When you want quick, automated improvements

## Common Use Cases

### For Developers
```
**ASK**
Generate a REST API endpoint for user authentication

**CONTEXT**
- Node.js Express application
- Using JWT tokens for authentication
- MongoDB for user storage
- Need both login and registration endpoints

**CONSTRAINTS**
- Include error handling for invalid credentials
- Return appropriate HTTP status codes
- Hash passwords before storage
- Validate email format

**EXAMPLE**
POST /auth/login
Body: {"email": "user@example.com", "password": "password123"}
Response: {"token": "jwt_token_here", "user": {"id": "123", "email": "user@example.com"}}
```

### For Content Creation
```
**ASK**
Write a blog post about sustainable living tips

**CONTEXT**
- Target audience: environmentally conscious millennials
- Blog focuses on practical, actionable advice
- Tone should be encouraging, not preachy
- 800-1000 words

**CONSTRAINTS**
- Include 5-7 specific tips
- Add statistics or facts to support points
- End with a call-to-action
- Use subheadings for readability

**EXAMPLE**
Title: "7 Simple Changes That Make a Big Environmental Impact"
Structure: Introduction → Tips (with subheadings) → Conclusion with CTA
```

### For Data Analysis
```
**ASK**
Analyze customer feedback data and identify key themes

**CONTEXT**
- E-commerce platform with 500+ reviews
- Looking for product improvement opportunities
- Need both positive and negative feedback analysis
- Data includes ratings (1-5) and text comments

**CONSTRAINTS**
- Group themes by frequency
- Provide specific examples for each theme
- Suggest actionable improvements
- Format as structured report

**EXAMPLE**
Input: CSV with columns: rating, comment, product_id, date
Output: Report with sections: "Top Positive Themes", "Key Issues", "Recommendations"
```

## Troubleshooting

### Common Issues

**Low Scores Despite Good Prompts**:
- Check if you're missing MPF structure
- Add examples to improve score
- Define output format explicitly
- Include relevant context

**Variations Not Generating**:
- Ensure your prompt has been analyzed first
- Check that analysis completed successfully
- Try refreshing the page if stuck

**Visual Builder Not Working**:
- Make sure you've added content to sections
- At least the ASK section must have content
- Try using templates if unsure what to write

**Performance Prediction Seems Wrong**:
- Predictions are estimates based on prompt structure
- Very short prompts may have unreliable predictions
- Consider the confidence level indicator

### Getting Better Results

**Improve Analysis Scores**:
1. Use the MPF structure (**ASK**, **CONTEXT**, etc.)
2. Add specific examples of desired output
3. Define clear constraints and requirements
4. Specify your target audience
5. Include relevant background context

**Get More Accurate Predictions**:
1. Write prompts with sufficient detail
2. Include examples in your prompt
3. Define clear success criteria
4. Specify the intended use case

**Generate Better Variations**:
1. Start with a reasonably detailed original prompt
2. Ensure analysis shows specific areas for improvement
3. Consider which approach fits your use case best
4. Test variations with your actual AI system

## Tips for Success

### Prompt Engineering Best Practices
- **Be explicit**: Don't assume the AI knows your context
- **Use examples**: Show exactly what you want
- **Set constraints**: Define what you don't want
- **Specify format**: Tell the AI how to structure output
- **Test iteratively**: Use PromptSmith to refine and improve

### Platform Usage Tips
- **Save good prompts**: Copy successful prompts for reuse
- **Learn from analysis**: Read rule explanations to improve your skills
- **Try all approaches**: Different variations work better for different tasks
- **Use performance prediction**: Avoid deploying low-scoring prompts
- **Iterate based on feedback**: Use suggestions to continuously improve

## Advanced Features

### Understanding Rule Categories

**Category A: Clarity & Intent (20 points)**
- Explicit role definition
- Clear primary goal
- Explicit scope
- Target audience specified
- Ambiguous language avoided

**Category B: Context & Inputs (20 points)**
- Relevant background provided
- Inputs clearly defined
- Assumptions declared
- Constraints contextualized
- No contradictory instructions

**Category C: Instructions & Constraints (20 points)**
- Step-by-step instructions where needed
- Explicit constraints listed
- Priority order defined
- Desired depth specified
- Edge cases mentioned

**Category D: Output Format & Verification (20 points)**
- Output format explicitly defined
- Structured output requested
- Examples provided (few-shot)
- Acceptance criteria defined
- Self-verification requested

**Category E: Safety, Privacy & Robustness (20 points)**
- Sensitive data avoided
- Ethical requests only
- Tool limits acknowledged
- Over-specification avoided
- Prompt is reusable

### MPF (Markdown Prompts Framework)
PromptSmith is built around MPF, a structured approach to prompt writing:

```markdown
**ASK**
[Primary objective - what you want the AI to do]

**CONTEXT**
[Background information, setting, domain knowledge]

**CONSTRAINTS**
[Requirements, limitations, rules to follow]

**EXAMPLE**
[Sample inputs and desired outputs]

**VERIFICATION**
[How to check if the output is successful]
```

This structure ensures comprehensive, clear prompts that consistently produce better results.

## Support and Resources

### Getting Help
- Review the rule explanations in the Analysis tab
- Use the Visual Prompt Builder templates for guidance
- Check the Performance Prediction for deployment readiness
- Try different variations to find what works best

### Learning More
- Study high-scoring prompts to understand patterns
- Experiment with different MPF structures
- Use the platform regularly to build prompt engineering skills
- Pay attention to which rules you commonly miss

PromptSmith transforms prompt engineering from guesswork to systematic optimization. Use it regularly to improve your AI interactions and achieve more consistent, high-quality results.
