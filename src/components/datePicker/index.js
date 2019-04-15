import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      selectedDates: null
		};
    this.mode = this.props.mode ? this.props.mode : 'single';
    this.showIcon = this.props.showIcon ? this.props.showIcon : true;
    this.datePicker = React.createRef();
	}

 	render() {
		return (
    		<div className={"date-picker flatpickr" + (this.props.addClass && (" " + this.props.addClass))} ref={this.datePicker}>
        		<div className="input-container">
                    <input className={"date-"+this.mode} type="date" data-input/>
                    {this.showIcon == false && (
                      <label data-toggle>
                      </label>
                    )}
                </div>
        	</div>
   		);
 	}

    componentDidMount() {
        const dP = this.datePicker;
        const mode = this.mode;
        flatpickr(this.datePicker.current, {
            mode: mode,
            wrap: true,
            dateFormat: "Y-m-d",
            position: 'below',
            defaultDate: (mode == "range" ? ["2016-08-24", "2016-09-22"] : null),
            onChange: this.onChange.bind(this),
            onOpen: function() {
              dP.current.childNodes[0].childNodes[0].classList.add('hidden');
            },
            onClose: function() {
              dP.current.childNodes[0].childNodes[0].classList.remove('hidden');
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

datePicker.propTypes = {
  mode: PropTypes.string,
  addClass: PropTypes.string,
  showIcon: PropTypes.bool
}

export default datePicker;
