import mongoose from 'mongoose'

const Schema = mongoose.Schema

const promotedTweetsSchema = new Schema({
  tweetId: String,
  userId: String,
  text: String,
  timestamp: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const model = mongoose.model('promotedTweets', promotedTweetsSchema)
export default model
