const Sheme = require('../models/sheme'); // импортируем модель

// классы с ответами об ошибках
const RequestError = require('../errors/req-err'); // 400
const NotFoundError = require('../errors/not-found-err'); // 404

// возвращает все схемы
module.exports.getShemes = (res, next) => {
  Sheme.find({}) // status(200) добавляется по дефолту
    .then((shemes) => res.send(shemes.reverse())) // успешно - возвращаем схемы
    .catch(next); // переходим в центролизованный обработчик
};

// возвращает конкретную схему
module.exports.getShemes = (req, res, next) => {
  const { shemeId } = req.params; // извлекаем значение shemeId из объекта req.params
  Sheme.find({ shemeId }) // status(200) добавляется по дефолту
    .then((shemes) => res.send(shemes.reverse())) // успешно - возвращаем схемы
    .catch(next); // переходим в центролизованный обработчик
};

// добавляет схему в БД
module.exports.createSheme = (req, res, next) => {
  const { shemeData, shemeId } = req.body; // данные из тела запроса
  Sheme.create({ shemeData, shemeId })
    .then((sheme) => res.status(201).send(sheme))
    .catch((err) => {
      // если данные некорректны, передаём сообщение об ошибке и код '400'
      if (err.name === 'ValidationError') {
        return next(new RequestError('Переданы некорректные данные схемы'));
      }
      return next(err); // иначе, передаём ошибку в централизованный обработчик
    });
};

// удаляет схему по идентификатору
module.exports.deleteSheme = (req, res, next) => {
  const { shemeId } = req.params;
  return Sheme.findById({ shemeId })
    .orFail(new Error('shemeNotFound'))
    .then((sheme) => {
      return Sheme.deleteOne(sheme).then(() => res.status(200).send({ message: 'Схема успешно удалена' }));
    })
    .catch((err) => {
      if (err.message === 'shemeNotFound') {
        return next(new NotFoundError('Схема не найдена'));
      }
      if (err.name === 'CastError') {
        return next(new RequestError('Некорректный Id схемы'));
      }
      return next(err); // передаём ошибку в централизованный обработчик
    });
};
