import { configureStore } from '@reduxjs/toolkit';
import spotifyDataReducer from './spotifyDataSlice';

const store = configureStore({
  reducer: {
    spotifyData: spotifyDataReducer,
  },
});

export default store;