// здесь обрабатываем все ошибки
const errorHandler = (err, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500 // проверяем статус
        ? 'На сервере произошла ошибка' // если статус кода 500
        : message, // иначе сообщение пришедшей ошибки
  });
  return next();
};

module.exports = errorHandler;
