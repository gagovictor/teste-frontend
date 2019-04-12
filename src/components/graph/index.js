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
                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                    <canvas id="chart"></canvas>
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
        var chart = this;
        fetch('http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/healthstatus.json').
        then(function(response) {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function(json) {
                    console.log("Recebido obj JSON");
                    console.log(json);
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
        var chartLabels = [];                           // Label horizontal do gráfico
        var dataSets = Object.keys(data.chartdata[0]);  // DataSets
        dataSets.shift();                               // (menos o primeiro índice = x-axis)
        var chartData = [];

        for(var i = 0; i < data.chartdata.length; i ++)
        {   // Compõe a X-axis do gráfico
            chartLabels.push(data.chartdata[i].hora + 'h');
        }
/*
        for(var j = 0; j < dataSets.length; j ++)
        {   // Ordena os valores de cada dataSet
            var a = [];
            for(var k = 0; k < chartLabels.length; k ++)
            {
                console.log(j+","+k);
                chartData[dataSets[j]].push(data.chartdata[k][dataSets[j]]);
            }
        }
*/
        console.log(chartData);
        
        // Configurações chart.js
        Chart.defaults.global.pointHitDetectionRadius = 1;

        var customTooltips = function(tooltip) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');

            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = '<table></table>';
                this._chart.canvas.parentNode.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltip.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltip.yAlign) {
                tooltipEl.classList.add(tooltip.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
                return bodyItem.lines;
            }

            // Set Text
            if (tooltip.body) {
                var titleLines = tooltip.title || [];
                var bodyLines = tooltip.body.map(getBody);

                var innerHtml = '<thead>';

                titleLines.forEach(function(title) {
                    innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '</thead><tbody>';

                bodyLines.forEach(function(body, i) {
                    var colors = tooltip.labelColors[i];
                    var style = 'background:' + colors.backgroundColor;
                    style += '; border-color:' + colors.borderColor;
                    style += '; border-width: 2px';
                    var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                    innerHtml += '<tr><td>' + span + body + '</td></tr>';
                });
                innerHtml += '</tbody>';

                var tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
            }

            var positionY = this._chart.canvas.offsetTop;
            var positionX = this._chart.canvas.offsetLeft;

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = positionX + tooltip.caretX + 'px';
            tooltipEl.style.top = positionY + tooltip.caretY + 'px';
            tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
            tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
            tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        };

        var lineChartData = {
            labels: chartLabels,
            datasets: [{
                label: 'Hoje',
                borderColor: '#7641cb',
                pointBackgroundColor: '#7641cb',
                fill: false,
                data: [
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100))
                ]
            }, {
                label: 'Ontem',
                borderColor: "#269fbd",
                pointBackgroundColor: "#269fbd",
                fill: false,
                data: [
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100))
                ]
            }, {
                label: 'Média',
                borderColor: "#999999",
                pointBackgroundColor: "#999999",
                fill: false,
                data: [
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100)),
                    Math.round(Math.random() * (100 - (-100)) + (-100))
                ]
            }]
        };


        var chartEl = document.getElementById('chart');
        window.myLine = new Chart(chartEl, {
            type: 'line',
            data: lineChartData,
            options: {
                tooltips: {
                    enabled: false,
                    mode: 'index',
                    position: 'nearest',
                    custom: customTooltips
                }
            }
        });
    }

    onChange(selectedDates, dateStr, instance) {
        console.log(selectedDates);
        this.setState({selectedDates : selectedDates});
    }
}

export default lineGraph;
