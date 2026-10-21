import {Navigate, Outlet} from 'react-router-dom';



export default function ProtectRoutes({user}){
    

    const isAuthenticated = user['login'];
    if(!isAuthenticated){
        return <Navigate to="/signin" />
    }
    return <Outlet />
}