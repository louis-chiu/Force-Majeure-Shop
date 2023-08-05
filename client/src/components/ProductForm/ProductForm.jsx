import { Form, useLocation, useNavigate, useParams } from 'react-router-dom';
import './ProductForm.scss';
import ColorSelector from '../ColorSelector/ColorSelector';
import SizeSelector from '../SizeSelector/SizeSelector';
import AmountSelector from '../AmountSelector/AmountSelector';
import Slider from '../Slider/Slider';
import Rating from '../Rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetAmount,
  resetCartItem,
  setStock,
} from '../../features/cartItem/cartItemSlice';
import { useCallback, useEffect } from 'react';
import { addItem, clearItems } from '../../features/cart/cartSlice';
import { useCheckoutMutation } from '../../features/checkout/checkoutSlice';
import {
  extendedApiSlice,
  useCreateOrderMutation,
} from '../../features/order/orderSlice';

const ProductForm = ({ product }) => {
  const { id } = useParams();
  const {
    image,
    name,
    rating,
    price,
    description,
    color,
    size,
    stock: stockList,
  } = product;

  const {
    color: colorState,
    size: sizeState,
    stock,
  } = useSelector((store) => store.cartItem);

  const { currentHoverIndex } = useSelector(
    (store) => store.singleProductSlider
  );

  const {
    isLogin,
    memberData: { userid: userId },
  } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const cartItem = useSelector((store) => store.cartItem);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem({ ...cartItem, isAddToCart: true }));
    dispatch(
      resetCartItem({
        ...product,
        id,
      })
    );
  };

  const formatDataToCreateOrder = useCallback(() => {
    const order = {
      userId,
      orderDate: new Date(Date.now()).toLocaleDateString(),
      paymentStatus: 'Pending',
      orderItems: [],
    };
    const { id, amount, color, size } = cartItem;

    const orderItems = [
      {
        productId: id,
        quantity: amount,
        color,
        size,
      },
    ];

    return { ...order, orderItems };
  });

  const formatDataForLinePay = useCallback(async (orderId) => {
    const {
      data: orderItems,
      isError,
      isSuccess,
    } = await dispatch(
      extendedApiSlice.endpoints.getOrderById.initiate(orderId)
    );
    if (isError) return 'Error';
    if (isSuccess) {
      const lineRequestBody = {
        amount: orderItems.reduce(
          (accumulator, current) =>
            (accumulator +=
              parseInt(current.price) * parseInt(current.quantity)),
          0
        ),
        currency: 'TWD',
        orderId: String(orderId),
        packages: [
          ...orderItems.map((item) => {
            return {
              id: String(item.orderitemid),
              amount: parseInt(item.price) * parseInt(item.quantity),
              products: [
                {
                  id: String(item.productid),
                  name: item.name,
                  quantity: item.quantity,
                  imageUrl: item.image[0],
                  price: parseInt(item.price),
                },
              ],
            };
          }),
        ],
      };
      return lineRequestBody;
    }
  });

  const [createOrder, { data, isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [checkout] = useCheckoutMutation();
  const handleClick = async () => {
    if (!isLogin) {
      navigate('/login');
      return;
    }
    try {
      const { message, orderId } = await createOrder(
        formatDataToCreateOrder()
      ).unwrap();

      if (orderId) {
        dispatch(clearItems());
        const { url } = await checkout(
          await formatDataForLinePay(orderId)
        ).unwrap();
        if (url) {
          window.location.replace(url);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!colorState || !sizeState) return;
    const [_, currentStock] = Object.entries(stockList).find(
      ([colorAndSize, stock]) => {
        const [color, size] = colorAndSize.split(', ');
        return color === colorState && size === sizeState;
      }
    );

    dispatch(setStock({ stock: currentStock }));
    dispatch(resetAmount());
  }, [colorState, sizeState]);
  return (
    <form
      className='product-form'
      onSubmit={handleSubmit}
    >
      <section className='product-form__image-container'>
        <img
          className='product-form__image'
          src={image?.[currentHoverIndex]}
          alt={name}
        />
        <Slider
          className='product-form__image-slider'
          imageList={image}
          name={name}
        />
      </section>
      <section className='product-detail'>
        <div className='product-detail__header'>
          <h3 className='product-detail__name'>{name}</h3>
          <Rating rating={rating} />
        </div>
        <hr className='product-detail__hr' />
        <div className='product-detail__body'>
          <p className='product-detail__price'>$ {price}</p>
          <p className='product-detail__description'>{description}</p>
          <ColorSelector
            className='product-detail__color-selector'
            colorList={color}
          />
          <SizeSelector
            className='product-detail__size-selector'
            sizeList={size}
          />
          <div className='product-detail__selector-container'>
            <AmountSelector
              className='product-detail__amount-selector'
              product={cartItem}
            ></AmountSelector>
            <p className='product-detail__total-price'>$ {price}</p>
          </div>
          <p className={stock < 10 ? `product-detail__stock` : ``}>
            {stock < 10 && `only ${stock} lefts in stocks!`}
          </p>

          <div className='product-detail__button-group'>
            <button
              type='button'
              className='product-detail__buy'
              onClick={handleClick}
            >
              Buy Now
            </button>
            <button
              type='submit'
              className='product-detail__cart'
              value={'cart'}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};
export default ProductForm;
