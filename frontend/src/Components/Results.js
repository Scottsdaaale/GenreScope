import React from 'react'
import Artists from './Artists'
import Playlists from './Playlists'
import Tracks from './Tracks'
import { useLocation, useNavigate} from "react-router-dom";


function Results() {
  const location = useLocation();
  // const { artists, playlists, tracks } = location.state;
  console.log(location.state)

  return (
    <div>
      <Artists data={location.state} />
      <Playlists data={location.state} />
      <Tracks data={location.state} />
    </div>
  );
}

export default Results;