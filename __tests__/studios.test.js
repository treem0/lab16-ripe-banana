require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/Model/Studio');
const Actor = require('../lib/Model/Actor');
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
          name: 'Treemos Pictures'
        }]);
      });
  });

  it('has a get studio by id route', () => {
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: studio._id.toString(),
          name: 'Treemos Pictures',
          address: {
            city: 'Sherwood',
            state: 'Oregon',
            country: 'USA'
          },
          films: films.map(film => ({ _id: expect.any(String), title: film.title }))
        });
      });
  });
});
