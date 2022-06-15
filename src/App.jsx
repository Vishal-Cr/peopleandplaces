import "./App.css";
import React, { useState, useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/NavbarContainer.jsx";
import NewPlace from "./components/pages/NewPlace";
import Users from "./components/Users/Users";
import Auth from "./components/pages/Auth";
import UserPlaces from "./components/pages/UserPlaces";
import UpdatePlace from "./components/pages/UpdatePlace";
import { AuthContext } from "./components/context/AuthContext";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  });
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  });
  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <main className="App">
        <Navbar />

        {routes}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
