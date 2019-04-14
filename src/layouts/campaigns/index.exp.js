import React, { Component } from 'react';
import './index.scss';
import CampaignGroup from './campaignGroup';
import idGenerator from 'react-id-generator';
import sorttable from 'sorttable';
import NestedJsonTable from 'react-nested-json-table';
//import logoGoogle from './assets/i-google.svg';
//import logoFb from './assets/i-fb.svg';

class campaigns extends Component {

	constructor(props) {
		super(props);
		this.api_url = 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/campaigns.json';
        this.state = {
            isLoading : true,
            data: [],
            error: null
        };
	}

	render() {
        const { isLoading, data, error } = this.state;
        var campaignGroups = null;
        if(data.campaigns) {
	        campaignGroups = data.campaigns.map((c) =>
				<CampaignGroup data={c} key={idGenerator().toString()} />
			);
        }

		return (
			<div id="campaigns">        
				{this.state.data && (() =>
					<NestedJsonTable data={this.state.data} expandAll={true} />
				)()}
			</div>
		);
	}

    // Processa requisições à API
    componentDidMount() {
        this.fetchData();
    }

    // Resgata dados da API
    fetchData() {
        const campaigns = this;
        fetch(campaigns.api_url).
        then(function(response) {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function(json) {
                    campaigns.setState({
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

export default campaigns;
