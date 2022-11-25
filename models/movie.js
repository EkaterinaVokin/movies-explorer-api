const mongoose = require('mongoose');
const validator = require('validator');
const { REGEX_RU, REGEX_EN } = require('../constants');

const filmSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      validate: (value) => validator.isNumeric(value),
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: (value) => validator.isURL(value),
    },
    trailerLink: {
      type: String,
      required: true,
      validate: (value) => validator.isURL(value),
    },
    thumbnail: {
      type: String,
      required: true,
      validate: (value) => validator.isURL(value),
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      required: true,
      // id фильма, который содержится в ответе сервиса MoviesExplorer.
    },
    nameRU: {
      type: String,
      required: true,
      validate: (value) => REGEX_RU.test(value),
    },
    nameEN: {
      type: String,
      required: true,
      validate: (value) => REGEX_EN.test(value),
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('film', filmSchema);
