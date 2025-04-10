const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// 🔐 Лог переменной токена
console.log("🔐 BOT_TOKEN:", process.env.BOT_TOKEN);
console.log("🌐 BOT_DOMAIN:", process.env.BOT_DOMAIN);

// Команда /start
bot.command('start', (ctx) => {
  ctx.reply('Привет! Railway Telegram Bot работает 🚀');
});

// Обработка данных из WebApp
bot.on('web_app_data', (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);
    ctx.reply(`Ты выбрал: ${data.matchId}`);
  } catch (e) {
    ctx.reply('Ошибка при обработке данных 🧨');
  }
});

// Подключение Webhook
app.use(bot.webhookCallback('/webhook'));

// Корневая страница
app.get('/', (req, res) => res.send('🚀 Bot is running'));

// Установка Webhook
if (process.env.BOT_DOMAIN) {
  bot.telegram.setWebhook(`${process.env.BOT_DOMAIN}/webhook`);
} else {
  console.error("❌ BOT_DOMAIN не указан");
}

// Запуск сервера
app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
