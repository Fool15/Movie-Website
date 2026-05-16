import React, { use } from 'react'
import { useState,useEffect } from 'react';
import { Play ,Info} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./Home.css"

function Home() {
    const [data, setData] = useState([]);
    const [imageData,setImageData]=useState("");
    const [trending,setTrending]=useState([]);
    const [id,setID]=useState("");
    let index=0;
    const navigate=useNavigate();


 useEffect(() => {
  async function fetchData() {
    //get the trending movies/tv 
    const getTrendingRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=4f815fa35d062b29eb6a1da9ffce36f8`);
    const trendingData= await getTrendingRes.json();
    setTrending(trendingData.results);
   
   

    //the background
    setImageData(trendingData.results[index].backdrop_path);

    //get the movie or tv data
    const imdbRes  = await fetch(
      `https://api.themoviedb.org/3/${trendingData.results[index].media_type}/${trendingData.results[index].id}?api_key=4f815fa35d062b29eb6a1da9ffce36f8`
    );
    const imdbData = await imdbRes.json();
    setData(imdbData);
    
    //get imdb id

    const imdbIDRes  = await fetch(
      `https://api.themoviedb.org/3/${trendingData.results[index].media_type}/${trendingData.results[index].id}/external_ids?api_key=4f815fa35d062b29eb6a1da9ffce36f8`
    );
    const imdbIDData = await imdbIDRes.json();
    setID(imdbIDData.imdb_id);


  }

  fetchData();
}, []);
console.log("ktu",data)
  
  return (
    <div className='home-container'>
        <div className="home-style"   style={{
        backgroundImage: imageData? `url(https://image.tmdb.org/t/p/original${imageData})`: "none"}}>
            
        <div className='dark-overlay'></div>    

            <div className='home-title-con'>
                <h1 className='home-title'>{data.name||data.title}</h1>
                <p>{data.overview}</p>
                <div className='home-buttons'>
                    <a href={`https://www.playimdb.com/title/${id}`} style={{textDecoration:"none"}}><button className='home-btn-play' ><Play fill='black' style={{paddingRight:"7px"}}/>Play</button></a>
                    <button className='home-btn-info' 
                    onClick={()=>{navigate(`/about/${trending[index].media_type}/${data.id}/${id}`)}}>
                      <Info  style={{paddingRight:"7px"}}/>More Info</button>
                </div>
            </div>
        </div>
      </div>

  
    
    )
}

export default Home