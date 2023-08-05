import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, redirect, useLocation } from 'react-router-dom';
import { login } from '../features/auth/authSlice';

const PrivateRoute = ({ children }) => {
  const { isLogin } = useSelector((store) => store.auth);
  const location = useLocation();
  return isLogin ? (
    children
  ) : (
    <Navigate
      to='/login'
      state={{ from: location }}
      replace
    />
  );
};
export default PrivateRoute;
