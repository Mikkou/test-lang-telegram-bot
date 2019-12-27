import Base from '../Base.js'
import UserModel from '../models/User.js'

export default class TextStart extends Base {

  static async init (msg) {
    const user = await UserModel.findOne({ id: msg.from.id })
    if (user) {
      await Object.assign(user, msg.from).save().catch(err => res.send(err))
      super.bot.sendMessage(msg.from.id, 'С возвращением! Для старта обучения выполните команду /begin.')
    } else {
      const newUser = new UserModel(msg.from)
      await newUser.save().catch(err => console.log(err))
      super.bot.sendMessage(msg.from.id, 'Приветик(:. Если хотите начать изучать слова, введите команду /begin.')
    }
  }
}
