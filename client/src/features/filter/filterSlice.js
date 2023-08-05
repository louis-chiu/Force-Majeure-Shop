import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: '',
  keyword: '',
  ascOrDesc: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      const { keyword } = action.payload;
      state.keyword = keyword;
    },
    setSortBy: (state, action) => {
      const { sortBy: sortByStr } = action.payload;
      const [sortBy, ascOrDesc] = sortByStr.split(' ');

      state.sortBy = sortBy;
      state.ascOrDesc = ascOrDesc;
    },
    resetFilter: (state) => {
      return { ...initialState };
    },
  },
});

export const { setKeyword, setSortBy, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
