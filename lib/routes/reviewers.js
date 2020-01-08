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
    Promise.all([
      Reviewer
        .findById(req.params.id)
        .select('-__v')
        .lean(),
      Review
        .find({ reviewer: req.params.id })
        .populate('film', { title: true })
        .select({ __v: false, reviewer: false })
    ])
      .then(([reviewer, reviews]) => {
        reviewer.reviews = reviews;
        res.send(reviewer);
      })
      .catch(next);
  });
