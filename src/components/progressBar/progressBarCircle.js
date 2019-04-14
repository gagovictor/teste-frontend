import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'progressbar.js';
import './index.scss';

class progressBarCircle extends Component {

	constructor(props) {
		super(props);
		this.state = {};
        this.id = parseInt(props.data.healthstatus);
	}

 	render() {
        const data = this.props.data;
		return (
    		<div className="progressbar circle">
                <p></p>
                <div className="progress" id={"progress-"+this.id}></div>
        	</div>
   		);
 	}

    componentDidMount() {
        const data = this.props.data;
        var circle = new ProgressBar.Circle('#progress-'+this.id, {
            color: '#ff0000',
            duration: 3000,
            strokeWidth: 10,
            trailWidth: 10,
            trailColor: "#151515",
            easing: 'easeInOut',
            text: {
                autoStyleContainer: false
            },
            from : {
                color : '#f94531'
            },
            to : {
                color : '#3ab34d'
            },
            step : function(state, circle, attachment) {
                circle.path.setAttribute('stroke', state.color);
                var value = Math.round(circle.value() * 100);
                if(value === 0)
                  circle.setText('');
                else
                  circle.setText(value + '%');
            }
        });

        var amount = parseFloat(data.healthstatus) / 100.0;
        circle.animate(amount);
    }
}

progressBarCircle.propTypes = {
  data: PropTypes.object.isRequired
}

export default progressBarCircle;
