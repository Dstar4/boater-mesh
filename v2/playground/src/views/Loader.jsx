import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
class Loader extends Component {
  render() {
    return (
      <div className="loading-wrapper ">
        <Navigation />
        <Spinner className="spinner" animation="grow" />
        <Footer />
      </div>
    )
  }
}

export default Loader
