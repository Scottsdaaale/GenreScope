import React from "react";
import Artists from "./Artists";
import Playlists from "./Playlists";
import Tracks from "./Tracks";
import Videos from "./Videos";
import { fetchData } from '../redux/genreResultsDataSlice';
import {fetchGenreVideosData} from '../redux/youtubeDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function Results() {
  const dispatch = useDispatch();
  const { genre } = useParams();

  const isLoadingSpotifyGenreData = useSelector(state => state.genreResultsData.loading);
  const isLoadingGenreVideos = useSelector(state => state.youtubeData.genreVideos.loading);
  React.useEffect(() => {
    // fetch data on component mount or when genre value changes
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
            <Videos />
            <Playlists />
            <Tracks />
          </>
        )
      }
    </div>
  );
}

export default Results;
