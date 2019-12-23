const Base = require('../Base')

module.exports = class TextStart extends Base {

  init (msg) {
    let fromId = msg.from.id
    super.bot.sendMessage(fromId, 'Приветик(:. Если хотите начать изучать слова, введите команду /begin.')
  }
}
