const Scheme = require('../models/scheme'); // импортируем модель

// классы с ответами об ошибках
const RequestError = require('../errors/req-err'); // 400
const NotFoundError = require('../errors/not-found-err'); // 404

// возвращает все схемы
module.exports.getSchemes = (req, res, next) => {
  Scheme.find({}) // status(200) добавляется по дефолту
    .then((schemes) => res.send(schemes.reverse())) // успешно - возвращаем схемы
    .catch(next); // переходим в центролизованный обработчик
};

// переименовывает схему
module.exports.renameScheme = (req, res, next) => {
  // runValidators проверяет поля перед сохранением в БД, new - возвращает обновленный документ
  const options = { runValidators: true, new: true }; // включена валидация и сразу обновление
  const id = req.body._id;

  return Scheme.findByIdAndUpdate(id, { schemeName: req.body.schemeName }, options) // передаём id и новые данные
    .then((scheme) => {
      // если обновление имени выполнено успешно, выполнится след. блок
      if (scheme === null) {
        // если возвращенное значение scheme пустое, ошибка
        throw new NotFoundError('Схема не найдена');
      } // иначе отправим клиенту новые данные
      return res.status(200).send(scheme);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new SchemeExistenceError('Схема с данным именем уже существует'));
      } // если введённые данные некорректны, возвращается ошибка с кодом '400'
      if (err.schemeName === 'ValidationError') {
        next(new RequestError('Переданы некорректные данные схемы'));
      } else {
        // иначе, по-умолчанию, ошибка с кодом '500'
        return next(err); // переходим в центролизованный обработчик приложения
      }
    });
};

// добавляет схему в БД
module.exports.createScheme = (req, res, next) => {
  const { schemeJSON, schemeName } = req.body; // данные из тела запроса
  Scheme.create({ schemeJSON, schemeName })
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
  const { _id } = req.params;
  return Scheme.findById({ _id })
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
