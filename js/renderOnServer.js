'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactRelayLibGraphQLStoreChangeEmitter = require('react-relay/lib/GraphQLStoreChangeEmitter');

var _reactRelayLibGraphQLStoreChangeEmitter2 = _interopRequireDefault(_reactRelayLibGraphQLStoreChangeEmitter);

var _isomorphicRelay = require('isomorphic-relay');

var _isomorphicRelay2 = _interopRequireDefault(_isomorphicRelay);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = require('react-dom/server');

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _rootContainerProps = require('./rootContainerProps');

var _rootContainerProps2 = _interopRequireDefault(_rootContainerProps);

var GRAPHQL_URL = 'http://localhost:8080/graphql';

_reactRelay2['default'].injectNetworkLayer(new _reactRelay2['default'].DefaultNetworkLayer(GRAPHQL_URL));

_reactRelayLibGraphQLStoreChangeEmitter2['default'].injectBatchingStrategy(function () {});

exports['default'] = function (res, next) {
    _isomorphicRelay2['default'].prepareData(_rootContainerProps2['default']).then(function (data) {
        var reactOutput = _reactDomServer2['default'].renderToString(_react2['default'].createElement(_isomorphicRelay2['default'].RootContainer, _rootContainerProps2['default']));
        res.render(_path2['default'].resolve(__dirname, '..', 'views', 'index.ejs'), {
            preloadedData: JSON.stringify(data),
            reactOutput: reactOutput
        });
    }, next);
};

module.exports = exports['default'];