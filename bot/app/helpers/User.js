import Base from '../Base.js'
import UserModel from '../models/User.js'

export default class User extends Base {
  static async saveProperties (userID, obj) {
    await UserModel.findByIdAndUpdate(userID, obj)
  }

  static async getUserByTlgID (telegramUserID) {
    return await UserModel.findOne({ user_id: telegramUserID })
  }
}
