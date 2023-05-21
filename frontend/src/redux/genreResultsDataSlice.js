// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// export const fetchData = createAsyncThunk(
//   "genreResultsData/fetchData",
//   async (genre, thunkAPI) => {
//     console.log("Genre before fetch:", genre);

//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": "",
//       },
//       body: JSON.stringify({ genre }),
//     };

//     try {
//       const requests = ["artists", "playlists", "tracks", "videos/genre"].map((key) =>
//         fetch(`/api/${key}/`, options)
//           .then((response) => response.json())
//           .then((data) => data[key])
//       );

//       const [artists, playlists, tracks, videos] = await Promise.all(requests);

//       console.log("Genre after fetch:", genre);

//       return { artists, playlists, tracks, videos };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// const persistConfig = {
//   key: "genreResultsData",
//   storage,
//   // whitelist: ["artists", "playlists", "tracks"],
// };

// const genreResultsData = createSlice({
//   name: "genreResultsData",
//   initialState: {
//     loading: false,
//     artists: [],
//     playlists: [],
//     tracks: [],
//     videos: [],
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.artists = action.payload.artists;
//         state.playlists = action.payload.playlists;
//         state.tracks = action.payload.tracks;
//         state.videos = action.payload.videos;
//       })
//       .addCase(fetchData.rejected, (state) => {
//         state.loading = false;
//         state.artists = [];
//         state.playlists = [];
//         state.tracks = [];
//         state.videos = [];
//       });
//   },
// });

// const persistedReducer = persistReducer(persistConfig, genreResultsData.reducer);

// export default persistedReducer;



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


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const fetchData = createAsyncThunk(
"genreResultsData/fetchData",
async (genre) => {
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
  throw new Error(error);
}
}
);

const persistConfig = {
key: "genreResultsData",
storage,
// whitelist: ["artists", "playlists", "tracks"],
};

const genreResultsData = createSlice({
name: "genreResultsData",
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

const persistedReducer = persistReducer(persistConfig, genreResultsData.reducer);

export default persistedReducer;