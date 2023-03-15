import React, { useState, useEffect } from "react";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [clickedGenre, setClickedGenre] = useState("");
  const [type, setType] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/api/genres/")
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.log(error));
  }, []);

  function handleClick(genre) {
    setClickedGenre(genre);
    console.log(genre)
    const query_params = {
      q: genre,
      type: "artist",
      market: "US",
      limit: 50,
      include_external: "audio",
    };

    fetch("http://localhost:8000/api/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query_params),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
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