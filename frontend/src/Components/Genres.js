import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Form } from "react-bootstrap";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGenres, setFilteredGenres] = useState([]);

  useEffect(() => {
    fetch("/api/genres/")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
        setFilteredGenres(data.genres);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Filter genres based on search query
    const filtered = genres.filter((genre) =>
      genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGenres(filtered);
  }, [searchQuery, genres]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container>
      <Form.Group controlId="searchForm">
        <Form.Control
          type="text"
          placeholder="Search genres..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <div className="d-flex flex-wrap justify-content-center">
        {filteredGenres.map((genre) => (
          <Link
            to={`/genres/${genre}`}
            key={genre}
            style={{ textDecoration: "none" }}
          >
            <Card
              border="none"
              style={{
                height: "20rem",
                width: "15rem",
                margin: "0.5rem",
                backgroundColor: "#181818",
                color: "white",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "100%",
                  overflow: "hidden",
                }}
              >
                <Card.Img
                  variant="top"
                  src="metallica2.png"
                  alt={genre}
                  className="rounded-circle"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "85%", // Adjust the width to make the circle smaller
                    height: "85%", // Set the height to the same value as the width
                    objectFit: "cover",
                  }}
                />
                <div
                style={{
                  width: "70%",
                  height: "70%",
                  borderRadius: "0%",
                  backgroundColor: "red", // Replace with desired color
                }}
              ></div>
              </div>
              <Card.Body>
                <Card.Title style={{ color: "white" }}>{genre}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Genres;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import { csrftoken } from '../csrf';

// function Genres() {
//   const [genres, setGenres] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("/api/genres/")
//       .then((response) => response.json())
//       .then((data) => setGenres(data.genres))
//       .catch((error) => console.log(error));
//   }, []);

//   function handleClick(genre) {
//     const query_params = {
//       genre: genre
//     };

//     Promise.all([
//       fetch("/api/artists/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": "",
//         },
//         body: JSON.stringify(query_params),
//       }),
//       fetch("/api/playlists/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": "",
//         },
//         body: JSON.stringify(query_params),
//       }),
//       fetch("/api/tracks/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": "",
//         },
//         body: JSON.stringify(query_params),
//       })
//     ])
//       .then((responses) => Promise.all(responses.map((response) => response.json())))
//       .then(([artists, playlists, tracks]) => {
//         navigate(`/${genre}`, { state: { artists: artists, playlists: playlists, tracks: tracks } });
//       })
//       .catch((error) => console.log(error));
//   }

//   return (
//     <div>
//       <div className="genre-list-container">
//         <ul className="genre-list">
//           {genres.map((genre) => (
//             <li
//               className="genre"
//               key={genre}
//               onClick={() => handleClick(genre)}
//             >
//               {genre}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Genres;
