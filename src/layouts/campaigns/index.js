import React, { Component } from 'react';
import './index.scss';
import CampaignGroup from './campaignGroup';
import idGenerator from 'react-id-generator';
import sorttable from 'sorttable';
import logoGoogle from './assets/i-google.svg';
import logoFb from './assets/i-fb.svg';

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
				{error && <p>{error.message}</p>}
				{!isLoading ? (
					<div className="container">
						<section className="header">
							<h1>Campaigns</h1>
						</section>
						<section className="table-wrapper">
							<table className="table campaigns space sortable" cellSpacing="0" cellPadding="0">
								<thead>
									<tr>
										<th className="kind">Target</th>
										<th className="channels">Canais</th>
										<th className="campaigns">Campanhas</th>
										<th className="healthstatus">Health Status</th>
										<th className="created">Criado em</th>
										<th className="period">Periodicidade</th>
									</tr>
								</thead>
								<tbody>
									<tr className="spacer"></tr>
  									{campaignGroups}
								</tbody>
							</table>
						</section>
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

    handleClick() {

    }
}

export default campaigns;
