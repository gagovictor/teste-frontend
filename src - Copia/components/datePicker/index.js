import React, { Component } from 'react';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.css';
import './index.scss';
import iCalendar from './assets/i-calendar.png';

class datePicker extends Component {

	constructor(props) {
		super(props);
		this.state = {
            selectedDates: new Array([new Date('08/24/2016'), new Date('08/24/2016')])
		};
        this.datePicker = React.createRef();
		//this.handleClick = this.handleClick.bind(this);
	}

 	render() {
		return (
    		<div className="datepicker flatpickr">
        		<div className="input-container">
                    <input className="date-range" type="date" ref={this.datePicker} />
                </div>
        	</div>
   		);
 	}

    componentDidMount() {
        flatpickr(this.datePicker.current, {
            onChange: this.onChange.bind(this),
            mode: "range",
            dateFormat: "Y-m-d",
            position: 'below',
            defaultDate: ["2016-08-24", "2016-09-22"]
        });
    }

    onChange(selectedDates, dateStr, instance) {
        this.setState({selectedDates : selectedDates});
    }
}

export default datePicker;
