import { BiSearchAlt } from 'react-icons/bi';
import './SearchBar.scss';
import { extendedApiSlice as productApi } from '../../features/product/productSlice';
import { useDispatch } from 'react-redux';
import { setKeyword } from '../../features/filter/filterSlice';

function debounce(cb, wait) {
  let timer = 0;
  return (...args) => {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      cb.apply(context, args);
    }, wait);
  };
}
const SearchBar = () => {
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const keyword = e.target.value;
    dispatch(setKeyword({ keyword }));
  };
  const changeDebounce = debounce(handleChange, 500);
  return (
    <div className='search-bar'>
      <input
        className='search-bar__input'
        type='text'
        name='keyword'
        id='keyword'
        onChange={changeDebounce}
      />
      <div className='search-bar__icon'>
        <BiSearchAlt />
      </div>
    </div>
  );
};
export default SearchBar;
