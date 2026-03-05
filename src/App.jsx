import { useState, useEffect } from 'react'
import { FiSettings } from 'react-icons/fi'

import './styles/App.css'

function App() {
  // 0 = Focus, 1 = Short Break, 2 = Long Break
  const [timerMode, setTimerMode] = useState(0)
  
  // 0 = Initial, 1 = Active, 2 = Paused, 3 = Ended
  const [timerStatus, setTimerStatus] = useState(0)

  const [focusTimerDefault, setFocusTimerDefault] = useState(25)
  const [shortBreakDefault, setShortBreakDefault] = useState(5)
  const [longBreakDefault, setLongBreakDefault] = useState(15)
  const [mainTimer, setMainTimer] = useState(10)


  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds - (minutes * 60)

    console.log(minutes, seconds)

    return `${minutes > 0 ? minutes > 9 ? minutes : `0${minutes}` : "00"}:${seconds > 0 ? seconds > 9 ? seconds : `0${seconds}` : "00"}`
  }

  useEffect(() => {
    let interval = null

    if (timerStatus === 1 && mainTimer > 0) {
      interval = setInterval(() => {
         setMainTimer((prev) => prev-1)
      }, 1000)
    }

    return () => clearInterval(interval)

  }, [mainTimer, timerStatus])

  console.log("Timer status: ", timerStatus)
  

  return (
    <>
      <div className='container'>
        <div className="row">
          <button className='timer-mode-btn'>Focus</button>
          <button className='timer-mode-btn'>Short Break</button>
          <button className='timer-mode-btn'>Long Break</button>
        </div>
        
        <h1>{formatTime(mainTimer)}</h1>
        <div className="row">
          <div className='progress-container'>
            <div className='progress-bar'></div>
          </div>
        </div>
        <button className='settings-btn'><FiSettings/></button>
        
        <div className="row">
          <button onClick={() => setMainTimer(mainTimer + (25*60))} className='timer-increment-btn'>+ 25 min</button>
          <button onClick={() => setMainTimer(mainTimer + (10*60))} className='timer-increment-btn'>+ 10 min</button>
          <button onClick={() => setMainTimer(mainTimer + (5*60))} className='timer-increment-btn'>+ 5 min</button>
          <button onClick={() => setMainTimer(mainTimer + (1*60))} className='timer-increment-btn'>+ 1 min</button>
        </div>
        <div className="row">
          <button onClick={() => timerStatus === 0 ? setTimerStatus(1) : timerStatus === 2 ? setTimerStatus(1)  : setTimerStatus(2)} className='timer-control-btn' hidden={mainTimer === 0}>{timerStatus === 0 ? "Start" : timerStatus === 1 ? "Pause" : "Resume"}</button>
          <button className='timer-control-btn'>Reset</button>
        </div>
        
      </div>
    </>
  )
}

export default App
