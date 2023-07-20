import { FaBars } from 'react-icons/fa';
import { navItems } from '../../data';
import { useRef, useState } from 'react';

import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
          {navItems.map((item, i) => {
            const { name, id, link, icon } = item;
            return (
              <li
                className='navbar__item'
                key={id}
              >
                <Link to={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
