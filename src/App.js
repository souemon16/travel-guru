import React, { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Appbar from './components/Appbar/Appbar';
import Booking from './components/Booking/Booking';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Registration/Login';
import NotFound from './components/NotFound/NotFound';
import HotelReservation from './components/hotelReservation/HotelReservation';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();
export const placeContext = createContext();

function App() {
  const [getuser, setUserInfo] = useState({})
  const [place, setPlace] = useState({})
  return (
    <>
    <userContext.Provider value={[getuser, setUserInfo]}>
    <placeContext.Provider value={[place, setPlace]}>
      <Router>
        <Appbar/>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/booking/:id">
            <Booking />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/find-hotel'>
            <HotelReservation />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      </placeContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default App;
