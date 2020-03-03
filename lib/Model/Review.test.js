const Review = require('./Review');

describe('review model', () => {
  it('requires a rating', () => {
    const review = new Review({
      reviewer: 'awdawd',
      review: 'this movie sucked',
      film: 'dawdawd'  
    });
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

  it('requires a reviewer', () => {
    const review = new Review({
      rating: 1,
      review: 'this movie sucked',
      film: 'dawdawd'  
    });
    const { errors } = review.validateSync();
    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
  }); 
  it('requires a review', () => {
    const review = new Review({
      rating: 1,
      reviewer: 'treemo',
      film: 'dawdawd'  
    });
    const { errors } = review.validateSync();
    expect(errors.review.message).toEqual('Path `review` is required.');
  });
  it('requires a film', () => {
    const review = new Review({
      rating: 1,
      review: 'this movie sucked',
      reviewer: 'treemo'  
    });
    const { errors } = review.validateSync();
    expect(errors.film.message).toEqual('Path `film` is required.');
  });  
});
