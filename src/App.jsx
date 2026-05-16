import { useState } from 'react'
import './App.css'
import Navbar from './components/layout/navbar/Navbar'
import Home from './components/pages/home/Home'
import RoutingFile from './routes/RoutingFile'
import { MovieProvider } from './components/context/MovieProvider'
function App() {

  return (
    
    <MovieProvider>
      <Navbar/>
      <RoutingFile/>
    </MovieProvider>
   
  )
}

export default App
