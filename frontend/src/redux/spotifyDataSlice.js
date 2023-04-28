import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'spotifyData/fetchData',
  async (genre, thunkAPI) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": "",
      },
      body: JSON.stringify({ genre }),
    };
  
    try {
      const requests = ["artists", "playlists", "tracks"]
        .map(key => fetch(`/api/${key}/`, options)
          .then(response => response.json())
          // access response property, e.g. data.artists, data.playlists, etc
          .then(data => data[key])
        );

      const [artists, playlists, tracks] = await Promise.all(requests);
      return { artists, playlists, tracks };
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
    
  }
);

const spotifyDataSlice = createSlice({
  name: 'spotifyData',
  initialState: {
    loading: false,
    artists: [],
    playlists: [],
    tracks: [],
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload.artists;
        state.playlists = action.payload.playlists;
        state.tracks = action.payload.tracks;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      });
    },
  },
);

export default spotifyDataSlice.reducer;