const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { PORT } = require('./constants');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(errors()); // обработчик ошибок celebrate

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:', PORT);
});
