import { useState } from 'react';
import { bannerUrlList } from '../../data';
import BannerItem from './BannerItem';
import './BannerSlider.scss';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  slideToLeft,
  slideToRight,
} from '../../features/slider/bannerSliderSlice';

const BannerSlider = () => {
  const { translate } = useSelector((store) => store.bannerSlider);
  const dispatch = useDispatch();
  return (
    <section className='banner'>
      <ul className='slides'>
        {bannerUrlList.map((url) => {
          return (
            <BannerItem
              key={url}
              url={url}
              translate={translate}
            />
          );
        })}
      </ul>
      <button
        className='slides__controller'
        onClick={() => dispatch(slideToLeft())}
      >
        <BiSolidLeftArrow />
      </button>
      <button
        className='slides__controller'
        onClick={() => dispatch(slideToRight())}
      >
        <BiSolidRightArrow />
      </button>
    </section>
  );
};
export default BannerSlider;
