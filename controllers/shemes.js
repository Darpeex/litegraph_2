const Scheme = require('../models/scheme'); // импортируем модель

// классы с ответами об ошибках
const RequestError = require('../errors/req-err'); // 400
const NotFoundError = require('../errors/not-found-err'); // 404

// возвращает все схемы
module.exports.getSchemes = (res, next) => {
  Scheme.find({}) // status(200) добавляется по дефолту
    .then((schemes) => res.send(schemes.reverse())) // успешно - возвращаем схемы
    .catch(next); // переходим в центролизованный обработчик
};

// возвращает конкретную схему
module.exports.getScheme = (req, res, next) => {
  const { schemeId } = req.params; // извлекаем значение schemeId из объекта req.params
  Scheme.find({ schemeId }) // status(200) добавляется по дефолту
    .then((schemes) => res.send(schemes.reverse())) // успешно - возвращаем схемы
    .catch(next); // переходим в центролизованный обработчик
};

// добавляет схему в БД
module.exports.createScheme = (req, res, next) => {
  const { schemeData, schemeId } = req.body; // данные из тела запроса
  Scheme.create({ schemeData, schemeId })
    .then((scheme) => res.status(201).send(scheme))
    .catch((err) => {
      // если данные некорректны, передаём сообщение об ошибке и код '400'
      if (err.name === 'ValidationError') {
        return next(new RequestError('Переданы некорректные данные схемы'));
      }
      return next(err); // иначе, передаём ошибку в централизованный обработчик
    });
};

// удаляет схему по идентификатору
module.exports.deleteScheme = (req, res, next) => {
  const { schemeId } = req.params;
  return Scheme.findById({ schemeId })
    .orFail(new Error('schemeNotFound'))
    .then((scheme) => {
      return Scheme.deleteOne(scheme).then(() => res.status(200).send({ message: 'Схема успешно удалена' }));
    })
    .catch((err) => {
      if (err.message === 'schemeNotFound') {
        return next(new NotFoundError('Схема не найдена'));
      }
      if (err.name === 'CastError') {
        return next(new RequestError('Некорректный Id схемы'));
      }
      return next(err); // передаём ошибку в централизованный обработчик
    });
};
