import React, { Component } from 'react'
import Gauges from '../components/Gauges'
import Axios from 'axios'
import { Route } from 'react-router-dom'
import Readings from '../components/Readings'
class Dashboard extends Component {
  constructor(props){
    super(props)
  }
  state = {
    data: null,
  }
  componentDidMount() {
    const URL = `https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC`
    Axios.get(URL).then(data => {
      //  console.log(data.data.value.timeSeries)
      this.setState({ data: data.data.value.timeSeries })
      // console.log("this.state.data",this.state.data)
    })
  }
  render() {
    // console.log("this.props Dashboard", this.props)
    if (this.state.data) {
      return (
        <div>
          <h1>Dashboard</h1>
          <Gauges data={this.state.data}/>
          {/* <Route exact path='/' render={pr=> <Gauges data={this.state.data} {...pr}/> } /> */}
          {/* <Readings/> */}
          {/* <Gauges data={this.state.data} style={{width:"100%"}}/> */}
        </div>
      )
    } else {
      return <h1>Dashboard Loading. . . </h1>
    }
  }
}

export default Dashboard
