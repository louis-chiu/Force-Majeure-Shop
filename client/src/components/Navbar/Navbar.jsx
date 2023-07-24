import { FaBars } from 'react-icons/fa';
import { navItems } from '../../data';
import { useRef, useState } from 'react';

import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
const Navbar = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  console.log(isLogin);
  const linksRef = useRef(null);
  const [showNavLinks, setShowNavLinks] = useState(false);
  const showStyle = {
    height: showNavLinks
      ? `${linksRef.current.getBoundingClientRect().height}px`
      : '0px',
  };
  const toggleNavLinks = (e) => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <nav className='navbar'>
      <div className='navbar__header'>
        <Link
          to='/'
          className='navbar__logo'
        >
          Force Majeure
        </Link>
        <button
          className='navbar__toggle'
          onClick={toggleNavLinks}
        >
          <FaBars />
        </button>
      </div>
      <div
        className='links-container'
        style={showStyle}
      >
        <ul
          className='navbar__links'
          ref={linksRef}
        >
          <li className='navbar__item'>
            <Link
              className='navbar__button'
              to='/shop'
              onClick={toggleNavLinks}
            >
              Shop
            </Link>
          </li>
          <li className='navbar__item'>
            <Link
              className='navbar__button'
              to='/cart'
              onClick={toggleNavLinks}
            >
              Cart
            </Link>
          </li>
          <li className='navbar__item'>
            {isLogin ? (
              <button
                className='navbar__button'
                onClick={() => dispatch(logout())}
                to='/'
              >
                Logout
              </button>
            ) : (
              <Link
                className='navbar__button'
                to='/login'
                onClick={toggleNavLinks}
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
