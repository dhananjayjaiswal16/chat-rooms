import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = ({ children, ...rest }) => {
    const { isAuth } = useSelector((state) => state.authSlice);
    return (
        <Route {...rest}
            render={({ location }) => {
                return (
                    isAuth ? (
                        <Redirect to={{
                            pathname: '/rooms',
                            state: { from: location }
                        }}
                        />) : (
                        children
                    )
                )
            }}>

        </Route>
    );
}

export default GuestRoute;
