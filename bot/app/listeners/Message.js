import Base from '../Base.js'
import UserModel from '../models/User.js'
import WordModel from '../models/Word.js'
import UserHelper from '../helpers/User.js'

export default class Message extends Base {
  static async init (ctx) {
    const { from: { id: telegramUserID  }, text } = ctx.update.message
    const isCommand = text.indexOf('/') === 0
    if (isCommand) return
    const user = await UserModel.findOne({ user_id: telegramUserID })
    if (user && user.last_word_id) {
      const { en } = await WordModel.findById(user.last_word_id)
      if (en === text.toLowerCase()) {
        await ctx.reply('✌')
        await UserHelper.sendNewWord(ctx)
      } else {
        ctx.reply('❌')
      }
    }
  }
}
