require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/Model/Actor');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let actor;
  beforeEach(async() => {
    actor = await  Actor.create({
      name: 'Treemo Money',
      dob: '1991-08-30',
      pob: 'Pontiac, Michigan'
    });
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
          name: 'Treemo Money',
          dob: '1991-08-30T00:00:00.000Z',
          pob: 'Pontiac, Michigan',
          __v: 0
        }]);
      });
  });

  it('has a get actor by id route', () => {
    return request(app)
      .get(`/api/v1/actors/${actor.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: actor.id,
          name: 'Treemo Money',
          dob: '1991-08-30T00:00:00.000Z',
          pob: 'Pontiac, Michigan',
          __v: 0
        });
      });
  });
});
