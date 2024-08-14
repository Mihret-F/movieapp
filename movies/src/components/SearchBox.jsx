import React from "react";

const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <h1>{props.searchFilm}</h1>
      <input
        className="form-control"
        placeholder="Search for film..."
        value={props.searchFilm}
        onChange={(event) => props.setSearchFilm(event.target.value)}
      />
      
    </div>
  );
};

export default SearchBox;
