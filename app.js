import React from 'react';
import ReactDOM from "react-dom";
import Sample from './components/Sample.js';

// Snag the initial state that was passed from the server side
var data = JSON.parse(document.getElementById('initial-state').innerHTML)

// Render the components, picking up where react left off on the server
ReactDOM.render( 
	<Sample data={data}/>,
  	document.getElementById('react-app')
);