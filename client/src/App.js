import React, {
  Fragment,
  useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Redux
import {
  provider,
  Provider
} from 'react-redux'
import store from './store'
import './App.css';
import {
  loadUser
}
from './actions/auth';
import setAuthToken from './utils/setAuthToken'


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => { //useEffect is a lifecycle method/hook that will keep on running like a loop
    store.dispatch(loadUser());
  }, []);
  return ( <
    Provider store = {
      store
    } >
    <
    Router >
    <
    Fragment >
    <
    Navbar / >
    <
    Route exact path = '/'
    component = {
      Landing
    }
    />  <
    section className = "container" >
    <
    Alert / >
    <
    Switch >
    <
    Route exact path = '/Register'
    component = {
      Register
    }
    /> <
    Route exact path = '/Login'
    component = {
      Login
    }
    />   < /
    Switch > <
    /section> < /
    Fragment > < /
    Router >
    <
    /Provider>
  )
};
export default App;