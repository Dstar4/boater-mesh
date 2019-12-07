import React, { Component } from 'react'
import Axios from 'axios'
import { Link, Route, useRouteMatch } from 'react-router-dom'
class Readings extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    readings: null,
  }
  componentDidMount() {
    let match = this.props.match.params.siteCode

    // const URL = `https://waterservices.usgs.gov/nwis/iv/?format=json&site=${match}&period=P5D`
    const URL =
      'https://waterservices.usgs.gov/nwis/iv/?format=json&site=02053200&period=P5D'
    Axios.get(URL).then(data => {
      // console.log('DATA', data)
      this.setState({ readings: data })
    })
  }

  render() {
    const { readings } = this.state
    if (readings && readings.data.value.timeSeries[0].values) {
      // console.log('readings', this.state.readings)
      return (
        <div>
          <h1> Readings</h1>
          {readings.data.value.timeSeries[0].values[0].value.map(el => {
            return (
            <>
            <p>{el.value}</p>
            <p>{el.dateTime}</p>
            </>
            )
          })}
        </div>
      )
    } else {
      // console.log('this.state', this.state)
      return 'Loading'
    }
  }
}

export default Readings
