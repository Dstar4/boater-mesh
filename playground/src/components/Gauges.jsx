import React, { Component } from 'react'
import { Table, ButtonGroup, Form, FormControl, Button } from 'react-bootstrap'
import Gauge from './Gauge'
import Loader from './Loader'
import Search from './Search'
export default class Gauges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gauges: this.props.data,
      search: '',
      nameArr: []
    }
  }
  componentDidMount() {
    if (this.state.gauges) {
      const nameArr = []
      this.state.gauges.forEach(item => {
        nameArr.push(item.sourceInfo.siteName)
      })
    }
  }
  handlePeriod = e => {
    this.setState({ period: e })
    // console.log(this.state)
  }
  handleChange = event => {
    const value = event.target.value
    this.setState({
      search: value
    })
    let nameArr = []

    this.setState({ nameArr: nameArr })
    // console.log(this.props.data, this.state)

    if (this.props.data && this.state.search) {
      const x = filterItems(this.props.data, this.state.search)
      console.log('XXX', x)
      this.setState({gauges:x})
    }
  }
  clickRedirect = e => {
    // console.log('this.props gauges', this.props)
    // window.location.href = `/readings/${e}`
    this.props.history.push(`/readings/${e}`)
  }

  render() {
    if (this.props.data) {
      return (
        <>
          <div>
            <Form inline>
              <FormControl
                type='text'
                placeholder='Search River Names'
                className='mr-sm-2'
                onChange={e => this.handleChange(e)}
                value={this.state.siteCode}

              />
              <Button type='submit' onClick={e => this.clickHandle(e)} variant='outline-success'>
                Search Sites
              </Button>
            </Form>
          </div>
          <Table responsive striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Reading</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.gauges.map(el => {
                return (
                  <>
                    <tr onClick={() => this.clickRedirect(el.sourceInfo.siteCode[0].value)} key={el.sourceInfo.siteCode[0].value}>
                      <Gauge data={el} />
                    </tr>
                  </>
                )
              })}
            </tbody>
          </Table>
        </>
      )
    } else return <Loader />
  }
}

const filterItems = (arr, query) => {
  console.log('filterItems', arr, query)
  // if (arr & query) {
    return arr.filter(el => el.sourceInfo.siteName.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  // }
}
