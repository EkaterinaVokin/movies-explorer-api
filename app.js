require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // модуль для защиты приложения известных веб-уязвимостей
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const { PORT } = require('./constants');
const { simpleRequest, complexRequest } = require('./middlewares/allowedCors'); // CORS-запросы
const NotFoundError = require('./errors/not-found-err');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const centerErrors = require('./middlewares/centerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(express.json());

app.use(helmet()); // безопасность

app.use(limiter); // защита от множества автоматических запросов

app.use(cookieParser()); // подключаем парсер кук как мидлвэр

app.use(simpleRequest); // простые CORS-запросы
app.use(complexRequest); // сложные CORS-запросы

app.use(requestLogger); // подключаем логгер запросов

// регистрация и авторизация
app.use(routes);

app.use(routes); // регистрация всех маршрутов

app.use(errorLogger); // подключаем логгер ошибок

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(centerErrors); // обработчки централизованных ошибок

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:', PORT);
});
