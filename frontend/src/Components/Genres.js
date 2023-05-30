import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Form } from "react-bootstrap";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/genres/")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
        setFilteredGenres(data.genres);
        setIsLoading(false); // Mark loading as complete
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

  if (isLoading) {
    return <div></div>; // Render a loading indicator or message
  }

  const getColorStyle = (index) => {
    // Define an array of colors
    const colors = [
      "#17202A",
      "#1C2833",
      "#212F3D",
      "#273746",
      "#2C3E50",
      "#566573",
      "#808B96",
      "#ABB2B9",
      "#D5D8DC",
      "#EAECEE",
    ];

    // Get the color for the current index
    const color = colors[index % colors.length];

    return {
      backgroundColor: color,
      width: "80%",
      height: "60%",
      margin: "auto",
      borderRadius: "70%",
      marginTop: "1rem",
      boxShadow: "0 0 20px rgba(, 0, 0, 0)",
    };
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
        {filteredGenres.map((genre, index) => (
          <Link
            to={`/genres/${genre}`}
            key={genre}
            style={{ textDecoration: "none", margin: "2rem" }}
          >
            <Card
              border="none"
              className="genre-cards"
              style={{
                height: "20rem",
                width: "15rem",
                margin: "0.5rem",
                borderRadius: ".5rem",
                // backgroundColor: "#181818",
                // color: "white",
                textDecoration: "none",
                // transition: "background-color 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={getColorStyle(index)}></div>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "white",
                    textAlign: "left",
                    marginTop: "3rem",
                  }}
                >
                  {genre}
                </Card.Title>
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
