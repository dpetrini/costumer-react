import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { Panel } from 'react-bootstrap';
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

// Custom label to place it above the bar
const CustomBarLabel = props => {
  const {x, y, stroke, value} = props;
  return <text x={x} y={y} dx={+7} dy={-4} fill={stroke} fontSize={11} textAnchor="middle">{value}</text>
};

// Bar chart for generation/current consumption
// "Given the same prop values, a pure component always renders the same elements."
// const SolarBarChart = props => {
class SolarBarChart extends Component {
  render () {
    return (   
      <div className="BarChart">
        <Panel className="graph"> 
          <div className="bar-chart-wrapper" >
            <BarChart 
              id="currentChart" 
              ref={(chart) => this.currentChart = chart} 
              width={720} height={300} data={this.props.data}
              margin={{top: 10, right: 25, left: 5, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis />
              <CartesianGrid strokeDasharray="3 3"/>  
              <Tooltip/>
              <Legend verticalAlign="top" height={45}/>
              <Bar dataKey="Consumo" fill="#8884d8" label={<CustomBarLabel />} />
              <Bar dataKey="Geração" fill="#82ca9d" label={<CustomBarLabel />} />
            </BarChart>
          </div>   
        </Panel>
      </div>   
    );
  }
}

SolarBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default SolarBarChart;
