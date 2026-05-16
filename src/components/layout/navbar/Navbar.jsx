import React from 'react'
import {Search,Bell,User,ChevronDownIcon} from 'lucide-react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { MovieContext } from '../../context/MovieProvider'
function Navbar() {
    const navigate=useNavigate();
    const { setSearchResults ,getMovies} = useContext(MovieContext);
  return (
    <div className='navbar-style'>
        <div className='navbar-redirect'>
            <h1 style={{color:"#c11119",fontSize:"40px"}}>NETFLIX</h1>
            <div className='navbar-redirect-child'>
                <p onClick={()=>{navigate("/")}}>Home</p>
                <p>TV Shows</p>
                <p>Movies</p>
                <p>New & Popular</p>
                <p>My List</p>
                <p>Browse By Languages</p>
            </div>
        </div>
        <div className='user'>
            <input type="text" className='search-bar' placeholder='Enter The Shows Name' onKeyDown={async (e)=>{
                if (e.key=="Enter") {
                    const title=e.target.value
                    await getMovies(title)
                    navigate(`/allMovies`)
                }
            }}/>
            <Search/>
            <div className='user-child'>
                <Bell/>
                <User/> 
                <ChevronDownIcon/>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar