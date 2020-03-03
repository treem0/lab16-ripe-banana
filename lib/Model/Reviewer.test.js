const Reviewer = require('./Reviewer');

describe('reviewer model', () => {
  it('requires a name', () => {
    const reviewer = new Reviewer({
      company: 'awdawd',   
    });
    const { errors } = reviewer.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('requires a company', () => {
    const reviewer = new Reviewer({
      name: 'awdawd'
    });
    const { errors } = reviewer.validateSync();
    expect(errors.company.message).toEqual('Path `company` is required.');
  }); 
});
