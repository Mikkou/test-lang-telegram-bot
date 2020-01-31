import Base from '../Base.js'
import UserModel from '../models/User.js'
import WordModel from '../models/Word.js'

export default class User extends Base {
  static async sendNewWord (telegramUserID, ctx) {
    const words = await WordModel.find({})
    const wordRu = words[User.getRandom(0, words.length - 1)].ru
    const { _id: wordId } = await WordModel.findOne({ ru: wordRu })
    const { _id, study: { lang, topic } } = await User.getUserByTlgID(telegramUserID)

    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Info', callback_data: 'getWordInfo' }]
        ]
      })
    }

    await ctx.reply(wordRu, options)
      .catch(error => {
        if (error.response && error.response.statusCode === 403) {
          console.log('status 403')
        }
      })
    await UserModel.findByIdAndUpdate(_id, {
      study: { element_hash: wordId, lang, topic }
    })
  }

  static getRandom (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static async saveProperties (userID, obj) {
    await UserModel.findByIdAndUpdate(userID, obj)
  }

  static async getUserByTlgID (telegramUserID) {
    return await UserModel.findOne({ user_id: telegramUserID })
  }
}
