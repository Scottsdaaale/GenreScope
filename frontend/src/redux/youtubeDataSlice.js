import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const fetchGenreVideosData = createAsyncThunk(
  'youtubeData/fetchGenreVideosData',
  async (genre, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/videos/genre/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': '',
        },
        body: JSON.stringify({ genre }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const videosData = await response.json();

      return videosData.videos; // Return only the videos from the response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArtistVideosData = createAsyncThunk(
  'youtubeData/fetchArtistVideosData',
  async ({ artistName }) => {
    try {
      const response = await fetch('/api/videos/artist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': '',
        },
        body: JSON.stringify({ artist_name: artistName }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const videosData = await response.json();

      console.log('Returned videosData:', videosData); // Add a console.log statement
      return videosData.videos;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// const initialState = {
//   loading: false,
//   genreVideos: {},
//   artistVideos: {},
// };

const initialState = {
  loading: false,
  genreVideos: {
    loading: false,
    data: [], // Update to empty array
  },
  artistVideos: {
    loading: false,
    data: [], // Update to empty array
  },
};

const youtubeDataSlice = createSlice({
  name: 'youtubeData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenreVideosData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGenreVideosData.fulfilled, (state, action) => {
        state.loading = false;
        state.genreVideos = action.payload; // Store the fetched videos in genreVideos
      })
      .addCase(fetchGenreVideosData.rejected, (state) => {
        state.loading = false;
        state.genreVideos = {};
      })
      .addCase(fetchArtistVideosData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtistVideosData.fulfilled, (state, action) => {
        state.loading = false;
        state.artistVideos = action.payload;
      })
      .addCase(fetchArtistVideosData.rejected, (state) => {
        state.loading = false;
        state.artistVideos = {};
      });
  },
});

const persistConfig = {
  key: 'youtubeData',
  storage,
};

const persistedReducer = persistReducer(persistConfig, youtubeDataSlice.reducer);

// export const selectGenreVideos = (state) => state.youtubeData.genreVideos;
// export const selectArtistVideos = (state) => state.youtubeData.artistVideos;

export default persistedReducer;




