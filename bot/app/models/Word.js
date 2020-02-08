import mongoose from 'mongoose'
const Schema = mongoose.Schema

const WordSchema = new Schema(
  {
    ru: { type: String, required: true, trim: true, lowercase: true },
    en: { type: String, required: true, trim: true, lowercase: true },
    jp_hiragana: { type: String, trim: true, default: '' },
    jp_katakana: { type: String, trim: true, default: '' },
    jp_kanji: { type: String, trim: true, default: '' },
  },
  {
    versionKey: false
  }
)

WordSchema.pre('save', function (next) {
  next()
})

export default mongoose.model('words', WordSchema)
