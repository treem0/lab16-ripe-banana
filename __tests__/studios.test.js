require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/Model/Studio');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let studio;
  beforeEach(async() => {
    studio = await  Studio.create({
      name: 'Treemos Pictures',
      address: {
        city: 'Sherwood',
        state: 'Oregon',
        country: 'USA'
      }
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('has a get all studios route', () => {
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual([{
          _id: studio.id,
          name: 'Treemos Pictures',
          address: {
            city: 'Sherwood',
            state: 'Oregon',
            country: 'USA'
          },
          __v: 0
        }]);
      });
  });

  it('has a get studio by id route', () => {
    return request(app)
      .get(`/api/v1/studios/${studio.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: studio.id,
          name: 'Treemos Pictures',
          address: {
            city: 'Sherwood',
            state: 'Oregon',
            country: 'USA'
          },
          __v: 0
        });
      });
  });
});
