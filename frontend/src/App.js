import "./App.css";
import Genres from "./Components/Genres";
import Results from "./Components/Results";
import { Routes, Route } from "react-router-dom";
import ArtistProfile from "./Components/ArtistProfile";

function App() {
  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={<Genres />} />
        <Route path="/genres/:genre" element={<Results />} />
        <Route path="/artists/:artist" element={<ArtistProfile />} />
      </Routes>
    </div>
  );
}

export default App;
