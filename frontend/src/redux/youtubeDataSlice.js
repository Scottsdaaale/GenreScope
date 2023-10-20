import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define an async thunk for fetching genre videos
export const fetchGenreVideosData = createAsyncThunk(
  'youtubeData/fetchGenreVideosData',
  async (genre) => {
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

    return videosData.videos;
  }
);

// Define an async thunk for fetching artist videos
export const fetchArtistVideosData = createAsyncThunk(
  'youtubeData/fetchArtistVideosData',
  async ({ artistName }) => {
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

    return videosData.videos;
  }
);

// Define the initial state
const initialState = {
  loading: false,
  genreVideos: {
    loading: false,
    data: [],
    error: null,
  },
  artistVideos: {
    loading: false,
    data: [],
    error: null,
  },
};

// Create a Redux slice
const youtubeDataSlice = createSlice({
  name: 'youtubeData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenreVideosData.pending, (state) => {
        state.genreVideos.loading = true;
        state.genreVideos.error = null;
      })
      .addCase(fetchGenreVideosData.fulfilled, (state, action) => {
        state.genreVideos.loading = false;
        state.genreVideos.data = action.payload;
        state.genreVideos.error = null;
      })
      .addCase(fetchGenreVideosData.rejected, (state, action) => {
        state.genreVideos.loading = false;
        state.genreVideos.data = [];
        state.genreVideos.error = action.payload;
      })
      .addCase(fetchArtistVideosData.pending, (state) => {
        state.artistVideos.loading = true;
        state.artistVideos.error = null;
      })
      .addCase(fetchArtistVideosData.fulfilled, (state, action) => {
        state.artistVideos.loading = false;
        state.artistVideos.data = action.payload;
        state.artistVideos.error = null;
      })
      .addCase(fetchArtistVideosData.rejected, (state, action) => {
        state.artistVideos.loading = false;
        state.artistVideos.data = [];
        state.artistVideos.error = action.payload;
      });
  },
});

// Define a Redux persist configuration
const persistConfig = {
  key: 'youtubeData',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, youtubeDataSlice.reducer);

export default persistedReducer;
