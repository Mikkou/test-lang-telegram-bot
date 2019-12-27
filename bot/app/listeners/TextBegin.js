import Base from '../Base.js'
import UserHelper from '../helpers/User.js'

export default class TextBegin extends Base {
  static async init ({ from: { id: telegramUserID } }) {
    await UserHelper.sendNewWord(telegramUserID)
  }
}
