const Base = require('../Base')
const UserHelper = require('../helpers/User')

module.exports = class TextBegin extends Base {
  static async init ({ from: { id: telegramUserID } }) {
    await UserHelper.sendNewWord(telegramUserID)
  }
}
