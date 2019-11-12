import React, {useState, useContext} from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import ReadingContext from './Orders'
import SelectedGauge from './Dashboard'

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}
function handleData(data){
  console.log("handleData", data)
}

const mockData =[
createData('00:00', 0),
createData('03:00', 300),
createData('06:00', 600),
createData('09:00', 800),
createData('12:00', 1500),
createData('15:00', 2000),
createData('18:00', 2400),
createData('21:00', 2400),
createData('24:00', undefined),
]
const testData = ReadingContext
export default function Chart() {
  const [data,setData]=useState(testData)
  const selectedGauge = useContext(SelectedGauge)
  // console.log("data",data)
  return (
    <React.Fragment>
      <Title>Today</Title>
      <button onClick={handleData(selectedGauge)}>Click</button>
      <ResponsiveContainer>
        <LineChart
          data={mockData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}