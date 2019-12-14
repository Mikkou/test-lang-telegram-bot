require('dotenv').config()

// Подключаем библиотеку для работы с Telegram API в переменную
var TelegramBot = require('node-telegram-bot-api')

// Устанавливаем токен, который выдавал нам бот
var token = process.env.TOKEN
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true })

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием, то есть "Hello World!")
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id // Получаем ID отправителя
  var resp = match[1] // Получаем текст после /echo
  bot.sendMessage(fromId, resp)
})

// Простая команда без параметров
bot.on('message', function (msg) {
  var chatId = msg.chat.id // Берем ID чата (не отправителя)
  // Фотография может быть: путь к файлу, поток (stream) или параметр file_id
  var photo = '123.jpg' // в папке с ботом должен быть файл "cats.png"
  bot.sendPhoto(chatId, photo, { caption: 'Милые котята' })
})


// var TelegramBot = require('node-telegram-bot-api')
//
// var token = process.env.TOKEN
// var bot = new TelegramBot(token, { polling: true })
//
// var notes = []
//
// bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
//   var userId = msg.from.id
//   var text = match[1]
//   var time = match[2]
//
//   notes.push({ 'uid': userId, 'time': time, 'text': text })
//
//   bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)')
// })
//
// setInterval(function () {
//   for (var i = 0; i < notes.length; i++) {
//     const curDate = new Date().getHours() + ':' + new Date().getMinutes()
//     if (notes[i]['time'] === curDate) {
//       bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: ' + notes[i]['text'] + ' сейчас.')
//       notes.splice(i, 1)
//     }
//   }
// }, 1000)



