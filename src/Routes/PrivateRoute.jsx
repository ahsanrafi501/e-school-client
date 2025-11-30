import React from 'react';
import UseAuth from '../Hook/UseAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {loading, user} = UseAuth()

    if(loading){
        return <div><span className="loading loading-bars loading-xl"></span></div>
    }
    if(!user) {
        return <Navigate to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;