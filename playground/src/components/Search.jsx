import React, { Component } from 'react'

import { ButtonGroup, Form, FormControl, Button } from 'react-bootstrap'
import Axios from 'axios'
import { Redirect } from 'react-router'
const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      period: null,
      siteCode: '03453000'
    }
  }
  handleChange = event => {
    // console.log('handle change', event)
    const value = event.target.value
    this.setState({
      siteCode: value
    })
    console.log(this.state)
  }
  handlePeriod = e => {
    // console.log('handle Period', e)
    this.setState({ period: e })
    console.log(this.state)
  }

  clickHandle = e => {
    e.preventDefault()
    // console.log("submit", this.props)
    this.props.history.push(`/details/${this.state.siteCode}/${this.state.period}`)
  }

  render() {
    // console.log('this.state Search', this.state)
    // console.log('this.props Search', this.props)
    return (
      <div>
        <Form inline>
          <ButtonGroup aria-label='Basic example'>
            <Button onClick={() => this.handlePeriod('PT12H')} variant='secondary'>
              12 Hours
            </Button>
            <Button variant='secondary' onClick={() => this.handlePeriod('P1D')}>
              1 Day
            </Button>
            <Button variant='secondary' onClick={() => this.handlePeriod('P3D')}>
              3 Days
            </Button>
            <Button variant='secondary' onClick={() => this.handlePeriod('P6D')}>
              6 Days
            </Button>
          </ButtonGroup>
          <FormControl
            type='text'
            placeholder='03453000'
            className='mr-sm-2'
            onChange={e => this.handleChange(e)}
            value={this.state.siteCode}
          />
          <Button type='submit' onClick={e => this.clickHandle(e)} variant='outline-success'>
            Search Sites
          </Button>
        </Form>
      </div>
    )
  }
}

export default Search
