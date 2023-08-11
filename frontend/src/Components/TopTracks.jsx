import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Container, Row } from "react-bootstrap";

function TopTracks() {
  const { tracks, loading: isLoadingTopTracks } = useSelector(
    (state) => state.artistsResultsData
  );
  const { loading: isLoadingVideos } = useSelector(
    (state) => state.youtubeData
  );
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackInfo, setCurrentTrackInfo] = useState(null);

  const playNewPreview = (previewUrl, track) => {
    const audio = new Audio(previewUrl);
    audio.volume = 0.2;
    audio.play();
    setCurrentTrack(audio);
    setCurrentTrackInfo(track);
  };

  const playPreview = (previewUrl, track) => {
    if (currentTrack) {
      if (currentTrackInfo && currentTrackInfo.id === track.id) {
        currentTrack.pause();
        setCurrentTrack(null);
        setCurrentTrackInfo(null);
      } else {
        currentTrack.pause();
        currentTrack.currentTime = 0;
        playNewPreview(previewUrl, track);
      }
    } else {
      playNewPreview(previewUrl, track);
    }
  };

  const openInSpotify = (e) => {
    e.stopPropagation();
    window.open(currentTrackInfo.spotify_url, "_blank");
  };

  useEffect(() => {
    if (currentTrack && currentTrackInfo) {
      const endedListener = () => {
        setCurrentTrack(null);
        setCurrentTrackInfo(null);
      };

      currentTrack.addEventListener("ended", endedListener);

      return () => {
        currentTrack.removeEventListener("ended", endedListener);
        currentTrack.pause();
      };
    }
  }, [currentTrack, currentTrackInfo]);

  if (isLoadingTopTracks || isLoadingVideos) {
    return <div>Loading...</div>;
  }

  if (!tracks.length) {
    return <p>This artist has no available track previews.</p>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 style={{ color: "white", paddingTop: "40px", paddingBottom: "40px" }}>
            {tracks[0].artists[0].name}
          </h1>
        </Col>
      </Row>
      <Row>
        {tracks.map((track) => (
          <Col key={track.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className={`cards ${
                currentTrackInfo && currentTrackInfo.id === track.id
                  ? "playing"
                  : ""
              }`}
              style={{ margin: "1rem" }}
              onClick={() => playPreview(track.preview_url, track)}
            >
              {track.image && (
                <Card.Img variant="top" src={track.image} alt={track.name} />
              )}
              <Card.Body style={{ color: "white" }}>
                <Card.Title className="text-truncate">{track.name}</Card.Title>
                <Card.Text className="text-truncate">
                  {track.artists.map((artist) => (
                    <span key={artist.id}>{artist.name}</span>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {currentTrackInfo && (
        <div
          className="now-playing"
          onClick={openInSpotify}
          style={{ cursor: "pointer" }}
        >
          <img src={currentTrackInfo.image} alt={currentTrackInfo.name} />
          <div>
            <span style={{ color: "white" }}>{currentTrackInfo.name}</span>
            <br />
            <span style={{ color: "white" }}>
              {currentTrackInfo.artists.map((artist) => artist.name).join(", ")}
            </span>
          </div>
        </div>
      )}
    </Container>
  );
}

export default TopTracks;