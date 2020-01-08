require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const Studio = require('../lib/Model/Studio');
const Actor = require('../lib/Model/Actor');
const Film = require('../lib/Model/Film');
const Review = require('../lib/Model/Review');
const Reviewer = require('../lib/Model/Reviewer');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed({ location: 5, boxes: 25, items: 100 });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: () => Model.findOne().then(prepare),
    [`get${modelName}s`]: () => Model.find().then(docs => docs.map(prepare))
  };
};

module.exports = {
  ...createGetters(Studio),
  ...createGetters(Actor),
  ...createGetters(Film),
  ...createGetters(Review),
  ...createGetters(Reviewer),
  // getLocation: () => Location.findOne().then(prepare),
  // getLocations: () => Location.find().then(docs => docs.map(prepare)),
  // getBox: () => ,
  // getItem: () => item
};
