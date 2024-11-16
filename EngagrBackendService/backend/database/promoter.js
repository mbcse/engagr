import validator from 'validator'
import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema

const promotersSchema = new Schema({
  userId: String,
  twitterUsername: String,
  followers: Number,
  twitterData: Object,
  promotedTweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'promotedTweets'
  }],
  payoutBalance: {
    type: Number,
    default: 0
  },
  accountAddres: String
}, { timestamps: true })

const model = mongoose.model('promoters', promotersSchema)
export default model
