import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import spotifyDataReducer from './spotifyDataSlice';

const loggerMiddleware = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

const store = configureStore({
  reducer: {
    spotifyData: spotifyDataReducer,
  },
  middleware: getDefaultMiddleware().concat(loggerMiddleware)
});

export default store;