const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// 🔎 Логи переменных
console.log("🔐 BOT_TOKEN:", process.env.BOT_TOKEN);
console.log("🌐 BOT_DOMAIN:", process.env.BOT_DOMAIN);

// Регистрируем команду /start
bot.command('start', (ctx) => {
  console.log("📩 Получен /start");
  ctx.reply('Привет! Railway Telegram Bot работает 🚀');
});

// Логика WebApp
bot.on('web_app_data', (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);
    ctx.reply(`Ты выбрал: ${data.matchId}`);
  } catch (e) {
    ctx.reply('Ошибка обработки данных ⚠️');
  }
});

// Устанавливаем callback на /webhook
app.use(bot.webhookCallback('/webhook'));

// Для проверки в браузере
app.get('/', (req, res) => {
  res.send('🚀 Бот запущен');
});

// Запускаем Express сервер
app.listen(3000, async () => {
  console.log('🚀 Сервер слушает порт 3000');

  // Telegram сам установит Webhook, если он удалён
});
