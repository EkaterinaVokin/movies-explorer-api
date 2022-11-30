const { default: mongoose } = require('mongoose');
const Film = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  INCORRECT_DATA_MOVIE,
  POST_DELETED,
  DELETE_ALIEN,
  ID_NOT_FOUND,
  DELETE_INVALID_ID,
} = require('../utils/constants');

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
        next(new BadRequestError(INCORRECT_DATA_MOVIE));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
const deleteFilm = (req, res, next) => {
  Film.findById(req.params.movieId)
    .orFail()
    .then((film) => {
      if (film.owner.toString() !== req.user._id) {
        throw new ForbiddenError(DELETE_ALIEN);
      }
      return film.remove();
    })
    .then(() => {
      res.send({ message: POST_DELETED });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(ID_NOT_FOUND));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(DELETE_INVALID_ID));
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
