import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ProgressBarLine from "../../../components/progressBar/progressBarLine.js";
import PropTypes from 'prop-types';
import idGenerator from 'react-id-generator';
import Campaign from '../campaign';

class campaignGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
		this.group = React.createRef();
		this.list = React.createRef();
    	this.handleClick = this.handleClick.bind(this);
	}

 	render() {
 		var expanded = this.state.expanded;
        const data = this.props.data;
        var campaigns = null;
        if(data.campaign) {
	        campaigns = data.campaign.map(
	        	function(c, i) {
	        		var k = parseInt(i + '' + (Math.random()*1000));
					return(<Campaign data={c} key={'key-campaign-'+k} />);
	        	}
			);
        }

		return [
    		<tr className={"campaigns-group "+(expanded && "expanded")} onClick={this.handleClick} ref={this.group} key={idGenerator()}>
				<td className="kind">
					{data.kind} 
				</td>
				<td className="channels">
					<ul>
						<li className={"channel facebook "+(data.channels[0] == undefined && "inactive")}>
						</li>
						<li className={"channel google "+data.channels[1]+(data.channels[1] == undefined && "inactive")}>
						</li>
					</ul>
				</td>
				<td className="campaigns-count">
					{data.campaign.length + " campanha" + (data.campaign.length > 1 && 's')}
				</td>
				<td className="healthstatus">
					<ProgressBarLine value={parseInt(data.healthstatus)} showText={true} />
				</td>
				<td className="created">
					{data.created}
				</td>
				<td className="period">
					{data.period}
				</td>
			</tr>,
			<tr className={"campaigns-list "+(expanded && "expanded")} ref={this.list} key={idGenerator()}>
				<td colSpan="6">
				{(data.campaign.length > 0) && (
					<table className="campaign-report">
						<thead>
							<tr>
								<th>Campanha</th>
								<th>Objetivo</th>
								<th>Impressões</th>
								<th>Cliques</th>
								<th>CTR</th>
								<th>CPM (R$)</th>
								<th>CPC (R$)</th>
								<th>Custo (R$)</th>
							</tr>
						</thead>
						<tbody>
							{campaigns}
						</tbody>
					</table>
				)}
				</td>
			</tr>,
			<tr className="spacer" key={idGenerator()}></tr>
   		];
 	}

    handleClick() {
    	// Expande / minimiza lista de campanhas dentro do grupo
        this.setState({ expanded : this.state.expanded ? false : true });
    }
}

campaignGroup.propTypes = {
  data: PropTypes.object.isRequired
}

export default campaignGroup;
