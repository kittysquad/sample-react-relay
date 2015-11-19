import React from 'react';

export default class Sample extends React.Component {

	render(){
		return ( <div>
					<p>
						TESTING.
					</p>
					<p>
						{this.props.data.msg}
					</p>
				</div> );
	}

};

