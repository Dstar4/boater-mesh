import React, { Component } from 'react'

export default class Gauge extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { sourceInfo, values, variable } = this.props.data
    const { siteCode, siteName, name, geoLocation } = sourceInfo
    // const { latitude, longitude } = geoLocation.geogLocation
    const reading = values[0].value[0]
    const { unitCode } = variable.unit

    if (
      siteCode &&
      siteName &&
      sourceInfo &&
      values &&
      reading &&
      reading.dateTime
    ) {
      return (
        <>
          <td>{siteName}</td>
          <td>
            {reading.value} {unitCode}
          </td>
          <td>{shapeTimeData(reading.dateTime).time}</td>
          <td>{shapeTimeData(reading.dateTime).year}</td>
        </>
      )
    } else {
      return <tr>null</tr>
    }
  }
}
function shapeTimeData(string) {
  const returnTime = {
    time: string.slice(11, 16),
    year: string.slice(0, 10),
  }
  return returnTime
}
