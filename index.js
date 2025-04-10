const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply('Привет! Railway Telegram Bot работает 🚀');
});

bot.on('web_app_data', (ctx) => {
  const data = JSON.parse(ctx.webAppData.data);
  ctx.reply(`Ты выбрал: ${data.matchId}`);
});

app.use(bot.webhookCallback('/webhook'));

app.get('/', (req, res) => res.send('🚀 Bot is running'));

bot.telegram.setWebhook(`${process.env.BOT_DOMAIN}/webhook`);

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
