'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _renderOnServer = require('./renderOnServer');

var _renderOnServer2 = _interopRequireDefault(_renderOnServer);

var _dataSchema = require('./data/schema');

var APP_PORT = 8080;

// The server is just a simple Express app
var app = (0, _express2['default'])();

// We respond to all GraphQL requests from `/graphql` using the
// `express-graphql` middleware, which we pass our schema to.
app.use('/graphql', (0, _expressGraphql2['default'])({ schema: _dataSchema.schema, graphiql: true }));

// Serve HTML
app.get('/', function (req, res, next) {
  (0, _renderOnServer2['default'])(res, next);
});

// Resources
app.use("/", _express2['default']['static'](__dirname + "/../public/"));

app.listen(APP_PORT, function () {
  console.log('Listening on ' + APP_PORT + '...');
});