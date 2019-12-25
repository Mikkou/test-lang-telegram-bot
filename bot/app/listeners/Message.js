const Base = require('../Base')
const UserModel = require('../models/User')
const WordModel = require('../models/Word')
const UserHelper = require('../helpers/User')

module.exports = class Message extends Base {
  static async init ({ text, from: { id: telegramUserID } }) {
    const user = await UserModel.findOne({ id: telegramUserID })
    if (user && user.last_word_id) {
      const { en } = await WordModel.findById(user.last_word_id)
      if (en === text.toLowerCase()) {
        await super.bot.sendMessage(telegramUserID, 'Ответ верный!')
        await UserHelper.sendNewWord(telegramUserID)
      } else {
        super.bot.sendMessage(telegramUserID, 'Ответ неверный!')
      }
    }
  }
}
