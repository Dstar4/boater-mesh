import React, { Component } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
} from 'recharts'

import '../App.css'

export default class Chart extends Component {
  constructor(props) {
    super(props)
  }
  transformData = arr => {
    let returnArr = []
    arr.forEach(el => {
      returnArr.push(createData(el.timestamp, el.reading))
    })
    return returnArr
  }
  render() {
    return (
      <div className="chart-wrapper">
        <LineChart
          width={1250}
          height={450}
          data={this.transformData(this.props.data)}
          margin={{
            top: 50,
            left: 50,
          }}
        >
          <XAxis dataKey="time">
            <Label
              angle={90}
              position="middle"
              style={{ textAnchor: 'middle' }}
            >
              Time
            </Label>
          </XAxis>
          <YAxis>
            <Label angle={90} position="left" style={{ textAnchor: 'middle' }}>
              {this.props.unit}
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
        </LineChart>
      </div>
    )
  }
}

function createData(time, amount) {
  if (time) {
    let newTime = time
      .split('')
      .slice(11, 16)
      .join('')
    return { newTime, amount }
  }
  return { time, amount }
}
