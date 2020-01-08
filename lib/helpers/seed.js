const chance = require('chance').Chance();
const Studio = require('../Model/Studio');
const Actor = require('../Model/Actor');
const Film = require('../Model/Film');
const Review = require('../Model/Review');
const Reviewer = require('../Model/Reviewer');

module.exports = async({ studios = 10, actors = 50, films = 100, reviewers = 100, reviews = 100 } = {}) => {
  const createdStudios = await Studio.create([...Array(studios)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.address,
      state: chance.state,
      country: chance.country
    }
  })));

  const createdActors = await Actor.create([...Array(actors)].map((_, i) => ({
    name: `Actor ${i}`,
    dob: chance.date(),
    pob: chance.state(),
  })));

  const createdFilms = await Film.create([...Array(films)].map(() => ({
    title: chance.word(),
    studio: chance.pickone(createdStudios.map(studio => studio._id)),
    released: chance.date(),
    cast: [{
      role: chance.word(),
      actor: chance.pickone(createdActors.map(actor => actor._id))
    }]
  })));

  const createdReviewers = await Reviewer.create([...Array(reviewers)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  await Review.create([...Array(reviews)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(createdReviewers.map(reviewer => reviewer._id)),
    review: chance.sentence(),
    film: chance.pickone(createdFilms.map(film => film._id))
  })));
};
