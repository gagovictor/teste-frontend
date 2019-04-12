import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import './index.scss';

class Button extends Component {

	constructor(props) {
		super(props);
		//this.handleClick = this.handleClick.bind(this);
	}

 	render() {
        const data = this.props.data;
		return (
    		<button className={"button " + data.className}
                    href={data.href ? data.href : ""}
                    onClick={data.action ? data.action : null} >
        		{data.text}
        	</button>
   		);
 	}

    handleClick() {
        console.log("handleClick");
        const data = this.props.data;
        if(data.action)
        {
            console.log("Action handler");
        }
        else if(data.href)
            return <Redirect to={data.href} />;

    }
}

Button.propTypes = {
  data: PropTypes.object.isRequired
}

export default Button;
