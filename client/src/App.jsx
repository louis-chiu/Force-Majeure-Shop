import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './pages';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Shop, { loader as shopLoader } from './pages/Shop/Shop';
import Login, { action as loginAction } from './pages/Login/Login';
import SingleProduct from './pages/SingleProduct/SingleProduct';

import SignUp, { action as signUpAction } from './pages/SignUp/SignUp';
import Member from './pages/Member/Member';
import { loader as singleProductLoader } from './pages/SingleProduct/SingleProduct';
import Error from './pages/Error/Error';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, useLoginMutation } from './features/auth/authSlice';
import PrivateRoute from './utils/PrivateRoute';

import { store } from './store';
import { Provider } from 'react-redux';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'shop',
        element: <Shop />,
        loader: shopLoader,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'signup',
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: 'member',
        element: (
          <PrivateRoute>
            <Member />,
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: 'product/:id',
        element: <SingleProduct />,
        loader: singleProductLoader,
      },
    ],
  },
]);

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const userData = JSON.parse(
  //     sessionStorage.getItem('force_majeure_isLoggedIn')
  //   );
  //   if (userData) {
  //     dispatch(login({ ...userData }));
  //   }
  // }, []);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
