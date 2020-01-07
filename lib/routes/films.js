const { Router } = require('express');
const Film = require('../Model/Film');

module.exports = Router()
  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ title: true, released: true })
      .populate('studio', { name: true })
      .then(films => res.send(films))
      .catch(next);
  });
