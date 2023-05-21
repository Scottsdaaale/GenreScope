import React from "react";
import { useSelector } from "react-redux";

function Playlists() {
  const {playlists} = useSelector(state => state.genreResultsData);
  console.log(playlists)
  return (
    <div>
      Playlists:
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h3>{playlist.name}</h3>
          <img src={playlist.image_url} alt={playlist.name} />
          <p>Owner: {playlist.owner}</p>
        </div>
      ))}
    </div>
  );
}

export default Playlists;


// import React from "react";

// function Playlists(props) {
//   const {playlists} = props.data.playlists;
//   console.log(playlists);

//   return (
//     <div>
//       Playlists:
//       {playlists.map((playlist) => (
//         <div key={playlist.id}>
//           <h3>{playlist.name}</h3>
//           <img src={playlist.image_url} alt={playlist.name} />
//           <p>Owner: {playlist.owner}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Playlists;
