import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

import GuestRoute from './RouteProtection/GuestRoute'
import SemiProtectedRoute from './RouteProtection/SemiProtectedRoute'
import ProtectedRoute from './RouteProtection/ProtectedRoute'

import Home from './components/pages/Home/Home';
import Navigation from './components/Navigation/Navigation'
import Auth from './components/pages/Auth/Auth';
import Activate from './components/pages/Activate/Activate';
import Rooms from './components/pages/Rooms/Rooms';

let isAuth = false;
let user = {
  activated: false
}

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>

        {/* Guest Routes (Home and Auth) */}
        <GuestRoute exact path='/' isAuth={isAuth} ><Home /></GuestRoute>
        <GuestRoute path='/auth'>
          <Auth />
        </GuestRoute>

        {/* Semi Protected Routes (Name and profile pic) */}
        <SemiProtectedRoute path='/activate' isAuth={isAuth} user={user}>
          <Activate />
        </SemiProtectedRoute>

        {/* Protected routes (Chat Rooms) */}
        <ProtectedRoute path='/rooms' isAuth={isAuth} user={user}>
          <Rooms />
        </ProtectedRoute>


      </Switch>
    </Router>
  );
}

export default App;