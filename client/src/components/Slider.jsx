import ProductCard from './ProductCard';

const Slider = () => {
  return (
    <div className='slider'>
      <ul>
        <li>
          <ProductCard />
        </li>
      </ul>
      <div className='slider__controller'>
        <BiSolidLeftArrow />
      </div>
      <div className='slider__controller'>
        <BiSolidRightArrow />
      </div>
    </div>
  );
};
export default Slider;
