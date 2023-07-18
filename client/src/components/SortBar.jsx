import './SortBar.scss';
const SortBar = () => {
  return (
    <div className='sort-bar'>
      <p className='sort-bar__title'>Sort By</p>

      <select
        className='sort-bar__select'
        name='sort-by'
        id='sort-by'
      >
        {'sortList'}
        <option
          className='sort-bar__option'
          value='Name'
        >
          Name (A - Z)
        </option>
        <option
          className='sort-bar__option'
          value='Name'
        >
          Name (Z - A)
        </option>
        <option
          className='sort-bar__option'
          value='Price'
        >
          Price (Highest)
        </option>
        <option
          className='sort-bar__option'
          value='Price'
        >
          Price (Lowest)
        </option>
      </select>
    </div>
  );
};
export default SortBar;
