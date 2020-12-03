'use strict';
var path     = require('path')
  , express  = require('express')
  , API      = require('json-api')
  , APIError = API.types.Error
  , mongoose = require('mongoose')
  , virtualQueryFactory = require('./virtual-query-factory');

require('dotenv').config({ path: '.env' });
// Start by loading up all our mongoose models and connecting.
mongoose.connect('mongodb://localhost/example');
var models = {
  Person: require('./models/person'),
  Article: require('./models/article')
}

var adapter = new API.dbAdapters.Mongoose(models);
var registry = new API.ResourceTypeRegistry({
  articles: require('./resource-descriptions/article'),
  people: require('./resource-descriptions/people')
}, { dbAdapter: adapter });

var Controller = new API.controllers.API(registry);

var Docs = new API.controllers.Documentation(registry, {name: 'Example API'});

var opts = { host: 'http://127.0.0.1:3000' };

var app = express();
var Front = new API.httpStrategies.Express(Controller, Docs, opts);
var apiReqHandler = Front.apiRequest;

app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
})


app.get("/", Front.docsRequest);
app.route("/:type(people|articles)")
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);
app.route("/:type(people|articles)/:id")
  .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);


app.use(function(req, res, next) {
  Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});

// And we're done! Start 'er up!
console.log('Starting up! Visit 127.0.0.1:3000 to see the docs.');
app.listen(3000);
