import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.scss';
const Layout = () => {
  const { pathname } = useLocation();
  const withoutFooterPath = ['/', '/login', '/signup'];
  const isWithoutFooterPath = !withoutFooterPath.includes(pathname);

  return (
    <div className='layout-container'>
      <Navbar />
      <Outlet />
      {isWithoutFooterPath && <Footer />}
    </div>
  );
};
export default Layout;
