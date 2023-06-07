import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistsResultsData } from "../redux/artistsResultsDataSlice";
import { fetchArtistVideosData } from "../redux/youtubeDataSlice";
import { Card, Container, Col, Row } from "react-bootstrap";

function Artists() {
  const { artists } = useSelector((state) => state.genreResultsData);
  const dispatch = useDispatch();

  function handleClick(artist) {
    dispatch(fetchArtistsResultsData({ artistId: artist.id }));
    dispatch(fetchArtistVideosData({ artistName: artist.name }));
  }

  if (!artists.length) {
    return <div>No artists found</div>;
  }

  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} xxl={4} className="g-4">
        {artists.map((artist) => (
          <Col key={artist.id}>
            <Link
              to={{
                pathname: `/artists/${artist.name}`,
                search: "?",
              }}
              onClick={() => handleClick(artist)}
              className="text-decoration-none"
            >
              <Card className="cards" style={{ width: "100%", height: "100%" }}>
                <div style={{ height: "10rem", overflow: "hidden" }}>
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
                  <Card.Title>{artist.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Artists;