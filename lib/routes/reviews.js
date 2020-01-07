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
  });
