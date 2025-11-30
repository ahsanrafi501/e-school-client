import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path:'/register',
          Component: Register,
        },
        {
          path:'/login',
          Component: Login,
        },
        {
          path:'/dashboard',
          element:<PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }
    ]
  },
]);