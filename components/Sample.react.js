/** @jsx React.DOM */

var React = require('react');

module.exports = Sample = React.createClass({

   render: function(){
		return ( <div>
					<p>
						{this.props.data.msg}
					</p>
				</div> );
	}

});