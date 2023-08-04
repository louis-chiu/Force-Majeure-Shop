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

const SliderItem = ({ image }) => {
  const dispatch = useDispatch();
  const imageRef = useRef();
  const { translate, isSlider, imageList } = useSelector(
    (store) => store.singleProductSlider
  );

  const handleHover = (e) => {
    dispatch(hoverImage({ index: imageList.indexOf(e.target.src) }));
  };
  return (
    <li
      style={{
        transform: `translate(${
          translate * (imageRef.current?.offsetWidth + 16)
        }px)`,
      }}
      className='slider__item'
    >
      <img
        className='slider__image'
        src={image}
        alt={name}
        ref={imageRef}
        {...(isSlider ? undefined : { onMouseEnter: handleHover })}
      />
    </li>
  );
};
export default SliderItem;
