import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Artists from "./Artists";
// import { csrftoken } from '../csrf';

function Genres() {
  const [genres, setGenres] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetch("/api/genres/")
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.log(error));
  }, []);

  function handleClick(genre) {
    const query_params = {
      genre: genre,
    };
    fetch("/api/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": "",
      },
      body: JSON.stringify(query_params),
    })
      .then((response) => response.json())
      .then((data) => setSearchResult(data));
  }
 

  return (
    <div>
      <div className="genre-list-container">
        <ul className="genre-list">
          {genres.map((genre) => (
            <li className="genre" key={genre} onClick={() => handleClick(genre)}>
              <Link to={`/genres/${genre}`}>{genre}</Link> 
            </li>
          ))}
        </ul>
      </div>
      <Artists searchResult={searchResult} />
    </div>
  );
}

export default Genres;
//need to make post requests for every q param
