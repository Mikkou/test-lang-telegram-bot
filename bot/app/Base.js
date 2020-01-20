import dotenv from 'dotenv'
import Telegraf from 'telegraf'
import mongoose from 'mongoose'
dotenv.config()

const bot = new Telegraf(process.env.TOKEN)

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL, options)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

export default class Base {
  static bot = bot
}
