const mongoose = require('mongoose'); // нужна для создании схем

// Создаём схему и задаём её поля
const schemeSchema = new mongoose.Schema(
  {
    schemeData: {
      type: String,
      required: [true, 'Данные JSON схемы не переданы'],
    },
    schemeId: {
      type: Number,
      required: [true, 'Id схемы не передан'],
    },
  },
  { versionKey: false }, // убирает поле '__v' из ответа
);

const Scheme = mongoose.model('scheme', schemeSchema); // создание модели
module.exports = Scheme; // экспорт модели
