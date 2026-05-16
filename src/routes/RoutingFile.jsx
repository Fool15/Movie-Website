import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from '../components/pages/home/Home'
import About from '../components/pages/about/About'
import FrontPage from '../components/front-page/FrontPage'
import AllMovies from '../components/pages/allMovies/AllMovies'

function RoutingFile() {
  return (
    <Routes>
        <Route path='/' element={<FrontPage/>}/>
        <Route path='/about/:mediaType/:movieId/:imbdId' element={<About/>}/>
        <Route path='/allMovies' element={<AllMovies/>}/>
    </Routes>
  )
}

export default RoutingFile