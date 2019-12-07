import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Gauge extends Component {
  constructor(props) {
    super(props)
  }
  gaugeClickHandler = e => {
    // return console.log('clicked', e, this.props.data)
  }
  render() {
    const { sourceInfo, values } = this.props.data
    const { siteCode, siteName, name } = sourceInfo
    const reading = values[0].value[0]
    if (siteCode && siteName && sourceInfo && values) {
      return (
        <Link
          to={`/readings/${siteCode[0].value}`}
          style={{ color: 'black', textDecoration: 'none' }}

        >
          <tr
            key={name}
            onClick={() => this.gaugeClickHandler(siteCode[0].value)}
          >
            <td>{siteName}</td>
            <td>{reading.dateTime}</td>
            <td>{reading.value}</td>
          </tr>
        </Link>
      )
    } else {
      return <tr>null</tr>
    }

  }
}
