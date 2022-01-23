import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

const SemiProtectedRoute = ({ children, ...rest }) => {
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