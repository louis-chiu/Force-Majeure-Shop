import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import './AmountSelector.scss';
const AmountSelector = ({ stock }) => {
  let amount = 0;
  return (
    <div className='amount-selector'>
      <button className='amount-selector__btn'>
        <AiOutlineMinus />
      </button>
      <p className='amount-selector__amount'>{amount}</p>
      <button className='amount-selector__btn'>
        <AiOutlinePlus />
      </button>
    </div>
  );
};
export default AmountSelector;
