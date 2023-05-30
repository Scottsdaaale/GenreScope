import React from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";

function TopTracks() {
  const { tracks } = useSelector((state) => state.artistsResultsData);
  const isLoadingTopTracks = useSelector(
    (state) => state.artistsResultsData.loading
  );
  const isLoadingVideos = useSelector((state) => state.youtubeData.loading);

  console.log(tracks);

  return (
    <div>
      {(isLoadingTopTracks || isLoadingVideos) && <div>Loading...</div>}
      {!isLoadingTopTracks && !isLoadingVideos && (
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
          <VideoPlayer />
        </>
      )}
    </div>
  );
}

export default TopTracks;
