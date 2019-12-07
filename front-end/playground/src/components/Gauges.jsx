import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Gauge from './Gauge'
export default class Gauges extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // console.log('this.props CDM', this.props)
  }
  componentDidUpdate(prevProps, prevState) {
    // if (this.props.data) {
    // console.log('this.props CDU', this.props)
    // }
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
