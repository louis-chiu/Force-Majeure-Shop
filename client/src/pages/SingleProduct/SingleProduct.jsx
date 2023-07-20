import { useParams } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useGetProductByIdQuery } from '../../services/product';
import Error from '../Error/Error.jsx';
import Loading from '../Loading/Loading';
import './SingleProduct.scss';

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, isError, isLoading } = useGetProductByIdQuery(id);

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  console.log(product);
  return (
    <div className='single-product'>
      <ProductForm {...product} />
    </div>
  );
};
export default SingleProduct;
