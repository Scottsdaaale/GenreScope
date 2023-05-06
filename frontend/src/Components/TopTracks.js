import React from "react";
import { useDispatch, useSelector } from "react-redux";

function TopTracks() {
  const { tracks } = useSelector((state) => state.topTracksData);
  const isLoading = useSelector((state) => state.topTracksData.loading);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {tracks.map((track) => (
            <ul key={track.id}>
              <li>
                {track.name}
                {track.preview_url && (
                  <audio controls>
                    <source src={track.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </li>
            </ul>
          ))}
          {!tracks.length && (
            <p>This artist has no available track previews.</p>
          )}
        </>
      )}
    </div>
  );
}

export default TopTracks