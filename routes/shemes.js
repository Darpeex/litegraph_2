const { celebrate, Joi } = require('celebrate'); // библиотека для валидации данных
const router = require('express').Router(); // создание нового экземпляра маршрутизатора вместо app
const { getShemes, createSheme, deleteSheme } = require('../controllers/shemes'); // контроллеры

const RegExp = /^(http|https):\/\/(www\.)?[a-zA-Z0-9\--._~:/?#[\]@!$&'()*+,;=]+#?$/;

router.get('/shemes', getShemes); // возвращает все схемы
router.post(
  '/shemes',
  celebrate({
    // создаёт схему
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().pattern(RegExp).required(),
      trailerLink: Joi.string().pattern(RegExp).required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().pattern(RegExp).required(),
      shemeId: Joi.number().integer().required(),
    }),
  }),
  createSheme,
);
router.delete(
  '/shemes/:shemeId',
  celebrate({
    // удаляет схему по идентификатору
    params: Joi.object().keys({
      // проверяет req.params на соответсвие
      shemeId: Joi.string().length(24).hex().required(), // hex() - от 0 до 9 и букв от A до F
    }),
  }),
  deleteSheme,
);

module.exports = router;
