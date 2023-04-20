import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function Artists() {
  // const navigate = useNavigate();
  // const artists = useSelector((state) => state.spotifyData);
  // console.log(artists)
  const allData = useSelector((state) => state.spotifyData);
console.log(allData.artists);
console.log(allData.playlists);
console.log(allData.tracks);

  // function handleClick(artist) {
  //   fetch("/api/top_tracks/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": "",
  //     },
  //     body: JSON.stringify({ artist_id: artist.id }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       navigate(`/${artist.name}`, { state: { data } });
  //     });
  // }


  return (
    <div>
      {/* <div>Artists:</div>
      {artists.map((artist) => (
        <div key={artist.id}>
          <img src={artist.image_url} alt={artist.name} />
          <h1 onClick={() => handleClick(artist)}>{artist.name}</h1>
          <p>Popularity: {artist.popularity}</p>
          <p>Genres: {artist.genres}</p>
        </div>
      ))} */}
    </div>
  );
}
export default Artists;


// import Videos from "./Videos";

// function Artists(props) {
//   const artists = props.data.artists;

//   const navigate = useNavigate();
//   console.log(artists);

//   // const [topTracks, setTopTracks] = useState({});

//   function handleClick(artist) {
//     console.log(artist.id)
//     fetch("/api/top_tracks/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": "",
//       },
//       body: JSON.stringify({ artist_id: artist.id }),
//     })
//       .then((response) => response.json())
//       .then((data) =>{
//         console.log(data);
//         // setTopTracks({...topTracks, [artist.id]: data.tracks})
//         navigate(`/${artist.name}`, { state: { data } });
//         });

//   }
//   // console.log(topTracks)

//   return (
//     <div>
//       <div>Artists:</div>
//       {artists.map((artist) => (
//         <div key={artist.id}>
//           <img src= {artist.image_url} alt={artist.name}/>
//           <h1 onClick={() => handleClick(artist)}>{artist.name}</h1>
//           <p>Popularity: {artist.popularity}</p>
//           <p>Genres:{artist.genres}</p>
//         </div>
//       ))}
//       {/* <Videos/> */}
//     </div>
//   );
// }