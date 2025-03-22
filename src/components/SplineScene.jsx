import React, { Suspense, lazy, useEffect, useState } from 'react'

// Dynamically import Spline with a timeout to prevent long loading
const Spline = lazy(() => {
  return new Promise(resolve => {
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      resolve(import('@splinetool/react-spline'))
    }, 100)
  })
})

export function SplineScene({ scene, className }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Handle mouse movement for the robot
  useEffect(() => {
    if (!isLoaded) return

    const handleMouseMove = (e) => {
      // Throttle mouse events for better performance
      if (!window.lastMouseMoveTime || Date.now() - window.lastMouseMoveTime > 50) {
        window.lastMouseMoveTime = Date.now()
        
        // Get the Spline object if available
        const splineApp = window.splineInstance
        if (splineApp && splineApp.emitEvent) {
          // Calculate normalized mouse position
          const x = e.clientX / window.innerWidth
          const y = e.clientY / window.innerHeight
          
          // Send mouse position to Spline
          splineApp.emitEvent('mousePosition', { x, y })
        }
      }
    }

    // Add mouse move listener to the document
    document.addEventListener('mousemove', handleMouseMove)
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isLoaded])

  // Handle Spline load
  const handleLoad = (spline) => {
    // Store the Spline instance globally for mouse tracking
    window.splineInstance = spline
    setIsLoaded(true)
  }

  // Handle errors
  const handleError = () => {
    setHasError(true)
  }

  return (
    <Suspense 
      fallback={
        <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#F8F8F8' // Match page background
        }}>
          <span className="loader"></span>
        </div>
      }
    >
      {!hasError ? (
        <Spline
          scene={scene}
          style={{ 
            width: '100%', 
            height: '100%',
            backgroundColor: '#F8F8F8' // Match page background
          }}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#F8F8F8', // Match page background
          flexDirection: 'column'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#00A79D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8"></path>
            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
            <path d="M2 14h2"></path>
            <path d="M20 14h2"></path>
            <path d="M15 13v2"></path>
            <path d="M9 13v2"></path>
          </svg>
          <p style={{ marginTop: '20px', color: '#00A79D', fontWeight: 'bold' }}>AI Robot Assistant</p>
        </div>
      )}
    </Suspense>
  )
}
