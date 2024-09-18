import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMovie } from '@/lib/types';

interface MovieState {
  currentMovie: IMovie | null;
}

const initialState: MovieState = {
  currentMovie: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setCurrentMovie(state, action: PayloadAction<IMovie>) {
      state.currentMovie = action.payload;
    },
    clearCurrentMovie(state) {
      state.currentMovie = null;
    },
  },
});

export const { setCurrentMovie, clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;
