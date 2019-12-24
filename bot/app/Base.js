require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TOKEN, { polling: true })
const mongoose = require('mongoose')

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL, options)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

module.exports = class Base {
  static bot = bot
}
