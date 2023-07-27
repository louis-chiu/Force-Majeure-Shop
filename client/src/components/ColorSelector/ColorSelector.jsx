import { useState } from 'react';
import './ColorSelector.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, setStock } from '../../features/cartItem/cartItemSlice';
// import { setProduct } from '../../features/product/productSlice';
const ColorSelector = ({ colorList }) => {
  const dispatch = useDispatch();
  const { color: colorState } = useSelector((store) => store.cartItem);

  const handleChange = (e) => {
    const color = e.target.value;
    dispatch(setColor({ color }));

    // dispatch(setProduct({ ...product, color }));
  };
  return (
    <div className='color-selector'>
      {colorList?.map(({ name, hex }) => {
        return (
          <div
            key={hex}
            className='color-selector__color-container'
          >
            <input
              className='color-selector__input'
              type='radio'
              name='color'
              id={name}
              value={name}
              onChange={handleChange}
              checked={name == colorState}
            />
            <label
              className='color-selector__label'
              htmlFor={name}
              style={{ background: hex }}
            ></label>
          </div>
        );
      })}
    </div>
  );
};
export default ColorSelector;
