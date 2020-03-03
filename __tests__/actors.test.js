const { getActor, getActors, getFilms } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
  it('has a get all actors route', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors.map(actor => ({ _id: actor._id, name: actor.name })));
      });
  });

  it('has a get actor by id route', async() => {
    const actor = await getActor();
    const films = await getFilms({ 'cast.actor': actor._id });

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          name: actor.name,
          dob: actor.dob,
          pob: actor.pob,
          films: films.map(film => ({
            _id: film._id,
            released: film.released,
            title: film.title
          }))
        });
      });
  });
});
