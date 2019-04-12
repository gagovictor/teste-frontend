import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class modal extends Component {

	constructor(props) {
		super(props);
	}

	handleKeyPress = (event) => {
	  if(event.key == 'Escape' || event.key == 27)
	  {
	    alert('enter press here! ');
	    this.props.handleClose();
	  }
	};
	
	render() {
		var className = (this.props.show ? "modal display-block" : "modal display-none") + " " + this.props.addClass;
		return (
			<div className={className} onKeyPress={this.handleKeyPress}>
				<div className="modal-main">
					<section className="header">
						<h2>{this.props.title}</h2>
						<button onClick={this.props.handleClose}>x</button>
					</section>
					<section className="content">
						{this.props.children}
					</section>
				</div>
	    	</div>
		);
	}
};

modal.propTypes = {
	show: PropTypes.bool.isRequired,
	children: PropTypes.object.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	addClass: PropTypes.string.isRequired
}

export default modal;
