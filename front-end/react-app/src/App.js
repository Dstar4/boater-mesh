import React from 'react';
import Gauge from './components/Gauge'
import Dashboard from './components/Dashboard'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Dashboard/> */}
        <Gauge/>
      </header>
    </div>
  );
}

export default App;
