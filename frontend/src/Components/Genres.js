import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { csrftoken } from '../csrf';

function Genres() {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/genres/")
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.log(error));
  }, []);

  function handleClick(genre) {
    const query_params = {
      genre: genre
    };
  
    Promise.all([
      fetch("/api/artists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": "",
        },
        body: JSON.stringify(query_params),
      }),
      fetch("/api/playlists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": "",
        },
        body: JSON.stringify(query_params),
      }),
      fetch("/api/tracks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": "",
        },
        body: JSON.stringify(query_params),
      })
    ])
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .then(([artists, playlists, tracks]) => {
        console.log({ artists, playlists, tracks });
        navigate(`/${genre}`, { state: { artists, playlists, tracks } });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className="genre-list-container">
        <ul className="genre-list">
          {genres.map((genre) => (
            <li
              className="genre"
              key={genre}
              onClick={() => handleClick(genre)}
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Genres;
//need to make post requests for every q param
