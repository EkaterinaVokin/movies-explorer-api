const router = require('express').Router();
const { validationCreateFilm, validationDeleteFilm } = require('../middlewares/validations');
const { createFilm, getFilms, deleteFilm } = require('../controllers/movies');

router.get('/movies', getFilms); // возвращает все сохранённые текущим  пользователем фильмы
router.post('/movies', validationCreateFilm, createFilm); // создаёт фильм с переданными в теле
router.delete('/movies/:movieId', validationDeleteFilm, deleteFilm); // удаляет сохранённый фильм по id

module.exports = router;
