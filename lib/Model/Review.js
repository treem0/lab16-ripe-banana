const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    required: true,
    maxlength: 140
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
},  {
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.id;
      delete ret.__v;
    },
  }
});

module.exports = mongoose.model('Review', schema);
