import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Details from '../../pages/Details';
import App from '../../pages/App';


const RoutesApp = () => {
  const mainRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/details/:id",
      element: <Details />,
    },
  ]);

  return (
    <RouterProvider router={mainRouter} />
  )
}

export default RoutesApp
