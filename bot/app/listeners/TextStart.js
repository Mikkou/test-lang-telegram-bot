import Base from '../Base.js'
import UserModel from '../models/User.js'

export default class TextStart extends Base {

  static async init (msg) {
    const user = await UserModel.findOne({ user_id: msg.from.id })
    if (user) {
      await Object.assign(user, msg.from).save().catch(err => res.send(err))
      super.bot.sendMessage(msg.from.id, 'С возвращением! Для старта обучения выполните команду /begin.')
    } else {
      const newUser = new UserModel({
        user_id: msg.from.id,
        is_bot: msg.from.is_bot,
        first_name: msg.from.first_name,
        last_name: msg.from.last_name,
        user_name: msg.from.username,
        language_code: msg.from.language_code
      })
      await newUser.save().catch(err => console.log(err))
      super.bot.sendMessage(msg.from.id, 'Приветик(:. Если хотите начать изучать слова, введите команду /begin.')
    }
  }
}
