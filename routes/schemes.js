const { celebrate, Joi } = require('celebrate'); // библиотека для валидации данных
const router = require('express').Router(); // создание нового экземпляра маршрутизатора вместо app
const { getSchemes, renameScheme, createScheme, deleteScheme } = require('../controllers/schemes'); // контроллеры

router.get('/schemes', getSchemes); // возвращает все схемы
// переименовывает схему
router.patch(
  '/schemes',
  celebrate({
    body: Joi.object().keys({
      schemeName: Joi.string().required(),
      _id: Joi.string().length(24).hex().required(), // hex() - от 0 до 9 и букв от A до F
    }),
  }),
  renameScheme,
);
// создаёт схему
router.post(
  '/schemes',
  celebrate({
    body: Joi.object().keys({
      schemeJSON: Joi.string().required(),
      schemeName: Joi.string().required(),
    }),
  }),
  createScheme,
);
// удаляет схему по идентификатору
router.delete(
  '/schemes/:_id',
  celebrate({
    params: Joi.object().keys({
      // проверяет req.params на соответсвие
      _id: Joi.string().length(24).hex().required(), // hex() - от 0 до 9 и букв от A до F
    }),
  }),
  deleteScheme,
);

module.exports = router;
