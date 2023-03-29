import React from "react";
import { useLocation } from "react-router-dom";

function Artists() {
  const location = useLocation();
  const artists = location.state.data.artists;

  // create an array of artist popularity values
  // const popularityList = artists.map((artist) => artist.popularity);

  // // sort the popularity list in descending order
  // popularityList.sort((a, b) => b - a);

  return (
    <div>
      {artists.map((artist) => (
        <div key={artist.id}>
          <h1>{artist.name}</h1>
          <p>Popularity: {artist.popularity}</p>
          {artist.top_tracks.map((track) => (
            <div key={track.id}>
              <h2>{track.name}</h2>
              <audio controls>
                <source src={track.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Artists;