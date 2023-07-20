import './Footer.scss';
import { socialMedia } from '../../data';
const Footer = () => {
  return (
    <footer>
      <ul className='links'>
        <li>
          <a href='#about'>About Us</a>
        </li>
        <li>
          <a href='#contact'>Contact Us</a>
        </li>
      </ul>
      <ul className='social-media'>
        {socialMedia.map(({ id, name, link, logo }) => {
          return (
            <li key={id}>
              <a href={link}>{logo}</a>
            </li>
          );
        })}
      </ul>
      <p className='copyright'>&copy; 2022 FORCE MAJEURE</p>
    </footer>
  );
};
export default Footer;
