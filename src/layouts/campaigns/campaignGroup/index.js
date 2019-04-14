import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ProgressBarLine from "../../../components/progressBar/progressBarLine.js";
import PropTypes from 'prop-types';
import idGenerator from 'react-id-generator';
import Campaign from '../campaign';
import './index.scss';

class campaignGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
    	this.groupId = 'campaign-group-'+idGenerator();
		this.group = React.createRef();
		this.list = React.createRef();
    	this.handleClick = this.handleClick.bind(this);
	}

 	render() {
        const data = this.props.data;
        var campaigns = null;
        if(data.campaign) {
	        campaigns = data.campaign.map((c) =>
				<Campaign data={c} key={idGenerator().toString()} />
			);
        }

		return [
    		<tr className="campaigns-group" data-campaign-group={this.groupId} onClick={this.handleClick} ref={this.group}>
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
			<tr className="campaigns-list" data-campaign-list={this.groupId} ref={this.list}>
				<td colspan="6">
				{(data.campaign.length > 0) && (
					<table className="campaign-report">
						<thead>
							<th>Campanha</th>
							<th>Objetivo</th>
							<th>Impressões</th>
							<th>Cliques</th>
							<th>CTR</th>
							<th>CPM (R$)</th>
							<th>CPC (R$)</th>
							<th>Custo (R$)</th>
						</thead>
						<tbody>
							{campaigns}
						</tbody>
					</table>
				)}
				</td>
			</tr>,
			<tr className="spacer"></tr>
   		];
 	}

    handleClick() {
    	// Expande / minimiza lista de campanhas dentro do grupo
        if(!this.state.expanded) {
        	this.setState({ expanded : true });
        	this.group.current.classList.add('expanded');
        	this.list.current.classList.add('expanded');
        }
        else
        {
        	this.setState({ expanded : false });
        	this.group.current.classList.remove('expanded');
        	this.list.current.classList.remove('expanded');
        }
    }
}

campaignGroup.propTypes = {
  data: PropTypes.object.isRequired
}

export default campaignGroup;
