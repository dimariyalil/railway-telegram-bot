const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("🔐 BOT_TOKEN:", process.env.BOT_TOKEN);
console.log("🌐 BOT_DOMAIN:", process.env.BOT_DOMAIN);

bot.command('start', (ctx) => {
  console.log("📩 Получен /start");
  ctx.reply('Привет! Railway Telegram Bot работает 🚀');
});

bot.on('web_app_data', (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);
    ctx.reply(`Ты выбрал: ${data.matchId}`);
  } catch (e) {
    ctx.reply('Ошибка обработки данных ⚠️');
  }
});

// Лог запроса от Telegram
app.post('/webhook', express.json(), (req, res, next) => {
  console.log("📩 Входящий запрос от Telegram:", req.body);
  next();
});

// Обработка Webhook с Telegraf
app.use('/webhook', (req, res) => {
  bot.handleUpdate(req.body, res)
    .then(() => res.status(200).end())
    .catch((err) => {
      console.error("❌ Ошибка при обработке Webhook:", err);
      res.status(500).end();
    });
});

// Проверка в браузере
app.get('/', (req, res) => {
  res.send('🚀 Бот запущен и работает');
});

app.listen(3000, () => {
  console.log('🚀 Сервер слушает порт 3000');
});
