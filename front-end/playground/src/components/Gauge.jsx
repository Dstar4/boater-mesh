import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Gauge extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { sourceInfo, values } = this.props.data
    const { siteCode, siteName, name } = sourceInfo
    const reading = values[0].value[0]
    if (
      siteCode &&
      siteName &&
      sourceInfo &&
      values &&
      reading &&
      reading.dateTime
    ) {
      return (
        <tr key={name}>
          <Link
            to={`/readings/${sourceInfo.siteCode[0].value}`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <td>{siteName}</td>
          </Link>
          <td>{reading.dateTime}</td>
          <td>{reading.value}</td>
        </tr>
      )
    } else {
      return <tr>null</tr>
    }
  }
}
