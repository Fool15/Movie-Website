import React from 'react'
import "./MovieBlock.css"
import { useState,useEffect } from 'react';
import { data } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MovieBlock() {
    //  const [data, setData] = useState([]);
    //  const [imageData,setImageData]=useState([]);
     const [trending,setTrending]=useState([]);
     const [recommended,setRecommended]=useState([]);
     const [thriller,setThriller]=useState([]);

     const [data,setData]=useState([]);

     const navigate=useNavigate();

    
     useEffect(() => {
      async function fetchData() {
    
        const getTrendingRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=4f815fa35d062b29eb6a1da9ffce36f8`);
        const trendingData= await getTrendingRes.json();
        setTrending(trendingData.results);
       
        
        const getRecommendedRes = await fetch(`https://api.themoviedb.org/3/movie/${trendingData.results[0].id}/recommendations?api_key=4f815fa35d062b29eb6a1da9ffce36f8&language=en-US&page=1`);
        const recommendedData= await getRecommendedRes.json();
        setRecommended(recommendedData.results);

        const getThrillerRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4f815fa35d062b29eb6a1da9ffce36f8&with_genres=53&vote_average.gte=7&sort_by=popularity.desc`);
        const thrillerData= await getThrillerRes.json();
        setThriller(thrillerData.results);
        console.log( "THRILLER MOVIES",thrillerData)
       
       
        
      }
    
      fetchData();
    }, []);
    // console.log(trending[0].poster_path)
    
     async function getMovieImdbID(media_type,id){
    
      if(media_type==undefined){media_type="movie"}
       const res = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/external_ids?api_key=4f815fa35d062b29eb6a1da9ffce36f8`
      );

       const data = await res.json();
      console.log(data)
       return data.imdb_id;
    }
    console.log(trending)
  return (
    <div className='movie-block'>
        <h1 style={{marginLeft:"6%",color:"#FFFFFF"}}>Top 20 Trending </h1>
        <div className='carousel'>
            <div className='group'>
              {trending?.map((e, i) => {
                return (
                    <div className="movie" key={i} onClick={async ()=>{
                          const imdb_id=await getMovieImdbID(e.media_type,e.id)
                          navigate(`/about/${e.media_type}/${e.id}/${imdb_id}`)
                          window.location.reload()
                          }}>
                        <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} alt="Movie Poster" className='movie-poster'/>
                        <button className='movie-title' >{e.title || e.name}</button>
                    </div>
                    );
                })}
            </div>
            
        </div>
        <h1 style={{marginLeft:"6%",color:"#FFFFFF",marginTop:"7%"}}>Recommended </h1>

        <div className='carousel'>
            <div className='group'>
              {recommended?.map((e, i) => {
                return (
                    <div className="movie" key={i} onClick={async ()=>{
                          const imdb_id=await getMovieImdbID(e.media_type,e.id)
                          navigate(`/about/${e.media_type}/${e.id}/${imdb_id}`)
                          window.location.reload()
                          }}>
                        <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} alt="Movie Poster" className='movie-poster'/>
                        <button className='movie-title' >{e.title || e.name}</button>
                    </div>
                    );
                })}
            </div>
            
        </div>
        <h1 style={{marginLeft:"6%",color:"#FFFFFF",marginTop:"7%"}}>Thriller </h1>
        
        <div className='carousel'>
            <div className='group'>
              {thriller?.map((e, i) => {
                return (
                    <div className="movie" key={i} onClick={async ()=>{
                          const imdb_id=await getMovieImdbID(e.media_type,e.id)
                          navigate(`/about/movie/${e.id}/${imdb_id}`)
                          window.location.reload()
                          }}>
                        <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} alt="Movie Poster" className='movie-poster'/>
                        <button className='movie-title' >{e.title || e.name}</button>
                    </div>
                    );
                })}
            </div>
            
        </div>
    </div>
  )
}

export default MovieBlock