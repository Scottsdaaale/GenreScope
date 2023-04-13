import React from "react";
import { useLocation } from "react-router-dom";

function TopTracks() {
  const location = useLocation();
  const tracks = location.state;
  console.log(tracks);

  return (
    <div>
      {/* {tracks.map((track) => (
        <ul key={track.id}>
          <li>
            {track.name}
            {track.preview_url ? (
              <audio controls>
                <source src={track.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>No preview available.</p>
            )}
          </li>
        </ul>
      ))} */}
    </div>
  );
}

export default TopTracks;
