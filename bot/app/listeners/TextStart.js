import Base from '../Base.js'
import UserModel from '../models/User.js'
import { getLang, words as langWords } from '../../langs.js'

export default class TextStart extends Base {

  static async init (ctx) {
    const { from } = ctx.update.message
    const user = await UserModel.findOne({ user_id: from.id })
    if (user) {
      await Object.assign(user, from).save().catch(err => res.send(err))
      ctx.reply(langWords[getLang(from.language_code)].welcomeBack)
    } else {
      const newUser = new UserModel({
        user_id: from.id,
        is_bot: from.is_bot,
        first_name: from.first_name,
        last_name: from.last_name,
        user_name: from.username,
        language_code: from.language_code
      })
      await newUser.save().catch(err => console.log(err))
      ctx.reply(langWords[getLang(from.language_code)].welcome)
    }
  }
}
