import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './App.scss';
import { createBrowserRouter, Outlet, RouterProvider, Link } from 'react-router-dom';
import UsersPage from './screens/users.page.tsx';

import Header from './components/header/header.tsx';
import LoginPage from './screens/login.page.jsx';

const LayoutAdmin = () => {
   return (
      <>
         <Header />
         <Outlet />
      </>
   );
};

const router = createBrowserRouter([
   {
      path: '/',
      element: <LayoutAdmin />,
      children: [
         { index: true, element: <App /> },
         {
            path: 'users',
            element: <UsersPage />,
         },
      ],
   },
   {
      path: '/login',
      element: <LoginPage />,
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      {/* <App /> */}
      <RouterProvider router={router} />
   </React.StrictMode>,
);
