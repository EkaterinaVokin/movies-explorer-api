const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMe, updateProfile } = require('../controllers/users');

router.get('/users/me', getMe); // возвращает информацию о пользователе
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile); // обновляет информацию о пользователе

module.exports = router;
