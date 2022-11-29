const allowedCors = [
  'https://movies.project.nomoredomains.club',
  'http://movies.project.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3001',
]; // домен который разрешен

// простые CORS-запросы
const simpleRequest = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  if (allowedCors.includes(origin)) { // проверяем, что источник запроса есть среди разрешённых
    res.header('Access-Control-Allow-Origin', origin); // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Credentials', true);
  }
  next(); // Если источник запроса не найден,браузер сам заблокирует запрос
};

// сложные CORS-запросы
const complexRequest = (req, res, next) => {
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'; // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса
  if (method === 'OPTIONS') { // Если это предварительный запрос, добавляем нужные заголовки
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end(); // завершаем обработку запроса и возвращаем результат клиенту
    return;
  }
  next();
};

module.exports = {
  simpleRequest,
  complexRequest,
};
