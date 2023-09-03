import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const centerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  color: "white",
};

const VideoPlayer = () => {
  const location = useLocation();
  const genreVideos = useSelector((state) => state.youtubeData.genreVideos);
  const artistVideos = useSelector((state) => state.youtubeData.artistVideos);
  const isGenrePage = location.pathname.includes("/genres");
  const videos = isGenrePage ? genreVideos.data : artistVideos.data; // Check URL for "/genres", if true use genreVideos, if false use artistVideos

  return (
    <div className="aks-container">
      {/* Surrounding div with center styles */}
      <div style={centerStyle}>
        {/* Conditional rendering based on video availability */}
        {Array.isArray(videos) && videos.length === 0 ? (
          // Display a message when there are no videos
          <p>Youtube API call quota exceeded :(</p>
        ) : (
          // Render the video grid when videos are available
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridGap: '20px' }}>
            {videos.map((video, index) => (
              <div key={index} style={{ padding: '15px' }}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                  <iframe
                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

