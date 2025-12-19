import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllCourses from "../Pages/AllCourses/AllCourses";
import AddCourse from "../Pages/AddCourse/AddCourse";
import ViewDetails from "../Pages/AllCourses/ViewDetails";
import MyCourses from "../Pages/MyCourses/MyCourses";
import EditCourse from "../Pages/EditCourse/EditCourse";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/all-courses",
        Component: AllCourses,
      },
      {
        path: "add-course",
        element: (
          <PrivateRoute>
            <AddCourse></AddCourse>
          </PrivateRoute>
        ),
      },{
        path:'/viewDetails/:id',
        element:<PrivateRoute>
          <ViewDetails></ViewDetails>
        </PrivateRoute>
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path:'/my-courses',
        element:<PrivateRoute>
          <MyCourses></MyCourses>
        </PrivateRoute>
      },
      {
        path:'/edit-course/:id',
        element:<PrivateRoute>
          <EditCourse></EditCourse>
        </PrivateRoute>
      }
    ],
  },
]);
