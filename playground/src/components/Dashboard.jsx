import React, { Component } from 'react'
import Axios from 'axios'
import { Form, FormControl, Button, Container, Col, Jumbotron, Image } from 'react-bootstrap'

import '../App.css'

import Loader from './Loader'
import Gauges from './Gauges'
import Navigation from './Navigation'
import Footer from './Footer'
import SideBar from './Sidebar'
import Search from './Search'

require('dotenv').config()

const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: null,
    search: '',
    nameArr: []
  }
  componentDidMount() {
    Axios.get(`${URL}/api/gauges/`).then(data => {
      this.setState({ data: data.data.value.timeSeries })
      let nameArr = []
      this.state.data.forEach(item => {
        nameArr.push(item.sourceInfo.siteName)
      })
      this.setState({ nameArr: nameArr })
    })
  }
  handleChange = event => {
    const value = event.target.value
    this.setState({
      search: value
    })
    const tmp = this.state.nameArr
    const newTmp = filterItems(tmp, value)
    this.setState({ nameArr: newTmp })
  }
  clickHandle = e => {
    e.preventDefault()
    let siteNames = []
    this.state.data.filter(el => {
      if (el.sourceInfo.siteName === this.state.search) {
        const newData = [el]
        this.setState({ data: newData })
      }
    })
  }
  render() {
    if (this.state.data) {
      return (
        <div id='dashboard'>
          <Navigation />
          <div style={{ display: 'flex' }}>
            {/* <Col xs={2}> */}
              {/* <SideBar /> */}
            {/* </Col> */}
            <Col>
              <Jumbotron fluid className='jumbotron'>
                {/* <Container><img src={require('../resources/banner1.jpg')} /></Container> */}
              </Jumbotron>
              <Gauges data={this.state.data} history={this.props.history} filter={this.state.nameArr} />
            </Col>
          </div>
          <Footer />
        </div>
      )
    } else {
      return <Loader />
    }
  }
}
const filterItems = (arr, query) => {
  return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}
