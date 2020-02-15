import TelegrafInlineMenu from 'telegraf-inline-menu'
import { menu } from '../../menuStructure.js'
import WordsTopic from '../topics/WordsWorker.js'
import AlfabetsJPWorker from '../topics/jp/AlfabetsWorker.js'
import UserHelper from '../helpers/User.js'
import { getLang, words as langWords, LANGS } from '../../langs.js'
import UserModel from '../models/User.js'

export class Menu {

  static get inlineMenu () {

    const langMenu = new TelegrafInlineMenu(async ctx => {
      const from = (ctx.update.message || ctx.update.callback_query).from
      const user = await UserHelper.getUserByTlgID(from.id)
      return langWords[getLang(user.selected_lang)].menu.title.firstLevel
    })

    // this is for guide
    // langMenu.urlButton('Инструкция', 'https://edjopato.de')

    for (const lang of menu) {
      const topicsMenu = new TelegrafInlineMenu(async ctx => {
        const from = ctx.update.callback_query.from
        const user = await UserHelper.getUserByTlgID(from.id)
        return langWords[getLang(user.selected_lang)].menu.title.secondLevel
      })

      // lang button
      langMenu.submenu(async ctx => {
        const from = (ctx.update.message || ctx.update.callback_query).from
        const user = await UserHelper.getUserByTlgID(from.id)
        return langWords[getLang(user.selected_lang)].menu[lang.key]
      }, `selected_lang_${lang.key}`, topicsMenu)

      for (const topic of lang.topics) {

        if (topic.levels && topic.levels.length > 0) {

          const levelsMenu = new TelegrafInlineMenu(async ctx => {
            const from = ctx.update.callback_query.from
            const user = await UserHelper.getUserByTlgID(from.id)
            return langWords[getLang(user.selected_lang)].menu.title.thirstLevel
          })

          // topic button
          topicsMenu.submenu(async ctx => {
            const from = ctx.update.callback_query.from
            const user = await UserHelper.getUserByTlgID(from.id)

            return langWords[getLang(user.selected_lang)].topics[topic.key]
          }, `selected_topic_${topic.key}`, levelsMenu)

          for (const level of topic.levels) {

            // level button
            levelsMenu.button(async ctx => {
              const from = ctx.update.callback_query.from
              const user = await UserHelper.getUserByTlgID(from.id)
              return langWords[getLang(user.selected_lang)].levels[level.key]
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
          topicsMenu.button(async ctx => {
            const from = ctx.update.callback_query.from
            const user = await UserHelper.getUserByTlgID(from.id)
            return langWords[getLang(user.selected_lang)].topics[topic.key]
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
              await obj.sendNewWord(tlgUserId, user.selected_lang, ctx)
            },
            hide: async ctx => {
              const tlgUserId = ctx.update.callback_query.from.id
              const user = await UserHelper.getUserByTlgID(tlgUserId)
              return user.selected_lang === lang.key && !topic.showForSameLang
            }
          })
        }
      }
    }

    langMenu.setCommand('menu')

    return langMenu
  }

  static get choiceYourLang () {
    const menu = new TelegrafInlineMenu(async ctx => {
      const { from } = ctx.update.message || ctx.update.callback_query
      const user = await UserModel.findOne({ user_id: from.id })
      if (user) {
        await Object.assign(user, from).save()
      } else {
        const newUser = new UserModel({
          user_id: from.id,
          is_bot: from.is_bot,
          first_name: from.first_name,
          last_name: from.last_name,
          user_name: from.username,
          language_code: from.language_code
        })
        await newUser.save().catch(err => console.log(err))
      }
      return '🤙'
    })

    for (const langKey of Object.keys(LANGS)) {
      menu.button(LANGS[langKey], `selected_your_lang_${langKey}`, {
        doFunc: async ctx => {
          const tlgUserId = ctx.update.callback_query.from.id
          const user = await UserHelper.getUserByTlgID(tlgUserId)
          await UserHelper.saveProperties(user._id, {
            'selected_lang': langKey
          })
          await ctx.reply('→ /menu')
        }
      })
    }

    menu.setCommand('start')
    return menu
  }
}
