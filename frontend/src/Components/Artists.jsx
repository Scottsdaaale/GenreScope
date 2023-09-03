import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistsResultsData } from "../redux/artistsResultsDataSlice";
import { fetchArtistVideosData } from "../redux/youtubeDataSlice";
import { Card, Container, Col, Row } from "react-bootstrap";

function Artists() {
  const { artists } = useSelector((state) => state.genreResultsData);
  const dispatch = useDispatch();

  const { genre } = useParams();
  const genreFirstLetterUpcase = genre
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  function handleClick(artist) {
    dispatch(fetchArtistsResultsData({ artistId: artist.id }));
    dispatch(fetchArtistVideosData({ artistName: artist.name }));
  }

  if (!artists.length) {
    return <div>No artists found</div>;
  }

  return (
    <Container>
      <Row>
        <h1 style={{ color: "white", marginBottom: "50px" }}>
          {genreFirstLetterUpcase}
        </h1>
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
              <Card
                className="cards"
                style={{ margin: "1rem", alignContent: "center" }}
              >
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    src={artist.image_url}
                    alt={artist.name}
                    className="card-image"
                  />
                </div>
                <Card.Body style={{ color: "white" }}>
                  <Card.Title
                    className="text-truncate"
                    style={{ textAlign: "left" }}
                  >
                    {artist.name}
                  </Card.Title>
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
