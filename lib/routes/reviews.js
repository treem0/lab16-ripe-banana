const { Router } = require('express');
const Review = require('../Model/Review');


module.exports = Router()
  .get('/', (req, res, next) => { 
    Review
      .find()
      .sort({ rating: -1 })
      .limit(100)
      .select('-reviewer -__v')
      .populate('film', { _id: true, title: true })
      .then((review) => {
        res.send(review);
      });
  })
  .delete('/:id', (req, res, next) => {
    Review
      .findByIdAndDelete(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  })
  .post('/', (req, res, next) => {
    Review
      .create({
        rating: req.body.rating,
        reviewer: req.body.reviewer,
        review: req.body.review,
        film: req.body.film
      })
      .then(res => res.send(res))
      .catch(next);
  });
