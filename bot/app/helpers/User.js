import Base from '../Base.js'
import UserModel from '../models/User.js'
import WordModel from '../models/Word.js'

export default class User extends Base {
  static async sendNewWord (ctx) {
    const telegramUserID = ctx.update.message.from.id
    const words = await WordModel.find({})
    const wordRu = words[User.getRandom(0, words.length - 1)].ru
    const { _id: wordId } = await WordModel.findOne({ ru: wordRu })
    const user = await UserModel.findOne({ user_id: telegramUserID })

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
    await UserModel.findByIdAndUpdate(user._id, { last_word_id: wordId })
  }

  static getRandom (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
