const Studio = require('./Studio');

describe('studio model', () => {
  it('requires a name', () => {
    const studio = new Studio({
      address: 'awdawd'      
    });
    const { errors } = studio.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
