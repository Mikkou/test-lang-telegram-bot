const Base = require('../Base')
const store = require('../store')

module.exports = class TextBegin extends Base {
  static init (msg) {
    store.isInited = true
    let fromId = msg.from.id
    store.loopId = setInterval(() => {

      if (store.isAnswered) {
        store.lastWord = store.words[TextBegin.getRandom(0, store.words.length - 1)].ru
        super.bot.sendMessage(fromId, store.lastWord).catch( error => {
          if (error.response && error.response.statusCode === 403) {
            clearInterval(store.loopId)
            console.log('status 403')
          }
        })
        store.isAnswered = false
        store.isNotificated = false
      } else {
        if (store.isNotificated) return
        super.bot.sendMessage(fromId, 'Пожалуйста, дайте ответ.').catch(error => {
          if (error.response && error.response.statusCode === 403) {
            clearInterval(store.loopId)
            console.log('status 403')
          }
        })
        store.isNotificated = true
      }


    }, 3000)
  }

  static getRandom (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
