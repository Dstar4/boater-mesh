import React, { Component } from 'react'
import Gauges from '../components/Gauges'
import Axios from 'axios'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SideBar from '../components/Sidebar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Readings from '../components/Readings'
class ReadingDashboard extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div style={{ display: 'flex' }}>
          {/* <Col xs={3}> */}
          {/* <SideBar /> */}
          {/* </Col> */}
          {/* <Col> */}
          <Readings />
          {/* </Col> */}
        </div>
        <Footer />
      </div>
    )
  }
}

export default ReadingDashboard
