import React from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";

function Tracks() {
  const { tracks } = useSelector((state) => state.genreResultsData);

  return (
    <Row>
      {tracks.map((track) => (
        <Col md={6} lg={4} key={track.id} className="mb-4">
          <Card>
            {track.image && (
              <Card.Img variant="top" src={track.image} alt={track.name} />
            )}
            <Card.Body>
              <Card.Title>{track.name}</Card.Title>
              <Card.Text>
                {track.artists.map((artist) => (
                  <span key={artist.id}>{artist.name}, </span>
                ))}
              </Card.Text>
              <Card.Text>Album: {track.album}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Tracks;

// import React from "react";

// function Tracks(props) {
//   const {tracks} = props.data.tracks;
//   console.log(tracks);
//   return (
//     <div>
//       {tracks.map((track) => (
//         <div key={track.id}>
//           <h3>{track.name}</h3>
//           {track.artists.map((artist) => (
//             <p key={artist.id}>Artist: {artist.name}</p>
//           ))}
//           <p>Album: {track.album}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Tracks;
