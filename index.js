const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

app.use(express.json()); // обязательно, чтобы Express понимал JSON

// 📌 Обработка Telegram Webhook вручную
app.post('/webhook', (req, res) => {
  bot.handleUpdate(req.body)
    .then(() => {
      console.log('📩 Обновление от Telegram принято');
      res.status(200).send('OK');
    })
    .catch((err) => {
      console.error('❌ Ошибка при обработке Webhook:', err);
      res.status(500).send('Error');
    });
});

// Проверка в браузере
app.get('/', (req, res) => {
  res.send('✅ Бот на Railway запущен');
});

// Запуск Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
