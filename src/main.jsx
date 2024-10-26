import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/index.jsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/query';
import { Provider } from 'react-redux';
import './index.css'
import store from './stores';
import Dashboard from './pages/Dashboard/index.jsx';

const router = createBrowserRouter([
  {
  path: '/login',
  element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
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
