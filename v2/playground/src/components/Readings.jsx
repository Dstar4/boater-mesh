import React, { Component } from 'react'
import Axios from 'axios'
import Chart from './Chart'
import Table from 'react-bootstrap/Table'
import Navigation from './Navigation'
import Loader from '../views/Loader'
import Footer from './Footer'
const URL = `http://localhost:5000`
class Readings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      readings: null,
    }
  }

  componentDidMount() {
    let match = this.props.match.params.siteCode

    Axios.get(`${URL}/api/gauges/${match}`).then(data => {
      const tmp = shapeChartData(data)
      this.setState({ readings: tmp })
      this.setState({ data: data })
    })
  }

  render() {
    const { readings, data } = this.state
    if (readings && readings.name && data) {
      return (
        <div>
          <Navigation />
          <h1>{readings.name}</h1>
          <Chart data={readings.readings} />
          <p>Reading siteCode: {readings.siteCode}</p>
          <p>Units: {data.data.value.timeSeries[0].variable.unit.unitCode}</p>
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
          <Footer />
        </div>
      )
    } else return <Loader/>
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
    const returnObject = {
      name: arr.data.value.timeSeries[0].sourceInfo.siteName,
      siteCode: arr.data.value.timeSeries[0].sourceInfo.siteCode[0].value,
      readings: [...tmpArr],
    }
    return returnObject
  }
}
