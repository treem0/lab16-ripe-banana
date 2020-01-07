const { Router } = require('express');
const Reviewer = require('../Model/Reviewer');
const Film = require('../Model/Film');
const Review = require('../Model/Review');

module.exports = Router()
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(studios => res.send(studios))
      .catch(next); 
  })
  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  });
