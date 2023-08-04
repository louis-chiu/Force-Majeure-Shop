import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import './CartList.scss';

const CartList = ({ cart }) => {
  const { cart: cartList } = useSelector((store) => store.cart);
  return (
    <div className='cart-table'>
      <header className='cart-table__header'>
        <div className='cart-table__header-row'>
          <p className='cart-table__header-item cart-table__header-item--product'>
            Product
          </p>
          <p className='cart-table__header-item cart-table__header-item--color'>
            Color
          </p>
          <p className='cart-table__header-item cart-table__header-item--size'>
            Size
          </p>
          <p className='cart-table__header-item cart-table__header-item--price'>
            Price
          </p>
          <p className='cart-table__header-item cart-table__header-item--amount'>
            Amounts
          </p>
          <p className='cart-table__header-item cart-table__header-item--action'>
            Action
          </p>
        </div>
      </header>
      <article>
        {cartList.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.id + cartItem.size + cartItem.color}
              product={cartItem}
            />
          );
        })}
      </article>
    </div>
  );
};
export default CartList;
