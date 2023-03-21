import React, { useState, useEffect } from "react";

function GenreContent({ genre }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch(`/api/search/?genre=${genre}`)
      .then((response) => response.json())
      .then((data) => setArtists(data.artists))
      .catch((error) => console.log(error));
  }, [genre]);

  return (
    <div>
      <h2>{genre}</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <h3>{artist.name}</h3>
            <p>{artist.popularity}</p>
            <ul>
              {artist.top_tracks.map((track) => (
                <li key={track.id}>
                  <a href={track.preview_url} target="_blank" rel="noreferrer">
                    {track.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreContent;