import { useDispatch } from 'react-redux';
import AmountSelector from '../AmountSelector/AmountSelector';
import './CartItem.scss';
import { removeItem } from '../../features/cart/cartSlice';
import { useEffect, useRef, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
const CartItem = ({ product }) => {
  const { id, image, name, color, size, price, amount } = product;
  const dispatch = useDispatch();
  const btnRef = useRef();
  const [isCircle, setIsCircle] = useState(false);
  useEffect(() => {
    const handleResize = (entries) => {
      for (const entry of entries) {
        if (entry.target === btnRef.current) {
          const width = entry.contentRect.width;
          const height = entry.contentRect.height;

          setIsCircle(width === height);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (btnRef.current) {
      resizeObserver.observe(btnRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div className='cart-item'>
      <div className='cart-item__image-container'>
        <img
          src={image}
          alt={name}
          className='cart-item__image'
        />
      </div>
      <div className='cart-item__detail'>
        <p className='cart-item__name'>{name}</p>
        <div className='cart-item__color-size-container'>
          <div
            className='cart-item__color'
            style={{ background: color }}
          />
          <p className='cart-item__size'>{size}</p>
        </div>
        <p className='cart-item__price'>{`$ ${amount * price}`}</p>
        <div className='cart-item__action-group'>
          <div className='cart-item__amount'>
            <AmountSelector product={product} />
          </div>
          <div className='cart-item__remove-container'>
            <button
              className='cart-item__remove'
              onClick={() => dispatch(removeItem({ id, color, size }))}
              ref={btnRef}
            >
              {isCircle ? <FaTrashCan /> : 'Remove'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
