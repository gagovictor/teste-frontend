import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import idGenerator from 'react-id-generator';
import Button from '../button';

class modal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show : this.props.show,
			showHeader : this.props.showHeader !== undefined ? this.props.showHeader : true
		};
		this.htmlId = "modal-" + idGenerator();
		this.escFunction = this.escFunction.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount() {
		this.setState({
			show : this.props.show,
			showHeader : this.props.showHeader !== undefined ? this.props.showHeader : true
		});
		document.getElementById(this.htmlId).addEventListener("keydown", this.escFunction, false);
		if(document.querySelector("#"+this.htmlId + " > .modal-main .content button.close-modal"))
		{	// Revisar
//			for(var i = 0; i < document.querySelectorAll("#"+this.htmlId + " > .modal-main .content button.close-modal").length; i ++)
//				console.log(this.htmlId + " " +i);
			document.querySelector("#"+this.htmlId + " > .modal-main .content button.close-modal").addEventListener("click", this.closeModal, false);
		} //else console.log("Found none for "+this.htmlId);
	}

	componentWillUnmount() {
    	document.getElementById(this.htmlId).removeEventListener("keydown", this.escFunction, false);
	}

	escFunction(event) {
		if(event.keyCode === 27) {
			this.closeModal();
		}
	}

    closeModal = (event) => {
    	//console.log("Called for "+this.htmlId + ", "+event.target.id);
        this.setState({ show: false });
    };

    displayModal = () => {
        this.setState({ show: true });
    };

	componentWillReceiveProps(newProps) {
		if(this.state.show !== newProps.show)
	    	this.setState({ show: newProps.show});
	}

	render() {
		var displayRule = (this.state.show ? "modal display-block" : "modal display-none") + (this.props.addClass ? " " + this.props.addClass : "");
		return (
			<div id={this.htmlId} className={"modal " + displayRule} onKeyPress={this.handleKeyPress}>
				<div className="modal-main">
					{this.state.showHeader &&
						<section className="header">
							<div className="container">
								<h2>{this.props.title}</h2>
								<button className="btn-close" onClick={this.handleClose ? this.handleClose : this.closeModal}>
								</button>
							</div>
						</section>
					}
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
	showHeader: PropTypes.bool,
	children: PropTypes.object.isRequired,
	handleClose: PropTypes.func,
	handleOpen: PropTypes.func,
	title: PropTypes.string.isRequired,
	addClass: PropTypes.string
}

export default modal;
