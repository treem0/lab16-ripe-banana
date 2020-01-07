const { Router } = require('express');
const Actor = require('../Model/Actor');

module.exports = Router()
  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({ name: true })
      .then(actors => res.send(actors))
      .catch(next); 
  })
  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .select('-_id -__v')
      .populate('films', { title: true, released: true })
      .then(actor => res.send(actor))
      .catch(next);
  });
