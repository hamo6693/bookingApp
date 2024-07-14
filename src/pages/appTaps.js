import React, { useContext } from "react";
import Event from "../pages/event";
import {  Route } from "react-router";
import Booking from "../pages/booking";
import Profile from "../pages/profile";
import { AuthContext } from "../context/AuthContext";
import Events from "../pages/eventUser";
import CreateEvent from "../pages/createEvent";

import Menu from "../components/menu";

const appTaps = () => {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);

  if (!loggedIn) {
    return (
      <Route exact path="/">
        <Event />
      </Route>
    );
  } else {
    return (
      <>
        <Route exact path="/booking">
          <Booking />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route exact path="/event">
          <CreateEvent />
        </Route>

       

        <Route exact path="/events">
          <Events />
          <Menu />
        </Route>
      </>
    );
  }
};
export default appTaps;
