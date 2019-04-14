import React, { Component } from 'react';
import Chart from "chart.js";
import 'chart.js/dist/Chart.css';
import './index.scss';

class lineGraph extends Component {

	constructor(props) {
		super(props);
		this.state = {
            isLoading : true,
            data: [],
            error: null
		};
	}

 	render() {
        const { isLoading, data, error } = this.state;
		return (
    		<div className="graph">
                <div className="container">
                    <div className="row">
                        <h2>Status - Messages <span>Last update: {data.date} {data.time}</span></h2>
                    </div>
                    <div className="row graph-wrapper">
                    {error ? <p>{error.message}</p> : null}
                    {!isLoading ? (
                        <canvas id="chart"></canvas>
                    ) : (
                        <h3>Loading...</h3>
                    )}
                    </div>
                </div>
            </div>
   		);
 	}

    // Processa requisições à API
    componentDidMount() {
        this.fetchData();
    }

    // Resgata dados da API e inicializa grafico
    fetchData() {
        var chart = this;
        fetch('http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/healthstatus.json').
        then(function(response) {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function(json) {
                    chart.setState({
                        data: json,
                        isLoading: false,
                    });
                    chart.mountGraph();
                });
            } else {
                this.setState({ error : true, isLoading : false})
            }
        })
        .catch(error => this.setState({ error, isLoading : false }));
    }

    // Inicializa grafico
    mountGraph() {
        if(!document.querySelector('#chart'))
            return;

        // Processa dados recebidos da API
        const { isLoading, data, error } = this.state;
        
        // Objeto dataSets contém os dados retornados da API reordenados para utilização pelo gráfico.
        // O primeiro índice contém um array com o nome das chaves;
        // a partir do segundo índice, estão ordenados os arrays com os valores correspondentes a estas chaves.
        // [0] (Array)   : chaves de valores (hora,hoje,ontem,media)
        // [1-x] (Array) : número indefinido de arrays contendo os valores de cada chave. (ex: dataSets[1] = todos valores de datasets[0][0] (hora))
        var x;
        var i = 1;
        var dataSets = Array();
        dataSets[0] = Object.keys(data.chartdata[0]);
        for(var k in data.chartdata[0])
        {   // Loop chaves
            dataSets[i] = new Array();
            for(var x in data.chartdata)
            {   // Loop valores
                dataSets[i].push(data.chartdata[x][k]);
            }
            i++;
        }

        // Aplica o sufixo 'h' na numeração de horas
        for(var i = 0; i < dataSets[1].length; i ++)
            dataSets[1][i] = dataSets[1][i] + 'h';

        // Inicialização chart.js
        Chart.defaults.global.pointHitDetectionRadius = 1;
        var lineChartData = {
            labels: dataSets[1],
            datasets: [{
                label: "Hoje", // Hoje /*dataSets[0][1]*/ 
                borderColor: '#7641cb',
                pointBackgroundColor: '#7641cb',
                fill: false,
                data: dataSets[2]
            }, {
                label: "Ontem", // Ontem /*dataSets[0][2]*/ 
                borderColor: "#269fbd",
                pointBackgroundColor: "#269fbd",
                fill: false,
                data: dataSets[3]
            }, {
                label: "Média", // Média /*dataSets[0][3]*/ 
                borderColor: "#999999",
                pointBackgroundColor: "#999999",
                fill: false,
                data: dataSets[4]
            }]
        };

        var chartEl = document.getElementById('chart');
        window.myLine = new Chart(chartEl, {
            type: 'line',
            data: lineChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    enabled: true,
                    mode: 'index',
                    position: 'nearest',
                    backgroundColor: '#ffffff',
                    cornerRadius: 0,
                    xPadding: 15,
                    yPadding: 15,
                    titleFontFamily: "'Gotham', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    bodyFontFamily: "'Gotham', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    titleFontColor: '#111111',
                    bodyFontColor: '#111111'
                }
            }
        });
    }
}

export default lineGraph;
