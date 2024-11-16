import validator from 'validator'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const registerMentionsSchema = new Schema({
  tweetId: String,
  userId: String,
  text: String,
  timestamp: Date
}, { timestamps: true })

const model = mongoose.model('registerMentions', registerMentionsSchema)
export default model
