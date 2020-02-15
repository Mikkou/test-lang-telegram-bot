import WordsModel from '../models/Word.js'
import UserModel from '../models/User.js'

export default class WordsWorker {
  STUDY_LANG = null

  constructor (lang) {
    this.STUDY_LANG = lang
  }

  async sendNewWord (telegramUserID, selectedLang, ctx) {

    const items = await WordsModel.aggregate([
      {
        $match: {
          ...WordsWorker.getAggregateMatch(this.STUDY_LANG),
          ...WordsWorker.getAggregateMatch(selectedLang)
        }
      },
      { $sample: { size: 1 } },
    ])

    const [item] = items

    let neededCharacterKey = selectedLang

    if (neededCharacterKey === 'jp') {
      neededCharacterKey = item.jp_kanji
          ? 'jp_kanji'
          : item.jp_hiragana
            ? 'jp_hiragana'
            : 'jp_katakana'
    }

    const { [neededCharacterKey]: characterForSending, _id: characterHash } = items[0]

    const { _id, study: { lang, topic, level = '' } } = await await UserModel.findOne({ user_id: telegramUserID })

    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Info', callback_data: `get${lang.toUpperCase()}WordInfo` }]
        ]
      })
    }

    await ctx.reply(characterForSending, options)
      .catch(error => {
        if (error.response && error.response.statusCode === 403) {
          console.log('status 403')
        }
      })
    await UserModel.findByIdAndUpdate(_id, {
      study: { lang, topic, level, element_hash: characterHash }
    })
  }

  static getAggregateMatch (lang) {

    if (lang === 'en' || lang === 'ru') {
      return {
        $and: [
          { [lang]: { $exists: true, '$not': /^$/ } }
        ]
      }
    } else if (lang === 'jp') {
      return {
        $or: [
          { jp_hiragana: { $exists: true, '$not': /^$/ } },
          { jp_katakana: { $exists: true, '$not': /^$/ } },
          { jp_kanji: { $exists: true, '$not': /^$/ } }
        ]
      }
    }

  }
}
