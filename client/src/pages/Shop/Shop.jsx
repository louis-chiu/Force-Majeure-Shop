import ProductCard from '../../components/ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortBar from '../../components/SortBar/SortBar';
import { extendedApiSlice as productApi } from '../../features/product/productSlice';
import './Shop.scss';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../features/product/productSlice';
import { store } from '../../store';
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import Banner from '../../components/BannerSlider/BannerSlider';
import { resetFilter } from '../../features/filter/filterSlice';

export const loader = async () => {
  const {
    data: products,
    isError,
    isLoading,
  } = await store.dispatch(productApi.endpoints.getProducts.initiate());
  store.dispatch(setProducts({ products }));
  store.dispatch(resetFilter());
  return { isError, isLoading };
};

const Shop = () => {
  const { sortBy, ascOrDesc, keyword } = useSelector((store) => store.filter);
  const { isError, isLoading } = useLoaderData();
  const dispatch = useDispatch();
  const { productList: products, isFirst } = useSelector(
    (store) => store.product
  );
  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  useEffect(() => {
    if (!isFirst) {
      dispatch(
        productApi.endpoints.getProductsByFilter.initiate({
          keyword,
          sortBy,
          ascOrDesc,
        })
      ).then(({ data }) => {
        dispatch(setProducts({ products: data }));
      });
    }
  }, [sortBy, ascOrDesc, keyword]);
  return (
    <div className='shop'>
      <Banner />
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
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Shop;
