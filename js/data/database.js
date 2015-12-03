// ScrapBoard, Row, Item
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.getScrapRow = getScrapRow;
exports.getScrapRows = getScrapRows;
exports.getScrapItem = getScrapItem;
exports.getScrapItems = getScrapItems;
exports.incItemClickcnt = incItemClickcnt;
exports.getScrapBoard = getScrapBoard;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrapBoard = (function (_Object) {
  _inherits(ScrapBoard, _Object);

  function ScrapBoard() {
    _classCallCheck(this, ScrapBoard);

    _get(Object.getPrototypeOf(ScrapBoard.prototype), 'constructor', this).apply(this, arguments);
  }

  return ScrapBoard;
})(Object);

exports.ScrapBoard = ScrapBoard;
;

var ScrapRow = (function (_Object2) {
  _inherits(ScrapRow, _Object2);

  function ScrapRow() {
    _classCallCheck(this, ScrapRow);

    _get(Object.getPrototypeOf(ScrapRow.prototype), 'constructor', this).apply(this, arguments);
  }

  return ScrapRow;
})(Object);

exports.ScrapRow = ScrapRow;
;

var ScrapItem = (function (_Object3) {
  _inherits(ScrapItem, _Object3);

  function ScrapItem() {
    _classCallCheck(this, ScrapItem);

    _get(Object.getPrototypeOf(ScrapItem.prototype), 'constructor', this).apply(this, arguments);
  }

  return ScrapItem;
})(Object);

exports.ScrapItem = ScrapItem;
;

var scrapboard_data = new ScrapBoard();
scrapboard_data.id = '1';
scrapboard_data.title = 'First ScrapBoard';

var scraprow_data = [];
(function () {
  var row = undefined;
  for (var i = 0; i < 3; ++i) {
    row = new ScrapRow();
    row.id = '' + i;
    row.title = i + ' row title';
    scraprow_data.push(row);
  }
})();

function getScrapRow(id) {
  return scraprow_data.find(function (row) {
    return row.id === id;
  });
}

;

function getScrapRows() {
  return scraprow_data;
}

;

var scrapitem_data = [];
(function () {
  var item = undefined;
  for (var i = 0; i < 3; ++i) {
    for (var j = 0; j < 5; ++j) {
      item = new ScrapItem();
      item.id = '' + i + j;
      item.row_id = '' + i;
      item.title = "scrap item " + i + " " + j;
      item.ck_cnt = 0;
      scrapitem_data.push(item);
    }
  }
})();

function getScrapItem(id) {
  return scrapitem_data.find(function (item) {
    return item.id === id;
  });
}

function getScrapItems(row_id) {
  var ret = scrapitem_data.filter(function (item) {
    return item.row_id === row_id;
  });
  return ret;
}

function incItemClickcnt(id) {
  var ret = scrapitem_data.find(function (item) {
    return item.id === id;
  });
  ret.ck_cnt++;
  return ret;
}

function getScrapBoard(id) {
  return scrapboard_data;
}