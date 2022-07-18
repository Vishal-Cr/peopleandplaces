import React, { Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/NavbarContainer.jsx";
import { AuthContext } from "./components/context/AuthContext";
import useAuth from "./components/hooks/use-Auth";
import LoadingSpinner from "./components/UI-elements/LoadingSpinner";
const Users = React.lazy(() => import("./components/Users/Users"));
const Auth = React.lazy(() => import("./components/pages/Auth"));
const NewPlace = React.lazy(() => import("./components/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./components/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./components/pages/UpdatePlace"));

function App() {
  const { token, login, logout, userId } = useAuth(); //custom hook to login, logout and fetch userData.

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path={`/:userId/places`} exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
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
          <UserPlaces loginId={userId} />
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
      value={{
        isLoggedIn: Boolean(token),
        token: token,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <main className="App">
        <Navbar />
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
