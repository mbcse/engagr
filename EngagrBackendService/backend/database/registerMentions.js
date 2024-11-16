import validator from 'validator'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const registerMentionsSchema = new Schema({
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

const model = mongoose.model('registerMentions', registerMentionsSchema)
export default model
