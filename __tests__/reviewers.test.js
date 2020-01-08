require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/Model/Reviewer');
const Review = require('../lib/Model/Review');
const Actor = require('../lib/Model/Actor');
const Studio = require('../lib/Model/Studio');
const Film = require('../lib/Model/Film');

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
  let reviewer2;
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
    reviewer2 = await Reviewer.create({
      name: 'tmo2',
      company: 'treesus reviews2'
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

  it('has a get all reviewers route', () => {
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual([{
          _id: reviewer.id,
          name: 'tmo',
          company: 'treesus reviews',
          __v: 0
        }, {
          __v: 0,
          _id: reviewer2.id,
          company: 'treesus reviews2',
          name: 'tmo2',
        }]);
      });
  });

  it('has a get reviewer by id route', () => {
    return request(app)
      .get(`/api/v1/reviewers/${reviewer.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer.id,
          name: 'tmo',
          company: 'treesus reviews',
          reviews: [{
            _id: reviews[0]._id.toString(),
            rating: 5,
            review: 'this movie sucked',
            film: {
              _id: films[0].id,
              title: films[0].title
            }
          }]
        });
      });
  });

  it('has a delete reviewers by id unless they have reviews', () => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer.id}`)
      .then(res => {
        expect(res.body).toEqual({
          message: 'Reviewer cannot be deleted while reviews still present',
          status: 500
        });
      });
  });
  it('has a delete reviewers by id and deletes if they have no reviews', () => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer2.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer2.id,
          company: 'treesus reviews2',
          name: 'tmo2',
          __v: 0
        });
      });
  });
});
