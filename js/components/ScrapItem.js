'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _mutationsItemClickMutation = require('../mutations/ItemClickMutation');

var _mutationsItemClickMutation2 = _interopRequireDefault(_mutationsItemClickMutation);

var ScrapItem = (function (_React$Component) {
  _inherits(ScrapItem, _React$Component);

  function ScrapItem() {
    var _this = this;

    _classCallCheck(this, ScrapItem);

    _get(Object.getPrototypeOf(ScrapItem.prototype), 'constructor', this).apply(this, arguments);

    this._ItemClick = function () {
      _reactRelay2['default'].Store.update(new _mutationsItemClickMutation2['default']({ id: _this.props.item.id, item: _this.props.item }));
    };
  }

  _createClass(ScrapItem, [{
    key: 'render',
    value: function render() {
      var item = this.props.item;

      return _react2['default'].createElement(
        'div',
        { onClick: this._ItemClick },
        _react2['default'].createElement(
          'h3',
          null,
          item.title
        ),
        _react2['default'].createElement(
          'p',
          null,
          '[[[ Click Count : ',
          item.ck_cnt,
          ' ]]]'
        )
      );
    }
  }]);

  return ScrapItem;
})(_react2['default'].Component);

exports['default'] = _reactRelay2['default'].createContainer(ScrapItem, {
  fragments: {
    item: function item() {
      return (function () {
        throw new Error('GraphQL validation/transform error ``Unknown type "ScrapItem".`` in file `src/components/ScrapItem.js`.');
      })();
    }
  }
});
module.exports = exports['default'];