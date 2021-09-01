import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

import Home from './components/pages/Home/Home';
import Navigation from './components/Navigation/Navigation'
import Auth from './components/pages/Auth/Auth';
import Activate from './components/pages/Activate/Activate';

let isAuth = false;
let user = {
  activated: true
}

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        {/* Guest Routes (Home and Auth) */}
        <GuestRoute exact path='/'><Home /></GuestRoute>
        <GuestRoute path='/auth'>
          <Auth />
        </GuestRoute>
        {/* Semi Protected Routes (Name and profile pic) */}
        <SemiProtectedRoute path='/activate' >
          <Activate />
        </SemiProtectedRoute>
      </Switch>
    </Router>
  );
}

const GuestRoute = ({ children, ...rest }) => {
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

const SemiProtectedRoute = ({ children, ...rest }) => {
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



export default App;
