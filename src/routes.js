import React from 'react';
import ReactDOM from "react-dom";
import ReactDomServer from 'react-dom/server';
//import SampleApp from './components/Sample.js';

module.exports = {

    index: function(req, res) {
        /*
    	var data = { msg:'HI~!' };

    	
    	var markup = ReactDomServer.renderToString(
    		React.createElement( SampleApp, { data:data } )
    		);

        */
        res.render('home', {
            markup: '',
            state: ''
        });

    },

    page: function(req, res) {

    }

}
