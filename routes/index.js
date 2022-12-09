const router = require('express').Router();
const { validationLogin, validationCreateUser } = require('../middlewares/validations');
const { login, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { NO_RESOURCE } = require('../utils/constants');

// авторизация
router.post('/signin', validationLogin, login);

// регистрация
router.post('/signup', validationCreateUser, createUser);

router.use('/', auth, usersRouter);
router.use('/', auth, moviesRouter);

// обработка несуществующих маршрутов
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(NO_RESOURCE));
});

module.exports = router;
