import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './pages';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Shop from './pages/Shop/Shop';
import Login, { action as loginAction } from './pages/Login/Login';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import { store } from './store';
import { Provider } from 'react-redux';
import SignUp, { action as signUpAction } from './pages/SignUp/SignUp';
import Member from './pages/Member/Member';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
        element: <Member />,
      },

      {
        path: 'product/:id',
        element: <SingleProduct />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
