import validator from 'validator'
import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema

const marketersSchema = new Schema({

  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate (email) {
      if (!validator.isEmail(email)) {
        throw new Error('Email Not Valid!' + email)
      }
    }
  },

  adsPublished: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ads'
  }],

  accountAddres: String

}, { timestamps: true })

const model = mongoose.model('marketers', marketersSchema)
export default model
