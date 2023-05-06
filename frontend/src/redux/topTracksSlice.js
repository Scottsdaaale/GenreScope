import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTopTracks = createAsyncThunk(
  'topTracks/fetchTopTracks',
  async (artistId, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/top_tracks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': '',
        },
        body: JSON.stringify({ artist_id: artistId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.tracks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  tracks: [],
};

const topTracksSlice = createSlice({
  name: 'topTracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload;
      })
      .addCase(fetchTopTracks.rejected, (state) => {
        state.loading = false;
        state.tracks = [];
      });
  },
});

export const selectTopTracks = (state) => state.topTracks.tracks;
export default topTracksSlice.reducer;
