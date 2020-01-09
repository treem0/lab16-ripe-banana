const { getStudio, getStudios } = require('../lib/helpers/data-helpers');

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
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({ studio });
      });
  });
});
