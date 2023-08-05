import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isExtendList: [],
};

const accordionSlice = createSlice({
  name: 'accordion',
  initialState,
  reducers: {
    toggleExtend: (state, action) => {
      const { orderIndex } = action.payload;
      state.isExtendList[orderIndex] = !state.isExtendList[orderIndex];
    },
    resetExtend: (state, action) => {
      const { orderItems } = action.payload;
      state.isExtendList = orderItems.map((item) => false);
    },
  },
});

export const { toggleExtend, resetExtend } = accordionSlice.actions;
export default accordionSlice.reducer;
