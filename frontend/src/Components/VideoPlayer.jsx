import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import YouTube from "react-youtube";

const VideoPlayer = () => {
  const location = useLocation();
  const genreVideos = useSelector((state) => state.youtubeData.genreVideos);
  const artistVideos = useSelector((state) => state.youtubeData.artistVideos);
  const isGenrePage = location.pathname.includes("/genres");
  const videos = isGenrePage ? genreVideos.data : artistVideos.data; // Updated to access the "data" property

  const { genre } = useParams();
  const genreFirstLetterUpcase = genre
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

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

  const centerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  };

  return (
    <Container>
      <h1 style={{ color: "white", marginBottom: "50px" }}>
        {genreFirstLetterUpcase}
      </h1>
      <div className="video-container" style={centerStyle}>
        {Array.isArray(videos) && videos.length === 0 ? (
          // Display a message when there are no videos
          <p>Youtube API call quota exceeded :(</p>
        ) : (
          videos.map((video) => (
            <YouTube
              key={video.id}
              videoId={video.id}
              opts={opts}
              onReady={(event) => event.target.pauseVideo()}
            />
          ))
        )}
      </div>
    </Container>
  );
};

export default VideoPlayer;
