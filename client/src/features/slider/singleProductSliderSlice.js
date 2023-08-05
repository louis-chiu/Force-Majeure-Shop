import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  translate: 0,
  currentHoverIndex: 0,
  isSlider: false,
  imageList: [],
};

const singleProductSliderSlice = createSlice({
  name: 'singleProductSlider',
  initialState,
  reducers: {
    slideToLeft: (state) => {
      state.translate =
        (state.translate + 1 - state.imageList.length) % state.imageList.length;
    },
    slideToRight: (state) => {
      state.translate = (state.translate - 1) % state.imageList.length;
    },
    resetTranslate: (state) => {
      state.translate = 0;
    },
    hoverImage: (state, action) => {
      const { index } = action.payload;
      state.currentHoverIndex = index;
    },
    setIsSlider: (state, action) => {
      const { isSlider } = action.payload;
      state.isSlider = isSlider;
    },
    setImageList: (state, action) => {
      const { imageList } = action.payload;
      state.imageList = imageList;
    },
  },
});

export const {
  slideToLeft,
  slideToRight,
  hoverImage,
  setIsSlider,
  resetTranslate,
  setImageList,
} = singleProductSliderSlice.actions;
export default singleProductSliderSlice.reducer;
