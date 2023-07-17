import './Shop.scss';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const Shop = () => {
  return (
    <div className='shop'>
      <section className='banner'>
        <ul className='slides'>
          <li className='slide'>
            <div className='slide__filter'>
              <h2 className='slide__title'>Force Majeure</h2>
            </div>
          </li>
          <li className='slide'>
            <div className='slide__filter'>
              <h2 className='slide__title'>Force Majeure</h2>
            </div>
          </li>
          <li className='slide'>
            <div className='slide__filter'>
              <h2 className='slide__title'>Force Majeure</h2>
            </div>
          </li>
          <div className='slides__controller'>
            <BiSolidLeftArrow />
          </div>
          <div className='slides__controller'>
            <BiSolidRightArrow />
          </div>
        </ul>
      </section>
    </div>
  );
};
export default Shop;
