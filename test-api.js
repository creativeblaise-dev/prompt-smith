// Quick test script to verify the API fix
const testPrompt = "Write a function";

async function testAPI() {
  try {
    const response = await fetch('http://localhost:3001/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: testPrompt }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error);
      return;
    }

    const result = await response.json();
    console.log('✅ API Test Successful!');
    console.log('Overall Score:', result.overallScore);
    console.log('Findings Count:', result.findings.length);
    console.log('Categories:', result.categoryScores.length);
  } catch (error) {
    console.error('❌ API Test Failed:', error);
  }
}

// Only run if this is the main module
if (typeof window === 'undefined' && require.main === module) {
  testAPI();
}

module.exports = { testAPI };
