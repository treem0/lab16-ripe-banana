const { getReview, getReviews } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
  it('has a get top 100 reviews route', async() => {
    const reviews = await getReviews();
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        const trimmedReviews = reviews.map(review => ({
          rating: review.rating,
          _id: review._id,
          review: review.review,
          film: expect.any(Object)
        }));
        trimmedReviews.forEach(review => expect(res.body).toContainEqual(review));
      });
  });

  it('has a delete route', async() => {
    const review = await getReview();
    
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });
});
