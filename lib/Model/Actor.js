const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: Date,
  pob: String
}, {
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.id;
    },
  }
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'cast.$.actor'
});

module.exports = mongoose.model('Actor', schema);
