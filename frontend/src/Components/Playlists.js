import React from 'react'

function Playlists(props) {
  const playlists = props.data.playlists
  return (
    <div>
      Playlists:
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h3>{playlist.name}</h3>
          <img src={playlist.image_url} alt={playlist.name} />
          <p>Owner: {playlist.owner}</p>
          <h4>Tracks:</h4>
          {/* <ul>
            {playlist.tracks.map((track) => (
              <li key={track.id}>
                {track.name} - {track.duration_ms}
              </li>
            ))}
          </ul> */}
        </div>
      ))}
    </div>
  );
}

export default Playlists;