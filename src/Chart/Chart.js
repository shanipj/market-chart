import React, { Component } from 'react';
import axios from "axios";
import ReactApexChart from 'react-apexcharts';
import Buttons from './Buttons';
import './Chart.css';
import ExternalLinks from '../ExternalLinks/ExternalLinks';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstResponse: false,
      series: [{
        data: []
      }],
      options: {
        chart: {
          height: 400,
          type: 'candlestick',
        },
        title: {
          text: 'Apple Inc',
          align: 'center',
          style: {
            fontSize: '36px',
            color: '#000000',
          }
        },
        annotations: {
          xaxis: [
            {
              x: 'Oct 06 14:00',
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  fontSize: '12px',
                  color: '#fff',
                  background: '#00E396'
                },
                orientation: 'horizontal',
                offsetY: 7,
                text: 'Annotation Test'
              }
            }
          ]
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          type: 'category',

        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      },


    };
  }
  componentDidMount() {
    if (this.state.firstResponse === false) {
      this.getData(60);
    } else {
      return;
    }
  }

  getData(period) {
    axios.get('https://www.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=' + period + '&Precision=Minutes&StartTime=8/28/2020%2016:0&EndTime=9/4/2020%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume')
      .then(response => {
        let dataResponse = [];
        response.data.map((item) => {
          dataResponse.push({
            x: item["Date"],
            y: [item["Open"], item["High"], item["Low"], item["Close"]]
          })
        })
        this.setState({ series: [{ data: dataResponse }], firstResponse: true });
      })
      .catch(error => {
        this.setState({ error: true })
      });
  }


  render() {

    return (
      <div className="background">
        <h1>Market Chart</h1>
        <div className="main">
          <Buttons onClick={(num) => this.getData(num)} />
          <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
          </div>
        </div>
      <ExternalLinks/>
      </div>

    )
  }
}

export default Chart;
