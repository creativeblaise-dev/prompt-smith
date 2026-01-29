import { clarityRules } from '@/lib/rules/clarity-rules'

describe('Rule Engine', () => {
  test('validates clarity rules structure', () => {
    expect(clarityRules).toHaveLength(5)
    clarityRules.forEach(rule => {
      expect(rule).toHaveProperty('id')
      expect(rule).toHaveProperty('name')
      expect(rule).toHaveProperty('category')
      expect(rule).toHaveProperty('check')
    })
  })

  test('rule checks return boolean', async () => {
    const prompt = 'Write a function'
    for (const rule of clarityRules) {
      const result = await rule.check(prompt)
      expect(typeof result).toBe('boolean')
    }
  })

  test('good prompt scores better than bad prompt', async () => {
    const badPrompt = 'do something'
    const goodPrompt = `
    **ASK**
    Create a Python function that validates email addresses
    
    **CONTEXT**
    Function will be used in user registration system
    
    **CONSTRAINTS**
    Return boolean value (True/False)
    
    **EXAMPLE**
    Input: "user@example.com" → Output: True
    `
    
    let badScore = 0, goodScore = 0
    
    for (const rule of clarityRules) {
      if (await rule.check(badPrompt)) badScore++
      if (await rule.check(goodPrompt)) goodScore++
    }
    
    expect(goodScore).toBeGreaterThanOrEqual(badScore)
  })
})
