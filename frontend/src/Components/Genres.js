import React, { useState, useEffect } from "react";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [clickedGenre, setClickedGenre] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/genres/")
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.log(error));
  }, []);

  function handleClick(genre) {
    setClickedGenre(genre);
  }

  return (
    <div>
      <div className="genre-list-container">
      {/* <p>Clicked genre: {clickedGenre}</p> */}
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
