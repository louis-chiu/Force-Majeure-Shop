import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import SortBar from '../components/SortBar';
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from '../services/product';
import './Shop.scss';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const Shop = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  console.log(products);
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
      <section className='product-list-container'>
        <div className='filter-bar'>
          <SortBar />
          <div className='filter-bar__center'>
            <hr className='filter-bar__hr' />
            <p className='filter-bar__found-items'>
              {products?.length} Products Found
            </p>
            <hr className='filter-bar__hr' />
          </div>
          <SearchBar />
        </div>
        <div className='products'>
          {products?.map((product) => (
            <ProductCard {...product} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Shop;
