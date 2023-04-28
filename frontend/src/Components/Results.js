import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Artists from "./Artists";
import Playlists from "./Playlists";
import Tracks from "./Tracks";
import { fetchData } from '../redux/spotifyDataSlice';

function Results() {
  const dispatch = useDispatch();
  const { genre } = useParams();

  const isLoading = useSelector(state => state.spotifyData.loading);

  React.useEffect(() => {
    // fetch data on component mount or when genre value changes
    dispatch(fetchData(genre));
  }, [dispatch, genre]);

  return (
    <div>
      {isLoading
        ? <div>Loading...</div>
        : (
          <>
            <Artists />
            <Playlists />
            <Tracks />
          </>
        )
      }
    </div>
  );
}

export default Results;
