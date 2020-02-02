import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AlfabetSchema = new Schema(
  {
    latin: { type: String, required: true, unique: true },
    katakana: { type: String, unique: true }
  },
  {
    versionKey: false
  }
)

AlfabetSchema.pre('save', function (next) {
  next()
})

export default mongoose.model('alfabets', AlfabetSchema)
