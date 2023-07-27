import { useDispatch, useSelector } from 'react-redux';
import './SizeSelector.scss';
import { setSize } from '../../features/cartItem/cartItemSlice';

const SizeSelector = ({ sizeList }) => {
  const dispatch = useDispatch();
  const selectSize = (e) => {
    const size = e.target.value;
    dispatch(setSize({ size }));
  };
  const { size: sizeState } = useSelector((store) => store.cartItem);
  return (
    <div className='size-selector'>
      {sizeList?.map((size) => {
        return (
          <div
            key={size}
            className='size-container'
          >
            <input
              className='size-selector__input'
              type='radio'
              name='size'
              id={size}
              value={size}
              onChange={selectSize}
              checked={size === sizeState}
            />
            <label
              className='size-selector__size'
              htmlFor={size}
            >
              {size}
            </label>
          </div>
        );
      })}
    </div>
  );
};
export default SizeSelector;
