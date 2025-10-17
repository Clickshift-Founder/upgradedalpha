import { TwitterApi } from 'twitter-api-v2'
import TelegramBot from 'node-telegram-bot-api'

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
})

const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
  polling: false,
})

export async function postToTwitter(message: string, tokenData: any) {
  try {
    const tweet = await twitterClient.v2.tweet(message)
    console.log('Posted to Twitter:', tweet.data.id)
    return tweet.data
  } catch (error) {
    console.error('Twitter posting error:', error)
    throw error
  }
}

export async function postToTelegram(message: string, tokenData: any) {
  try {
    const channelId = process.env.TELEGRAM_CHANNEL_ID!
    const result = await telegramBot.sendMessage(channelId, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: false,
    })
    console.log('Posted to Telegram:', result.message_id)
    return result
  } catch (error) {
    console.error('Telegram posting error:', error)
    throw error
  }
}