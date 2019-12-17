import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import Navigation from './Navigation'
import Footer from './Footer'

export default class Loader extends Component {
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
