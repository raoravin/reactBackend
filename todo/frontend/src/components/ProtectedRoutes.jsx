import {Navigate, useLocation} from "react-router-dom";



const ProtectedRoutes = ({loggedIn, children}) => {

    if(!loggedIn) {
        return <Navigate to={location.pathname} replace />
    }
    return children;
};


export default ProtectedRoutes;