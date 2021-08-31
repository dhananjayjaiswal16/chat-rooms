import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import Home from './components/pages/Home/Home';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Navigation from './components/Navigation/Navigation'
const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} ></Route>
        <Route exact path='/register' component={Register} ></Route>
        <Route exact path='/login' component={Login} ></Route>
      </Switch>
    </Router>
  );
}

export default App;
