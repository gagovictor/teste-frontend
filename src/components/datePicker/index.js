import React, { Component } from 'react';
import flatpickr from "flatpickr";
//import { Portuguese } from "./lang/pt.js"
import 'flatpickr/dist/flatpickr.css';
import './index.scss';
import iCalendar from './assets/i-calendar.png';
import idGenerator from 'react-id-generator';

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
    		<div className="datepicker flatpickr" ref={this.datePicker}>
        		<div className="input-container">
                    <input className="date-range" type="date" data-input/>
                    <label for="date-range" data-toggle>
                    </label>
                </div>
        	</div>
   		);
 	}

    componentDidMount() {
        const dP = this.datePicker;
        flatpickr(this.datePicker.current, {
            onChange: this.onChange.bind(this),
            mode: "range",
            wrap: true,
            dateFormat: "Y-m-d",
            position: 'below',
            defaultDate: ["2016-08-24", "2016-09-22"],
            onOpen: function() {
              console.log('onopen', dP.current.childNodes[0].childNodes[0].classList.add('hidden'));
            },
            locale: {
              rangeSeparator: ' - ',
              weekdays: {
                  shorthand: ["D", "S", "T", "Q", "Q", "S", "S"],
                  longhand: [
                      "Domingo",
                      "Segunda",
                      "Terça",
                      "Quarta",
                      "Quinta",
                      "Sexta",
                      "Sábado",
                  ]
              },
              months: {
                  shorthand: [
                      "Jan",
                      "Fev",
                      "Mar",
                      "Abr",
                      "Mai",
                      "Jun",
                      "Jul",
                      "Ago",
                      "Set",
                      "Out",
                      "Nov",
                      "Dez",
                  ],
                  longhand: [
                      "Janeiro",
                      "Fevereiro",
                      "Março",
                      "Abril",
                      "Maio",
                      "Junho",
                      "Julho",
                      "Agosto",
                      "Setembro",
                      "Outubro",
                      "Novembro",
                      "Dezembro",
                  ]
              },
            }
        });
    }

    onChange(selectedDates, dateStr, instance) {
        this.setState({selectedDates : selectedDates});
    }
}

export default datePicker;
