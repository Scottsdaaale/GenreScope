import React from 'react'
import Artists from './Artists'
import Playlists from './Playlists'
import Tracks from './Tracks'
import { useLocation } from "react-router-dom";


function Results() {
  const location = useLocation();
  const { artists, playlists, tracks } = location.state;
  console.log(artists)

  return (
    <div>
      <Artists artists={artists} />
      <Playlists playlists={playlists} />
      <Tracks tracks={tracks} />
    </div>
  );
}
export default Results;