import React, { Component } from 'react'
import Axios from 'axios'
import Chart from './Chart'
import Table from 'react-bootstrap/Table'
import Sidebar from './Sidebar'
import Navigation from './Navigation'
import Footer from './Footer'
import Col from 'react-bootstrap/Col'
class Readings extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: null,
    readings: null,
  }

  componentDidMount() {
    let match = this.props.match.params.siteCode
    const URL = `https://waterservices.usgs.gov/nwis/iv/?format=json&site=${match}&period=PT24H`
    Axios.get(URL).then(data => {
      const tmp = shapeChartData(data)
      this.setState({ readings: tmp })
      this.setState({ data: data })
    })
  }

  render() {
    const { readings, data } = this.state
    console.log('data', data)
    if (data) {
      console.log(
        'selector',
        data.data.value.timeSeries[0].variable.unit.unitCode
      )
    }
    if (readings && readings.name && data) {
      return (
        <div>
          <Navigation />
          {/* <div style={{ display: 'flex' }}> */}
            {/* <Col xs={2}> */}
              {/* <Sidebar /> */}
            {/* </Col> */}
            {/* <Col> */}
              <h1>{readings.name}</h1>
              <Chart data={readings.readings} />
              <p>Reading siteCode: {readings.siteCode}</p>
              <p>
                Units: {data.data.value.timeSeries[0].variable.unit.unitCode}
              </p>
              <Table responsive striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>TimeStamp</th>
                    <th>Reading</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.readings.map(item => {
                    return (
                      <tr>
                        <td>Timestamp: {item.timestamp}</td>
                        <td>Reading: {item.reading}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            {/* </Col> */}
          {/* </div> */}
          <Footer />
        </div>
      )
    } else return 'Loading . . . '
  }
}

export default Readings

function shapeChartData(arr) {
  if (
    arr &&
    arr.data &&
    arr.data.value &&
    arr.data.value.timeSeries[0] &&
    arr.data.value.timeSeries[0].values[0]
  ) {
    const tmpArr = []
    arr.data.value.timeSeries[0].values[0].value.map(el => {
      const tmp = {
        timestamp: el.dateTime,
        reading: el.value,
      }
      tmpArr.push(tmp)
    })
    // console.log(arr)
    const returnObject = {
      name: arr.data.value.timeSeries[0].sourceInfo.siteName,
      siteCode: arr.data.value.timeSeries[0].sourceInfo.siteCode[0].value,
      readings: [...tmpArr],
    }
    // console.log('returnObject', returnObject)
    return returnObject
  }
}
