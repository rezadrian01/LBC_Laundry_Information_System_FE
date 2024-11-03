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
import Branches from './pages/Branches';
import Reports from './pages/Reports';
import Item from './pages/Item';
import Weight from './pages/Weight';
import Branch from './pages/Branch';

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
        children: [
          {
            index: true,
            element: <Items />
          },
          {
            path: ":itemId",
            element: <Item />
          },
          {
            path: "new",
            element: <Item />
          }
        ]
      },
      {
        path: 'weights',
        children: [
          {
            index: true,
            element: <Weights />
          },
          {
            path: ':weightPriceId',
            element: <Weight />
          },
          {
            path: 'new',
            element: <Weight />
          }
        ]
      },
      {
        path: 'branches',
        children: [
          {
            index: true,
            element: <Branches />
          },
          {
            path: ':branchId',
            element: <Branch />
          },
          {
            path: 'new',
            element: <Branch />
          }
        ]
      },
      {
        path: 'reports',
        element: <Reports />
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
