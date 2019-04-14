import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'progressbar.js';
import './index.scss';

class progressBarLine extends Component {

	constructor(props) {
		super(props);
		this.state = {};
        this.id = parseInt(props.value);
	}

 	render() {
        const data = this.props.data;
		return (
    		<div className="progressbar line">
                <div className="progress" id={"progress-"+this.id}></div>
        	</div>
   		);
 	}

    componentDidMount() {
        const p = this.props;
        var circle = new ProgressBar.Line('#progress-'+this.id, {
            color: '#ff0000',
            duration: 3000,
            strokeWidth: 10,
            trailWidth: 10,
            trailColor: "#151515",
            easing: 'easeInOut',
            text: {
                autoStyleContainer: true
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
                if(p.showText)
                {
                    if(value === 0)
                        circle.setText('');
                    else
                        circle.setText(value + '%');
                }
            }
        });

        var amount = parseFloat(p.value / 100.0);
        circle.animate(amount);
    }
}

progressBarLine.propTypes = {
  value: PropTypes.number.isRequired,
  showText: PropTypes.bool
}

export default progressBarLine;
