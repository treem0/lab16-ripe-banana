const { getStudio, getStudios, getFilms } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
  it('has a get all studios route', async() => {
    const studios = await getStudios();
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios.map(studio => ({
          _id: studio._id, 
          name: studio.name 
        })));
      });
  });

  it('has a get studio by id route', async() => {
    const studio = await getStudio();
    const films = await getFilms({ _id: studio.films });
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({ 
          _id: studio._id.toString(),
          name: studio.name,
          address: studio.address,
          films: films.map(film => ({
            _id: film._id.toString(),
            name: film.name
          }))
        });
      });
  });
});
