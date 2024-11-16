import { TwitterApi } from 'twitter-api-v2'

import Tweet from '../../../database/registerMentions.js'

import PromotedTweet from '../../../database/promotedTweets.js'
import axios from 'axios'

import path from 'path'

import fs from 'fs/promises'

const existingTweet = await Tweet.findOne({ tweetId: '123' })

const twitterClient = new TwitterApi({
  appKey: 'iJK45zWpfBfki8zGAglhCI3Q9',
  appSecret: 'rBXsxilwpGRz0Ek0GNMPazRLQ0QnvjqJioAhiDW8IMg54vpbqi',
  accessToken: '1463596485585502209-zBZiqbEVlwzD9p0NtFbYdTMyWoOFN0',
  accessSecret: 'D21KrlXhxt7pC1UlogAx9zPJA3ZuXIHK93byBCOiF4o3B'
})

const bearer = new TwitterApi('AAAAAAAAAAAAAAAAAAAAADwBxAEAAAAAlCG3oQ6qLNgvp%2FLjpAYblVDxnow%3DILk8KJAkVGweESzjwgFnYdkR6p7UugZfGossTSYqv7knUL7M9h')

// Fetch user information by username
export const getUserInfoByUsername = async (username) => {
  try {
    const user = await twitterClient.v2.userByUsername(username,
      {
        'user.fields': 'created_at,description,public_metrics'
      }
    )
    console.log('User Info:', user)
    /*
User Info: {
  data: {
    public_metrics: {
      followers_count: 456,
      following_count: 1183,
      tweet_count: 412,
      listed_count: 8,
      like_count: 218
    },
    username: 'mbcse50',
    created_at: '2015-06-18T15:16:27.000Z',
    name: 'Mohit Bhat',
    description: 'Blockchain & Full Stack Developer | GSoC Project Admin & Mentor | 45+ Hackathons winner | ❤️Open Source | Web3 speaker and educator | 3x @ethglobal Finalist🏆',
    id: '3248868421'
  }
}
    */
    return user
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
}

// Fetch tweets of a user
export const getUserTweets = async (userId) => {
  try {
    const tweets = await twitterClient.v2.userTimeline(userId, {
      'tweet.fields': ['created_at', 'public_metrics']
    })
    console.log('User Tweets:', tweets)
    return tweets.data
  } catch (error) {
    console.error('Error fetching user tweets:', error)
  }
}

// Reply to a tweet
export const replyToTweet = async (tweetId, replyText) => {
  try {
    const response = await twitterClient.v2.tweet({
      text: replyText,
      reply: { in_reply_to_tweet_id: tweetId }
    })
    console.log('Reply sent:', response)
    return response
  } catch (error) {
    console.error('Error replying to tweet:', error)
  }
}

// Listen to user tweets (Stream API)
export const listenToUserTweets = async () => {
  try {
    const stream = await bearer.v2.searchStream()
    for await (const tweet of stream) {
      console.log('New Tweet:', tweet)
    }
  } catch (error) {
    console.error('Error listening to user tweets:', error)
  }
}

// Fetch tweet statistics
export const getTweetStats = async (tweetId) => {
  try {
    const tweet = await twitterClient.v2.singleTweet(tweetId, {
      'tweet.fields': ['public_metrics']
    })
    console.log('Tweet Stats:', tweet.data.public_metrics)
    return tweet.data.public_metrics
  } catch (error) {
    console.error('Error fetching tweet stats:', error)
  }
}

// Example: Reply to a tweet
// await replyToTweet('1852474064809369829', 'Hello from Twitter API v2!')
// await getUserInfoByUsername('bchief_official')

// await listenToUserTweets()

// Function to fetch mentions and reply if "register" is mentioned
const fetchMentions = async () => {
  try {
    const mentions = await bearer.v2.userMentionTimeline('1463596485585502209') //, { end_time: '2020-01-01' }
    console.log(mentions)
    for (const tweet of mentions._realData.data) {
      const existingTweet = await Tweet.findOne({ tweetId: tweet.id })

      if (!existingTweet) {
        // Store new tweet in the database
        const newTweet = new Tweet({
          tweetId: tweet.id,
          userId: tweet.author_id,
          text: tweet.text,
          timestamp: new Date()
        })
        await newTweet.save()

        // Check if tweet contains "register"
        if (tweet.text.toLowerCase().includes('register')) {
          // Reply with a message
          await replyToTweet(tweet.id, 'Please register using [your registration link].')
          console.log(`Replied to tweet: ${tweet.id}`)
        }
      }
    }
  } catch (error) {
    console.error('Error fetching mentions:', error)
  }
}

const downloadImageFromIPFS = async (ipfsLink, localPath) => {
  try {
    const response = await axios.get(ipfsLink, { responseType: 'arraybuffer' })
    await fs.writeFile(localPath, response.data)
    console.log(`Image downloaded from IPFS and saved to ${localPath}`)
    return localPath
  } catch (error) {
    console.error('Error downloading image from IPFS:', error)
    throw error
  }
}

const fetchAndCheckUserTweetsAndPushAds = async (userId, addDescription, imageIpfsLink) => {
  try {
    const tweets = await twitterClient.v2.userTimeline(userId, { max_results: 5 })
    console.log(tweets)
    for (const tweet of tweets._realData.data) {
      const existingTweet = await PromotedTweet.findOne({ tweetId: tweet.id })

      if (!existingTweet) {
        // Store new tweet in the database
        const newTweet = new PromotedTweet({
          tweetId: tweet.id,
          userId: tweet.author_id,
          text: tweet.text,
          timestamp: new Date()
        })
        await newTweet.save()
        const localPath = path.resolve('./temp_image.jpg')
        await downloadImageFromIPFS(imageIpfsLink, localPath)

        const mediaId = await twitterClient.v1.uploadMedia(localPath) // Comment on the tweet
        const tweetResponse = await twitterClient.v2.tweet(addDescription, {
          reply: { in_reply_to_tweet_id: newTweet.tweetId },
          media: { media_ids: [mediaId] }
        })
        console.log('Replied to tweet:', tweetResponse)
        console.log(`Replied to tweet from ${userId}: ${tweet.id}`)
        await fs.unlink(localPath)
        console.log('Temporary file removed.')
      }
    }
  } catch (error) {
    console.error('Error fetching user tweets:', error)
  }
}

// Poll for tweets from specific users every minute
// setInterval(fetchUserTweets, 60000)

// Set up a polling interval (every minute)
// setInterval(fetchMentions, 60000)

// getUserInfoByUsername('mbcse50')
// fetchMentions()
