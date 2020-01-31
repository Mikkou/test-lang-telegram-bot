import TelegrafInlineMenu from 'telegraf-inline-menu'
import langs from '../../langs.js'
import UserHelper from '../helpers/User.js'

const langMenu = new TelegrafInlineMenu('Выберите язык для изучения:')

// this is for guide
// langMenu.urlButton('Инструкция', 'https://edjopato.de')

for (const lang of langs) {

  const topicsMenu = new TelegrafInlineMenu('Выберите тему:')

  langMenu.submenu(lang.name, `choose_lang_${lang.key}`, topicsMenu)

  for (const topic of lang.topics) {
    topicsMenu.button(topic.name, `choose_topic_${topic.key}`, {
      doFunc: async (ctx) => {
        const tlgUserId = ctx.update.callback_query.from.id
        const user = await UserHelper.getUserByTlgID(tlgUserId)
        await UserHelper.saveProperties(user._id, {
          study: {
            lang: lang.key,
            topic: topic.key
          }
        })
        await UserHelper.sendNewWord(tlgUserId, ctx)
      }
    })
  }

}

langMenu.setCommand('menu')

export const Menu = langMenu
