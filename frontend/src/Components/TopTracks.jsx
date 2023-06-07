import React from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";

function TopTracks() {
  const { tracks, loading: isLoadingTopTracks } = useSelector(
    (state) => state.artistsResultsData
  );
  const { loading: isLoadingVideos } = useSelector(
    (state) => state.youtubeData
  );

  console.log(tracks);

  if (isLoadingTopTracks || isLoadingVideos) {
    return <div>Loading...</div>;
  }

  if (!tracks.length) {
    return <p>This artist has no available track previews.</p>;
  }

  return (
    <div>
      {tracks.map((track) => (
        <ul key={track.id}>
          <li>
            {track.name}
            {track.preview_url && (
              <audio controls style={{  }}>
                <source src={track.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </li>
        </ul>
      ))}
      {/* <VideoPlayer /> */}
    </div>
  );
}

export default TopTracks;