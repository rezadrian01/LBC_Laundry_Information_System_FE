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

const router = createBrowserRouter([
  {
  path: '/login',
  element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/new-order',
    children: [
      {
        index: true,
        element: <NewOrder />
      },
      {
        path: 'item',
      },
      {
        path: 'weight'
      },
      {
        path: 'summary',
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
