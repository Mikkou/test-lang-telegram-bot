const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WordSchema = new Schema(
  {
    ru: { type: String, required: true, trim: true, lowercase: true },
    en: { type: String, required: true, trim: true, lowercase: true },
  },
  {
    versionKey: false
  }
)

WordSchema.pre('save', function (next) {
  next()
})

module.exports = mongoose.model('words', WordSchema)
