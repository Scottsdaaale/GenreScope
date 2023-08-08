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
      "#521637",
      "#6C1C53",
      "#84236C",
      "#9E2B84",
      "#B9369D",
      "#D43DB6",
      "#E357CA",
      "#EB73D4",
      "#F48FDF",
      "#FFAAD9",
      "#422421",
      "#5C342D",
      "#763D38",
      "#904741",
      "#AA534B",
      "#C56256",
      "#DE715F",
      "#F38168",
      "#FF926F",
      "#FFA379",
      "#293C1C",
      "#3D5125",
      "#51702E",
      "#658C37",
      "#7AA846",
      "#8FC255",
      "#A5D165",
      "#BBED76",
      "#D2FF87",
      "#E9FF9A",
      "#263D42",
      "#2D4F56",
      "#346B6F",
      "#3A878C",
      "#41A39F",
      "#48BFB3",
      "#4FDAC8",
      "#56F5DD",
      "#5DF0E2",
      "#6E433B",
      "#85594F",
      "#9E7265",
      "#B78B7A",
      "#D0A38E",
      "#E9BCA2",
      "#FFD5B6",
      "#FFEDC9",
      "#FFC576",
      "#FFB17F",
      "#FF9F89",
      "#FF8E93",
      "#FF7D9D",
      "#FF6CA8",
      "#FF5BB2",
      "#FF4ABD",
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
          style={{
            background: "#181818",
            color: "white",
            border: "none",
            width: "20rem",
            height: "3rem",
            margin: "auto",
          }}
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
              className="cards"
              style={{
                height: "20rem",
                width: "15rem",
                margin: "0.5rem",
                borderRadius: ".5rem",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={getColorStyle(index)}></div>
              <Card.Body>
                <Card.Title className="text-truncate"
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
