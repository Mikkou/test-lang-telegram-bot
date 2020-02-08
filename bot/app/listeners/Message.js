import Base from '../Base.js'
import UserModel from '../models/User.js'
import WordModel from '../models/Word.js'
import AlfabetsModel from '../models/jp/Alfabet.js'
import AlfabetsWorker from '../topics/jp/AlfabetsWorker.js'
import WordsTopic from '../topics/WordsWorker.js'

export default class Message extends Base {
  static async init (ctx) {
    const { from: { id: telegramUserID }, text } = ctx.update.message
    const isCommand = text.indexOf('/') === 0
    if (isCommand) return
    const { study: { lang, topic, element_hash } } = await UserModel.findOne({ user_id: telegramUserID })
    if (element_hash) {
      const obj = new WordsTopic(lang)

      switch (lang) {
        case 'en':
          const { en } = await WordModel.findById(element_hash)
          if (en === text.toLowerCase()) {
            await ctx.reply('✌')
            await obj.sendNewWord(telegramUserID, ctx)
          } else {
            ctx.reply('❌')
          }
          break

        case 'jp':

          switch (topic) {
            case 'words':
              const { jp_hiragana, jp_katakana, jp_kanji } = await WordModel.findById(element_hash)
              if (jp_hiragana === text || jp_katakana === text || jp_kanji === text) {
                await ctx.reply('✌')
                await obj.sendNewWord(telegramUserID, ctx)
              } else {
                ctx.reply('❌')
              }
              break

            case 'katakana':
            case 'hiragana':

              const { latin } = await AlfabetsModel.findById(element_hash)
              if (latin === text.toLowerCase()) {
                await ctx.reply('✌')
                const obj = new AlfabetsWorker(topic)
                await obj.sendNewElement(telegramUserID, ctx)
              } else {
                ctx.reply('❌')
              }

              break
          }

          break
      }
    }
  }
}
