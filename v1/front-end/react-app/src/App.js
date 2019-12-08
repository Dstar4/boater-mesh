import React from 'react'
import Gauge from './components/Gauge'
import Dashboard from './components/Dashboard'
import { Route } from 'react-router-dom'
function App () {
  // let match = useRouteMatch();

  return (
    <div className='App'>
      <header className='App-header'>
        <Dashboard />
        {/* <Gauge /> */}
      </header>
      {/* <Route exact path='/' component={Dashboard} /> */}
    </div>
  )
}

export default App
