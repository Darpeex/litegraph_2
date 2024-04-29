// const path = require('path'); // модуль - используем для разрешения доступа к папкам
const helmet = require('helmet'); // модуль для обеспечения безопасности приложения Express
const express = require('express'); // фреймворк для создания веб-приложений на Node.js
// const mongoose = require('mongoose'); // модуль для работы с базой данных MongoDB
const { errors } = require('celebrate'); // мидлвэр для ошибок валидации полей
const dotenv = require('dotenv'); // модуль для получения данных из .env
const cors = require('cors'); // модуль для защиты запросов к api

const NotFoundError = require('./errors/not-found-err'); // экземпляр класса с ошибкой 404
const { requestLogger, errorLogger } = require('./middlewares/logger'); // логгер
const errorHandler = require('./middlewares/error-handler'); // мидлвар для централизованной обработки ошибок

// маршрут для схем:
const schemeRouter = require('./routes/schemes');

dotenv.config(); // для получения данных из .env. Можно короче "require('dotenv').config();"
const { PORT = 3000, BD_URL = 'mongodb://localhost:27017/litegraphdb' } = process.env; // порт и ссылка на БД

const app = express(); // cоздаём объект приложения

// список разрешенных доменов
const whitelist = ['https://localhost:3001', 'http://localhost:3001'];

const corsOptions = {
  origin: whitelist, // источник домена (откуда запрос)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // методы
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization', // заголовки
};

app.use(cors(corsOptions)); // доступ для других доменов
app.use(helmet()); // использование модуля безопасности
app.use(express.json()); // для сборки JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// подключение к mongodb
// mongoose
//   .connect(BD_URL, {
//     useNewUrlParser: true, // обеспечивает совместимость с будущими версиями MongoDB
//   })
//   .then(() => console.log('Подключились к БД'));

// логгер запросов
app.use(requestLogger);

// роуты
app.use(schemeRouter);

// предупреждаем переход по отсутсвующему пути
app.use((req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate от валидации joi
app.use(errors());

// централизованный обработчик
app.use(errorHandler);

// app.use(express.static(path.join(__dirname, 'public'))); // делаем папку общедоступной
app.listen(PORT, () => {
  console.log(`Порт приложения: ${PORT}`);
});
