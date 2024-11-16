import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userProcessedTweetsForAdsSchema = new Schema({
  userTweetId: String,
  adTweetId: String,
  userId: String,
  adId: String,
  text: String,
  timestamp: Date
}, { timestamps: true })

const model = mongoose.model('processedUserTweetsForAds', userProcessedTweetsForAdsSchema)
export default model
