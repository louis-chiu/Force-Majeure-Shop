import './Cart.scss';
import CartList from '../../components/CartList/CartList';
import CheckoutBar from '../../components/CheckoutBar/CheckoutBar';

const Cart = () => {
  return (
    <div className='cart'>
      <div className='cart__container'>
        <h2 className='cart__title'>Shopping Cart</h2>
        <CartList />
      </div>
      <CheckoutBar />
    </div>
  );
};
export default Cart;
