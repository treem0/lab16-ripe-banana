const { Router } = require('express');
const Studio = require('../Model/Studio');

module.exports = Router()
  .get('/', (req, res, next) => {
    Studio
      .find()
      .then(studios => res.send(studios))
      .catch(next); 
  })
  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  });
