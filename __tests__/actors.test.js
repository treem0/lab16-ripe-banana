require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/Model/Actor');
const Film = require('../lib/Model/Film');
const Studio = require('../lib/Model/Studio');

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
  beforeEach(async() => {
    studio = await  Studio.create({
      name: 'Treemos Pictures',
      address: {
        city: 'Sherwood',
        state: 'Oregon',
        country: 'USA'
      }
    });
    actor = await  Actor.create({
      name: 'Treemo Money',
      dob: '1991-08-30',
      pob: 'Pontiac, Michigan'
    });
    film = await Film.create([{
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

  it('has a get all actors route', () => {
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual([{
          _id: actor.id,
          name: 'Treemo Money'
        }]);
      });
  });

  it('has a get actor by id route', () => {
    return request(app)
      .get(`/api/v1/actors/${actor.id}`)
      .then(res => {
        expect(res.body).toEqual({
          name: 'Treemo Money',
          dob: '1991-08-30T00:00:00.000Z',
          pob: 'Pontiac, Michigan',
          films: film.map(film => ({ _id: expect.any(String), title: film.title, released: film.released }))
        });
      });
  });
});
