const { celebrate, Joi } = require('celebrate'); // библиотека для валидации данных
const router = require('express').Router(); // создание нового экземпляра маршрутизатора вместо app
const schemeController = require('../controllers/schemes'); // контроллеры

router.get('/schemes', schemeController.getSchemes); // возвращает все схемы
// переименовывает схему
router.patch(
  '/schemes',
  celebrate({
    body: Joi.object().keys({
      _id: Joi.number().required(),
      schemename: Joi.string().required(),
    }),
  }),
  schemeController.renameScheme,
);
// создаёт схему
router.post(
  '/schemes',
  celebrate({
    body: Joi.object().keys({
      schemeJSON: Joi.object().required(),
      schemeName: Joi.string().required(),
    }),
  }),
  schemeController.createScheme,
);
// удаляет схему по идентификатору
router.delete(
  '/schemes/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.number().required(),
    }),
  }),
  schemeController.deleteScheme,
);

module.exports = router;
