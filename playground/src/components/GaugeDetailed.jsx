import React, { Component } from 'react'
import Axios from 'axios'
import { Table, Row, Container, Col, Jumbotron } from 'react-bootstrap'

import Chart from './Chart'
import Navigation from './Navigation'
import Loader from './Loader'
import Footer from './Footer'
import Sidebar from './Sidebar'

require('dotenv').config()

const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
export default class Readings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      readings: null
    }
  }

  componentDidMount() {
    const {siteCode, period} = this.props.match.params
    const postData = {
      siteCode: [siteCode],
      period: period
    }
    console.log("post data", postData)
    Axios.post(`${URL}/api/gauges/search`, postData).then(res => {
      console.log("data", res)
      const tmp = shapeChartData(res)
      this.setState({ readings: tmp ,  data: res })
    })
  }

  render() {
    // console.log('this.props gauge detailed', this.props)

    const { readings, data } = this.state
    if (readings && readings.name && data) {
      const timeSeries = this.state.data.data.value.timeSeries[0]
      // const {siteProperty} = timeSeries.sourceInfo
      // console.log(data)
      const { longitude, latitude } = timeSeries.sourceInfo.geoLocation.geogLocation
      const tmpReadings = [...readings.readings]
      return (
        <div id='readings-dashboard'>
          <Navigation />
          <div style={{ display: 'flex' }}>
            {/* <Col xs={2}> */}
            {/* <Sidebar /> */}
            {/* </Col> */}
            <Col>
              <Jumbotron fluid className='jumbotron'>
                {/* <Container> */}
                {/* </Container> */}
              </Jumbotron>
              <h1>{readings.name}</h1>
              <Chart data={readings.readings} unit={data.data.value.timeSeries[0].variable.unit.unitCode} />
              <h4>Longitude: {longitude}</h4>
              <h4>Latitude: {latitude}</h4>
              <Table responsive striped bordered hover variant='dark'>
                <thead>
                  <tr>
                    <th>Reading</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tmpReadings.reverse().map(item => {
                    // console.log(item)
                    return (
                      <tr key={item.timestamp || ''}>
                        <td>
                          {item.reading} {data.data.value.timeSeries[0].variable.unit.unitCode}
                        </td>
                        <td>{shapeTimeData(item.timestamp).time}</td>
                        <td>{shapeTimeData(item.timestamp).year} </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
          </div>
          <Footer />
        </div>
      )
    } else return <Loader />
  }
}

function shapeChartData(arr) {
  if (arr && arr.data && arr.data.value && arr.data.value.timeSeries[0] && arr.data.value.timeSeries[0].values[0]) {
    const tmp = arr.data.value.timeSeries[0].values[0].value
    const tmpArr = []
    tmp.map(el => {
      const tmp = {
        timestamp: el.dateTime,
        reading: el.value
      }
      tmpArr.push(tmp)
    })
    const returnObject = {
      name: arr.data.value.timeSeries[0].sourceInfo.siteName,
      siteCode: arr.data.value.timeSeries[0].sourceInfo.siteCode[0].value,
      readings: [...tmpArr]
    }
    return returnObject
  }
}
function shapeTimeData(string) {
  const returnTime = {
    time: string.slice(11, 16),
    year: string.slice(0, 10)
  }
  return returnTime
}
