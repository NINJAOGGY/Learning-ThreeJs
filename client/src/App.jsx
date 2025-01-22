import React from 'react'
import Home from './pages/Home'
import Customizer from './pages/Customizer'
import CanvasModel from './canvas'

const App = () => {
  return (
    <main className='app transition-all'>
      <Home/>
      <CanvasModel/>
      <Customizer/>
    </main>
  )
}

export default App
