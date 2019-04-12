import React, { Component } from 'react';
import './index.scss';
import ProgressBar from '../progressBar';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

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
                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                    <div className="container">
                        <h2>{header.title}</h2>
                        <h3>Last Update: {data.date} {data.time}</h3>
                        <div className="row">
                            <div className="column">
                                <ProgressBar data={data} />
                                <Link to="/campaign">
                                    <h5 className="expand">ver detalhes</h5>
                                </Link> 
                            </div>
                            <div className="column">
                                <h4 className="title">Inbound</h4>
                                <span className="count">{data.inbound}</span>
                                <span className="difference inc">
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

    // Resgata dados da API e inicializa grafico
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
