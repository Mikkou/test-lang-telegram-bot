import Base from '../Base.js'
import UserModel from '../models/User.js'
import WordModel from '../models/Word.js'
import AlfabetModel from '../models/jp/Alfabet.js'
import UserHelper from '../helpers/User.js'
import AlfabetWorker from '../topics/jp/AlfabetWorker.js'

export default class Message extends Base {
  static async init (ctx) {
    const { from: { id: telegramUserID  }, text } = ctx.update.message
    const isCommand = text.indexOf('/') === 0
    if (isCommand) return
    const user = await UserModel.findOne({ user_id: telegramUserID })
    if (user && user.study.element_hash) {

      switch (user.study.lang) {
        case 'en':
          const { en } = await WordModel.findById(user.study.element_hash)
          if (en === text.toLowerCase()) {
            await ctx.reply('✌')
            await UserHelper.sendNewWord(telegramUserID, ctx)
          } else {
            ctx.reply('❌')
          }
          break

        case 'jp':
          const { latin } = await AlfabetModel.findById(user.study.element_hash)
          if (latin === text.toLowerCase()) {
            await ctx.reply('✌')
            const obj = new AlfabetWorker(user.study.topic)
            await obj.sendNewElement(telegramUserID, ctx)
          } else {
            ctx.reply('❌')
          }
          break
      }
    }
  }
}
