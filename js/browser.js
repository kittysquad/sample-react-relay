'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _isomorphicRelay = require('isomorphic-relay');

var _isomorphicRelay2 = _interopRequireDefault(_isomorphicRelay);

var _rootContainerProps = require('./rootContainerProps');

var _rootContainerProps2 = _interopRequireDefault(_rootContainerProps);

var data = JSON.parse(document.getElementById('preloadedData').textContent);
_isomorphicRelay2['default'].injectPreparedData(data);
var rootElement = document.getElementById('root');
_reactDom2['default'].render(_react2['default'].createElement(_isomorphicRelay2['default'].RootContainer, _rootContainerProps2['default']), rootElement);