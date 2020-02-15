import Base from './Base.js'
import TextStart from './listeners/TextStart.js'
import Message from './listeners/Message.js'
import CallbackQuery from './listeners/CallbackQuery.js'
import { Menu } from './modules/Menu.js'

export default class App extends Base {
  static start () {
    App.initModules()
    App.initListeners()
    super.bot.startPolling()
  }

  static initModules () {
    super.bot.use(Menu.inlineMenu.init({
      mainMenuButtonText: '←'
    }))
  }

  static initListeners () {
    super.bot.start(TextStart.init)
    super.bot.on('callback_query', CallbackQuery.init)
    super.bot.on('text', Message.init)
  }
}
