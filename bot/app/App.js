const Base = require('./Base')
const TextStart = require('./listeners/TextStart')
const TextBegin = require('./listeners/TextBegin')
const Message = require('./listeners/Message')

module.exports = class App extends Base {
  static initListeners () {
    super.bot.onText(/\/start/, TextStart.init)
    super.bot.onText(/\/begin/,  TextBegin.init)
    super.bot.on('message', Message.init)
  }
}
