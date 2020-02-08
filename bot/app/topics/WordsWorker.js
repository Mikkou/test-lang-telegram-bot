import WordsModel from '../models/Word.js'
import UserModel from '../models/User.js'

export default class WordsWorker {
  LANG = null

  constructor (lang) {
    this.LANG = lang
  }

  async sendNewWord (telegramUserID, ctx) {

    let items

    switch (this.LANG) {
      case 'en':
        items = await WordsModel.aggregate([
          {
            $match: {
              en: {
                '$not': /^$/
              }
            }
          },
          { $sample: { size: 1 } },
        ])
        break
      case 'jp':
        items = await WordsModel.aggregate([
          {
            $match: {
              $or: [{ jp_hiragana: { $exists: true, '$not': /^$/ } }, {
                jp_katakana: {
                  $exists: true,
                  '$not': /^$/
                }
              }, { jp_kanji: { $exists: true, '$not': /^$/ } }]
            }
          },
          { $sample: { size: 1 } },
        ])
        break
    }

    const [{ ru: character, _id: characterHash }] = items

    const { _id, study: { lang, topic, level = '' } } = await await UserModel.findOne({ user_id: telegramUserID })

    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Info', callback_data: `get${lang.toUpperCase()}WordInfo` }]
        ]
      })
    }

    await ctx.reply(character, options)
      .catch(error => {
        if (error.response && error.response.statusCode === 403) {
          console.log('status 403')
        }
      })
    await UserModel.findByIdAndUpdate(_id, {
      study: { lang, topic, level, element_hash: characterHash }
    })
  }
}
