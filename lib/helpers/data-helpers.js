require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const Studio = require('../Model/Studio');
const Actor = require('../Model/Actor');
const Film = require('../Model/Film');
const Review = require('../Model/Review');
const Reviewer = require('../Model/Reviewer');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed({ studios: 3
    , actors: 5, films: 3, reviewers: 3, reviews: 4 });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: (query) => Model.findOne(query).then(prepare),
    [`get${modelName}s`]: (query) => Model.find(query).then(docs => docs.map(prepare))
  };
};

module.exports = {
  ...createGetters(Studio),
  ...createGetters(Actor),
  ...createGetters(Film),
  ...createGetters(Review),
  ...createGetters(Reviewer),
};
