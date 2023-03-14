import "./App.css";
import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/genres/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        // do something with the data here
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(data)

  return <div className="App"></div>;
}

export default App;


//https://www.youtube.com/watch?v=_iOGtzRXwhI