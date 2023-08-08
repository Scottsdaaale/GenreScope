import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import { fetchArtistsResultsData } from "../redux/artistsResultsDataSlice";
import { fetchArtistVideosData } from "../redux/youtubeDataSlice";

function TopResults() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackInfo, setCurrentTrackInfo] = useState(null);
  const { artists, playlists, tracks } = useSelector(
    (state) => state.genreResultsData
  );
  const dispatch = useDispatch();

  // Find the artist with the highest popularity
  const highestPopularityArtist =
    artists.length > 0
      ? artists.reduce((prevArtist, currentArtist) => {
          return prevArtist.popularity > currentArtist.popularity
            ? prevArtist
            : currentArtist;
        })
      : null;

  // Filter out the most popular artist from the list of artists for the row
  const artistsForRow = artists.filter(
    (artist) => artist.id !== highestPopularityArtist?.id
  );

  // Function to handle click on artist card
  const handleArtistClick = (artist) => {
    dispatch(fetchArtistsResultsData({ artistId: artist.id }));
    dispatch(fetchArtistVideosData({ artistName: artist.name }));
  };
  const openInSpotify = (e) => {
    e.stopPropagation();
    window.open(currentTrackInfo.spotify_url, "_blank");
  };
  // Ref to access the audio element
  const audioRef = useRef(null);

  // Function to play or pause audio
  const playPauseAudio = (previewUrl, track) => {
    if (!currentTrack) {
      // If no track is playing, play the clicked track
      const audio = new Audio(previewUrl);
      audio.volume = 0.2;
      audio.play();
      setCurrentTrack(audio);
      setCurrentTrackInfo(track);
    } else if (currentTrack.src === previewUrl) {
      // If the same track is clicked again, pause the track
      currentTrack.pause();
      setCurrentTrack(null);
      setCurrentTrackInfo(null);
    } else {
      // If a different track is clicked, stop the current track and play the clicked track
      currentTrack.pause();
      const newAudio = new Audio(previewUrl);
      newAudio.volume = 0.2;
      newAudio.play();
      setCurrentTrack(newAudio);
      setCurrentTrackInfo(track);
    }
  };

  return (
    <Container>
      <Row>
        {/* Top Artist */}
        <Col md={6}>
          {highestPopularityArtist && (
            <div className="top-artist-container">
              <h3 style={{ textAlign: "left", color: "white" }}>Top Artist</h3>
              <Link
                to={`/artists/${highestPopularityArtist.name}`}
                className="text-decoration-none"
                onClick={() => handleArtistClick(highestPopularityArtist)}
              >
                <div className="top-artist">
                  <div>
                    <img
                      src={highestPopularityArtist.image_url}
                      alt={highestPopularityArtist.name}
                      className="top-artist-image"
                    />
                  </div>
                  <div className="title-container">
                    <h4 className="top-artist-title">
                      {highestPopularityArtist.name}
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </Col>

        {/* Top Songs */}
        <Col md={6}>
  <div>
    <h3 style={{ textAlign: "left", color: "white" }}>Top Songs</h3>
    <ul className="list-group">
      {tracks.slice(0, 5).map((track) => (
        <li
          className="list-group-item top-track"  // Added class "top-track"
          key={track.id}
          onClick={() => playPauseAudio(track.preview_url, track)}
        >
          <div className="d-flex align-items-center">
            <img
              src={track.image}
              alt={track.name}
              className="top-song-image"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="ms-3">
              <h6 style={{ textAlign: "left", color: "white" }}>{track.name}</h6>
              <h6 style={{ textAlign: "left", color: "white" }}>
                {track.artists[0].name}
              </h6>
            </div>
          </div>
        </li>
      ))}
    </ul>
    {/* Hidden audio element */}
    <audio ref={audioRef} controls style={{ display: "none" }} />
  </div>
</Col>
      </Row>

      {/* Artists and Playlists sections */}
      <h3 style={{ textAlign: "left", color: "white", marginBottom: "20px" }}>
        Artists
      </h3>
      <Row className="card-grid">
        {artistsForRow.slice(0, 6).map((artist) => (
          <Col xs={6} sm={4} md={3} lg={2} key={artist.id}>
            <Link
              to={`/artists/${artist.name}`}
              className="text-decoration-none"
              onClick={() => handleArtistClick(artist)}
            >
              <Card className="cards" style={{ margin: "0rem" }}>
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={artist.image_url}
                    alt={artist.name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <Card.Body style={{ color: "white" }}>
                  <Card.Title className="text-truncate">
                    {artist.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <h3
        style={{
          textAlign: "left",
          color: "white",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        Playlists
      </h3>
      <Row className="card-grid">
        {playlists.slice(0, 6).map((playlist) => (
          <Col xs={6} sm={4} md={3} lg={2} key={playlist.id}>
            <a
              href={playlist.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card className="cards" style={{ margin: "0rem" }}>
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={playlist.image_url}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Title
                    className="text-truncate"
                    style={{ color: "white" }}
                  >
                    {playlist.name}
                  </Card.Title>
                  <Card.Text className="text-truncate">
                    {playlist.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>

      {/* Currently playing track info */}
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

export default TopResults;
