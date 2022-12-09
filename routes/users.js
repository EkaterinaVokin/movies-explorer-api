const router = require('express').Router();
const { validationUpdateProfile } = require('../middlewares/validations');
const { getMe, updateProfile, logout } = require('../controllers/users');

router.get('/users/me', getMe); // возвращает информацию о пользователе
router.patch('/users/me', validationUpdateProfile, updateProfile); // обновляет информацию о пользователе

// выход
router.delete('/signout', logout);

module.exports = router;
