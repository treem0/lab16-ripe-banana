require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/Model/Actor');
const Film = require('../lib/Model/Film');
const Studio = require('../lib/Model/Studio');
const Review = require('../lib/Model/Review');
const Reviewer = require('../lib/Model/Reviewer');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let actor;
  let film;
  let studio;
  let review;
  let reviewer;
  let review1;
  let review2;
  let review3;

  beforeEach(async() => {
    studio = await  Studio.create({
      name: 'Treemos Pictures',
      address: {
        city: 'Sherwood',
        state: 'Oregon',
        country: 'USA'
      },
    });
    actor = await  Actor.create({
      name: 'Treemo Money',
      dob: '1991-08-30',
      pob: 'Pontiac, Michigan'
    });
    film = await Film.create({
      title: 'Treemo Ninja',
      studio: studio._id,
      released: 2020,
      cast: [{
        role: 'best actor',
        actor: actor._id
      }]
    });
    reviewer = await Reviewer.create({
      name: 'tmo',
      company: 'treesus reviews'
    });
    review = await Review.create({
      rating: 5,
      reviewer: reviewer._id,
      review: 'this movie sucked',
      film: {
        _id: film._id,
        title: film.title
      }
    });
    review1 = await Review.create({
      rating: 4,
      reviewer: reviewer._id,
      review: 'this movie sucked',
      film: {
        _id: film._id,
        title: film.title
      }
    });
    review2 = await Review.create({
      rating: 2,
      reviewer: reviewer._id,
      review: 'this movie sucked',
      film: {
        _id: film._id,
        title: film.title
      }
    });
    review3 = await Review.create({
      rating: 3,
      reviewer: reviewer._id,
      review: 'this movie sucked',
      film: {
        _id: film._id,
        title: film.title
      }
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
 
  it('has a get top 100 reviews route', () => {
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toEqual([{
          _id: review.id,
          rating: review.rating,
          review: review.review,
          film: {
            _id: film.id,
            title: film.title
          }
        },
        {
          _id: review1.id,
          rating: review1.rating,
          review: review1.review,
          film: {
            _id: film.id,
            title: film.title
          }
        },
        {
          _id: review3.id,
          rating: review3.rating,
          review: review3.review,
          film: {
            _id: film.id,
            title: film.title
          }
        },
        {
          _id: review2.id,
          rating: review2.rating,
          review: review2.review,
          film: {
            _id: film.id,
            title: film.title
          }
        }]);
      });
  });

  it('has a delete route', () => {
    return request(app)
      .delete(`/api/v1/reviews/${review.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: review.id, 
          rating: 5,
          reviewer: reviewer.id,
          review: 'this movie sucked',
          film: film.id,
        });
      });
  });
});
