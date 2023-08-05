import { Link } from 'react-router-dom';
import './PaymentSuccess.scss';
import { CiFaceSmile } from 'react-icons/ci';
const PaymentSuccess = () => {
  return (
    <div className='success'>
      <div className='success__icon'>
        <CiFaceSmile />
      </div>
      <h2 className='success__title'>Payment Success!</h2>
      <p className='success__content'>Thanks for your visit!</p>
      <Link
        className='success__btn'
        to={'/shop'}
      >
        Shop More
      </Link>
    </div>
  );
};
export default PaymentSuccess;
