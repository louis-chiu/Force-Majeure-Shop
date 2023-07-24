import { useParams } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useGetProductByIdQuery } from '../../features/product/productSlice';
import Error from '../Error/Error.jsx';
import Loading from '../Loading/Loading';
import './SingleProduct.scss';
import Comment from '../../components/Comment/Comment';

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, isError, isLoading } = useGetProductByIdQuery(id);
  const commentList = product?.comments;
  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className='single-product'>
      <ProductForm {...product} />
      <section className='comment-list'>
        {commentList?.map((comment) => {
          console.log(comment);
          return <Comment {...comment} />;
        })}
      </section>
    </div>
  );
};
export default SingleProduct;
