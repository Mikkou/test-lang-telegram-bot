import Base from './Base.js'
import TextStart from './listeners/TextStart.js'
import TextBegin from './listeners/TextBegin.js'
import Message from './listeners/Message.js'
import CallbackQuery from './listeners/CallbackQuery.js'

export default class App extends Base {
  static initListeners () {
    super.bot.onText(/\/start/, TextStart.init)
    super.bot.onText(/\/begin/,  TextBegin.init)
    super.bot.on('callback_query', CallbackQuery.init)
    super.bot.on('message', Message.init)
  }
}
