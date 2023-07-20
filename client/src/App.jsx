import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './pages';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Shop from './pages/Shop/Shop';
import Login from './pages/Login/Login';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import { store } from './store';
import { Provider } from 'react-redux';
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
