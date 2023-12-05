import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Component/Error/ErrorPage";
import PostDetails from "../Component/PostDetails/PostDetails";
import Membership from "../Pages/Membership/Membership";
import UserDashboard from "../Layout/UserDashboard";
import UserProfile from '../Pages/User Profile/UserProfile'
import AddPost from "../Component/AddPost/AddPost";
import UserPost from "../Pages/User Post/UserPost";
import PostComments from "../Pages/Post Comments/PostComments";
import MakeAnnouncements from "../Pages/Announcement/MakeAnnouncements";
import ManageUsers from "../Pages/Manage Users/ManageUsers";
import Reports from "../Pages/Reports/Reports";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element:<MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/post/:id',
                element:<PrivateRoute><PostDetails></PostDetails></PrivateRoute>
            },
            {
                path:'/membership',
                element:<PrivateRoute><Membership></Membership></PrivateRoute>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/registration',
        element: <Registration></Registration>
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>,
        children:[
            {
                path: '/dashboard',
                element:<PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            },
            {
                path: '/dashboard/addpost',
                element:<PrivateRoute><AddPost></AddPost></PrivateRoute>
            },
            {
                path:'/dashboard/userposts',
                element:<PrivateRoute><UserPost></UserPost></PrivateRoute>
            },
            {
                path:'/dashboard/postcomments/:id',
                element:<PrivateRoute><PostComments></PostComments></PrivateRoute>
            },
            {
                path:'/dashboard/makeannouncement',
                element:<PrivateRoute><AdminRoute><MakeAnnouncements></MakeAnnouncements></AdminRoute></PrivateRoute>
            },
            {
                path:'/dashboard/manageusers',
                element:<PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
            },
            {
                path:'/dashboard/reports',
                element:<PrivateRoute><AdminRoute><Reports></Reports></AdminRoute></PrivateRoute>
            }
        ]

    }
])