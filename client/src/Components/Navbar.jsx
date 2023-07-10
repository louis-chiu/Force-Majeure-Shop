import './style.css';
import '../index.css';
import { FaBars } from 'react-icons/fa';
import { navItems } from '../data';
import { useRef, useState } from 'react';
const Navbar = () => {
  const groupRef = useRef(null);
  const [showNavGroup, setShowNavGroup] = useState(false);
  const showStyle = {
    height: showNavGroup
      ? `${groupRef.current.getBoundingClientRect().height}px`
      : '0px',
  };
  const toggleNavGroup = (e) => {
    setShowNavGroup(!showNavGroup);
    console.log(showStyle);
  };
  return (
    <nav className='navbar'>
      <div className='navbar__header'>
        <span className='navbar__logo'>Force Majeure</span>
        <button className='navbar__toggle' onClick={toggleNavGroup}>
          <FaBars />
        </button>
      </div>
      <div className='group-container' style={showStyle}>
        <ul className='navbar__group' ref={groupRef}>
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
