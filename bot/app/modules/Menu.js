import TelegrafInlineMenu from 'telegraf-inline-menu'
import { menu } from '../../menuStructure.js'
import WordsTopic from '../topics/WordsWorker.js'
import AlfabetsJPWorker from '../topics/jp/AlfabetsWorker.js'
import UserHelper from '../helpers/User.js'
import { getLang, words as langWords } from '../../langs.js'

export class Menu {

  static get inlineMenu () {
    const langMenu = new TelegrafInlineMenu(ctx => {
      const from = (ctx.update.message || ctx.update.callback_query).from
      return langWords[getLang(from.language_code)].menu.title.firstLevel
    })

    // this is for guide
    // langMenu.urlButton('Инструкция', 'https://edjopato.de')

    for (const lang of menu) {
      const topicsMenu = new TelegrafInlineMenu(ctx => {
        return langWords[getLang(ctx.update.callback_query.from.language_code)].menu.title.secondLevel
      })

      // lang button
      langMenu.submenu(ctx => {
        const from = (ctx.update.message || ctx.update.callback_query).from
        return langWords[getLang(from.language_code)].menu[lang.key]
      }, `selected_lang_${lang.key}`, topicsMenu)

      for (const topic of lang.topics) {

        if (topic.levels && topic.levels.length > 0) {

          const levelsMenu = new TelegrafInlineMenu(ctx => {
            return langWords[getLang(ctx.update.callback_query.from.language_code)].menu.title.thirstLevel
          })

          // topic button
          topicsMenu.submenu(ctx => {
            return langWords[getLang(ctx.update.callback_query.from.language_code)].topics[topic.key]
          }, `selected_topic_${topic.key}`, levelsMenu)

          for (const level of topic.levels) {

            // level button
            levelsMenu.button(ctx => {
              return langWords[getLang(ctx.update.callback_query.from.language_code)].levels[level.key]
            }, `selected_level_${level.key}`, {
              doFunc: async ctx => {
                const tlgUserId = ctx.update.callback_query.from.id
                const user = await UserHelper.getUserByTlgID(tlgUserId)
                await UserHelper.saveProperties(user._id, {
                  study: {
                    lang: lang.key,
                    topic: topic.key,
                    level: level.key
                  }
                })
                const alfJPObj = new AlfabetsJPWorker(topic.key)
                await alfJPObj.sendNewElement(tlgUserId, ctx)
              }
            })

          }

        } else {

          // topic button
          topicsMenu.button(ctx => {
            return langWords[getLang(ctx.update.callback_query.from.language_code)].topics[topic.key]
          }, `choose_topic_${topic.key}`, {
            doFunc: async ctx => {
              const tlgUserId = ctx.update.callback_query.from.id
              const user = await UserHelper.getUserByTlgID(tlgUserId)
              await UserHelper.saveProperties(user._id, {
                study: {
                  lang: lang.key,
                  topic: topic.key
                }
              })
              const obj = new WordsTopic(lang.key)
              await obj.sendNewWord(tlgUserId, ctx)
            }
          })

        }
      }

    }

    langMenu.setCommand('menu')

    return langMenu
  }
}
