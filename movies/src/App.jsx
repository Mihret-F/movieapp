import { useEffect, useState } from 'react';
import './App.css';
import FilmList from './components/FilmList';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmListHeading from './components/FilmListHeading';
import SearchBox from './components/SearchBox';
import Addfavorites from './components/Addfavorites';
import Removefaviroite from './components/Removefaviroite';
const App = () => {
  const [films, setFilms] = useState([]);
  const [searchFilm, setSearchFilm] = useState('');
  const [error, setError] = useState(null);
  const [favoriteFilms, setFavoriteFilms] = useState([]); // Initialize as an array

  const getFilmRequest = async (searchFilm) => {
    try {
      const url = `https://www.omdbapi.com/?s=${searchFilm}&apikey=5f6d4135`;
      console.log('Fetching URL:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseJson = await response.json();

      if (responseJson.Search) {
        setFilms(responseJson.Search);
      } else {
        setFilms([]); // Clear films if no results found
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setFilms([]); // Clear films on error
    }
  };

  useEffect(() => {
    if (searchFilm) {
      getFilmRequest(searchFilm);
    }
  }, [searchFilm]);
  useEffect(() => {
    const filmfavorites =JSON.parse(
      localStorage.getItem('your favorite')
    );
    if(filmfavorites){
      setFavoriteFilms(filmfavorites);}
    },[]);
  
  const savetolocalstorage=(items)=>{
    localStorage.setItem('your-favorites',yourfavorite, JSON.stringify(items))
  }

  const addFavoriteFilm = (film) => {
    const newFavoriteList = [...favoriteFilms, film];
    setFavoriteFilms(newFavoriteList);
    savetolocalstorage(newFavoriteList);
  };
  const removefaviroitefilm = (film) => {
    const newFavoriteList = favoriteFilms.filter(
    (favoriteFilms) => favoriteFilms.imdbID!==film.imdbID
  );
    setFavoriteFilms(newFavoriteList);
    savetolocalstorage(newFavoriteList);
  };
  return (
    <div className="App container-fluid film-css">
      <div className="row d-flex align-items-center mb-4">
        <FilmListHeading heading="Film " />
        <FilmListHeading heading="Please search your favorite film =====> " />
        <SearchBox searchFilm={searchFilm} setSearchFilm={setSearchFilm} />
      </div>

      <div className="row">
        {error ? (
          <div className="col">
            <p>Error: {error}</p>
          </div>
        ) : (
          <>
            <FilmList 
              films={films} 
              handleFavoriteClick={addFavoriteFilm} 
              favoriteComponent={Addfavorites} 
            />
            <div className="row d-flex align-items-center mb-4">
              <FilmListHeading heading="" />
            </div>
            <div className="row">
              <FilmList 
                films={favoriteFilms} 
                handleFavoriteClick={removefaviroitefilm} 
                favoriteComponent={Removefaviroite}

              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
