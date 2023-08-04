import { useDispatch } from 'react-redux';
import './SortBar.scss';
import { setSortBy } from '../../features/filter/filterSlice';
const SortBar = () => {
  const dispatch = useDispatch();
  const handleChange = async (e) => {
    const sortBy = e.target.value;
    dispatch(setSortBy({ sortBy }));
  };
  return (
    <div className='sort-bar'>
      <p className='sort-bar__title'>Sort By</p>

      <select
        className='sort-bar__select'
        name='sort-by'
        id='sort-by'
        onChange={handleChange}
      >
        {'sortList'}
        <option
          className='sort-bar__option'
          value='name asc'
        >
          Name (A - Z)
        </option>
        <option
          className='sort-bar__option'
          value='name desc'
        >
          Name (Z - A)
        </option>
        <option
          className='sort-bar__option'
          value='price desc'
        >
          Price (Highest)
        </option>
        <option
          className='sort-bar__option'
          value='price asc'
        >
          Price (Lowest)
        </option>
      </select>
    </div>
  );
};
export default SortBar;
