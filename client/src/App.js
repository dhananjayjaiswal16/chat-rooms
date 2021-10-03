import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import { useState } from 'react';
import GuestRoute from './RouteProtection/GuestRoute'
import SemiProtectedRoute from './RouteProtection/SemiProtectedRoute'
import ProtectedRoute from './RouteProtection/ProtectedRoute'

import { usePageRefresh } from './hooks/usePageRefresh';

import Home from './components/pages/Home/Home';
import Navigation from './components/Navigation/Navigation'
import Auth from './components/pages/Auth/Auth';
import Activate from './components/pages/Activate/Activate';
import Rooms from './components/pages/Rooms/Rooms';
import Room from './components/pages/Room/Room'

import Loader from './components/Skeleton/Loader/Loader'

// import {useSelector} from 'react-redux';
// import {} from './store/authSlice';


// let isAuth = false;
// let user = {
//   activated: false
// }

const App = () => {
  // const [loading, setLoading] = useState(false);

  const { loading } = usePageRefresh();
  return loading ? (
    <Loader msg='Activation in Progress' />
  ) : (
    <Router>
      <Navigation />
      <Switch>

        {/* (Home and Auth) */}
        <GuestRoute exact path='/' >
          <Home />
        </GuestRoute>
        <GuestRoute path='/auth'>
          <Auth />
        </GuestRoute>

        {/* S(Name and profile pic) */}
        <SemiProtectedRoute path='/activate' >
          <Activate />
        </SemiProtectedRoute>

        {/* (Chat Rooms) */}
        <ProtectedRoute path='/rooms' >
          <Rooms />
        </ProtectedRoute>

        {/* Individual Room */}
        <ProtectedRoute path='/room/:id' >
          <Room />
        </ProtectedRoute>

      </Switch>
    </Router>
  );

}

export default App;
