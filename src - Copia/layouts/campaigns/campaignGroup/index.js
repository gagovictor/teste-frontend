import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ProgressBarLine from "../../../components/progressBar/progressBarLine.js";
import PropTypes from 'prop-types';
import Campaign from '../campaign';
import './index.scss';

class campaignGroup extends Component {

	constructor(props) {
		super(props);
		//this.handleClick = this.handleClick.bind(this);
	}

 	render() {
        const data = this.props.data;
        console.log("here is data ",data);
        var campaigns = null;

       /* for(var campaign in data.campaigns) {
        	console.log(1);
        }
        var campaigns = null;
        if(data.campaigns) {
	        campaigns = data.campaigns.map((c) =>
				<Campaign data={c} key={idGenerator().toString()} />
			);
        }
        console.log("campaigns", campaigns);
*/
		return (
    		<tr className="campaign-group">
				<td className="kind">
					{data.kind} 
				</td>
				<td className="channels">
					<ul>
						<li className={"channel facebook"+(data.channels[0] == undefined && " inactive")}>
						</li>
						<li className={"channel google"+data.channels[1]+(data.channels[1] == undefined && " inactive")}>
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
				{(1==2 && data.campaign.length > 0) && (
					<td rowspan="2">
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
								<tbody>
									{campaigns}
								</tbody>
							</thead>
						</table>
					</td>
				)}
			</tr>
   		);
 	}

    handleClick() {
        console.log("handleClick");
    }
}

campaignGroup.propTypes = {
  data: PropTypes.object.isRequired
}

export default campaignGroup;
