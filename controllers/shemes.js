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

// создаёт схему
module.exports.createSheme = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, shemeId } =
    req.body; // данные из тела запроса
  Sheme.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    shemeId,
    owner: req.user._id,
  })
    .then((sheme) => res.status(201).send(sheme))
    .catch((err) => {
      // если введённые данные некорректны, передаём сообщение об ошибке и код '400'
      if (err.name === 'ValidationError') {
        return next(new RequestError('Переданы некорректные данные схемы'));
      }
      return next(err); // иначе, передаём ошибку в централизованный обработчик
    });
};

// удаляет схему по идентификатору
module.exports.deleteSheme = (req, res, next) => {
  // req.params содержит параметры маршрута, которые передаются в URL
  const { shemeId } = req.params; // извлекаем значение shemeId из объекта req.params
  return Sheme.findById({ _id: shemeId })
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
