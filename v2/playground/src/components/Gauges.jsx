import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Gauge from './Gauge'
import Loader from './Loader'
export default class Gauges extends Component {
  constructor(props) {
    super(props)
  }
  clickRedirect = e => {
    window.location.href = `/readings/${e}`
  }
  render() {
    if (this.props.data) {
      return (
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Reading</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(el => {
              return (
                <>
                  <tr
                    onClick={() =>
                      this.clickRedirect(el.sourceInfo.siteCode[0].value)
                    }
                    key={el.sourceInfo.siteCode[0].value}
                  >
                    <Gauge data={el} />
                  </tr>
                </>
              )
            })}
          </tbody>
        </Table>
      )
    } else return <Loader />
  }
}
