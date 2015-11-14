/** @jsx React.DOM */

var React = require('react'),
	ReactDOM = require('react-dom'),
	Sample = require('./components/Sample.react.js');

// Snag the initial state that was passed from the server side
var data = JSON.parse(document.getElementById('initial-state').innerHTML)

// Render the components, picking up where react left off on the server
ReactDOM.render(
  <Sample data={data}/>,
  document.getElementById('react-app')
);