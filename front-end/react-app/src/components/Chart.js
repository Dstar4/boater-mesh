import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from 'recharts'

function createData (time, amount) {
  if (time) {
    let newTime = time
      .split('')
      .slice(11, 16)
      .join('')
    return { newTime, amount }
  }
  return { time, amount }
}

export default function Chart (props) {
  function transformData (arr) {
    console.log('ARR______________', arr)
    let returnArr = []
    arr.forEach(el => {
      returnArr.push(createData(el.timeStamp, el.gaugeReading))
    })
    console.log('RETURN ARR________', returnArr)
    return returnArr
  }
  return (
    <React.Fragment>
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
