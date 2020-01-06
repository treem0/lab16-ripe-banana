const Actor = require('./Actor');

describe('actor model', () => {
  it('requires a name', () => {
    const actor = new Actor({
      address: 'awdawd'      
    });
    const { errors } = actor.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
