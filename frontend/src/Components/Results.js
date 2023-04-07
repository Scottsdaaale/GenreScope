import React from 'react'
import Artists from './Artists'
import Playlists from './Playlists'
import Tracks from './Tracks'
import { useLocation, useNavigate} from "react-router-dom";


function Results() {
  const location = useLocation();
  // console.log(location.state.artists)
  const { artists, playlists, tracks } = location.state
  
  // Render the Artists, Playlists, and Tracks components using the data
  return (
    <div>
      <Artists data={artists} />
      <Playlists data={playlists} />
      <Tracks data={tracks} />
    </div>
  );
}

export default Results;