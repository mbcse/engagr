import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema

const adsSchema = new Schema({
  adDescription: String,
  amountAllocated: Number,
  chainId: String,
  endtimestamp: Number,
  media: String,
  requiredFollowers: Number,
  marketer: String,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const model = mongoose.model('ads', adsSchema)
export default model
