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

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('./database');

/**
 * This is a basic end-to-end test, designed to demonstrate the various
 * capabilities of a Relay-compliant GraphQL server.
 *
 * It is recommended that readers of this test be familiar with
 * the end-to-end test in GraphQL.js first, as this test skips
 * over the basics covered there in favor of illustrating the
 * key aspects of the Relay spec that this test is designed to illustrate.
 *
 * We will create a GraphQL schema that describes the major
 * factions and ships in the original Star Wars trilogy.
 *
 * NOTE: This may contain spoilers for the original Star
 * Wars trilogy.
 */

/**
 * Using our shorthand to describe type systems,
 * the type system for our example will be the following:
 *
 * interface Node {
 *   id: ID!
 * }
 *
 * type Faction : Node {
 *   id: ID!
 *   name: String
 *   ships: ShipConnection
 * }
 *
 * type Ship : Node {
 *   id: ID!
 *   name: String
 * }
 *
 * type ShipConnection {
 *   edges: [ShipEdge]
 *   pageInfo: PageInfo!
 * }
 *
 * type ShipEdge {
 *   cursor: String!
 *   node: Ship
 * }
 *
 * type PageInfo {
 *   hasNextPage: Boolean!
 *   hasPreviousPage: Boolean!
 *   startCursor: String
 *   endCursor: String
 * }
 *
 * type Query {
 *   rebels: Faction
 *   empire: Faction
 *   node(id: ID!): Node
 * }
 *
 * input IntroduceShipInput {
 *   clientMutationId: string!
 *   shipName: string!
 *   factionId: ID!
 * }
 *
 * input IntroduceShipPayload {
 *   clientMutationId: string!
 *   ship: Ship
 *   faction: Faction
 * }
 *
 * type Mutation {
 *   introduceShip(input IntroduceShipInput!): IntroduceShipPayload
 * }
 */

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve a node object to its GraphQL type.
 */

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

  var type = _fromGlobalId.type;
  var id = _fromGlobalId.id;

  if (type === 'Faction') {
    return (0, _database.getFaction)(id);
  } else if (type === 'Ship') {
    return (0, _database.getShip)(id);
  } else {
    return null;
  }
}, function (obj) {
  return obj.ships ? factionType : shipType;
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;

/**
 * We define our basic ship type.
 *
 * This implements the following type system shorthand:
 *   type Ship : Node {
 *     id: String!
 *     name: String
 *   }
 */
var shipType = new _graphql.GraphQLObjectType({
  name: 'Ship',
  description: 'A ship in the Star Wars saga',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Ship'),
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the ship.'
      }
    };
  },
  interfaces: [nodeInterface]
});

/**
 * We define a connection between a faction and its ships.
 *
 * connectionType implements the following type system shorthand:
 *   type ShipConnection {
 *     edges: [ShipEdge]
 *     pageInfo: PageInfo!
 *   }
 *
 * connectionType has an edges field - a list of edgeTypes that implement the
 * following type system shorthand:
 *   type ShipEdge {
 *     cursor: String!
 *     node: Ship
 *   }
 */

var _connectionDefinitions = (0, _graphqlRelay.connectionDefinitions)({ name: 'Ship', nodeType: shipType });

var shipConnection = _connectionDefinitions.connectionType;

/**
 * We define our faction type, which implements the node interface.
 *
 * This implements the following type system shorthand:
 *   type Faction : Node {
 *     id: String!
 *     name: String
 *     ships: ShipConnection
 *   }
 */
var factionType = new _graphql.GraphQLObjectType({
  name: 'Faction',
  description: 'A faction in the Star Wars saga',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Faction'),
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the faction.'
      },
      ships: {
        type: shipConnection,
        description: 'The ships used by the faction.',
        args: _graphqlRelay.connectionArgs,
        resolve: function resolve(faction, args) {
          return (0, _graphqlRelay.connectionFromArray)(faction.ships.map(function (id) {
            return (0, _database.getShip)(id);
          }), args);
        }
      }
    };
  },
  interfaces: [nodeInterface]
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 *
 * This implements the following type system shorthand:
 *   type Query {
 *     factions(names: [FactionName]): [Faction]
 *     node(id: ID!): Node
 *   }
 */
var queryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      factions: {
        type: new _graphql.GraphQLList(factionType),
        args: {
          names: {
            type: new _graphql.GraphQLList(_graphql.GraphQLString)
          }
        },
        resolve: function resolve(root, _ref) {
          var names = _ref.names;
          return (0, _database.getFactions)(names);
        }
      },
      node: nodeField
    };
  }
});

/**
 * This will return a GraphQLFieldConfig for our ship mutation.
 *
 * It creates these two types implicitly:
 *   input IntroduceShipInput {
 *     clientMutationId: string!
 *     shipName: string!
 *     factionId: ID!
 *   }
 *
 *   input IntroduceShipPayload {
 *     clientMutationId: string!
 *     ship: Ship
 *     faction: Faction
 *   }
 */
var shipMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'IntroduceShip',
  inputFields: {
    shipName: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    factionId: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
    }
  },
  outputFields: {
    ship: {
      type: shipType,
      resolve: function resolve(payload) {
        return (0, _database.getShip)(payload.shipId);
      }
    },
    faction: {
      type: factionType,
      resolve: function resolve(payload) {
        return (0, _database.getFaction)(payload.factionId);
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
    var shipName = _ref2.shipName;
    var factionId = _ref2.factionId;

    var newShip = (0, _database.createShip)(shipName, factionId);
    return {
      shipId: newShip.id,
      factionId: factionId
    };
  }
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 *
 * This implements the following type system shorthand:
 *   type Mutation {
 *     introduceShip(input: IntroduceShipInput!): IntroduceShipPayload
 *   }
 */
var mutationType = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return {
      introduceShip: shipMutation
    };
  }
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
var schema = new _graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
exports.schema = schema;