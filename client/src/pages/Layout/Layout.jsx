import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
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
