import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ children, isAuth, user, ...rest }) => {
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