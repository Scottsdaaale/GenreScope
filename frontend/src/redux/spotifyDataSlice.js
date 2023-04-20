import { createSlice } from '@reduxjs/toolkit';

const spotifyDataSlice = createSlice({
  name: 'spotifyData',
  initialState: {
    artists: [],
    playlists: [],
    tracks: [],
  },
  reducers: {
    setData(state, action) {
      const { artists, playlists, tracks } = action.payload;
      console.log("Artists:", artists);
      console.log("Playlists:", playlists);
      console.log("Tracks:", tracks);
      state.artists = artists;
      state.playlists = playlists;
      state.tracks = tracks;
    },
  },
});

export const { setData } = spotifyDataSlice.actions;
export default spotifyDataSlice.reducer;