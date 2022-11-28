const { default: mongoose } = require('mongoose');
const Film = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

// возвращает все сохраненные фильмы
const getFilms = (req, res, next) => {
  const owner = req.user._id; // _id пользователя
  Film.find({ owner })
    .then((films) => {
      res.send(films);
    })
    .catch((err) => {
      next(err);
    });
};

// создаёт фильм
const createFilm = (req, res, next) => {
  const owner = req.user._id; // _id пользователя
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Film.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((film) => {
      res.status(201).send(film);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        console.log(err);
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
const deleteFilm = (req, res, next) => {
  Film.findById(req.params.id)
    .orFail()
    .then((film) => {
      if (film.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удаление фильма другого пользователя');
      }
      return film.remove();
    })
    .then(() => {
      res.send({ message: 'Пост удален' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Фильм с указанным _id не найден.'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Удаление фильма с некорректным id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createFilm,
  getFilms,
  deleteFilm,
};
