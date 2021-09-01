import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const GuestRoute = ({ children, isAuth, user, ...rest }) => {
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
