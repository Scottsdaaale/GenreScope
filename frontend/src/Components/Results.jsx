import React, { useState } from "react";
import { Container, Button, Spinner, Dropdown, Nav } from "react-bootstrap";
import Artists from "./Artists";
import Videos from "./Videos";
import Playlists from "./Playlists";
import Tracks from "./Tracks";
import TopResults from "./TopResults";
import { fetchData } from "../redux/genreResultsDataSlice";
import { fetchGenreVideosData } from "../redux/youtubeDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Results() {
  const dispatch = useDispatch();
  const { genre } = useParams();
  const navigate = useNavigate();

  const genreFirstLetterUpcase = genre
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const isLoadingSpotifyGenreData = useSelector(
    (state) => state.genreResultsData.loading
  );
  const isLoadingGenreVideos = useSelector(
    (state) => state.youtubeData.loading
  );

  const [activeTab, setActiveTab] = useState("allTopResults"); // Set default tab to "Top Results"

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  React.useEffect(() => {
    // fetch data on component mount or when genre value changes
    console.log(genre);
    dispatch(fetchData(genre));
    dispatch(fetchGenreVideosData(genre));
  }, [dispatch, genre]);

  const handleAllTopResultsClick = () => {
    setActiveTab("allTopResults");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container style={{ paddingTop: "10px", paddingBottom: "10px" }}>
      <div onClick={handleBackClick} className="back-button-container">
        <FontAwesomeIcon icon={faArrowLeft} className="back-button-icon" />
      </div>
      <div className="text-left">
        <div style={{ paddingTop: "30px", paddingBottom: "40px" }}>
          {/* Mobile hamburger menu */}
          <Nav className="d-md-none justify-content-end mb-2">
      <Dropdown as={Nav.Item}>
        <Dropdown.Toggle
          as={Nav.Link}
          variant="link"
          id="mobile-tab-dropdown"
          style={{
            color: "white",
            textDecoration: "none",
            border: "none",
            boxShadow: "none",
            background: "transparent",
          }}
        >
          <style>
            {`
              /* Hide the dropdown caret */
              #mobile-tab-dropdown.dropdown-toggle::after {
                display: none !important;
              }

              /* Style the dropdown menu */
              .custom-dropdown-menu {
                background-color: #181818; /* Background color */
                color: white; /* Text color */
                border: none; /* Remove border */
                width: 100vw; /* Stretch the width across the screen */
              }

              .custom-dropdown-item {
                color: white; /* Text color for items */
              }

              /* Style the active item */
              .custom-dropdown-item.active {
                background-color: #2a2a2a; /* Background color for the selected item */
              }
            `}
          </style>
          <FontAwesomeIcon icon={faBars} /> {/* Hamburger icon */}
        </Dropdown.Toggle>
        <Dropdown.Menu className="custom-dropdown-menu">
          <Dropdown.Item
            className="custom-dropdown-item"
            active={activeTab === "allTopResults"}
            onClick={handleAllTopResultsClick}
          >
            Top Results
          </Dropdown.Item>
          <Dropdown.Item
            className="custom-dropdown-item"
            active={activeTab === "artists"}
            onClick={() => handleTabClick("artists")}
          >
            Artists
          </Dropdown.Item>
          <Dropdown.Item
            className="custom-dropdown-item"
            active={activeTab === "videos"}
            onClick={() => handleTabClick("videos")}
          >
            Videos
          </Dropdown.Item>
          <Dropdown.Item
            className="custom-dropdown-item"
            active={activeTab === "playlists"}
            onClick={() => handleTabClick("playlists")}
          >
            Playlists
          </Dropdown.Item>
          <Dropdown.Item
            className="custom-dropdown-item"
            active={activeTab === "tracks"}
            onClick={() => handleTabClick("tracks")}
          >
            Tracks
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>

          {/* Desktop and tablet buttons */}
          <Button
            variant={
              activeTab === "allTopResults" ? "primary" : "outline-primary"
            }
            onClick={handleAllTopResultsClick}
            style={{
              color: "white",
              borderColor: "#121212",
              backgroundColor:
                activeTab === "allTopResults" ? "#2a2a2a" : "#121212",
              marginRight: "10px",
              borderRadius: "20px",
            }}
            className="d-none d-md-inline-block"
          >
            Top Results
          </Button>
          <Button
            variant={activeTab === "artists" ? "primary" : "outline-primary"}
            onClick={() => handleTabClick("artists")}
            style={{
              color: "white",
              borderColor: "#121212",
              backgroundColor: activeTab === "artists" ? "#2a2a2a" : "#121212",
              marginRight: "10px",
              borderRadius: "20px",
            }}
            className="d-none d-md-inline-block"
          >
            Artists
          </Button>
          <Button
            variant={activeTab === "videos" ? "primary" : "outline-primary"}
            onClick={() => handleTabClick("videos")}
            style={{
              color: "white",
              borderColor: "#121212",
              backgroundColor: activeTab === "videos" ? "#2a2a2a" : "#121212",
              marginRight: "10px",
              borderRadius: "20px",
            }}
            className="d-none d-md-inline-block"
          >
            Videos
          </Button>
          <Button
            variant={activeTab === "playlists" ? "primary" : "outline-primary"}
            onClick={() => handleTabClick("playlists")}
            style={{
              color: "white",
              borderColor: "#121212",
              backgroundColor:
                activeTab === "playlists" ? "#2a2a2a" : "#121212",
              marginRight: "10px",
              borderRadius: "20px",
            }}
            className="d-none d-md-inline-block"
          >
            Playlists
          </Button>
          <Button
            variant={activeTab === "tracks" ? "primary" : "outline-primary"}
            onClick={() => handleTabClick("tracks")}
            style={{
              color: "white",
              borderColor: "#121212",
              backgroundColor: activeTab === "tracks" ? "#2a2a2a" : "#121212",
              marginRight: "10px",
              borderRadius: "20px",
            }}
            className="d-none d-md-inline-block"
          >
            Tracks
          </Button>
        </div>

        {isLoadingSpotifyGenreData || isLoadingGenreVideos ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <Spinner animation="border" role="status" variant="light"></Spinner>
          </div>
        ) : (
          <div>
            <h1 style={{ color: "white", marginBottom: "50px" }}>
              {genreFirstLetterUpcase}
            </h1>
            <>
              {activeTab === "allTopResults" && <TopResults />}
              {activeTab === "artists" && <Artists />}
              {activeTab === "videos" && <Videos />}
              {activeTab === "playlists" && <Playlists />}
              {activeTab === "tracks" && <Tracks />}
            </>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Results;
//BEFORE ALL TAB
// import React, { useState } from "react";
// import { Button, ButtonGroup, Spinner } from "react-bootstrap";
// import Artists from "./Artists";
// import VideoPlayer from "./VideoPlayer";
// import Playlists from "./Playlists";
// import Tracks from "./Tracks";
// import { fetchData } from "../redux/genreResultsDataSlice";
// import { fetchGenreVideosData } from "../redux/youtubeDataSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// function Results() {
//   const dispatch = useDispatch();
//   const { genre } = useParams();

//   const isLoadingSpotifyGenreData = useSelector(
//     (state) => state.genreResultsData.loading
//   );
//   const isLoadingGenreVideos = useSelector(
//     (state) => state.youtubeData.loading
//   );

//   const [activeTab, setActiveTab] = useState("artists");

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   React.useEffect(() => {
//     // fetch data on component mount or when genre value changes
//     console.log(genre);
//     dispatch(fetchData(genre));
//     dispatch(fetchGenreVideosData(genre));
//   }, [dispatch, genre]);

//   return (
//     <div className="text-center">
//       <ButtonGroup style={{ margin: "1rem" }}>
//         <Button
//           variant={activeTab === "artists" ? "primary" : "outline-primary"}
//           onClick={() => handleTabClick("artists")}
//           style={{ backgroundColor: "#17202A", borderColor: "#17202A" }}
//         >
//           Artists
//         </Button>
//         <Button
//           variant={activeTab === "videos" ? "primary" : "outline-primary"}
//           onClick={() => handleTabClick("videos")}
//           style={{ backgroundColor: "#17202A", borderColor: "#17202A" }}
//         >
//           Videos
//         </Button>
//         <Button
//           variant={activeTab === "playlists" ? "primary" : "outline-primary"}
//           onClick={() => handleTabClick("playlists")}
//           style={{ backgroundColor: "#17202A", borderColor: "#17202A" }}
//         >
//           Playlists
//         </Button>
//         <Button
//           variant={activeTab === "tracks" ? "primary" : "outline-primary"}
//           onClick={() => handleTabClick("tracks")}
//           style={{ backgroundColor: "#17202A", borderColor: "#17202A" }}
//         >
//           Tracks
//         </Button>
//       </ButtonGroup>

//       {isLoadingSpotifyGenreData || isLoadingGenreVideos ? (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{ minHeight: "70vh" }}
//         >
//           <Spinner animation="border" role="status" variant="light">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       ) : (
//         <>
//           {activeTab === "artists" && <Artists />}
//           {activeTab === "videos" && <VideoPlayer />}
//           {activeTab === "playlists" && <Playlists />}
//           {activeTab === "tracks" && <Tracks />}
//         </>
//       )}
//     </div>
//   );
// }

// export default Results;
