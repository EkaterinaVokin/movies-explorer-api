require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // модуль для защиты приложения известных веб-уязвимостей
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const { simpleRequest, complexRequest } = require('./middlewares/allowedCors'); // CORS-запросы
const routes = require('./routes/index');
const centerErrors = require('./middlewares/centerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_BASEURL, PORT_MAIN } = require('./utils/config');

const app = express();

app.use(express.json());

app.use(helmet()); // безопасность

app.use(cookieParser()); // подключаем парсер кук как мидлвэр

app.use(simpleRequest); // простые CORS-запросы
app.use(complexRequest); // сложные CORS-запросы

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter); // защита от множества автоматических запросов

app.use(routes); // регистрация всех маршрутов

app.use(errorLogger); // подключаем логгер ошибок

mongoose.connect(DB_BASEURL);

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(centerErrors); // обработчки централизованных ошибок

app.listen(PORT_MAIN, () => {
  console.log('Сервер запущен на порту:', PORT_MAIN);
});
