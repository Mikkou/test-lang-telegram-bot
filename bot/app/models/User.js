import mongoose from 'mongoose'

const Schema = mongoose.Schema

const StudySchema = new Schema({
  lang: { type: String },
  topic: { type: String },
  element_hash: { type: String }
}, { _id: false })

const UserSchema = new Schema(
  {
    user_id: { type: Number, required: true, trim: true, unique: true },
    is_bot: { type: Boolean, required: true },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, default: null, trim: true },
    user_name: { type: String, default: null, trim: true },
    language_code: { type: String, required: true, trim: true },
    study: { type: StudySchema, default: {} },
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

export default mongoose.model('tlg_users', UserSchema)
