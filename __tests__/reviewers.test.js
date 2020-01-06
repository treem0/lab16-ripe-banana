require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/Model/Reviewer');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let reviewer;
  beforeEach(async() => {
    reviewer = await  Reviewer.create({
      name: 'treemo',
      company: 'treemos reviews'
    });
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
          name: 'treemo',
          company: 'treemos reviews',
          __v: 0
        }]);
      });
  });

  it('has a get reviewer by id route', () => {
    return request(app)
      .get(`/api/v1/reviewers/${reviewer.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer.id,
          name: 'treemo',
          company: 'treemos reviews',
          __v: 0
        });
      });
  });
});
