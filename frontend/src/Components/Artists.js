import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Artists() {
  const location = useLocation();
  const artists = location.state.data.artists;
  console.log(artists);

  const [topTracks, setTopTracks] = useState({});

  function handleClick(artist) {
    console.log(artist.id)
    fetch("/api/tracks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": "",
      },
      body: JSON.stringify({ artist_id: artist.id }),
    })
      .then((response) => response.json())
      .then((data) =>{ console.log(data); setTopTracks({...topTracks, [artist.id]: data.tracks})});
  }
  console.log(topTracks)

  return (
    <div>
      {artists.map((artist) => (
        <div key={artist.id}>
          <img src= {artist.image_url} alt={artist.name}/>
          <h1 onClick={() => handleClick(artist)}>{artist.name}</h1>
          <p>Popularity: {artist.popularity}</p>
          {topTracks[artist.id] && (
            <ul>
              {topTracks[artist.id].map((track) => (
                <li key={track.id}>
                  {track.name}
                  {track.preview_url && (
                    <audio controls>
                      <source src={track.preview_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {!track.preview_url && (
                    <p>No preview available.</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Artists;