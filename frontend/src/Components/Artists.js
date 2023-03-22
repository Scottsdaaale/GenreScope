// function Artists(props) {
//   const searchResult = props.location.state.searchResult;
//   console.log(searchResult);
//   if (!searchResult) {
//     return <p>No search results to display.</p>;
//   }
//   return (
//     <div>
//       <h2>Artists</h2>
//       {searchResult.length > 0 ? (
//         searchResult.map((artist) => (
//           <div key={artist.id}>
//             <h3>{artist.name}</h3>
//             <p>{artist.popularity}</p>
//             <ul>
//               {artist.top_tracks.map((track) => (
//                 <li key={track.id}>{track.name}</li>
//               ))}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No search results to display.</p>
//       )}
//     </div>
//   );
// }

// export default Artists;
import React from "react";

function Artists({ searchResult }) {
  console.log(searchResult);
  return (
    <div>
      {searchResult && searchResult.artists.length > 0 ? (
        <ul>
          {searchResult.artists.map((artist) => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      ) : (
        <p>No artists found</p>
      )}
    </div>
  );
}

export default Artists;