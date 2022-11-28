const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createFilm, getFilms, deleteFilm } = require('../controllers/movies');
const { REGEX_URL, REGEX_EN, REGEX_RU } = require('../constants');

router.get('/movies', getFilms); // возвращает все сохранённые текущим  пользователем фильмы
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEX_URL),
    trailerLink: Joi.string().required().pattern(REGEX_URL),
    thumbnail: Joi.string().required().pattern(REGEX_URL),
    movieId: Joi.string().length(24).hex().required(),
    nameRU: Joi.string().required().pattern(REGEX_RU),
    nameEN: Joi.string().required().pattern(REGEX_EN),
  }),
}), createFilm); // создаёт фильм с переданными в теле
router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteFilm); // удаляет сохранённый фильм по id

module.exports = router;
