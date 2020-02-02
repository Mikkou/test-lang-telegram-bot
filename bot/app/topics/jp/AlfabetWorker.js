import AlfabetModel from '../../models/jp/Alfabet.js'
import UserModel from '../../models/User.js'
import User from '../../helpers/User.js'

export default class AlfabetWorker {
  TYPE = null

  constructor (type) {
    this.TYPE = type
  }

  async sendNewElement (telegramUserID, ctx) {
    const items = await AlfabetModel.find({})
    const item = items[User.getRandom(0, items.length - 1)][this.TYPE]
    const { _id: itemHash } = await AlfabetModel.findOne({ [this.TYPE]: item })
    const { _id, study: { lang, topic, level = '' } } = await User.getUserByTlgID(telegramUserID)

    await ctx.reply(item)
      .catch(error => {
        if (error.response && error.response.statusCode === 403) {
          console.log('status 403')
        }
      })
    await UserModel.findByIdAndUpdate(_id, {
      study: { lang, topic, level, element_hash: itemHash }
    })
  }
}
