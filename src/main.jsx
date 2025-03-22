import React from 'react'
import ReactDOM from 'react-dom'
import { SplineScene } from './components/SplineScene'
import './index.css'

// Create a React component for the robot
function RobotApp() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <SplineScene 
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
        className="w-full h-full"
      />
    </div>
  )
}

// Mount the React app to the robot container
const robotContainer = document.getElementById('robot-root')
if (robotContainer) {
  ReactDOM.render(
    <React.StrictMode>
      <RobotApp />
    </React.StrictMode>,
    robotContainer
  )
}
