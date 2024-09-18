import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMovie } from '@/lib/types';

interface SearchState {
  results: IMovie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResults(state, action: PayloadAction<IMovie[]>) {
      state.results = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearResults(state) {
      state.results = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setResults, setLoading, setError, clearResults } =
  searchSlice.actions;
export default searchSlice.reducer;
