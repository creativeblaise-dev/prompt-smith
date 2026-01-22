import { PromptAnalyzer } from '@/lib/engine/analyzer';

/**
 * Simple test to verify the rule engine works
 */
async function testAnalyzer() {
  try {
    console.log('Testing PromptAnalyzer...');
    
    const analyzer = new PromptAnalyzer();
    
    // Test with a simple prompt
    const testPrompt = "Create a function that validates email addresses";
    const result = await analyzer.analyze(testPrompt);
    
    console.log('Analysis Result:');
    console.log(`- Overall Score: ${result.overallScore}/${result.maxScore} (${result.percentage}%)`);
    console.log(`- Quality Tier: ${result.tier}`);
    console.log(`- Total Findings: ${result.findings.length}`);
    console.log(`- Passed Rules: ${result.findings.filter(f => f.passed).length}`);
    console.log(`- Failed Rules: ${result.findings.filter(f => !f.passed).length}`);
    
    console.log('\nCategory Scores:');
    result.categoryScores.forEach(cat => {
      console.log(`- ${cat.category}: ${cat.score}/${cat.maxScore} (${cat.percentage}%)`);
    });
    
    console.log('\nTest completed successfully!');
    return true;
  } catch (error) {
    console.error('Test failed:', error);
    return false;
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testAnalyzer();
}

export { testAnalyzer };
