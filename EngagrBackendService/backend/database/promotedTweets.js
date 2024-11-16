import mongoose from 'mongoose'

const Schema = mongoose.Schema

const promotedTweetsSchema = new Schema({
  tweetId: String,
  userId: String,
  text: String,
  timestamp: Date
}, { timestamps: true })

const model = mongoose.model('promotedTweets', promotedTweetsSchema)
export default model
