/* eslint-env es6 */
import fetch from 'isomorphic-fetch';

// HACK: fix for https://github.com/facebook/fbjs/issues/47
// TODO: remove when it is fixed in Relay
if (typeof self == 'undefined') {
    const {prototype} = module.constructor;
    const {require} = prototype;

    prototype.require = function(path) {
        if (path == 'fbjs/lib/fetch' || path == 'fbjs/lib/fetchWithRetries') {
            return fetch;
        }
        return require.call(this, path);
    };
}

import toGraphQL from 'react-relay/lib/toGraphQL';

import {
  // These are the basic GraphQL types
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,

  // This is used to create required fields and arguments
  GraphQLNonNull,

  // This is the class we need to create the schema
  GraphQLSchema,

  // This function is used execute GraphQL queries
  graphql
} from 'graphql';

var Schema = require('../schema/schema')

var GraphQLStoreChangeEmitter = require('react-relay/lib/GraphQLStoreChangeEmitter')
var React = require('react')
var ReactDOM = require('react-dom')
var Relay = require('react-relay')
var App = require('./App')

var ReactDOMServer = require( 'react-dom/server' );

var myNetworkLayer = {
	sendMutation( mutationRequest ){
		console.log( "mutation", mutationRequest );
	},
	sendQueries( queryRequests ){

		return Promise.all( queryRequests.map(
			request => {
				graphql(Schema, request.getQueryString(), null).then(function(result) {
			  	//console.log("Query Result", result);
			  	
			  		if(result.errors ){
			  			request.reject( new Error( result.errors ) );
			  		}else{
			  			console.log("Query Result", result);
			  			request.resolve( {response: result.data} );
			  		}
				});
			}
		));
		
	},
	supports( ...options ){

		console.log( "supports", options );

	},
};

const GRAPHQL_URL = `http://localhost:3000/graphql`;
//Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(GRAPHQL_URL));
//
Relay.injectNetworkLayer(myNetworkLayer);

GraphQLStoreChangeEmitter.injectBatchingStrategy(() => {});

module.exports = function( req, res ){

	var ret = ReactDOMServer.renderToString(
	  <Relay.RootContainer Component={App.Container} route={App.queries}
	    onReadyStateChange={({error}) => { if (error) console.error(error) }} />
	)

	res.send( ret );
}


