import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Gauge from './Gauge'
import { Link } from 'react-router-dom'
export default class Gauges extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.data) {
      return (
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Timestamp</th>
              <th>Reading</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(el => {
              return <Gauge data={el} />
            })}
          </tbody>
        </Table>
      )
    } else return <h1>Gauges Loading ... </h1>
  }
}
