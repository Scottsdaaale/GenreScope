import React from "react";
import { useSelector } from "react-redux";
import { Card, Col, Container, Row } from "react-bootstrap";
import Tracks from "./Tracks";

function TopResults() {
  const { artists, playlists, tracks } = useSelector(
    (state) => state.genreResultsData
  );

  // Find the artist with the highest popularity
  const highestPopularityArtist =
    artists.length > 0
      ? artists.reduce((prevArtist, currentArtist) => {
          return prevArtist.popularity > currentArtist.popularity
            ? prevArtist
            : currentArtist;
        })
      : null;

  return (
    <Container>
      <p>
        Most Popular Artist:{" "}
        {highestPopularityArtist ? highestPopularityArtist.name : ""}
      </p>

      {/* <h3>Top Songs</h3>
      {tracks.map((track) => (
        <p key={track.id}>{track.name}</p>
      ))} */}
      <Tracks />
      <h3 className="text-left">Artists</h3>
      <Row className="card-grid">
        {artists.slice(1, 7).map((artist) => (
          <Col xs={6} sm={4} md={3} lg={2} key={artist.id}>
            <Card className="cards" style={{margin: "0rem"}}>
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
                <Card.Title className="text-truncate">{artist.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3>Playlists</h3>
      <Row className="card-grid">
        {playlists.slice(0, 6).map((playlist) => (
          <Col xs={6} sm={4} md={3} lg={2} key={playlist.id}>
            <Card className="cards" style={{margin: "0rem"}}>
              <Card.Img variant="top" src={playlist.image_url} />
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
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TopResults;
