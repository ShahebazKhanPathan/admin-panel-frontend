import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import SignIn from './components/SignIn.tsx';
import SignUp from './components/SignUp.tsx';
import AdminSignIn from './components/AdminSignIn.tsx';
import Dashboard from './components/Dashboard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignIn/>
      },
      {
        path: "/sign-up",
        element: <SignUp/>
      },
      {
        path: "/admin",
        element: <AdminSignIn/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/> 
    </ChakraProvider>
  </React.StrictMode>,
)
