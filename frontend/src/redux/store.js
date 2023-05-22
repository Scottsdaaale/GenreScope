import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import genreResultsDataReducer from './genreResultsDataSlice';
import artistsResultsDataReducer from './artistsResultsDataSlice';
import youtubeDataReducer from './youtubeDataSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    genreResultsData: genreResultsDataReducer,
    artistsResultsData: artistsResultsDataReducer,
    youtubeData: youtubeDataReducer,
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