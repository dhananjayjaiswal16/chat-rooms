import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, ...rest }) => {
    const { isAuth, user } = useSelector((state) => state.authSlice);
    return (
        <Route {...rest}
            render={({ location }) => {
                return (
                    !isAuth ? (
                        <Redirect to={{
                            pathname: '/',
                            state: { from: location }
                        }} />
                    ) : (
                        !user.activated ? (
                            <Redirect to={{
                                pathname: '/activate',
                                state: { from: location }
                            }} />
                        ) : (
                            children
                        )
                    )
                )
            }}
        >
        </Route>
    );
}

export default ProtectedRoute;