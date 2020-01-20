import Base from '../Base.js'
import UserModel from '../models/User.js'

export default class TextStart extends Base {

  static async init (ctx) {
    const user = await UserModel.findOne({ user_id: ctx.update.message.from.id })
    if (user) {
      await Object.assign(user, ctx.update.message.from).save().catch(err => res.send(err))
      ctx.reply('С возвращением! Для старта обучения выполните команду /begin.')
    } else {
      const newUser = new UserModel({
        user_id: ctx.update.message.from.id,
        is_bot: ctx.update.message.from.is_bot,
        first_name: ctx.update.message.from.first_name,
        last_name: ctx.update.message.from.last_name,
        user_name: ctx.update.message.from.username,
        language_code: ctx.update.message.from.language_code
      })
      await newUser.save().catch(err => console.log(err))
      ctx.reply('Приветик(:. Если хотите начать изучать слова, введите команду /begin.')
    }
  }
}
