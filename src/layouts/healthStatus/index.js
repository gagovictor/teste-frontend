import React, { Component } from 'react';
import './index.scss';
import $ from 'jquery';
import DatePicker from '../../components/datePicker';
import LineGraph from '../../components/graph';
import ReportCard from '../../components/reportCard';
import Button from '../../components/button';
import Modal from '../../components/modal';
import ContactForm from '../../components/contactForm';

class healthStatus extends Component {

	constructor(props) {
		super(props);
        this.reports = {
			campaigns : {
				title : 'Campaigns',
                path : '/campaigns',
				api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/campaigns.json'
			},
            notification : {
            	title : 'Notification',
                path : '/notification',
            	api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/notification.json'
            },
            transaction : {
            	title : 'Transaction',
                path : '/transaction',
            	api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/transaction.json'
            }
		};
        this.state = {
            displayModal : false
        };
	}

    displayModal = () => {
        $('html, body').animate({ scrollTop: 0 }, 300);
        this.setState({ displayModal: true });
    };

 	render() {
        const contactButton = {
                href : '/contact',
                className : 'scale hover letter',
                action : this.displayModal,
                text : "Entre em contato"
            };

		return (
    		<div id="healthStatus">
        		<section className="header">
        			<h1><span>Pmweb ></span> Health Status</h1>
                    <DatePicker />
                </section>
                <section className="row space">
                	<LineGraph />
                </section>
                <section className="grid space reportcards">
                	<ReportCard header={this.reports.notification}/>
                	<ReportCard header={this.reports.campaigns}/>
                	<ReportCard header={this.reports.transaction}/>
                </section>
                <section className="row space">
                    <Button data={contactButton} onClick={this.displayModal}/>
                </section>
                <Modal title="Entre em contato" show={this.state.displayModal}>
                    <ContactForm />
                </Modal>
        	</div>
   		);
 	}

}

export default healthStatus;
