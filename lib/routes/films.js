const { Router } = require('express');
const Film = require('../Model/Film');
const Review = require('../Model/Review');

module.exports = Router()
  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ title: true, released: true })
      .populate('studio', { name: true })
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Promise.all([
      Film
        .findById(req.params.id)
        .select('-__v')
        .populate('studio', { name: true })
        .populate('cast.actor', { __v: false })
        .lean(),
      Review
        .find({ film: req.params.id })
        .select({ rating: true, review: true, reviewer: true })
        .populate('reviewer', { name: true })
    ])
      .then(([film, reviews]) => {
        res.send({ ...film, reviews 
        });
      })
      .catch(next);
  });
