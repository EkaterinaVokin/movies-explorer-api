const express = require('express');
const app = express();

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:', PORT);
});
