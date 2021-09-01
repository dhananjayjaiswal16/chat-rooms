import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const SemiProtectedRoute = ({ children, isAuth, user, ...rest }) => {
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
                            children
                        ) : (
                            <Redirect to={{
                                pathname: '/rooms',
                                state: { from: location }
                            }} />
                        )
                    )
                )
            }}
        >
        </Route>
    );
}

export default SemiProtectedRoute;