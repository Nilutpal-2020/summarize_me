import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';


function PrivateRoute(){
    const currentUser = localStorage.getItem('auth-token');

    return (
        currentUser ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute;