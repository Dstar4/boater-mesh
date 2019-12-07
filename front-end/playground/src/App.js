import React from 'react'
import './App.css'
import Dashboard from './views/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import  Gauges  from './components/Gauges'
import  Gauge  from './components/Gauge'
import  Readings  from './components/Readings'
import Home from './views/Home'
import {Route} from 'react-router-dom'
import ReadingDashboard from './views/ReadingDashboard'
function App () {

  return (
    <div className='App'>
      <header className='App-header'>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/readings/:siteCode" component={Readings}/>
      </header>
    </div>
  )
}

export default App
