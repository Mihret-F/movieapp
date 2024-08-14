import React from "react";

const FilmList = (props) => {
  const FavoriteComponent = props.favoriteComponent;

  return (
    <>
      {props.films && props.films.length > 0 ? (
        props.films.map((film) => (
          <div key={film.imdbID} className="d-flex justify-content-start m-3 image-container">
            <img 
              src={film.Poster !== "N/A" ? film.Poster : "https://via.placeholder.com/150"} 
              alt={film.Title} 
              className="img-fluid"
            />
            <div 
              className="overlay d-flex align-items-center justify-content-center" 
              onClick={() => props.handleFavoriteClick(film)}
            >
              <FavoriteComponent />
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </>
  );
};

export default FilmList;
