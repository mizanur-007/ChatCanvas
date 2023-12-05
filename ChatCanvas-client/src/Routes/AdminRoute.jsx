
import Loader from '../Component/Loader/Loader';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useUserDetails from '../api/Users/useUserDetails';

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth()
const location = useLocation()
const {userDetailsData,userLoading} = useUserDetails()
if(loading||userLoading){
    return <Loader></Loader>
}

const role =userDetailsData.role

if(user && role == 'admin'){
    return children
}
else{
    return <Navigate to={'/login'} state={{ from: location }} replace='true'></Navigate>
}
};

export default AdminRoute;