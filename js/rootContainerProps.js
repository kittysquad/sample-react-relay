'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _routesRoute = require('./routes/route');

var _routesRoute2 = _interopRequireDefault(_routesRoute);

exports['default'] = {
    Component: _componentsApp2['default'],
    route: new _routesRoute2['default']()
};
module.exports = exports['default'];