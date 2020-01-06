const { Router } = require('express');
const Actor = require('../Model/Actor');

module.exports = Router()
  .get('/', (req, res, next) => {
    Actor
      .find()
      .then(actors => res.send(actors))
      .catch(next); 
  })
  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .then(actor => res.send(actor))
      .catch(next);
  });
