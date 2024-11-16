import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema

const shortUrlsSchema = new Schema({
  shortUrl: String,
  originalUrl: String
}, { timestamps: true })

const model = mongoose.model('shortUrls', shortUrlsSchema)
export default model
