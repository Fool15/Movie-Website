import React from 'react'
import "./About.css"
import { useParams,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Play,Info } from 'lucide-react';

function About() {
    const {mediaType,movieId,imbdId}=useParams();
    const [data,setData]=useState([]);
    const [recommended,setRecommended]=useState([])
    const [moreLikeThis,setMoreLikeThis]=useState(false)
    const navigate=useNavigate()

  useEffect( ()=>{
    async function fetchData(){
      const getMovieRes = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=4f815fa35d062b29eb6a1da9ffce36f8`);      
      const movieData= await getMovieRes.json();
      setData(movieData);
      console.log(movieData)

      
      const getRecommendedRes = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}/recommendations?api_key=4f815fa35d062b29eb6a1da9ffce36f8&language=en-US&page=1`);
      const recommendedData= await getRecommendedRes.json();
      setRecommended(recommendedData.results);

    }
    fetchData()
  },[])
     
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
    <div className='home-container'>
        <div className={moreLikeThis==false?'home-style center':'home-style end'}   style={{
        backgroundImage:`url(https://image.tmdb.org/t/p/original${data.backdrop_path})`}}>
      
        <div className='dark-overlay'></div>    

            <div className='home-title-con'>
                <h1 className={moreLikeThis==false?'home-title':'home-title short-title'}>{data.name||data.title}</h1>
                <p className={moreLikeThis==false?'':'shorten-desc'}>{data.overview}</p>
                <div className='home-buttons'>
                    <a href={`https://www.playimdb.com/title/${imbdId}`} style={{textDecoration:"none"}}>
                    <button className='home-btn-play' ><Play fill='black' style={{paddingRight:"7px"}}/>Play</button></a>
                    <button className='home-btn-info' onClick={()=>{setMoreLikeThis(!moreLikeThis)}}>
                      <Info  style={{paddingRight:"7px"}}/>{ moreLikeThis==false?"More Like This":"Show Details"}
                      </button>
                </div>
            </div>
            {
              moreLikeThis==false?(<></>):(<>
                <h1 style={{position:"absolute",left:"100px",top:"390px",textDecoration:"underline red"}}>More Like This</h1>
                
                <div className='carousel'>
                  <div className='group'>
                    {recommended?.map((e, i) => {
                      return (
                          <div className="movie" key={i}  onClick={async ()=>{
                                const imdb_id=await getMovieImdbID(e.media_type,e.id)
                                navigate(`/about/${e.media_type}/${e.id}/${imdb_id}`)
                                window.location.reload()
                                }}>
                              <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} alt="Movie Poster" className='movie-poster'/>
                              <button className='movie-title'>{e.title || e.name}</button>
                          </div>
                          );
                      })}
                  </div>
              </div>
              </>)
            }

        </div>
       
      </div>


  )
}

export default About