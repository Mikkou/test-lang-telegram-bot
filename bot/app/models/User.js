import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    id: { type: Number, required: true, trim: true },
    is_bot: { type: Boolean, required: true },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, default: null, trim: true },
    username: { type: String, default: null, trim: true },
    language_code: { type: String, required: true, trim: true },
    last_word_id: { type: String, trim: true, default: null, lowercase: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
)

UserSchema.pre('save', function (next) {
  const post = this
  if (!post.createdAt) {
    post.createdAt = new Date()
  }
  next()
})

export default mongoose.model('users', UserSchema)
