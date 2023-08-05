import './Order.scss';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import OrderItem from '../OrderItem/OrderItem';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetExtend,
  toggleExtend,
} from '../../features/accordion/accordionSlice';

const Order = ({
  orderIndex,
  orderDate,
  orderStatus,
  totalPrice,
  orderItems,
}) => {
  const dispatch = useDispatch();
  const { isExtendList } = useSelector((store) => store.accordion);

  const orderContainerRef = useRef();

  const allItemRef = {};

  const handleClick = () => {
    if (isExtendList[orderIndex]) {
      orderItems.forEach((_, index) => {
        allItemRef[index].style.zIndex = (index - orderItems.length) * -1;
        allItemRef[index].style.transform = `translateY(calc(${
          index * -10.75
        }rem - 100px - 0.75rem))`;
      });
      orderContainerRef.current.style.height = 'calc(100px)';
    } else {
      orderItems.forEach((_, index) => {
        allItemRef[index].style.zIndex = 1;
        allItemRef[index].style.transform = 'none';
      });
      orderContainerRef.current.style.height = `calc(${
        orderItems.length * 10.75
      }rem + 100px )`;
    }
    dispatch(toggleExtend({ orderIndex }));
  };
  useEffect(() => {
    dispatch(resetExtend({ orderItems }));
  }, []);

  return (
    <div
      className='order-container'
      ref={orderContainerRef}
    >
      <div
        className='order'
        onClick={handleClick}
      >
        <p className='order__status'>{orderStatus}</p>
        <p className='order__price'>$ {totalPrice}</p>
        <p className='order__date'>{orderDate}</p>
        <button className='order__expand'>
          <MdOutlineKeyboardArrowDown />
        </button>
      </div>
      {orderItems.map((orderItem, index) => (
        <OrderItem
          key={orderItem.orderItemId}
          index={index}
          allItemRef={allItemRef}
          {...orderItem}
        />
      ))}
    </div>
  );
};
export default Order;
