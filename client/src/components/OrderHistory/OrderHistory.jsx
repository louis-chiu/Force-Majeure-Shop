import './OrderHistory.scss';
import Order from '../Order/Order';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
  const {
    orderHistory: { orders },
  } = useSelector((store) => store.auth);
  return (
    <div className='order-history'>
      <h2 className='order-history__title'>Order History</h2>
      <div className='order-history__header'>
        <p className='order-history__status'>Status</p>
        <p className='order-history__price'>Total Price</p>
        <p className='order-history__date'>Order Date</p>
        <div className='order-history__expand'></div>
      </div>
      {orders?.map((order, index) => (
        <Order
          key={order.orderId}
          {...order}
          orderIndex={index}
        />
      ))}
    </div>
  );
};
export default OrderHistory;
