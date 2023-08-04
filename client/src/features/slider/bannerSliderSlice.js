import { createSlice } from '@reduxjs/toolkit';
import { bannerUrlList } from '../../data';

const initialState = {
  translate: 0,
};

const bannerSliderSlice = createSlice({
  name: 'bannerSlider',
  initialState,
  reducers: {
    slideToLeft: (state) => {
      state.translate =
        ((state.translate + 1 - bannerUrlList.length) % bannerUrlList.length) *
        100;
    },
    slideToRight: (state) => {
      state.translate = ((state.translate - 1) % bannerUrlList.length) * 100;
    },
  },
});

export const { slideToLeft, slideToRight } = bannerSliderSlice.actions;
export default bannerSliderSlice.reducer;
