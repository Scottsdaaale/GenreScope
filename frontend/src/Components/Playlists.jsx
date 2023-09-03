import React from "react";
import { useSelector } from "react-redux";
import { Card, Container, Row, Col } from "react-bootstrap";

function Playlists() {
  const { playlists } = useSelector((state) => state.genreResultsData);

  return (
    <Container>
      <Row>
        {playlists.map((playlist) => (
          <Col key={playlist.id} xs={12} sm={6} md={4} lg={3}>
            <a
              href={playlist.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card
                className="cards"
                style={{ margin: "1rem", alignContent: "center" }}
              >
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    src={playlist.image_url}
                    alt={playlist.name}
                    className="card-image"
                  />
                </div>
                <Card.Body style={{ color: "white" }}>
                  <Card.Title className="text-truncate">
                    {playlist.name}
                  </Card.Title>
                  {/* <Card.Text>Owner: {playlist.owner}</Card.Text> */}
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Playlists;
