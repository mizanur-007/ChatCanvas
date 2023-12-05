import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Component/Loader/Loader";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({children}) => {
const {user,loading} = useAuth()
const location = useLocation()

if(loading){
    return <Loader></Loader>
}

if(user){
    return children
}
else{
    return <Navigate to={'/login'} state={{ from: location }} replace='true'></Navigate>
}
};

export default PrivateRoute;