import React, { Component } from 'react'

export default class Gauge extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { sourceInfo, values, variable } = this.props.data
    const { siteCode, siteName, name } = sourceInfo
    const reading = values[0].value[0]
    const { unitCode } = variable.unit
    // console.log('this.props.data', variable.unit.unitCode)
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
          <td>{reading.dateTime}</td>
          <td>
            {reading.value} {unitCode}
          </td>
        </>
      )
    } else {
      return <tr>null</tr>
    }
  }
}
