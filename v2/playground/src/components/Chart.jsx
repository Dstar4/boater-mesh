import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, Label } from 'recharts'
import '../App.css'
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
      <LineChart
        width={1300}
        height={650}
        data={this.transformData(this.props.data)}
        margin={{
          top: 50,
          left: 100,
        }}
      >
        <XAxis dataKey="time" />
        <YAxis>
          <Label
            angle={270}
            position="left"
            style={{ textAnchor: 'middle' }}
          ></Label>
        </YAxis>
        <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
      </LineChart>
    )
  }
}
