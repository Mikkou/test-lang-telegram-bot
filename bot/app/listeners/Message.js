import Base from '../Base.js'
import UserModel from '../models/User.js'
import WordModel from '../models/Word.js'
import UserHelper from '../helpers/User.js'

export default class Message extends Base {
  static async init ({ text, from: { id: telegramUserID } }) {
    const isCommand = text.indexOf('/') === 0
    if (isCommand) return
    const user = await UserModel.findOne({ user_id: telegramUserID })
    if (user && user.last_word_id) {
      const { en } = await WordModel.findById(user.last_word_id)
      if (en === text.toLowerCase()) {
        await super.bot.sendMessage(telegramUserID, '✌')
        await UserHelper.sendNewWord(telegramUserID)
      } else {
        super.bot.sendMessage(telegramUserID, '❌')
      }
    }
  }
}
