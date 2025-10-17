import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function generateViralMessage(tokenData: any, analysis: any) {
  const prompt = `Generate a viral, engaging tweet about this Solana token analysis:
Token: ${tokenData.symbol} (${tokenData.name})
Price: $${tokenData.price}
Signal: ${analysis.signal}
Key Insight: ${analysis.keyInsight}

Requirements:
- Use emojis strategically (2-4 emojis)
- Keep it under 280 characters
- Make it exciting and actionable
- Include a call-to-action to analyze on ClickShift Alpha
- Maintain professional credibility
- Include relevant hashtags (#Solana #DeFi #CryptoAlpha)

Example tone: "🚨 ALPHA ALERT: $${tokenData.symbol} showing ${analysis.signal} signals! ${analysis.keyInsight} 
📊 Full analysis: alpha.clickshift.io #Solana #DeFi"`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.8,
    })

    return completion.choices[0].message.content || ''
  } catch (error) {
    console.error('OpenAI generation error:', error)
    // Fallback message
    return `🚨 $${tokenData.symbol} Analysis Complete!\n${analysis.signal.toUpperCase()} Signal Detected\n\n📊 Get full analysis: alpha.clickshift.io\n\n#Solana #DeFi #CryptoTrading`
  }
}