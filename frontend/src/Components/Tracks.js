import React from "react";
import { useSelector } from "react-redux";

function Tracks() {
  const {tracks} = useSelector(state => state.genreResultsData);

  return (
    <div>
      {tracks.map((track) => (
        <div key={track.id}>
          <h3>{track.name}</h3>
          {track.artists.map((artist) => (
            <p key={artist.id}>Artist: {artist.name}</p>
          ))}
          <p>Album: {track.album}</p>
        </div>
      ))}
    </div>
  );
}

export default Tracks;












// import React from "react";

// function Tracks(props) {
//   const {tracks} = props.data.tracks;
//   console.log(tracks);
//   return (
//     <div>
//       {tracks.map((track) => (
//         <div key={track.id}>
//           <h3>{track.name}</h3>
//           {track.artists.map((artist) => (
//             <p key={artist.id}>Artist: {artist.name}</p>
//           ))}
//           <p>Album: {track.album}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Tracks;
