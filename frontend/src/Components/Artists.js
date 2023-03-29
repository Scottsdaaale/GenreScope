import React from "react";
import { useLocation } from "react-router-dom";

function Artists() {
  const location = useLocation()
  const artist = location.state.data.artists[0]
  console.log(artist)
  const topTrackName = artist.top_tracks[0].name
  const topTrack = artist.top_tracks[0].preview_url
  console.log(location.state.data)

  return (
    <div>
      <h1>{artist.name}</h1>
      <h2>{topTrackName}</h2>
      <audio controls>
        <source src={topTrack} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>

  );
}

export default Artists;