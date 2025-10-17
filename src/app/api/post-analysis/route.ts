import { NextRequest, NextResponse } from 'next/server'
import { postToTwitter, postToTelegram } from '@/lib/social-posting'
import { generateViralMessage } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { tokenData, analysis } = await request.json()

    // Generate viral message with OpenAI
    const message = await generateViralMessage(tokenData, analysis)

    // Post to Twitter
    const twitterPost = await postToTwitter(message, tokenData)

    // Post to Telegram
    const telegramPost = await postToTelegram(message, tokenData)

    return NextResponse.json({
      success: true,
      twitter: twitterPost,
      telegram: telegramPost,
    })
  } catch (error) {
    console.error('Social posting error:', error)
    return NextResponse.json(
      { error: 'Failed to post to social media' },
      { status: 500 }
    )
  }
}