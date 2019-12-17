import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Dashboard from './components/Dashboard'
import Readings from './components/Readings'

export default function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/readings/:siteCode' component={Readings} />
      </header>
    </div>
  )
}
