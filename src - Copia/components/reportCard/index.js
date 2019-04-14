import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './index.scss';
import ProgressBarCircle from '../progressBar/progressBarCircle.js';
import iDown from './assets/i-down.svg';
import iUp from './assets/i-up.svg';

class reportCard extends Component {
	constructor(props) {
		super(props);
        this.state = {
            isLoading : true,
            data: [],
            error: null
        };
	}

 	render() {
        const header = this.props.header;
        const { isLoading, data, error } = this.state;
		return (
    		<div className="reportcard">
                {error && <p>{error.message}</p>}
                {!isLoading ? (
                    <div className="container">
                        <h2 className="row">{header.title}</h2>
                        <h3 className="row">Last Update: {data.date} {data.time}</h3>
                        <div className="row">
                            <div className="column">
                                <ProgressBarCircle data={data} />
                                <h5 className="expand">
                                    <Link to={header.path}>
                                        ver detalhes
                                    </Link>
                                </h5>
                            </div>
                            <div className="column">
                                <h4 className="title">Inbound</h4>
                                <span className="count">{data.inbound}</span>
                                <span className={"difference " + ((data.difference.indexOf('-') > -1) ? 'dec' : 'inc')}>
                                    {data.difference}
                                </span>
                                <hr/>
                                <h4 className="title">Outbound</h4>
                                <span className="count">{data.outbound}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h3>Loading...</h3>
                )}
        	</div>
   		);
 	}

    // Processa requisições à API
    componentDidMount() {
        this.fetchData();
    }

    // Resgata dados da API
    fetchData() {
        const card = this;
        const header = this.props.header;
        fetch(header.api_url).
        then(function(response) {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function(json) {
                    card.setState({
                        data: json,
                        isLoading: false,
                    });
                });
            } else {
                this.setState({ error : true, isLoading : false})
            }
        })
        .catch(error => this.setState({ error, isLoading : false }));
    }

}

reportCard.propTypes = {
  header: PropTypes.object.isRequired
}

export default reportCard;
