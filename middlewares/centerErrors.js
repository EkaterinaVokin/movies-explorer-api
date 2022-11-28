module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err; // ошибка на сервере по умолчанию
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка на стороне сервера'
        : message,
    });
  next();
};
