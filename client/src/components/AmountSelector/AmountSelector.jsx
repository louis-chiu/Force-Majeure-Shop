import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import './AmountSelector.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAmount,
  subtractAmount,
} from '../../features/cartItem/cartItemSlice';
const AmountSelector = ({ stock }) => {
  const dispatch = useDispatch();
  const { amount } = useSelector((store) => store.cartItem);
  return (
    <div className='amount-selector'>
      <button
        type='button'
        className='amount-selector__btn'
        onClick={() => dispatch(subtractAmount())}
      >
        <AiOutlineMinus />
      </button>
      <p className='amount-selector__amount'>{amount}</p>
      <button
        type='button'
        className='amount-selector__btn'
        onClick={() => dispatch(addAmount())}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};
export default AmountSelector;
