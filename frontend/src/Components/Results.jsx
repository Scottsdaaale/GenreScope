import React, { useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import Artists from "./Artists";
import VideoPlayer from "./VideoPlayer";
import Playlists from "./Playlists";
import Tracks from "./Tracks";
import TopResults from "./TopResults";
import { fetchData } from "../redux/genreResultsDataSlice";
import { fetchGenreVideosData } from "../redux/youtubeDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Results() {
  const dispatch = useDispatch();
  const { genre } = useParams();

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

  return (
    <div className="text-center">
      <ButtonGroup style={{ margin: "1rem" }}>
        <Button
          variant={
            activeTab === "allTopResults" ? "primary" : "outline-primary"
          }
          onClick={handleAllTopResultsClick}
          style={{ backgroundColor: "#17202A", borderColor: "#17202A" }}
        >
          Top Results
        </Button>
        <Button
          variant={activeTab === "artists" ? "primary" : "outline-primary"}
          onClick={() => handleTabClick("artists")}
          style={{ backgroundColor: "#17202A", borderColor: "#17202A" }}
        >
          Artists
        </Button>
        <Button
          variant={activeTab === "videos" ? "primary" : "outline-primary"}
          onClick={() => handleTabClick("videos")}
          style={{ backgroundColor: "#17202A", borderColor: "#17202A" }}
        >
          Videos
        </Button>
        <Button
          variant={activeTab === "playlists" ? "primary" : "outline-primary"}
          onClick={() => handleTabClick("playlists")}
          style={{ backgroundColor: "#17202A", borderColor: "#17202A" }}
        >
          Playlists
        </Button>
        <Button
          variant={activeTab === "tracks" ? "primary" : "outline-primary"}
          onClick={() => handleTabClick("tracks")}
          style={{ backgroundColor: "#17202A", borderColor: "#17202A" }}
        >
          Tracks
        </Button>
      </ButtonGroup>

      {isLoadingSpotifyGenreData || isLoadingGenreVideos ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {activeTab === "allTopResults" && <TopResults />}
          {activeTab === "artists" && <Artists />}
          {activeTab === "videos" && <VideoPlayer />}
          {activeTab === "playlists" && <Playlists />}
          {activeTab === "tracks" && <Tracks />}
        </>
      )}
    </div>
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
