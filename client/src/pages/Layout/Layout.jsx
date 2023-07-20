import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.scss';
const Layout = () => {
  const { pathname } = useLocation();
  const memberPath = ['/login', '/signup'];
  const isMemberPath = !memberPath.includes(pathname);
  return (
    <div className='layout-container'>
      <Navbar />
      <Outlet />
      {isMemberPath && <Footer />}
    </div>
  );
};
export default Layout;
