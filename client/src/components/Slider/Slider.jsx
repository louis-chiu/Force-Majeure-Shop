import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import ProductCard from '../ProductCard/ProductCard';
import './Slider.scss';
import { nanoid } from 'nanoid';

const Slider = ({ imageList, name }) => {
  return (
    <div className='slider'>
      <ul className='slider__image-list'>
        {imageList?.map((image) => {
          console.log(image + '!!!');
          return (
            <li key={nanoid()}>
              <img
                className='slider__image'
                src={image}
                alt={name}
              />
            </li>
          );
        })}
      </ul>
      <div className='slider__controller slider__controller--left'>
        <BiSolidLeftArrow />
      </div>
      <div className='slider__controller slider__controller--right'>
        <BiSolidRightArrow />
      </div>
    </div>
  );
};
export default Slider;
