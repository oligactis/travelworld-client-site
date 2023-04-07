import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../Hook/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { isLoading, user, admin } = useAuth()
    if (isLoading) {
        return (
            // Loading Spinner
            <div className=" flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-400"></div>
            </div>
        )
    }
    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    (user?.email && admin) ?
                        (children) : (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: location }
                                }}
                            />
                        )
                )
            }
        />
    );
};

export default AdminRoute;