import { configureStore } from '@reduxjs/toolkit';

import movieReducer from './slices/movie';
import searchReducer from './slices/search';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
