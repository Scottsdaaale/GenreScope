import "./App.css";
import Genres from "./Components/Genres"
import Artists from "./Components/Artists"
import { Routes, Route} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path='/' element= {<Genres/>}/>
      <Route path= '/genres/:genre' element= {<Artists/>}/>
    </Routes>
  );
}

export default App;

//https://www.youtube.com/watch?v=_iOGtzRXwhI
