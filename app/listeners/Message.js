const Base = require('../Base')
const store = require('../store')

module.exports = class Message extends Base {
  static init (e) {
    if (store.isInited) {

      let enWord = null
      for (const word of store.words) {
        if (word.ru === store.lastWord) {
          enWord = word.en
        }
      }

      if (enWord && enWord === e.text.toLowerCase()) {
        super.bot.sendMessage(e.from.id, 'Ответ верный!')
        store.isAnswered = true
      } else {
        super.bot.sendMessage(e.from.id, 'Ответ неверный!')
        store.isNotificated = false
      }
    }
  }
}
