import React from "react";
import Artists from "./Artists";
import Playlists from "./Playlists";
import Tracks from "./Tracks";
import VideoPlayer from "./VideoPlayer";
import { fetchData } from '../redux/genreResultsDataSlice';
import {fetchGenreVideosData} from '../redux/youtubeDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function Results() {
  const dispatch = useDispatch();
  const { genre } = useParams();

  const isLoadingSpotifyGenreData = useSelector(state => state.genreResultsData.loading);
  const isLoadingGenreVideos = useSelector(state => state.youtubeData.loading);
  React.useEffect(() => {
    // fetch data on component mount or when genre value changes
    console.log(genre)
    dispatch(fetchData(genre));
    dispatch(fetchGenreVideosData(genre));
  }, [dispatch, genre]);

  return (
    <div>
      {isLoadingSpotifyGenreData || isLoadingGenreVideos
        ? <div>Loading...</div>
        : (
          <>
            <Artists />
            <VideoPlayer/>
            <Playlists />
            <Tracks />
          </>
        )
      }
    </div>
  );
}

export default Results;
