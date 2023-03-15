import React, { useState, useEffect } from "react";

function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/genres/")
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.log(error));
  }, []);

  function handleClick() {
    return alert("it worked");
  }

  return (
    <div>
      <div className="genre-list-container">
        <ul className="genre-list">
          {genres.map((genre) => (
            <li className="genre" onClick={handleClick} key={genre}>
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Genres;
