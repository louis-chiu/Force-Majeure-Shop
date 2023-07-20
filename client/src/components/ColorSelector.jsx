import './ColorSelector.scss';
const ColorSelector = ({ colorList }) => {
  console.log(colorList);
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
              onChange={() => console.log(hex)}
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
