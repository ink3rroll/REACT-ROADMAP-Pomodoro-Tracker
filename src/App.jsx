import { useState } from 'react'
import { FiSettings } from 'react-icons/fi'

import './styles/App.css'

function App() {

  return (
    <>
      <div className='container'>
        <div className="row">
          <button className='settings-btn'><FiSettings/></button>
        </div>
        <div className="row">
          <button className='timer-mode-btn'>Focus</button>
          <button className='timer-mode-btn'>Short Break</button>
          <button className='timer-mode-btn'>Long Break</button>
        </div>
        <h1>23:00</h1>
        <div className="row">
          <button className='timer-increment-btn'>+ 25 min</button>
          <button className='timer-increment-btn'>+ 10 min</button>
          <button className='timer-increment-btn'>+ 5 min</button>
          <button className='timer-increment-btn'>+ 1 min</button>
        </div>
        <div className="row">
          <button>Start</button>
          <button>Reset</button>
        </div>
        
      </div>
    </>
  )
}

export default App
