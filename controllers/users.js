const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

// возвращать пользователя
const getMe = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователя с запрошенным _id не существует'));
      } else {
        next(err);
      }
    });
};

// обновляет профиль
const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true }).orFail()
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователя с запрошенным _id не существует'));
      } else {
        next(err);
      }
    });
};

// регистрация пользователя(создается пользователь)
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id, email: user.email, name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === MONGO_CODE) {
        next(new ConflictingRequestError('Имя пользователя уже зарегистрировано, измените имя пользователя'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Запрос был неправильно сформирован'));
      } else {
        next(err);
      }
    });
};
module.exports = {
  getMe,
  updateProfile,
};
