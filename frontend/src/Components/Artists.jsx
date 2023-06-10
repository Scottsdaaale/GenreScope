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
      <h1>Artists</h1>
      <Row>
        {artists.map((artist) => (
          <Col key={artist.id} xs={12} sm={6} md={4} lg={3}>
            <Link
              to={{
                pathname: `/artists/${artist.name}`,
                search: "?",
              }}
              onClick={() => handleClick(artist)}
              className="text-decoration-none"
            >
              <Card className="cards" style={{margin: "1rem", alignContent: "center"}}>
                  <Card.Img
                    variant="top"
                    // className="rounded-circle overflow-hidden"
                    src={artist.image_url}
                    alt={artist.name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                <Card.Body style={{ color: "white" }}>
                  <Card.Title style={{textAlign: "left"}}>{artist.name}</Card.Title>
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