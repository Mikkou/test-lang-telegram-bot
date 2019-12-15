require('dotenv').config()

let TelegramBot = require('node-telegram-bot-api')
const words = require('./words')

let token = process.env.TOKEN
let bot = new TelegramBot(token, { polling: true })

let loopId = null
let isAnswered = true
let isInited = false
let isNotificated = false
let lastWord = null

function getRandom (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

bot.onText(/\/start/, function (msg) {
  let fromId = msg.from.id
  bot.sendMessage(fromId, 'Приветик(:. Если хотите начать изучать слова, введите команду /begin.')
})

bot.onText(/\/begin/, function (msg) {
  isInited = true
  let fromId = msg.from.id
  loopId = setInterval(() => {

    if (isAnswered) {
      lastWord = words[getRandom(0, words.length - 1)].ru
      bot.sendMessage(fromId, lastWord).catch(function (error) {
        if (error.response && error.response.statusCode === 403) {
          clearInterval(loopId)
          console.log('status 403')
        }
      })
      isAnswered = false
      isNotificated = false
    } else {
      if (isNotificated) return
      bot.sendMessage(fromId, 'Пожалуйста, дайте ответ.').catch(function (error) {
        if (error.response && error.response.statusCode === 403) {
          clearInterval(loopId)
          console.log('status 403')
        }
      })
      isNotificated = true
    }


  }, 3000)
})

bot.on('message', e => {
  if (isInited) {

    let enWord = null
    for (const word of words) {
      if (word.ru === lastWord) {
        enWord = word.en
      }
    }

    if (enWord && enWord === e.text.toLowerCase()) {
      bot.sendMessage(e.from.id, 'Ответ верный!')
      isAnswered = true
    } else {
      bot.sendMessage(e.from.id, 'Ответ неверный!')
      isNotificated = false
    }
  }
})
