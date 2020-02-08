import AlfabetModel from '../../models/jp/Alfabet.js'
import UserModel from '../../models/User.js'
import User from '../../helpers/User.js'

export default class AlfabetWorker {
  TYPE = null

  constructor (type) {
    this.TYPE = type
  }

  async sendNewElement (telegramUserID, ctx) {
    const [{ [this.TYPE]: character, _id: characterHash }] = await AlfabetModel.aggregate([{ $sample: { size: 1 } }])
    const { _id, study: { lang, topic, level = '' } } = await User.getUserByTlgID(telegramUserID)

    await ctx.reply(character)
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
