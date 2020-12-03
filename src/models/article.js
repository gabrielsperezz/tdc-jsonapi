'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  title: String,
  author: {ref:'Person', type: ObjectId}
});

module.exports = mongoose.model('Article', schema);
