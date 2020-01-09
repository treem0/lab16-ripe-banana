const { getReviewer, getReviewers, getReview } = require('../lib/helpers/data-helpers');
const Review = require('../lib/Model/Review');


const request = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
  it('has a get all reviewers route', async() => {
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('has a get reviewer by id route', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer._id.toString(),
          name: reviewer.name,
          company: reviewer.company,
          reviews: expect.any(Array)
        });
      });
  });

  it('has a delete reviewers by id unless they have reviews', async() => {
    const review = await getReview();
    const reviewer = await getReviewer({ _id: review.reviewer });
    
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          message: 'Reviewer cannot be deleted while reviews still present',
          status: 500
        });
      });
  });
  it('has a delete reviewers by id and deletes if they have no reviews', async() => {
    const reviewer2 = await getReviewer();
    await Review.deleteMany({ reviewer: reviewer2._id });
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer2._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer2._id.toString(),
          company: reviewer2.company,
          name: reviewer2.name,
          __v: 0
        });
      });
  });
});
