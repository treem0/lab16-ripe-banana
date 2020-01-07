require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/Model/Studio');
const Actor = require('../lib/Model/Actor');
const Film = require('../lib/Model/Film');
const Review = require('../lib/Model/Review');
const Reviewer = require('../lib/Model/Reviewer');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let studio;
  let actor;
  let films;
  let reviews;
  let reviewer;
  beforeEach(async() => {
    studio = await  Studio.create({
      name: 'Treemos Pictures',
      address: {
        city: 'Sherwood',
        state: 'Oregon',
        country: 'USA'
      }
    });
    actor = await Actor.create({
      name: 'treemo',
      dob: '1991-08-30',
      pob: 'Pontiac, Michigan'
    });
    films = await Film.create([{
      title: 'Treemo Ninja',
      studio: studio._id,
      released: 2020,
      cast: [{
        role: 'best actor',
        actor: actor._id
      }]
    }]);
    reviewer = await Reviewer.create({
      name: 'tmo',
      company: 'treesus reviews'
    });
    reviews = await Review.create([{
      rating: 5,
      reviewer: reviewer._id,
      review: 'this movie sucked',
      film: {
        _id: films[0]._id,
        title: films[0].title
      }
    }]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('has a get all films route', () => {
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual([{
          _id: films[0].id,
          title: films[0].title,
          released: films[0].released,
          studio: {
            _id: studio.id,
            name: studio.name
          }
        }]);
      });
  });

  it('has a get films by id route', () => {
    return request(app)
      .get(`/api/v1/films/${films[0]._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: films[0]._id.toString(),
          title: films[0].title,
          released: films[0].released,
          studio: {
            _id: studio.id.toString(),
            name: studio.name
          },
          cast: [{ _id: films[0].cast[0]._id.toString(), role: films[0].cast[0].role, actor: {
            _id: actor._id.toString(),
            name: 'treemo',
            dob: '1991-08-30T00:00:00.000Z',
            pob: 'Pontiac, Michigan'
          } }],
          reviews: reviews.map(review => ({ _id: review._id.toString(), rating: review.rating, review: review.review, reviewer: {
            _id: reviewer.id,
            name: reviewer.name
          } }))
        });
      });
  });
});
