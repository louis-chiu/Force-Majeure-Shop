import { useActionData } from 'react-router-dom';
import './Member.scss';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../store';
import MemberData from '../../components/MemberData/MemberData';
import { useEffect } from 'react';
import { useGetOrderByUserIdQuery } from '../../features/order/orderSlice';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import OrderHistory from '../../components/OrderHistory/OrderHistory';
import { setOrderHistory } from '../../features/auth/authSlice';

const Member = () => {
  const {
    memberData: { userid: userId },
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const {
    data: orderHistory,
    isLoading,
    error,
  } = useGetOrderByUserIdQuery(userId);

  useEffect(() => {
    if (isLoading || error) return;
    dispatch(setOrderHistory(orderHistory));
  }, [orderHistory]);

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className='member'>
      <MemberData />
      <OrderHistory />
    </div>
  );
};
export default Member;
