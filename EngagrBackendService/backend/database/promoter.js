import validator from 'validator'
import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema

const promotersSchema = new Schema({
  twitterId: String,
  twitterUsername: String,
  followers: Number,
  twitterData: Object,
  processedCommentedTweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'processedUserTweetsForAds'
  }],
  promotedAds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ads'
    }
  ],
  payoutBalance: {
    type: Number,
    default: 0
  },
  accountAddres: String
}, { timestamps: true })

const model = mongoose.model('promoters', promotersSchema)
export default model
