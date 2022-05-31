import "./App.css";
import {Switch,Redirect,BrowserRouter as Router,Route } from "react-router-dom";
import Navbar from "./components/navbar/NavbarContainer.jsx";
import Cards from './components/Users/UserItem';
import Users from './components/pages/Users';
import UserPlaces from './components/pages/UserPlaces';
function App() {
  return (
   
    <Router >
      <Navbar/>
      <main>
      <Switch>
      <Route exact path='/' >
      <Users/>
      </Route>

      <Route exact path='/:userId/places' render={() => <UserPlaces/>}  >
    
   
    
      </Route>
      <Route path='/places/new' exact>
        {/* <NewPlace/> */}
      </Route>
      <Redirect to='/' exact/>
      </Switch>
      </main>
    </Router>

    
  );
}

export default App;
