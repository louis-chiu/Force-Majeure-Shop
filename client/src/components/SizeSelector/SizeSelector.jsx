import './SizeSelector.scss';

const SizeSelector = ({ sizeList }) => {
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
              value={name}
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
