const mongoose = require('mongoose'); // нужна для создании схем
const validator = require('validator'); // библиотека для валидации данных

// Создаём схему и задаём её поля
const shemeSchema = new mongoose.Schema(
  {
    country: { // страна создания схемы
      type: String,
      // при не соответствии условиям в [] - выдаются ошибки
      required: [true, 'Поле "country" должно быть заполнено'],
    },
    director: { // режиссёр схемыа
      type: String,
      required: [true, 'Поле "director" должно быть заполнено'],
    },
    duration: { // длительность схемыа
      type: Number,
      required: [true, 'Поле "duration" должно быть заполнено'],
    },
    year: { // год выпуска схемыа
      type: String,
      required: [true, 'Поле "year" должно быть заполнено'],
    },
    description: { // описание схемыа
      type: String,
      required: [true, 'Поле "description" должно быть заполнено'],
    },
    image: { // ссылка на постер к схемыу
      type: String,
      required: [true, 'Поле "image" должно быть заполнено'],
      validate: { // проверка на соответствие url
        validator: (value) => validator.isURL(value),
        message: 'Некорректный URL',
      },
    },
    trailerLink: { // ссылка на трейлер схемыа
      type: String,
      required: [true, 'Поле "trailerLink" должно быть заполнено'],
      validate: { // проверка на соответствие url
        validator: (value) => validator.isURL(value),
        message: 'Некорректный URL',
      },
    },
    thumbnail: { // миниатюрное изображение постера к схемыу
      type: String,
      required: [true, 'Поле "thumbnail" должно быть заполнено'],
      validate: { // проверка на соответствие url
        validator: (value) => validator.isURL(value),
        message: 'Некорректный URL',
      },
    },
    owner: { // _id пользователя, который сохранил схемы.
      type: mongoose.Schema.Types.ObjectId, // тип данных для работы с идентификаторами(ObjectId)
      required: [true, 'Поле "owner" должно быть заполнено'],
      ref: 'User',
    },
    shemeId: { // id схемы, который содержится в ответе сервиса shemesExplorer
      type: Number,
      required: [true, 'Поле "shemeId" должно быть заполнено'],
    },
    nameRU: { // название схемы на русском языке
      type: String,
      required: [true, 'Поле "nameRU" должно быть заполнено'],
    },
    nameEN: { // название схемы на английском языке
      type: String,
      required: [true, 'Поле "nameEN" должно быть заполнено'],
    },
  },
  { versionKey: false }, // убирает поле '__v' из ответа
);

const Scheme = mongoose.model('sheme', shemeSchema); // создание модели
module.exports = Scheme; // экспорт модели
