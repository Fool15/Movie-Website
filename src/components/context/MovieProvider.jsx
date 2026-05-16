import { createContext, useState } from "react";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function getMovies(title) {
    const getMovieRes = await fetch(`https://api.themoviedb.org/3/search/multi?query=${title}&api_key=4f815fa35d062b29eb6a1da9ffce36f8`);      
    const movieData= await getMovieRes.json();
    setSearchResults(movieData.results)
  }
  return (
    <MovieContext.Provider
      value={{
        searchResults,
        setSearchResults,
        selectedMovie,
        setSelectedMovie,
        getMovies
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}