import "./App.css";
import Genres from "./Components/Genres"
import TopTracks from "./Components/TopTracks"
import Results from "./Components/Results"
import { Routes, Route} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Genres />} />
      <Route path='/genres/:genre' element={<Results />} />
      <Route path='/:artists/:artist' element={<TopTracks />} />
    </Routes>
  );
}

export default App;
