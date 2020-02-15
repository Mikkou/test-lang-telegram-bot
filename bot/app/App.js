import Base from './Base.js'
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
    super.bot.use(Menu.choiceYourLang.init())
  }

  static initListeners () {
    super.bot.on('callback_query', CallbackQuery.init)
    super.bot.on('text', Message.init)
  }
}
