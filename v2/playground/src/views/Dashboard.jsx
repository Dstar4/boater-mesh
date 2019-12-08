import React, { Component } from 'react'
import '../App.css'
import Gauges from '../components/Gauges'
import Axios from 'axios'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SideBar from '../components/Sidebar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Loader from './Loader'
const NC_SITES = [
  '03524000',
  '03512000',
  '03512000',
  '03460000',
  '03410210',
  '03453000',
  '03460000',
  '02176930',
  '02176930',
  '02177000',
  '02177000',
  '02177000',
  '0351706800',
  '03518500',
  '03539778',
  '03539778',
  '03540500',
  '03540500',
  '03539600',
  '03539600',
  '03441000',
  '03451500',
  '03453500',
  '03451500',
  '03451500',
  '03451500',
  '03439000',
  '03443000',
  '03453500',
  '03439000',
  '03451500',
  '03189600',
  '03192000',
  '03540500',
  '03539778',
  '03453000',
  '02138500',
  '02399200',
  '02398950',
  '02399200',
  '02398950',
  '02399200',
  '02398950',
  '03539778',
  '03539778',
  '03503000',
  '03503000',
  '03446000',
  '03505550',
  '03505550',
  '03185400',
  '03465500',
  '03465500',
  '03465500',
  '03540500',
  '03540500',
  '03512000',
  '02176930',
  '02177000',
  '03460795',
  '03455500',
  '03531500',
  '03531500',
  '03512000',
  '03512000',
  '03208500',
  '03209000',
  '03208500',
  '03209000',
  '02169000',
  '02168504',
  '02162350',
  '03518500',
  '03451000',
  '02181580',
  '03473000',
  '03465500',
  '03463300',
  '03463300',
  '03510577',
  '03076500',
]
class Dashboard extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: null,
  }
  componentDidMount() {
    const URL = `http://localhost:5000/api/gauges/`
    // const URL = `http://waterservices.usgs.gov/nwis/iv/?format=json&sites=${NC_SITES}&period=PT12H`
    Axios.get(URL).then(data => {
      this.setState({ data: data.data.value.timeSeries })
    })
  }
  render() {
    if (this.state.data) {
      return (
        <div>
          <Navigation />
          {/* <div style={{ display: 'flex' }}> */}
          {/* <Col xs={2}> */}
          {/* <SideBar /> */}
          {/* </Col> */}
          {/* <Col> */}
          <Gauges data={this.state.data} />
          {/* </Col> */}
          {/* </div> */}
          <Footer />
        </div>
      )
    } else {
      return (
        <Loader/>
      )
    }
  }
}

export default Dashboard
