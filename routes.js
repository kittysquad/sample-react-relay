var JSX = require('node-jsx').install(),
    React = require('react'),
    ReactDom = require('react-dom'),
    ReactDomServer = require( 'react-dom/server' ),
	SampleApp = require("./components/Sample.react");

module.exports = {

    index: function(req, res) {

    	var data = { msg:'HI~!' };

    	
    	var markup = ReactDomServer.renderToString(
    		React.createElement( SampleApp, { data:data } )
    		);


        res.render('home', {
            markup: markup,
            state: JSON.stringify( data )
        });
		
		/*
		res.render('home', {
	            markup: "",
	            state: {}
	        });
	    */

    },

    page: function(req, res) {

    }

}
