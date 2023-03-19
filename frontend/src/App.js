import "./App.css";
import Genres from "./Components/Genres";



function App() {


  fetch('/api/csrf/')
  .then(response => response.json())
  .then(data => {
    const token = (data.csrfToken)
    // add csrfToken to your POST request headers
  })
  .catch(error => console.error(error));
  
  return (
    <div>
      <Genres/>
    </div>
  );
}

export default App;

//https://www.youtube.com/watch?v=_iOGtzRXwhI
