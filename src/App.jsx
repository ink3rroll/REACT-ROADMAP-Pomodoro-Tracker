import { useState, useEffect } from 'react'
import { FiSettings } from 'react-icons/fi'
import alarmsound from './assets/alarm.mp3'

import './styles/App.css'

function App() {

  const alarm = new Audio(alarmsound)
  // 0 = Focus, 1 = Short Break, 2 = Long Break
  const [timerMode, setTimerMode] = useState(0)
  
  // 0 = Initial, 1 = Active, 2 = Paused, 3 = Ended
  const [timerStatus, setTimerStatus] = useState(0)

  const [hideModal, setHideModal] = useState(true)

  const [focusTimerDefault, setFocusTimerDefault] = useState(25)
  const [shortBreakDefault, setShortBreakDefault] = useState(5)
  const [longBreakDefault, setLongBreakDefault] = useState(15)

  const [tempSettings, setTempSettings] = useState({
    focus: focusTimerDefault,
    short: shortBreakDefault,
    long: longBreakDefault
})
  const [currentTimeAllocation, setCurrentTimeAllocation] = useState(focusTimerDefault)
  const [mainTimer, setMainTimer] = useState(10)

  function resetTimer() {
      setCurrentTimeAllocation(timerMode === 0 ? focusTimerDefault : timerMode === 1 ? shortBreakDefault : longBreakDefault)
      setTimerStatus(0)
      
      setMainTimer(timerMode === 0 ? focusTimerDefault * 60 : timerMode === 1 ? shortBreakDefault * 60 : longBreakDefault * 60)
  }

  function handleUpdateSettings() {
    
    setFocusTimerDefault(tempSettings["focus"])
    setShortBreakDefault(tempSettings["short"])
    setLongBreakDefault(tempSettings["long"])
    switch(timerMode) {
      case 0:
        setCurrentTimeAllocation(tempSettings["focus"])
        break
      case 1:
        setCurrentTimeAllocation(tempSettings["short"])
        break
      default:
        setCurrentTimeAllocation(tempSettings["long"])
    }
    setHideModal(true)
  }

  useEffect(() => {
    resetTimer()
  }, [focusTimerDefault, shortBreakDefault, longBreakDefault])


  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds - (minutes * 60)

    return `${minutes > 0 ? minutes > 9 ? minutes : `0${minutes}` : "00"}:${seconds > 0 ? seconds > 9 ? seconds : `0${seconds}` : "00"}`
  }

  useEffect(() => {
    let interval = null

    if (timerStatus === 1 && mainTimer > 0) {
      interval = setInterval(() => {
         setMainTimer((prev) => prev-1)
      }, 1000)
    } else if(mainTimer === 0) {
      alarm.play()
    }

    return () => clearInterval(interval)

  }, [mainTimer, timerStatus])

  useEffect(() => {
    setTimerStatus(0)
    if (timerMode === 0) {
      setMainTimer(focusTimerDefault * 60)
      setCurrentTimeAllocation(focusTimerDefault)
    } else if(timerMode === 1) {
      setMainTimer(shortBreakDefault * 60)
      setCurrentTimeAllocation(shortBreakDefault)
    } else {
      setMainTimer(longBreakDefault * 60)
      setCurrentTimeAllocation(longBreakDefault)
    }
  }, [timerMode])

  let progressPercent = ((mainTimer/(currentTimeAllocation * 60)) * 100) > 100 ? 100 : ((mainTimer/(currentTimeAllocation * 60)) * 100)

  

  return (
    <>
    
      <div className='container'>
        {!hideModal && 
        <div onMouseDown={(e) => {if (e.target === e.currentTarget){setHideModal(true)} }} className='settings-modal'>
          <form action="" onMouseDown={(e) => e.stopPropagation()}>
              <label htmlFor="focus">Focus Default Timer Min</label>
              <input type="number" onChange={(e) => setTempSettings({...tempSettings, focus: Number(e.target.value)})} name="" id="focus" value={tempSettings["focus"]} />
              <label htmlFor="short">Short Break Default Timer Min</label>
              <input type="number" onChange={(e) => setTempSettings({...tempSettings, short: Number(e.target.value)})} name="" id="short" value={tempSettings["short"]} />
              <label htmlFor="long">Long Break Default Timer Min</label>
              <input type="number" onChange={(e) => setTempSettings({...tempSettings, long: Number(e.target.value)})} name="" id="long" value={tempSettings["long"]}/>
              <button disabled={(tempSettings["focus"] === focusTimerDefault && tempSettings["short"] === shortBreakDefault && tempSettings["long"] === longBreakDefault)} className='update-btn' type='button' onClick={() => handleUpdateSettings()}>Update Settings</button>
            </form>
        </div>}
        
    
        <div className="row">
          <button onClick={() => setTimerMode(0)} className='timer-mode-btn' data-active={timerMode === 0}>Focus</button>
          <button onClick={() => setTimerMode(1)} className='timer-mode-btn' data-active={timerMode === 1}>Short Break</button>
          <button onClick={() => setTimerMode(2)} className='timer-mode-btn' data-active={timerMode === 2}>Long Break</button>
        </div>
        
        <h1>{formatTime(mainTimer)}</h1>
        <div className="row">
          <div className='progress-container'>
            <div style={{ width: `${progressPercent}%` }} className='progress-bar'></div>
          </div>
        </div>
        <button onClick={() => setHideModal(false)} className='settings-btn'><FiSettings/></button>
        
        <div className="row">
          <button onClick={() => {
            setCurrentTimeAllocation((prev) => prev + 25)
            setMainTimer(mainTimer + (25*60))
            
          }} className='timer-increment-btn'>+ 25 min</button>
          <button onClick={() => {
            setCurrentTimeAllocation((prev) => prev + 10)
            setMainTimer(mainTimer + (10*60))
            
          }} className='timer-increment-btn'>+ 10 min</button>
          <button onClick={() => {
            setCurrentTimeAllocation((prev) => prev + 5)
            setMainTimer(mainTimer + (5*60))
            
          }} className='timer-increment-btn'>+ 5 min</button>
          <button onClick={() => {
            setCurrentTimeAllocation((prev) => prev + 1)
            setMainTimer(mainTimer + (1*60))
            
          }} className='timer-increment-btn'>+ 1 min</button>
        </div>
        <div className="row">
          <button onClick={() => timerStatus === 0 ? setTimerStatus(1) : timerStatus === 2 ? setTimerStatus(1)  : setTimerStatus(2)} className='timer-control-btn' hidden={mainTimer === 0}>{timerStatus === 0 ? "Start" : timerStatus === 1 ? "Pause" : "Resume"}</button>
          <button onClick={() => resetTimer()} className='timer-control-btn' hidden={timerStatus === 0}>Reset</button>
        </div>
        
      </div>
    </>
  )
}

export default App
