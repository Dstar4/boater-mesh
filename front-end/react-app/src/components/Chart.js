import React, { useState, useEffect, useContext } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from 'recharts'
import Title from './Title'
import ReadingContext from './Gauges'
import SelectedGauge from './Dashboard'
import axios from 'axios'
// Generate Sales Data

function createData (time, amount) {
  if (time) {
    let newTime = time
      .split('')
      .slice(11,16)
      .join('')
      // console.log("time",time,"newTime",newTime)
    return { newTime, amount }
  }
  return { time, amount }
}

export default function Chart (props) {
  function transformData (arr) {
    console.log('createData', createData('00:00', 0))
    let returnArr = []
    arr.forEach(el => {
      console.log(createData(el.timeStamp, el.gaugeReading))
      returnArr.push(createData(el.timeStamp, el.gaugeReading))
    })
    return returnArr
  }
  return (
    <React.Fragment>
      {/* <Title>Today</Title> */}
      <ResponsiveContainer>
        <LineChart
          data={transformData(props.data)}
          margin={{
            top: 50,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey='time' />
          <YAxis>
            <Label angle={270} position='left' style={{ textAnchor: 'middle' }}>
              Reading(cfs)
            </Label>
          </YAxis>
          <Line type='monotone' dataKey='amount' stroke='#556CD6' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
