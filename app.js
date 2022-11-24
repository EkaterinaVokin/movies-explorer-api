const express = require('express');
const mongoose = require('mongoose');
const { PORT } = require('./constants');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:', PORT);
});
