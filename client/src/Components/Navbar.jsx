import './style.css';
import '../index.css';
import { FaBars } from 'react-icons/fa';
import { navItems } from '../data';
import { useRef, useState } from 'react';
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
    console.log(showStyle);
  };
  return (
    <nav className='navbar'>
      <div className='navbar__header'>
        <span className='navbar__logo'>Force Majeure</span>
        <button className='navbar__toggle' onClick={toggleNavLinks}>
          <FaBars />
        </button>
      </div>
      <div className='links-container' style={showStyle}>
        <ul className='navbar__links' ref={linksRef}>
          {navItems.map((item, i) => {
            const { name, id, link, icon } = item;
            return (
              <li className='navbar__item' key={id}>
                <a href={link}>{name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
