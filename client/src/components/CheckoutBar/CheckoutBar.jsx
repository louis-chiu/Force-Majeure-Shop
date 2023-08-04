import './CheckoutBar.scss';
import { socialMedia } from '../../data';
import { useSelector } from 'react-redux';
const CheckoutBar = () => {
  const { totalPrice } = useSelector((store) => store.cart);
  return (
    <footer className='checkout'>
      <div className='checkout__price-container'>
        <p className='checkout__price-label'>Total Price:</p>
        <p className='checkout__price'>$ {totalPrice}</p>
      </div>
      <button className='checkout__btn'>Buy Now</button>
    </footer>
  );
};
export default CheckoutBar;
