'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('./database');

////////////////////////////////////////////
// nodeDefinitions

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

  var type = _fromGlobalId.type;
  var id = _fromGlobalId.id;

  if (type === 'ScrapBoard') {
    return (0, _database.getScrapBoard)();
  } else if (type === 'ScrapRow') {
    return (0, _database.getScrapRow)(id);
  } else if (type === 'ScrapItem') {
    return (0, _database.getScrapItem)(id);
  } else {
    return null;
  }
}, function (obj) {

  if (obj instanceof _database.ScrapBoard) {
    return scrapBoardType;
  }

  if (obj instanceof _database.ScrapRow) {
    return scrapRowType;
  }

  if (obj instanceof _database.ScrapItem) {
    return scrapItemType;
  }
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;

/******************************************/
// Types

var scrapItemType = new _graphql.GraphQLObjectType({

  name: "ScrapItem",
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('ScrapItem'),
      title: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
          return obj.title;
        } },
      ck_cnt: { type: _graphql.GraphQLInt, resolve: function resolve(obj) {
          return obj.ck_cnt;
        } }
    };
  },
  interfaces: [nodeInterface]
});

var _connectionDefinitions = (0, _graphqlRelay.connectionDefinitions)({ name: 'ScrapItem', nodeType: scrapItemType });

var scrapItemConnection = _connectionDefinitions.connectionType;

var scrapRowType = new _graphql.GraphQLObjectType({
  name: "ScrapRow",
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('ScrapRow'),
      title: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
          return obj.title;
        } },
      items: {
        type: scrapItemConnection,
        args: _graphqlRelay.connectionArgs,
        resolve: function resolve(row, args) {
          return (0, _graphqlRelay.connectionFromArray)((0, _database.getScrapItems)(row.id), args);
        }
      }
    };
  },
  interfaces: [nodeInterface]
});

var _connectionDefinitions2 = (0, _graphqlRelay.connectionDefinitions)({ name: 'ScrapRow', nodeType: scrapRowType });

var scrapRowConnection = _connectionDefinitions2.connectionType;

var scrapBoardType = new _graphql.GraphQLObjectType({
  name: "ScrapBoard",
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('ScrapBoard'),
      title: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
          return obj.title;
        } },
      rows: {
        type: scrapRowConnection,
        args: _graphqlRelay.connectionArgs,
        resolve: function resolve(row, args) {
          return (0, _graphqlRelay.connectionFromArray)((0, _database.getScrapRows)(), args);
        }
      }
    };
  },
  interfaces: [nodeInterface]
});

/******************************************/
// Mutation
var itemClickMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'itemClick',
  inputFields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
  },
  outputFields: {
    item: {
      type: scrapItemType,
      resolve: function resolve(_ref) {
        var item = _ref.item;
        return item;
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
    var id = _ref2.id;

    var localItemId = (0, _graphqlRelay.fromGlobalId)(id).id;
    return { item: (0, _database.incItemClickcnt)(localItemId) };
  }
});

var mutationType = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return {
      itemClick: itemClickMutation
    };
  }
});

/******************************************/
// Query

var queryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      scrapboard: {
        type: scrapBoardType,
        resolve: function resolve() {
          return (0, _database.getScrapBoard)();
        }
      },
      node: nodeField
    };
  }
});

/******************************************/
// Schema
var schema = new _graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
exports.schema = schema;