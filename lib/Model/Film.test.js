const Film = require('./Film');

describe('film model', () => {
  it('requires a title', () => {
    const film = new Film({
      studio: 'awdawd',
      released: '1990',
      cast: [{
        role: 'main guy',
        actor: 'treemo'
      }]     
    });
    const { errors } = film.validateSync();
    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('requires a studioId', () => {
    const film = new Film({
      title: 'awdawd',
      released: '1990',
      cast: [{
        role: 'main guy',
        actor: 'treemo'
      }] 
    });
    const { errors } = film.validateSync();
    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });
  it('requires a released year', () => {
    const film = new Film({
      title: 'awdawd',
      studio: 'The Best one',
      cast: [{
        role: 'main guy',
        actor: 'treemo'
      }] 
    });
    const { errors } = film.validateSync();
    expect(errors.released.message).toEqual('Path `released` is required.');
  });
  it('requires an actorId', () => {
    const film = new Film({
      title: 'awdawd',
      studio: 'The Best one',
      released: '1992',
      cast: [{
        role: 'main guy',
        actor: 'treemo'
      }] 
    });
    const { errors } = film.validateSync();
    expect(errors.cast.actor.message).toEqual('Path `cast` is required.');
  });
});
