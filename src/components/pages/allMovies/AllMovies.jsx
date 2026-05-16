import React from 'react'
import "./AllMovies.css"
import { useContext } from 'react'
import { MovieContext } from '../../context/MovieProvider'
import { useNavigate } from 'react-router-dom'

function AllMovies() {
     const { searchResults } = useContext(MovieContext);
     console.log(searchResults)
     const navigate=useNavigate();

      async function getMovieImdbID(media_type,id){
    
      if(media_type==undefined){media_type="movie"}
       const res = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/external_ids?api_key=4f815fa35d062b29eb6a1da9ffce36f8`
      );

       const data = await res.json();
      console.log(data)
       return data.imdb_id;
    }

  return (
    <>
    <h1 style={{position:"absolute",left:"120px",top:"190px",textDecoration:"underline #c11119"}}>Results:</h1>
    <div className='all-movies-con'>
        {searchResults.map((e,i)=>{
            return(
                <div className="movie" key={i} onClick={async ()=>{
                    const imdb_id=await getMovieImdbID(e.media_type,e.id)
                    navigate(`/about/${e.media_type}/${e.id}/${imdb_id}`)
                    window.location.reload()
                    }}>
                    <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} alt="Movie Poster" className='movie-poster'/>
                    <button className='movie-title' >{e.title || e.name}</button>
                </div>
            )
        })}
    </div>
    </>

  )
}

export default AllMovies