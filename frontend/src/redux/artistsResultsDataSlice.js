// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export const fetchTopTracks = createAsyncThunk(
//   'topTracks/fetchTopTracks',
//   async (artistId, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/top_tracks/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': '',
//         },
//         body: JSON.stringify({ artist_id: artistId }),
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       return data.tracks;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   loading: false,
//   tracks: [],
// };

// const topTracksSlice = createSlice({
//   name: 'topTracks',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTopTracks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTopTracks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tracks = action.payload;
//       })
//       .addCase(fetchTopTracks.rejected, (state) => {
//         state.loading = false;
//         state.tracks = [];
//       });
//   },
// });

// export const selectTopTracks = (state) => state.topTracks.tracks;
// export default topTracksSlice.reducer;


// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// export const fetchArtistsResultsData = createAsyncThunk(
//   'artistsResultsData/fetchArtistsResultsData',
//   async ({ artistId, artistName }, { rejectWithValue }) => {
//     try {
//       const response = await Promise.all([
//         fetch('api/top_tracks/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': '',
//           },
//           body: JSON.stringify({ artist_id: artistId }),
//         }),
//         fetch('/api/videos/artist/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': '',
//           },
//           body: JSON.stringify({ artist_name: artistName }),
//         }),
//       ]);
      
//       const [tracksResponse, videosResponse] = response;
      
//       if (!tracksResponse.ok || !videosResponse.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       const tracksData = await tracksResponse.json();
//       const videosData = await videosResponse.json();
      
//       return {
//         tracks: tracksData.tracks,
//         videos: videosData.videos,
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   loading: false,
//   tracks: [],
// };

// const artistsResultsDataSlice = createSlice({
//   name: 'artistsResultsData',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchArtistsResultsData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchArtistsResultsData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tracks = action.payload;
//       })
//       .addCase(fetchArtistsResultsData.rejected, (state) => {
//         state.loading = false;
//         state.tracks = [];
//       });
//   },
// });

// const persistConfig = {
//   key: 'artistsResultsData',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, artistsResultsDataSlice.reducer);

// export const selectArtistsResultsData = (state) => state.artistsResultsData.tracks;
// export default persistedReducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const fetchArtistsResultsData = createAsyncThunk(
  'artistsResultsData/fetchArtistsResultsData',
  async ({ artistId }) => {
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

      const tracksData = await response.json();

      return {
        tracks: tracksData.tracks,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
loading: false,
tracks: [],
};

const artistsResultsDataSlice = createSlice({
name: 'artistsResultsData',
initialState,
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchArtistsResultsData.pending, (state) => {
state.loading = true;
})
.addCase(fetchArtistsResultsData.fulfilled, (state, action) => {
state.loading = false;
state.tracks = action.payload.tracks;
})
.addCase(fetchArtistsResultsData.rejected, (state) => {
state.loading = false;
state.tracks = [];
});
},
});

const persistConfig = {
key: 'artistsResultsData',
storage,
};

const persistedReducer = persistReducer(persistConfig, artistsResultsDataSlice.reducer);

export const selectArtistsResultsData = (state) => state.artistsResultsData.tracks;
export default persistedReducer;