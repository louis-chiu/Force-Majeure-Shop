import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import './Layout.scss';
const Layout = () => {
  return (
    <div className='layout-container'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
