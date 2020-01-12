import Base from '../Base.js'
import UserModel from '../models/User.js'
import WordModel from '../models/Word.js'

export default class CallbackQuery extends Base {
  static async init ({ from: { id: telegramUserID }, data }) {
    CallbackQuery[data](telegramUserID)
  }

  static async getWordInfo (telegramUserID) {
    const { last_word_id } = await UserModel.findOne({ user_id: telegramUserID })
    const { en, ru } = await WordModel.findById(last_word_id)
    this.bot.sendMessage(telegramUserID, `${ru} - ${en}`)
  }
}
