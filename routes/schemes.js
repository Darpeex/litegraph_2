const { celebrate, Joi } = require('celebrate'); // библиотека для валидации данных
const router = require('express').Router(); // создание нового экземпляра маршрутизатора вместо app
const { getSchemes, createScheme, deleteScheme } = require('../controllers/schemes'); // контроллеры

router.get('/schemes', getSchemes); // возвращает все схемы
router.post(
  '/schemes',
  celebrate({
    // создаёт схему
    body: Joi.object().keys({
      schemeJSON: Joi.string().required(),
      schemeName: Joi.string().required(),
    }),
  }),
  createScheme,
);
router.delete(
  '/schemes/:_id',
  celebrate({
    // удаляет схему по идентификатору
    params: Joi.object().keys({
      // проверяет req.params на соответсвие
      _id: Joi.string().length(24).hex().required(), // hex() - от 0 до 9 и букв от A до F
    }),
  }),
  deleteScheme,
);

module.exports = router;
