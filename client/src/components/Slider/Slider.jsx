import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import ProductCard from '../ProductCard/ProductCard';
import './Slider.scss';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import {
  hoverImage,
  slideToLeft,
  slideToRight,
  setIsSlider,
  resetTranslate,
} from '../../features/slider/singleProductSliderSlice';
import { useEffect, useRef } from 'react';
import SliderItem from './SliderItem';

const Slider = ({ imageList, name }) => {
  const dispatch = useDispatch();
  const sliderRef = useRef();

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (sliderRef.current.offsetHeight > 200) {
        dispatch(setIsSlider({ isSlider: true }));
      } else {
        dispatch(resetTranslate());
        dispatch(setIsSlider({ isSlider: false }));
      }
    });
    observer.observe(sliderRef.current, { box: 'border-box' });
    return () => observer.disconnect();
  }, [sliderRef.current]);
  return (
    <div
      className='slider'
      ref={sliderRef}
    >
      <ul className='slider__image-list'>
        {imageList?.map((image, index) => {
          return (
            <SliderItem
              key={image + index}
              image={image}
            />
          );
        })}
      </ul>
      <div
        className='slider__controller slider__controller--left'
        onClick={() => dispatch(slideToLeft())}
      >
        <BiSolidLeftArrow />
      </div>
      <div
        className='slider__controller slider__controller--right'
        onClick={() => dispatch(slideToRight())}
      >
        <BiSolidRightArrow />
      </div>
    </div>
  );
};
export default Slider;
