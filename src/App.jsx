import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/NavbarContainer.jsx";
import NewPlace from "./components/pages/NewPlace";
import Users from "./components/pages/Users";
import UserPlaces from "./components/pages/UserPlaces";
import UpdatePlace from "./components/pages/UpdatePlace";
function App() {
  return (
    <main className="App">
      <Navbar />

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

        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>

        <Route path="/auth">
          <NewPlace />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
