import {
  extendedApiSlice,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
} from '../../features/order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import './CheckoutBar.scss';
import { useCallback } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import { clearItems } from '../../features/cart/cartSlice';
import { useCheckoutMutation } from '../../features/checkout/checkoutSlice';
const CheckoutBar = () => {
  const { totalPrice, cart: cartList } = useSelector((store) => store.cart);

  const {
    isLogin,
    memberData: { userid: userId },
  } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDataToCreateOrder = useCallback(() => {
    const order = {
      userId,
      orderDate: new Date(Date.now()).toLocaleDateString(),
      paymentStatus: 'Pending',
      orderItems: [],
    };
    const orderItems = cartList.map((cartItem) => {
      const { id, amount, color, size } = cartItem;
      return {
        productId: id,
        quantity: amount,
        color,
        size,
      };
    });
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

  return (
    <footer className='checkout'>
      <div className='checkout__price-container'>
        <p className='checkout__price-label'>Total Price:</p>
        <p className='checkout__price'>$ {totalPrice}</p>
      </div>
      <button
        className='checkout__btn'
        onClick={handleClick}
        disabled={!cartList.length || isLoading}
      >
        Buy Now
      </button>
    </footer>
  );
};
export default CheckoutBar;
