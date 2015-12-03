/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _default = (function (_Relay$Route) {
  _inherits(_default, _Relay$Route);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, null, [{
    key: 'queries',
    value: {
      factions: function factions() {
        return (function () {
          return {
            calls: [{
              kind: 'Call',
              metadata: {},
              name: 'names',
              value: {
                kind: 'CallVariable',
                callVariableName: 'factionNames'
              }
            }],
            children: [{
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                parentType: 'Faction',
                isGenerated: true,
                isRequisite: true
              }
            }],
            fieldName: 'factions',
            kind: 'Query',
            metadata: {
              isPlural: true,
              identifyingArgName: 'names'
            },
            name: 'StarWarsAppHomeRoute'
          };
        })();
      },
      users: function users() {
        return (function () {
          throw new Error('GraphQL validation/transform error ``Cannot query field "users" on "Query".`` in file `src/routes/StarWarsAppHomeRoute.js`.');
        })();
      },
      lists: function lists() {
        return (function () {
          throw new Error('GraphQL validation/transform error ``Cannot query field "lists" on "Query".`` in file `src/routes/StarWarsAppHomeRoute.js`.');
        })();
      }
    },
    enumerable: true
  }, {
    key: 'routeName',
    value: 'StarWarsAppHomeRoute',
    enumerable: true
  }]);

  return _default;
})(_reactRelay2['default'].Route);

exports['default'] = _default;
module.exports = exports['default'];