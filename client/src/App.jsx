import { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './pages';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import Login from './pages/Login';
import SingleProduct from './pages/SingleProduct';
import ProductForm from './components/ProductForm';

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
        children: [
          {
            path: 'buy',
            element: <ProductForm />,
            action: () => {},
          },
        ],
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
