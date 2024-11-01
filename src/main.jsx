import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { queryClient } from './utils/query';
import store from './stores';
import './index.css';

import Login from './pages/Login/index.jsx';
import Dashboard from './pages/Dashboard/index.jsx';
import NewOrder from './pages/NewOrder';
import NewOrderItem from './pages/NewOrderItem';
import NewOrderWeight from './pages/NewOrderWeight';
import OrderSummary from './pages/OrderSummary';
import Error from './pages/Error';
import Order from './pages/Orders';
import Items from './pages/Items';
import Weights from './pages/Weights';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'orders',
        element: <Order />
      },
      {
        path: 'items',
        element: <Items />
      },
      {
        path: 'weights',
        element: <Weights />
      },
      {
        path: 'new-order',
        children: [
          {
            index: true,
            element: <NewOrder />
          },
          {
            path: 'item',
            children: [
              {
                index: true,
                element: <NewOrderItem />
              },
              {
                path: 'summary',
                element: <OrderSummary />
              }
            ]
          },
          {
            path: 'weight',
            children: [
              {
                index: true,
                element: <NewOrderWeight />,
              },
              {
                path: 'summary',
                element: <OrderSummary />
              }
            ]
          },
        ]
      },
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,

);
