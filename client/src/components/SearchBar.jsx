import { BiSearchAlt } from 'react-icons/bi';
import './SearchBar.scss';

const SearchBar = () => {
  return (
    <div className='search-bar'>
      <input
        className='search-bar__input'
        type='text'
        name='keyword'
        id=''
      />
      <div className='search-bar__icon'>
        <BiSearchAlt />
      </div>
    </div>
  );
};
export default SearchBar;
