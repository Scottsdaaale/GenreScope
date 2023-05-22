// import React from 'react';
// import { useSelector } from 'react-redux';
// import YouTube from 'react-youtube';
// import { selectGenreVideos } from '../redux/youtubeDataSlice';
// import { useParams } from "react-router-dom";


// const VideoPlayer = () => {
 
//   // const genreVideos = useSelector((state) => selectGenreVideos(state));
//   const {genreVideos} = useSelector((state) => state.youtubeData)
//   const {artistVideos} = useSelector ((state) => state.youtubeData)
//   // const {artists} = useSelector(state => state.genreResultsData);
//   // const artistVideos = useSelector((state) => selectArtistVideos(state, artistName));


//   console.log(genreVideos);

//   const opts = {
//     height: '315',
//     width: '560',
//     playerVars: {
//       origin: 'http://localhost:3000/',
//       autoplay: 1,
//       controls: 1,
//       modestbranding: 1,
//       showinfo: 0,
//       fs: 1,
//       rel: 0,
//     },
//   };

//   return (
//     <div>
//       <div>Videos:</div>
//       {genreVideos.map(video => (
//         <YouTube
//           key={video.id}
//           videoId={video.id}
//           opts={opts}
//           onReady={event => event.target.pauseVideo()}
//         />
//       ))}
//     </div>
//   );
// };

// export default VideoPlayer;


import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectGenreVideos, selectArtistVideos } from '../redux/youtubeDataSlice'; 
import YouTube from 'react-youtube';

const VideoPlayer = () => {
  const location = useLocation();
  const genreVideos = useSelector((state) => state.youtubeData.genreVideos);
  const artistVideos = useSelector((state) => state.youtubeData.artistVideos);
  const isGenrePage = location.pathname.includes('/genres');

  const videos = isGenrePage ? genreVideos : artistVideos;

  console.log(videos);

  const opts = {
    height: '315',
    width: '560',
    playerVars: {
      origin: null,
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      showinfo: 0,
      fs: 1,
      rel: 0,
    },
  };

  return (
    <div>
      <div>Videos:</div>
      {videos.map((video) => (
        <YouTube
          key={video.id}
          videoId={video.id}
          opts={opts}
          onReady={(event) => event.target.pauseVideo()}
        />
      ))}
    </div>
  );
};

export default VideoPlayer;