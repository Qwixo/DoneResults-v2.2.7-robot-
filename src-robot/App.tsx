import React from 'react'
import { SplineSceneBasic } from './components/demo'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">3D Interactive Components</h1>
        <SplineSceneBasic />
      </div>
    </div>
  )
}

export default App
