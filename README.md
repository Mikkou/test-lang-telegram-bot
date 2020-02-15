# Test lang telegram bot
This is node.js system for telegram bot, which help people to learn english and japanese.

You can try: https://t.me/wakaiyama_bot

## Tech stack
- strapi (admin panel)
- telegraf (telegram bot framework)
- mongo (database)

## Quick start

```
git clone git@github.com:Mikkou/test-lang-telegram-bot.git
```

```
cd test-lang-telegram-bot
```
create .env file and put in your telegram bot token
```
cp bot/env bot/.env
```

```
docker-compose up -d
```

### Let's write command '/start' in your bot!
