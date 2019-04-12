import React, { Component } from 'react';
import './index.scss';
import DatePicker from '../../components/datePicker';
import LineGraph from '../../components/graph';
import ReportCard from '../../components/reportCard';

class healthStatus extends Component {

	constructor(props) {
		super(props);
		this.reports = {
			campaign : {
				title : 'Campaigns',
				api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/campaigns.json'
			},
            notification : {
            	title : 'Notification',
            	api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/notification.json'
            },
            transaction : {
            	title : 'Transaction',
            	api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/transaction.json'
            }
		};
        this.e = React.createRef();
	}

 	render() {
		return (
    		<div id="healthStatus">
        		<div className="header">
        			<h1><span>Pmweb ></span> Health Status</h1>
                    <DatePicker />
                </div>
                <div className="row">
                	<LineGraph />
                </div>
                <div className="row">
                	<ReportCard header={ this.reports.notification } />
                	<ReportCard header={ this.reports.campaign } />
                	<ReportCard header={ this.reports.transaction } />
                </div>
        	</div>
   		);
 	}

}

export default healthStatus;
