import React, { useState, useEffect } from "react";
// import { csrftoken } from '../csrf';

function Genres() {
  const [genres, setGenres] = useState([]);
  // const [clickedGenre, setClickedGenre] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetch("/api/genres/")
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.log(error));
  }, []);

  function handleClick(genre) {
    // setClickedGenre(genre);
    const query_params = {
      genre: genre,
    };
    console.log(query_params);
    fetch("/api/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": "",
      },
      body: JSON.stringify(query_params),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <div className="genre-list-container">
        <ul className="genre-list">
          {genres.map((genre) => (
            <li
              className="genre"
              onClick={() => handleClick(genre)}
              key={genre}
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
