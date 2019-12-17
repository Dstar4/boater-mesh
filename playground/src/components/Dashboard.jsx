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
    search: ''
  }
  componentDidMount() {
    Axios.get(`${URL}/api/gauges/`).then(data => {
      // console.log(data)
      this.setState({ data: data.data.value.timeSeries })
    })
  }
  handleChange = event => {
    const value = event.target.value
    this.setState({
      search: value
    })
    // this.state.data.filter(el => {
    //   console.log(value)
    //   if (el.sourceInfo.siteName === this.state.search) {
    //     this.setState({ data: [el] })
    //     console.log('el', el)
    //   }
    // })
  }
  clickHandle = e => {
    e.preventDefault()
    let siteNames = []
    this.state.data.filter(el => {
      // console.log(el)
      if (el.sourceInfo.siteName === this.state.search) {
        const newData = [el]
        this.setState({ data: newData })
      }
    })
  }
  render() {
    console.log(this.props)
    if (this.state.data) {
      // console.log(this.state.data)
      return (
        <div id='dashboard'>
          <Navigation />
          {/* <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={e => this.handleChanges(e)}
              value={this.state.search}
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          <div style={{ display: 'flex' }}>
            {/* <Col xs={2}> */}
            {/* <SideBar /> */}
            {/* </Col> */}
            <Col>
              <Jumbotron fluid className='jumbotron'>
                <Container>{/* <img src={require('../resources/banner1.jpg')} /> */}</Container>
              </Jumbotron>
              {/* <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={e => this.handleChange(e)}
                  value={this.state.search}
                />
                <Button
                  type="submit"
                  onClick={e => this.clickHandle(e)}
                  variant="outline-success"
                >
                  Search
                </Button>
              </Form> */}
              <Search history={this.props.history} />
              <Gauges data={this.state.data} history={this.props.history} />
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
