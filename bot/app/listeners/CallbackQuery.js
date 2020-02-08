import Base from '../Base.js'
import UserModel from '../models/User.js'
import WordModel from '../models/Word.js'

export default class CallbackQuery extends Base {
  static async init (ctx) {
    CallbackQuery[ctx.update.callback_query.data](ctx)
  }

  static async getENWordInfo (ctx) {
    const telegramUserID = ctx.update.callback_query.from.id
    const { study: { element_hash } } = await UserModel.findOne({ user_id: telegramUserID })
    const { en, ru } = await WordModel.findById(element_hash)
    let text = ''
    if (ru) text += `ru: ${ru} \n`
    if (en) text += `en: ${en} \n`
    ctx.reply(text)
  }

  static async getJPWordInfo (ctx) {
    const telegramUserID = ctx.update.callback_query.from.id
    const { study: { element_hash } } = await UserModel.findOne({ user_id: telegramUserID })
    const { ru, jp_hiragana, jp_katakana, jp_kanji } = await WordModel.findById(element_hash)
    let text = ''
    if (ru) text += `ru: ${ru} \n`
    if (jp_hiragana) text += `hiragana: ${jp_hiragana} \n`
    if (jp_katakana) text += `katakana: ${jp_katakana} \n`
    if (jp_kanji) text += `kanji: ${jp_kanji} \n`
    ctx.reply(text)
  }
}
