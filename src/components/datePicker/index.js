import React, { Component } from 'react';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.css';
import './index.scss';

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
        		<input id="date-range" type="date" ref={this.datePicker} />
        	</div>
   		);
 	}

    componentDidMount() {
        flatpickr(this.datePicker.current, {
            onChange: this.onChange.bind(this),
            mode: "range",
            dateFormat: "Y-m-d",
            defaultDate: ["2016-08-24", "2016-09-22"]
        });
    }

    onChange(selectedDates, dateStr, instance) {
        console.log(selectedDates);
        this.setState({selectedDates : selectedDates});
    }
}

export default datePicker;
