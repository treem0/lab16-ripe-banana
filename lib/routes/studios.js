const { Router } = require('express');
const Studio = require('../Model/Studio');


module.exports = Router()
  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({ _id: true, name: true })
      .then(studios => res.send(studios))
      .catch(next); 
  })
  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .populate('films', { title: true })
      .select({ __v: false })
      .lean()
      .then(studio => {
        studio.films.forEach(film => {
          delete film.studio;
        });
        res.send(studio);
      })
      .catch(next);
  })
  .post('/', (req, res, next) => {
    Studio
      .create({
        name: req.body.name,
        address: {
          city: req.body.city,
          state: req.body.state,
          country: req.body.country
        }
      })
      .then(res => res.send(res))
      .catch(next);
  });
