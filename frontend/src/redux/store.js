import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import spotifyDataReducer from './spotifyDataSlice';
import topTracksReducer from './topTracksSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    spotifyData: spotifyDataReducer,
    topTracksData: topTracksReducer,
  })
);

const loggerMiddleware = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware().concat(loggerMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };




// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import spotifyDataReducer from './spotifyDataSlice';
// import topTracksReducer from './topTracksSlice';

// const loggerMiddleware = store => next => action => {
//   console.log('Dispatching:', action);
//   const result = next(action);
//   console.log('Next State:', store.getState());
//   return result;
// };

// const store = configureStore({
//   reducer: {
//     spotifyData: spotifyDataReducer,
//     topTracksData: topTracksReducer, 
//   },
//   middleware: getDefaultMiddleware().concat(loggerMiddleware)
// });

// export default store;