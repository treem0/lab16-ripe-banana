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
  })
  .delete('/:id', (req, res, next) => {
    Promise.all([
      Reviewer
        .findById(req.params.id),
      Review
        .find({ reviewer: req.params.id })  
    ])
      .then(([reviewer, reviews]) => {
        if(reviews.length > 0) {
          throw new Error('Reviewer cannot be deleted while reviews still present');
        } else
          Reviewer.findByIdAndDelete(reviewer.id)
            .then(reviewer => res.send(reviewer));
      })
      .catch(next);
  })
  .post('/', (req, res, next) =>{
    Reviewer
      .create({
        name: req.body.name,
        company: req.body.company
      })
      .then(res => res.send(res))
      .catch(next);
  });
