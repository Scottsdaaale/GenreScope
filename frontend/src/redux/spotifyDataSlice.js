import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const fetchData = createAsyncThunk(
  "spotifyData/fetchData",
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
      const requests = ["artists", "playlists", "tracks"].map((key) =>
        fetch(`/api/${key}/`, options)
          .then((response) => response.json())
          .then((data) => data[key])
      );

      const [artists, playlists, tracks] = await Promise.all(requests);
      return { artists, playlists, tracks };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const persistConfig = {
  key: "spotifyData",
  storage,
  // whitelist: ["artists", "playlists", "tracks"],
};

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: {
    loading: false,
    artists: [],
    playlists: [],
    tracks: [],
  },
  extraReducers: (builder) => {
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
        state.artists = [];
        state.playlists = [];
        state.tracks = [];
      });
  },
});

const persistedReducer = persistReducer(persistConfig, spotifyDataSlice.reducer);

export default persistedReducer;















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchData = createAsyncThunk(
//   "spotifyData/fetchData",
//   async (genre, thunkAPI) => {
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": "",
//       },
//       body: JSON.stringify({ genre }),
//     };

//     try {
//       const requests = ["artists", "playlists", "tracks"].map((key) =>
//         fetch(`/api/${key}/`, options)
//           .then((response) => response.json())
//           .then((data) => data[key])
//       );

//       const [artists, playlists, tracks] = await Promise.all(requests);
//       return { artists, playlists, tracks };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// const spotifyDataSlice = createSlice({
//   name: "spotifyData",
//   initialState: {
//     loading: false,
//     artists: [],
//     playlists: [],
//     tracks: [],
//   },
//   extraReducers: (builder) => {
//     builder
//       //while the fetch is in progress loading state = true
//       .addCase(fetchData.pending, (state) => {
//         state.loading = true;
//       })
//       //if the fetch is done then fill the empty arrays with the spotify data
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.artists = action.payload.artists;
//         state.playlists = action.payload.playlists;
//         state.tracks = action.payload.tracks;
//       })
//       //if the fetch fails, loading state = false
//       .addCase(fetchData.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export default spotifyDataSlice.reducer;
