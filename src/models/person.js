'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  name: String,
  email: {type: String, lowercase: true}
});

module.exports = mongoose.model('Person', schema);
