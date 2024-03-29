import { useLoaderData, useParams } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import productSlice, {
  useGetProductByIdQuery,
} from '../../features/product/productSlice';
import Error from '../Error/Error.jsx';
import Loading from '../Loading/Loading';
import './SingleProduct.scss';
import Comment from '../../components/Comment/Comment';
import { useDispatch } from 'react-redux';
import { resetCartItem } from '../../features/cartItem/cartItemSlice';
import { store } from '../../store';

import { extendedApiSlice as productApi } from '../../features/product/productSlice';
import { setImageList } from '../../features/slider/singleProductSliderSlice';
export const loader = async ({ params }) => {
  const { id } = params;
  const {
    data: product,
    isError,
    isLoading,
  } = await store.dispatch(productApi.endpoints.getProductById.initiate(id));
  store.dispatch(
    resetCartItem({
      ...product,
      id,
    })
  );

  return { data: product, isError, isLoading };
};
const SingleProduct = () => {
  const dispatch = useDispatch();
  const { data: product, isError, isLoading } = useLoaderData();
  dispatch(setImageList({ imageList: product.image }));
  const commentList = product?.comments;
  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className='single-product'>
      <ProductForm product={product} />
      <section className='comment-list'>
        {commentList?.map((comment) => {
          return (
            <Comment
              key={comment.commentId}
              {...comment}
            />
          );
        })}
      </section>
    </div>
  );
};
export default SingleProduct;
