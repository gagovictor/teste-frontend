import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import './index.scss';

class campaign extends Component {

	constructor(props) {
		super(props);
		this.state = {
			running : true
		};
		this.handleClick = this.handleClick.bind(this);
	}

 	render() {
        const data = this.props.data;
		return (
    		<tr className="campaign-group">
				<td className="name">
					<i className="status"></i>
					{data.name}
				</td>
				<td className="goal">{data.goal}</td>
				<td className="impressions">{data.impressions}</td>
				<td className="clicks">{data.clicks}</td>
				<td className="cpc">{data.cpc}</td>
				<td className="ctr">{data.ctr}</td>
				<td className="cpm">{data.cpm}</td>
				<td className="custo">{data.custo}</td>
			</tr>
   		);
 	}

    handleClick() {
        console.log("campaign @ handleClick");
        this.setState({ running : this.state.running ? false : true });
        // Fazer chamada post para pausar/resumir efetivamente a campanha.
    }
}

campaign.propTypes = {
  data: PropTypes.object.isRequired
}

export default campaign;
