const mongoose = require('mongoose'); // нужна для создании схем

// Создаём схему и задаём её поля
const shemeSchema = new mongoose.Schema(
  {
    shemeData: {
      type: String,
      required: [true, 'Данные JSON схемы не переданы'],
    },
    shemeId: {
      type: Number,
      required: [true, 'Id схемы не передан'],
    },
  },
  { versionKey: false }, // убирает поле '__v' из ответа
);

const Scheme = mongoose.model('sheme', shemeSchema); // создание модели
module.exports = Scheme; // экспорт модели
