import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import './AmountSelector.scss';
import { useDispatch } from 'react-redux';
import {
  addAmount as addProductAmount,
  subtractAmount as subtractProductAmount,
} from '../../features/cartItem/cartItemSlice';
import {
  addItemAmount,
  subtractItemAmount,
} from '../../features/cart/cartSlice';

const AmountSelector = ({ product }) => {
  const { amount, isAddToCart } = product;
  const dispatch = useDispatch();
  return (
    <div className='amount-selector'>
      <button
        type='button'
        className='amount-selector__btn'
        onClick={() =>
          dispatch(
            isAddToCart
              ? subtractItemAmount({ ...product })
              : subtractProductAmount()
          )
        }
      >
        <AiOutlineMinus />
      </button>
      <p className='amount-selector__amount'>{amount}</p>
      <button
        type='button'
        className='amount-selector__btn'
        onClick={() =>
          dispatch(
            isAddToCart ? addItemAmount({ ...product }) : addProductAmount()
          )
        }
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};
export default AmountSelector;
