const Base = require('../Base')
const UserModel = require('../models/User')

module.exports = class TextStart extends Base {

  static async init (msg) {
    const result = await UserModel.find({ id: msg.from.id })
    if (result.length > 0) {
      await Object.assign(result[0], msg.from).save().catch(err => res.send(err))
      super.bot.sendMessage(msg.from.id, 'С возвращением! Для старта обучения выполните команду /begin.')
    } else {
      const newUser = new UserModel(msg.from)
      await newUser.save().catch(err => res.send(err))
      super.bot.sendMessage(msg.from.id, 'Приветик(:. Если хотите начать изучать слова, введите команду /begin.')
    }

  }
}
