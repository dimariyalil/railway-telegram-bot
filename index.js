const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("🔐 BOT_TOKEN:", process.env.BOT_TOKEN);
console.log("🌐 BOT_DOMAIN:", process.env.BOT_DOMAIN);

bot.command('start', (ctx) => {
  ctx.reply('Привет! Railway Telegram Bot работает 🚀');
});

bot.on('web_app_data', (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);
    ctx.reply(`Ты выбрал: ${data.matchId}`);
  } catch (e) {
    ctx.reply('Ошибка при обработке данных 🧨');
  }
});

// Подключаем webhook перед запуском сервера
app.use(bot.webhookCallback('/webhook'));

app.get('/', (req, res) => res.send('🚀 Bot is running'));

// Запуск Express-сервера
app.listen(3000, async () => {
  console.log('🚀 Server running on port 3000');

  // И только после запуска сервера — ставим webhook
  if (process.env.BOT_DOMAIN) {
    try {
      const res = await bot.telegram.setWebhook(`${process.env.BOT_DOMAIN}/webhook`);
      console.log("✅ Webhook set successfully", res);
    } catch (e) {
      console.error("❌ Failed to set webhook:", e);
    }
  } else {
    console.error("❌ BOT_DOMAIN is missing");
  }
});
