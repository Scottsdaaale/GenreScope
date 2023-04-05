import "./App.css";
import Genres from "./Components/Genres"
import Artists from "./Components/Artists"
import TopTracks from "./Components/TopTracks"
import Results from "./Components/Results"
import { Routes, Route} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Genres />} />
      <Route path='/:genre' element={<Results />} />
      {/* <Route path='/genres/:genre' element={<Artists />} /> */}
      <Route path='/:artist' element={<TopTracks />} />
    </Routes>
  );
}

export default App;

//https://www.youtube.com/watch?v=_iOGtzRXwhI
