import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { selectGenreVideos, selectArtistVideos } from '../redux/youtubeDataSlice';
import YouTube from "react-youtube";

const VideoPlayer = () => {
  const location = useLocation();
  const genreVideos = useSelector((state) => state.youtubeData.genreVideos);
  const artistVideos = useSelector((state) => state.youtubeData.artistVideos);
  const isGenrePage = location.pathname.includes("/genres");
  console.log("genre video", genreVideos);
  console.log(artistVideos);
  const videos = isGenrePage ? genreVideos : artistVideos;

  console.log(videos);

  const opts = {
    height: "315",
    width: "560",
    playerVars: {
      origin: null,
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      showinfo: 0,
      fs: 1,
      rel: 0,
    },
  };

  return (
    <div>
      <div>Videos:</div>
      {videos.map((video) => (
        <YouTube
          key={video.id}
          videoId={video.id}
          opts={opts}
          onReady={(event) => event.target.pauseVideo()}
        />
      ))}
    </div>
  );
};

export default VideoPlayer;
