const { getFilm, getFilms, getStudios } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
  it('has a get all films route', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films.map(film => ({
          _id: film._id, 
          title: film.title, 
          released: film.released,
          studio: expect.any(Object)
        })));
      });
  });

  it('has a get film by id route', async() => {
    const film = await getFilm();
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: film._id.toString(),
          title: film.title,
          released: film.released,
          studio: expect.any(Object),
          cast: expect.any(Array),
          reviews: expect.any(Array)
        });
      });
  });
});
