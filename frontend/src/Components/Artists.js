import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistsResultsData } from '../redux/artistsResultsDataSlice';
import {fetchArtistVideosData} from '../redux/youtubeDataSlice';


function Artists() {
  const {artists} = useSelector(state => state.genreResultsData);
  const dispatch = useDispatch();

  function handleClick(artist) {
    dispatch(fetchArtistsResultsData({ artistId: artist.id}));
    dispatch(fetchArtistVideosData({ artistName: artist.name}))
  }


  if (!artists.length) {
    return <div>No artists found</div>;
  }

  return (
    <div>
      <div>Artists:</div>
      {artists.map((artist) => (
        <div key={artist.id}>
          <img src={artist.image_url} alt={artist.name} />
          <Link
            to={{
              pathname: `/artists/${artist.name}`, search: '?'
            }}
            onClick={() => handleClick(artist)}
          >
            <h1>{artist.name}</h1>
          </Link>
          <p>Popularity: {artist.popularity}</p>
          <p>Genres: {artist.genres}</p>
        </div>
      ))}
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